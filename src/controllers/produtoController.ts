import { Request, Response } from 'express';
import ProdutoService from '../services/produtoService';

// Criar um novo produto
export const createProduto = async (req: Request, res: Response) => {
    try {
        const novoProduto = await ProdutoService.criar(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Erro ao criar produto', error: err.message });
    }
};

// Buscar todos os produtos
export const getAllProdutos = async (req: Request, res: Response) => {
    try {
        const produtos = await ProdutoService.buscarTodos();
        res.status(200).json(produtos);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message });
    }
};

// Buscar um produto por ID
export const getProdutoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const produto = await ProdutoService.buscarPorId(Number(id));
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: `Erro ao buscar produto com ID: ${id}`, error: err.message });
    }
};

// Buscar um produto por codigo_produto
export const getProdutoByCodigoProduto = async (req: Request, res: Response) => {
    const { codigoProduto } = req.params;
    try {
        const produto = await ProdutoService.buscarPorCodigoProduto(codigoProduto);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: `Erro ao buscar produto com código: ${codigoProduto}`, error: err.message });
    }
};

// Buscar produtos por descrição
export const getProdutosByDescricao = async (req: Request, res: Response) => {
    const { descricao } = req.params;
    if (typeof descricao !== 'string') {
        return res.status(400).json({ message: 'Descrição deve ser uma string' });
    }
    try {
        const produtos = await ProdutoService.buscarPorDescricao(descricao);
        res.status(200).json(produtos);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Erro ao buscar produtos por descrição', error: err.message });
    }
};

// Atualizar um produto
export const updateProduto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await ProdutoService.atualizar(Number(id), req.body);
        res.status(200).json({ message: `Produto com ID: ${id} atualizado com sucesso` });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: `Erro ao atualizar produto com ID: ${id}`, error: err.message });
    }
};

// Deletar um produto
export const deleteProduto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await ProdutoService.deletar(Number(id));
        res.status(200).json({ message: `Produto com ID: ${id} deletado com sucesso` });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: `Erro ao deletar produto com ID: ${id}`, error: err.message });
    }
};
