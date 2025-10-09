export default function SignUpCard(props) {
    return (
        <div className="w-full max-w-sm sm:max-w-md md:w-96 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Sign Up</h1>
            <input type="email" placeholder="e-mail" className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm" />
            <input type="password" placeholder="kata sandi" className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm" />
            <input type="password" placeholder="konfirmasi kata sandi" className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm" />
            <button className="w-full bg-black text-white py-2 rounded-lg font-semibold mb-4 hover:bg-gray-800 transition duration-300">Sign Up</button>
            <div className="w-full flex items-center my-2">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">atau</span>
                <div className="flex-grow h-px bg-gray-300" />
            </div>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mt-2 hover:bg-gray-100 transition duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-2" />
                <span className="font-medium text-sm">Lanjutkan dengan Google</span>
            </button>
        </div>
    );
}
