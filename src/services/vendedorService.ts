import "dotenv/config";
import { Vendedor } from "../interface/vendedor";
import conexao from "../db/conexao";

class VendedorService {
  // Criar um novo vendedor
  async criar(vendedor: Vendedor): Promise<Vendedor> {
    const { NOME, EMAIL, CONTATO } = vendedor;

    const sql =
      "INSERT INTO Vendedores (NOME, EMAIL, CONTATO) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [NOME, EMAIL, CONTATO], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({
          ID: results.insertId,
          NOME,
          EMAIL,
          CONTATO,
        });
      });
    });
  }

  // Buscar todos os vendedores
  async buscarTodos(): Promise<Vendedor[]> {
    const sql = "SELECT * FROM Vendedores";
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Buscar um vendedor por ID
  async buscarPorId(id: number): Promise<Vendedor | null> {
    const sql = "SELECT * FROM Vendedores WHERE ID = ?";
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

  // Buscar vendas por vendedor
  async buscarVendasPorVendedor(): Promise<any> {
    const sql = `
        SELECT 
            Vendedores.NOME AS NomeVendedor,
            Vendedores.EMAIL AS EmailVendedor,
            Vendedores.CONTATO AS ContatoVendedor,
            SUM(Evento.ValorNF) AS TotalVendas,
            COUNT(Evento.Id) AS QuantidadeEventos
        FROM 
            Vendedores
        INNER JOIN 
            Evento ON Vendedores.ID = Evento.CODIGO_VENDEDOR
        WHERE 
            Evento.status_pagamento = 'pago'
        GROUP BY 
            Vendedores.NOME, Vendedores.EMAIL, Vendedores.CONTATO
        ORDER BY 
            TotalVendas DESC;
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

  // Atualizar um vendedor
  async atualizar(
    id: number,
    dadosAtualizados: Partial<Vendedor>
  ): Promise<Vendedor | null> {
    const sql = "UPDATE Vendedores SET ? WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [dadosAtualizados, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return resolve(null);
        }
        resolve({ ID: id, ...dadosAtualizados });
      });
    });
  }

  // Deletar um vendedor
  async deletar(id: number): Promise<boolean> {
    const sql = "DELETE FROM Vendedores WHERE ID = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows > 0);
      });
    });
  }
}

export default new VendedorService();
