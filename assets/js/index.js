const LATITUDE = 57.3081;
const LONGITUDE  = 18.1489;
const API_ADRESS = `https://opendata-download-metfcst.smhi.se/`;
const LONGLAT = `api/category/pmp3g/version/2/geotype/point/lon/${LONGITUDE}/lat/${LATITUDE}/data.json`

const TABLE_TEMPERATURES = document.querySelector("#table_of_temperatures");

addEventListener('load', main);

function main(){
    removeEventListener('load', main);
    getResponse();
}

/*-------------
Fetcher
-------------*/

function getResponse(){
  fetch(API_ADRESS+LONGLAT)
  .then(response => response.json())
  .then(data=> {
    return getRelevantTimes(data)
  })
  .then(array => {
    /* the array is the relevant temperatures we need, with times 6, 12 and 18*/
    return createTable(array)
  })
  .then(array =>{
    return appendTemperatures(array)
  })
  .then(array => {
    /* this function does wind force and direction*/
    return appendOrientedArrow(array)
  })
  .then(array=>{
    return appendWeatherSymbol(array)
  })
  .catch(error => console.dir(error))
}

/*-------------
Helpfunction to get the data 6:00, 12:00, 18:00
-------------*/
function getRelevantTimes(data){
      let now = new Date().getHours();
      let relevant_times = []

      /* We only want information at 06:00, 12:00, 18:00*/
      for (let i = 0; i < data.timeSeries.length; i++) {
            let current_time = new Date(data.timeSeries[i].validTime);
            if ([6, 12, 18].includes(current_time.getHours())){
               relevant_times.push(data.timeSeries[i])
          }
      }

      if (now > new Date(relevant_times[0].validTime).getHours()){
        /* if it's 14:00 now, we don't need information given at 12:00.
        Therefore we delete the first time of the array */
        relevant_times.shift();
      }
      return relevant_times;
}

/*-------------
Helpfunction to create the empty table. It's followed by functions to append Correct,
append wind direction and append information on the sky state.
-------------*/

function createTable(relevant_times){
      for (let i = 0; i < 3; i++) {
          let row = document.createElement("tr")
          for (let j = 0; j < 5; j++) {
              let column = document.createElement("td");
              row.appendChild(column);
          }
          TABLE_TEMPERATURES.appendChild(row);
      }
      return relevant_times;
}

function appendTemperatures(relevant_times){
    console.dir(relevant_times)
    var options = { month: 'short', day: 'numeric', weekday: 'short'};
    for (let i = 0; i < 3; i++) {
        let formated_date = new Date(relevant_times[i].validTime).toLocaleDateString("sv-SV", options);
        let formated_hour = new Date(relevant_times[i].validTime).getHours();

        /*The index appear to vary sometimes in the table, t can be att index 11 or 1*/
        let temp_index = getCorrectIndex(relevant_times[i].parameters, "t");

        let Correct = relevant_times[i].parameters[temp_index].values;

        TABLE_TEMPERATURES.rows[i+1].cells[0].innerHTML = formated_date;
        TABLE_TEMPERATURES.rows[i+1].cells[1].innerHTML = formated_hour+":00";
        TABLE_TEMPERATURES.rows[i+1].cells[2].innerHTML = Correct + " °C";
        }
        return relevant_times;
}

function appendOrientedArrow(relevant_times){
    for (let i = 0; i < 3; i++) {
        let arrow = new Image(20, 20);
        let windSpeed = document.createElement('div')
        arrow.src = '../assets/images/small/arrow.jpg';
        let wd_index = getCorrectIndex(relevant_times[i].parameters, "wd");
        let arrowDegrees = (relevant_times[i].parameters[wd_index].values)

        arrow.style.transform = `rotate(${arrowDegrees}deg)`;

        let windSpeedIndex = getCorrectIndex(relevant_times[i].parameters, "ws")

        windSpeed.innerHTML = "("+relevant_times[i].parameters[windSpeedIndex].values+")"

        TABLE_TEMPERATURES.rows[i+1].cells[3].appendChild(arrow)
        TABLE_TEMPERATURES.rows[i+1].cells[3].appendChild(windSpeed)
      }
      return relevant_times
}
function appendWeatherSymbol(relevant_times){
    for (let i = 0; i < 3; i++) {
      console.dir(relevant_times)
      let image_weather = new Image(60, 45)
      let image_index = getCorrectIndex(relevant_times[i].parameters, "Wsymb2")
      console.dir(image_index)
      let image_weather_values = relevant_times[i].parameters[image_index].values[0];
      console.dir(image_weather_values)
      image_weather.src = `../assets/images/small/weather_icons_2/${image_weather_values}.png`

      TABLE_TEMPERATURES.rows[i+1].cells[4].appendChild(image_weather)

    }
}
/*------------------------------
Help function to get correct index for temperature, wind direction and wind force,
as the placement variates in the array.
--------------------------------*/
function getCorrectIndex(parameters_array, searchedItem){
  let correct_index;
  for (let j = 0; j < parameters_array.length; j++) {
            if(parameters_array[j].name == searchedItem){
            correct_index = j;
            break;
            }
      }
  return correct_index;
}
