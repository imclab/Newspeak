d3.custom = {};

d3.custom.barChart = function module() {

	function exports(_selection) {

		var margin = {top: 20, right: 20, bottom: 40, left: 40},
			width = 500,
			height = 500,
			gap = 0,
			ease = 'cubic-in-out';
		var svg;
		var duration = 500;


		_selection.each(function(_data) {
			console.log(_data);

			var chartW = width - margin.left - margin.right,
			chartH = height - margin.top - margin.bottom;

			var x1 = d3.scale.ordinal()
			.domain(_data.map(function(d, i){ return i; }))
			.rangeRoundBands([0, chartW], .1);

			var y1 = d3.scale.linear()
			.domain([0, d3.max(_data, function(d, i){ return d; })])
			.range([chartH, 0]);

			var xAxis = d3.svg.axis()
			.scale(x1)
			.orient('bottom');

			var yAxis = d3.svg.axis()
			.scale(y1)
			.orient('left');

			var barW = chartW / _data.length;

			if(!svg) {
				svg = d3.select('.chart').append('svg').classed('chart', true);
				var container = svg.append('g').classed('container-group', true);
				container.append('g').classed('chart-group', true);
				container.append('g').classed('x-axis-group axis', true);
				container.append('g').classed('y-axis-group axis', true);
			}
			svg.transition().duration(duration).attr({width: width, height: height})
			svg.select('.container-group')
			.attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

			svg.select('.x-axis-group.axis')
			.transition()
			.duration(duration)
			.ease(ease)
			.attr({transform: 'translate(0,' + (chartH) + ')'})
			.call(xAxis);

			svg.select('.y-axis-group.axis')
			.transition()
			.duration(duration)
			.ease(ease)
			.call(yAxis);

			var gapSize = x1.rangeBand() / 100 * gap;
			var barW = x1.rangeBand() - gapSize;
			var bars = svg.select('.chart-group')
			.selectAll('.bar')
			.data(_data);
			bars.enter().append('rect')
			.classed('bar', true)
			.attr({x: chartW,
				width: barW,
				y: function(d, i) { return y1(d); },
				height: function(d, i) { return chartH - y1(d); }
			})
			// .on('mouseover', dispatch.customHover);
			// bars.transition()
			// .duration(duration)
			// .ease(ease)
			// .attr({
			// 	width: barW,
			// 	x: function(d, i) { return x1(i) + gapSize/2; },
			// 	y: function(d, i) { return y1(d); },
			// 	height: function(d, i) { return chartH - y1(d); }
			// });
			// bars.exit().transition().style({opacity: 0}).remove();

			







	  	// d3.select(".chart")
	  	// .selectAll("div")
	  	// .data(_data)
	  	// .enter().append("div")
	  	// .attr('class', 'bar')
	  	// .style("width", function(d) { return d * 10 + "px"; })
	  	// .text(function(d) { return d; });

    });
  };
  return exports;
};