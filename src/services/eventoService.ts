import conexao from "../db/conexao";
import { Evento } from "../interface/evento";

class EventoService {
  // Atualizar o status de pagamento para "pago"
  async marcarComoPago(id: number): Promise<void> {
    const sql = "UPDATE Evento SET status_pagamento = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, ["pago", id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  // Atualizar o status de pagamento para "não pago"
  async marcarComoNaoPago(id: number): Promise<void> {
    const sql = "UPDATE Evento SET status_pagamento = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, ["não pago", id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  // Buscar todos os eventos com o nome do vendedor
  async buscarTodos(): Promise<Evento[]> {
    const sql = `
      SELECT e.*, v.NOME AS NOME_VENDEDOR
      FROM Evento e
      LEFT JOIN Vendedores v ON e.CODIGO_VENDEDOR = v.ID
    `;
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Buscar eventos por mês e ano com o nome do vendedor
  async buscarPorMes(mes: number, ano: number): Promise<Evento[]> {
    const sql = `
      SELECT e.*, v.NOME AS NOME_VENDEDOR
      FROM Evento e
      LEFT JOIN Vendedores v ON e.CODIGO_VENDEDOR = v.ID
      WHERE MONTH(DataEmissao) = ? AND YEAR(DataEmissao) = ?
    `;
    return new Promise((resolve, reject) => {
      conexao.query(sql, [mes, ano], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Busca eventos que vencem nos próximos 5 dias com o nome do vendedor
  async buscaProximosVencimentos(): Promise<Evento[]> {
    const sql = `
      SELECT e.*, v.NOME AS NOME_VENDEDOR
      FROM Evento e
      LEFT JOIN Vendedores v ON e.CODIGO_VENDEDOR = v.ID
      WHERE e.DataVencimento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY)
    `;
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Buscar um evento por ID com o nome do vendedor
  async buscarPorId(id: number): Promise<Evento | null> {
    const sql = `
      SELECT e.*, v.NOME AS NOME_VENDEDOR
      FROM Evento e
      LEFT JOIN Vendedores v ON e.CODIGO_VENDEDOR = v.ID
      WHERE e.Id = ?
    `;
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

  // Serviço para buscar todos os eventos pagos com o nome do vendedor
  async buscarEventosPagos(): Promise<Evento[]> {
    const sql = `
      SELECT e.*, v.NOME AS NOME_VENDEDOR
      FROM Evento e
      LEFT JOIN Vendedores v ON e.CODIGO_VENDEDOR = v.ID
      WHERE e.status_pagamento = 'pago'
    `;
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Serviço para buscar todos os eventos não pagos com o nome do vendedor
  async buscarEventosNaoPagos(): Promise<Evento[]> {
    const sql = `
      SELECT e.*, v.NOME AS NOME_VENDEDOR
      FROM Evento e
      LEFT JOIN Vendedores v ON e.CODIGO_VENDEDOR = v.ID
      WHERE e.status_pagamento = 'não pago'
    `;
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Atualizar um evento
  async atualizar(id: number, dadosAtualizados: Partial<Evento>): Promise<void> {
    const sql = "UPDATE Evento SET ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [dadosAtualizados, id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  // Deletar um evento
  async deletar(id: number): Promise<void> {
    const sql = "DELETE FROM Evento WHERE Id = ?";
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

export default new EventoService();