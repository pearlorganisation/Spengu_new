import dotenv, { config } from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import planRouter from "./routes/planRoutes.js";
import subcriptionRouter from "./routes/SubscriptionRoutes.js";
import verifyPaymentRouter from "./routes/verifyPaymentRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import { sendNotification } from "./jobs/subscriptionReminder.js";
import { Server, Socket } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://sepngu-mern.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images", express.static("uploads/images"));

app.get("/", (req, res) => {
  res.send("API Works");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/plans", planRouter);
app.use("/api/subscriptions", subcriptionRouter);
app.use("/api/verify-payment", verifyPaymentRouter);
app.use("/api/notifications", notificationRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://sepngu-mern.vercel.app",
    ],
  },
});

global.onlineUsers = new Map();
const activeCalls = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  console.log("Active call: ", activeCalls);
  // When a backend restart happens, request user ID again
  socket.emit("request-userId");

  global.chatSocket = socket;
  const onlineUsers = global.onlineUsers; // Use this variable throughout

  socket.on("add-user", (userId) => {
    if (!userId) return;
    // when user get connected
    global.onlineUsers.set(userId, socket.id);
    console.log("Global ONLINE USERS: ", global.onlineUsers);
    socket.broadcast.emit("online-users", {
      // send emit to all users [except] current user
      onlineUsers: Array.from(global.onlineUsers.keys()),
    });
  });

  socket.on("signout", (id) => {
    if (!id) return;
    // when user logout remove it from online users
    global.onlineUsers.delete(id);
    socket.broadcast.emit("online-users", {
      // now agian send emit to all users
      onlineUsers: Array.from(global.onlineUsers.keys()),
    });
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to); // get user socket which current user sending message
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", {
        // send message to that user
        from: data.from,
        message: data.message,
      });
    }
  });

  socket.on("outgoing-voice-call", (data) => {
    // emited from voicecall.jsx
    console.log("data: ", data); //{to: otheruser, from: {id, propic, name}, callType: "voice", roomId} when clicking on call button user info come here
    const sendUserSocket = global.onlineUsers.get(data.to);
    console.log("sendUserSocket: ", sendUserSocket);
    console.log("activeCalls: ", activeCalls);
    if (activeCalls.has(data.to)) {
      console.log("activeCalls when user is busy: ", activeCalls);
      // If the recipient is already on a call, notify the caller
      socket.emit("user-busy", { to: data.to });
    } else {
      // Mark both users as in a call
      activeCalls.set(data.from.id, data.to);
      // activeCalls.set(data.to, data.from.id);

      setTimeout(() => {
        // console.log("We are comming in settimeout", data);
        if (activeCalls.has(data.from.id)) {
          if (activeCalls.has(data.to)) {
            return;
          }

          activeCalls.delete(data.from.id);
          activeCalls.delete(data.to);

          console.log("activeCalls in timeouts", activeCalls);

          // const user1 = global.onlineUsers.get(data.from.id);
          const user1 = global.onlineUsers.get(data.from);
          const user2 = global.onlineUsers.get(data.to);
          if (user2) {
            console.log("user2", user2);
            socket.to([user1, user2]).emit("outgoing-voice-call", {
              call: "autoRejected",
            });
          }
        }
      }, 30000);

      console.log("activeCalls when user is not busy: ", activeCalls);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("incoming-voice-call", {
          //listned on main.jsx
          from: data.from, //{id, propic, name} //caller id
          roomId: data.roomId,
          callType: data.callType, // voice
        });
      }
    }
  });

  socket.on("accept-incoming-call", ({ id, roomId }) => {
    // emited from incomingcall.jsx(callee) , id of a caller who is calling
    const sendUserSocket = global.onlineUsers.get(id);
    console.log("We are here in accept-incoming-call");
    const peerConnection = activeCalls.get(id);
    activeCalls.set(peerConnection, id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("accept-call", { roomId }); // accept call of caller
    }
  });

  // // If user 2 disconnect the call data.from is user 1, and user 1 will listen to voice call rejected socket
  socket.on("reject-voice-call", (data) => {
    //emited from incomingcall.jsx(callee)
    const sendUserSocket = global.onlineUsers.get(data.from); // {from: incomingVoiceCall.id} // id of a caller who is calling
    console.log("sendUserSocket: ", sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("voice-call-rejected"); // end call of caller
    }
    // Remove from active calls
    activeCalls.delete(data.from);
    activeCalls.delete(data.to);
    console.log("activeCalls after rejection: ", activeCalls);
  });

  socket.on("hangup-user-call", (data) => {
    console.log("Im coming here", data);

    if (activeCalls.has(parseInt(data?.userID))) {
      console.log("Before removal", activeCalls);

      const activePair = activeCalls.get(parseInt(data?.userID));
      activeCalls.delete(parseInt(data?.userID));
      activeCalls.delete(activePair);

      console.log("After removal", activeCalls);
    }
  });

  socket.on("disconnect", () => {
    // when client refresh or close the tab
    console.log(`User disconnected: ${socket.id}`);

    // Find the userId associated with this socket.id
    let disconnectedUserId = null;
    for (let [userId, socketId] of global.onlineUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        break;
      }
    }

    // If found, remove from the online users map
    if (disconnectedUserId) {
      global.onlineUsers.delete(disconnectedUserId);
      console.log(`User ${disconnectedUserId} removed from online users`);
      console.log(
        "Global ONLINE USERS After disconnection: ",
        global.onlineUsers
      );
      // Notify all clients about the updated online users list
      socket.broadcast.emit("online-users", {
        onlineUsers: Array.from(global.onlineUsers.keys()),
      });
    }
  });
});

export { io };
