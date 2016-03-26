define(['./module',
    'flot',
    'flot-time',
    'flot-tooltip',
    'flot-zoom',
    'flot-timezone'
    ], function (directives,flot,flot_time,flot_tooltip,flot_zoom,flot_timezone) {
    'use strict';
    directives.directive('liveLinechart', ['liveGraphFactory','historicGraphFactory', function (liveGraphFactory,historicGraphFactory) {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            link: function (scope, element,attrs){
                scope.placeholder = $('#'+attrs.graphdiv);
                scope.data =[];
                scope.threshold = 1000000000;
                scope.bitConvertor = function(bits, axis){
                    if(bits < 1) return bits.toFixed(1);
                    var k = 1000;
                    var sizes = ['bits', 'Kbits', 'Mbits', 'Gbits', 'Tbits'];
                    var i = Math.floor(Math.log(bits) / Math.log(k));
                    return parseFloat((bits / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                };
                scope.legendToggle = function(){
                    scope.activeSeries = [];
                    scope.legendContainer.find("input:checked").each(function () {
                            var series = $(this).data().series;
                            for(var s in scope.series){
                            if (series.label === scope.series[s].label) {
                                scope.activeSeries.push(scope.series[s]);
                            }
                        }
                    });
                    scope.runGraph(scope.placeholder,scope.graphOptions, scope.activeSeries);
                };
                scope.legendAlert = function(alertCheck){
                    scope.legendContainer.find("span").each(function () {
                        $(this).removeClass('legendAlert');
                        var series = $(this).data().series;
                        for(var a in alertCheck){
                            if (series.label === alertCheck[a].label) {
                                $(this).addClass('legendAlert')
                            }
                        }
                    });
                };
                scope.graphOptions = {
                    series: {
                        lines: {
                            show: true,
                            lineWidth:1
                        },
                        points: {
                            show: false
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        markings: [{ color: "#D33636", lineWidth: 2, yaxis: { from: scope.threshold, to: scope.threshold}}],
                        color:'#22222',
                        borderWidth: 1,
                        minBorderMargin: 20,
                        labelMargin: 10,
                        backgroundColor: {
                            colors: scope.themeColors
                        }
                    },
                    xaxis: {
                        mode: "time",
                        timezone: "browser"
                    },
                    yaxis: {
                        min:0,
                        tickFormatter: scope.bitConvertor
                    },
                    legend:{
                        show: false
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%s at %x was %y",
                        xDateFormat: "%H:%M:%S"
                    }
                };
                scope.runGraph = function(placeholder,graphOptions,graphData){
                    scope.plot = $.plot(placeholder, graphData, graphOptions);
                    $('#graphLoader').hide();
                };
                scope.enableClick = function(){
                    scope.placeholder.unbind().bind("plotclick", function (event, pos, item) {
                        if (item) {
                            historicGraphFactory.getPointClickData(pos.pageX,item,scope.datacenter);
                        }
                    });
                };
                scope.$on('themeChange',function(){
                    scope.graphOptions.grid.backgroundColor.colors = scope.themeColors;
                    scope.runGraph(scope.placeholder,scope.graphOptions, scope.activeSeries);
                });
                scope.$on('liveBandwidth'+attrs.graphid,function(event,data){
                    scope.placeholder = $('#'+attrs.graphdiv);
                    scope.legendContainer = $('#'+attrs.graphlegend);
                    scope.enableClick();
                    var series = _.chain(data.data.bandwidth)
                            .groupBy('label')
                            .map(function(value, key){
                                var alert = false;
                                for(var v in value[0].data){
                                    if(value[0].data[v][1] >= scope.threshold){
                                        alert = true;
                                    }
                                }
                                return {
                                    label: key,
                                    data: value[0].data,
                                    color:scope.colors[value[0].id -1],
                                    dc:value[0].datacenter,
                                    alert:alert
                                }}).value();
                    scope.series = _.where(series,{dc:data.datacenter});
                    var alertCheck = _.where(scope.series,{alert:true});
                    if(!_.isEmpty(alertCheck)){
                        scope.legendAlert(alertCheck);
                        scope.alertClass = 'panel panel-alert animeTest';
                    }else {
                        scope.alertClass = 'panel panel-default';
                        scope.legendContainer.find("span").each(function () {
                            $(this).removeClass('legendAlert');
                        });
                    }

                    scope.legendToggle();
                });
            }
        };
    }]);
});
