// Step 0: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 120, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append an SVG group
var chart = svg.append("g");

// Append a div to the bodyj to create tooltips, assign it a class
d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

// Retrieve data from the CSV file and execute everything below
d3.csv("Data.csv", function(err, Data) {
  if (err) throw err;

  Data.forEach(function(data) {
    data.state = +data.state;
    data.abbr = +data.abbr;
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
  });
  // console.log("data: ", data);


  // Create scale functions
  var yLinearScale = d3.scaleLinear().range([height, 0]);
  var xLinearScale = d3.scaleLinear().range([0, width]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // These variables store the minimum and maximum values in a column in data.csv
  var xMin;
  var xMax;
  var yMax;
  var yMin;

  // This function identifies the minimum and maximum values in a column in hairData.csv
  // and assign them to xMin and xMax variables, which will define the axis domain
  function findMinAndMax(dataColumnX, dataColumnY) {
    xMin = d3.min(Data, function(data) {
      return +data[dataColumnX] * 0.8;
    });

    xMax = d3.max(Data, function(data) {
      return +data[dataColumnX] * 1.1;
    });

    yMax = d3.max(Data, function(data) {
      return +data[dataColumnY] * 1.1;
    });
  }

  // The default x-axis is 'poverty/healthcare'
  // Another axis can be assigned to the variable during an onclick event.
  // This variable is key to the ability to change axis/data column
  var currentAxisLabelX = "poverty";
  var currentAxisLabelY = "healthcare";

  // Call findMinAndMax() with 'hair_length' as default
  findMinAndMax(currentAxisLabelX,currentAxisLabelY);
  

  // Set the domain of an axis to extend from the min to the max value of the data column
  xLinearScale.domain([0, xMax]);
  yLinearScale.domain([0, yMax]);
  
  // // Initialize tooltip
  // var toolTip = d3
  //   .tip()
  //   .attr("class", "tooltip")
  //   // Define position
  //   .offset([80, -60])
  //   // The html() method allows us to mix JavaScript with HTML in the callback function
  //   .html(function(data) {
  //     var abbr = data.state;
  //     var y_value = +data[currentAxisLabelY];
  //     var x_value = +data[currentAxisLabelX];
  //     var bandString;
  //     // Tooltip text depends on which axis is active/has been clicked
  //     return state +
  //       "<br>" +
  //       x_value +
  //       bandInfo +
  //       "<br> Hits: " +
  //       numHits;
  //   });

  // Create tooltip
  // chart.call(toolTip);
  
  chart
    .selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")    
      .attr("cx", function(data, index) {
        return xLinearScale(+data[currentAxisLabelX]);
      })
      .attr("cy", function(data, index) {
        return yLinearScale(+data[currentAxisLabelY]);
      })
      .attr("r", "12")
      .attr("fill", "#b0c4de") 
    .append("text")
    // .attr("dx", function(d){return -20})
    .text(function(d){return "test"})
    

  // Append an SVG group for the x-axis, then display the x-axis
  chart
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    // The class name assigned here will be used for transition effects
    .attr("class", "x-axis")
    .call(bottomAxis);

  // Append a group for y-axis, then display it
  chart.append("g").call(leftAxis);

  // Append y-axis label
  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 0)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axis-text inactive")
    .attr("data-axis-name", "obesity")
    .text("Obesity");

    chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axis-text inactive")
    .attr("data-axis-name", "smokes")
    .text("Smokes");

    chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axis-text active")
    .attr("data-axis-name", "healthcare")
    .text("Lacks HealthCare(%)");

  // Append x-axis labels
  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    // This axis label is active by default
    .attr("class", "axis-text active")
    .attr("data-axis-name", "poverty")
    .text("Poverty (%)");

  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 45) + ")"
    )
    // This axis label is inactive by default
    .attr("class", "axis-text inactive")
    .attr("data-axis-name", "age")
    .text("Age (Median)");

  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 70) + ")"
    )
    // This axis label is inactive by default
    .attr("class", "axis-text inactive")
    .attr("data-axis-name", "income")
    .text("Household Income (Median)");

  // Change an axis's status from inactive to active when clicked (if it was inactive)
  // Change the status of all active axes to inactive otherwise
  function labelChange(clickedAxis) {
    d3
      .selectAll(".axis-text")
      .filter(".active")
      // An alternative to .attr("class", <className>) method. Used to toggle classes.
      .classed("active", false)
      .classed("inactive", true);

    clickedAxis.classed("inactive", false).classed("active", true);
  }

  d3.selectAll(".axis-text").on("click", function(value) {
    // Assign a variable to current axis
    var clickedSelection = d3.select(this);
    // "true" or "false" based on whether the axis is currently selected
    var isClickedSelectionInactive = clickedSelection.classed("inactive");
    // console.log("this axis is inactive", isClickedSelectionInactive)
    // Grab the data-attribute of the axis and assign it to a variable
    // e.g. if data-axis-name is "poverty," var clickedAxis = "poverty"
    var clickedAxis = clickedSelection.attr("data-axis-name");
    
    console.log("current axis: ", clickedAxis);

    // The onclick events below take place only if the x-axis is inactive
    // Clicking on an already active axis will therefore do nothing
    if (isClickedSelectionInactive) {
      // Assign the clicked axis to the variable currentAxisLabelX
      currentAxisLabelX = clickedAxis;
      // Call findMinAndMax() to define the min and max domain values.  
      // Call findMinAndMax() to define the min and max domain values.
      findMinAndMax(currentAxisLabelX, currentAxisLabelY);
      // Set the domain for the x-axis
      xLinearScale.domain([xMin, xMax]);
      // Create a transition effect for the x-axis
      svg
        .select(".x-axis")
        .transition()
        // .ease(d3.easeElastic)
        .duration(1800)
        .call(bottomAxis);
      // Select all circles to create a transition effect, then relocate its horizontal location
      // based on the new axis that was selected/clicked
      d3.selectAll("circle").each(function() {
        d3
          .select(this)
          .transition()
          // .ease(d3.easeBounce)
          .attr("cx", function(data) {
            return xLinearScale(+data[currentAxisLabelX]);
          })
          .attr("cy", function(data) {
            return yLinearScale(+data[currentAxisLabelY]);
          })
          .duration(1800);
      });

      // Change the status of the axes. See above for more info on this function.
      labelChange(clickedSelection);
    }
  });
});
