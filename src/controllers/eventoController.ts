import { Request, Response } from "express";
import EventoService from "../services/eventoService";
import { Evento } from "../interface/evento";

// Marcar um Evento como "pago" com comprovante
export const marcarEventoComoPago = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comprovanteBase64 } = req.body;

    if (!comprovanteBase64) {
      return res
        .status(400)
        .json({ message: "Comprovante é obrigatório para marcar como pago" });
    }

    const eventoExistente = await EventoService.buscarPorId(Number(id));
    if (!eventoExistente) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    await EventoService.marcarComoPago(Number(id), comprovanteBase64);
    res.status(200).json({ message: "Evento marcado como pago com sucesso" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao marcar evento como pago:", errorMessage);
    res.status(500).json({
      message: "Erro ao marcar evento como pago",
      error: errorMessage,
    });
  }
};

// Marcar um evento como "não pago"
export const marcarEventoComoNaoPago = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verifica se o evento existe
    const eventoExistente = await EventoService.buscarPorId(Number(id));
    if (!eventoExistente) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    // Marca como não pago
    await EventoService.marcarComoNaoPago(Number(id));
    res
      .status(200)
      .json({ message: "Evento marcado como não pago com sucesso" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao marcar evento como não pago:", errorMessage);
    res.status(500).json({
      message: "Erro ao marcar evento como não pago",
      error: errorMessage,
    });
  }
};

// Função para download do comprovante
export const downloadComprovante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar o evento pelo ID
    const evento = await EventoService.buscarPorId(Number(id));

    if (!evento || !evento.ComprovanteBase64) {
      return res.status(404).json({ message: "Comprovante não encontrado" });
    }

    // Remover qualquer prefixo como 'data:application/pdf;base64,' que possa estar na string Base64
    const base64Data = evento.ComprovanteBase64.replace(/^data:application\/pdf;base64,/, '');

    // Converter o Base64 para Buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Definir os headers para o download correto do arquivo
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=comprovante_${evento.NumeroNF}.pdf`
    );

    // Enviar o arquivo em forma de buffer
    res.send(buffer);
  } catch (error) {
    console.error("Erro ao realizar download do comprovante:", error);
    res
      .status(500)
      .json({ message: "Erro ao realizar download do comprovante" });
  }
};

// Buscar todos os eventos
export const getAllEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await EventoService.buscarTodos();
    res.json(eventos);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao buscar eventos:", errorMessage);
    res
      .status(500)
      .json({ message: "Erro ao buscar eventos", error: errorMessage });
  }
};

// Buscar eventos por mês e ano
export const getEventosByMonthAndYear = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const eventos = await EventoService.buscarPorMes(
      Number(month),
      Number(year)
    );
    res.json(eventos);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao buscar eventos por mês e ano:", errorMessage);
    res.status(500).json({
      message: "Erro ao buscar eventos por mês e ano",
      error: errorMessage,
    });
  }
};

// Busca Boletos que Venceram nos proximos 5 dias
export const getNextExpiration = async (req: Request, res: Response) => {
  try {
    const eventos = await EventoService.buscaProximosVencimentos();
    res.json(eventos);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao buscar eventos dos próximos 5 dias:", errorMessage);
    res.status(500).json({
      message: "Erro ao buscar eventos dos próximos 5 dias",
      error: errorMessage,
    });
  }
};

// Buscar evento por ID
export const getEventoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evento = await EventoService.buscarPorId(Number(id));

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.json(evento);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao buscar evento:", errorMessage);
    res
      .status(500)
      .json({ message: "Erro ao buscar evento", error: errorMessage });
  }
};

// Busca Todos os Eventos Pagos
export const getAllPaidEvents = async (req: Request, res: Response) => {
  try {
    const paidEvents = await EventoService.buscarEventosPagos();
    res.json(paidEvents);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao buscar eventos pagos:", errorMessage);
    res
      .status(500)
      .json({ message: "Erro ao buscar eventos pagos", error: errorMessage });
  }
};

// Busca Todos os Eventos não pagos
export const getallunpaidEvents = async (req: Request, res: Response) => {
  try {
    const unpaidEvents = await EventoService.buscarEventosNaoPagos();
    res.json(unpaidEvents);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao buscar eventos não pagos:", errorMessage);
    res.status(500).json({
      message: "Erro ao buscar eventos não pagos",
      error: errorMessage,
    });
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
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    // Formatar as datas para o formato correto esperado pelo MySQL
    if (dadosAtualizados.DataEmissao) {
      dadosAtualizados.DataEmissao = new Date(dadosAtualizados.DataEmissao)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    }

    if (dadosAtualizados.DataVencimento) {
      dadosAtualizados.DataVencimento = new Date(
        dadosAtualizados.DataVencimento
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    }

    // Atualiza os dados do evento
    await EventoService.atualizar(Number(id), dadosAtualizados);
    res.status(200).json({ message: "Evento atualizado com sucesso" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao atualizar evento:", errorMessage);
    res
      .status(500)
      .json({ message: "Erro ao atualizar evento", error: errorMessage });
  }
};

// Deletar um evento por ID
export const deleteEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verifica se o evento existe
    const eventoExistente = await EventoService.buscarPorId(Number(id));
    if (!eventoExistente) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    // Deleta o evento
    await EventoService.deletar(Number(id));
    res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao deletar evento:", errorMessage);
    res
      .status(500)
      .json({ message: "Erro ao deletar evento", error: errorMessage });
  }
};
