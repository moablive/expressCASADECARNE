import { Router } from 'express';
import { 
    getAllEventos, 
    getEventoById, 
    updateEvento, 
    deleteEvento, 
    marcarEventoComoPago, 
    marcarEventoComoNaoPago,
    getEventosByMonthAndYear,
    getNextFiveEvent
} from '../controllers/eventoController';
import { authenticateToken } from '../authMiddleware/authMiddleware';

const router = Router();

// Rotas protegidas por autenticação JWT
router.get('/getAll', authenticateToken, getAllEventos); // Buscar todos os eventos
router.get('/list/mes/:month/:year', authenticateToken, getEventosByMonthAndYear); // Buscar eventos por mês e ano
router.get('/nextFive', authenticateToken, getNextFiveEvent); // Buscar eventos próximos 5 dias
router.get('/getbyid/:id', authenticateToken, getEventoById); // Buscar um evento por ID
router.put('/update/:id', authenticateToken, updateEvento); // Atualizar um evento
router.delete('/delete/:id', authenticateToken, deleteEvento); // Deletar um evento

// Rotas específicas para marcar eventos como "pago" ou "não pago"
router.put('/marcarComoPago/:id', authenticateToken, marcarEventoComoPago); // Marcar evento como pago
router.put('/marcarComoNaoPago/:id', authenticateToken, marcarEventoComoNaoPago); // Marcar evento como não pago

export default router;