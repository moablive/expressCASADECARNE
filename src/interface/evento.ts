export interface Evento {
    Id?: number;
    Status?: string | null;
    CNPJ?: string | null;
    NumeroNF?: string | null;
    RazaoSocial?: string | null;
    DataEmissao?: Date | string | null;
    DataVencimento?: Date | string | null;
    TituloEvento?: string | null;
    Endereco?: string | null;
    status_pagamento?: string | null;
    CODIGO_VENDEDOR?: number | null;
    NOME_VENDEDOR?: string | null;
    ValorNF?: number | null;
}