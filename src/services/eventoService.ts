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
