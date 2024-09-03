import { Express } from 'express';
import { authenticateToken } from '../authMiddleware/authMiddleware';

// Rotas
import userRoute from './userRoute';
import clientRoute from './clientRoute';
import vededorRoute from './vendedorRoute';
import eventoRoute from './eventoRoute';

export default (app: Express) => {

    // Rota raiz para verificar se a API está funcionando corretamente
    app.get('/', (req, res) => {
        res.send('API funcionando corretamente');
    });

    // Rotas de usuários (registro e login)
    app.use('/api/usuarios', userRoute);

    // Rotas de clientes
    app.use('/api/clientes', authenticateToken, clientRoute);

    // Rotas de Vendedor
    app.use('/api/vendedor', authenticateToken, vededorRoute);

    // Rotas de Evento
    app.use('/api/eventos', authenticateToken, eventoRoute);
};