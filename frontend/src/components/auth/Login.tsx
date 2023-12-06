import { Logo } from "../../assets"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginInput } from "../../helper/types/inputTypes"
import { loginSchema } from "../../helper/validation"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAuth } from "../../state/feature/authSlice"
import { useNavigate } from "react-router-dom"
import { ErrorState } from "../../helper/types/errorType"
import { useLoginMutation } from "../../api/auth"
import useNotify from "../../hooks/useNotify"
import { Loader } from ".."



const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { isLoading, isError, error, isSuccess, data }] = useLoginMutation()
  const { SuccessMessage, ErrorMessage } = useNotify()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  })
  const onSubmit: SubmitHandler<LoginInput> = data => loginUser(data)

  useEffect(() => {
    if (isError) {
      const errorMessage = error as ErrorState
      ErrorMessage(errorMessage.error)
    }

    if (isSuccess) {
      SuccessMessage("User has been logged in successfully")
      dispatch(setAuth(data))
      navigate("/")
    }
  }, [isError, isSuccess, ErrorMessage, SuccessMessage, error, navigate, data, dispatch])

  if (isLoading) return <Loader />

  return (
    <div 
      className="z-40 bg-white p-10">
      <div className="flex flex-col items-center">
        <img 
          src={Logo} alt="logo" className="w-28 mx-auto mb-11" />
        <span className="font-roboto">Please enter your credentials</span>
        <div className="mt-6 mb-6 font-roboto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="border border-gray-300 rounded-md p-2" 
                {...register("email")} />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="password" className="mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                className="border border-gray-300 rounded-md p-2" 
                {...register("password")} />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-900 delay-100 transition-all ease-in-out text-white rounded-md p-2 w-1/2">
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center mt-4">
          <span className="font-roboto text-gray-700">Don't have an account?</span>
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </div>

        <div className="flex flex-col items-center mt-6">
          <span className="font-roboto text-gray-700">Forgot your password?</span>
          <Link to="/forgot-password" className="text-red-500 hover:underline">Reset Password</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
