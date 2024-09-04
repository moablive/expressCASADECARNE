import { Produto } from "../interface/produto";
import conexao from "../db/conexao";

class ProdutoService {
  // Criar um novo produto
  async criar(produtoData: Partial<Produto>): Promise<Produto> {
    const sql = `INSERT INTO Produtos (codigo_produto, loja, codigo_barras, descricao, valor_venda, unidade, icms, categoria)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      conexao.query(
        sql,
        [
          produtoData.codigo_produto,
          produtoData.loja,
          produtoData.codigo_barras,
          produtoData.descricao,
          produtoData.valor_venda,
          produtoData.unidade,
          produtoData.icms,
          produtoData.categoria,
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve({ ...produtoData, id: results.insertId } as Produto); // Assume que o ID do produto foi gerado automaticamente
        }
      );
    });
  }

  // Buscar todos os produtos
  async buscarTodos(): Promise<Produto[]> {
    const sql = "SELECT * FROM Produtos";
    return new Promise((resolve, reject) => {
      conexao.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Buscar um produto por ID
  async buscarPorId(id: number): Promise<Produto | null> {
    const sql = "SELECT * FROM Produtos WHERE id = ?";
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

  // Buscar um produto por codigo_produto
  async buscarPorCodigoProduto(codigoProduto: string): Promise<Produto | null> {
    const sql = "SELECT * FROM Produtos WHERE codigo_produto = ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [codigoProduto], (err, results) => {
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

  // Buscar um produto por descricao
  async buscarPorDescricao(descricao: string): Promise<Produto[]> {
    const sql = "SELECT * FROM Produtos WHERE descricao LIKE ?";
    return new Promise((resolve, reject) => {
      conexao.query(sql, [`%${descricao}%`], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  
  // Atualizar um produto
  async atualizar(
    id: number,
    dadosAtualizados: Partial<Produto>
  ): Promise<void> {
    const sql =
      "UPDATE Produtos SET codigo_produto = ?, loja = ?, codigo_barras = ?, descricao = ?, valor_venda = ?, unidade = ?, icms = ?, categoria = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      conexao.query(
        sql,
        [
          dadosAtualizados.codigo_produto,
          dadosAtualizados.loja,
          dadosAtualizados.codigo_barras,
          dadosAtualizados.descricao,
          dadosAtualizados.valor_venda,
          dadosAtualizados.unidade,
          dadosAtualizados.icms,
          dadosAtualizados.categoria,
          id,
        ],
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
  }

  // Deletar um produto
  async deletar(id: number): Promise<void> {
    const sql = "DELETE FROM Produtos WHERE id = ?";
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

export default new ProdutoService();
