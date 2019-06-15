function buildMetadata(sample) {
  console.log("Build metadata"); 

  let url = `/metadata/${sample}`;

  d3.json(url).then(function(response){
    
    console.log(response);
    let responseArray = Object.entries(response);

    //console.log("Clearing old panel data");
    d3.select("#sample-metadata").html("");

    //console.log("Entering new panel data");
    d3.select("#sample-metadata").selectAll("div")
      .data(responseArray)
      .enter()
      .append("div")
      .text(function(d) {
        return `${d[0]}: ${d[1]}`
      });

    buildGauge(response.WFREQ);
  });

}

function buildCharts(sample) {
  console.log("Build new chart");

  let colorDict = newMakeColorScale();
  // console.log(colorDict);

  let url = `/samples/${sample}`;

  d3.json(url).then(function(response) {
  
      console.log(response);
      
      let trace = {
        values: response.sample_values.slice(0, 10),
        marker: {
          color: getColorScheme(response.otu_ids.slice(0,10), colorDict)
        },
        labels: response.otu_ids.slice(0,10),
        hovertext: response.otu_labels.slice(0,10),
        hoverinfo: 'text', // default value is 'all' which incluces 'label + text + value'
        // text: response.otu_labels.slice(0,10),
        type: 'pie'
      };
      
      let data = [trace];
      
      //console.log(data);

      Plotly.newPlot("pie", data);

      var desired_maximum_marker_size = 80;
      let trace2 = {
          type: 'scatter',
          x: response.otu_ids,
          y: response.sample_values,
          text: response.otu_labels,
          mode: 'markers',
          hoverinfo: "x + y + text",
          marker: {
            color: getColorScheme(response.otu_ids, colorDict),
            size: response.sample_values,
            sizeref: 2.0 * Math.max(...response.sample_values) / (desired_maximum_marker_size**2),
            sizemode: 'area'
          }
      };

      let layout = {
        hovermode: 'closest',
        xaxis: {title: 'OTU ID'}
      };

      let data2 = [trace2];

      Plotly.newPlot("bubble", data2, layout);

    });
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
