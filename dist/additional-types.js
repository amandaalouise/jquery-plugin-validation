/*
 *  jquery-input-validation - v1.0.0
 *  Live validation for input fields
 *  
 *
 *  Made by Amanda Louise Acosta Morais
 *  Under GNU GENERAL PUBLIC LICENSE License
 */
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