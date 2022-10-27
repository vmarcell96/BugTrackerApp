//Packages
import { useContext } from "react";
//Hooks
import { FlashMessageContext } from "../context/FlashMessageProvider";

function useFlashMessages() {
    return useContext(FlashMessageContext);
}

export default useFlashMessages;