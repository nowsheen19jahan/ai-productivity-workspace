// Stores conversation history in memory

const conversations = new Map();

const MAX_HISTORY = 10;

export const addMessage = (

    userId,

    role,

    content

) => {

    if (!conversations.has(userId)) {

        conversations.set(

            userId,

            []

        );

    }

    const history =

        conversations.get(userId);

    history.push({

        role,

        content

    });

    if (

        history.length >

        MAX_HISTORY

    ) {

        history.shift();

    }

};

export const getHistory = (

    userId

) => {

    return (

        conversations.get(userId)

        ||

        []

    );

};

export const clearHistory = (

    userId

) => {

    conversations.delete(

        userId

    );

};

