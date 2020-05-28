#INCLUDE 'TOTVS.CH'
#INCLUDE 'RESTFUL.CH'
#INCLUDE 'TabProtTHF.CH'


//====================================================================================================================\
/*/{Protheus.doc}TabProtTHF
  ====================================================================================================================
    @description
    API para consulta das configurações do dicionário Protheus

    @author Thiago Mota <tgmspawn@gmail.com>

    @obs
    Seguindo o Guia de implementação de API V2.0
    http://tdn.totvs.com.br/pages/viewpage.action?pageId=484701395

    Utilizando a classe FWAdapterBaseV2 conforme tutorial
    https://medium.com/totvsdevelopers/criando-servi%C3%A7os-rest-avan%C3%A7ados-no-protheus-parte-2-trabalhando-com-filtros-3973b95e416f

/*/
//===================================================================================================================\
WSRESTFUL TabProtTHF ;
    DESCRIPTION 'API para consulta das configurações do dicionário Protheus' ;
    FORMAT "application/json,text/html"

    WSDATA page       AS INTEGER OPTIONAL
    WSDATA pageSize   AS INTEGER OPTIONAL
    WSDATA fields     AS STRING OPTIONAL
    WSDATA order      AS STRING OPTIONAL
    WSDATA aQueryString AS ARRAY OPTIONAL

    WSMETHOD GET Tables ;
        DESCRIPTION 'Retornar os metadados das Tabelas do sistema' ;
        WSSYNTAX '/tables || /tables/{id}' ;
        PATH '/tables' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET OneTable ;
        DESCRIPTION 'Retornar os metadados de uma Tabela do sistema' ;
        WSSYNTAX '/tables/{id}' ;
        PATH '/tables/{id}' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Fields ;
        DESCRIPTION 'Retornar os metadados dos campos do sistema' ;
        WSSYNTAX '/fields' ;
        PATH '/fields' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Params ;
        DESCRIPTION 'Retornar os parâmetros do sistema' ;
        WSSYNTAX '/params' ;
        PATH '/params' ;
        PRODUCES APPLICATION_JSON

    WSMETHOD GET Indexes ;
        DESCRIPTION 'Retornar os metadados dos índices do sistema' ;
        WSSYNTAX '/indexes' ;
        PATH '/indexes' ;
        PRODUCES APPLICATION_JSON

END WSRESTFUL
// FIM da definição do WSRESTFUL
//======================================================================================================================


//====================================================================================================================\
/*/{Protheus.doc}TabProtTHF|GET Tables
  ====================================================================================================================
   @description
   Método GET para as entidades
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
//===================================================================================================================\
WSMETHOD GET Tables QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SX2_TABLE, SX2_FIELDS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )
// FIM do método GET Tables
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}TabProtTHF|GET Fields
  ====================================================================================================================
   @description
   Método GET para as entidades
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
//===================================================================================================================\
WSMETHOD GET Fields QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SX3_TABLE, SX3_FIELDS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )
// FIM do método GET
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}TabProtTHF|GET Params
  ====================================================================================================================
   @description
   Método GET para as entidades
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
//===================================================================================================================\
WSMETHOD GET Params QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SX6_TABLE, SX6_FIELDS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )
// FIM do método GET
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}TabProtTHF|GET Indexes
  ====================================================================================================================
   @description
   Método GET para as entidades
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
//===================================================================================================================\
WSMETHOD GET Indexes QUERYPARAM page, pageSize, fields, order WSREST TabProtTHF
Return ( GetResult( Self, SIX_TABLE, SIX_FIELDS, .T.,::page,::pageSize,::fields,::order, ::aQueryString ) )
// FIM do método GET
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}TabProtTHF|GET OneTable
  ====================================================================================================================
   @description
   Método GET para as entidades
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
//===================================================================================================================\
WSMETHOD GET OneTable QUERYPARAM fields WSREST TabProtTHF
    aQueryString:= {{"CHAVE",::aURLParms[2]}}
Return ( GetResult( Self, SX2_TABLE, SX2_FIELDS, .F.,,, ::fields,, aQueryString ) )
// FIM do método GET
//======================================================================================================================



//============================================================================\
/*/{Protheus.doc}GetResult
  ==============================================================================
    @description
    Executa o Adapter para a rota
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
Static Function GetResult( oRest, cTable, aFields, lList, nPage, nPageSize, cFields, cOrder, aQueryString )

    Local lRet:= .F.
    Local oAdapter := TabProtAdapter():New(cTable, aFields, 'GET', lList)

    oAdapter:ExecGet(nPage, nPageSize, cFields, cOrder, aQueryString )

    If (lRet:= oAdapter:lOk)
        oRest:SetResponse(oAdapter:getJSONResponse())
    Else
        SetRestFault(oAdapter:GetCode(),oAdapter:GetMessage())
    EndIf

Return ( lRet )
// FIM da Funcao GetResult
//==============================================================================



