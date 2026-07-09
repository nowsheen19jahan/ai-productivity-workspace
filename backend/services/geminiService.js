import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

export const generateAnswer = async (prompt) => {

    try {

        const result =
            await model.generateContent(
                prompt
            );

        return result.response.text();

    }
    catch (error) {

        console.error(
            "[Gemini Service]",
            error.message
        );

        throw new Error(
            "AI_SERVICE_UNAVAILABLE"
        );
    }

};