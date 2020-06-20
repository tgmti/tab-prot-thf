const shareTypeColumnTemplate = {
    width: 20,
    type: 'subtitle', subtitles: [
      { value: 'E', color: 'color-08', label: 'Exclusivo', content: 'E' },
      { value: 'C', color: 'color-11', label: 'Compartilhado', content: 'C' },
    ]
  };

const columns = [
    { property: 'x2_chave'  , label: 'Tabela'     , filter: true , width: 10 },
    { property: 'x2_nome'   , label: 'Descrição'  , filter: true , width: 40 },
    { property: 'x2_modo'   , label: 'Filial'     , filter: false, ...shareTypeColumnTemplate },
    { property: 'x2_modoun' , label: 'Unidade'    , filter: false, ...shareTypeColumnTemplate },
    { property: 'x2_modoemp', label: 'Empresa'    , filter: false, ...shareTypeColumnTemplate },
    { property: 'x2_unico'  , label: 'Chave Única', filter: false, width: 40 },
];

const metadata =  {
    version: 7,
    actions: [],
    title: 'Tabelas',
    fields: columns,
    keepFilters: true
}

module.exports = metadata;
