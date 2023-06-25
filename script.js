"use strict";

const parentElement = document.getElementById("shops");
const newStoreForm = document.getElementById("new-store-form");
const parentElement_2 = document.getElementById("staff")


//Create article & table
const storeTable = document.createElement("table");
parentElement.appendChild(storeTable);
const staffTable = document.createElement("table");
parentElement_2.appendChild(staffTable);
 
//Hours & rate
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];
const rate = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6]

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
    this.staffNeeded = [];
    this.totalDailyCookies = 0;
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();
    this.newStore();
    this.render();
    this.renderStaff();
}

// Creates random number and pushes it to customer each hour.
Store.prototype.calcCustomersEachHour = function(){
    for (let i = 0; i < hours.length; i++ ){
        this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour)*rate[i])
    }
}

//Calculates the cookies each hour based on the random number of customers times the average cookies sold per customer at that location, and adds it to a total sum. 
Store.prototype.calcCookiesEachHour = function(){
    for (let i = 0; i < hours.length; i++){
        let multi = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCust);
        this.cookiesEachHour.push(multi);

        this.totalDailyCookies += multi;
        this.staffNeeded.push(Math.ceil(this.cookiesEachHour[i]/20));
    }
    console.log(this.staffNeeded)
}

//Push new store to the new store array
Store.prototype.newStore = function(){
    newStores.push(this);
}

//Add storeHeader
function tableHeader(table){
     // Add table HEADER ROW:
     const headerRow = document.createElement("thead");
     table.appendChild(headerRow);

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
tableHeader(storeTable);    
tableHeader(staffTable);

//Render function for hte main body of the table
Store.prototype.render = function(){
    // Add DATA ROW:
    const dataRow = document.createElement("tr");
    storeTable.appendChild(dataRow);

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

//Render function for hte main body of the table
Store.prototype.renderStaff = function(){
    // Add DATA ROW:
    const dataRow = document.createElement("tr");
    staffTable.appendChild(dataRow);

    // Add COLUMN 1: City names:
    let cities = document.createElement("th")
    cities.textContent = this.storeName
    dataRow.appendChild(cities)
    
    // Add DATA: Staff  Each Hour:
    for (let i = 0; i < hours.length; i++){
        let staffEH = document.createElement("td");
        staffEH.textContent = this.staffNeeded[i];
        dataRow.appendChild(staffEH);
    }

    // // Add DATA: Total Daily Staff:
    // let totalNum = document.createElement("th")
    // totalNum.textContent = this.totalDailyCookies
    // dataRow.appendChild(totalNum)
  
}

// Hard coded Stores
function hardCodeStores(){
    const seattle = new Store("Seattle", 23, 65, 6.3);
    const tokyo = new Store("Tokyo", 3, 24, 1.2);
    const dubai = new Store("Dubai", 11, 38, 3.7);
    const paris = new Store("Paris", 20, 38, 2.3);
    const lima = new Store("Lima", 2, 16, 4.6);
}
hardCodeStores();

newStoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Hi")
    storeTable.innerHTML = "";
    tableHeader();

    for (let i=0; i < newStores.length; i++){
        newStores[i].render();
    }

    const storeNameInput = event.target.name.value;
    const minCustInput = event.target.minCust.value;
    const maxCustInput = event.target.maxCust.value;
    const avgCookiesInput = event.target.avgCookies.value;

    const store = new Store(storeNameInput, minCustInput, maxCustInput, avgCookiesInput);

    newStoreForm.reset();
    tableFooter()
})

// Add footer to the table with hourly totals
function tableFooter(table){
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
tableFooter(storeTable);

// Add footer to the table with hourly totals
function tableFooter(table){
    const footerRow = document.createElement("tfoot");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Hourly Totals"
    tr.appendChild(th)

    for (let i = 0; i < hours.length; i++) {
        const th = document.createElement("th");
        let hoursAdded = 0;
        for (let j = 0; j < newStores.length; j++) {
            const hourAmount = newStores[j].staffNeeded[i];
            hoursAdded += hourAmount;
        }
        th.textContent = hoursAdded;
        tr.appendChild(th);
    }

    footerRow.appendChild(tr)
    table.appendChild(footerRow)

}
tableFooter(staffTable)
