
import React from "react";
import { useState } from "react";

const UserContext = React.createContext();

function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext }; 
export default UserContextProvider; 