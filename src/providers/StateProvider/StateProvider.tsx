import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { E_Storage } from '../../types/E_Storage';

interface ContextValue {
  idInstance: string | null;
  apiTokenInstance: string | null;
  methods: {
    setInstance: (instanceID: string, instanceTOKEN: string) => void;
    logout: () => void;
  } | null;
}

const defaultContext: ContextValue = {
  idInstance: null,
  apiTokenInstance: null,
  methods: null,
};

const StateContext = createContext<ContextValue>(defaultContext);

interface StateProviderProps {
  children: ReactNode;
}

const StateProvider: FC<StateProviderProps> = ({ children }) => {
  const storageInstance: {
    idInstance: string;
    apiTokenInstance: string;
  } | null = useMemo(() => {
    const storage = sessionStorage.getItem(E_Storage.INSTANCE);

    return storage ? JSON.parse(storage) : null;
  }, []);

  const [state, setState] = useState<Omit<ContextValue, 'methods'>>({
    idInstance: storageInstance && storageInstance.idInstance,
    apiTokenInstance: storageInstance && storageInstance.apiTokenInstance,
  });

  const setInstance = useCallback(
    (idInstance: string, apiTokenInstance: string) => {
      setState((prev) => {
        return {
          ...prev,
          idInstance,
          apiTokenInstance,
        };
      });

      sessionStorage.setItem(
        E_Storage.INSTANCE,
        JSON.stringify({
          idInstance,
          apiTokenInstance,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setState((prev) => {
      return {
        ...prev,
        idInstance: null,
        apiTokenInstance: null,
      };
    });
    sessionStorage.clear();
  }, []);

  return (
    <StateContext value={{ ...state, methods: { setInstance, logout } }}>
      {children}
    </StateContext>
  );
};

export const useChatStateContext = () => useContext(StateContext);

export default StateProvider;
