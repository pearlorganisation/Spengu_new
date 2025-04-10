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
        <div className="w-full h-[100dvh] grid grid-rows-[10fr_79fr_11fr]  ">
          <div className=" flex justify-center items-center px-2 ">
          <ChatHeader />

          </div>
          <div className="w-full   overflow-y-scroll custom-scrollbar ">
          <ChatContainer />
          </div>
          <div className="">
          <MessageBar/>

          </div>

         
        </div>
      )}
    </div>
  );
};

export default MobileChat;
