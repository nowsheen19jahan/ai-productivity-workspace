// Builds prompt for Gemini using note context

export const buildNotePrompt = (context) => {

    const {

        action,

        keyword,

        notes

    } = context;

    const actionInstruction = {

        show:
            "The user requested to view the following notes.",

        summarize:
            "The user requested to summarize the following notes.",

        revise:
            "The user requested concise revision points from the following notes."

    };

    const formattedNotes = notes

        .map((note, index) => {

            return `

Note ${index + 1}

Title:
${note.title}

Tags:
${note.tags.join(", ") || "None"}

Content:
${note.content}

`;

        })

        .join("\n");

    return `

You are an AI note assistant.

The user wants to:

${actionInstruction[action]}

${keyword
            ? `Keyword: ${keyword}`
            : ""}

Notes:

${formattedNotes}

Instructions:

- Use ONLY the provided notes.
- Never invent information.
- If there are no notes, clearly say so.
- Answer naturally.
- Keep the response concise.
- If summarizing, summarize only these notes.
- If revising, generate concise revision points.
- If showing notes, organize them clearly.

`;

};