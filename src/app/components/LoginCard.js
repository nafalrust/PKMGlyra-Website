'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, loginWithGoogle } from '@/lib/auth';

export default function LoginCard(props) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await loginWithEmail(email, password);

        if (result.success) {
            // Redirect to identity page or dashboard
            router.push('/identity');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        const result = await loginWithGoogle();

        if (result.success) {
            router.push('/identity');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md md:w-96 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Login</h1>
            
            {error && (
                <div className="w-full mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="w-full">
                <input 
                    type="email" 
                    placeholder="e-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm" 
                />
                <input 
                    type="password" 
                    placeholder="kata sandi" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm" 
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded-lg font-semibold mb-4 hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>

            <div className="w-full flex items-center my-2">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">atau</span>
                <div className="flex-grow h-px bg-gray-300" />
            </div>
            
            <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mt-2 hover:bg-gray-100 transition duration-300 disabled:bg-gray-200"
            >
                <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                <span className="font-medium text-sm">Lanjutkan dengan Google</span>
            </button>

            <div className="mt-4 text-sm text-gray-600">
                Belum punya akun? <a href="/signup" className="text-red-400 hover:underline font-semibold">Sign Up</a>
            </div>
        </div>
    );
}