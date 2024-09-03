export interface Cliente {
    ID?: number; 
    CODIGO_TELECON?: number | null;
    CODIGO_VENDEDOR?: number | null;
    NOME?: string | null;
    CNPJ?: string | null;
    CONTATO?: string | null;
    EMAIL?: string | null;
    PAIS?: string | null;
    ESTADO?: string | null;
    CIDADE?: string | null;
    BAIRRO?: string | null;
    RUA_AV?: string | null;
    NUMERO?: string | null;
    COMPLEMENTO?: string | null;
    CEP?: string | null;
    NOME_VENDEDOR?: string | null;
    LATITUDE?: number | null;
    LONGITUDE?: number | null;
}