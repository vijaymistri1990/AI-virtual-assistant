import { HiOutlineSparkles } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradiant-to-br from-purple-5 via-white to-emerald-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex justify-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* left div */}
                <div>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-100 text-purple-600 text-sm font-bold'>
                        <HiOutlineSparkles />
                        <span className='text-xs'>AI Voice Assistant Platform</span>
                    </div>
                    <h1 className="mt-8 text-xl lg:text-7xl folt-black leading-tight text-[#081028]">Build AI Assistants <span className='block text-transparent bg-clip-text bg-linear-to-r from-purple-600  to-emerald-500'>For any Website</span></h1>
                    <p className="mt-8 text-lg text-gray-600 leading-8 max-w-2xl">
                        Create customizable AI voice assistant that talk,guide users, capture leads,and boost your engagement - all while your website stays accesible to everyone and integrate to any website.
                    </p>
                    <button className="bg-linear-to-r from-purple-400 to-emerald-400 hover:from-purple-600 hover:to-emerald-600 transition-all duration-300 text-white font-bold py-3 px-6 rounded-full mt-8 flex items-center gap-2">
                        <FcGoogle size={28}/>
                        <span className="text-lg">Continue with Google</span>
                    </button>
                </div>
                {/* right div */}
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default Login