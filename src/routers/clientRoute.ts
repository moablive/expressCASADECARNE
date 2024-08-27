import { Router } from 'express';
import { registerClient, getAllClients, getClientById, updateClient, deleteClient } from '../controllers/clientController';
import { authenticateToken } from '../authMiddleware/authMiddleware';

const router = Router();

// Rota para registro de novos clientes
router.post('/register', registerClient);

// Rotas protegidas por autenticação JWT
router.get('/getAll', authenticateToken, getAllClients); // Buscar todos os clientes
router.get('/:id', authenticateToken, getClientById); // Buscar um cliente por ID
router.put('/:id', authenticateToken, updateClient); // Atualizar um cliente
router.delete('/:id', authenticateToken, deleteClient); // Deletar um cliente

export default router;
