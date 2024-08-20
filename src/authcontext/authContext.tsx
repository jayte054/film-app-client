import { createContext, useMemo, useState } from "react";

interface UserContextProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<any>(null)

export const UserProvider: React.FC<UserContextProps> = ({children}: UserContextProps) => {
    const [user, setUser] = useState<any>({
        id: "", 
        email: "", 
        fullName: "", 
        isAdmin: "", 
        accessToken: ""
    })

    const updateUser = (userData: any) => {
        console.log(userData)
        setUser((data: any) => ({
          ...data,
          id: userData.user.authId,
          email: userData.user.email,
          fullName: userData.user.fullName,
          isAdmin: userData.user.isAdmin,
          accessToken: userData.accessToken,
        }));
    };

    // const contextValue = useMemo(() => ({user, updateUser}), [user]);

    return (
        <AuthContext.Provider value={{ user, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}