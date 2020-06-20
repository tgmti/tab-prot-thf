#INCLUDE 'TOTVS.CH'
#INCLUDE 'RESTFUL.CH'
#INCLUDE 'TabProtTHF.CH'


/*/{Protheus.doc}TabProtTHF
@description
API para consulta das configurações do dicionário Protheus

@author Thiago Mota <tgmspawn@gmail.com>

@obs
Seguindo o Guia de implementação de API V2.0
http://tdn.totvs.com.br/pages/viewpage.action?pageId=484701395

Utilizando a classe FWAdapterBaseV2 conforme tutorial
https://medium.com/totvsdevelopers/criando-servi%C3%A7os-rest-avan%C3%A7ados-no-protheus-parte-2-trabalhando-com-filtros-3973b95e416f

/*/
WSRESTFUL TabProtTHF ;
    DESCRIPTION 'API para consulta das configurações do dicionário Protheus' ;
    FORMAT "application/json,text/html"

    WSDATA page       AS INTEGER OPTIONAL
    WSDATA pageSize   AS INTEGER OPTIONAL
    WSDATA fields     AS STRING OPTIONAL
    WSDATA order      AS STRING OPTIONAL
    WSDATA search     AS STRING OPTIONAL
    WSDATA aQueryString AS ARRAY OPTIONAL

    WSMETHOD GET MdTables ;
        DESCRIPTION 'Retornar os metadados das Tabelas do sistema' ;
        WSSYNTAX '/tables/metadata' ;
        PATH '/tables/metadata' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET MdFields ;
        DESCRIPTION 'Retornar os metadados das Tabelas do sistema' ;
        WSSYNTAX '/fields/metadata' ;
        PATH '/fields/metadata' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET MdIndexes ;
        DESCRIPTION 'Retornar os metadados das Tabelas do sistema' ;
        WSSYNTAX '/indexes/metadata' ;
        PATH '/indexes/metadata' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET MdParams ;
        DESCRIPTION 'Retornar os metadados das Tabelas do sistema' ;
        WSSYNTAX '/params/metadata' ;
        PATH '/params/metadata' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Tables ;
        DESCRIPTION 'Retornar os das Tabelas do sistema' ;
        WSSYNTAX '/tables' ;
        PATH '/tables' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET OneTable ;
        DESCRIPTION 'Retornar uma Tabela do sistema' ;
        WSSYNTAX '/tables/{id}' ;
        PATH '/tables/{id}' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Fields ;
        DESCRIPTION 'Retornar os campos do sistema' ;
        WSSYNTAX '/fields' ;
        PATH '/fields' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Params ;
        DESCRIPTION 'Retornar os parâmetros do sistema' ;
        WSSYNTAX '/params' ;
        PATH '/params' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Indexes ;
        DESCRIPTION 'Retornar os índices do sistema' ;
        WSSYNTAX '/indexes' ;
        PATH '/indexes' ;
        PRODUCES APPLICATION_JSON

END WSRESTFUL


/*/{Protheus.doc}TabProtTHF|GET MdTables
@description
Método GET para os metadados de tabelas
/*/
WSMETHOD GET MdTables QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetMetadata( Self, 'SX2' ) )


/*/{Protheus.doc}TabProtTHF|GET MdFields
@description
Método GET para os metadados de campos
/*/
WSMETHOD GET MdFields QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetMetadata( Self, 'SX3' ) )


/*/{Protheus.doc}TabProtTHF|GET MdIndexes
@description
Método GET para os metadados de índices
/*/
WSMETHOD GET MdIndexes QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetMetadata( Self, 'SIX' ) )


/*/{Protheus.doc}TabProtTHF|GET MdParams
@description
Método GET para os metadados de parâmetros
/*/
WSMETHOD GET MdParams QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetMetadata( Self, 'SX6' ) )


/*/{Protheus.doc}TabProtTHF|GET Tables
@description
Método GET para as entidades
/*/
WSMETHOD GET Tables QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SX2_TABLE, SX2_FIELDS, SX2_KEYS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )


/*/{Protheus.doc}TabProtTHF|GET Fields
@description
Método GET para as entidades
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
WSMETHOD GET Fields QUERYPARAM page, pageSize, fields, order, search WSREST TabProtTHF
    conout(AsString(::search))
    conout(AsString(::aQueryString))
Return ( GetResult( Self, SX3_TABLE, SX3_FIELDS, SX3_KEYS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )


/*/{Protheus.doc}TabProtTHF|GET Params
@description
Método GET para as entidades
/*/
WSMETHOD GET Params QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SX6_TABLE, SX6_FIELDS, SX6_KEYS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )


/*/{Protheus.doc}TabProtTHF|GET Indexes
@description
Método GET para as entidades
/*/
WSMETHOD GET Indexes QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SIX_TABLE, SIX_FIELDS, SIX_KEYS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )


/*/{Protheus.doc}TabProtTHF|GET OneTable
@description
Método GET para as entidades
/*/
WSMETHOD GET OneTable QUERYPARAM fields WSREST TabProtTHF
    aQueryString:= {{"CHAVE",::aURLParms[2]}}
Return ( GetResult( Self, SX2_TABLE, SX2_FIELDS, SX2_KEYS, .F.,,, ::fields,, aQueryString ) )


/*/{Protheus.doc}GetResult
@description
Executa o Adapter para a rota
/*/
Static Function GetResult( oRest, cTable, aFields, aKeys, lList, nPage, nPageSize, cFields, cOrder, aQueryString )

    Local lRet:= .F.
    Local oAdapter := TabProtAdapter():New(cTable, aFields, aKeys, 'GET', lList)

    oAdapter:ExecGet(nPage, nPageSize, cFields, cOrder, aQueryString )

    If (lRet:= oAdapter:lOk)
        oRest:SetResponse(oAdapter:getJSONResponse())
    Else
        SetRestFault(oAdapter:GetCode(),oAdapter:GetMessage())
    EndIf

Return ( lRet )


/*/{Protheus.doc}GetMetadata
@description
Retorna os metadados da tabela
/*/
Static Function GetMetadata( oRest, cTable )

    Local lRet := .T.
    Local oAdap:= TabProtMetadata():New(cTable)

    oRest:SetResponse(oAdap:GetMetadata())

Return ( lRet )
