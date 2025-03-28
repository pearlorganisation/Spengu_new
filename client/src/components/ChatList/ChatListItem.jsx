// import React from "react";
// import Avtar from "../common/Avtar";
// import { useStateProvider } from "@/context/StateContext";
// import { reducerCases } from "@/context/constans";
// import { calculateTime } from "@/utils/CalculateTime";
// import MessageStatus from "../common/MessageStatus";
// import { FaCamera, FaMicrophone } from "react-icons/fa";

// function ChatListItem({ data, isContactsPage = false }) {
//   const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

//   const handleContactClick = () => {
//     if (!isContactsPage) {
//       dispatch({
//         type: reducerCases.CHANGE_CURRENT_CHAT_USER,
//         user: {
//           name: data.name,
//           about: data.about,
//           profilePicture: data.profilePicture,
//           email: data.email,
//           id: userInfo.id === data.senderId ? data.recieverId : data.senderId,
//         },
//       });
//     } else {
//       dispatch({
//         type: reducerCases.CHANGE_CURRENT_CHAT_USER,
//         user: { ...data },
//       });
//       dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
//     }
//   };

//   return (
//     <div
//       className="flex cursor-pointer items-center hover:bg-background-default-hover p-3 sm:p-2 md:p-3 rounded-lg transition"
//       onClick={handleContactClick}
//     >
//       {/* Avatar */}
//       <div className="min-w-fit px-3 sm:px-2">
//         <Avtar type="lg" image={data?.profilePicture} />
//       </div>

//       {/* Chat Details */}
//       <div className="flex flex-col justify-center w-full">
//         {/* Name & Time */}
//         <div className="flex justify-between items-center">
//           <span className="text-white text-sm sm:text-base">{data?.name}</span>
//           {!isContactsPage && (
//             <span
//               className={`${
//                 data.totalUnreadMessages > 0
//                   ? "text-icon-green"
//                   : "text-secondary"
//               } text-xs sm:text-sm`}
//             >
//               {calculateTime(data.createdAt)}
//             </span>
//           )}
//         </div>

//         {/* Message Preview */}
//         <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
//           <div className="flex justify-between items-center w-full">
//             <span className="text-secondary text-xs sm:text-sm truncate max-w-[160px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]">
//               {isContactsPage ? (
//                 data?.about || "\u00A0"
//               ) : (
//                 <div className="flex items-center gap-1">
//                   {data.senderId === userInfo.id && (
//                     <MessageStatus messageStatus={data.messageStatus} />
//                   )}
//                   {data.type === "text" && (
//                     <span className="truncate">{data.message}</span>
//                   )}
//                   {data.type === "audio" && (
//                     <span className="flex items-center gap-1">
//                       <FaMicrophone className="text-panel-header-icon" /> Audio
//                     </span>
//                   )}
//                   {data.type === "image" && (
//                     <span className="flex items-center gap-1">
//                       <FaCamera className="text-panel-header-icon" /> Image
//                     </span>
//                   )}
//                 </div>
//               )}
//             </span>

//             {/* Unread Message Count */}
//             {data.totalUnreadMessages > 0 && (
//               <span className="bg-icon-green px-[5px] py-[1px] rounded-full text-xs sm:text-sm">
//                 {data.totalUnreadMessages}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatListItem;


import React from "react";
import Avtar from "../common/Avtar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constans";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";

function ChatListItem({ data, isContactsPage = false }) {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  const handleContactClick = () => {
    if (!isContactsPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          id: userInfo.id === data.senderId ? data.recieverId : data.senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center hover:bg-background-default-hover p-3 sm:p-2 md:p-3 rounded-lg transition"
      onClick={handleContactClick}
    >
      {/* Avatar */}
      <div className="min-w-fit px-3 sm:px-2">
       {data?.profilePicture &&  <Avtar type="lg" image={data?.profilePicture} />}
      </div>
   {/* sfdsfds */}
      {/* Chat Details */}
      <div className="flex flex-col justify-center w-full">
        {/* Name & Time */}
        <div className="flex justify-between items-center">
          <span className="text-white text-sm sm:text-base">{data?.name}</span>
          {!isContactsPage && (
            <span
              className={`${
                data.totalUnreadMessages > 0
                  ? "text-icon-green"
                  : "text-secondary"
              } text-xs sm:text-sm`}
            >
              {calculateTime(data.createdAt)}
            </span>
          )}
          
        </div>

        {/* Message Preview */}
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between items-center w-full">
            <span className="text-secondary text-xs sm:text-sm truncate max-w-[160px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]">
              {isContactsPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className="flex items-center gap-1">
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className="truncate">{data.message}</span>
                  )}
                  {data.type === "audio" && (
                    <span className="flex items-center gap-1">
                      <FaMicrophone className="text-panel-header-icon" /> Audio
                    </span>
                  )}
                  {data.type === "image" && (
                    <span className="flex items-center gap-1">
                      <FaCamera className="text-panel-header-icon" /> Image
                    </span>
                  )}
                  
                </div>
              )}
            </span>

            {/* Unread Message Count */}
            {data.totalUnreadMessages > 0 && (
              <span className="bg-icon-green px-[5px] py-[1px] rounded-full text-xs sm:text-sm">
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;