# myheroku

Repo for a dashboard to explore the data described in 
[Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/)
with graphs built using Plot.ly.

## Notes:
* A unique color is assigned to each `otu_id` using the function `newMakeColorScale()` in the file `color-scheme.js`.  This function interpolates 3666 values from the `hsl(hue, saturation, lightness)` color model.
This allows the colors of the different `otu_id`s to remain constant between the plots and between the samples.
* If there are no observations recorded for a sample (as in sample # 1495), the pie chart and bubble plot will be empty.  This is a result of using `let` declarations instead of `var` statements in the functions in `app.js`.
* The dashboard is deployed as an [app on Heroku](https://bellybuttonbiodiversitydrake.herokuapp.com/)
