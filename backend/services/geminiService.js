import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
    getHistory,
    addMessage
} from "./memoryService.js";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

export const generateAnswer = async (
    userId,
    userMessage,
    prompt
) => {

    try {

        const history =
            getHistory(userId);

        const conversation =
            history
                .map(message =>
                    `${message.role}: ${message.content}`
                )
                .join("\n");

        const finalPrompt = `

Conversation History

${conversation}

Current Request

${prompt}

`;

        // Save user's original message
        addMessage(
            userId,
            "user",
            userMessage
        );

        const result =
            await model.generateContent(
                finalPrompt
            );

        const response =
            result.response.text();

        // Save AI response
        addMessage(
            userId,
            "assistant",
            response
        );

        return response;

    } catch (error) {

        console.error(
            "[Gemini Service]",
            error.message
        );

        throw new Error(
            "AI_SERVICE_UNAVAILABLE"
        );

    }

};