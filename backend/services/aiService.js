// Coordinate Everything
import { detectIntent } from "./intentService.js";
// Tasks
import { extractTaskQuery } from "../utils/taskQueryExtractor.js";
import { buildTaskContext } from "../context/taskContext.js";
import { buildTaskPrompt } from "../prompt/taskPrompt.js";
// Notes
import { extractNoteQuery } from "../utils/noteQueryExtractor.js";
import { buildNoteContext } from "../context/noteContext.js";
import { buildNotePrompt } from "../prompt/notePrompt.js";

import { buildBothPrompt } from "../prompt/bothPrompt.js";
import { generateAnswer } from "./geminiService.js";

export const processAIMessage = async (userId, message) => {
    try {
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
                const query =
                    extractNoteQuery(message);

                const context =
                    await buildNoteContext(
                        userId,
                        query
                    );

                const prompt =
                    buildNotePrompt(context);

                const response =
                    await generateAnswer(prompt);

                return response;


                break;

            case "BOTH": {

                const taskQuery =
                    extractTaskQuery(message);

                const noteQuery =
                    extractNoteQuery(message);

                const taskContext =
                    await buildTaskContext(
                        userId,
                        taskQuery
                    );

                const noteContext =
                    await buildNoteContext(
                        userId,
                        noteQuery
                    );

                const prompt =
                    buildBothPrompt({

                        taskContext,

                        noteContext

                    });

                const response =
                    await generateAnswer(
                        prompt
                    );

                return response;

            }
                break;

            default:
                throw new Error("Unsupported intent");
        }

    } catch (error) {

        console.error(
            "[AI Service]",
            error.message
        );

        throw error;

    }
};