#include 'totvs.ch'
#include 'parmtype.ch'
#INCLUDE 'TabProtTHF.CH'

//============================================================================\
/*/{Protheus.doc}TabProtAdapter
==============================================================================
    @description
    Adapter para Entidades da API do TabProtTHF
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
CLASS TabProtAdapter FROM FWAdapterBaseV2

    DATA cTable     AS String
    DATA aFields    AS Array

    METHOD New() CONSTRUCTOR
    METHOD ExecGet()

ENDCLASS
// FIM da Defini��o da classe TabProtAdapter
//==============================================================================



//============================================================================\
/*/{Protheus.doc}TabProtAdapter:New
==============================================================================
    @description
    M�todo construtor da classe TabProtAdapter
    @author Thiago Mota <tgmspawn@gmail.com>

    @param cTable , Tabela que ser� consultada
    @param aFields, Campos que ser�o mapeados no adapter
    @param cVerb  , verbo HTTP utilizado
    @param lList  , Indica se deve retornar uma lista de registros
/*/
//============================================================================\
METHOD New(cTable, aFields, cVerb, lList) CLASS TabProtAdapter
    _Super:New( cVerb, lList )
    ::cTable    := cTable
    ::aFields   := aFields
Return (Self)
// FIM do m�todo New
//==============================================================================



//============================================================================\
/*/{Protheus.doc}TabProtAdapter:ExecGet
==============================================================================
    @description
    M�todo construtor da classe TabProtAdapter
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
METHOD ExecGet(nPage, nPageSize, cFields, cOrder, aQueryString) CLASS TabProtAdapter

    Local aAreaBkp:= FwGetArea()

    ::SetMapFields(::aFields)

    IIf( !Empty(nPage), ::SetPage(nPage), Nil )
    IIf( !Empty(nPageSize), ::SetPageSize(nPageSize), Nil )
    IIf( !Empty(aQueryString), ::SetUrlFilter( aQueryString ), Nil )
    IIf( !Empty(cFields), ::SetFields(cFields), Nil )

    ::SetQuery(GetQuery(::cTable))
    ::SetWhere( "D_E_L_E_T_ = ' '" )
    ::SetOrder( CheckOrder( ::aFields, cOrder ) )

	If ::Execute()
		::FillGetResponse()
	EndIf

    FwRestArea(aAreaBkp)

Return (Nil)
// FIM do m�todo ExecGet
//==============================================================================



//============================================================================\
/*/{Protheus.doc}GetQuery
  ==============================================================================
    @description
    Retorna a query usada no servi�o
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
Static Function GetQuery(cTable)
    Local cQuery
    BeginContent var cQuery
        SELECT #QueryFields#
        FROM %Exp:cTable%
        WHERE #QueryWhere#
    EndContent
Return ( cQuery )
// FIM da Funcao GetQuery
//==============================================================================



//=============================================================================\
/*/{Protheus.doc}CheckOrder
  ==============================================================================
   @description
   Monta a ordena��o da entidade e j� avalia os fields passados
   @author Thiago Mota <tgmspawn@gmail.com>
/*/
//=============================================================================\
Static Function CheckOrder( aDefaultFields, cOrder )

    Local cOrderRet:= ""
    Local aOrderRet:= {}
    Local aOrder, nX, cField, lDesc, aFieldQuery

    If ! Empty(cOrder)
        aOrder:= Strtokarr2( cOrder, ",", .F.)

        For nX:= 1 To Len(aOrder)
            lDesc:= Left(AllTrim(aOrder[nX]),1) == "-"
            cField:= StrTran(Upper(AllTrim(aOrder[nX])),"-","")

            If !Empty( aFieldQuery:= U_aFind(aDefaultFields, {|x| x[MAP_FIELD_JSON] == cField }) )
                AAdd(aOrderRet,aFieldQuery[MAP_FIELD_QUERY] + iif(lDesc, " DESC", ""))
            EndIf
        Next

    EndIf

    // Ordena��o padr�o pelos campos fixados
    If !Empty(aOrderRet)
        cOrderRet:= U_aJoin( aOrderRet, "," )
    Else
        cOrderRet:= U_aJoin( U_aMap( U_aFilter(aDefaultFields, {|x| x[MAP_FIELD_FIXED] }), {|y| y[MAP_FIELD_QUERY] } ), "," )
    EndIf

Return ( cOrderRet )
// FIM da Funcao CheckOrder
//=============================================================================


