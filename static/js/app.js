function buildMetadata(sample) {
  console.log("Build metadata"); 

  let url = `/metadata/${sample}`;

  d3.json(url).then(function(response){
    
    console.log(response);
    let responseArray = Object.entries(response);

    console.log("Clearing old panel data");
    d3.select("#sample-metadata").html("");

    console.log("Entering new panel data");
    d3.select("#sample-metadata").selectAll("div")
      .data(responseArray)
      .enter()
      .append("div")
      .text(function(d) {
        return `${d[0]}: ${d[1]}`
      });

  });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  console.log("Build new chart");

  let url = `/samples/${sample}`;

  d3.json(url).then(function(response) {
  
      console.log(response);
      
      let trace = {
        values: response.sample_values.slice(0, 10),
        labels: response.otu_ids.slice(0,10),
        hovertext: response.otu_labels.slice(0,10),
        hoverinfo: 'text', // default value is 'all' which incluces 'label + text + value'
        // text: response.otu_labels.slice(0,10),
        type: 'pie'
      };
      
      let data = [trace];
      
      console.log(data);

      Plotly.newPlot("pie", data);

      let desired_maximum_marker_size = 40;
      let trace2 = {
          type: 'scatter',
          x: response.otu_ids,
          y: response.sample_values,
          hovertext: response.otu_labels,
          mode: 'markers',
          // hoverinfo: 'x+y+text',
          marker: {
            color: response.otu_ids,
            size: response.sample_values,
            sizemode: 'area',
            sizeref: 2.0 * Math.max(...response.sample_values) / (desired_maximum_marker_size**2),
          }
      };

      let layout = {
        xaxis: {title: 'OTU ID'}
      };

      let data2 = [trace2];

      Plotly.newPlot("bubble", data2, layout);

      /*var trace = {
        type: "scatter",
        mode: "lines",
        name: "Bigfoot Sightings",
        x: response.map(data => data.year),
        y: response.map(data => data.sightings),
        line: {
          color: "#17BECF"
        }
      }; */
  
      /*
      var data = [trace];
  
      var layout = {
        title: "Bigfoot Sightings Per Year",
        xaxis: {
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };
  
      Plotly.newPlot("plot", data, layout);
      */

    });
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
