define(['./module'], function (factories) {
    'use strict';
    factories.factory('liveGraphFactory', ['$rootScope','$state','$interval', '$http','$timeout', function ($rootScope,$state,$interval,$http,$timeout) {
        $rootScope.liveStartTime = 0;
        $rootScope.liveGraphInterval = 4000;
        $rootScope.oldPoints = 15;
        $rootScope.newPoints = 4;
        var liveTrafficData = [];
        $rootScope.sliceFlag = true;
        $rootScope.colors = ['#EDC240','#AFD8F8','#CB4B4B','#4DA74D','#9440ED','#BD9B33','#68769D','#A23C3C'];
	    var liveGraphFactory = {
        	initializeLiveGraph: function(){
                var currentTime = parseInt((new Date().getTime()/1000).toFixed());
                var tabInactiveSec = currentTime - $rootScope.liveStartTime;
                if(tabInactiveSec  >= 300){
                    this.clearLiveData();
                    this.createStreamConfig();
                    var instartTime = currentTime-320;
                    this.getLiveGraphData(instartTime,310);
                }else {
                    var loadSeconds = tabInactiveSec+$rootScope.oldPoints+$rootScope.newPoints-12;
                    this.loadMissingData($rootScope.liveStartTime-15,loadSeconds);
                }
            },
            createStreamConfig: function(){
                 for(var d in $rootScope.datacenters){
                    for(var v in $rootScope.datacenters[d].vlan_id){
                        var s = {};
                        var streamId = $rootScope.datacenters[d].vlan_id[v].params_id;
                        s[$rootScope.datacenters[d].aggregation_name]={};
                        s[$rootScope.datacenters[d].aggregation_name][streamId.toString()] =
                        {
                            label: $rootScope.datacenters[d].vlan_id[v].label,
                            data: [],
                            id: $rootScope.datacenters[d].vlan_id[v].id,
                            datacenter: $rootScope.datacenters[d].aggregation_name
                        };
                        streams_config.push(s);
                    }
                }
            },
            getLiveGraphData: function(startTime,seconds){
                $rootScope.toggleIcon = 'fa fa-spinner fa-lg fa-spin';
                $rootScope.counter = 0;
                $rootScope.seriesTotal = 0;
                for(var d in $rootScope.datacenters){
                    for(var v in $rootScope.datacenters[d].vlan_id){

                        this.getIngressData($rootScope.datacenters[d].url,
                            $rootScope.datacenters[d].vlan_id[v].params_id,
                            $rootScope.datacenters[d].vlan_id[v].id,
                            startTime,
                            seconds,
                            $rootScope.datacenters[d].vlan_id[v].label,
                            $rootScope.datacenters[d].aggregation_name,
                            $rootScope.datacenters[d].name
                        );
                        $rootScope.seriesTotal++;
                    }
                }
                $rootScope.liveStartTime = (startTime + seconds);
            },
            loadMissingData: function(startTime,seconds){
                this.getLiveGraphData(startTime,seconds);
            },
            runLiveGraph: function(){
                this.stopInterval();
                this.nyInterval = $interval(angular.bind(this,function(){
                        $rootScope.sliceFlag = true;
                        var currentTime = (new Date().getTime()/1000).toFixed();
                        console.log('Time Diff',(currentTime - $rootScope.liveStartTime).toFixed());
                        for(var d in $rootScope.datacenters){
                            for(var v in $rootScope.datacenters[d].vlan_id){
                                this.getIngressData($rootScope.datacenters[d].url,
                                    $rootScope.datacenters[d].vlan_id[v].params_id,
                                    $rootScope.datacenters[d].vlan_id[v].id,
                                    $rootScope.liveStartTime-$rootScope.oldPoints,
                                    $rootScope.oldPoints+$rootScope.newPoints,
                                    $rootScope.datacenters[d].vlan_id[v].label,
                                    $rootScope.datacenters[d].aggregation_name,
                                    $rootScope.datacenters[d].name
                                );
                            }
                            $rootScope.$broadcast('liveBandwidth'+$rootScope.datacenters[d].id, {
                                data:{bandwidth:liveTrafficData},
                                datacenter:$rootScope.datacenters[d].aggregation_name}
                            );
                        }
                        $rootScope.counter = 0;
                        $rootScope.toggleIcon ='fa fa-pause';
                        //$rootScope.liveStartTime = $rootScope.liveStartTime+4;
                        if((currentTime - $rootScope.liveStartTime).toFixed()>=13){
                            $rootScope.liveStartTime = $rootScope.liveStartTime+5;
                        }else{
                            $rootScope.liveStartTime = $rootScope.liveStartTime+4;
                        }

                }),$rootScope.liveGraphInterval);
            },
            stopInterval: function(){
                $interval.cancel(this.nyInterval);
            },
            clearLiveData: function(){
                liveTrafficData = [];
            },
            getIngressData: function(url,vlan_paramsId,vlan_id,start_time,length,label,agg_name,datacenter) {
                var dc = '';

                if ($rootScope.environment === 'local') {
                    dc = 'local';
                } else {
                    dc = agg_name;
                }
                $http({
                    method: "get",
                    url: url + 'aggregation/bandwidth?datacenter=' + dc,
                    params: {
                        ids: vlan_paramsId,
                        start_time: start_time,
                        length: length
                    }
                }).then(function (data) {
                    $rootScope.counter++;
                    var stream = _.pluck(streams_config,dc);
                    var dataStream = [];
                    for(var s in stream){
                        if(stream[s] && stream[s][data.data.ids.join()]){
                            stream[s][data.data.ids.join()].label = label;
                            stream[s][data.data.ids.join()].datacenter = dc;
                            dataStream = stream[s][data.data.ids.join()];
                        }
                    }
                    if(dataStream.data.length >300){
                        dataStream.data=dataStream.data.slice(Math.max(dataStream.data.length-300,1));
                    }
                    dataStream.data= dataStream.data.slice(0,-$rootScope.oldPoints);
                    var ingressData = data.data.results;
                    for (var i in ingressData) {
                        dataStream.data.push([parseInt(ingressData[i].ts) * 1000, parseInt(ingressData[i].bw)])
                    }
                    liveTrafficData.push(dataStream);
                });
            }

	    };
        return liveGraphFactory;
	}]);

});
