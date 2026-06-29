// Coordinate Everything
import { detectIntent } from "./intentService.js";
import { extractTaskQuery } from "../utils/queryIntentExtractor.js";
import { buildTaskContext } from "../context/taskContext.js";
import { generateAnswer } from "./geminiService.js";
import { buildTaskPrompt } from "../prompt/taskPrompt.js";

export const processAIMessage = async (userId, message) => {
    const intent = await detectIntent(message);
    switch (intent) {

        case "TASKS": {
            const query =
                extractTaskQuery(message);

            const context =
                await buildTaskContext(
                    userId,
                    query
                );

            const prompt =
                buildTaskPrompt(context);

            return await generateAnswer(prompt);

        }
            break;

        case "GENERAL":
            break;

        case "NOTES":
            break;

        case "BOTH":
            break;

        default:
            throw new Error("Unsupported intent");
    }

    console.log("INTENT: ",intent);
};