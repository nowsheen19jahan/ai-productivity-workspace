// Builds AI context for note-related requests

import {
    getAllNotes,
    getNotesByKeyword
} from "../services/noteService.js";

export const buildNoteContext = async (

    userId,

    query

) => {

    let notes;

    if (query.keyword) {

        notes = await getNotesByKeyword(

            userId,

            query.keyword

        );

    } else {

        notes = await getAllNotes(userId);

    }

    return {

        action: query.action,

        keyword: query.keyword,

        notes: notes.slice(0, 10)

    };

};