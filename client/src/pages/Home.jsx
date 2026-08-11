import { useNavigate } from "react-router-dom";
import AssistantPreview from "../components/AssistantPreview";

const steps = [
  {
    number: "01",
    title: "Sign up free",
    description: "Continue with Google and create your assistant instantly.",
  },
  {
    number: "02",
    title: "Customize assistant",
    description: "Set your business name, tone, voice and theme.",
  },
  {
    number: "03",
    title: "Train your assistant",
    description: "Add business details and personalize responses.",
  },
  {
    number: "04",
    title: "Embed anywhere",
    description: "Copy one script tag and add it to your website.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-white to-emerald-50" />
        <div className="absolute top-0 left-1/4 w-[320px] h-80 bg-purple-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[320px] h-80 bg-emerald-200/40 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-semibold text-gray-600">
              Voice AI for modern websites
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 tracking-tight leading-tight mb-8">
            Add a{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-emerald-400">
              Virtual Assistant
            </span>
            <br />
            to your website
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Create a smart voice-enabled assistant that talks to visitors,
            answers questions and helps users navigate your website instantly.
          </p>

          {/* Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/builder")}
              className="px-8 py-3 rounded-xl bg-linear-to-r from-purple-500 to-emerald-400 text-white font-medium text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
            >
              Build Your Assistant
            </button>
          </div>
          <p className="mt-6 text-gray-400 text-sm font-medium">
            Free plan includes 200 AI responses
          </p>
        </div>
        <AssistantPreview/>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get started in minutes
            </h2>
            <p className="text-gray-500 text-lg">
              Simple setup. No complicated integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-50/70 rounded-3xl p-8 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 border border-slate-100"
              >
                <div className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-emerald-400 mb-6 inline-block">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_footer)" />
              <path
                d="M21 10.5H13C11 10.5 11 13.5 13 13.5H19C21 13.5 21 16.5 19 16.5H11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 16.5V19.5C11 21 12 21.5 14 21.5H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_footer"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold text-gray-200 tracking-tight">
              Sana{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-teal-400">
                AI
              </span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sana AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
