import { Login, Logo } from "../../assets/image"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../helpers/validation"
import { Link } from "react-router-dom"
import { LoginForm } from "../../helpers/types/form"
import useAuth from "../../hooks/useAuth"



const LoginPage = () => {

    const { login } = useAuth()

  const styling = {
    backgroundImage: `url(${Login})`,
    backgroundSize: 'cover',
    backgroundCover: 'center',
    height: '100vh'
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginForm> = async (data) => login(data)

  return (
    <div
      className="flex justify-center items-center overflow-hidden"
      style={styling}>
      <div className="absolute top-0 left-0 w-full h-full bg-primary/80"></div>
      <div className="z-10 bg-white p-20 text-center rounded-3xl">
        <img src={Logo} alt="Logo" className="w-28 mx-auto mb-11" />
        <span className="font-roboto">Please enter your credentials</span>
        <div className="mt-6 mb-4 font-roboto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-500 text-white rounded-md p-3 mt-2 
                        focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Login
            </button>
          </form>
        </div>
        <span>Don&apos;t have an account? <Link className="text-blue-700 cursor-pointer" to="/register">
          Click Here
        </Link></span>
      </div>
    </div>
  )
}

export default LoginPage
