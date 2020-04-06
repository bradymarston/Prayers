"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function buildPristineTouchedState(values) {
    var returnObject = {};
    for (var k in values) {
        returnObject[k] = false;
    }
    return returnObject;
}
function QuickForm(props) {
    var _a = react_1.useState(props.initialValues), values = _a[0], setValues = _a[1];
    var _b = react_1.useState(buildPristineTouchedState(props.initialValues)), touched = _b[0], setTouched = _b[1];
    var _c = react_1.useState(props.validate ? props.validate(props.initialValues) : {}), errors = _c[0], setErrors = _c[1];
    function handleChange(e) {
        var _a, _b;
        setTouched(__assign(__assign({}, touched), (_a = {}, _a[e.target.name] = true, _a)));
        var newValues = __assign(__assign({}, values), (_b = {}, _b[e.target.name] = e.target.value, _b));
        setValues(newValues);
        if (props.validate) {
            setErrors(props.validate(newValues));
        }
    }
    function checkOverallValidity() {
        for (var k in errors) {
            if (errors[k] !== undefined)
                return false;
        }
        return true;
    }
    function checkOverallTouchedState() {
        for (var k in touched) {
            if (touched[k])
                return true;
        }
        return false;
    }
    function handleBlur(e) {
        var _a;
        setTouched(__assign(__assign({}, touched), (_a = {}, _a[e.target.name] = true, _a)));
    }
    function buildInputProps(name) {
        return {
            name: name,
            onChange: handleChange,
            onBlur: handleBlur,
            value: values[name],
            error: errors[name] !== undefined && touched[name],
            helperText: errors[name] !== undefined && touched[name] ? errors[name] : ""
        };
    }
    return props.children({
        values: values,
        touched: touched,
        errors: errors,
        isValid: checkOverallValidity(),
        isTouched: checkOverallTouchedState(),
        handleChange: handleChange,
        handleBlur: handleBlur,
        textFieldProps: buildInputProps
    });
}
exports.QuickForm = QuickForm;
exports.default = QuickForm;
//# sourceMappingURL=QuickForm.js.map