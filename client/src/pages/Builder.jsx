import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL, CLIENT_URL } from "../utils/Constants";

export const Builder = ({ user }) => {
  const [newPage, setNewPage] = useState({ name: "", url: "", keywords: "" });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      assistantName: user?.assistantName || "Sana",
      businessName: user?.businessName || "",
      businessType: user?.businessType || "",
      businessDescription: user?.businessDescription || "",
      theme: user?.theme
        ? user.theme.charAt(0).toUpperCase() + user.theme.slice(1)
        : "Dark",
      assistantTone: user?.tone
        ? user.tone.charAt(0).toUpperCase() + user.tone.slice(1)
        : "Professional",
      geminiApiKey: user?.geminiApiKey || "",
      navigationPages: user?.pages
        ? user.pages.map((page) => ({
            name: page.name,
            url: page.path,
            keywords: page.keywords ? page.keywords.join(", ") : "",
          }))
        : [],
    },
  });
  const [editAssistant, setEditAssistant] = useState(!user.isSetupComplate);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "navigationPages",
  });

  const remainingMessages =
    Math.max(0, user?.requestLimit || 0) - (user?.totalMessages || 0);

  const remainingDays = user?.proExpiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(user?.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24),
        ),
      )
    : null;

  const onSubmit = async (data) => {
    try {
      const payload = {
        assistantName: data.assistantName,
        businessName: data.businessName,
        businessType: data.businessType,
        businessDescription: data.businessDescription,
        theme: data.theme.toLowerCase(),
        tone:
          data.assistantTone.toLowerCase() === "professional"
            ? "proffetional"
            : data.assistantTone.toLowerCase(),
        geminiApiKey: data.geminiApiKey,
        pages: fields.map((page) => ({
          name: page.name,
          path: page.url,
          keywords:
            typeof page.keywords === "string" && page.keywords.trim() !== ""
              ? page.keywords
                  .split(",")
                  .map((k) => k.trim())
                  .filter((k) => k)
              : [],
        })),
      };

      const res = await axios.post(`${BASE_URL}/user/save-assistant`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Assistant saved successfully");
      }
      setEditAssistant(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save assistant");
    }
  };

  const embadeCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`;

  return (
    <div className="min-h-screen bg-[#F6F8F9] p-8 flex justify-center font-sans">
      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#111827]">
            Assistant Builder
          </h1>
          <p className="text-[#6B7280] mt-1 text-[15px]">
            Customize your virtual assistant
          </p>
        </div>
        {user.isSetupComplate && !editAssistant && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
            <p className="text-[14px] text-gray-400 mb-1">Assistant</p>
            <h2 className="text-[28px] font-bold text-[#111827] mb-2">
              {user?.assistantName || "Dora AI"}
            </h2>
            <p className="text-[#6B7280] text-[15px] mb-6">
              Your assistant is ready to use on your website.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#F8F9FA] p-5 rounded-2xl">
                <p className="text-[13px] text-gray-400 mb-1">Current Plan</p>
                <p className="text-[18px] font-bold text-[#111827]">
                  {user?.plan
                    ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
                    : "Free"}
                </p>
              </div>
              <div className="bg-[#F8F9FA] p-5 rounded-2xl">
                <p className="text-[13px] text-gray-400 mb-1">Gemini Status</p>
                <p
                  className={`text-[18px] font-bold ${user?.geminiApiKey ? "text-[#059669]" : "text-red-500"}`}
                >
                  {user?.geminiApiKey ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="bg-[#F8F9FA] p-5 rounded-2xl">
                <p className="text-[13px] text-gray-400 mb-1">
                  {user?.plan == "free" ? "Message Left" : "Remaining Days"}
                </p>
                <p className="text-[18px] font-bold text-[#111827]">
                  {user?.plan === "free" ? remainingMessages : remainingDays}
                </p>
              </div>
            </div>

            <div className="bg-[#FFFDF4] p-8 rounded-3xl border border-[#FDE68A] mt-8">
              <h3 className="text-[#92400E] font-medium mb-3">
                Where to paste this script?
              </h3>
              <p className="text-[#B45309] text-[15px] mb-6">
                Paste this script before the closing &lt;/body&gt; tag of your
                website HTML file.
              </p>

              <p className="text-[#B45309] text-[15px] mb-3">Example:</p>

              <div className="bg-[#0B1221] rounded-2xl p-6 font-mono text-[15px] leading-relaxed overflow-x-auto">
                <div className="text-[#34D399]">&lt;body&gt;</div>
                <div className="pl-8 py-5 text-[#34D399]">
                  Your Website Content
                </div>
                <div className="pl-8 break-all text-[#34D399]">
                  &lt;script src="{CLIENT_URL}/assistant.js" data-user-id="
                  {user?._id}"&gt;&lt;/script&gt;
                </div>
                <div className="text-[#34D399] pt-5">&lt;/body&gt;</div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">
                Embed Code
              </h3>
              <div className="bg-[#0B1221] rounded-2xl p-4 flex items-center justify-between gap-4">
                <code className="text-[#34D399] text-[14px] break-all font-mono">
                  {embadeCode}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(embadeCode);
                    toast.success("Copied to clipboard!");
                  }}
                  className="bg-white p-2.5 rounded-xl hover:bg-gray-100 transition-colors shrink-0 flex items-center justify-center shadow-sm"
                  title="Copy to clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 text-left">
              <button
                onClick={() => setEditAssistant(true)}
                className="px-6 py-2.5 bg-linear-to-r from-[#a35cf5] to-[#21d0a5] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Edit Assistant
              </button>
            </div>
          </div>
        )}
        {editAssistant && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-[22px] font-bold text-gray-800 mb-6">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Shifra"
                    {...register("assistantName", {
                      required: "Assistant Name is required",
                    })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200/80 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-500"
                  />
                  {errors.assistantName && (
                    <span className="text-red-500 text-sm mt-1 px-2">
                      {errors.assistantName.message}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Business Name"
                    {...register("businessName")}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200/80 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Business Type"
                    {...register("businessType")}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200/80 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Business Description"
                    rows={4}
                    {...register("businessDescription")}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200/80 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Appearance Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-[22px] font-bold text-gray-800 mb-6">
                Appearance
              </h2>

              <div className="space-y-8">
                {/* Theme Selection */}
                <div>
                  <label className="block text-[15px] text-gray-500 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-4 gap-4">
                    {["Light", "Dark", "Glass", "Neon"].map((themeOption) => (
                      <label key={themeOption} className="cursor-pointer">
                        <input
                          type="radio"
                          value={themeOption}
                          {...register("theme")}
                          className="sr-only peer"
                        />
                        <div className="text-center px-4 py-3.5 rounded-2xl border border-gray-200/80 peer-checked:border-[#9b51e0] peer-checked:text-[#9b51e0] text-gray-800 font-medium transition-all hover:border-gray-300">
                          {themeOption}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Assistant Tone Selection */}
                <div>
                  <label className="block text-[15px] text-gray-500 mb-3">
                    Assistant Tone
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {["Friendly", "Professional", "Sales"].map((toneOption) => (
                      <label key={toneOption} className="cursor-pointer">
                        <input
                          type="radio"
                          value={toneOption}
                          {...register("assistantTone")}
                          className="sr-only peer"
                        />
                        <div className="text-center px-4 py-3.5 rounded-2xl border border-gray-200/80 peer-checked:border-[#9b51e0] peer-checked:text-[#9b51e0] text-gray-800 font-medium transition-all hover:border-gray-300">
                          {toneOption}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini API Key Card */}
            <div className="bg-white py-6 px-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Gemini API KEY
                  </h2>
                  <p className="text-[15px] text-gray-400 mt-0.5">
                    Add your Gemini API key to power your assistant
                  </p>
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-linear-to-r from-[#a35cf5] to-[#21d0a5] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  Get API KEY
                </a>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="AIza..."
                  {...register("geminiApiKey", {
                    required: "Gemini API Key is required",
                  })}
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200/80 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-400"
                />
                {errors.geminiApiKey && (
                  <span className="text-red-500 text-sm mt-1 px-2">
                    {errors.geminiApiKey.message}
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Pages Card */}
            <div className="bg-white py-6 px-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Navigation Pages
                  </h2>
                  <p className="text-[15px] text-gray-400 mt-0.5">
                    Assistant can redirect users
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (newPage.name || newPage.url || newPage.keywords) {
                      append(newPage);
                      setNewPage({ name: "", url: "", keywords: "" });
                    }
                  }}
                  className="px-6 py-2 bg-linear-to-r from-[#a35cf5] to-[#21d0a5] text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  <span className="text-lg font-light leading-none">+</span> Add
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Page Name"
                  value={newPage.name}
                  onChange={(e) =>
                    setNewPage({ ...newPage, name: e.target.value })
                  }
                  className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="/pricing"
                  value={newPage.url}
                  onChange={(e) =>
                    setNewPage({ ...newPage, url: e.target.value })
                  }
                  className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Pricing Plan"
                  value={newPage.keywords}
                  onChange={(e) =>
                    setNewPage({ ...newPage, keywords: e.target.value })
                  }
                  className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-700 placeholder:text-gray-400"
                />
              </div>

              {fields.length > 0 && (
                <div className="space-y-3 mt-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center p-4 rounded-2xl border border-gray-100 bg-white gap-4"
                    >
                      <div className="flex-1 font-bold text-gray-800 text-[15px] px-2">
                        {field.name || "Unnamed Page"}
                      </div>
                      <div className="flex-1 text-gray-500 text-[15px] px-2 border-l border-gray-100">
                        {field.url || "/"}
                      </div>
                      <div className="flex-1 text-gray-400 text-sm px-2 border-l border-gray-100">
                        {field.keywords || "No keywords"}
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-[#e57373] hover:bg-red-50 rounded-xl transition-colors shrink-0"
                        title="Remove Page"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-linear-to-r from-[#a35cf5] to-[#21d0a5] text-white font-medium text-lg rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Assistant"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
