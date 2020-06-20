const columns = [
    { property: 'x6_fil' , label: 'Filial'   , filter: true, width: 60 },
    { property: 'x6_var' , label: 'Parâmetro', filter: true, width: 10 },
    { property: 'x6_tipo', label: 'Tipo'     , filter: true, width: 10,
      type: 'label', labels: [
        { value: 'C', color: 'color-11', label: 'Caractere' },
        { value: 'N', color: 'color-09', label: 'Numérico' },
        { value: 'D', color: 'color-08', label: 'Data' },
        { value: 'M', color: 'color-07', label: 'Memo' },
        { value: 'L', color: 'color-04', label: 'Lógico' },
      ]
    },
    { property: 'x6_descric', label: 'Descrição'   , filter: true, width: 200 },
    { property: 'x6_conteud', label: 'Conteúdo'    , filter: true, width: 100 },
    { property: 'x6_propri' , label: 'Proprietário', filter: false,
      type: 'subtitle', subtitles: [
        { value: 'S', color: 'color-08', label: 'Sistema', content: 'S' },
        { value: 'U', color: 'color-11', label: 'Usuário', content: 'U' },
      ]
    },
  ];

const metadata =  {
    version: 1,
    actions: [],
    title: 'Parâmetros',
    fields: columns,
    keepFilters: true
}

module.exports = metadata;
