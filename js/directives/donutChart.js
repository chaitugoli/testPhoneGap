define(['./module',
	'morrisjs'
	], function (directives,morris) {
    'use strict';
    directives.directive('livePiechart', [function () {
         return {
		      restrict: 'AE',
		      transclude: true,
		      replace: true,
		      link: function (scope, element, attrs){
		      			
		      			Morris.Donut({
			                element: attrs.graphdiv,
			                data: [{
			                    label: "Aurora",
			                    value: Math.floor(Math.random() * 100) + 1  
			                }, {
			                    label: "New York",
			                    value: Math.floor(Math.random() * 100) + 1
			                }, {
			                    label: "Chicago",
			                    value: Math.floor(Math.random() * 100) + 1
			                }, {
			                    label: "Frankfurt",
			                    value: Math.floor(Math.random() * 100) + 1
			                }, {
			                    label: "Data Center 5",
			                    value: Math.floor(Math.random() * 100) + 1
			                }, {
			                    label: "Data Center 6",
			                    value: Math.floor(Math.random() * 100) + 1
			                }],
			                formatter:function(y,data){
			                    return y + '%' 
			                },
			                resize: true
			            });
		            }
		  };
    }]);
});
