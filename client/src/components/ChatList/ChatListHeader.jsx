import React, { useState } from "react";
import Avtar from "../common/Avtar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constans";
import ContextMenu from "../common/ContextMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaFolder } from "react-icons/fa";
function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();

    setContextMenuCordinates({ x: e.pageX - 80, y: e.pageY + 18 });
    setIsContextMenuVisible((prev) => !prev);
  };

  const contextMenuOptions = [
    {
      name: "Logout",
      callback: async () => {
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };
  return (
    <div className="h-12 px-1 py-2 md:h-16 md:px-3 md:py-3 flex  justify-between items-center">
      <div className="flex justify-center items-center  gap-6">
        <div className="cursor-pointer">
          <Avtar type="sm" image={userInfo?.profileImage || null} />
        </div>
        <div className="flex justify-center items-center  ">
          <Link
            href="/showpdf"
            className="w-full  items-center justify-center p-2 text-center rounded-md bg-orange-50   py-0.1 text-sm font-medium text-black-800 ring-1  ring-inset transition hover:bg-orange-100"
          >
            <h1 className="justify-center"> Our Course's</h1>
          </Link>
        </div>
      </div>

      <div className="flex flex-row  gap-6">
        <div className="flex justify-center items-center">
          <BsFillChatLeftTextFill
            className="text-panel-header-icon cursor-pointer text-xl size-6 md:size-6 lg::size-12"
            title="New Chat"
            onClick={handleAllContactsPage}
          />
        </div>
        <>
          <div className="flex justify-center   items-center">
            <BsThreeDotsVertical
              className="text-panel-header-icon cursor-pointer text-xl size-5 md:size-6 lg:size-8"
              title="Menu"
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            />
          </div>

          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              cordinates={contextMenuCordinates}
              contextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
