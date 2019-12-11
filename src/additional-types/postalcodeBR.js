/*
* Valida CEPs do brasileiros:
*
* Formatos aceitos:
* 99999-999
* 99.999-999
* 99999999
*/
$.fn.inputValidation.addType( "postalcodeBR", function( cep_value ) {
	return /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test( cep_value );
}, "Informe um CEP válido." );