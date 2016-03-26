/**
 * Created by vgoli on 3/22/16.
 */
/**
 * Created by vgoli on 2/22/16.
 */
define(['./module','moment'], function (factories,moment) {
    'use strict';
    factories.factory('customDashboardFactory', ['$rootScope','$state','$interval', '$http','$timeout', function ($rootScope,$state,$interval,$http,$timeout) {
		var historicTrafficData = [];
		$rootScope.pageWidth = window.innerWidth/2;
	    var customDashboardFactory = {
			getHistoricData: function(datacenter,start_time,end_time){
					$rootScope.counterHist = 0;
					$rootScope.seriesLength = datacenter.vlan_id.length;
					$rootScope.datacenter = datacenter;
					for(var v in datacenter.vlan_id){
						this.getIngressData(datacenter.url,
											datacenter.aggregation_name,
											datacenter.vlan_id[v].params_id,
											start_time,
											end_time ,
											datacenter.vlan_id[v].label,
											datacenter.vlan_id[v].graph);
					}
			},
			clearHistoricData: function(){
				historicTrafficData = [];
				$('#graphLoader').show();
			},
			drawHistoricGraph: function(start_time,end_time){
				for(var c in $rootScope.datacenter.connections){
					$rootScope.$broadcast('historicBandwidth'+$rootScope.datacenter.connections[c].id, {
						data:{bandwidth:historicTrafficData},
						graph:$rootScope.datacenter.connections[c].graph,
						start_time:start_time,
						end_time:end_time
					});
				}
			},
			getIngressData: function(url,agg_name,vlanId,start_time,end_time,label,graph){
				var dc = '';
				if($rootScope.environment === 'local'){
					dc = 'local';
				}else {
					dc = agg_name;
				}
				$http({
					method:"get",
					url:url+'aggregation/bandwidth?datacenter='+dc,
					params: {
						ids:vlanId,
						start_time:start_time,
						length:(end_time - start_time)
					}
				}).then(_.bind(function(data) {
					$rootScope.counterHist++;
					var ingressData = data.data.results;
					var request_id = data.data.id;
					for(var i in ingressData){
						var d = {'label':label,
								'id':request_id,
								'graph':graph,
								data:[parseInt(ingressData[i].ts) * 1000,parseInt(ingressData[i].bw)]};
						historicTrafficData.push(d);
					}
					if($rootScope.counterHist === $rootScope.seriesLength){
						$rootScope.counterHist = 0;
						this.drawHistoricGraph(start_time,end_time);
					}
				},this));
			},
			bitConvertor: function(bits){
				if(bits == 0) return 0;
				var k = 1000;
				var sizes = ['bits', 'Kbits', 'Mbits', 'Gbits', 'Tbits'];
				var i = Math.floor(Math.log(bits) / Math.log(k));
				return parseFloat((bits / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

			},
			intializeClickInfo: function(posX){
				var $pointClickPanel = $('#pointClickPanel');
				if(posX > $rootScope.pageWidth && $pointClickPanel.css('display') === 'none'){
					$pointClickPanel.css('left','0');
					$rootScope.slideOptions = {direction:'left'};
					$pointClickPanel.effect('slide',$rootScope.slideOptions);
				}else if(posX < $rootScope.pageWidth && $pointClickPanel.css('display') === 'none'){
					$pointClickPanel.css('left','55%');
					$rootScope.slideOptions = {direction:'right'};
					$pointClickPanel.effect('slide',$rootScope.slideOptions);
				}
			},
		    getPointClickData: function(posX,item,datacenter){
				$rootScope.sessions = [];
				$rootScope.listSize = 100;
				$rootScope.pointClickLabel = item.series.label;
				$rootScope.pointClickTime =  moment.unix(item.datapoint[0]/1000).format('HH:mm:ss');
				$rootScope.pointClickTotalBw = this.bitConvertor(item.datapoint[1]);
				this.intializeClickInfo(posX);
				var url = datacenter.url;
				var dc = '';
				if($rootScope.environment === 'local'){
					dc = 'local';
				}else {
					dc = datacenter.aggregation_name;
				}
				$rootScope.pointClickLabel = item.series.label;
				var getVlanId = function(graphLabel){
					return _.where(datacenter.vlan_id,{label:graphLabel})[0].params_id;
				};
				$http({
					method:"get",
					url: url+'aggregation/related?datacenter='+dc,
					params:{
						ids: getVlanId(item.series.label),
						time: (item.datapoint[0]/1000)
					}
				}).then(_.bind(function(e) {
					var  testData = e.data.results;
					var sessions = [];
					for(var t in testData.related){
						sessions.push({name:t,bandwidth:parseInt(testData.related[t])});
					}
					var maxSession = sessions[0];
					for(var s in sessions){
						var name = sessions[s].name.split('-');
						$rootScope.sessions.push({name:name[0]+' - '+name[1],
												bandwidth_progress:(sessions[s].bandwidth/maxSession.bandwidth)*100,
												bandwidth:sessions[s].bandwidth,
												bandwidth_name:this.bitConvertor(sessions[s].bandwidth)});
					}
				},this));

			}
	    };
		return customDashboardFactory;
	}]);

});
