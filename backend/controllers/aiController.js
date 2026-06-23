import { detectIntent } from "../services/geminiService.js";

export const classifyIntent = async (req, res) => {
    try {
        console.log(
            "CONTROLLER HIT"
        );
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const intent = await detectIntent(
            message.trim()
        );

        return res.status(200).json({
            message: "Intent detected successfully",
            intent
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};