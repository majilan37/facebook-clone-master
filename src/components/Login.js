import { useStateValue } from "../redux/StateProvider"

function Login() {
    const {handleSubmit} = useStateValue()
    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center p-[30px] ">
            <img className="object-contain h-[500px] " src="https://bit.ly/3nORy7J" alt="" />
            <button 
                className="bg-blue-500 px-12 py-6 text-xl text-white rounded-full m-[30px] hover:bg-blue-600 active:bg-blue-700"
                onClick={handleSubmit}
            >
                Log in with Facebook
            </button>
        </div>
    )
}

export default Login
