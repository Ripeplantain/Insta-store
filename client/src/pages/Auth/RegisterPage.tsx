import { Login, Logo } from "../../assets/image"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../helpers/validation"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { RegisterForm } from "../../helpers/types/form"



const RegisterPage = () => {

  const { registerUser } = useAuth()

  const styling = {
    backgroundImage: `url(${Login})`,
    backgroundSize: 'cover',
    backgroundCover: 'center',
    height: '100vh'
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => registerUser(data)

  return (
    <div
      className="flex justify-center items-center"
      style={styling}>
      <div className="absolute top-0 left-0 w-full h-full bg-primary/80"></div>
      <div className="z-10 bg-white p-20 text-center rounded-3xl">
        <img src={Logo} alt="Logo" className="w-28 mx-auto mb-11" />
        <span className="font-roboto">Please enter your credentials</span>
        <div className="mt-6 mb-4 font-roboto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="flex flex-col space-y-2">
                <label
                  className="text-start"
                  htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-red-500">{errors.firstName?.message}</p>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <label
                  className="text-start"
                  htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-red-500">{errors.lastName?.message}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                className="text-start"
                htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div className="flex">
              <div className="flex flex-col space-y-2">
                <label
                  className="text-start"
                  htmlFor="address">Address</label>
                <input
                  type="address"
                  id="address"
                  {...register("address")}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-red-500">{errors.address?.message}</p>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <label
                  className="text-start"
                  htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-red-500">{errors.phoneNumber?.message}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                className="text-start"
                htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                className="text-start"
                htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-500 text-white rounded-md p-3 mt-2 
                        focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Register
            </button>
          </form>
        </div>
        <span>Already have an account? <Link className="text-blue-700 cursor-pointer" to="/login">
          Click Here
        </Link></span>
      </div>
    </div>
  )
}

export default RegisterPage
