export interface Usuario {
    id?: number;             // ID do usuário, opcional pois é gerado automaticamente
    username: string;        // Nome de usuário
    password: string;        // Senha (deve ser armazenada de forma segura, criptografada)
    email?: string;          // E-mail do usuário (opcional)
    role?: 'user' | 'admin'; // Papel do usuário, pode ser 'user' ou 'admin'
    created_at?: Date;       // Data de criação, opcional pois é gerada automaticamente
}