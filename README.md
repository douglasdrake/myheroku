# myheroku

# Description
Repo for a dashboard to explore the data described in 
[Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/)
with graphs built using Plot.ly.

# Methods
1.  Flask is used for the GET/POST methods.
2.  SQLAlchemy is used to connet to and query the database of samples.
3.  JavaScript (D3) is used to respond to menu changes and update the contents of the dashboard.
4.  Plot.ly is used to generate the plots.

# Notes:
* A unique color is assigned to each `otu_id` using the function `newMakeColorScale()` in the file `color-scheme.js`.  This function interpolates 3666 values from the `hsl(hue, saturation, lightness)` color model.
This allows the colors of the different `otu_id`s to remain constant between the plots and between the samples.
* If there are no observations recorded for a sample (as in sample # 1495), the pie chart and bubble plot will be empty.  This is a result of using `let` declarations instead of `var` statements in the functions in `app.js`.
* The dashboard is deployed as an [app on Heroku](https://bellybuttonbiodiversitydrake.herokuapp.com/)
