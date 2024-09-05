import { Evento } from "../interface/evento";
import conexao from "../db/conexao";

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

  // Buscar todos os eventos
  async buscarTodos(): Promise<Evento[]> {
    const sql = "SELECT * FROM Evento";
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Buscar eventos por mês e ano
  async buscarPorMes(mes: number, ano: number): Promise<Evento[]> {
    const sql = `
        SELECT * FROM Evento 
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

  // Busca eventos que vencem nos próximos 5 dias
  async buscaProximosVencimentos(): Promise<Evento[]> {
    const sql = `SELECT * FROM Evento WHERE DataVencimento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY);`;
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Buscar um evento por ID
  async buscarPorId(id: number): Promise<Evento | null> {
    const sql = "SELECT * FROM Evento WHERE Id = ?";
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

  // Serviço para buscar todos os eventos pagos
  async buscarEventosPagos(): Promise<Evento[] | null> {
    const sql = "SELECT * FROM Evento WHERE status_pagamento = 'pago'";
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }

        if (results.length === 0) {
          return resolve(null);
        }

        resolve(results);
      });
    });
  }

  // Serviço para buscar todos os eventos não pagos
  async buscarEventosNaoPagos(): Promise<Evento[] | null> {
    const sql = "SELECT * FROM Evento WHERE status_pagamento = 'não pago'";
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }

        if (results.length === 0) {
          return resolve(null);
        }

        resolve(results);
      });
    });
  }

  // Atualizar um evento
  async atualizar(
    id: number,
    dadosAtualizados: Partial<Evento>
  ): Promise<void> {
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
