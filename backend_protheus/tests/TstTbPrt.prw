#INCLUDE 'PROTHEUS.CH'


//============================================================================\
/*/{Protheus.doc}TstTbPrt
  ==============================================================================
    @description
    Testes para o backend do TabProtTHF

    @author Thiago Mota <thiago.mota@agrosandri.com.br>
    @version 1.0
    @since 24/05/2020

/*/
//============================================================================\
Function U_TstTbPrt()

    Conout( "=======================" )
    Conout( "TstTbPrt:" )

    // oAdapter := TabProtTableAdapter():New('GET')
    // Conout( AsString( ClassMethArr(oAdapter, .T.) ) )

    RpcSetEnv("30","0101001")

    ExecTst()

    RpcClearEnv()

    Conout( "=======================" )

Return ( Nil )
// FIM da Funcao TstTbPrt
//==============================================================================


// TabProtTHF.CH
#DEFINE SX2_TABLE  "DADOS_ADV_DEV_120127_DB.dbo.SX2300"
#DEFINE SX6_TABLE  "DADOS_ADV_DEV_120127_DB.dbo.SX6300"

                // {cFieldJSON,cFieldQuery,lJSONField,lFixed,aStruct}
#DEFINE SX2_FIELDS { ;
    { "X2_CHAVE"  , "X2_CHAVE"  , .T., .T., { "X2_CHAVE"  , "C", 003, 00 } } , ;
    { "X2_ARQUIVO", "X2_ARQUIVO", .T., .F., { "X2_ARQUIVO", "C", 006, 00 } } , ;
    { "X2_NOME"   , "X2_NOME"   , .T., .F., { "X2_NOME"   , "C", 030, 00 } } , ;
    { "X2_NOMESPA", "X2_NOMESPA", .T., .F., { "X2_NOMESPA", "C", 030, 00 } } , ;
    { "X2_NOMEENG", "X2_NOMEENG", .T., .F., { "X2_NOMEENG", "C", 030, 00 } } , ;
    { "X2_MODO"   , "X2_MODO"   , .T., .F., { "X2_MODO"   , "C", 001, 00 } } , ;
    { "X2_MODOUN" , "X2_MODOUN" , .T., .F., { "X2_MODOUN" , "C", 001, 00 } } , ;
    { "X2_MODOEMP", "X2_MODOEMP", .T., .F., { "X2_MODOEMP", "C", 001, 00 } } , ;
    { "X2_UNICO"  , "X2_UNICO"  , .T., .F., { "X2_UNICO"  , "C", 250, 00 } } ;
}


//============================================================================\
/*/{Protheus.doc}ExecTst
  ==============================================================================
    @description
    Execução do teste

    @author Thiago Mota <thiago.mota@agrosandri.com.br>
    @version 1.0
    @since 24/05/2020

/*/
//============================================================================\
Static Function ExecTst(  )

  Local oAdapter
  Local page:= 3
  Local pageSize:= 3
  Local fields:= 'x2_chave,x2_nome'
  Local order:= 'x2_nome'
  Local aQueryString:= {} //TODO: Testar os filtros complexos também

  oAdapter := TabProtAdapter():New(SX2_TABLE, SX2_FIELDS, 'GET', .T.)
  oAdapter:ExecGet(page, pageSize, fields, order)

  If (lRet:= oAdapter:lOk)
      Conout("SUCCESS")
      Conout(oAdapter:getJSONResponse())
  Else
      Conout("ERROR")
      Conout(ValType(oAdapter:GetCode()))
      Conout(oAdapter:GetCode())
      Conout(oAdapter:GetMessage())
  EndIf

  Conout( "GetOne:" )
  aQueryString:= {{"x2_chave","SC5"}}
  oAdapter := TabProtAdapter():New(SX2_TABLE, SX2_FIELDS, 'GET', .F.)
  oAdapter:ExecGet(, , , , aQueryString)

  If (lRet:= oAdapter:lOk)
      Conout("SUCCESS")
      Conout(oAdapter:getJSONResponse())
  Else
      Conout("ERROR")
      Conout(ValType(oAdapter:GetCode()))
      Conout(oAdapter:GetCode())
      Conout(oAdapter:GetMessage())
  EndIf


/*     Local oTableSvc:= TabProtTableService():New()
    Local page     := 1
    Local pageSize := 20
    Local filter   := ''
    Local fields   := ''
    Local order    := ''
    Local oResp    := oTableSvc:FindAll(page, pageSize, filter, fields, order)

    Conout( oResp:ToJSon() )
 */
Return ( Nil )
// FIM da Funcao ExecTst
//==============================================================================



