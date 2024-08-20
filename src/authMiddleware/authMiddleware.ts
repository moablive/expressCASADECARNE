import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Carrega a chave secreta do arquivo .env
const secretKey = process.env.JWT_SECRET;

// Define uma interface estendida para o Request que incluirá o usuário decodificado
interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

// Middleware de autenticação
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido, acesso não autorizado' });
    }

    jwt.verify(token, secretKey as string, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }
        req.user = decoded as JwtPayload;
        next();
    });
};
