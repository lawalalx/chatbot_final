import { createContext, ReactNode, FC, useState, useContext } from "react";


interface AuthContextProps {
  authUser: Object | null;
  setAuthuser: (user: Object | null) => void;
}

  
export const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  setAuthuser: () => {}
});



interface AuthContentProviderProps {
  children: ReactNode;
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}


export const AuthContentProvider: FC<AuthContentProviderProps> = ({ children }) => {
  
  const [authUser, setAuthuser] = useState<Object | null>(localStorage.getItem("chat-user"));  
  return (
    <AuthContext.Provider value={{ authUser, setAuthuser }}>
      {children}
    </AuthContext.Provider>
  );
}