import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";
import MobileChat from "../Chat/MobileChat";

function ChatList() {
  const [{ contactsPage, currentChatUser }] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col min-h-screen max-h-screen z-20">
      {pageType === "default" && (
        <>
          {/* Mobile layout - Show contacts if no chat is open */}
          <div className="md:hidden  ">
            {!currentChatUser ? <div>
            <ChatListHeader />
            <SearchBar />
            <div className="border-4  border-purple-400 overflow-y-scroll custom-scrollbar ">
            <List />
            </div>
            
            </div> : <div className="">
              <MobileChat />
              </div>
            }
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex flex-col h-[100vh] ">
            <ChatListHeader />
            <SearchBar />
            <List />
          </div>
        </>
      )}

      {pageType === "all-contacts" && <ContactsList />}
    </div>
  );
}

export default ChatList;
