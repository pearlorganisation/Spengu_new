import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

function Chat() {
  return (
    <div className="border-conversation-border border-l relative  bg-conversation-panel-background flex flex-col h-[100vh] z-10">
      <div className="flex-none">
        <ChatHeader />
      </div>

      <div className=" h-[80vh]  overflow-y-scroll custom-scrollbar">
        {/* <div className="  flex-1  overflow-hidden"> */}
        <ChatContainer />
      </div>
      <div className="flex-none">
        <MessageBar />
      </div>
    </div>
  );
}

export default Chat;
