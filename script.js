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

Store.prototype.calcCustomersEachHour = function(){
    for (let i = 0; i < hours.length; i++ ){
        this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour))
    }
    console.log(this.customersEachHour)
}

Store.prototype.calcCookiesEachHour = function(){
    for (let i = 0; i < hours.length; i++){
        let multi = this.customersEachHour[i] * this.avgCookiesPerCust;
        this.cookiesEachHour.push(multi)
        this.totalDailyCookies += multi
    }
    console.log(this.cookiesEachHour)
    console.log(this.totalDailyCookies)
}

Store.prototype.render = function(){
    const article = document.createElement("article");
    parentElement.appendChild(article);
    const h3 = document.createElement("h3");
    h3.textContent = this.storeName;
    article.appendChild(h3);
    const ul = document.createElement("ul");
    article.appendChild(ul);
    for (let i = 0; i < hours.length; i++ ){  
        const li = document.createElement("li")
        li.textContent = ` ${hours[i]}  ${Math.floor(this.cookiesEachHour[i])} cookies `
        ul.appendChild(li)
    }
    const li = document.createElement("li")
    li.textContent = `Total: ${Math.floor(this.totalDailyCookies)} cookies`
    ul.appendChild(li)

    // add a data table
    const table = document.createElement("table");
    article.appendChild(table);

    // add the header row
    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    //add table header cells
    for (let i=0; i < hours.length; i++){
        let hoursHeaderCell = document.createElement("th")
        hoursHeaderCell.textContent = hours[i]
        headerRow.appendChild(hoursHeaderCell)
    }

    // // add data row
    // const dataRow = document.createElement("tr");
    // table.appendChild(dataRow);

    // // add data cell
    // let cookiesEH = document.createElement("td");
    // cookiesEH.textContent = this.cookiesEachHour;
    // dataRow.appendChild(cookiesEH);

  
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




