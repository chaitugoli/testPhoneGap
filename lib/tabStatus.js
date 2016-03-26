/**
 * Created by vgoli on 3/2/16.
 */
(function ($) {
	var vis = (function(){
			var stateKey,
				eventKey,
				keys = {
					hidden: "visibilitychange",
					webkitHidden: "webkitvisibilitychange",
					mozHidden: "mozvisibilitychange",
					msHidden: "msvisibilitychange"
			};
			for (stateKey in keys) {
				if (stateKey in document) {
                    eventKey = keys[stateKey];
                    break;
				}
			}
			return function(c) {
				if (c) document.addEventListener(eventKey, c);
				return !document[stateKey];
			}
	})();
	$.fn.tab = function (options) {
        var callbacks = {
            onFocus: function(){},
            onBlur: function(){}
        };
        var o = $.extend(callbacks, options);
		vis(function(){
			if(vis()){
				setTimeout(function(){
					o.onFocus();
				},300);
			}else {
				o.onBlur();
			}
		});

        return this;
	}
})(jQuery);