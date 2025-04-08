import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import ContactsList from "../ChatList/ContactsList";
import { useStateProvider } from "@/context/StateContext";

const MobileChat = () => {
  const [{ currentChatUser }] = useStateProvider();

  return (
    <div className="">
      {/* Show ContactsList when there's no active chat */}
      {!currentChatUser ? (
        <ContactsList />
      ) : (
        <div className="w-full h-full border-2 border-b-orange-400 border-dotted flex flex-col">
          <ChatHeader />
          <div className="w-full h-[80vh] overflow-y-scroll custom-scrollbar ">
          <ChatContainer />
          <MessageBar/>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default MobileChat;
