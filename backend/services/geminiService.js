import 'dotenv/config';
import { GoogleGenerativeAI }
    from "@google/generative-ai";

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

const model =
    genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

export const detectIntent =
    async (message) => {

        const prompt = `
You are an intent classifier.

Classify the user message.

Return ONLY one word.

GENERAL
NOTES
TASKS
BOTH

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
        "Gemini Error:",
        error.message
    );

    throw error;
}
};