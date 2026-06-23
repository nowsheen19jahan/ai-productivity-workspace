import Note from "../models/Note.js";
import Task from "../models/Task.js";

// Get dashboard
export const getDashboard = async (req, res) => {
    try {

        const userId = req.user.userId;

        const [
            totalNotes,
            pinnedNotes,
            totalTasks,
            completedTasks,
            pendingTasks,
            recentNotes,
            recentTasks,
            topPinnedNotes
        ] = await Promise.all([

            Note.countDocuments({
                user: userId
            }),

            Note.countDocuments({
                user: userId,
                pinned: true
            }),

            Task.countDocuments({
                user: userId
            }),

            Task.countDocuments({
                user: userId,
                completed: true
            }),

            Task.countDocuments({
                user: userId,
                completed: false
            }),

            Note.find({
                user: userId
            })
                .select(
                    "title color pinned createdAt"
                )
                .sort({
                    createdAt: -1
                })
                .limit(5),

            Task.find({
                user: userId
            })
                .select(
                    "title completed createdAt"
                )
                .sort({
                    createdAt: -1
                })
                .limit(5),

            Note.find({
                user: userId,
                pinned: true
            })
                .select(
                    "title color createdAt"
                )
                .sort({
                    createdAt: -1
                })
                .limit(3)

        ]);

        const completionPercentage =
            totalTasks === 0
                ? 0
                : Math.round(
                    (completedTasks / totalTasks) * 100
                );

        return res.status(200).json({

            message:
                "Dashboard fetched successfully",

            stats: {
                totalNotes,
                pinnedNotes,
                totalTasks,
                completedTasks,
                pendingTasks,
                completionPercentage
            },

            recentNotes,

            recentTasks,

            topPinnedNotes

        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};