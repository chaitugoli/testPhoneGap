/**
 * Created by vgoli on 3/22/16.
 */

define([
	'./module',
	'datetime',
	'timepicker',
	'moment',
	'jqueryUi'
	], function (
		controllers,
		datetime,
		timepicker,
		moment,
		jqueryUi) {
    'use strict';
    controllers.controller('customDashboardCtrl',
    	['$scope','$rootScope','$state','$stateParams','historicGraphFactory',
    	function ($scope,$rootScope,$state,$stateParams,historicGraphFactory) {
            $scope.graphSettings = $('#graphSettings');
            $scope.graphWidget = [];
            var GraphWidget = function(type){
                this.type = type;
                this.id = (Math.random()*100).toFixed();
                this.dc = '';
                this.name = '';
                this.series = [
                    {id:'1', vlanId:[[]], name:''}
                ];
            };
            $scope.graphWidget.push(new GraphWidget('lineGraph'));
            var animatedMenu = function(){
                var menu = document.getElementById( 'bt-menu' ),
                trigger = menu.querySelector( 'a.bt-menu-trigger' ),
                eventtype = 'click',
                resetMenu = function() {
                    classie.remove( menu, 'bt-menu-open' );
                    classie.add( menu, 'bt-menu-close' );
                };
                this.closeMenu = function() {
                    resetMenu();
                };
                var overlay = document.createElement('div');
                overlay.className = 'bt-overlay';
                menu.appendChild( overlay );
                trigger.addEventListener( eventtype, function( ev ) {
                    ev.stopPropagation();
                    ev.preventDefault();

                    if( classie.has( menu, 'bt-menu-open' ) ) {
                        resetMenu();
                    }
                    else {
                        classie.remove( menu, 'bt-menu-close' );
                        classie.add( menu, 'bt-menu-open' );
                    }
                });
                return this;
            };
            $scope.$on('$viewContentLoaded', function(){
                $scope.menu = new animatedMenu();
            });
            $scope.openPanel = function(){
                $scope.graphSettings.toggle('slide',{direction:'down'});
                $scope.menu.closeMenu();
            };
            $scope.closeSettings = function(){
                $scope.graphSettings.toggle('slide',{direction:'down'});
            };
            $scope.addVlanId = function(e){
                var seriesId = e.target.dataset.series;
                var series = _.find($scope.graphWidget[0].series, function(series){
                    if(series.id === seriesId) {
                        return series;
                    }
                });
                series.vlanId.push([]);
            };
            $scope.addSeries = function(){
                $scope.graphWidget[0].series.push({
                    id:(Math.random()*100).toFixed(),
                    vlanId:[[]],
                    name:''
                });
            };
            $('#customDashboard').unbind("keydown").on("keydown", function (e) {
				if (e.keyCode == 27){
					$scope.menu.closeMenu();
                    if(!$scope.graphSettings.is(':hidden')){
                        $scope.closeSettings();
                    }
				}
			});
            $scope.createGraphWidget = function(){
                console.log($scope.graphWidget);
            }

    }]);
});
