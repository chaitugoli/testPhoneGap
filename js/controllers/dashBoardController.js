define([
    './module'
    ], function (
    controllers) {
    'use strict';
    controllers.controller('dashBoardCtrl',
        ['$scope','$rootScope','$state','liveGraphFactory',
        function ($scope,$rootScope,$state,liveGraphFactory) {
            if(window.location.hostname.indexOf('stage') > -1){
                $rootScope.environment = 'ttdiag-stage';
            }else if(window.location.hostname.indexOf('local') > -1){
                $rootScope.environment = 'local';
            }else{
                $rootScope.environment = 'ttdiag-prod';
            }
            $rootScope.environment = 'ttdiag-prod';
            $rootScope.datacenters = _.where(vlan_config[0].environment, {name:$scope.environment})[0].datacenters;
            $scope.allCheck = true;
            $rootScope.toggleIcon = 'fa fa-pause';
            $scope.alertClass = 'panel panel-default';
            $scope.liveGraph = true;
            liveGraphFactory.initializeLiveGraph();
            liveGraphFactory.runLiveGraph();

            $scope.toggleLiveGraph = function(){
                if($rootScope.toggleIcon !== 'fa fa-spinner fa-lg fa-spin') {
                    if ($scope.liveGraph) {
                        $scope.liveGraph = false;
                        $rootScope.toggleIcon = 'fa fa-play';
                        liveGraphFactory.stopInterval();
                    } else {
                        $scope.liveGraph = true;
                        $rootScope.toggleIcon = 'fa fa-pause';
                        liveGraphFactory.initializeLiveGraph();
                        liveGraphFactory.runLiveGraph();
                    }
                }
            };
    }]);
});
