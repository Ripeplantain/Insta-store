import React, {useEffect} from 'react'
import { CloseIcon, InfoIcon } from '../../assets/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { vendorSchema } from '../../helper/validation'
import { VendorInput } from '../../helper/types/inputTypes'
import { useCreateVendorMutation } from '../../api/vendor'
import { Loader } from '..'
import useNotify from '../../hooks/useNotify'
import { useDispatch } from 'react-redux'
import { setVendor } from '../../state/feature/vendorSlice'
import { updateUserType } from '../../state/feature/authSlice'
import { ServerError } from '../../helper/types/errorType'


interface Props {
    setShowVendorModal: React.Dispatch<React.SetStateAction<boolean>>
}

const VendorModal: React.FC<Props> = ({setShowVendorModal}) => {

    const dispatch = useDispatch()
    const { SuccessMessage, ErrorMessage } = useNotify()
    const [createVendor, { data: vendorData, isLoading, isError , error }] = useCreateVendorMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<VendorInput>({
        resolver: yupResolver(vendorSchema)
    })
    const onSubmit = (data: VendorInput) => createVendor(data)

    useEffect(() => {
        if (vendorData) {
            dispatch(setVendor(vendorData))
            dispatch(updateUserType('vendor'))
            SuccessMessage('Vendor application submitted successfully')
            setShowVendorModal(false)
        }

        if (isError) {
            const errorMessage = error as ServerError
            console.log(errorMessage)
            ErrorMessage(errorMessage.data.message)
        }
    }, [vendorData, dispatch, SuccessMessage, setShowVendorModal, isError, ErrorMessage, error])

    if (isLoading) return <Loader />



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold font-roboto uppercase tracking-wider">Become a vendor</h2>
                    <button
                        onClick={() => setShowVendorModal(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="flex gap-2 items-center">
                    <InfoIcon />
                    <span className="text-sm text-gray-600">No long Forms. Just start selling</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Shop Name"
                            {...register("name")}
                        />
                        <p>{errors.name?.message}</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Shop Description</label>
                        <textarea
                            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Shop Description"
                            {...register("description")}
                        />
                        {errors.description?.message}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Delivery Type</label>
                        <select
                            {...register("deliveryType")}
                            className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                            <option>Both</option>
                            <option>Delivery</option>
                            <option>Pickup</option>
                        </select>
                        {errors.deliveryType?.message}
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={() => setShowVendorModal(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                            Apply
                        </button>
                    </div>

                </form> 
            </div>
        </div>
    )
}

const MermoizedVendorModal = React.memo(VendorModal)
export default MermoizedVendorModal
