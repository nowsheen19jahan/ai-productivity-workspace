import { processAIMessage } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {

    try {

        const userId = req.user.userId;

        const { message } = req.body;

        const response =
            await processAIMessage(
                userId,
                message
            );

        return res.json({

            success: true,

            response

        });

    } catch (error) {

        console.error(
            "[AI Controller]",
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Sorry, the AI assistant is temporarily unavailable. Please try again later."

        });

    }

};