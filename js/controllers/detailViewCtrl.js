/**
 * Created by vgoli on 2/22/16.
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
    controllers.controller('detailViewCtrl',
    	['$scope','$rootScope','$state','$stateParams','historicGraphFactory',
    	function ($scope,$rootScope,$state,$stateParams,historicGraphFactory) {
            var startTime = parseInt((new Date().getTime()/1000).toFixed())-1800;
            var endTime = parseInt((new Date().getTime()/1000).toFixed());
            $scope.init = function(){
                $scope.connections = $stateParams.data_center[0].connections;
                $scope.dataCenter = $stateParams.data_center[0];
				$scope.initializeDateTimepicker();
                historicGraphFactory.clearHistoricData();
                historicGraphFactory.getHistoricData($stateParams.data_center[0],startTime,endTime);
			};
			$scope.initializeDateTimepicker = function(){
				$('#startTimePicker').timepicker({
                    minuteStep: 1,
                    secondStep: 1,
                    showSeconds: true,
                    showMeridian: false,
                    defaultTime: moment.unix(startTime).format('HH:mm:ss')
                });
                $('#endTimePicker').timepicker({
                    minuteStep: 1,
                    secondStep: 1,
                    showSeconds: true,
                    showMeridian: false,
                    defaultTime: moment.unix(endTime).format('HH:mm:ss')
                });
                $('.startDatePicker').datetimepicker({
                  	format : 'YYYY-MM-DD',
					defaultDate: new Date(startTime*1000)
                }).on('dp.change', function(e){
                    $('.endDatePicker').data('DateTimePicker').date(e.date);
                });
                $('.endDatePicker').datetimepicker({
                  	format : 'YYYY-MM-DD',
					defaultDate: new Date(endTime*1000)
                });
				$scope.startTime = moment.unix(startTime).format('HH:mm:ss');
				$scope.endTime = moment.unix(endTime).format('HH:mm:ss')
			};
            $scope.getHistoricGraph = function(){
				$scope.timeErr='';
				var startDate = $('#startDatePicker').val();
				var endDate = $('#endDatePicker').val();
				var startTime = $('#startTimePicker').val();
				var endTime = $('#endTimePicker').val();
				var startSec = parseInt(new Date(startDate+' '+startTime).getTime()/1000);
				var endSec = parseInt(new Date(endDate+' '+endTime).getTime()/1000);
				if(endSec - startSec > 1800){
					$scope.timeErr ='* Please Enter a time interval not more than 30 minutes';
					return;
				}else if(!startTime || !startDate ||!endDate || !endTime){
					$scope.timeErr ='* Please Enter all the values to get the data';
					return;
				}else if((endSec - startSec) < -1 ){
					$scope.timeErr ='* Please Check the start and end time entered';
					return;
				}
				for(var c in $scope.connections){
					$('#'+$scope.connections[c].graph+'-historic-chart').html('');
					$('#'+$scope.connections[c].graph+'-rangeSlider').html('');
				}
                historicGraphFactory.clearHistoricData();
                historicGraphFactory.getHistoricData($stateParams.data_center[0],startSec,endSec);
			};
			$scope.getClass = function(index,connection){
				if($scope.connections.length%2 === 1 &&
					$scope.connections.indexOf(connection) === $scope.connections.length-1){
					return 'col-lg-12'
				}
				else {
					return 'col-lg-6'
				}
			};
            $(window).resize(function(){
               $rootScope.$broadcast('windowResize');
            });
			if(!_.isEmpty($stateParams.data_center)){
				$scope.init();
			}else {
				$state.go('dashboard');
			}
    }]);
});