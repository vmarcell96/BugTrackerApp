import { createContext } from "react";
import { useState } from "react";

export const FlashMessageContext = createContext({});

function FlashMessageProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const flash = (message) => {
        setMessages([...messages, message]);
    }

    const clearMessages = () => {
        setMessages([]);
    }

    return (
        <FlashMessageContext.Provider value={{ messages, flash, clearMessages }}>
            {children}
        </FlashMessageContext.Provider>
    );
}

export default FlashMessageProvider;