# jQuery plugin validation

## Usage

Invoke validation by calling the function with the selector of the form tag:

    $("#validate").inputValidation();

```html
<form id="validate"></form>
```

To specify which fields to validate, include the class "validate" on the input:
```html
    <input id="phone" name="phone" type="text" class="form-control validate">
```

## Options
|  Option | Description | Accepted values  |
| ------------ | ------------ | ------------ |
| classes  | CSS classes to apply to error message of the input. | *(optional)* string  (e.g. "error text-center")  |
| border | CSS class of the border of the input when displaying error.  | *(optional)*string |
| borderinline | Inline style of the border |  *(optional)* string (e.g. "border: solid 1px red")|

### Example
    $("#validate").inputValidation({
        classes: string,
        border: string,
    });


## Data Attributes
Use the data attributes below to configure input specific validation

| Attribute  | Description  |
| ------------ | ------------ |
| data-validate-error-msg-text  | Custom error message |
| data-validate-type  | Input type to validate |
| data-constraint | value of reference for max or min characters |

### Example usage
```html
    <input id="maxlength5" name="maxlength5" type="text" class="form-control validate" 
	data-validate-type="maxlength" 
	data-constraint="5"
	data-validate-error-msg-text="Please enter up to 5 characters.">
```
