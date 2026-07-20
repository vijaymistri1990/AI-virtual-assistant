import axios from 'axios';
import { HiOutlineCodeBracket, HiOutlineMicrophone, HiOutlineSparkles, HiOutlineBolt } from 'react-icons/hi2';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { BASE_URL } from '../utils/Constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const Features=[
        {
            icon:<HiOutlineMicrophone className="w-6 h-6"/>,
            title:'Voice AI',
            desc:"Natural real-time voice conversations"
        },
        {
            icon:<HiOutlineSparkles className="w-6 h-6"/>,
            title:'Smart Navigation',
            desc:"Navigate pages effortlessly using voice commands"  
        },
        {
            icon:<HiOutlineCodeBracket className="w-6 h-6"/>,
            title:'Easy Embed',
            desc:"Embed in any website — no technical skills required"  
        },
        {
            icon:<HiOutlineBolt className="w-6 h-6"/>,
            title:'Fast Response',
            desc:"Optimized lightning-fast Gemini AI responses"  
        },
    ]

const handleLogin = async()=>{
    try {
        const result = await signInWithPopup(auth,provider)
        const {displayName,email}= result.user
        const res = await axios.post(`${BASE_URL}/auth/googleauth`,{
            name:displayName,
            email
        },{withCredentials:true})

        console.log(res.data)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-emerald-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex justify-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* left div */}
                <div>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-100 text-purple-600 text-sm font-bold'>
                        <HiOutlineSparkles />
                        <span className='text-xs'>AI Voice Assistant Platform</span>
                    </div>
                    <h1 className="mt-8 text-4xl lg:text-7xl font-black leading-tight text-[#081028]">Build AI Assistants <span className='block text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-emerald-500'>For any Website</span></h1>
                    <p className="mt-8 text-lg text-gray-600 leading-8 max-w-2xl">
                        Create customizable AI voice assistants that talk, guide users, capture leads, and boost your engagement — while your website stays accessible to everyone and integrates seamlessly with any platform.
                    </p>
                    <button onClick={handleLogin} className="bg-linear-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-purple-500/20 text-white font-bold py-3.5 px-8 rounded-full mt-8 flex items-center gap-3">
                        <FcGoogle size={28}/>
                        <span  className="text-lg">Continue with Google</span>
                    </button>
                    <p className="mt-4 text-left text-gray-500 text-sm font-medium">Free plan includes 200 AI responses</p>
                </div>
                {/* right div */}
                <div className='relative'>
                    <div className='absolute -inset-4 bg-linear-to-br from-purple-400/30 to-emerald-400/30 rounded-3xl blur-2xl -z-10'></div>
                    <div className='relative rounded-2xl bg-white/90 backdrop-blur-sm p-6 sm:p-8 shadow-2xl border border-gray-100 max-w-md mx-auto'>
                        <div className='text-center mb-6'>
                            <h2 className='text-2xl font-bold text-[#081028] tracking-tight'>Welcome to AI Assistant</h2>
                            <p className='text-gray-500 text-sm font-medium mt-1'>Experience next-generation voice intelligence</p>
                        </div>
                        <div className='space-y-3.5'>
                            {Features.map((feature,index)=>(
                                <div 
                                    key={index} 
                                    className='group flex items-start gap-4 p-4 rounded-xl bg-slate-50/80 hover:bg-white border border-gray-100 hover:border-purple-200/80 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300'
                                >
                                    <div className='w-12 h-12 shrink-0 rounded-xl bg-linear-to-br from-purple-500 to-emerald-500 group-hover:scale-105 transition-transform duration-300 text-white flex items-center justify-center shadow-md shadow-purple-500/20'>
                                        {feature.icon}
                                    </div>
                                    <div className='flex-1 min-w-0 pt-0.5'>
                                        <h3 className='text-sm font-bold text-gray-900 tracking-wide group-hover:text-purple-600 transition-colors'>
                                            {feature.title}
                                        </h3>
                                        <p className='mt-1 text-xs sm:text-sm font-sans font-medium text-gray-600 leading-relaxed'>
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login