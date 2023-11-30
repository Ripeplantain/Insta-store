import { CloseIcon, InfoIcon } from "../assets/icons"


interface Prop {
    setShowVendorModal: (value: boolean) => void;
}


const VendorModal: React.FC<Prop> = ({setShowVendorModal}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold font-roboto">Become a vendor</h2>
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

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setShowVendorModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VendorModal
