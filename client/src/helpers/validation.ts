import * as yup from "yup";



const loginSchema = yup
    .object({
        email: yup.string().required("Email is required").email("Email is invalid"),
        password: yup.string().required("Password is required").min(10, "Password must be at least 6 characters")
    })


const registerSchema = yup
    .object({
        firstName: yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters"),
        lastName: yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters"),
        address: yup.string().required("Address is required").min(2, "Address must be at least 2 characters"),
        phoneNumber: yup.string().required("Phone Number is required").min(10, "Phone Number must be at least 10 characters"),
        email: yup.string().required("Email is required").email("Email is invalid"),
        password: yup.string().required("Password is required").min(10, "Password must be at least 10 characters"),
        confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match")
    })



export { loginSchema, registerSchema }