// Extract structured note queries from user messages

export const extractNoteQuery = (message) => {

    const query = {
        action: "show",
        keyword: null
    };

    const lowerMessage = message
    .toLowerCase()
    .replace(/[^\w\s]/g, "");


    if (
        lowerMessage.includes("summarize") ||
        lowerMessage.includes("summary")
    ) {

        query.action = "summarize";

    }

    if (
        lowerMessage.includes("revise") ||
        lowerMessage.includes("revision")
    ) {

        query.action = "revise";

    }


    const fillerWords = [

        "show",
        "my",
        "notes",
        "note",
        "summarize",
        "summary",
        "revise",
        "revision",
        "about",
        "on",
        "of",
        "the",
        "please"

    ];

    const keyword = lowerMessage
        .split(/\s+/)
        .filter(word => !fillerWords.includes(word));

    if (keyword.length > 0) {

        query.keyword =
            keyword.join(" ");

    }

    return query;

};

