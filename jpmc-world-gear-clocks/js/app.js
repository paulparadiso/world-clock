// Created by Dan Garant (dan@garantanalytics.com) for C&G Partners

//window.onerror = function(msg, url, linenumber, colno, error) {
 //   console.log(error);
  //  alert("Error message: " + msg + "\nURL: " + url + "\nLine: " + linenumber);
   // return true;
//};	

/** Adjusts the layout of the page elements to respond to changes in window size.
	
	Arguments:
		firstLoad -- Indicates if this is the first time the window has opened
        withLines -- Indicates if lines should be displayed to check that the clocks are correctly aligned
*/
function setLayout(firstLoad, withLines) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = g.clientWidth || e.clientWidth || w.innerWidth,
        y = w.innerHeight || e.clientHeight|| g.clientHeight;

    // table should first fill horizontal space, then scale vertically, maintaining aspect ratio 
    var targetAspect = 5760 / 1080.0;
    var usableHeight = (1.0 / targetAspect) * x;
	var usableWidth = x;
	var widthScale = x / 5760.0;
	var heightScale = usableHeight / 1080.0;
	var axisSpacingHorizontal = 384 * widthScale;
	var axisSpacingVertical = 270 * heightScale;
	var axisPointRadius = 5 * widthScale;
	
	var minuteHandLength = 170 * widthScale;
	var minuteHandThickness = 20 * widthScale;
	
	var hourHandLength = 120 * widthScale;
	var hourHandThickness = 25 * widthScale;
	
	var secondHandLength = 160 * widthScale;
	var secondHandThickness = 5 * widthScale;
	var secondHandBalance = 15 * widthScale;
	
	var fontSize = 30 * widthScale;
	var textOffset = 67 * heightScale;
	
	var container = d3.select("#container");
	container.attr("width", "100%")
			 .attr("height", usableHeight);
	
	// initialize or re-initialize the clocks (36 in total)
	for(var clockId = 1; clockId <= 36; clockId++) {
		var column = Math.floor((clockId - 1) / 12.0) * 4 + ((clockId - 1) % 4);
		var xPos = ((clockId - 1) % 4) * axisSpacingHorizontal + 
			Math.floor((clockId - 1) / 12.0) * 5 * axisSpacingHorizontal + axisSpacingHorizontal;
		var yPos = Math.ceil((((clockId - 1) % 12) + 1) / 4.0) * axisSpacingVertical;
        var digitId = Math.floor(column / 2);
        var digitPosition = Math.floor(((clockId - 1) % 12) / 4) * 2 + column - (digitId * 2);
		if(firstLoad) {
			var group = container.append("g");
			var minuteHand = group.append("line").attr("opacity", 0);
            //var hourHandWrapper = group.append("g").attr("class", "hour-hand-wrapper")
            //var hourHandExpander = hourHandWrapper.append("rect").attr("class", "hour-hand-expander")
            //var hourHand = hourHandWrapper.append("line").attr("opacity", 0) ;
            var hourHand = group.append("line").attr("opacity", 0);
			var secondHand = group.append("line").attr("opacity", 0);
			var axisPoint = group.append("circle").attr("opacity", 0);			
			var textElt = group.append("text").attr("opacity", 0);

            if(withLines) {
                container.append("line").attr("x1", 0).attr("x2", usableWidth)
                    .attr("y1", yPos).attr("y2", yPos).attr("stroke-width", secondHandThickness / 2.0).attr("stroke", "#676767");
            }
		} else {
			var group = container.select("#clock-" + clockId);
			var minuteHand = group.select(".minute-hand");
			var secondHand = group.select(".second-hand");
            //var hourHandWrapper = group.select(".hour-hand-wrapper");
            //var hourHandExpander = group.select(".hour-hand-expander");
			var hourHand = group.select(".hour-hand");
			var textElt = group.select("text");
			var axisPoint = group.select("circle");
		}
		
		group
			.attr("transform", "translate(" + xPos + "," + yPos + ")")
			.attr("class", "clock-group" + 
                           " column-" + column + 
                           " digit-" + digitId +
                           " position-" + digitPosition)
			.attr("data-column", column)
			.attr("data-x-position", xPos)
			.attr("id", "clock-" + clockId);
		
		minuteHand
			.attr("x1", 0).attr("x2", minuteHandLength)
			.attr("y1", 0).attr("y2", 0)
			.attr("stroke-width", minuteHandThickness)
			.attr("stroke", "#676767")
			.attr("stroke-linecap", "round")
			.attr("class", "minute-hand")
        /*hourHandWrapper
            .attr("filter", "url(#hourHandDropShadow)");
        hourHandExpander
            .attr("x", -2 * hourHandLength)
            .attr("y", -2 * hourHandLength)
            .attr("width", 4 * hourHandLength)
            .attr("height", 4 * hourHandLength)
            .attr("opacity", 0);*/
		hourHand
			.attr("x1", 0)
			.attr("x2", hourHandLength)
			.attr("y1", 0).attr("y2", 0)
			.attr("stroke-width", hourHandThickness)
			.attr("stroke", "rgb(0,0,0)")
			.attr("stroke-linecap", "round")
			.attr("class", "hour-hand");
		textElt
			.attr("font-size", (fontSize * 1) + "px")
			.attr("y", -textOffset)
            .attr("class", "location-label")
			.attr("fill", "white")
			.style("font-family", "amplitude-medium")
			.text(CLOCK_DEFINITIONS["clock-" + clockId]["location"].toUpperCase())
			.attr("x", -0.5 * textElt.node().getBBox().width)
            .attr("filter", "url(#textDropShadow)");
		secondHand
			.attr("x1", -secondHandBalance)
			.attr("x2", secondHandLength-secondHandBalance)
			.attr("y1", 0).attr("y2", 0)
			.attr("stroke-width", secondHandThickness)
			.attr("stroke", "#ea2127")
			.attr("stroke-linecap", "round")
			.attr("class", "second-hand");			
		axisPoint
			.attr("r", axisPointRadius).attr("fill", "red")
			.attr("class", "axis-point clock-object clock-" + clockId);
	}
}

// "real" modulus operator
function mod(n, m) {
	return ((n % m) + m) % m;
}

// Choppy easing function for integration with d3
function stepEase(stepSize) {
    return function(t) {
        return Math.floor(t / stepSize) / (1 / stepSize);
    }
}

/** 
	Performs an update/load of the single clock display
	Arguments:
		timeToTransition -- the number of milliseconds that should be spent animating clock components
		firstUpdate -- Indicates if this is the first update of the single-clock 
					   display since switching from the multi-clock display
*/
function updateTimeSingle(timeToTransition, firstUpdate, accelerate) {
    d3.selectAll(".location-label").attr("opacity", 0);

    var time = moment();
    if(time.hours() >= 18 || time.hours < 5) {
        var hourHandStroke = "#ffffff";
        if(firstUpdate)
            d3.select("body").transition().duration(2000).style("background", "#221f1f");
    } else {
        var hourHandStroke = "#221f1f";
        if(firstUpdate)
            d3.select("body").transition().duration(2000).style("background", "#cacaca");
    }

    d3.selectAll(".minute-hand").attr("stroke", "#676767");
    d3.selectAll(".second-hand").attr("stroke", "#ea2127");
    //d3.selectAll(".hour-hand-wrapper").attr("filter", "");

	if(accelerate) { // for accelerated testing
		time.set('hour', Math.floor(time.seconds() / 2.5));
	}

    function pad(val) {
        return ('0' + val).slice(-2);
    }
    function performRotation(element, charSpec) {
        if(charSpec == "n") {
            var rotateDegree = 270;
        } else if(charSpec == "e") {
            var rotateDegree = 0;
        } else if(charSpec == "s") {
            var rotateDegree = 90;
        } else if(charSpec == "w") {
            var rotateDegree = 180;
        } else if(charSpec == "a") {
            var rotateDegree = 315;
        }
        if(element.attr("transform") == "") {
            element.attr("transform", "rotate(0)");
        }
        return(element.transition().duration(timeToTransition)
            .attrTween("transform", function(d, i, a) {
				if(a == null)
					return; // page has probably just reloaded
                var match = a.match(new RegExp("rotate\\(([-0-9\\.]+)\\)"));
                var curDegree = parseFloat(match[1]);
                return function(t) {
                    if(rotateDegree < curDegree) {
                        var curRotation = curDegree + ((rotateDegree + 360) - curDegree) * t;
                    } else {
                        var curRotation = curDegree + (rotateDegree - curDegree) * t;
                    }
                    return("rotate(" + curRotation % 360 + ")");
                }
            }));
    }
    function renderValue(digit, value) {
        _.each(DIGIT_SETUP[value], function(setup, idx) {
            var clock = digit.filter(".position-" + idx);
            performRotation(clock.select(".hour-hand"), setup[0]).attr("stroke", hourHandStroke);
            performRotation(clock.select(".minute-hand"), setup[1]);
            performRotation(clock.select(".second-hand"), setup[2]);

            // check if the component should be invisible
            if(setup.length == 4 && setup[3] == "i") {
                clock.transition().duration(timeToTransition).style("opacity", 0);
            } else {
                clock.transition().duration(timeToTransition).style("opacity", 1);
            }
        });
    }
    if(firstUpdate) {
        time = time.add(1, 's');
    }
	var hours = time.hours() % 12;
	if(hours == 0) {
		hours = 12;
	}
    var padHours = pad(hours);
    var padMinutes = pad(time.minutes());
    var padSeconds = pad(time.seconds());
    renderValue(d3.selectAll(".digit-0"), padHours[0]);
    renderValue(d3.selectAll(".digit-1"), padHours[1]);
    renderValue(d3.selectAll(".digit-2"), padMinutes[0]);
    renderValue(d3.selectAll(".digit-3"), padMinutes[1]);
    renderValue(d3.selectAll(".digit-4"), padSeconds[0]);
    renderValue(d3.selectAll(".digit-5"), padSeconds[1]);
    return time;
}

/** Perform an update/load of the 36-clock display
	Arguments:
		screenDurationMillis -- The number of milliseconds to keep this display on the screen.
								Governs some aspects of the screen transition.
		firstLoad -- Indicates if the page has only just opened
*/
function updateTimeMulti(screenDurationMillis, firstLoad) {
    if(firstLoad == undefined) {
        firstLoad = false;
    }


    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        screenWidth = g.clientWidth || e.clientWidth || w.innerWidth;

    var loadDuration = 1000 + 1000 * firstLoad;
    d3.selectAll(".location-label").transition()
        .duration(loadDuration).attr("opacity", 1);
    d3.select("body").transition().duration(2000).style("background", "#cacaca");
	
    var clockPositionsAndTimes = [];
	var transitions = _.map(CLOCK_DEFINITIONS, function(value, key) {
		var time = moment.tz(value["time-zone"]);
        if(window.addHours > 0) { // for testing
            time.hours(time.hours() + addHours);
         }

        function smToDegrees(sm) {
            return ((sm * 6) + 270) % 360;
        }
		var minuteRotateDegrees = smToDegrees(time.minutes())
		var secondRotateDegrees = smToDegrees(time.seconds())
		var hourRotateDegrees = (((time.hours() % 12) * 30) + 270) % 360;
		var clock = d3.select("#" + key);
		
		var fractionalHours = time.hours() + time.minutes() / 60.
        clockPositionsAndTimes.push({xpos : parseFloat(clock.attr("data-x-position")), 
                                     hours : fractionalHours, 
                                     name : value.location,
                                     column : parseInt(clock.attr("data-column")),
                                     key : key});
		
        if(fractionalHours > 5 && fractionalHours < 18 && !window.singleColor) {
            var hourHandColor = "#ffffff"
        } else {
            var hourHandColor = "#221f1f"
        }
        clock.transition().duration(1000).style("opacity", 1);
        clock.select(".axis-point").transition().duration(loadDuration).attr("opacity", 1);
		var hourTransition = clock.select(".hour-hand")
            .transition().duration(loadDuration)
			.attr("transform", "rotate(" + hourRotateDegrees + ")")
			.attr("stroke", hourHandColor)
            .attr("opacity", 1);
		var minuteTransition = clock.select(".minute-hand")
            .transition().duration(loadDuration)
			.attr("transform", "rotate(" + minuteRotateDegrees + ")")
            .attr("opacity", 1); 
        clock.select(".axis-point").transition().duration(loadDuration)
            .attr("opacity", 1);
		clock.select(".second-hand")
            .transition().duration(loadDuration)
			.attr("transform", "rotate(" + secondRotateDegrees + ")")
            .attr("opacity", 1)
            // when done, start rotating in accordance with the passage of time
            .each("end", function() { 
                var targetRotation = (secondRotateDegrees + (Math.ceil(screenDurationMillis / 1000) * 6));
		        clock.select(".second-hand")
                    .transition().duration(screenDurationMillis - loadDuration)
                    .attrTween("transform", function() {
                        return function(d) {
                            var curRotation = secondRotateDegrees + (targetRotation - secondRotateDegrees) * d;
                            return("rotate(" + curRotation % 360 + ")");
                        }
                    }).ease("linear");
             });	
		return {hour : hourTransition, minute : minuteTransition};
	});
	var hourHandTransitions = _.indexBy(_.pluck(transitions, "hour"), 
		function(tr) { return tr.node().parentNode.id});
	var minuteHandTransitions = _.indexBy(_.pluck(transitions, "minute"), 
		function(tr) { return tr.node().parentNode.id});
	
    function interpolateClocks(c1, c2, hour) {
        // don't allow wrap-around within the hour, just extend the gradient beyond the screen edge
        if(c2.xpos < c1.xpos) {
            c2.xpos = screenWidth + (c2.xpos - (c1.xpos - screenWidth));
        }
        var timePct = (hour - c1.hours) / (c2.hours - c1.hours);
        var xpos = c1.xpos + timePct * (c2.xpos - c1.xpos);
        return {xpos : xpos, pct : xpos / screenWidth * 100};
    }
}

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

/** Initialize the storyboard */
$(document).ready(function() {

	window.accelerate = QueryString.accelerate != undefined;
	window.singleColor = true;//QueryString.singlecolor == "true";
	if(window.accelerate) {
		window.multiMilliseconds = 5 * 1000;
		window.singleMilliseconds = 5 * 1000;
	} else {
		window.multiMilliseconds = 20 * 1000;
		window.singleMilliseconds = 10 * 1000;		
	}
    
    if(QueryString.withLines != undefined) {
        var withLines = true;
    } else {
        var withLines = false;
    }


	window.addHours = parseInt(QueryString.addHours);
    if(window.addHours == undefined) {
        window.addHours = 0;
    }

    setLayout(true, withLines);
	
	// Starts a cycle which runs the multi-clock display, then switches to the 
	// single-screen display after window.multiMilliseconds has elapsed
    function runMulti(firstLoad) {
	    updateTimeMulti(window.multiMilliseconds, firstLoad);
        setTimeout(function() {
            runSingleClock(moment(), true)
        }, window.multiMilliseconds);
    }

	// Starts a cycle which regularly updates the single-clock display,
	// then switches to the multi-clock display after window.singleMilliseconds has elapsed
    function runSingleClock(lastTransition, firstUpdate) {
        var transitionGap = 200;
        var transitionTime = Math.max(0, 1000 - moment().milliseconds() - transitionGap);
        if(firstUpdate) {
            transitionTime += 1000;
        }
        var time = updateTimeSingle(transitionTime, firstUpdate, window.accelerate);
        if(moment().diff(lastTransition, "milliseconds") >= window.singleMilliseconds) {
            setTimeout(runMulti, 1000);
        } else {
            setTimeout(function() { runSingleClock(lastTransition, false) }, transitionTime + transitionGap)
        }
    }
    runMulti(true);
	
	window.onresize = function() {
		setLayout(false, withLines);
	}
});
