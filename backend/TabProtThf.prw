#INCLUDE 'TOTVS.CH'
#INCLUDE 'RESTFUL.CH'

#DEFINE ERROR_ALIAS_NOT_TREATED_ID     404
#DEFINE ERROR_ALIAS_NOT_TREATED_MSG    'Alias não tratado "#1"'
#DEFINE ERROR_ALIAS_NOT_INFORMED_ID    404
#DEFINE ERROR_ALIAS_NOT_INFORMED_MSG   'Alias não informado na URL'

WSRESTFUL tabprotthf DESCRIPTION 'API para consulta das confiugurações do dicionário Protheus'
 
    WSDATA pageSize   AS INTEGER
    WSDATA page       AS INTEGER
    WSDATA search     AS STRING
    WSDATA params     AS STRING
    
    WSMETHOD GET DESCRIPTION 'Retornar os dados das entidade(s)' ;
    WSSYNTAX '/tables || /tables/{id} || /fields || fields/{id} '
  
END WSRESTFUL
 
// O metodo GET nao precisa necessariamente receber parametros de querystring, por exemplo:
// WSMETHOD GET WSSERVICE 
WSMETHOD GET WSRECEIVE page, pageSize, search, params WSSERVICE tabprotthf

   Local i
   Local cAlias
   Local lRet:= .F.

   // as propriedades da classe receberão os valores enviados por querystring
   // exemplo: http://localhost:8080/sample?page=1&pageSize=10
   Default ::page    := 1
   Default ::pageSize:= 20
   Default ::search  := ''
   Default ::params  := ''

   // define o tipo de retorno do método
   ::SetContentType('application/json')
   
   // verifica se recebeu parametro pela URL
   // exemplo: http://localhost:8080/sample/1
   If Len(::aURLParms) > 0
      
      // Verifica se o arquivo solicitado é valido
      cAlias:= Upper(AllTrim(::aURLParms[1]))
      Do Case
         Case cAlias == 'TABLES'
            cAlias:= 'SX2'
         Case cAlias == 'FIELDS'
            cAlias:= 'SX3'
         Case cAlias == 'INDEXES'
            cAlias:= 'SIX'
         Case cAlias == 'PARAMS'
            cAlias:= 'SX6'
         OtherWise
            SetRestFault(ERROR_ALIAS_NOT_TREATED_ID, i18n(ERROR_ALIAS_NOT_TREATED_MSG, {cAlias}) )
            cAlias:= ''
      EndCase
   
      If ! Empty(cAlias)
         oResponse:= GetAliasContent(cAlias, ::search, ::params, ::aURLParms, ::pageSize, ::page)

         If oResponse != Nil
            ::SetResponse( oResponse:TojSon() )
            lRet:= .T.
         EndIf
      EndIf

   Else
      SetRestFault(ERROR_ALIAS_NOT_INFORMED_ID, ERROR_ALIAS_NOT_INFORMED_MSG )    
   EndIf

Return (lRet)



//====================================================================================================================\
/*/{Protheus.doc}GetAliasContent
  ====================================================================================================================
   @description
   Obtém os dados do Alias selecionado no formato correto para a mensagem

   @author TSC681 Thiago Mota
   @version 1.0
   @since 03/06/2019

/*/
//===================================================================================================================\
Static Function GetAliasContent( cAlias, cSearch, cParams, aURLParms, nPageSize, nPage )
   
   Local oResponse
   Local oItem
   Local aStruct
   Local nTotal:= 0
   Local nTotRet:= 0
   Local lHasNext:= .F.

   oResponse:= JSonObject():New()

   DbSelectArea(cAlias)
   DbSetOrder(1)
   DbGoTop()
   aStruct:= (cAlias)->(DbStruct())

   oResponse['items']:= {}
   
   While (cAlias)->(!Eof())

      nTotal++

      If ( nPageSize * (nPage-1) ) < nTotal .And. ( nPageSize * nPage ) >= nTotal
         nTotRet++
         aAdd( oResponse['items'], JSonObject():New() )
         oItem:= ATail(oResponse['items'])

         aEval( aStruct, {|x,y| oItem[x[1]]:= FieldGet(y) } )

         (cAlias)->(DbSkip())
         lHasNext:= (cAlias)->(!Eof())
      Else
         (cAlias)->(DbSkip())
      EndIf
      
   EndDo

   oResponse['hasNext']:= lHasNext
   oResponse['total']:= nTotal

Return ( oResponse )
// FIM da Funcao GetAliasContent
//======================================================================================================================



