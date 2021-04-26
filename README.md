# weather
https://chows-weather.surge.sh/

A weather widget that get geolocation API to determine the user's location and show the current weather.

:wave:
**parcel index.html**
Runs the app in the development mode.

1. parcel index.html
1. delete dist file
1. parcel build index.html
1. surge -d https://[domain].surge.sh

Build and deploy a weather widget that uses the [navigator geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API) to determine the users location and uses that location to obtain the current weather and a 5 day forecast for their region.

Sign-up for a free API account at [OpenWeatherMap](https://openweathermap.org/api)

# Implementation Notes:
* To complete this project you will need to utilize at least 2 different endpoints of the Open Weather Map API, Current Weather Data as well as 5 Day / 3 Hour Forecast.
* The forecast is provided in 3 hour blocks, which means you will receive 8 different temperature forecasts per day. The high that is displayed is the highest temperature forecasted for that day, while the low is the lowest temperature forecasted for that day.
* Given we cannot average the condition description and image (it may not be cloudy all day), choose a single time everyday that will be used as the condition for the day.
* Your output should indicate the 'Current Conditions' as today, and the forecast as the next 5 days.
* You will need to use the weather icons provided by the API; you can read more about it [here](https://openweathermap.org/weather-conditions)
* All temperatures are provided in Kelvin by default. You will need to pass a parameter to the endpoint to request a different temperature unit.
