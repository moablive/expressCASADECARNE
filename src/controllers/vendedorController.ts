import { Request, Response } from 'express';
import VendedorService from '../services/vendedorService';
import { Vendedor } from '../interface/vendedor';

// Registrar um novo vendedor
export const registerVendedor = async (req: Request, res: Response) => {
    try {
        const novoVendedor: Vendedor = req.body;

        // Criar o vendedor
        const vendedorCriado = await VendedorService.criar(novoVendedor);
        res.status(201).json(vendedorCriado);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao cadastrar vendedor:', errorMessage);
        res.status(500).json({ message: 'Erro ao cadastrar vendedor', error: errorMessage });
    }
};

// Buscar todos os vendedores
export const getAllVendedores = async (req: Request, res: Response) => {
    try {
        const vendedores = await VendedorService.buscarTodos();
        res.json(vendedores);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao buscar vendedores:', errorMessage);
        res.status(500).json({ message: 'Erro ao buscar vendedores', error: errorMessage });
    }
};

// Buscar vendedor por ID
export const getVendedorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vendedor = await VendedorService.buscarPorId(Number(id));

        if (!vendedor) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }

        res.json(vendedor);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao buscar vendedor:', errorMessage);
        res.status(500).json({ message: 'Erro ao buscar vendedor', error: errorMessage });
    }
};

// Atualizar um vendedor
export const updateVendedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dadosAtualizados: Partial<Vendedor> = req.body;

        // Verifica se o vendedor existe
        const vendedorExistente = await VendedorService.buscarPorId(Number(id));
        if (!vendedorExistente) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }

        // Atualiza os dados do vendedor
        await VendedorService.atualizar(Number(id), dadosAtualizados);
        res.status(200).json({ message: 'Vendedor atualizado com sucesso' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao atualizar vendedor:', errorMessage);
        res.status(500).json({ message: 'Erro ao atualizar vendedor', error: errorMessage });
    }
};

// Deletar um vendedor por ID
export const deleteVendedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o vendedor existe
        const vendedorExistente = await VendedorService.buscarPorId(Number(id));
        if (!vendedorExistente) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }

        // Deleta o vendedor
        await VendedorService.deletar(Number(id));
        res.status(200).json({ message: 'Vendedor deletado com sucesso' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao deletar vendedor:', errorMessage);
        res.status(500).json({ message: 'Erro ao deletar vendedor', error: errorMessage });
    }
};