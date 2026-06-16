import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            default: "",
        },

        tags: {
            type: [{
                type: String,
                trim: true
            }],
            default: []
        },
        

        color: {
            type: String,
            default: null,
        },

        pinned: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
