import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signin = async () => {
        if (!email.trim() || !password.trim()) {
            return toast.error("Please fill in all fields");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email address");
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(auth.currentUser));
            toast.success("Signin Successful");
            navigate('/');
        } catch (error) {
            console.log(error);
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                toast.error("Invalid email or password. Please try again.");
            } else {
                toast.error("An error occurred during sign-in. Please try again later.");
            }
        }
    };

    const validateEmail = (email) => {
        // Basic email validation using regular expression
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signin}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account
                        <Link className=' text-yellow-500 font-bold' to={'/signup'}> Signup</Link></h2>
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    )
}

export default Login;
