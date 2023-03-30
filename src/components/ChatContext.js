import { createContext, useEffect, useReducer } from "react";
import { useFirebaseAuth } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const currentUser = useFirebaseAuth();
  console.log(currentUser);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = async (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const newState = {
          user: action.payload,
          chatId:
            currentUser?.uid && action.payload?.uid
              ? currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
              : null,
        };
        console.log(newState);
        return newState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  console.log(state);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
