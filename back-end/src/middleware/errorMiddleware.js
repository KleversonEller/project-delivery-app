const errors = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNPROCESSABLE_ENTITY: 422,
    NO_CONTENT: 204,
    CONFLICT: 409,
};
  
const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
    const status = errors[name];
    if (!status) return res.status(500).json({ message });
    res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;
