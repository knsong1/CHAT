import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "./ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className=" bg-slate-300 flex-1 ">
      <div className="h-4/6 m-5 bg-white rounded-md flex items-center justify-between p-10 text-cyan-200">
        <span>{data.user?.firstName}</span>
        <div className="chatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
