import { Router } from "express";
import {
  createProduto,
  getAllProdutos,
  getProdutoById,
  getProdutoByCodigoProduto,
  getProdutosByDescricao,
  updateProduto,
  deleteProduto,
} from "../controllers/produtoController";
import { authenticateToken } from "../authMiddleware/authMiddleware";

const router = Router();

// Rotas protegidas por autenticação JWT
router.post("/create", authenticateToken, createProduto); // Rota para criação de um novo produto
router.get("/getAll", authenticateToken, getAllProdutos); // Buscar todos os produtos
router.get("/getProdutoById/:id", authenticateToken, getProdutoById); // Buscar um produto por ID
router.get("/getProdutoByCodigoProduto/:codigoProduto", authenticateToken, getProdutoByCodigoProduto); // Buscar um produto por código
router.get("/getProdutosByDescricao/:descricao", authenticateToken, getProdutosByDescricao); // Buscar produtos por descrição
router.put("/updateProdutoById/:id", authenticateToken, updateProduto); // Atualizar um produto
router.delete("/deleteProdutoById/:id", authenticateToken, deleteProduto); // Deletar um produto

export default router;
