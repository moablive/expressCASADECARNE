export interface ClientStatus {
  eventos_nao_pagos: number; // Quantidade de eventos não pagos
  eventos_pagos: number; // Quantidade de eventos pagos
  total_pagos: number; // Valor total de eventos pagos
  total_nao_pagos: number; // Valor total de eventos não pagos
  nfs_pagos: {
    numero_nf: string;
    valor_nf: number;
    status_pagamento: string;
  }[]; // Lista de NFs, valores e status de eventos pagos
  nfs_nao_pagos: {
    numero_nf: string;
    valor_nf: number;
    status_pagamento: string;
  }[]; // Lista de NFs, valores e status de eventos não pagos
}
