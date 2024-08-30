export interface Vendedor {
    ID?: number;          // ID do vendedor (auto incrementado)
    NOME?: string | null; // Nome do vendedor
    EMAIL?: string | null; // Email do vendedor
    CONTATO?: string | null; // Contato do vendedor (telefone)
}