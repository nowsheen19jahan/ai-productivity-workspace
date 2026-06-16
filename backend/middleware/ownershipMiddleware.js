export const ownershipMiddleware = (Model) => {

    return async (req, res, next) => {

        try {

            const resource = await Model.findById(
                req.params.id
            );

            if (!resource) {
                return res.status(404).json({
                    message: "Resource not found"
                });
            }

            if (
                resource.user.toString() !==
                req.user.userId
            ) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            req.resource = resource;

            next();

        } catch (error) {

            return res.status(500).json({
                message: "Internal server error"
            });

        }

    };

};
