import 'dotenv/config';
import { Cliente } from '../interface/cliente';
import conexao from '../db/conexao';

class ClientService {

    // Criar um novo cliente
    async criar(cliente: Cliente): Promise<Cliente> {
        const {
            CODIGO_TELECON,
            CODIGO_VENDEDOR,
            NOME,
            CNPJ,
            CONTATO,
            EMAIL,
            PAIS,
            ESTADO,
            CIDADE,
            BAIRRO,
            RUA_AV,
            NUMERO,
            COMPLEMENTO,
            CEP
        } = cliente;

        const sql = `INSERT INTO Clientes (
            CODIGO_TELECON,
            CODIGO_VENDEDOR,
            NOME,
            CNPJ,
            CONTATO,
            EMAIL,
            PAIS,
            ESTADO,
            CIDADE,
            BAIRRO,
            RUA_AV,
            NUMERO,
            COMPLEMENTO,
            CEP
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            conexao.query(
                sql, 
                [
                    CODIGO_TELECON,
                    CODIGO_VENDEDOR,
                    NOME,
                    CNPJ,
                    CONTATO,
                    EMAIL,
                    PAIS,
                    ESTADO,
                    CIDADE,
                    BAIRRO,
                    RUA_AV,
                    NUMERO,
                    COMPLEMENTO,
                    CEP
                ],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({
                        ID: results.insertId,
                        ...cliente
                    });
                }
            );
        });
    }

    // Buscar todos os clientes
    async buscarTodos(): Promise<Cliente[]> {
        const sql = 'SELECT * FROM Clientes';
        return new Promise((resolve, reject) => {
            conexao.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Buscar um cliente por ID
    async buscarPorId(id: number): Promise<Cliente | null> {
        const sql = 'SELECT * FROM Clientes WHERE ID = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(results[0]);
            });
        });
    }

    // Atualizar um cliente
    async atualizar(id: number, dadosAtualizados: Partial<Cliente>): Promise<void> {
        const sql = 'UPDATE Clientes SET ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [dadosAtualizados, id], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Deletar um cliente
    async deletar(id: number): Promise<void> {
        const sql = 'DELETE FROM Clientes WHERE ID = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

export default new ClientService();
