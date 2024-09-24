import { Request, Response } from "express";
import ClientService from "../services/ClienteService";

// STATUS MAPA
import { ClientStatus } from "../interface/ClientStatus";

// Registrar um novo cliente
export const registerClient = async (req: Request, res: Response) => {
  try {
    const novoCliente = await ClientService.criar(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    const err = error as Error; // Casting do erro para o tipo Error
    res
      .status(500)
      .json({ message: "Erro ao registrar cliente", error: err.message });
  }
};

// Buscar todos os clientes
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clientes = await ClientService.buscarTodos();
    res.status(200).json(clientes);
  } catch (error) {
    const err = error as Error; // Casting do erro para o tipo Error
    res
      .status(500)
      .json({ message: "Erro ao buscar clientes", error: err.message });
  }
};

// Buscar um cliente por ID
export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await ClientService.buscarPorId(Number(id));
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    const err = error as Error; // Casting do erro para o tipo Error
    res.status(500).json({
      message: `Erro ao buscar cliente com ID: ${id}`,
      error: err.message,
    });
  }
};

// Atualizar um cliente
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ClientService.atualizar(Number(id), req.body);
    res
      .status(200)
      .json({ message: `Cliente com ID: ${id} atualizado com sucesso` });
  } catch (error) {
    const err = error as Error; // Casting do erro para o tipo Error
    res.status(500).json({
      message: `Erro ao atualizar cliente com ID: ${id}`,
      error: err.message,
    });
  }
};

// Deletar um cliente
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ClientService.deletar(Number(id));
    res
      .status(200)
      .json({ message: `Cliente com ID: ${id} deletado com sucesso` });
  } catch (error) {
    const err = error as Error; // Casting do erro para o tipo Error
    res.status(500).json({
      message: `Erro ao deletar cliente com ID: ${id}`,
      error: err.message,
    });
  }
};

// Função para buscar o nome do vendedor pelo código do vendedor
export const getVendedorNomeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Busca o nome do vendedor pelo código
    const nomeVendedor = await ClientService.buscarNomeVendedorPorId(
      Number(id)
    );

    if (!nomeVendedor) {
      return res.status(404).json({ message: "Vendedor não encontrado" });
    }

    res.status(200).json({ nome: nomeVendedor });
  } catch (error) {
    console.error("Erro ao buscar nome do vendedor:", error);
    res.status(500).json({ message: "Erro ao buscar nome do vendedor" });
  }
};

// FUNÇÃO PARA MODELAR O MAPA
export const getClientStatus = async (req: Request, res: Response) => {
  const { cnpj } = req.body;

  if (!cnpj) {
    return res.status(400).json({ message: "CNPJ é obrigatório" });
  }

  try {
    // STEP 1: Obter totais de eventos pagos/não pagos e valores totais
    const totals = await ClientService.obterTotaisPorCNPJ(cnpj);

    // STEP 2: Obter NFs pagas e não pagas
    const nfs = await ClientService.obterNFsPorCNPJ(cnpj);

    // Construir o objeto ClientStatus com os dados obtidos
    const clientStatus: ClientStatus = {
      eventos_pagos: totals.eventos_pagos,
      eventos_nao_pagos: totals.eventos_nao_pagos,
      total_pagos: totals.total_pagos,
      total_nao_pagos: totals.total_nao_pagos,
      nfs_pagos: nfs.nfs_pagos.map((nf) => ({
        ...nf,
        status_pagamento: "pago",
      })),
      nfs_nao_pagos: nfs.nfs_nao_pagos.map((nf) => ({
        ...nf,
        status_pagamento: "não pago",
      })),
    };

    res.status(200).json(clientStatus);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao obter status do cliente:", error.message);
      res.status(500).json({
        message: "Erro ao obter status do cliente",
        error: error.message,
      });
    } else {
      console.error("Erro desconhecido ao obter status do cliente:", error);
      res
        .status(500)
        .json({ message: "Erro desconhecido ao obter status do cliente" });
    }
  }
};
