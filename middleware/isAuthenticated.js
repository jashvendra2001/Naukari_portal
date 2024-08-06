import jwt from "jsonwebtoken"



export const isAuthentication = async (req, res, next) => {
    try {
        console.log('Cookies:', req.cookies);

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'User is unauthorized',
                success: false,
            });
        }

        // Debug log to check if the secret key is being read correctly
        console.log('Secret Key:', process.env.SECRATE_KEY);

        const decode = await jwt.verify(token, process.env.SECRATE_KEY);

        console.log('Decoded Token:', decode);

        if (!decode) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false,
            });
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.error('Error in middleware:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};