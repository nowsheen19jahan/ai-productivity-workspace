import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light"
    },

    defaultNoteColor: {
        type: String,
        default: "#ffffff"
    },

    aiEnabled: {
        type: Boolean,
        default: true
    },

    taskRemindersEnabled: {
        type: Boolean,
        default: true
    }
    
}, {
    timestamps: true
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;