
#DEFINE MAP_FIELD_JSON      1
#DEFINE MAP_FIELD_QUERY     2
#DEFINE MAP_FIELD_INJSON    3
#DEFINE MAP_FIELD_FIXED     4
#DEFINE MAP_FIELD_STRUCT    5
#DEFINE MAP_FIELD_STRUCT_FIELD    1
#DEFINE MAP_FIELD_STRUCT_TYPE     2
#DEFINE MAP_FIELD_STRUCT_SIZE     3
#DEFINE MAP_FIELD_STRUCT_DECIMAL  4


#DEFINE SX2_TABLE  "DADOS_ADV_DEV_120127_DB.dbo.SX2300"
#DEFINE SX3_TABLE  "DADOS_ADV_DEV_120127_DB.dbo.SX3300"
#DEFINE SX6_TABLE  "DADOS_ADV_DEV_120127_DB.dbo.SX6300"
#DEFINE SIX_TABLE  "DADOS_ADV_DEV_120127_DB.dbo.SIX300"

                // {cFieldJSON,cFieldQuery,lJSONField,lFixed,aStruct}
#DEFINE SX2_FIELDS { ;
    { "CHAVE"  , "X2_CHAVE"  , .T., .T., { "X2_CHAVE"  , "C", 003, 00 } } , ;
    { "ARQUIVO", "X2_ARQUIVO", .F., .F., { "X2_ARQUIVO", "C", 006, 00 } } , ;
    { "NOME"   , "X2_NOME"   , .T., .F., { "X2_NOME"   , "C", 030, 00 } } , ;
    { "NOMESPA", "X2_NOMESPA", .F., .F., { "X2_NOMESPA", "C", 030, 00 } } , ;
    { "NOMEENG", "X2_NOMEENG", .F., .F., { "X2_NOMEENG", "C", 030, 00 } } , ;
    { "MODO"   , "X2_MODO"   , .F., .F., { "X2_MODO"   , "C", 001, 00 } } , ;
    { "MODOUN" , "X2_MODOUN" , .F., .F., { "X2_MODOUN" , "C", 001, 00 } } , ;
    { "MODOEMP", "X2_MODOEMP", .F., .F., { "X2_MODOEMP", "C", 001, 00 } } , ;
    { "UNICO"  , "X2_UNICO"  , .F., .F., { "X2_UNICO"  , "C", 250, 00 } } ;
}

#DEFINE SX3_FIELDS { ;
    { "ARQUIVO", "X3_ARQUIVO", .F., .F., { "X3_ARQUIVO", "C", 003, 00 } } , ;
    { "ORDEM"  , "X3_ORDEM"  , .F., .F., { "X3_ORDEM"  , "C", 002, 00 } } , ;
    { "CAMPO"  , "X3_CAMPO"  , .T., .T., { "X3_CAMPO"  , "C", 010, 00 } } , ;
    { "TIPO"   , "X3_TIPO"   , .F., .F., { "X3_TIPO"   , "C", 001, 00 } } , ;
    { "TITULO" , "X3_TITULO" , .F., .F., { "X3_TITULO" , "C", 012, 00 } } , ;
    { "DESCRIC", "X3_DESCRIC", .F., .F., { "X3_DESCRIC", "C", 025, 00 } } , ;
    { "PROPRI" , "X3_PROPRI" , .F., .F., { "X3_PROPRI" , "C", 001, 00 } } , ;
    { "TAMANHO", "X3_TAMANHO", .F., .F., { "X3_TAMANHO", "N", 003, 00 } } , ;
    { "DECIMAL", "X3_DECIMAL", .F., .F., { "X3_DECIMAL", "N", 001, 00 } } ;
}

#DEFINE SX6_FIELDS { ;
    { "FIL"    , "X6_FIL"    , .T., .T., { "X6_FIL"    , "C", 007, 00 } } , ;
    { "VAR"    , "X6_VAR"    , .T., .T., { "X6_VAR"    , "C", 010, 00 } } , ;
    { "TIPO"   , "X6_TIPO"   , .F., .F., { "X6_TIPO"   , "C", 001, 00 } } , ;
    { "DESCRIC", "X6_DESCRIC", .F., .F., { "X6_DESCRIC", "C", 050, 00 } } , ;
    { "CONTEUD", "X6_CONTEUD", .F., .F., { "X6_CONTEUD", "C", 250, 00 } } , ;
    { "PROPRI" , "X6_PROPRI" , .F., .F., { "X6_PROPRI" , "C", 001, 00 } } ;
}

#DEFINE SIX_FIELDS { ;
    { "indice"   , "INDICE"   , .T., .T., { "INDICE"   , "C", 007, 00 } } , ;
    { "ordem"    , "ORDEM"    , .T., .T., { "ORDEM"    , "C", 007, 00 } } , ;
    { "chave"    , "CHAVE"    , .F., .T., { "CHAVE"    , "C", 007, 00 } } , ;
    { "descricao", "DESCRICAO", .T., .F., { "DESCRICAO", "C", 007, 00 } } , ;
    { "propri"   , "PROPRI"   , .F., .F., { "PROPRI"   , "C", 007, 00 } } , ;
    { "nickname" , "NICKNAME" , .F., .F., { "NICKNAME" , "C", 007, 00 } } ;
}


