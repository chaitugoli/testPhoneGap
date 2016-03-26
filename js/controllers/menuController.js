define([
	'./module',
	'tabStatus',
    'angularSwitch'], function (controllers,tabStatus,angularSwitch) {
    'use strict';
    controllers.controller('menuCtrl', ['$rootScope','$scope','$state','liveGraphFactory',
		function ($rootScope,$scope,$state,liveGraphFactory) {
		$scope.stateGo = function(dc){
			if(dc !== 'dashboard'){
				var selectedDc = _.where($rootScope.datacenters,{name:dc})
				$state.go('detail_view',{data_center:selectedDc});
			}
			else {
				$state.go('dashboard');
			}
		};
		$(window).tab({
			onFocus: function () {
                if($state.current.name === 'dashboard' && $rootScope.toggleIcon !== 'fa fa-play'){
                    liveGraphFactory.initializeLiveGraph();
                    liveGraphFactory.runLiveGraph();
                }
			},
			onBlur: function () {
				liveGraphFactory.stopInterval();
                console.log('Tab got Inactive at '+new Date($rootScope.liveStartTime*1000));
			}
		});
        $scope.boltTheme = localStorage.getItem("boltTheme") === 'true';
        $scope.$watch('boltTheme', function() {
            localStorage.setItem("boltTheme", $scope.boltTheme);
            var $headLinkTag = $("head link[rel='stylesheet']");
            var $boltNavBar = $("#boltNavbar");
            if($scope.boltTheme){
                $headLinkTag[1].attributes.href.value = 'css/all_dark.css';
                $rootScope.themeColors = ["#727272", "#393939"];
                $boltNavBar.removeClass( "navbar-default").addClass("navbar-inverse");
                $rootScope.pointClickImg = "click_load_dark.gif";
            }
            else{
                $headLinkTag[1].attributes.href.value = 'css/all_light.css';
                $rootScope.themeColors = ["#fff", "#e4f4f4"];
                $boltNavBar.removeClass( "navbar-inverse").addClass("navbar-default");
                $rootScope.pointClickImg = "click_load.gif";
            }
            $rootScope.$broadcast('themeChange');
        });
    }]);
});
