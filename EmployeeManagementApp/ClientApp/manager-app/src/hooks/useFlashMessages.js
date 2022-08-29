import { useContext } from "react";
import { FlashMessageContext } from "../context/FlashMessageProvider";

function useFlashMessages() {
    return useContext(FlashMessageContext);
}

export default useFlashMessages;