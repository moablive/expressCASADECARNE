import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authenticateToken } from '../authMiddleware/authMiddleware';

const router = Router();

// Rota para registro de novos usuários
router.post('/register', registerUser);

// Rota para login de usuários
router.post('/login', loginUser);

// Rotas protegidas por autenticação JWT
router.get('/getAll', authenticateToken, getAllUsers); // Buscar todos os usuários
router.get('/:id', authenticateToken, getUserById); // Buscar um usuário por ID
router.put('/:id', authenticateToken, updateUser); // Atualizar um usuário
router.delete('/:id', authenticateToken, deleteUser); // Deletar um usuário

export default router;
