import { ChangeEvent, FC } from "react"

interface TextFieldProps {
    type: 'text' | 'number' | 'email' | 'password'
    label: string
    value: string | number
    name: string
    placeholder: string
    error: boolean
    disabled?: boolean
    maxLenght?: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


const TextField: FC<TextFieldProps> = ({
    type,
    label,
    value,
    name,
    placeholder,
    error,
    disabled,
    maxLenght,
    onChange,
}) => {
    return (
        <div className='flex flex-col py-4 '>
            <label>{label}</label>

            <input
                className='mt-3 rounded-sm flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                type={type}
                id={label}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required = {true}
                maxLength={maxLenght}
            />
            {error && <p className="error">Input filed can't be empty!</p>}

        </div>
    )
}

export default TextField