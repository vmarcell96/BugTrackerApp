//Packages
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
//Hooks
import useFlashMessages from "../hooks/useFlashMessages";

function FlashMessages() {
    const [show, setShow] = useState(true);
    const { messages, clearMessages } = useFlashMessages();
    const [currentMessages, setCurrentMessages] = useState([]);

    useEffect(() => {
        if (messages.length > 0) {
            setShow(true);
            setTimeout(()=>{setShow(false);},4000);
            setCurrentMessages(messages);
            clearMessages();
        }
    }, [messages]);

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            {show && (currentMessages.length > 0) &&
                <Alert variant="danger" dismissible onClose={handleClose}>
                    {currentMessages.map((message, index) => (<div key={index}>{message}</div>))}
                </Alert>
            }
        </>
    );
}

export default FlashMessages;