import React, { useRef, useEffect} from 'react'
import { useUploadFileMutation } from '../../api/file'
import { Loader } from '..'
import { ServerError } from '../../helper/types/errorType'


const DropZone = () => {

    const imageRef = useRef<HTMLInputElement>(null)
    const [uploadFile, { isLoading, isError, error }] = useUploadFileMutation()

    return (
        <div>
            <form>
                <div className="opacity-80 my-7 border border-dashed bg-gray-300 border-gray-900 rounded-lg p-6 text-center cursor-pointer">
                    <div className="opacity-80 mb-7 border border-dashed bg-gray-300 border-gray-900 rounded-lg p-6 text-center cursor-pointer">
                        <label htmlFor="profile-picture" className="block text-2xl text-gray-700  tracking-wider font-mono">
                            Upload Image
                        </label>
                        <input
                            ref={imageRef}
                            type="file" id="profile-picture" className="hidden" />
                        <p className="text-gray-500 text-sm mt-2">Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

const MemoizedProductForm   = React.memo(DropZone)
export default MemoizedProductForm