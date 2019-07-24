const LATITUDE = 57.3081;
const LONGITUDE  = 18.1489;
const API_ADRESS = `https://opendata-download-metfcst.smhi.se/`;
const LONGLAT = `api/category/pmp3g/version/2/geotype/point/lon/${LONGITUDE}/lat/${LATITUDE}/data.json`

const TABLE_TODAY = document.querySelector("#table_today");

addEventListener('load', main);

function main(){
    removeEventListener('load', main);
    console.dir(TABLE_TODAY);

    getResponse();
}
/*-------------
Fetcher
-------------*/

function getResponse(){
  fetch(API_ADRESS+LONGLAT)
  .then(response => response.json())
  .then(data=> {
    isolateRelevantTimes(data)
  })
  .catch(error => console.dir(error))
}

/*-------------
Helpfunction to get the data 6:00, 12:00, 18:00
-------------*/
function isolateRelevantTimes(data){
      let now = new Date().getHours();
      let relevant_times = []

      for (let i = 0; i < data.timeSeries.length; i++) {
            let current_time = new Date(data.timeSeries[i].validTime);
            if ([6, 12, 18].includes(current_time.getHours())){
               relevant_times.push(data.timeSeries[i])
          }
      }

      if (now > new Date(relevant_times[0].validTime).getHours()){
        /* if it's 14:00 we don't need 12:00 and delete the first time of the array
        */
        relevant_times.shift();
        console.dir(relevant_times)
      }
      console.dir(relevant_times)
      console.dir(new Date(relevant_times[0].validTime))
      createTable(relevant_times);

}

/*-------------
Helpfunction to create the table.
It calls a function to append temperatures and fixed information,
and another function to append a rotated arrow.
-------------*/
function createTable(relevant_times){
      for (let i = 0; i < 3; i++) {
          let row = document.createElement("tr")
          for (let j = 0; j < 5; j++) {
              let column = document.createElement("td");
              row.appendChild(column);
          }
          console.dir(TABLE_TODAY)
          TABLE_TODAY.appendChild(row);
      }
      console.dir(TABLE_TODAY)
      appendTemperature(relevant_times);
}

function appendTemperature(relevant_times){
    var options = { month: 'short', day: 'numeric', weekday: 'short'};
    for (let i = 0; i < 3; i++) {
        let formated_date = new Date(relevant_times[i].validTime).toLocaleDateString("sv-SV", options);
        let formated_hour = new Date(relevant_times[i].validTime).getHours();
        let temperature = relevant_times[i].parameters[11].values;

        console.dir("printing table today")
        console.dir(TABLE_TODAY)
        TABLE_TODAY.rows[i+1].cells[0].innerHTML = formated_date;
        TABLE_TODAY.rows[i+1].cells[1].innerHTML = formated_hour;
        TABLE_TODAY.rows[i+1].cells[2].innerHTML = temperature;
        }
        appendOrientedArrow(relevant_times);
}

function appendOrientedArrow(relevant_times){
  console.dir(relevant_times)
    for (let i = 0; i < 3; i++) {
        let arrow = new Image(20, 20);
        let windSpeed = document.createElement('div')
        arrow.src = '../assets/images/small/arrow.jpg';
        console.dir("printing arrow id")
        arrow.id = 'wind_arrow_'+i;
        console.dir(arrow.id)
        let arrowDegrees = (relevant_times[i].parameters[13].level*10)

        /* not working */
        /*https://www.w3schools.com/jsref/prop_style_transform.asp*/
        document.getElementById(`wind_arrow_${i}`).rotateX(arrowDegrees)


        windSpeed.innerHTML = "("+relevant_times[i].parameters[14].level+")"

        TABLE_TODAY.rows[i+1].cells[3].appendChild(arrow)
        TABLE_TODAY.rows[i+1].cells[3].appendChild(windSpeed)
      }
}
