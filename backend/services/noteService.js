// Retrieve Note Data

import Note from "../models/Note.js";

export const getAllNotes = async (userId) => {

    return await Note.find({

        user: userId

    })
    .select("title tags content");

};

export const getNotesByKeyword = async (

    userId,

    keyword

) => {

    return await Note.find({

        user: userId,

        $or: [

            {

                title: {

                    $regex: keyword,

                    $options: "i"

                }

            },

            {

                tags: {

                    $regex: keyword,

                    $options: "i"

                }

            },

            {

                content: {

                    $regex: keyword,

                    $options: "i"

                }

            }

        ]

    })
    .select("title tags content");

};