import * as yup from "yup";



const loginSchema = yup
    .object({
        email: yup.string().required("Email is required").email("Email is invalid"),
        password: yup.string().required("Password is required").min(8, "Password must be at least 6 characters")
    })


const registerSchema = yup
    .object({
        firstName: yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters"),
        lastName: yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters"),
        address: yup.string().required("Address is required").min(2, "Address must be at least 2 characters"),
        phoneNumber: yup.string().required("Phone Number is required").min(10, "Phone Number must be at least 10 characters"),
        email: yup.string().required("Email is required").email("Email is invalid"),
        password: yup.string().required("Password is required").min(8, "Password must be at least 10 characters"),
        confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match")
    })


const vendorSchema = yup
    .object({
        name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
        description: yup.string().required("Description is required").min(2, "Description must be at least 2 characters"),
        deliveryType: yup.string().required("Dilivery Type is required").min(2, "Dilivery Type must be at least 2 characters"),
    })


const productSchema = yup
    .object({
        name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
        description: yup.string().required("Description is required").min(2, "Description must be at least 2 characters"),
        price: yup.string().required("Price is required").min(2, "Price must be at least 2 characters"),
        quantity: yup.string().required("Quantity is required").min(2, "Quantity must be at least 2 characters"),
        picture: yup.string().required("Picture is required").min(2, "Picture must be at least 2 characters"),
        cartegory_id: yup.string().required("Cartegory is required").min(2, "Cartegory must be at least 2 characters"),
    })



export { loginSchema, registerSchema, vendorSchema, productSchema }