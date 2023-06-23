"use strict";

const parentElement = document.getElementById("shops");
const newStoreForm = document.getElementById("new-store-form");

//Create article & table
// const article = document.createElement("article");
// parentElement.appendChild(article);
const table = document.createElement("table");
parentElement.appendChild(table);
 
//Hours
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

//Create random number
function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Empty array for new stores
const newStores = [];

// Constructor function for shops
function Store(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust){
    this.storeName = storeName;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgCookiesPerCust = avgCookiesPerCust;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0;
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();
    this.newStore();
    this.render();
}

// Creates random number and pushes it to customer each hour.
Store.prototype.calcCustomersEachHour = function(){
    for (let i = 0; i < hours.length; i++ ){
        this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour))
    }
    console.log(this.customersEachHour)
}

//Calculates the cookies each hour based on the random number of customers times the average cookies sold per customer at that location, and adds it to a total sum. 
Store.prototype.calcCookiesEachHour = function(){
    for (let i = 0; i < hours.length; i++){
        let multi = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCust);
        this.cookiesEachHour.push(multi);
        this.totalDailyCookies += multi;
    }
}

//Push new store to the new store array
Store.prototype.newStore = function(){
    newStores.push(this);
}

//Render table on the page

function tableHeader(){
     // Add table HEADER ROW:
     const headerRow = document.createElement("thead");
     table.appendChild(headerRow);

    //  let cities = document.createElement("Store Location");
    //  cities.textContent = "Store Name";
    //  headerRow.appendChild(cities);

    // Add HEADER COLUMN 1 (empty):
    let empty = document.createElement("td")
    empty.textContent = " "
    headerRow.appendChild(empty)
    
    // Add table HEADER CELLS (hours):
    for (let i=0; i < hours.length; i++){
        let hoursHeaderCell = document.createElement("th")
        hoursHeaderCell.textContent = hours[i]
        headerRow.appendChild(hoursHeaderCell)
    }

    //Add last column:
    let total = document.createElement("th")
    total.textContent = "Total"
    headerRow.appendChild(total)

}    
tableHeader();    

Store.prototype.render = function(){
    // Add DATA ROW:
    const dataRow = document.createElement("tr");
    table.appendChild(dataRow);

    // Add COLUMN 1: City names:
    let cities = document.createElement("th")
    cities.textContent = this.storeName
    dataRow.appendChild(cities)
    
    // Add DATA: Cookies Each Hour:
    for (let i = 0; i < hours.length; i++){
        let cookiesEH = document.createElement("td");
        cookiesEH.textContent = this.cookiesEachHour[i];
        dataRow.appendChild(cookiesEH);
    }

    // Add DATA: Total Daily Cookies:
    let totalNum = document.createElement("th")
    totalNum.textContent = this.totalDailyCookies
    dataRow.appendChild(totalNum)
  
}



const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubai = new Store("Dubai", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);



  function tableFooter(){
    const footerRow = document.createElement("tfoot");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Hourly Totals"
    tr.appendChild(th)

    for (let i = 0; i < hours.length; i++) {
        const th = document.createElement("th");
        let hoursAdded = 0;
        for (let j = 0; j < newStores.length; j++) {
            const hourAmount = newStores[j].cookiesEachHour[i];
            hoursAdded += hourAmount;
        }
        th.textContent = hoursAdded;
        tr.appendChild(th);
    }


    let totalTotals = 0;
    for (let i = 0; i < newStores.length; i++) {
      totalTotals += newStores[i].totalDailyCookies;
    }
    const totalsCell = document.createElement("td");
    totalsCell.textContent = totalTotals;
    tr.appendChild(totalsCell);
    footerRow.appendChild(tr)
    table.appendChild(footerRow)

  }
  tableFooter()


console.log(seattle)
console.log(tokyo)
console.log(dubai)
console.log(paris)
console.log(lima)




