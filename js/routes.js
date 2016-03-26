
define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('dashboard');

        $stateProvider.state('bolt',{
            abstract:true,
            views: {
                'menu':{
                    templateUrl: 'views/menu.html',
                    controller:'menuCtrl'
                }
            }
        }).state('dashboard',{
            url: '/dashboard',
            parent:'bolt',
            onExit:function(liveGraphFactory){
                liveGraphFactory.stopInterval();
            },
            onEnter:function(liveGraphFactory){
            },
            views: {
                'dashboard@':{
                    templateUrl: 'views/dashboard.html?beta2',
                    controller:'dashBoardCtrl'
                },
                'pointClickView@':{
                    templateUrl: 'views/pointClickInfo.html',
                    controller:'pointClickCtrl'
                }

            }

        })
        .state('detail_view',{
            url: '/detail_view',
            parent:'bolt',
            params:{data_center:null},
            onExit:function(historicGraphFactory){
                $('.bootstrap-datetimepicker-widget').remove();
                historicGraphFactory.clearHistoricData();
            },
            onEnter:function(historicGraphFactory,$rootScope,liveGraphFactory){

            },
            views: {
                'dashboard@':{
                    templateUrl : 'views/detailView.html',
                    controller:'detailViewCtrl'
                },
                'pointClickView@':{
                    templateUrl: 'views/pointClickInfo.html',
                    controller:'pointClickCtrl'
                }
            }
        });
    })
});