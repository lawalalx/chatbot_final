import { createContext, useState, useEffect, useContext, ReactNode, FC } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";

interface SocketContextProviderProps {
  children: ReactNode;
}

interface OnlineUser {
  userId: string;
  username: string;
}

interface SocketContextType {
  socket: typeof Socket | null;
  onlineUsers: OnlineUser[];
}

// Create context with type-checking
const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser.id,
        },
      });

      setSocket(newSocket);

      // Listen to the online users' updates
      newSocket.on("getOnlineUsers", (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });

      // Clean up when component unmounts or authUser changes
      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      // If no authUser, close the socket if it exists
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
