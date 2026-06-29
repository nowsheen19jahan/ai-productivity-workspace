// Converts task context into a Gemini prompt

export const buildTaskPrompt = (context) => {

    const {
        type,
        tasks
    } = context;

    const formattedTasks =
        tasks.length
            ? tasks
                .map(
                    (task, index) =>
                        `${index + 1}. ${task.title}`
                )
                .join("\n")
            : "No tasks found.";


    return `
You are an AI productivity assistant.

Your job is to help the user understand their tasks.

Task Type:
${type}

Tasks:
${formattedTasks}

Instructions:

- Answer naturally.
- Do not invent tasks.
- Only use the provided task list.
- Keep the response concise.
- If there are no tasks, clearly tell the user there are no ${type} tasks.
`;

};