import { Logo } from "../../assets"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../helper/validation"
import { RegisterInput } from "../../helper/types/inputTypes"
import { Link } from "react-router-dom"
import { useRegisterUserMutation } from "../../api/auth"
import { Loader } from ".."
import useNotify from "../../hooks/useNotify"
import { ErrorState } from "../../helper/types/errorType"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAuth } from "../../state/feature/authSlice"


const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [registerUser, { isLoading, isError, error, isSuccess, data }] = useRegisterUserMutation()
    const { SuccessMessage, ErrorMessage } = useNotify()
    const {register, handleSubmit, formState: { errors }} = useForm<RegisterInput>({
        resolver: yupResolver(registerSchema)
    })
    const onSubmit: SubmitHandler<RegisterInput> = (data) => registerUser(data)

    useEffect(() => {
        if (isError) {
            const errorMessage = error as ErrorState
            ErrorMessage(errorMessage.error)
        }
        if (isSuccess) {
            SuccessMessage("User has been registered successfully")
            dispatch(setAuth(data))
            navigate("/")
        }
    }, [isError, isSuccess, ErrorMessage, SuccessMessage, error, navigate, data, dispatch])
    if (isLoading) return <Loader />


    return (
        <div className="z-40 bg-white p-10 flex flex-col items-center max-h-screen">
            <img
                className="w-28 mx-auto mb-11"
                src={Logo} alt="logo" />
            <span className="font-roboto text-gray-700 mx-auto">Join us and start shopping</span>
            <div className="mt-6 mb-4 font-roboto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex flex-col space-y-2 w-full md:w-fit">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="border border-gray-300 rounded-md p-2"
                                {...register("firstName")} />
                            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        </div>
                        <div className="flex flex-col space-y-2 w-full md:w-fit">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="border border-gray-300 rounded-md p-2"
                                {...register("lastName")} />
                            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 rounded-md p-2"
                            {...register("email")} />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="border border-gray-300 rounded-md p-2"
                            {...register("address")} />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="border border-gray-300 rounded-md p-2"
                            {...register("phoneNumber")} />
                        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex flex-col space-y-2 mt-4 w-full md:w-fit">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300 rounded-md p-2"
                                {...register("password")} />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="flex flex-col space-y-2 mt-4 w-full md:w-fit">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="border border-gray-300 rounded-md p-2"
                                {...register("confirmPassword")} />
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-900 delay-100 transition-all ease-in-out text-white rounded-md p-2 w-1/2">
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col items-center">
                <span className="font-roboto">Already have an account?</span>
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </div>
        </div>
    )
}

export default Register
