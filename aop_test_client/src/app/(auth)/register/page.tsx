"use client"
import { FormEvent, useState } from 'react';
import { BASE_URL } from '@/constant/url'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [user, setUser] = useState({ username: '', password: '' })
    const router = useRouter()
    function register(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        axios({
            url: `${BASE_URL}/users/register`,
            method: 'POST',
            data: { username: user.username, password: user.password }
        })
            .then((res) => {
                if (res.status !== 200) throw new Error("something went wrong");
                return res.data;
            })
            .then(({ token: access_token }) => {
                router.push('/login')
                document.cookie = `access_token=${access_token}; path=/; max-age=14400`
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Register Success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: `ERROR ${error.response.status}`,
                    text: error.response.data.error.message,
                });
            })
    }
    return (
        <main className="flex h-screen items-center justify-center bg-slate-900 flex-col">
            <GitHubIcon className=' text-6xl text-gray-300 mb-7' />
            <h2 className=' text-gray-300 mb-3'>Sign up to GitHub Jobs</h2>
            <form className='flex flex-col bg-gray-300 p-5 rounded-md border border-gray-600 gap-3 w-64 sm:w-72' onSubmit={register}>
                <div className='flex flex-col text-sm gap-2'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' onChange={e => setUser((prev) => ({ ...prev, username: e.target.value }))} value={user.username} className=' rounded px-3 py-1 border border-gray-400' />
                </div>
                <div className='flex flex-col text-sm gap-2'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={e => setUser((prev) => ({ ...prev, password: e.target.value }))} value={user.password} className='rounded px-3 py-1 border border-gray-400' />
                </div>
                <button type="submit" className='w-full rounded-md bg-green-700 hover:bg-green-800 p-1 text-gray-200'>Register</button>
            </form>

            <div className='flex text-xs bg-gray-100 py-5 items-center justify-center rounded-md border border-gray-600 gap-3 w-64 sm:w-72 mt-4'>
                <p>Already have an account? <Link href={'/login'} className='text-blue-500 hover:underline'>Sign in</Link></p>
            </div>
        </main>
    )
}
