#DEFINE SX2_TABLE  "SX2990"
#DEFINE SX3_TABLE  "SX3990"
#DEFINE SX6_TABLE  "SX6990"
#DEFINE SIX_TABLE  "SIX990"

                // {cFieldJSON,cFieldQuery,lJSONField,lFixed,aStruct}
#DEFINE SX2_FIELDS { ;
    { "x2_chave"  , "X2_CHAVE"  , .T., .T., { "X2_CHAVE"  , "C", 003, 00 } } , ;
    { "x2_arquivo", "X2_ARQUIVO", .F., .F., { "X2_ARQUIVO", "C", 006, 00 } } , ;
    { "x2_nome"   , "X2_NOME"   , .T., .F., { "X2_NOME"   , "C", 030, 00 } } , ;
    { "x2_nomespa", "X2_NOMESPA", .F., .F., { "X2_NOMESPA", "C", 030, 00 } } , ;
    { "x2_nomeeng", "X2_NOMEENG", .F., .F., { "X2_NOMEENG", "C", 030, 00 } } , ;
    { "x2_modo"   , "X2_MODO"   , .F., .F., { "X2_MODO"   , "C", 001, 00 } } , ;
    { "x2_modoun" , "X2_MODOUN" , .F., .F., { "X2_MODOUN" , "C", 001, 00 } } , ;
    { "x2_modoemp", "X2_MODOEMP", .F., .F., { "X2_MODOEMP", "C", 001, 00 } } , ;
    { "x2_unico"  , "X2_UNICO"  , .F., .F., { "X2_UNICO"  , "C", 250, 00 } } ;
}

#DEFINE SX2_KEYS { "X2_CHAVE","X2_ARQUIVO","X2_NOME" }
#DEFINE SX3_KEYS { "X3_ARQUIVO", "X3_CAMPO", "X3_TITULO", "X3_DESCRIC" }
#DEFINE SIX_KEYS { "INDICE", "CHAVE", "DESCRICAO", "NICKNAME" }
#DEFINE SX6_KEYS { "X6_FIL", "X6_VAR", "X6_TIPO", "X6_CONTEUD" }

#DEFINE SX3_FIELDS { ;
    { "x3_arquivo", "X3_ARQUIVO", .F., .F., { "X3_ARQUIVO", "C", 003, 00 } } , ;
    { "x3_ordem"  , "X3_ORDEM"  , .F., .F., { "X3_ORDEM"  , "C", 002, 00 } } , ;
    { "x3_campo"  , "X3_CAMPO"  , .T., .T., { "X3_CAMPO"  , "C", 010, 00 } } , ;
    { "x3_tipo"   , "X3_TIPO"   , .F., .F., { "X3_TIPO"   , "C", 001, 00 } } , ;
    { "x3_titulo" , "X3_TITULO" , .F., .F., { "X3_TITULO" , "C", 012, 00 } } , ;
    { "x3_descric", "X3_DESCRIC", .F., .F., { "X3_DESCRIC", "C", 025, 00 } } , ;
    { "x3_propri" , "X3_PROPRI" , .F., .F., { "X3_PROPRI" , "C", 001, 00 } } , ;
    { "x3_tamanho", "X3_TAMANHO", .F., .F., { "X3_TAMANHO", "N", 003, 00 } } , ;
    { "x3_decimal", "X3_DECIMAL", .F., .F., { "X3_DECIMAL", "N", 001, 00 } } ;
}

#DEFINE SX6_FIELDS { ;
    { "x6_fil"    , "X6_FIL"    , .T., .T., { "X6_FIL"    , "C", 007, 00 } } , ;
    { "x6_var"    , "X6_VAR"    , .T., .T., { "X6_VAR"    , "C", 010, 00 } } , ;
    { "x6_tipo"   , "X6_TIPO"   , .F., .F., { "X6_TIPO"   , "C", 001, 00 } } , ;
    { "x6_descric", "X6_DESCRIC", .F., .F., { "X6_DESCRIC", "C", 050, 00 } } , ;
    { "x6_conteud", "X6_CONTEUD", .F., .F., { "X6_CONTEUD", "C", 250, 00 } } , ;
    { "x6_propri" , "X6_PROPRI" , .F., .F., { "X6_PROPRI" , "C", 001, 00 } } ;
}

#DEFINE SIX_FIELDS { ;
    { "indice"   , "INDICE"   , .T., .T., { "INDICE"   , "C", 007, 00 } } , ;
    { "ordem"    , "ORDEM"    , .T., .T., { "ORDEM"    , "C", 007, 00 } } , ;
    { "chave"    , "CHAVE"    , .F., .T., { "CHAVE"    , "C", 007, 00 } } , ;
    { "descricao", "DESCRICAO", .T., .F., { "DESCRICAO", "C", 007, 00 } } , ;
    { "propri"   , "PROPRI"   , .F., .F., { "PROPRI"   , "C", 007, 00 } } , ;
    { "nickname" , "NICKNAME" , .F., .F., { "NICKNAME" , "C", 007, 00 } } ;
}


