const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export const generateGeminiResponse = async ({ prompt, model = "gemini-1.5-flash", user }) => {
    try {
        const apikey = process.env.GEMINI_API_KEY; // Make sure to have this in your .env file
        const url = `${GEMINI_URL}/${model}:generateContent`;

        const response = await fetch(`${url}?key=${apikey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            // Invalid API Key
            if (
                response.status === 400 ||
                response.status === 401
            ) {
                if (user) {
                    user.geminiStatus = "invalid";
                    await user.save();
                }
            }

            // Quota Exceeded
            if (response.status === 429) {
                if (user) {
                    user.geminiStatus = "quota_exceeded";
                    await user.save();
                }
            }

            const err = await response.text();
            throw new Error(err);
        }

        // =========================
        // SUCCESS STATUS
        // =========================
        if (user) {
            user.geminiStatus = "active";
            await user.save();
        }

        const data = await response.json();

        const text = data.candidates?.[0]
            ?.content?.parts?.[0]
            ?.text;

        if (!text) {
            throw new Error(
                "No text returned from Gemini"
            );
        }

        return text.trim();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};