#include 'totvs.ch'
#include 'parmtype.ch'
#INCLUDE 'TabProtAdapter.CH'

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
    DATA aKeys      AS Array

    METHOD New() CONSTRUCTOR
    METHOD ExecGet()

ENDCLASS
// FIM da Definição da classe TabProtAdapter
//==============================================================================



//============================================================================\
/*/{Protheus.doc}TabProtAdapter:New
==============================================================================
    @description
    Método construtor da classe TabProtAdapter
    @author Thiago Mota <tgmspawn@gmail.com>

    @param cTable , Tabela que será consultada
    @param aFields, Campos que serão mapeados no adapter
    @param cVerb  , verbo HTTP utilizado
    @param lList  , Indica se deve retornar uma lista de registros
/*/
//============================================================================\
METHOD New(cTable, aFields, aKeys, cVerb, lList) CLASS TabProtAdapter
    _Super:New( cVerb, lList )
    ::cTable    := cTable
    ::aFields   := aFields
    ::aKeys     := aKeys
Return (Self)
// FIM do método New
//==============================================================================



//============================================================================\
/*/{Protheus.doc}TabProtAdapter:ExecGet
==============================================================================
    @description
    Método construtor da classe TabProtAdapter
    @author Thiago Mota <tgmspawn@gmail.com>
/*/
//============================================================================\
METHOD ExecGet(nPage, nPageSize, cFields, cOrder, aQueryString) CLASS TabProtAdapter

    Local aAreaBkp:= FwGetArea()
    Local cSearch:= ""
    Local aQuery

    ::SetMapFields(::aFields)

    IIf( !Empty(nPage), ::SetPage(nPage), Nil )
    IIf( !Empty(nPageSize), ::SetPageSize(nPageSize), Nil )

    If !Empty(aQueryString)
        aQuery:= QueryString(::aFields, ::aKeys, aQueryString, @cSearch)

        IIf( !Empty(aQuery), ::SetUrlFilter( aQuery ), Nil )
    EndIf

    IIf( !Empty(cFields), ::SetFields(cFields), Nil )

    ::SetQuery(GetQuery(::cTable))
    ::SetWhere( "D_E_L_E_T_ = ' '" + cSearch )
    ::SetOrder( CheckOrder( ::aFields, cOrder ) )

	If ::Execute()
		::FillGetResponse()
	EndIf

    FwRestArea(aAreaBkp)

Return (Nil)
// FIM do método ExecGet
//==============================================================================



//============================================================================\
/*/{Protheus.doc}GetQuery
  ==============================================================================
    @description
    Retorna a query usada no serviço
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
   Monta a ordenação da entidade e já avalia os fields passados
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

    // Ordenação padrão pelos campos fixados
    If !Empty(aOrderRet)
        cOrderRet:= U_aJoin( aOrderRet, "," )
    Else
        cOrderRet:= U_aJoin( U_aMap( U_aFilter(aDefaultFields, {|x| x[MAP_FIELD_FIXED] }), {|y| y[MAP_FIELD_QUERY] } ), "," )
    EndIf

Return ( cOrderRet )
// FIM da Funcao CheckOrder
//=============================================================================


Static Function QueryString(aFields, aKeys, aQueryString, cSearch)
    Local aSearch:= U_aFind(aQueryString, {|x| Upper(x[1]) == "SEARCH" })
    Local cFields:= "FILTER|" + U_aJoin(U_aMap(aFields, {|x| Upper(x[1]) }), "|")
    Local aQuery:= U_aFilter(aQueryString, {|x| Upper(x[1]) $ cFields})
    Default cSearch:= ""

    If !Empty(aSearch)
        aLike:= U_aMap(aKeys, {|x| "UPPER(" + x + ") LIKE '%" + Upper(aSearch[2]) + "%'" })
        cSearch:= "AND (" + U_aJoin(aLike, " OR ") + ")"
    EndIf

Return aQuery