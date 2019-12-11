# jQuery plugin validation

## Usage

Invoke validation by calling the function with the selector of the form tag:
```javascript
$("#validate").inputValidation();
```

```html
<form id="validate"></form>
```

To specify which fields to validate, include the class "validate" on the input:
```html
<input id="phone" name="phone" type="text" class="form-control validate">
```

## Data Attributes
Use the data attributes below to configure input specific validation

| Attribute  | Description  |
| ------------ | ------------ |
| data-validate-error-msg-text  | Custom error message |
| data-validate-type  | Input type to validate |
| data-constraint | value of reference for max or min characters |
| data-validate-error-msg-class | CSS class for error message |

### Example usage
```html
    <input id="maxlength5" name="maxlength5" type="text" class="form-control validate" 
	data-validate-type="maxlength" 
	data-constraint="5"
	data-validate-error-msg-text="Please enter up to 5 characters.">
```


## Options
|  Option | Description | Accepted values  |
| ------------ | ------------ | ------------ |
| classes  | CSS classes to apply to error message of the input. | *(optional)* string  |
| border | CSS class of the border of the input when displaying error.  | *(optional)* string |
| borderinline | Inline style of the border |  *(optional)* string 

### Example
```javascript
$("#validate").inputValidation({
	classes: "error text-center",
	border: "border-red",
	borderinline: "border: solid 1px red"
});
```


# Default validation types and messages

|  Type | Default message  |
| ------------ | ------------ |
| email   |  Please enter a valid email address. |
| url |  Please enter a valid URL. |
| date | Please enter a valid date (Validates mdY or Ymd with "-" or "/") |
| datemdy | Please enter a valid date mm-dd-YYYY. (Accepts "-" or "/")|
| dateymd | Please enter a valid date YYYY-mm-dd. (Accepts "-" or "/") |
| number | Please enter a valid number. |
| digits |  Please enter only digits. |
| equalTo | Please enter the same value again. |
| phoneUS | Please specify a valid phone number. | 
| notempty | This field can not be empty. |
| gtzero | Please enter a number greater than zero. |
| maxlength | Please enter no more than {0} characters. |
| minlength | Please enter at least {0} characters. |
| notempty_integer | This field can not be empty or zero. |

### Rendering example

![](https://github.com/amandaalouise/jquery-plugin-validation/blob/master/demo/demofields.png?raw=true)
