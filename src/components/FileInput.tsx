import classNames from 'classnames'
import React, { ChangeEvent, FC } from 'react'

interface FileInputProps {
    label: string
    name: string
    error: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


const FileInput: FC<FileInputProps> = ({
    label,
    name,
    error,
    onChange
}) => {
    return (
        <div className='flex flex-col py-4' >
            <label>{label}</label>
            <input
                className={classNames({
                    // button colors
                    'file:bg-green-50 file:text-green-500 hover:file:bg-green-100': true,
                    // button shape and spacing
                    'file:rounded-lg file:rounded-tr-none file:rounded-br-none': true,
                    'file:px-4 file:py-2 file:mr-4 file:border-none': true,
                    // overall input styling
                    'hover:cursor-pointer border rounded-lg text-gray-400': true,
                }, 'mt-3 w-min')}
                type='file'
                name= {name}
                required={true}
                onChange={onChange}
            />
            {error && <p className="error">Input filed can't be empty!</p>}

        </div>
    )
}

export default FileInput