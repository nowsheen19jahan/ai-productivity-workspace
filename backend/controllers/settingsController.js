import Settings from "../models/Settings.js";

// GET Settings
export const getSettings = async (req, res) => {
    try {

        const settings = await Settings.findOne({
            user: req.user.userId
        });

        return res.status(200).json({
            message: "Settings fetched successfully",
            settings
        });

    }
    catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// PATCH Settings
export const updateSettings = async (req, res) => {
    try {

        const settings = await Settings.findOne({
            user: req.user.userId
        });

        if (!settings) {
            return res.status(404).json({
                message: "Settings not found"
            });
        }

        const {
            theme,
            defaultNoteColor,
            aiEnabled,
            taskRemindersEnabled
        } = req.body;

        if (
            theme === undefined &&
            defaultNoteColor === undefined &&
            aiEnabled === undefined &&
            taskRemindersEnabled === undefined
        ) {
            return res.status(400).json({
                message: "At least one field is required"
            });
        }

        if (
            theme !== undefined &&
            theme !== "light" &&
            theme !== "dark"
        ) {
            return res.status(400).json({
                message:
                    "Theme must be light or dark"
            });
        }

        const allowedColors = [
            "#ffffff",
            "#000000",
            "#8c55a1",
            "#b5dbb7",
            "#ccff90",
            "#a7ffeb",
            "#cbf0f8",
            "#aecbfa"
        ];

        if (
            defaultNoteColor !== undefined &&
            !allowedColors.includes(
                defaultNoteColor
            )
        ) {
            return res.status(400).json({
                message:
                    "Invalid note color"
            });
        }

        if (
            aiEnabled !== undefined &&
            typeof aiEnabled !== "boolean"
        ) {
            return res.status(400).json({
                message:
                    "aiEnabled must be a boolean"
            });
        }

        if (
            taskRemindersEnabled !== undefined &&
            typeof taskRemindersEnabled !== "boolean"
        ) {
            return res.status(400).json({
                message:
                    "taskRemindersEnabled must be a boolean"
            });
        }

        if (theme !== undefined) {
            settings.theme = theme;
        }

        if (
            defaultNoteColor !== undefined
        ) {
            settings.defaultNoteColor =
                defaultNoteColor;
        }

        if (aiEnabled !== undefined) {
            settings.aiEnabled =
                aiEnabled;
        }

        if (
            taskRemindersEnabled !== undefined
        ) {
            settings.taskRemindersEnabled =
                taskRemindersEnabled;
        }

        await settings.save();

        return res.status(200).json({
            message:
                "Settings updated successfully",
            settings
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};