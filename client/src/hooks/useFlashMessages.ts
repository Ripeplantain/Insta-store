import { toast } from "react-toastify";



const useFlashMessages = () => {

    const showSuccessMessage = (message: string) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    const showErrorMessage = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    const showInfoMessage = (message: string) => {
        toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    return { showSuccessMessage, showErrorMessage, showInfoMessage }
}

export default useFlashMessages;