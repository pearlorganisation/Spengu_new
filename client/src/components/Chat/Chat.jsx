import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

function Chat() {
  return (
    <div className="border-conversation-border grid grid-rows-[8fr_81fr_11fr] border-l relative  bg-conversation-panel-background  h-[100dvh] z-10">
      <ChatHeader />

      <div className=" h-[80vh]  overflow-y-scroll custom-scrollbar">
        <ChatContainer />
      </div>

      <div className="">
        <MessageBar />
        >>>>>>>>> Temporary merge branch 2
      </div>
    </div>
  );
}

export default Chat;
