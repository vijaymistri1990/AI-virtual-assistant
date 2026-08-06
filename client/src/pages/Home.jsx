import { useNavigate } from "react-router-dom";
import AssistantPreview from "../components/AssistantPreview";

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
    </div>
  );
};

export default Home;
