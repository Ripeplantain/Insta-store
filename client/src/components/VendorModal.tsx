import { CloseIcon, InfoIcon } from "../assets/icons"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { vendorSchema } from "../helpers/validation";
import { VendorForm } from "../helpers/types/form";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncVendor } from "../state/features/vendorSlice";
import { selectError, selectLoading, resetVendor, selectSuccess } from "../state/features/vendorSlice";
import { RotatingLines } from "react-loader-spinner";
import useFlashMessages from "../hooks/useFlashMessages";
import { useEffect } from "react";


interface Prop {
    setShowVendorModal: (value: boolean) => void;
}


const VendorModal: React.FC<Prop> = ({setShowVendorModal}) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(vendorSchema)
    });
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const success = useSelector(selectSuccess);
    const { showErrorMessage, showSuccessMessage } = useFlashMessages();

    const onSubmit: SubmitHandler<VendorForm> = (data) => {
        dispatch(createAsyncVendor(data));
    };

    useEffect(() => {
        if(error) {
            showErrorMessage(error);
            dispatch(resetVendor());
        } 
    }, [error, dispatch, showErrorMessage])

    useEffect(() => {
        if(success){
            showSuccessMessage(success);
            dispatch(resetVendor());
            setShowVendorModal(false);
        }
    }, [success, dispatch, showSuccessMessage, setShowVendorModal])

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }

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
                            <option>Delivery</option>
                            <option>Pickup</option>
                            <option>Both</option>
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

export default VendorModal
