import Dropzone from "react-dropzone"
import { useState } from "react"
import { CheckIcon } from "../assets/icons"


const DropZone = () => {

    const [fileName, setFileName] = useState<string>('')

    const handleSubmit = (files: File[]) => {
        console.log(files)
        setFileName(files[0].name)
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
                    <span>has been uploaded successfully</span>
                </div>
            )}
        </div>
    )
}

export default DropZone
