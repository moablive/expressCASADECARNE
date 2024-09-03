import { Request, Response } from 'express';
import EventoService from '../services/eventoService';
import { Evento } from '../interface/evento';

// Marcar um evento como "pago"
export const marcarEventoComoPago = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o evento existe
        const eventoExistente = await EventoService.buscarPorId(Number(id));
        if (!eventoExistente) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Marca como pago
        await EventoService.marcarComoPago(Number(id));
        res.status(200).json({ message: 'Evento marcado como pago com sucesso' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao marcar evento como pago:', errorMessage);
        res.status(500).json({ message: 'Erro ao marcar evento como pago', error: errorMessage });
    }
};

// Marcar um evento como "não pago"
export const marcarEventoComoNaoPago = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o evento existe
        const eventoExistente = await EventoService.buscarPorId(Number(id));
        if (!eventoExistente) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Marca como não pago
        await EventoService.marcarComoNaoPago(Number(id));
        res.status(200).json({ message: 'Evento marcado como não pago com sucesso' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao marcar evento como não pago:', errorMessage);
        res.status(500).json({ message: 'Erro ao marcar evento como não pago', error: errorMessage });
    }
};

// Buscar todos os eventos
export const getAllEventos = async (req: Request, res: Response) => {
    try {
        const eventos = await EventoService.buscarTodos();
        res.json(eventos);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao buscar eventos:', errorMessage);
        res.status(500).json({ message: 'Erro ao buscar eventos', error: errorMessage });
    }
};

// Buscar eventos por mês e ano
export const getEventosByMonthAndYear = async (req: Request, res: Response) => {
    try {
        const { month, year } = req.params;
        const eventos = await EventoService.buscarPorMes(Number(month), Number(year));
        res.json(eventos);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao buscar eventos por mês e ano:', errorMessage);
        res.status(500).json({ message: 'Erro ao buscar eventos por mês e ano', error: errorMessage });
    }
};

// Busca Boletos que Venceram nos proximos 5 dias
export const getNextFiveEvent = async (req: Request, res: Response) => {
    try {
        const eventos = await EventoService.buscarProximosCincoDias();
        res.json(eventos);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao buscar eventos dos próximos 5 dias:', errorMessage);
        res.status(500).json({ message: 'Erro ao buscar eventos dos próximos 5 dias', error: errorMessage });
    }
};

// Buscar evento por ID
export const getEventoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const evento = await EventoService.buscarPorId(Number(id));

        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        res.json(evento);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao buscar evento:', errorMessage);
        res.status(500).json({ message: 'Erro ao buscar evento', error: errorMessage });
    }
};

// Atualizar um evento
export const updateEvento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dadosAtualizados: Partial<Evento> = req.body;

        // Verifica se o evento existe
        const eventoExistente = await EventoService.buscarPorId(Number(id));
        if (!eventoExistente) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Formatar as datas para o formato correto esperado pelo MySQL
        if (dadosAtualizados.DataEmissao) {
            dadosAtualizados.DataEmissao = new Date(dadosAtualizados.DataEmissao).toISOString().slice(0, 19).replace('T', ' ');
        }

        if (dadosAtualizados.DataVencimento) {
            dadosAtualizados.DataVencimento = new Date(dadosAtualizados.DataVencimento).toISOString().slice(0, 19).replace('T', ' ');
        }

        // Atualiza os dados do evento
        await EventoService.atualizar(Number(id), dadosAtualizados);
        res.status(200).json({ message: 'Evento atualizado com sucesso' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao atualizar evento:', errorMessage);
        res.status(500).json({ message: 'Erro ao atualizar evento', error: errorMessage });
    }
};

// Deletar um evento por ID
export const deleteEvento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o evento existe
        const eventoExistente = await EventoService.buscarPorId(Number(id));
        if (!eventoExistente) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Deleta o evento
        await EventoService.deletar(Number(id));
        res.status(200).json({ message: 'Evento deletado com sucesso' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao deletar evento:', errorMessage);
        res.status(500).json({ message: 'Erro ao deletar evento', error: errorMessage });
    }
};