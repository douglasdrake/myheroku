/* Assign a unique color to each otu_id in the database.
  This will allow the pie charts to line up with the bubble chart
  and the same color will represent the same otu_id in each chart.
  */

  /* Step 1.  Determine the number of unique otu_id's. */
function makeColorScale() {
    let url = "/otuids";
    console.log("In makeColorScale");

    d3.json(url).then(function(response) {
        // numberOTU = response.length;

        // Determine the largest OTU_ID
        let numberOTU = Math.max(...response);
        console.log(numberOTU);

        // Make a color interpolator of the viridis color scheme
        let myColor = d3.scaleLinear()
                        .domain([1, numberOTU])
                        .range(['white','red']);
 //                       .interpolator(d3.interpolateViridis);

        // get the colors
        let colors = response.map((d, i) => (myColor(d)));

        //console.log(colors);

        // make a dictionary of key,value pairs:
        // key = OTU_ID, value = color
        // var result = {};
        response.forEach((key, i) => result[key] = colors[i]);

        // console.log(result);

    });
    return result
}


/* There are 3666 unique OTU_IDS - too many for a linear scaler */
/* Would need to grab several scales and interpolate each and then join
together. */

function getColorScheme(otuIDS, colorDict) {
    let colors = otuIDS.map((d) => colorDict[d]);

    return colors
}

function newMakeColorScale() {    
    /* 3666 = 2 * 3 * 13 * 47 */

    let counter = 1;
    let lightStart = 20;
    let satStart = 20;
    let hueStart = 0;
    let lightStep = (80 - 20)/6;
    let satStep = (80 - 20)/13;
    let hueStep = 360/47;

    var hue, light, saturation;
    let colorDict = {};

    hue = hueStart;
    for (let i = 0; i < 47; i++) {
        saturation = satStart;
        for (let j = 0; j < 13; j++){
            light = lightStart;
            for (let k = 0; k < 6; k++) {
                colorDict[counter] = `hsl(${hue}, ${saturation}, ${light})`;
                light += lightStep;
                counter+=1;
            }
            saturation += satStep;
        }
        hue += hueStep;
    }
    return colorDict
}



