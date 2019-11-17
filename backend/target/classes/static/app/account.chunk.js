(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["account"],{

/***/ "./src/main/webapp/app/modules/account/index.tsx":
/*!*******************************************************!*\
  !*** ./src/main/webapp/app/modules/account/index.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _settings_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings/settings */ "./src/main/webapp/app/modules/account/settings/settings.tsx");
/* harmony import */ var _password_password__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./password/password */ "./src/main/webapp/app/modules/account/password/password.tsx");




const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { path: `${match.url}/settings`, component: _settings_settings__WEBPACK_IMPORTED_MODULE_2__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { path: `${match.url}/password`, component: _password_password__WEBPACK_IMPORTED_MODULE_3__["default"] })));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password/password.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password/password.tsx ***!
  \*******************************************************************/
/*! exports provided: PasswordPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordPage", function() { return PasswordPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/shared/layout/password/password-strength-bar */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx");
/* harmony import */ var _password_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./password.reducer */ "./src/main/webapp/app/modules/account/password/password.reducer.ts");







const PasswordPage = (props) => {
    const [password, setPassword] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        props.reset();
        props.getSession();
        return () => props.reset();
    }, []);
    const handleValidSubmit = (event, values) => {
        props.savePassword(values.currentPassword, values.newPassword);
    };
    const updatePassword = event => setPassword(event.target.value);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "password-title" },
                    "Password for ",
                    props.account.login),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvForm"], { id: "password-form", onValidSubmit: handleValidSubmit },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "currentPassword", label: "Current password", placeholder: 'Current password', type: "password", validate: {
                            required: { value: true, errorMessage: 'Your password is required.' }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "newPassword", label: "New password", placeholder: 'New password', type: "password", validate: {
                            required: { value: true, errorMessage: 'Your password is required.' },
                            minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
                            maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
                        }, onChange: updatePassword }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_5__["default"], { password: password }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "confirmPassword", label: "New password confirmation", placeholder: "Confirm the new password", type: "password", validate: {
                            required: {
                                value: true,
                                errorMessage: 'Your confirmation password is required.'
                            },
                            minLength: {
                                value: 4,
                                errorMessage: 'Your confirmation password is required to be at least 4 characters.'
                            },
                            maxLength: {
                                value: 50,
                                errorMessage: 'Your confirmation password cannot be longer than 50 characters.'
                            },
                            match: {
                                value: 'newPassword',
                                errorMessage: 'The password and its confirmation do not match!'
                            }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "success", type: "submit" }, "Save"))))));
};
const mapStateToProps = ({ authentication }) => ({
    account: authentication.account,
    isAuthenticated: authentication.isAuthenticated
});
const mapDispatchToProps = { getSession: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__["getSession"], savePassword: _password_reducer__WEBPACK_IMPORTED_MODULE_6__["savePassword"], reset: _password_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PasswordPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password/password.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password/password.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/settings/settings.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/settings/settings.tsx ***!
  \*******************************************************************/
/*! exports provided: SettingsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return SettingsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _settings_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings.reducer */ "./src/main/webapp/app/modules/account/settings/settings.reducer.ts");






const SettingsPage = (props) => {
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        props.getSession();
        return () => {
            props.reset();
        };
    }, []);
    const handleValidSubmit = (event, values) => {
        const account = Object.assign({}, props.account, values);
        props.saveAccountSettings(account);
        event.persist();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], { className: "justify-content-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "settings-title" },
                    "User settings for ",
                    props.account.login),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvForm"], { id: "settings-form", onValidSubmit: handleValidSubmit },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvField"], { className: "form-control", name: "firstName", label: "First Name", id: "firstName", placeholder: "Your first name", validate: {
                            required: { value: true, errorMessage: 'Your first name is required.' },
                            minLength: { value: 1, errorMessage: 'Your first name is required to be at least 1 character' },
                            maxLength: { value: 50, errorMessage: 'Your first name cannot be longer than 50 characters' }
                        }, value: props.account.firstName }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvField"], { className: "form-control", name: "lastName", label: "Last Name", id: "lastName", placeholder: "Your last name", validate: {
                            required: { value: true, errorMessage: 'Your last name is required.' },
                            minLength: { value: 1, errorMessage: 'Your last name is required to be at least 1 character' },
                            maxLength: { value: 50, errorMessage: 'Your last name cannot be longer than 50 characters' }
                        }, value: props.account.lastName }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvField"], { name: "email", label: "Email", placeholder: 'Your email', type: "email", validate: {
                            required: { value: true, errorMessage: 'Your email is required.' },
                            minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                            maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
                        }, value: props.account.email }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], { color: "primary", type: "submit" }, "Save"))))));
};
const mapStateToProps = ({ authentication }) => ({
    account: authentication.account,
    isAuthenticated: authentication.isAuthenticated
});
const mapDispatchToProps = { getSession: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_4__["getSession"], saveAccountSettings: _settings_reducer__WEBPACK_IMPORTED_MODULE_5__["saveAccountSettings"], reset: _settings_reducer__WEBPACK_IMPORTED_MODULE_5__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SettingsPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/settings/settings.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/settings/settings.tsx"); } })(); 

/***/ })

}]);
//# sourceMappingURL=account.chunk.js.map