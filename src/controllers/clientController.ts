import { Request, Response } from 'express';
import ClientService from '../services/ClienteService';

// Registrar um novo cliente
export const registerClient = async (req: Request, res: Response) => {
    try {
        const novoCliente = await ClientService.criar(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        const err = error as Error;  // Casting do erro para o tipo Error
        res.status(500).json({ message: 'Erro ao registrar cliente', error: err.message });
    }
};

// Buscar todos os clientes
export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clientes = await ClientService.buscarTodos();
        res.status(200).json(clientes);
    } catch (error) {
        const err = error as Error;  // Casting do erro para o tipo Error
        res.status(500).json({ message: 'Erro ao buscar clientes', error: err.message });
    }
};

// Buscar um cliente por ID
export const getClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cliente = await ClientService.buscarPorId(Number(id));
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        const err = error as Error;  // Casting do erro para o tipo Error
        res.status(500).json({ message: `Erro ao buscar cliente com ID: ${id}`, error: err.message });
    }
};

// Atualizar um cliente
export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await ClientService.atualizar(Number(id), req.body);
        res.status(200).json({ message: `Cliente com ID: ${id} atualizado com sucesso` });
    } catch (error) {
        const err = error as Error;  // Casting do erro para o tipo Error
        res.status(500).json({ message: `Erro ao atualizar cliente com ID: ${id}`, error: err.message });
    }
};

// Deletar um cliente
export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await ClientService.deletar(Number(id));
        res.status(200).json({ message: `Cliente com ID: ${id} deletado com sucesso` });
    } catch (error) {
        const err = error as Error;  // Casting do erro para o tipo Error
        res.status(500).json({ message: `Erro ao deletar cliente com ID: ${id}`, error: err.message });
    }
};


// Função para obter o nome do vendedor pelo código
export const getVendedorNomeById = async (req: Request, res: Response) => {
    const { codigoVendedor } = req.params;
    try {
        const nomeVendedor = await ClientService.buscarNomeVendedorPorId(Number(codigoVendedor));
        if (!nomeVendedor) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }
        res.status(200).json({ nome: nomeVendedor });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Erro ao buscar o nome do vendedor', error: err.message });
    }
};