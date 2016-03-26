/**
 * Created by vgoli on 3/2/16.
 */
define([
	'./module',
	], function (
		controllers) {
    'use strict';
    controllers.controller('pointClickCtrl',
    	['$scope','$rootScope','$state','liveGraphFactory','historicGraphFactory',
    	function ($scope,$rootScope,$state,liveGraphFactory,historicGraphFactory) {
            $rootScope.listSize = 100;
			$scope.slidingDiv = $('#pointClickPanel');
            $('body').unbind('keydown').on("keydown", function (e) {
				if (e.keyCode == 27){
					$scope.closeClickInfo();
				}
			});
			$scope.closeClickInfo = function(){
				if($scope.slidingDiv.css('display') !== 'none'){
					$scope.slidingDiv.toggle('slide',$rootScope.slideOptions);
				}
			};
			$('#sessionsList').on('scroll', function() {
				if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight-10) {
					$rootScope.listSize = $rootScope.listSize+50;
					$rootScope.$apply();
				}
			});
		}]);
});
