#include "totvs.ch"
#include "parmtype.ch"
#INCLUDE "TabProtTHF.CH"

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

    BeginContent var cMetadata
    {   "version": 11,
        "title": "Tabelas",
        "actions": [],
        "keepFilters": true,
        "fields": [
            { "property": "x2_chave"  , "label": "Tabela"     , "filter": true , "width": 10 },
            { "property": "x2_nome"   , "label": "Descri��o"  , "filter": true , "width": 40 },
            { "property": "x2_modo"   , "label": "Filial"     , "filter": false, "width": 20, "type": "subtitle",
                "subtitles": [
                    { "value": "E", "color": "color-08", "label": "Exclusivo", "content": "E" },
                    { "value": "C", "color": "color-11", "label": "Compartilhado", "content": "C" }
                ]
            },
            { "property": "x2_modoun" , "label": "Unidade"    , "filter": false, "width": 20, "type": "subtitle",
                "subtitles": [
                    { "value": "E", "color": "color-08", "label": "Exclusivo", "content": "E" },
                    { "value": "C", "color": "color-11", "label": "Compartilhado", "content": "C" }
                ]
            },
            { "property": "x2_modoemp", "label": "Empresa"    , "filter": false, "width": 20, "type": "subtitle",
                "subtitles": [
                    { "value": "E", "color": "color-08", "label": "Exclusivo", "content": "E" },
                    { "value": "C", "color": "color-11", "label": "Compartilhado", "content": "C" }
                ]
            },
            { "property": "x2_unico"  , "label": "Chave �nica", "filter": false, "width": 40 }
        ]
    }
    EndContent

Return (EncodeUTF8(cMetadata))
// FIM do m�todo ExecGet
//==============================================================================