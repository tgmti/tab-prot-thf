#include 'protheus.ch'
#include 'testsuite.ch'

#DEFINE API_URL 'http://localhost:8084/rest/tabprotthf/'
//U_TestTabP
TestSuite TestTabProtThf Description 'Testes da API TabProtTHF' Verbose
    Enable Environment '99' '01'
    Feature GETCollection Description 'Busca todas as coleções (1) página'
    Feature GETID Description 'Verifica o funcionamento da Busca de ID'
    Feature GETPage Description 'Verifica o funcionamento da paginação'
    Feature GETFields Description 'Verifica se o parâmetro filds está funcionando'
    Feature GETOrder Description 'Verifica se a instrução de ordenação está funcionando'
    Feature GETSearch Description 'Testa a opção Search'
    Feature GETFilters Description 'Testa a opção Filters'
EndTestSuite

Feature GETCollection TestSuite TestTabProtThf
    
    Local oTables:= GetRest('tables')
    Local oFields:= GetRest('fields')
    Local oIndexes:= GetRest('indexes')
    Local oParams:= GetRest('params')
    
    ::Expect( ValType( oTables ) ):ToBe( 'J' )
    ::Expect( oTables['hasNext'] ):ToBe( .T. )
    ::Expect( oTables['items'][1]['x2_chave'] ):ToBe( 'A00' )
    
    ::Expect( ValType( oFields ) ):ToBe( 'J' )
    ::Expect( oFields['hasNext'] ):ToBe( .T. )
    ::Expect( oFields['items'][1]['x3_campo'] ):ToBe( 'A00_FILIAL' )
    
    ::Expect( ValType( oIndexes ) ):ToBe( 'J' )
    ::Expect( oIndexes['hasNext'] ):ToBe( .T. )
    ::Expect( oIndexes['items'][1]['indice'] ):ToBe( 'A00' )
    
    ::Expect( ValType( oParams ) ):ToBe( 'J' )
    ::Expect( oParams['hasNext'] ):ToBe( .T. )
    ::Expect( oParams['items'][1]['x6_var'] ):ToBe( 'FS_GCTCOT' )

    //Conout( oRestResult:ToJSon() )// visualizar retorno
    
    Return

Feature GETID TestSuite TestTabProtThf

    Local oTables:= GetRest('tables/SC5')
    Local oFields:= GetRest('fields/C5_NUM')
    Local oIndexes:= GetRest('indexes/SC51')
    Local oParams:= GetRest('params/MV_ESPECIE') 
    
    ::Expect( oTables['x2_chave'] ):ToBe( 'SC5' )
    ::Expect( oFields['x3_campo'] ):ToBe( 'C5_NUM' )
    ::Expect( oIndexes['indice'] ):ToBe( 'SC5' )
    ::Expect( oParams['x6_var'] ):ToBe( 'MV_ESPECIE' )
    
    Return

Feature GETPage TestSuite TestTabProtThf
    ::Expect( 1 ):ToBe( 1 )
    Return

Feature GETFields TestSuite TestTabProtThf
    ::Expect( 1 ):ToBe( 1 )
    Return

Feature GETOrder TestSuite TestTabProtThf
    ::Expect( 1 ):ToBe( 1 )
    Return

Feature GETSearch TestSuite TestTabProtThf
    ::Expect( 1 ):ToBe( 1 )
    Return

Feature GETFilters TestSuite TestTabProtThf
    ::Expect( 1 ):ToBe( 1 )
    Return

CompileTestSuite TestTabProtThf


Static Function GetRest( cPath, cQueryString )

    Local oRestClient:= FWRest():New(API_URL)
    Local oResult
    //TODO: Avaliar se tem como passar a queryString de outra forma
    oRestClient:setPath(cPath + iif(! Empty(cQueryString), '?' + cQueryString, ''))

    If oRestClient:Get()
        oResult:= StaticCall( TabProtTHF, FromJSon, oRestClient:GetResult() )
    Else
        UserException( oRestClient:GetLastError() )
    Endif

Return oResult

/* 
Feature Gravacao TestSuite TestTabProtThf
    Local cAliasQry := GetNextAlias()
    BeginSql Alias cAliasQry
        Column QUANTIDADE As Numeric(14, 2)
        SELECT COUNT(*) AS QUANTIDADE FROM %table:CTT%
    EndSql
    ::nRegistros := ( cAliasQry )->QUANTIDADE
    ( cAliasQry )->( dbCloseArea() )
    ::Expect( ::nRegistros ):ToBe( 2 ) // Comeca com 2 registros
    ::Expect( 10 ):ToBe( 10 )
    ::Expect( 20 ):ToBe( 20 )
    ::Expect( 4040 ):ToBe( 4040 )
    ::Expect( { 'a', 'b', 'c' } ):ToBe( { 'a', 'b', 'c' } )
    ::Expect( { 'a', 'b', { 1, 2, { } } } ):Not():ToBe( { 'a', 'b', 'c' } )
    ::Expect( { || } ):ToBe( { || } )
    ::Expect( Self ):ToBe( Self )
    ::Expect( { || } ):Not():ToBe( { || a + b } )

    dbSelectArea( 'CTT' )
    RecLock( 'CTT', .T. )
    CTT->CTT_FILIAL := xFilial( 'CTT' )
    CTT->CTT_CUSTO  := 'POMBAL'
    CTT->CTT_DESC01 := 'ONDE OS POMBOS HABITAM'
    MsUnlock()
    BeginSql Alias cAliasQry
        Column QUANTIDADE As Numeric(14, 2)
        SELECT COUNT(*) AS QUANTIDADE FROM %table:CTT%
    EndSql
    ::nRegistros := ( cAliasQry )->QUANTIDADE
    ( cAliasQry )->( dbCloseArea() )
    ::Expect( ::nRegistros ):ToBe( 3 ) // Termina com 3 registros
    Return
 */
