/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'uiRouter',
    'bootstrapUI',
    'bootstrapTpls',
    'underscorejs',
    'jqueryUi',
    'angularSwitch',
    './controllers/index',
    './directives/index',
    './factories/index'
], function (ng) {
    'use strict';

    return ng.module('bolt', [
        'app.factories',
        'app.controllers',
        'app.directives',
        'ui.router',
        'toggle-switch'
    ]);
});
