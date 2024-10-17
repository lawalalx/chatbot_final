import { createContext, ReactNode, FC, useState, useContext } from "react";

interface AuthUserProps {
    id: string;
    fullName?: string;
    username?: string;
    profilePic?: string;
}

interface AuthContextProps {
    authUser: AuthUserProps | null;
    setAuthuser: (user: AuthUserProps | null) => void; // Specify the user type
}

export const AuthContext = createContext<AuthContextProps>({
    authUser: null,
    setAuthuser: () => {}
});

interface AuthContentProviderProps {
    children: ReactNode;
}

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContentProvider: FC<AuthContentProviderProps> = ({ children }) => {

    const storedUser = localStorage.getItem("chat-user");
    const parsedUser: AuthUserProps | null = storedUser ? JSON.parse(storedUser) : null;

    const [authUser, setAuthuser] = useState<AuthUserProps | null>(parsedUser);

    console.log("This is the Auth user from the AuthContext.tsx", authUser);

    return (
        <AuthContext.Provider value={{ authUser, setAuthuser }}>
            {children}
        </AuthContext.Provider>
    );
};
