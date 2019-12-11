/*
 *  jquery-input-validation - v1.0.0
 *  Live validation for input fields
 *  
 *
 *  Made by Amanda Louise Acosta Morais
 *  Under GNU GENERAL PUBLIC LICENSE License
 */
/* Semicolon in case another is left open */
;(function ($, window, document, undefined) {
	"use strict";

	/**
	 * this jquery plugin name
	 * @type {string}
	 */
	var pluginName = "inputValidation";

	/**
	 * makes the plugin available trough jquery
	 * @param {object} [settings]
	 * @returns {object|Plugin}
	 */
	$.fn[pluginName] = function (settings) {
		return new Plugin(this, settings);
	};

	/**
	 * plugin class constructor, may usually not be changed
	 * @constructor
	 * @access private
	 * @param {object} elements
	 * @param {object} settings
	 * @returns {object|Plugin}
	 */
	function Plugin(elements, settings) {
		// store plugin name
		this._name = pluginName;

		// store all selected items into plugin class
		this._items = elements;

		// overwrite and/or extend configuration with custom user settings
		if (settings) {
			$.extend(this._configuration, settings);
		}

		// time to do whatever our plugin does!
		this._initialize();

		// by default the plugin is chainable, but can even return itself
		return this._configuration.chainable ? elements : this;
	}

	$.extend($.fn[pluginName], {
		addType: function (name, method, message) {

			var plugin = new Plugin();

			plugin._methods[name] = method;
			plugin._messages[name] = message !== undefined ? message : plugin._messages[name];

		}
	});

	// extend own functions here
	$.extend(Plugin.prototype, {

		//Validation methods
		_methods: {
			email: function (value) {
				return /^[a-zA-Z0-9.!#$%&"*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
			},

			url: function (value) {
				return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
			},

			date: function (value) {
				return this.datemdy(value) || this.dateymd(value);
			},

			dateymd: function (value) {
				return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
			},

			datemdy: function (value) {
				return /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(value);
			},

			number: function (value) {
				return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
			},

			digits: function (value) {
				return /^\d+$/.test(value);
			},

			notempty: function (value) {
				return /^(?!\s*$).+/.test(value);
			},

			notempty_integer: function (value) {
				return this.notempty(value) || this.gtzero(value);
			},

			gtzero: function (value) {
				return /^[1-9]\d*$/.test(value);
			},

			minlength: function (value, param) {
				var length = value.length;
				return length >= param;
			},

			maxlength: function (value, param) {
				var length = value.length;
				return length <= param;
			},

			phoneUS: function (value) {
				value = value.replace(/\s+/g, "");
				return value.length > 9 && value.match(/^\(?\d{3}\)?[-\.]? *\d{3}[-\.]? *[-\.]?\d{4}$/);
			},
		},

		//Default validation messages
		_messages: {
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date",
			datemdy: "Please enter a valid date mm-dd-YYYY",
			dateymd: "Please enter a valid date YYYY-mm-dd",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			equalTo: "Please enter the same value again.",
			phoneUS: "Please specify a valid phone number",
			notempty: "This field can not be empty",
			gtzero: "Please enter a number greater than zero",
			maxlength: "Please enter no more than {0} characters.",
			minlength: "Please enter at least {0} characters.",
			notempty_integer: "This field can not be empty or zero"
		},

		/**
		 * the plugin name
		 * @type {string}
		 */
		_name: null,

		/**
		 * all given items by jquery selector
		 * @access private
		 * @type {object}
		 */
		_items: {},

		/**
		 * settings and configuration data
		 * @access private
		 * @type {object}
		 */
		_configuration: {
			chainable: true
			// append all plugin related configurations here
		},

		/**
		 * initialize function, will be called once on every plugin instance
		 * @access private
		 * @type {function}
		 * @returns void
		 */
		_initialize: function () {
			/**
			 * the plugin instance itself, use it to prevent 'this' mismatch
			 * @type {Plugin}
			 */
			var plugin = this;

			$(plugin._items).each(function () {

				$(this).on("submit", function () {
					$(this).find(":input.validate").each(function () {
						plugin._check($(this));
					});
					plugin._formValidation($(this));
				});

				$(this).find(":input.validate").on("keyup", function () {
					plugin._check($(this));
				});

				$(this).find(":input.validate").on("focusout", function () {
					plugin._check($(this));
				});
			});
		},

		/**
		 * Check if value matches the regex of the type
		 * @access private
		 * @type {function}
		 * @returns void
		 */
		_check: function (input) {

			/**
			 * the plugin instance itself, use it to prevent 'this' mismatch
			 * @type {Plugin}
			 */
			var plugin = this;

			var type = input.data("validate-type");
			var value = input.val();
			var constraint = input.data("constraint");
			var inlineborder = "";
			var border = "input-error";

			if (plugin.settings !== undefined) {
				inlineborder = plugin.settings.borderinline ? plugin.settings.borderinline : "";
				border = plugin.settings.border ? plugin.settings.border : "input-error";
			}

			//Verifies if it has one or more validation types
			if (Array.isArray(type)) {
				for (var i = 0; i < type.length; i++) {
					subCheck(type[i], value, constraint);
				}
			} else {
				subCheck(type, value, constraint);
			}

			function subCheck(type, value, constraint) {

				if (!plugin._methods[type](value, constraint)) {

					var errorMsg = input.data("validate-error-msg-text") !== undefined ? input.data("validate-error-msg-text") : "";
					if (input.next("#error_validate").length <= 0) {
						$(plugin._defaultMessage(errorMsg, type, constraint, input)).insertAfter(input);
					}

					if (border === "input-error" && inlineborder !== "") {
						input.css("border", inlineborder);
					}

					if (border !== "input-error") {
						input.addClass(border);
					}

					if (border === "input-error" && inlineborder === "") {
						input.addClass("input-error");
					}

				} else {
					input.next("#error_validate").remove();

					if (border === "input-error" && inlineborder !== "") {
						input.css("border", "");
					}

					if (border !== "input-error") {
						input.removeClass(border);
					}

					if (border === "input-error" && inlineborder === "") {
						input.removeClass("input-error");
					}
				}
			}
		},

		/**
		 * initialize function, will be called once on every plugin instance
		 * @access private
		 * @type {function}
		 * @returns void
		 */
		_formValidation: function (input) {

			var errorInputs = [];

			input.find(".input-error").each(function () {
				errorInputs.push($(this).attr("name"));
			});

			//Avoid form submission if errors have been found
			if (errorInputs.length > 0) {
				event.preventDefault();
			}
		},

		/**
		 * Displays default message or custom message if provided
		 * @access private
		 * @type {function}
		 * @returns string
		 */
		_defaultMessage: function (message, type, param, input) {
			/**
			 * the plugin instance itself, use it to prevent 'this' mismatch
			 * @type {Plugin}
			 */
			var plugin = this;

			var classerror = input.data("validate-error-msg-class") !== undefined ? input.data("validate-error-msg-class") : "text-danger";

			//Check if message was specified
			if (message === "") {
				//Get default message and replace the constraints if exists
				var retrieved = plugin._messages[type];
				message = retrieved.replace("{0}", param);
			}

			//Returns validation error message
			return "<div id='error_validate'>" +
				"<small class='form-text " + classerror + "'>" +
				message +
				"</small></div>";
		},

		/**
		 * destroy this plugin instance
		 * @access public
		 * @type {function}
		 * @returns void
		 */
		destroy: function () {
			this._items = {};
		}
	});
})(jQuery, window, document);