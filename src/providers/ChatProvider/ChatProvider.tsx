import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { I_Chat } from '../../types/I_Chat';
import { I_Message } from '../../types/I_Message';
import { E_Storage } from '../../types/E_Storage';

type Actions =
  | { type: 'ADD_CHAT'; payload: I_Chat }
  | { type: 'SET_ACTIVE_CHAT'; payload: number }
  | { type: 'ADD_MESSAGE'; payload: I_Message }
  | {
      type: 'CHANGE_CHAT';
      payload: { chatId: number; data: Pick<I_Chat, 'clientName'> };
    };

interface InitialState {
  chats: I_Chat[];
  messages: Record<number, I_Message[]>;
  activeChatId: number | null;
}

type ContextValue = InitialState & {
  dispatch: React.ActionDispatch<[Actions]>;
};

const defaultContext: ContextValue = {
  chats: [],
  messages: {},
  activeChatId: null,
  dispatch: () => {},
};

const StateContext = createContext<ContextValue>(defaultContext);

interface StateProviderProps {
  children: ReactNode;
}

const reducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case 'ADD_CHAT': {
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        messages: { ...state.messages, [action.payload.chatId]: [] },
      };
    }
    case 'SET_ACTIVE_CHAT': {
      return { ...state, activeChatId: action.payload };
    }
    case 'CHANGE_CHAT': {
      return {
        ...state,
        chats: [...state.chats].map((chat) =>
          chat.chatId === action.payload.chatId
            ? { ...chat, clientName: action.payload.data.clientName }
            : chat
        ),
      };
    }
    case 'ADD_MESSAGE': {
      const isHaveChat = Object.hasOwn(state.messages, action.payload.chatId);
      return {
        ...state,
        chats: [
          ...state.chats.map((chat) =>
            chat.chatId === action.payload.chatId
              ? {
                  ...chat,
                  lastMessage: {
                    lastTimeMessage: action.payload.time,
                    text: action.payload.text,
                  },
                }
              : chat
          ),
        ],
        messages: {
          ...state.messages,
          [action.payload.chatId]: isHaveChat
            ? [...state.messages[action.payload.chatId], action.payload]
            : [action.payload],
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

const ChatProvider: FC<StateProviderProps> = ({ children }) => {
  const storageChats = useMemo(() => {
    const storage = sessionStorage.getItem(E_Storage.CHATS);
    return storage ? JSON.parse(storage) : null;
  }, []);

  const storageMessages = useMemo(() => {
    const storage = sessionStorage.getItem(E_Storage.MESSAGES);
    return storage ? JSON.parse(storage) : null;
  }, []);

  const [state, dispatch] = useReducer<InitialState, [Actions]>(reducer, {
    chats: storageChats || [],
    messages: storageMessages || {},
    activeChatId: null,
  });

  return <StateContext value={{ ...state, dispatch }}>{children}</StateContext>;
};

export const useChatContext = () => useContext(StateContext);

export default ChatProvider;
