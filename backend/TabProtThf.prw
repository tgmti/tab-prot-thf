#INCLUDE 'TOTVS.CH'
#INCLUDE 'RESTFUL.CH'

#DEFINE ERROR_ALIAS_NOT_TREATED_ID     404
#DEFINE ERROR_ALIAS_NOT_TREATED_MSG    'Alias não tratado "#1"'
#DEFINE ERROR_ALIAS_NOT_INFORMED_ID    404
#DEFINE ERROR_ALIAS_NOT_INFORMED_MSG   'Alias não informado na URL'

#DEFINE SX2_FIELDS   'X2_CHAVE,X2_ARQUIVO,X2_NOME,X2_NOMESPA,X2_NOMEENG,X2_MODO,X2_MODOUN,X2_MODOEMP,X2_UNICO'
#DEFINE SX3_FIELDS   'X3_ARQUIVO,X3_ORDEM,X3_CAMPO,X3_TIPO,X3_TAMANHO,X3_DECIMAL,X3_TITULO,X3_TITSPA,X3_TITENG,X3_DESCRIC,X3_DESCSPA,X3_DESCENG,X3_PICTURE,X3_VALID,X3_RELACAO,X3_F3,X3_NIVEL,X3_TRIGGER,X3_PROPRI,X3_BROWSE,X3_VISUAL,X3_CONTEXT,X3_OBRIGAT,X3_VLDUSER,X3_CBOX,X3_CBOXSPA,X3_CBOXENG,X3_PICTVAR,X3_WHEN,X3_INIBRW,X3_GRPSXG,X3_FOLDER,X3_AGRUP'
#DEFINE SIX_FIELDS   'INDICE,ORDEM,CHAVE,DESCRICAO,DESCSPA,DESCENG,PROPRI,F3,NICKNAME,SHOWPESQ,IX_VIRTUAL,IX_VIRCUST'
#DEFINE SX6_FIELDS   'X6_FIL,X6_VAR,X6_TIPO,X6_DESCRIC,X6_DESC1,X6_DESC2,X6_CONTEUD,X6_DSCENG,X6_DSCENG1,X6_DSCENG2,X6_CONTENG,X6_DSCSPA,X6_DSCSPA1,X6_DSCSPA2,X6_CONTSPA,X6_INIT,X6_PROPRI,X6_VALID'


WSRESTFUL tabprotthf DESCRIPTION 'API para consulta das confiugurações do dicionário Protheus'
 
    WSDATA pageSize   AS INTEGER
    WSDATA page       AS INTEGER
    WSDATA search     AS STRING
    WSDATA params     AS STRING
    WSDATA fields     AS STRING
    
    WSMETHOD GET DESCRIPTION 'Retornar os dados das entidade(s)' ;
    WSSYNTAX '/tables || /tables/{id} || /fields || fields/{id} '
  
END WSRESTFUL
 
// O metodo GET nao precisa necessariamente receber parametros de querystring, por exemplo:
// WSMETHOD GET WSSERVICE 
WSMETHOD GET WSRECEIVE page, pageSize, search, params, fields WSSERVICE tabprotthf

   Local lRet:= .F.
   Local cAlias
   Local cQryFields

   // as propriedades da classe receberão os valores enviados por querystring
   // exemplo: http://localhost:8080/sample?page=1&pageSize=10
   Default ::page    := 1
   Default ::pageSize:= 20
   Default ::search  := ''
   Default ::params  := ''
   Default ::fields  := ''

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
            cQryFields:= SX2_FIELDS
         Case cAlias == 'FIELDS'
            cAlias:= 'SX3'
            cQryFields:= SX3_FIELDS
         Case cAlias == 'INDEXES'
            cAlias:= 'SIX'
            cQryFields:= SIX_FIELDS
         Case cAlias == 'PARAMS'
            cAlias:= 'SX6'
            cQryFields:= SX6_FIELDS
         OtherWise
            SetRestFault(ERROR_ALIAS_NOT_TREATED_ID, i18n(ERROR_ALIAS_NOT_TREATED_MSG, {cAlias}) )
            cAlias:= ''
      EndCase
   
      If ! Empty(cAlias)
         oResponse:= GetAliasContent(cAlias, ::fields, ::search, ::params, ::aURLParms, ::pageSize, ::page, cQryFields)

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
Static Function GetAliasContent( cAlias, cFields, cSearch, cParams, aURLParms, nPageSize, nPage, cQryFields, lForceRefresh )
   
   Local oResponse
   Local oItem
   Local aStruct
   Local nTotal:= 0
   Local nTotRet:= 0
   Local lHasNext:= .F.
   Local cTblSQLite:= 'tabProt'+cAlias
   Local cAliSQLite:= 'TB'+cAlias
   Local cAliQry:= 'TRB'+cAlias
   Local lExistSQLite

   Default lForceRefresh:= .F.
   
   If Empty(cFields)
      cFields:= cQryFields
   EndIf

   oResponse:= JSonObject():New()

   DBUseArea( .T., 'SQLITE_SYS', cTblSQLite, cAliSQLite, .T., .F. )

   lExistSQLite:= Select(cAliSQLite) <> 0 .And. (cAliSQLite)->(FCount()) > 0 

   If ! lExistSQLite .Or. lForceRefresh

      If lForceRefresh .And. lExistSQLite
         DBSqlExec(cAliQry, 'DROP TABLE '+cTblSQLite, 'SQLITE_SYS')
      EndIf

      DBCloseArea()

      DbSelectArea(cAlias)
      DbSetOrder(1)
      DbGoTop()
      aStruct:= U_aFilter( (cAlias)->(DbStruct()), {|x| x[1] $ cQryFields } )

      DBCreate( cTblSQLite, aStruct, 'SQLITE_SYS' )
      DBUseArea( .T., 'SQLITE_SYS', cTblSQLite, cAliSQLite, .F., .F. )

      If ! DBTblCopy(cAlias, cAliSQLite)
         SetRestFault(500, "Erro ao Copiar o alias para o SQLite")
         FreeObj(oResponse)
         Return Nil
      EndIf

   EndIf

   oResponse['items']:= {}

   If DBSqlExec(cAliQry, 'SELECT ' + cFields + ' FROM '+cTblSQLite, 'SQLITE_SYS')   
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

   If Select(cAliSQLite) <> 0
      (cAliSQLite)->(DbCloseArea())
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
