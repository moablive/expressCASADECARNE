import { Router } from 'express';
import { authenticateToken } from '../authMiddleware/authMiddleware';
import {
    registerVendedor,
    getAllVendedores,
    getVendedorById,
    updateVendedor,
    deleteVendedor,
    getVendasPorVendedor
} from '../controllers/vendedorController';

const router = Router();

// Rota para criar um novo vendedor
router.post('/register', authenticateToken, registerVendedor);

// Rota para buscar todos os vendedores
router.get('/getAll', authenticateToken, getAllVendedores);

// Rota para buscar um vendedor por ID
router.get('/getbyid/:id', authenticateToken, getVendedorById);

// Rota para buscar as vendas por vendedor
router.get('/vendas', authenticateToken, getVendasPorVendedor);

// Rota para atualizar um vendedor
router.put('/update/:id', authenticateToken, updateVendedor);

// Rota para deletar um vendedor
router.delete('/delete/:id', authenticateToken, deleteVendedor);

export default router;
