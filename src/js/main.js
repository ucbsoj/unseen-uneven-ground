import $ from "jquery"; // importing jQuery, you can delete if not needed
require("./lib/social"); // Twitter intent JS
let d3 = require('d3');

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});




window.createGraphic = function(graphicSelector) {

	var graphicEl = d3.select('.graphic')
	var graphicVisEl = graphicEl.select('.graphic__vis')
	var graphicProseEl = graphicEl.select('.graphic__prose')

 //initial variables
      let squareDefaultColor   = "#516F85";
      let squareHighlightColor = "#F9AF4C";
      let animationDuration    = 800;
      var status = "not yet started";



      //setup the initial margins and ratio
      let margin = {top:40,right:20,bottom:0,left:20},
          width  = 600 - margin.left - margin.right,
          height = 800 - margin.top - margin.bottom;


      //spacing between boxes
      let heightGutterSpace = 15;
      let widthGutterSpace  = 10;
      let boxSize           = (width - (widthGutterSpace * 9))/10;
      

      //setup container to hold the graphics
      let svg = d3.select("#graphic")
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMidYMin")
          .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + 
                (height + margin.top + margin.bottom));

      //switches
      let makeBarChartsSwitch = false;

      let g = svg.append("g")
          .attr("id", "squareBox")
          .attr("transform","translate(" + margin.left + "," + margin.top + ")");


      //create empty array of 100 boxes
      let data = new Array(97).fill({value:0, name:"", x:0, y:0});


      //this is the real data, overlayed and will turn into bar chart
      let workerData = [
          {name: "Painters",             wage:18.72, pctWorkforce: 7.2, pctOrder: 0, wageOrder: 6},
          {name: "Machinists",           wage:25.16, pctWorkforce: 6.4, pctOrder: 1, wageOrder: 4},
          {name: "Laborers",             wage:17.21, pctWorkforce: 3.7, pctOrder: 2, wageOrder: 7},
          {name: "Plumbers",             wage:25.92, pctWorkforce: 3.5, pctOrder: 3, wageOrder: 3},
          {name: "Electricians",         wage:26.53, pctWorkforce: 2.4, pctOrder: 4, wageOrder: 1},
          {name: "Carpenters",           wage:22.40, pctWorkforce: 2.2, pctOrder: 5, wageOrder: 5},
          {name: "Iron workers",         wage:25.95, pctWorkforce: 2.2, pctOrder: 6, wageOrder: 2},
          {name: "Elevator installers",  wage:38.16, pctWorkforce: 1.0, pctOrder: 7, wageOrder: 0}
      ];


      //set the scales
      let workForceScale = d3.scaleLinear()
          .domain([0, 12])
          .range([0, (boxSize * 6)+(widthGutterSpace*5)]);

      //set the scales
      let wageScale = d3.scaleLinear()
          .domain([0, 40])
          .range([0, (boxSize * 6)+(widthGutterSpace*5)]);


      

 //SWOOPY ARROW

      var swoopy = svg.append("g")
        .attr("transform", "translate(" + ((widthGutterSpace * 8) + (boxSize * 8) + (boxSize/2)) + "," + ((heightGutterSpace * 10)+(boxSize*10)+margin.top) +")");

      swoopy.append("path")
        .attr("class","swoopyArrow")
        .attr("stroke", "black")
        .attr("stroke-width", "1.5px")
        .attr("fill", "none")
        .attr("d", "M0," + (boxSize/2) + "Q"+ (boxSize/2) +","+ (boxSize/2) +" "+ (boxSize/2) +",0");

      swoopy.append("polygon")
        .attr("class","swoopyArrow")
        .attr("fill", "black")
        .attr("points", (boxSize/2) + ",0 " + (boxSize/2 + 5) + ",6 " + (boxSize/2 - 5) + ",6");

      let swoopyText = swoopy.append("text")
        .attr("text-anchor", "end")
        .attr("x", -5)
        .attr("y", boxSize/2)
        .style("font-family","sans-serif")
        .style("font-size", "1rem")

      let swoopyFirstLine = swoopyText.append("tspan")
        .attr("x", -5)
        .attr("dy", -15)

      let swoopySecondLine = swoopyText.append("tspan")
        .attr("x", -5)
        .attr("dy", 20)

g.selectAll("rect.waffle")
          .data(data)
          .enter()
          .append("rect")
          .attr("y", function(d,i){ return (Math.floor(i/10) % 10) * (heightGutterSpace + boxSize); })
          .attr("x", function(d,i){ return ((i % 10) * (widthGutterSpace + boxSize)); })
          .attr("width", boxSize)
          .attr("height", boxSize)
          .attr("class", "waffle")
          .style("opacity", 1)
          .attr("fill", squareDefaultColor);


      //create the boxes that will become a barchart and overlay them on top of waffle chart
      var chartBoxes = g.selectAll("rect.chart")
          .data(workerData)
          .enter();

      var chartGroups = chartBoxes.append("g")
          .attr("class", function(d,i){ return i < 3 ? "chart threeboxesmove" : "chart nomove";})
          .attr("transform", function(d,i){
            if(i < 3){
              return "translate(" + (i * (boxSize + widthGutterSpace) + (7 * boxSize)+ (7 * widthGutterSpace)) + "," + ((9*boxSize) + (9*heightGutterSpace)) +")"
            } else {
              return "translate(" + ((3*boxSize)+(3*widthGutterSpace)) + "," + ((i * boxSize)+(i * heightGutterSpace)) + ")";   
            }
            
          })
          .attr("opacity", function(d){ return 1;});

      //create orange boxes
      chartGroups.append("rect")
          .attr("y", 0)
          .attr("x", 0)
          .attr("class", "orange")
          .attr("width", function(d,i){ return i < 3 ? boxSize : 0; })
          .attr("height", function(d,i){ return i < 3 ? boxSize : boxSize/2; })
          .attr("fill", squareHighlightColor);

      //create purple boxes
      chartGroups.append("rect")
          .attr("y", boxSize/2)
          .attr("x", 0)
          .attr("class", "purple")
          .attr("width", 0)
          .attr("height", boxSize/2)
          .attr("fill", "#4A3D83");


     


      //add text percentages for boxes, but hide them immediately
      chartGroups.append("text")
          .attr("class", "workforce-labels")
          .attr("x", 5)
          .attr("y", boxSize/4)//function(d,i){ return (i * heightGutterSpace) + (boxSize/2) + 1})
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "middle")
          .style("font-family","sans-serif")
          .style("font-size", "0.8rem")
          .style("fill", "#000000")
          .attr("opacity", 0)
          .text(function(d){ return d.pctWorkforce + "%"; });


      chartGroups.append("text")
          .attr("class", "wage-labels")
          .attr("x", 5)
          .attr("y", boxSize*.75)
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "middle")
          .style("font-family","sans-serif")
          .style("font-size", "0.8rem")
          .style("fill", "#ffffff")
          .attr("opacity", 0)
          .text(function(d){ return "$" + d.wage + "/hour"; });


       chartGroups.append("text")
          .attr("class", "axis")
          .attr("text-anchor", "end")
          .attr("alignment-baseline", "middle")
          .attr("x", -10)
          .attr("y", boxSize/4)//function(d,i){ return (boxSize/4) + (i * (boxSize + heightGutterSpace))})
          .attr("font-family","sans-serif")
          .attr("font-size", "1rem")
          .attr("opacity", 0)
          .text(function(d){ return d.name; })

      var steps = [

      function step0(){

        g.selectAll("rect.orange")
            .transition()
            .duration(animationDuration)
            .attr("width", 0);

        g.selectAll("rect.purple")
            .transition()
            .duration(animationDuration)
            .attr("width", 0);

        g.selectAll(".workforce-labels")
            .transition()
            .duration(animationDuration)
            .attr("opacity", 0);


        g.selectAll(".chart.threeboxesmove")
          .each(function(d,i){
            d3.select(this)
              .transition()
              .duration(animationDuration)
              .attr("transform", "translate(" + (i * (boxSize + widthGutterSpace) + (7 * boxSize)+ (7 * widthGutterSpace)) + "," + ((9*boxSize) + (9*heightGutterSpace)) +")");

            d3.select(this)
              .select("rect")
              .transition()
              .duration(animationDuration)
              .attr("opacity", 1)
              .attr("width", boxSize)
              .attr("height", boxSize);
          });


        g.selectAll("rect.waffle")
            .transition()
            .duration(animationDuration)
            .delay(animationDuration)
            .style("opacity", 1);  

        g.selectAll(".workforce-labels,.wage-labels")
            .transition()
            .duration(animationDuration)
            .attr("opacity", 0);

        g.selectAll(".workforce-labels")
            .style("fill", "#000");

        g.selectAll(".axis")
          .transition()
          .duration(animationDuration)
          .attr("opacity", 0)
          .attr("y", boxSize/4);

        swoopy.selectAll(".swoopyArrow")
          .attr("opacity", 1);

        swoopy.attr("transform", "translate(" + ((widthGutterSpace * 8) + (boxSize * 8) + (boxSize/2)) + "," + ((heightGutterSpace * 10)+(boxSize*10)+margin.top) +")") 
      },


      function step1(){


          g.selectAll("rect.waffle")
            .transition()
            .duration(animationDuration)
            .style("opacity", 0);

          g.selectAll(".chart.threeboxesmove")
            .each(function(d,i){
              d3.select(this)
                .transition()
                .duration(animationDuration)
                .attr("transform", "translate(" + ((3*boxSize)+(3*widthGutterSpace)) + "," + ((i * boxSize)+(i * heightGutterSpace)) + ")");

              d3.select(this)
                .select("rect")
                .transition()
                .duration(animationDuration)
                .attr("height", boxSize/2);
            });

          g.selectAll(".workforce-labels,.axis")
            .transition()
            .duration(animationDuration)
            .delay(animationDuration)
            .attr("opacity", 1);


          g.selectAll(".chart rect.orange")
            .attr("opacity", 1)
            .transition()
            .duration(animationDuration)
            .delay(animationDuration)
            .attr("width", function(d){ return workForceScale(d.pctWorkforce); });


        swoopy.selectAll(".swoopyArrow")
          .attr("opacity", 0);

        swoopy.attr("transform", "translate(" + ((widthGutterSpace * 8) + (boxSize * 8) + (boxSize/2)) + ",5)")          


      },


      function step2(){

        g.selectAll("rect.purple")
          .transition()
          .duration(animationDuration)
          .attr("width", function(d){ return wageScale(d.wage);});


        g.selectAll(".axis")
          .transition()
          .duration(animationDuration)
          .attr("y", boxSize/2);

        g.selectAll(".orange")
          .attr("opacity", .5);

        g.selectAll(".workforce-labels")
          .style("fill", "#aaa");

        g.selectAll(".wage-labels")
          .attr("opacity", 1);


      },

      ]



      function init() {
					update(0)
				}
				
				init()


      function update(step) {
				steps[step].call()
			}

			return {
				update: update,
			}


		
};



		(function() {

			// helper function so we can map over dom selection
			function selectionToArray(selection) {
				var len = selection.length
				var result = []
				for (var i = 0; i < len; i++) {
					result.push(selection[i])
				}
				return result
			}

			// throttle function
			// https://remysharp.com/2010/07/21/throttling-function-calls
			function throttle(fn, threshhold, scope) {
				threshhold || (threshhold = 250);
				var last,
				deferTimer;
				return function () {
					var context = scope || this;

					var now = +new Date,
					args = arguments;
					if (last && now < last + threshhold) {
						// hold on to it
						clearTimeout(deferTimer);
						deferTimer = setTimeout(function () {
						last = now;
						fn.apply(context, args);
						}, threshhold);
					} else {
						last = now;
						fn.apply(context, args);
					}
				};
			}
			
			function rollyourown() {
				// select elements
				var graphicEl = document.querySelector('.graphic')
				var graphicVisEl = graphicEl.querySelector('.graphic__vis')
				var triggerEls = selectionToArray(graphicEl.querySelectorAll('.trigger'))

				// viewport height
				var viewportHeight = window.innerHeight
				var halfViewportHeight = Math.floor(viewportHeight / 2)

				// a global function creates and handles all the vis + updates
				var graphic = createGraphic('.graphic')

				// handle the fixed/static position of grahpic
				var toggle = function(fixed, bottom) {
					if (fixed) graphicVisEl.classList.add('is-fixed')
					else graphicVisEl.classList.remove('is-fixed')

					if (bottom) graphicVisEl.classList.add('is-bottom')
					else graphicVisEl.classList.remove('is-bottom')
				}

				// keep track of a bunch of things related to the bounding box, scroll direction, triggers
				var bbTop = 0	
				var bbBottom = 0
				var height = graphicEl.getBoundingClientRect().height
				var prevStep = 0
				var currentStep = 0
				var numSteps = triggerEls.length

				// check if we need to trigger graphic to update
				var checkTrigger = function() {
					if (bbTop < viewportHeight && bbBottom > 0) {
						var progress = Math.abs(bbTop - halfViewportHeight) / height * numSteps
						var step = Math.floor(progress)
						currentStep = Math.min(Math.max(step, 0), numSteps - 1)
					}
				}

				// toggled fixed position
				var checkEnterExit = function() {
					var bottomFromTop = bbBottom - viewportHeight
					var bottom
					var fixed

					if (bbTop < 0 && bottomFromTop > 0) {
						bottom = false
						fixed = true
					} else if (bbTop < 0 && bottomFromTop < 0) {
						bottom = true
						fixed = false
					} else {
						bottom = false
						fixed = false
					}
					
					toggle(fixed, bottom)
				}

				var handleScroll = function() {
					// update bounding box vars
					var bb = graphicEl.getBoundingClientRect()
					bbTop = bb.top
					bbBottom = bb.bottom

					checkTrigger()
					checkEnterExit()
				}

				// throttled scroll event
				window.addEventListener('scroll', throttle(handleScroll, 50))

				// use raf to check if we should update the graphic or not
				var render = function() {
					if (currentStep !== prevStep) {
						prevStep = currentStep
						console.log(currentStep,'currentStep');
						graphic.update(currentStep)
					}
					
					window.requestAnimationFrame(render)
				}
				render()
			}

			rollyourown()

		})()
	
