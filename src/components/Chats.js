import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { db } from "../firebase";
import { useFirebaseAuth } from "./AuthContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const currentUser = useFirebaseAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className=" rounded-md">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="p-5 m-5 rounded-md flex items-center gap-2 bg-white cursor-pointer"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className=" font-bold text-base">
              <span className=" text-xl font-medium">
                {chat[1].userInfo.firstName}
              </span>
              <p className=" text-xl text-slate-200">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
