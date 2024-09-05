import { Router } from 'express';
import { 
    getAllEventos, 
    getEventoById, 
    updateEvento, 
    deleteEvento, 
    marcarEventoComoPago, 
    marcarEventoComoNaoPago,
    getEventosByMonthAndYear,
    getNextExpiration,
    getAllPaidEvents,
    getallunpaidEvents
} from '../controllers/eventoController';
import { authenticateToken } from '../authMiddleware/authMiddleware';

const router = Router();

// Rotas protegidas por autenticação JWT
router.get('/getAll', authenticateToken, getAllEventos); // Buscar todos os eventos
router.get('/getAll/paidEvents', authenticateToken, getAllPaidEvents); // Buscar todos os eventos Pagos
router.get('/getAll/unpaidEvents', authenticateToken, getallunpaidEvents); // Buscar todos os eventos nao Pagos
router.get('/list/mes/:month/:year', authenticateToken, getEventosByMonthAndYear); // Buscar eventos por mês e ano
router.get('/getNextExpiration', authenticateToken, getNextExpiration); // Busca eventos que vencem nos próximos 5 dias
router.get('/getbyid/:id', authenticateToken, getEventoById); // Buscar um evento por ID
router.put('/update/:id', authenticateToken, updateEvento); // Atualizar um evento
router.delete('/delete/:id', authenticateToken, deleteEvento); // Deletar um evento

// Rotas específicas para marcar eventos como "pago" ou "não pago"
router.put('/marcarComoPago/:id', authenticateToken, marcarEventoComoPago); // Marcar evento como pago
router.put('/marcarComoNaoPago/:id', authenticateToken, marcarEventoComoNaoPago); // Marcar evento como não pago

export default router;