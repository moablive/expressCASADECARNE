import "dotenv/config";
import { Cliente } from "../interface/cliente";
import conexao from "../db/conexao";

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
      CEP,
      LATITUDE,
      LONGITUDE,
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
            CEP,
            LATITUDE,
            LONGITUDE
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
          CEP,
          LATITUDE,
          LONGITUDE,
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve({
            ID: results.insertId,
            ...cliente,
          });
        }
      );
    });
  }

  // Atualizar um cliente
  async atualizar(
    id: number,
    dadosAtualizados: Partial<Cliente>
  ): Promise<void> {
    const sql = "UPDATE Clientes SET ? WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [dadosAtualizados, id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  // Buscar todos os clientes
  async buscarTodos(): Promise<Cliente[]> {
    const sql = "SELECT * FROM Clientes";
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
    const sql = "SELECT * FROM Clientes WHERE ID = ?";
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

  // Deletar um cliente
  async deletar(id: number): Promise<void> {
    const sql = "DELETE FROM Clientes WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  // Busca o nome do vendedor pelo código do vendedor (ID do vendedor)
  async buscarNomeVendedorPorId(
    codigoVendedor: number
  ): Promise<string | null> {
    const sql = "SELECT NOME FROM Vendedores WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [codigoVendedor], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return resolve(null);
        }
        resolve(results[0].NOME);
      });
    });
  }

  // STATUS 🗺️
  // STEP 1: Método para obter contagens e valores totais
  async obterTotaisPorCNPJ(
    cnpj: string
  ): Promise<{
    eventos_pagos: number;
    eventos_nao_pagos: number;
    total_pagos: number;
    total_nao_pagos: number;
  }> {
    const sqlTotals = `
    SELECT 
      COUNT(CASE WHEN Evento.status_pagamento = 'pago' THEN 1 END) AS eventos_pagos,
      COUNT(CASE WHEN Evento.status_pagamento = 'não pago' THEN 1 END) AS eventos_nao_pagos,
      SUM(CASE WHEN Evento.status_pagamento = 'pago' THEN Evento.ValorNF ELSE 0 END) AS total_pagos,
      SUM(CASE WHEN Evento.status_pagamento = 'não pago' THEN Evento.ValorNF ELSE 0 END) AS total_nao_pagos
    FROM Evento
    WHERE Evento.CNPJ = ?
  `;

    return new Promise((resolve, reject) => {
      conexao.query(sqlTotals, [cnpj], (err, results) => {
        if (err) return reject(err);
        const totals = results[0];
        resolve({
          eventos_pagos: totals.eventos_pagos || 0,
          eventos_nao_pagos: totals.eventos_nao_pagos || 0,
          total_pagos: totals.total_pagos || 0,
          total_nao_pagos: totals.total_nao_pagos || 0,
        });
      });
    });
  }

  // STATUS 🗺️
  // STEP 2: Método para obter números de NF e valores
  async obterNFsPorCNPJ(
    cnpj: string
  ): Promise<{
    nfs_pagos: { numero_nf: string; valor_nf: number; status_pagamento: string }[];
    nfs_nao_pagos: { numero_nf: string; valor_nf: number; status_pagamento: string }[];
  }> {
    const sqlNFs = `
      SELECT 
        Evento.NumeroNF AS numero_nf, 
        Evento.ValorNF AS valor_nf, 
        Evento.status_pagamento
      FROM Evento
      WHERE Evento.CNPJ = ?
    `;

    return new Promise((resolve, reject) => {
      conexao.query(sqlNFs, [cnpj], (err, results) => {
        if (err) return reject(err);
        const nfs = results;
        const nfs_pagos = nfs
          .filter((nf: any) => nf.status_pagamento === "pago")
          .map((nf: any) => ({
            numero_nf: nf.numero_nf,
            valor_nf: nf.valor_nf,
            status_pagamento: "pago",
          }));

        const nfs_nao_pagos = nfs
          .filter((nf: any) => nf.status_pagamento === "não pago")
          .map((nf: any) => ({
            numero_nf: nf.numero_nf,
            valor_nf: nf.valor_nf,
            status_pagamento: "não pago",
          }));

        resolve({ nfs_pagos, nfs_nao_pagos });
      });
    });
  }

}

export default new ClientService();
