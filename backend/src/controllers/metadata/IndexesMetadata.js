const literals = {
  title: 'Índices',
  indice: 'Tabela',
  ordem: 'Ordem',
  chave: 'Chave',
  descricao: 'Descrição',
  propri: 'Proprietário',
  f3: 'F3',
  nickname: 'Nickname',
  showpesq: 'Mostra Pesquisa',
  ix_virtual: 'Virtual',
  ix_vircust: 'Virtual Customizado',
};

const columns = [
  { property: 'indice', label: literals['indice'], filter: true, width: 20 },
  { property: 'ordem', label: literals['ordem'], filter: true, width: 10},
  { property: 'chave', label: literals['chave'], filter: true, width: 30},
  { property: 'descricao', label: literals['descricao'], filter: true, width: 30},
  { property: 'propri', label: literals['propri'], filter: true, width: 05,
    type: 'subtitle', subtitles: [
      { value: 'S', color: 'color-08', label: 'Sistema', content: 'S' },
      { value: 'U', color: 'color-11', label: 'Usuário', content: 'U' },
    ]
  },
  { property: 'nickname', label: literals['nickname'], filter: true, width: 30 },
];


const metadata =  {
    version: 3,
    actions: [],
    title: literals['title'],
    fields: columns,
    keepFilters: true
}

module.exports = metadata;
