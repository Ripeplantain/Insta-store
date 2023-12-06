import { toast } from "react-toastify";



const useNotify = () => {

    const SuccessMessage = (message: string) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    }

    const ErrorMessage = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    }

    const InfoMessage = (message: string) => {
        toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    }

    const WarningMessage = (message: string) => {
        toast.warn(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    }

    return { SuccessMessage, ErrorMessage, InfoMessage, WarningMessage }
}

export default useNotify;