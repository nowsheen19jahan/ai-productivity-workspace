// Builds prompt using both task and note context

export const buildBothPrompt = ({

    taskContext,

    noteContext

}) => {

    const formattedTasks = taskContext.tasks

        .map((task, index) => {

            return `

Task ${index + 1}

${task.title}

`;

        })

        .join("\n");

    const formattedNotes = noteContext.notes

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

You are an AI productivity assistant.

The user wants help with both their notes and their tasks.

Tasks

${formattedTasks || "No tasks found."}

Notes

${formattedNotes || "No notes found."}

Instructions

- Use ONLY the provided notes and tasks.
- Never invent information.
- If one section is empty, clearly mention it.
- Answer naturally.
- Keep the response concise.
- Help the user using both contexts together whenever possible.

`;

};