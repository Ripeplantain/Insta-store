import * as yup from 'yup';


export const loginSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required().min(6, "Password must be at least 6 characters")
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required").min(4, "Address must be at least 4 characters"),
  phoneNumber: yup.string().required("Phone number is required").min(10, "Phone number must be at least 10 characters"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
});

export const vendorSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required").min(4, "Description must be at least 4 characters"),
  deliveryType: yup.string().required("Delivery type is required"),
})