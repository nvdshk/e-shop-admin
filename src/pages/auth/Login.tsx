import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/ecommerce.jpg'
import { LoginPayload } from '../../interface/userInteface'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from '../../features/auth/authApis';


const Login = () => {

    const [login, { error, isSuccess,isLoading, data }] = useLoginMutation()

    const navigate = useNavigate()

    useEffect(() => {
        
        if (data != null) {
        //   const message = 'Login successfull'
        //   toast.success(message)
          navigate('/')
        }
        if (error) {
          if ('data' in error) {
            const errorData = error as any
            toast.error(errorData.data.message)
          }
        }
      }, [isSuccess, error, data])

    const [form, setForm] = useState<LoginPayload>({
        email: '',
        password: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            [event.target.name]: event.target.value

        })
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = form
        await login(data)
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt='Login image'></img>
            </div>
            <div className='bg-gray-100 flex flex-col justify-center rounded'>
                <ToastContainer
                    position="top-right"
                    autoClose={500}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="light"
                />
                <form className='max-w-[400px] w-full mx-auto bg-white p-4 rounded' onSubmit={handleSubmit}>
                    <h2 className='text-4xl font-bold text-center py-6'>E-Shop Admin</h2>
                    <div className='flex flex-col py-2'>
                        <label>Email</label>
                        <input
                            className='border p-2 my-2'
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input
                            className='border p-2 my-2'
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex w-full my-5'>
                        <Button type='submit' loading={isLoading} children='Login'/>
                    </div>
                    <div className='flex justify-between'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                        <p>Create an account</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login