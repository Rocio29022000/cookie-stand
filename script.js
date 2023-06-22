"use strict";

const parentElement = document.getElementById("shops")

//Hours
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

//Create random number
function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Constructor function for shops

function Store(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust){
    this.storeName = storeName;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgCookiesPerCust = avgCookiesPerCust;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0;
    this.calcCustomersEachHour()
    this.calcCookiesEachHour()
    this.render()
}

// Creates random number and pushes it to customer each hour.
Store.prototype.calcCustomersEachHour = function(){
    for (let i = 0; i < hours.length; i++ ){
        this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour))
    }
    console.log(this.customersEachHour)
}

//Calculates the cookies each hour based on the random number of customers times
// the average cookies sold per customer at that location, and adds it to a total sum. 
Store.prototype.calcCookiesEachHour = function(){
    for (let i = 0; i < hours.length; i++){
        let multi = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCust);
        this.cookiesEachHour.push(multi);
        this.totalDailyCookies += multi;
    }
}

//Render table on the page

// add an article
const article = document.createElement("article");
parentElement.appendChild(article);

//Add a data table
const table = document.createElement("table");
article.appendChild(table);
// Add table header row
const headerRow = document.createElement("tr");
table.appendChild(headerRow);

//add column 1
let empty = document.createElement("td")
empty.textContent = " "
headerRow.appendChild(empty)

//add table header cells
for (let i=0; i < hours.length; i++){
    let hoursHeaderCell = document.createElement("th")
    hoursHeaderCell.textContent = hours[i]
    headerRow.appendChild(hoursHeaderCell)
}
    //add last column
    let total = document.createElement("th")
    total.textContent = "Total"
    headerRow.appendChild(total)

Store.prototype.render = function(){
    //add data row
    const dataRow = document.createElement("tr");
    table.appendChild(dataRow);

    //add column 1
    let cities = document.createElement("td")
    cities.textContent = this.storeName
    dataRow.appendChild(cities)
    
    //add data row
    for (let i = 0; i < hours.length; i++){
        let cookiesEH = document.createElement("td");
        cookiesEH.textContent = this.cookiesEachHour[i];
        dataRow.appendChild(cookiesEH);
    }

    //add last column data
    let totalNum = document.createElement("td")
    totalNum.textContent = this.totalDailyCookies
    dataRow.appendChild(totalNum)
  
}

const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubai = new Store("Dubai", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);

console.log(seattle)
console.log(tokyo)
console.log(dubai)
console.log(paris)
console.log(lima)




