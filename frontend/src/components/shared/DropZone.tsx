import React, { useRef, useEffect} from 'react'
import { useUploadFileMutation } from '../../api/file'
import { Loader } from '..'
import { ServerError } from '../../helper/types/errorType'
import useNotify from '../../hooks/useNotify'


const DropZone = () => {

    const imageRef = useRef<HTMLInputElement>(null)
    const [uploadFile, { isLoading, isError, error, isSuccess }] = useUploadFileMutation()
    const { SuccessMessage, ErrorMessage } = useNotify()

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', imageRef.current?.files![0] as Blob)
        uploadFile(formData)
    }

    useEffect(() => {
        if (isError){
            const err = error as ServerError
            ErrorMessage(err.data.message)
        }

        if( isSuccess) SuccessMessage('Image uploaded successfully')
    })

    if (isLoading) return <Loader />

    return (
        <div>
            <form>
                <div className="opacity-80 my-7 border border-dashed bg-gray-300 border-gray-900 rounded-lg p-6 text-center cursor-pointer">
                    <div className="opacity-80 mb-7 border border-dashed bg-gray-300 border-gray-900 rounded-lg p-6 text-center cursor-pointer">
                        <label htmlFor="profile-picture" className="block text-2xl text-gray-700  tracking-wider font-mono">
                            Upload Image
                        </label>
                        <input
                            onChange={handleFileUpload}
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