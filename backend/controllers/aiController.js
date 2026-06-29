import { processAIMessage } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message?.trim()) {

            return res.status(400).json({
                message: "Message is required"
            });

        }

        const userId= req.user.userId;

        const answer =
            await processAIMessage(
                userId,
                message
            );

        return res.status(200).json({

            message: "AI response generated successfully",

            answer

        });

    } catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

};