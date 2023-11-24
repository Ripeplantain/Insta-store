import useAxios from "./useAxios";
import useFlashMessages from "./useFlashMessages";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, removeCredentials } from "../state/features/authSlice";
import { LoginForm, RegisterForm } from "../helpers/types/form";
import { ErrorState } from "../helpers/types/error";


const useAuth = () => {
    const {axiosInstance } = useAxios()
    const { showSuccessMessage, showErrorMessage } = useFlashMessages()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const login = async (data: LoginForm) => {
        try {
            const response = await axiosInstance.post('/login', data)
            console.log(response.data)
            dispatch(setCredentials(response.data))
            navigate('/')
            showSuccessMessage('Login successful')
        } catch (err) {
            const error = err as ErrorState
            console.log(error)
            showErrorMessage(error.response.data)
        }
    }

    const registerUser = async (data: RegisterForm) => {
        try {
            const response = await axiosInstance.post('/register', data)
            dispatch(setCredentials(response.data))
            navigate('/')
            showSuccessMessage('Registration successful')
        } catch (err) {
            const error = err as ErrorState
            showErrorMessage(error.response.data)
        }
    }

    const logout = async (data: {refreshToken:string | null}) => {
        try{
            await axiosInstance.post('/logout', data)
            dispatch(removeCredentials())
            navigate('/login')
            showSuccessMessage('Logout successful')
        } catch (err) {
            const error = err as ErrorState
            console.log(error)
            showErrorMessage(error.response.data)
        }
    }

    return { login, registerUser, logout }
}

export default useAuth