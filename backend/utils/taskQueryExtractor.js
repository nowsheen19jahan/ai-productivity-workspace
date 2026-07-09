export const extractTaskQuery = (message) => {

    const query = {
        status: null,
        due: null,
        recommendation: false
    };

    const lowerMessage =
        message.toLowerCase();

    if (
        lowerMessage.includes("pending")
    ) {
        query.status = "pending";
    }

    if (
        lowerMessage.includes("completed")
    ) {
        query.status = "completed";
    }

    if (
        lowerMessage.includes("today")
    ) {
        query.due = "today";
    }

    if (
        lowerMessage.includes("upcoming")
    ) {
        query.due = "upcoming";
    }

    if (
        lowerMessage.includes("work on first") ||
        lowerMessage.includes("recommend") ||
        lowerMessage.includes("suggest")
    ) {
        query.recommendation = true;
    }

    console.log(query);
    return query;
};