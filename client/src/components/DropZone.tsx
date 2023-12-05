import React from "react"
import Dropzone from "react-dropzone"
import { useState } from "react"
import { CheckIcon } from "../assets/icons"
import { axiosInstance } from "../helpers/axios"


axiosInstance.interceptors.request.use(async req => {
    req.headers['Content-Type'] = 'multipart/form-data';
    return req;
})

interface DropZoneProps {
    setFilePath: (filePath: string) => void
}

const DropZone: React.FC<DropZoneProps> = ({setFilePath}) => {

    const [fileName, setFileName] = useState<string>('')

    const handleSubmit = async (files: File[]) => {
        try {
            const form = new FormData()
            form.append('file', files[0])
            const res = await axiosInstance.post('file', form);
            setFilePath(res.data.data)
            setFileName(res.data.message)
        } catch (error){
            console.log(error)
        }
    }

    return (
        <div 
            className="opacity-80 my-7 border border-dashed bg-gray-300 border-gray-900 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer">
            <Dropzone onDrop={(acceptedFiles) => handleSubmit(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {fileName && (
                <div className="flex justify-center items-center gap-2 mt-4 text-emerald-800">
                    <CheckIcon />
                    <span>{fileName}</span>
                </div>
            )}
        </div>
    )
}

// export default React.memo(DropZone)
const MemoizedDropZone = React.memo(DropZone)
export { MemoizedDropZone as DropZone }
