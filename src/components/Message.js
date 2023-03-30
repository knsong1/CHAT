import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./ChatContext";
import { useFirebaseAuth } from "./AuthContext";

const Message = ({ message }) => {
  const currentUser = useFirebaseAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId == currentUser.uid && "owner"}`}
    >
      <div className="flex flex-col text-gray-50 font-bold">
        <img
          src={message.senderId == currentUser.uid ? currentUser : data.user}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className=" max-w-xl flex flex-col gap-10">
        <p>{message.text}</p>
        {message && <img src={message} alt="" />}
      </div>
    </div>
  );
};

export default Message;
