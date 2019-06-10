#INCLUDE 'TOTVS.CH'
#INCLUDE 'RESTFUL.CH'

#DEFINE ERROR_ENDPOINT_NOT_TREATED_ID     404
#DEFINE ERROR_ENDPOINT_NOT_TREATED_MSG    'Endpoint não tratado "#1"'
#DEFINE ERROR_ENDPOINT_NOT_INFORMED_ID    404
#DEFINE ERROR_ENDPOINT_NOT_INFORMED_MSG   'Endpoint não informado na URL'

#DEFINE fieldsAPI    'id,branch,description,content,property'
#DEFINE SX2_FIELDS   'X2_CHAVE,X2_ARQUIVO,X2_NOME,X2_NOMESPA,X2_NOMEENG,X2_MODO,X2_MODOUN,X2_MODOEMP,X2_UNICO'
#DEFINE SX3_FIELDS   'X3_ARQUIVO,X3_ORDEM,X3_CAMPO,X3_TIPO,X3_TAMANHO,X3_DECIMAL,X3_TITULO,X3_TITSPA,X3_TITENG,X3_DESCRIC,X3_DESCSPA,X3_DESCENG,X3_PICTURE,X3_VALID,X3_RELACAO,X3_F3,X3_NIVEL,X3_TRIGGER,X3_PROPRI,X3_BROWSE,X3_VISUAL,X3_CONTEXT,X3_OBRIGAT,X3_VLDUSER,X3_CBOX,X3_CBOXSPA,X3_CBOXENG,X3_PICTVAR,X3_WHEN,X3_INIBRW,X3_GRPSXG,X3_FOLDER,X3_AGRUP'
#DEFINE SIX_FIELDS   'INDICE,ORDEM,CHAVE,DESCRICAO,DESCSPA,DESCENG,PROPRI,F3,NICKNAME,SHOWPESQ,IX_VIRTUAL,IX_VIRCUST'
#DEFINE SX6_FIELDS   'X6_FIL,X6_VAR,X6_TIPO,X6_DESCRIC,X6_DESC1,X6_DESC2,X6_CONTEUD,X6_DSCENG,X6_DSCENG1,X6_DSCENG2,X6_CONTENG,X6_DSCSPA,X6_DSCSPA1,X6_DSCSPA2,X6_CONTSPA,X6_INIT,X6_PROPRI,X6_VALID'

#DEFINE ENDPOINT_CONFIG   '{ ' + ;
   ' "TABLES": { "alias": "SX2" , "fields": "' + SX2_FIELDS + '" } , ' + ;
   ' "FIELDS": { "alias": "SX3" , "fields": "' + SX3_FIELDS + '" } , ' + ;
   ' "INDEXES":{ "alias": "SIX" , "fields": "' + SIX_FIELDS + '" } , ' + ;
   ' "PARAMS": { "alias": "SX6" , "fields": "' + SX6_FIELDS + '" }   ' + ;
' } '

//====================================================================================================================\
/*/{Protheus.doc}tabprotthf
  ====================================================================================================================
   @description
   Definição do Serviço REST

   @author TSC681 Thiago Mota
   @version 1.0
   @since 03/06/2019

   @obs
   Seguindo o Guia de implementação de API V2.0
   http://tdn.totvs.com.br/pages/viewpage.action?pageId=484701395

/*/
//===================================================================================================================\
WSRESTFUL tabprotthf DESCRIPTION 'API para consulta das confiugurações do dicionário Protheus'
 
   WSDATA pageSize   AS INTEGER
   WSDATA page       AS INTEGER
   WSDATA search     AS STRING
   WSDATA params     AS STRING
   WSDATA fields     AS STRING
   WSDATA order      AS STRING
   WSDATA forceRefresh AS BOOLEAN
    
   WSMETHOD GET DESCRIPTION 'Retornar os dados das entidade(s)' ;
      WSSYNTAX '/tables || /tables/{id} || /fields || fields/{id} '
  
END WSRESTFUL
// FIM da definição do WSRESTFUL
//======================================================================================================================
 


//====================================================================================================================\
/*/{Protheus.doc}tabprotthf|GET
  ====================================================================================================================
   @description
   Método GET para as entidades

   @author TSC681 Thiago Mota
   @version 1.0
   @since 03/06/2019

/*/
//===================================================================================================================\
WSMETHOD GET WSRECEIVE page, pageSize, search, params, fields, order, forceRefresh WSSERVICE tabprotthf

   Local lRet:= .F.
   Local nPos
   Local oConfig:= FromJSon(ENDPOINT_CONFIG)
   Local cEndpoint
   Local cQryFields
   Local cFields
   Local cFilters
   Local cOrder
   Local cId

   // as propriedades da classe receberão os valores enviados por querystring
   // exemplo: http://localhost:8080/sample?page=1&pageSize=10
   Default ::page     := 1
   Default ::pageSize := 20
   Default ::search   := ''
   Default ::params   := ''
   Default ::fields   := ''
   Default ::order    := ''
   Default ::forceRefresh:= .F.

   // define o tipo de retorno do método
   ::SetContentType('application/json')
   
   // verifica se recebeu parametro pela URL
   // exemplo: http://localhost:8080/sample/1
   If Len(::aURLParms) > 0
      
      // Verifica se o endpoint solicitado é valido
      cEndpoint:= Upper(AllTrim(::aURLParms[1]))
      If ! Empty( oConfig[cEndpoint] )
         
         // Verifica se os campos passados existem na Entidade
         cFields:= CheckFields( oConfig[cEndpoint]['fields'], ::fields )

         // GET passando o ID da entidade
         If Len(::aURLParms) > 1
            cId:= Upper(AllTrim(::aURLParms[2]))
            cFilters:= MountFilters( oConfig[cEndpoint], cId )
         Else
            
            // Verifica se os campos passados no order existem, e se houver algum que não estava no fields, adiciona
            cOrder:= CheckOrder( oConfig[cEndpoint]['fields'], ::order )
            
            cFilters:= MountFilters( oConfig[cEndpoint] )
         EndIf

         // Verifica se a entidade existe no SQLite, senão, cria  
         If CheckEntity( oConfig[cEndpoint], ::forceRefresh )
            cQuery:= MountQuery( oConfig[cEndpoint]['alias'], cFields, cFilters, cOrder )

            // Executa a Query e monta o Objeto
            oResponse:= GetContent( cQuery, ::pageSize, ::page )

            If oResponse != Nil
               ::SetResponse( oResponse:TojSon() )
               lRet:= .T.
            EndIf

         EndIf

      Else
         SetRestFault(ERROR_ENDPOINT_NOT_TREATED_ID, i18n(ERROR_ENDPOINT_NOT_TREATED_MSG, {cAlias}) )
       EndIf
 
   Else
      SetRestFault(ERROR_ENDPOINT_NOT_INFORMED_ID, ERROR_ENDPOINT_NOT_INFORMED_MSG )    
   EndIf

Return (lRet)
// FIM do método GET
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}CheckFields
  ====================================================================================================================
   @description
   Verifica se os campos passados no fields existem na entidade determina o campos que serão consultados e retornados

   @author TSC681 Thiago Mota
   @version 1.0
   @since 09/06/2019

/*/
//===================================================================================================================\
Static Function CheckFields( cDefaultFields, cFields )
   
   Local cFieldsRet:= ''

   If ! Empty(cFields)
      cFieldsRet:= U_aJoin( U_aFilter( Strtokarr2( cDefaultFields, ',', .F.), {|x| x $ cFields } ), ',' )
   EndIf
   
   // Se nenhum dos campos passados corresponder, retorna o padrão do Endpoint
   If Empty(cFieldsRet)
      cFieldsRet:= cDefaultFields
   EndIf

Return ( cFieldsRet )
// FIM da Funcao CheckFields
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}CheckOrder
  ====================================================================================================================
   @description
   Monta a ordenação da entidade e já avalia os fields passados

   @author TSC681 Thiago Mota
   @version 1.0
   @since 09/06/2019

/*/
//===================================================================================================================\
Static Function CheckOrder( cDefaultFields, cFields )
Return ( CheckFields( cDefaultFields, cFields ) )
// FIM da Funcao CheckOrder
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}CheckEntity
  ====================================================================================================================
   @description
   Verifica se a entidade existe no SQLite, senão, executa a cópia

   @author TSC681 Thiago Mota
   @version 1.0
   @since 06/06/2019

/*/
//===================================================================================================================\
Static Function CheckEntity( oEndPoint, lForceRefresh )
   
   Local cAlias   := oEndPoint['alias']
   Local cStruct  := oEndPoint['fields']
   Local cAliDest := cAlias+'DEST'
   Local lRet     := .F.

   Default lForceRefresh:= .F.

   DBUseArea( .T., 'SQLITE_SYS', cAlias, cAliDest, .T., .F. )

   lRet:= Select(cAliDest) <> 0 .And. (cAliDest)->(FCount()) > 0 

   If ! lRet .Or. lForceRefresh

      If lForceRefresh .And. lRet
         If ! DBSqlExec('TRB', 'DROP TABLE '+cAlias, 'SQLITE_SYS')
            
            lRet:= .F.
            SetRestFault(500, "Erro ao excluir a tabela SQLite para recriar")

            If Select(cAliDest) <> 0
               (cAliDest)->(DbCloseArea())
            EndIf
            Return (lRet)            
         EndIf
      EndIf

      DBCloseArea()

      DbSelectArea(cAlias)
      DbSetOrder(1)
      DbGoTop()
      aStruct:= U_aFilter( (cAlias)->(DbStruct()), {|x| x[1] $ cStruct } )

      DBCreate( cAlias, aStruct, 'SQLITE_SYS' )
      DBUseArea( .T., 'SQLITE_SYS', cAlias, cAliDest, .F., .F. )

      lRet:= Select(cAliDest) <> 0 .And. (cAliDest)->(FCount()) > 0 

      If lRet
         If ! DBTblCopy(cAlias, cAliDest)
            SetRestFault(500, "Erro ao Copiar os dados do alias para o SQLite")
         EndIf
      Else
         SetRestFault(500, "Erro ao criar a tabela no SQLite")
      EndIf
      
      If Select(cAliDest) <> 0
         (cAliDest)->(DbCloseArea())
      EndIf

   EndIf

Return ( lRet )
// FIM da Funcao CheckEntity
//======================================================================================================================




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
Static Function GetAliasContent( cAlias, cFields, cSearch, cParams, aURLParms, nPageSize, nPage, cQryFields, lForceRefresh )
   
   Local oResponse
   Local oItem
   Local aStruct
   Local nTotal:= 0
   Local nTotRet:= 0
   Local lHasNext:= .F.
   Local cAlias:= 'tabProt'+cAlias
   Local cAliQry:= 'TRB'+cAlias
   
   If Empty(cFields)
      cFields:= cQryFields
   EndIf

   oResponse:= JSonObject():New()


   oResponse['items']:= {}

   If DBSqlExec(cAliQry, 'SELECT ' + cFields + ' FROM '+cAlias, 'SQLITE_SYS')   
      While (cAliQry)->(!Eof())

         nTotal++

         If ( nPageSize * (nPage-1) ) < nTotal .And. ( nPageSize * nPage ) >= nTotal
            nTotRet++
            aAdd( oResponse['items'], JSonObject():New() )
            oItem:= ATail(oResponse['items'])

            aEval( Strtokarr2( cFields, ',', .F.), {|x| oItem[lower(x)]:= GetFieldValue(x) } )

            (cAliQry)->(DbSkip())
            lHasNext:= (cAliQry)->(!Eof())
         Else
            (cAliQry)->(DbSkip())
         EndIf
         
      EndDo
   EndIf

   If Select(cAliQry) <> 0
      (cAliQry)->(DbCloseArea())
   EndIf

   oResponse['hasNext']:= lHasNext
   oResponse['total']:= nTotal

Return ( oResponse )
// FIM da Funcao GetAliasContent
//======================================================================================================================



//====================================================================================================================\
/*/{Protheus.doc}GetFieldValue
  ====================================================================================================================
   @description
   Retorna o valor para o campo

   @author TSC681 Thiago Mota
   @version 1.0
   @since 05/06/2019

/*/
//===================================================================================================================\
Static Function GetFieldValue( cFieldName )
   Local xValue:= FieldGet(FieldPos(cFieldName))

   If ValType( xValue ) == 'C'
      xValue:= AllTrim(xValue)
   ElseIf ValType( xValue ) == 'D'
      //Converte data em formato ISO
   EndIf

Return ( xValue )
// FIM da Funcao GetFieldValue
//======================================================================================================================




//====================================================================================================================\
/*/{Protheus.doc}FromJSon
  ====================================================================================================================
   @description
   Função auxiliar para instanciar um novo JSONObject

   @author TSC681 Thiago Mota
   @version 1.0
   @since 06/06/2019

/*/
//===================================================================================================================\
Static Function FromJSon(cJSON) 
   Local oJson:= JSonObject():New()
   oJson:FromJSon(cJSON)
Return(oJson) 
// FIM da Função FromJSon
//======================================================================================================================



User Function TstJSon
   BeginContent var cJson
      {  "caractere": "caractere", 
         "numero": 123, 
         "logico":true, 
         "matriz":[ 
            { "posicao":1 }, { "posicao":2 } 
         ] 
      }
   EndContent
   ObjectJSON:= FromJSon(cJson)
REturn

// U_TSTSqlite
User Function TSTSqlite
   RpcSetEnv('99','01')
   //cAlias:= "SIX"
   cFields:= Nil
   cSearch   := ''     
   cParams   := ''     
   aURLParms := {}        
   nPageSize := 10       
   nPage     := 1  
   lForceRefresh:= .T.
   cQryFields:= Nil
   
   aEval({ { 'SX2', SX2_FIELDS },{ 'SX3', SX3_FIELDS },{ 'SIX', SIX_FIELDS },{ 'SX6', SX6_FIELDS } }, {|x| ;
      cAlias:= x[1], cQryFields:= x[2], ;
      oResponse:= GetAliasContent( cAlias, cFields, cSearch, cParams, aURLParms, ;
         nPageSize, nPage, cQryFields, lForceRefresh ) , ;
      ConOut( oResponse:TojSon() ) ;
   } )

   RpcClearEnv()

Return (Nil)
