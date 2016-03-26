define(['./module',
	'flot',
	'flot-time',
	'flot-tooltip',
	'flot-zoom',
	'flot-timezone',
	'noUiSlider',
	'moment'
	], function (directives,flot,flot_time,flot_tooltip,flot_zoom,flot_timezone,noUiSlider,moment) {
    'use strict';
    directives.directive('historicLinechart', ['$http','historicGraphFactory',function ($http,historicGraphFactory) {
         return {
		      restrict: 'AE',
		      transclude: true,
		      replace: true,
		      link: function (scope, element,attrs){
                    scope.placeholder = $('#'+attrs.graphdiv);
                    scope.stats = $('#'+attrs.statsdiv);
                    scope.bandwidthData =[];
                    scope.threshold = 1000000000;
                    scope.bitConvertor = function(bits, axis){
                        if(bits < 1) return bits.toFixed(1);
                        var k = 1000;
                        var sizes = ['bits', 'Kbits', 'Mbits', 'Gbits', 'Tbits'];
                        var i = Math.floor(Math.log(bits) / Math.log(k));
                        return parseFloat((bits / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                    };
                    scope.historicGraphOptions = {
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
                            color:'#22222',
                            markings: [{ color: "#D33636", lineWidth: 2, yaxis: { from: scope.threshold, to: scope.threshold}}],
                            borderWidth: 1,
                            minBorderMargin: 20,
                            labelMargin: 10,
                            backgroundColor: {
                                colors: scope.themeColors
                            }
                        },
                        legend: {
                            noColumns: 0,
                            backgroundColor:'transparent',
                            backgroundOpacity: 0.5
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%s at %x was %y",
                            xDateFormat: "%H:%M:%S"
                        },
                        yaxis:{
                            panRange: false,
                            zoomRange: false,
                            tickFormatter: scope.bitConvertor,
                            min:0
                        },
                        threshold: {
                            below: 50,
                            colors: ["#FF7070", "#0022FF"],
                        },
                        xaxis:{
                            mode:'time',
                            min:0,
                            max:0,
                            timezone: "browser"
                        }
                    };
                    scope.drawLineGraph = function(graphData) {
                        scope.plot = $.plot(scope.placeholder, graphData, scope.historicGraphOptions);
                        $('#graphLoader').hide();
                    };
                    scope.enableClick = function(){
                        scope.placeholder.unbind().bind("plotclick", function (event, pos, item) {
                            if (item) {
                                historicGraphFactory.getPointClickData(pos.pageX,item,scope.dataCenter);
                            }
                        });
                    };
                    scope.setZoomLevel = function(min,max){
                        return {
                            mode:'time',
                            max:max,
                            min:min,
                            timezone: "browser"
                        };
                    };
                    var tooltipFormat = {
                        to: function (value) {
                            if (value) {
                                return moment.unix(value).format('HH:mm:ss');
                            }
                        },
                        from: function (value) {
                            if (value) {
                                return moment.unix(value).format('HH:mm:ss');
                            }
                        }
                    };
                    scope.rangeSlider= function(slider,min,max){
                        noUiSlider.create(slider, {
                            start: [min, min+600],
                            behaviour:'drag',
                            step: 30,
                            range: {
                                'min': min,
                                'max': max
                            },
                            connect: true,
                            tooltips:[tooltipFormat,tooltipFormat]
                        });
                        slider.noUiSlider.on('update',function(values,handle){
                            scope.historicGraphOptions.xaxis.min = parseInt(values[0])*1000;
                            scope.historicGraphOptions.xaxis.max = parseInt(values[1])*1000;
                            scope.drawLineGraph(scope.series);
                        });
                    };
                    scope.$on('windowResize',function(){
                        scope.drawLineGraph(scope.series);
                    });
                    scope.$on('themeChange',function(){
                        scope.historicGraphOptions.grid.backgroundColor.colors = scope.themeColors;
                        scope.drawLineGraph(scope.series);
                    });
                    scope.$on('historicBandwidth'+attrs.graphid,function(event,data){
                        scope.placeholder = $('#'+attrs.graphdiv);
                        scope.sliderDiv = document.getElementById(attrs.graphseries+'-rangeSlider');
                        scope.enableClick();
                        var series = _.chain(data.data.bandwidth)
                                        .groupBy('label')
                                        .map(function(value, key){
                                            var d = [];
                                            var graphtype = '';
                                            for(var v in value){
                                                d.push(value[v].data);
                                                graphtype = value[v].graph;
                                            }
                                            return {
                                                label: key,
                                                data: d,
                                                g:graphtype
                                            }}).value();
                        scope.series = _.where(series,{g:data.graph});
                        if(scope.sliderDiv.noUiSlider){
                            scope.sliderDiv.noUiSlider.destroy();
                        }
                        scope.rangeSlider(scope.sliderDiv,parseInt(data.start_time),parseInt(data.end_time));
                    });
              }
		  };
    }]);
});
