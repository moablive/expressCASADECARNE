import 'dotenv/config';
import { Usuario } from '../interface/usuario';
import conexao from '../db/conexao';
import bcrypt from 'bcrypt';

class UserService {
    
    // Criar um novo usuário
    async criar(usuario: Usuario): Promise<Omit<Usuario, 'password'>> {
        const { username, password, email, role } = usuario;

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL para inserir o usuário no banco
        const sql = 'INSERT INTO usuarios (username, password, email, role) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [username, hashedPassword, email, role], (err, results) => {
                if (err) {
                    return reject(err);
                }
                // Retorna o usuário sem a senha
                resolve({
                    id: results.insertId,
                    username,
                    email,
                    role,
                    created_at: new Date(),
                });
            });
        });
    }

    // Buscar todos os usuários
    async buscarTodos(): Promise<Usuario[]> {
        const sql = 'SELECT * FROM usuarios';
        return new Promise((resolve, reject) => {
            conexao.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Buscar um usuário por ID
    async buscarPorId(id: number): Promise<Usuario | null> {
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
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

    // Buscar um usuário por username
    async buscarPorUsername(username: string): Promise<Usuario | null> {
        const sql = 'SELECT * FROM usuarios WHERE username = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [username], (err, results) => {
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

    // Buscar um usuário por e-mail
    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [email], (err, results) => {
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
    
    // Atualizar um usuário
    async atualizar(id: number, dadosAtualizados: Partial<Usuario>): Promise<void> {
        if (dadosAtualizados.password) {
            dadosAtualizados.password = await bcrypt.hash(dadosAtualizados.password, 10);
        }

        const sql = 'UPDATE usuarios SET ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [dadosAtualizados, id], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Deletar um usuário
    async deletar(id: number): Promise<void> {
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Verificar credenciais de login
    async verificarCredenciais(username: string, password: string): Promise<Usuario | null> {
        try {
            // Buscar o usuário pelo nome de usuário
            const usuario = await this.buscarPorUsername(username);
            if (!usuario) {
                console.log('Usuário não encontrado');
                return null;
            }

            // Comparar a senha fornecida com a senha armazenada no banco de dados
            const isMatch = await bcrypt.compare(password, usuario.password);
            if (!isMatch) {
                console.log('Senha incorreta');
                return null;
            }

            // Se a senha for correta, retorne o usuário
            return usuario;
        } catch (error) {
            console.error('Erro ao verificar credenciais:', error);
            throw error; // Lança o erro para ser tratado pelo chamador
        }
    }
}

export default new UserService();