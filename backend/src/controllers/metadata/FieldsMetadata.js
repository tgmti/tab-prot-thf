const literals = {
  x3_arquivo: 'Arquivo',
  x3_ordem: 'Ordem',
  x3_campo: 'Campo',
  x3_tipo: 'Tipo',
  x3_titulo: 'Titulo',
  x3_descric: 'Descrição',
  x3_picture: 'Picture',
  x3_valid: 'Validação',
  x3_vlduser: 'Valid.Usuário',
  x3_relacao: 'Relação',
  x3_f3: 'F3',
  x3_reserv: 'Reservado',
  x3_trigger: 'Gatilho',
  x3_propri: 'Proprietário',
  x3_browse: 'Browse',
  x3_visual: 'Visual',
  x3_context: 'Contexto',
  x3_obrigat: 'Obrigatório',
  x3_cbox: 'Opções Combo',
  x3_pictvar: 'Picture Variável',
  x3_when: 'Modo de Edição',
  x3_inibrw: 'Inicializador de Browse',
  x3_grpsxg: 'Grupo de Campos',
  x3_folder: 'Pasta',
  x3_tamanho: 'Tamanho',
  x3_decimal: 'Decimal',
};


const columns = [
  { property: 'x3_arquivo', label: literals['x3_arquivo'] , filter: true, width: '80px' },
  { property: 'x3_ordem', label: literals['x3_ordem'] , filter: false, width: '80px' },
  { property: 'x3_campo', label: literals['x3_campo'] , filter: true, width: '100px' },
  { property: 'x3_tipo', label: literals['x3_tipo'] , filter: true, width: '100px',
    type: 'label', labels: [
      { value: 'C', color: 'color-11', label: 'Caractere' },
      { value: 'N', color: 'color-09', label: 'Numérico' },
      { value: 'D', color: 'color-08', label: 'Data' },
      { value: 'M', color: 'color-07', label: 'Memo' },
      { value: 'L', color: 'color-04', label: 'Lógico' },
    ]
  },
  { property: 'x3_titulo', label: literals['x3_titulo'] , filter: true, width: '100px' },
  { property: 'x3_descric', label: literals['x3_descric'] , filter: true, width: '150px' },
  { property: 'x3_propri', label: literals['x3_propri'] , filter: true,
    type: 'subtitle', subtitles: [
      { value: '', color: 'color-08', label: 'Sistema', content: 'S' },
      { value: 'S', color: 'color-08', label: 'Sistema', content: 'S' },
      { value: 'U', color: 'color-11', label: 'Usuário', content: 'U' },
    ]
  },
  { property: 'x3_tamanho', label: literals['x3_tamanho'] , filter: false, width: '80px' },
  { property: 'x3_decimal', label: literals['x3_decimal'] , filter: false, width: '80px' },
];

const metadata =  {
    version: 1,
    actions: [],
    title: 'Campos',
    fields: columns,
    keepFilters: true
}

module.exports = metadata;
