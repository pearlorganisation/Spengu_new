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
          {!currentChatUser && (
            <div className="md:hidden grid grid-rows-[6fr_7fr_88fr] min-h-screen max-h-screen    ">
              {/* Row 1 */}
              <div>
                <ChatListHeader />
              </div>

              {/* Row 2 */}
              <div>
                <SearchBar />
              </div>

              {/* Row 3 — scrollable chat list */}
              <div className=" overflow-y-scroll custom-scrollbar">
                <List />
              </div>
            </div>
          )}

          {currentChatUser && (
            <div className="md:hidden">
              <MobileChat />
            </div>
          )}

          {/* Desktop layout */}
          <div className="hidden md:flex flex-col h-[100dvh] ">
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
