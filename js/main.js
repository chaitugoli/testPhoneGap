/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'domReady': '../lib/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
        "uiRouter": "../bower_components/angular-ui-router/release/angular-ui-router",
        'flot': '../lib/flot/flot',
        'flot-time':'../lib/flot/flot.time',
        'flot-tooltip':'../lib/flot/flot-tooltip',
        'flot-zoom':'../lib/flot/flot-zoom',
        'flot-threshold':'../lib/flot/flot.threshold',
        'flot-stack':'../lib/flot/flot.stack',
        'flot-timezone':'../lib/flot/flot-timezone',
        'd3':'../bower_components/d3/d3.min',
        'morrisjs':'../lib/morrisjs/morris.min',
        'jquery':'../bower_components/jquery/dist/jquery',
        'jqueryUi':'../lib/jquery_ui/jquery-ui',
        'noUiSlider':'../lib/noUiSlider/nouislider',
        'bootstrapUI':'../lib/bootstrap/dist/js/bootstrap',
        'bootstrapTpls':'../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'underscorejs':'../bower_components/underscore/underscore',
        'datetime':'../lib/datetimepicker/js/bootstrap-datetimepicker.min',
        'timepicker':'../lib/datetimepicker/js/bootstrap-timepicker',
        'moment':'../lib/moment/moment',
        'tabStatus':'../lib/tabStatus',
        'angularSwitch':'../lib/angularSwitch/js/angular-toggle-switch'

    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter':{
            deps: ['angular']
        },
        'angularSwitch':{
            deps: ['angular','bootstrapUI']
        },
        'flot': {
            deps: [ 'd3' , 'jquery']
        },
        'morrisjs': {
            deps: [ 'd3' , 'jquery']
        },
        'bootstrapUI':{
            deps: ['jquery']
        },
        'bootstrapTpls':{
            deps: ['jquery','angular']
        },
        'flot-time':{
            deps:['flot']
        },
        'flot-zoom':{
            deps:['flot']
        },
        'flot-tooltip':{
            deps:['flot']
        },
        'flot-stack':{
            deps:['flot']
        },
        'flot-threshold':{
            deps:['flot']
        },
        'flot-timezone':{
            deps:['flot']
        },
        'datetime':{
            deps: ['jquery']
        },
        'timepicker':{
            deps: ['jquery']
        },
        noUiSlider:{
            deps:['jquery']
        },
        moment:{
            deps:['jquery']
        },
        jqueryUi:{
            deps:['jquery']
        },
        tabStatus: {
            deps:['jquery']
        }
    },
    
    deps: ['bolt_bootstrap']
});
