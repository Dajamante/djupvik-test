const LATITUDE = 57.3081;
const LONGITUDE  = 18.1489;
const API_ADRESS = `https://opendata-download-metfcst.smhi.se/`;
const LONGLAT = `api/category/pmp3g/version/2/geotype/point/lon/${LONGITUDE}/lat/${LATITUDE}/data.json`

const TABLE_TODAY = document.querySelector("#table_today");

document.addEventListener('load', main);

function main(){
    removeEventListener('load', main);
    console.dir(TABLE_TODAY);
    createTable();
}

function getResponse(){
        return fetch(API_ADRESS+LONGLAT).then(response=>{
            return response.json()
        .catch(err => {
            console.log("Error reading data" + err);
        })
    })
}

function createTable(){
    getResponse().then((resp) =>{
        console.dir(resp)
        let relevant_times = []
        for (let i = 0; i < resp.timeSeries.length; i++) {
            let current_time = new Date(resp.timeSeries[i].validTime);
            if ([6, 12, 18].includes(current_time.getHours())){
               relevant_times.push(resp.timeSeries[i])
            }
        }

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
        appendTemperature(TABLE_TODAY, relevant_times)

    })
}



function appendTemperature(TABLE_TODAY, relevant_times){
    console.dir(relevant_times)
    var options = { month: 'short', day: 'numeric', weekday: 'short'};
    let now = new Date().getHours();

    for (let i = 0; i < 3; i++) {
    /* smhi sometimes sends times that have already passed. Therefore we check if we go to the next
    6AM, 12 PM or 18 PM*/
        let formated_date;
        let formated_hour;
        let temperature;
        let arrow = new Image(15, 15);
        arrow.src = '../assets/images/small/arrow.jpg';

        if(now > new Date(relevant_times[0].validTime).getHours()){
            formated_date = new Date(relevant_times[i+1].validTime).toLocaleDateString("sv-SV", options);
            formated_hour = new Date(relevant_times[i+1].validTime).getHours();
            temperature = relevant_times[i+1].parameters[11].values;
        }else{
            formated_date = new Date(relevant_times[i].validTime).toLocaleDateString("sv-SV", options);
            formated_hour = new Date(relevant_times[i].validTime).getHours();
            temperature = relevant_times[i].parameters[11].values;
        }
        console.dir("printing table today")
        console.dir(TABLE_TODAY)
        TABLE_TODAY.rows[i+1].cells[0].innerHTML = formated_date;
        TABLE_TODAY.rows[i+1].cells[1].innerHTML = formated_hour;
        TABLE_TODAY.rows[i+1].cells[2].innerHTML = temperature;
        TABLE_TODAY.rows[i+1].cells[3].appendChild(arrow)
        }

}
