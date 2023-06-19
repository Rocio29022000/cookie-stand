"use strict";

const parentElement = document.getElementById("shops")
console.log(parentElement)


//Create objet for First shop: Seattle

const seattle = {
    minCustPerHour: 0,
    maxCustPerHour: 0,
    avgCookiesPerCust: 0,
    customersEachHour: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    cookiesEachHour: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    totalDailyCookies: function(){
        let totalDailyCookies = 0
        console.log(this.cookiesEachHour.length)
        for (let i = 0; i < this.cookiesEachHour.length; i++){
            totalDailyCookies += this.cookiesEachHour[i];
        }
        return totalDailyCookies
    }

}

console.log(seattle.minCustPerHour)

console.log(seattle.totalDailyCookies())



// function sumDailyCookies(){
    
// }