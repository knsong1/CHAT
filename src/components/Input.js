import React, { useContext, useState } from "react";

import { ChatContext } from "./ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import { useFirebaseAuth } from "./AuthContext";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const currentUser = useFirebaseAuth();
  console.log(currentUser);
  const { data } = useContext(ChatContext);
  console.log(data);

  const handleSend = async () => {
    if (img) {
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="grid">
      <div className="grid m-5  bottom-0 items-center mb-2 text-sm font-medium text-gray-900">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="  p-2.5 mx-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        />
        <div className="gap-2">
          <label htmlFor="file">
            <img src="/img.png" alt="" className=" h-5 cursor-pointer" />
          </label>
          <button
            onClick={handleSend}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
