import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routers/router';
import conexao from './db/conexao';
import { MysqlError } from 'mysql';

const app = express();
const port = process.env.PORT;

// Middleware para permitir que o Express interprete JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir CORS para Permite todas as origens
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Verifica a conexão com o banco de dados
conexao.connect((err: MysqlError | null) => { // Define o tipo de err
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Finaliza o processo se a conexão falhar
    } 
});

// Configura as rotas da aplicação
router(app);

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`🚀 => ${port}`);
});
