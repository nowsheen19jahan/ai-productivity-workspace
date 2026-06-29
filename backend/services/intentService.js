// Detect Intent
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

export const detectIntent = async (message) => {

    const prompt = `
You are an intent classifier.

Your only job is to classify the user's intent.

Return ONLY one word.

Allowed values:

GENERAL
NOTES
TASKS
BOTH

Do not explain your answer.
Do not return punctuation.
Do not return markdown.

Message:
${message}
`;

    try {

        const result =
            await model.generateContent(
                prompt
            );

        const intent =
            result.response
                .text()
                .trim()
                .toUpperCase();

        const allowedIntents = [
            "GENERAL",
            "NOTES",
            "TASKS",
            "BOTH"
        ];

        return allowedIntents.includes(intent)
            ? intent
            : "GENERAL";

    } catch (error) {

        console.error(
            "Intent Detection Error:",
            error.message
        );

        throw error;

    }

};