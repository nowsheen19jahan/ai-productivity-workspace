export const processTags = (tags) => {

    return [
        ...new Set(
            tags
                .map(tag =>
                    tag.trim().toLowerCase()
                )
                .filter(tag =>
                    tag.length > 0
                )
        )
    ];

};