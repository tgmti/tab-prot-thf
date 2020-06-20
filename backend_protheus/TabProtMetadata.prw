#include "totvs.ch"
#include "parmtype.ch"

//============================================================================\
/*/{Protheus.doc}TabProtMetadata
==============================================================================
    @description
    Metadados para as tabelas do sistema
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
CLASS TabProtMetadata FROM LongNameClass

    DATA cTable     AS String
    DATA cMetadata  AS String

    METHOD New(cTable) CONSTRUCTOR
    METHOD GetMetadata( )

ENDCLASS
// FIM da Defini��o da classe TabProtMetadata
//==============================================================================



//============================================================================\
/*/{Protheus.doc}TabProtMetadata:New
==============================================================================
    @description
    M�todo construtor da classe TabProtMetadata
    @author Thiago Mota <tgmspawn@gmail.com>

    @param cTable , Tabela que ser� consultada
    @param aFields, Campos que ser�o mapeados no adapter
    @param cVerb  , verbo HTTP utilizado
    @param lList  , Indica se deve retornar uma lista de registros
/*/
//============================================================================\
METHOD New(cTable) CLASS TabProtMetadata
    ::cTable    := cTable
Return (Self)
// FIM do m�todo New
//==============================================================================



//============================================================================\
/*/{Protheus.doc}TabProtMetadata:ExecGet
==============================================================================
    @description
    M�todo construtor da classe TabProtMetadata
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
METHOD GetMetadata() CLASS TabProtMetadata

    Local cMetadata:= ""

    If ::cTable == "SX2"
        BeginContent var cMetadata
        {   "version": 20,
            "title": "Tabelas",
            "actions": [],
            "keepFilters": true,
            "fields": [
                { "property": "x2_chave"  , "label": "Tabela"     , "filter": true , "width": "10" },
                { "property": "x2_nome"   , "label": "Descri��o"  , "filter": true , "width": "40" },
                { "property": "x2_modo"   , "label": "Filial"     , "filter": false, "width": "20", "type": "subtitle",
                    "subtitles": [
                        { "value": "E", "color": "color-08", "label": "Exclusivo", "content": "E" },
                        { "value": "C", "color": "color-11", "label": "Compartilhado", "content": "C" }
                    ]
                },
                { "property": "x2_modoun" , "label": "Unidade"    , "filter": false, "width": "20", "type": "subtitle",
                    "subtitles": [
                        { "value": "E", "color": "color-08", "label": "Exclusivo", "content": "E" },
                        { "value": "C", "color": "color-11", "label": "Compartilhado", "content": "C" }
                    ]
                },
                { "property": "x2_modoemp", "label": "Empresa"    , "filter": false, "width": "20", "type": "subtitle",
                    "subtitles": [
                        { "value": "E", "color": "color-08", "label": "Exclusivo", "content": "E" },
                        { "value": "C", "color": "color-11", "label": "Compartilhado", "content": "C" }
                    ]
                },
                { "property": "x2_unico"  , "label": "Chave �nica", "filter": false, "width": "40" }
            ]
        }
        EndContent
    ElseIf ::cTable == "SX3"
        /*
        Campos para implementar
            const literals = {
            x3_picture: "Picture",
            x3_valid: "Valida��o",
            x3_vlduser: "Valid.Usu�rio",
            x3_relacao: "Rela��o",
            x3_f3: "F3",
            x3_reserv: "Reservado",
            x3_trigger: "Gatilho",
            x3_browse: "Browse",
            x3_visual: "Visual",
            x3_context: "Contexto",
            x3_obrigat: "Obrigat�rio",
            x3_cbox: "Op��es Combo",
            x3_pictvar: "Picture Vari�vel",
            x3_when: "Modo de Edi��o",
            x3_inibrw: "Inicializador de Browse",
            x3_grpsxg: "Grupo de Campos",
            x3_folder: "Pasta",
            };
        */

        BeginContent var cMetadata
        {
            "version": 20,
            "actions": [],
            "title": "Campos",
            "keepFilters": true,
            "fields": [
                { "property": "x3_arquivo", "label": "Arquivo" , "filter": true, "width": "80px" },
                { "property": "x3_ordem", "label": "Ordem" , "filter": false, "width": "80px" },
                { "property": "x3_campo", "label": "Campo" , "filter": true, "width": "100px" },
                { "property": "x3_tipo", "label": "Tipo" , "filter": true, "width": "100px",
                    "type": "label", "labels": [
                    { "value": "C", "color": "color-11", "label": "Caractere" },
                    { "value": "N", "color": "color-09", "label": "Num�rico" },
                    { "value": "D", "color": "color-08", "label": "Data" },
                    { "value": "M", "color": "color-07", "label": "Memo" },
                    { "value": "L", "color": "color-04", "label": "L�gico" }
                    ]
                },
                { "property": "x3_titulo", "label": "Titulo" , "filter": true, "width": "100px" },
                { "property": "x3_descric", "label": "Descri��o" , "filter": true, "width": "150px" },
                { "property": "x3_propri", "label": "Propriet�rio" , "filter": true,
                    "type": "subtitle", "subtitles": [
                    { "value": "", "color": "color-08", "label": "Sistema", "content": "S" },
                    { "value": "S", "color": "color-08", "label": "Sistema", "content": "S" },
                    { "value": "U", "color": "color-11", "label": "Usu�rio", "content": "U" }
                    ]
                },
                { "property": "x3_tamanho", "label": "Tamanho" , "filter": false, "width": "80px" },
                { "property": "x3_decimal", "label": "Decimal" , "filter": false, "width": "80px" }
            ]
        }
        EndContent
    ElseIf ::cTable == "SIX"
        /*
        const literals = {
            title: "�ndices",
            indice: "Tabela",
            ordem: "Ordem",
            chave: "Chave",
            descricao: "Descri��o",
            propri: "Propriet�rio",
            f3: "F3",
            nickname: "Nickname",
            showpesq: "Mostra Pesquisa",
            ix_virtual: "Virtual",
            ix_vircust: "Virtual Customizado",
        };
        */

        BeginContent var cMetadata
        {
            "version": 20,
            "actions": [],
            "title": "�ndices",
            "keepFilters": true,
            "fields": [
                { "property": "indice", "label": "Tabela", "filter": true, "width": "20" },
                { "property": "ordem", "label": "Ordem", "filter": true, "width": "10"},
                { "property": "chave", "label": "Chave", "filter": true, "width": "30"},
                { "property": "descricao", "label": "Descri��o", "filter": true, "width": "30"},
                { "property": "propri", "label": "Propriet�rio", "filter": true, "width": "05",
                    "type": "subtitle", "subtitles": [
                        { "value": "S", "color": "color-08", "label": "Sistema", "content": "S" },
                        { "value": "U", "color": "color-11", "label": "Usu�rio", "content": "U" }
                    ]
                },
                { "property": "nickname", "label": "Nickname", "filter": true, "width": "30" }
            ]
        }
        EndContent
    ElseIf ::cTable == "SX6"
        BeginContent var cMetadata
        {
            "version": 20,
            "actions": [],
            "title": "Par�metros",
            "keepFilters": true,
            "fields": [
                { "property": "x6_fil" , "label": "Filial"   , "filter": true, "width": "60" },
                { "property": "x6_var" , "label": "Par�metro", "filter": true, "width": "10" },
                { "property": "x6_tipo", "label": "Tipo"     , "filter": true, "width": "10", "type": "label",
                "labels": [
                        { "value": "C", "color": "color-11", "label": "Caractere" },
                        { "value": "N", "color": "color-09", "label": "Num�rico" },
                        { "value": "D", "color": "color-08", "label": "Data" },
                        { "value": "M", "color": "color-07", "label": "Memo" },
                        { "value": "L", "color": "color-04", "label": "L�gico" }
                    ]
                },
                { "property": "x6_descric", "label": "Descri��o"   , "filter": true, "width": "200" },
                { "property": "x6_conteud", "label": "Conte�do"    , "filter": true, "width": "100" },
                { "property": "x6_propri" , "label": "Propriet�rio", "filter": false, "type": "subtitle",
                "subtitles": [
                        { "value": "S", "color": "color-08", "label": "Sistema", "content": "S" },
                        { "value": "U", "color": "color-11", "label": "Usu�rio", "content": "U" }
                    ]
                }
            ]
        }
        EndContent
    EndIf

Return (EncodeUTF8(cMetadata))
// FIM do m�todo ExecGet
//==============================================================================