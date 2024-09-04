export interface Produto {
  id: number;
  codigo_produto: string;
  loja?: string;
  codigo_barras?: string;
  descricao?: string;
  valor_venda?: number;
  unidade?: string;
  icms?: number;
  categoria?: string;
}
