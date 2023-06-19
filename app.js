"use strict";

const parentElement = document.getElementById("shops")
console.log(parentElement)

//Hours
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

//Create objet for First shop: Seattle

const seattle = {
    storeName: "Seattle",
    minCustPerHour: 0,
    maxCustPerHour: 0,
    avgCookiesPerCust: 0,
    customersEachHour: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    cookiesEachHour: [16, 20, 35, 48, 56, 77, 93, 144, 119, 84, 61, 23, 42, 57],
    totalDailyCookies: 875,
    // totalDailyCookies: function(){
    //     let totalDailyCookies = 0
    //     console.log(this.cookiesEachHour.length)
    //     for (let i = 0; i < this.cookiesEachHour.length; i++){
    //         totalDailyCookies += this.cookiesEachHour[i];
    //     }
    //     return totalDailyCookies
    // }

}

console.log(seattle.minCustPerHour)

// console.log(seattle.totalDailyCookies())

//DOM manipulation

//article - as a container

const article = document.createElement("article");
parentElement.appendChild(article);

// h3 - store title

const h3 = document.createElement("h3");
h3.textContent = "Seattle";
article.appendChild(h3);

// ul for the list of hours and cookies sold

const ul = document.createElement("ul");
article.appendChild(ul);

// a loop to create each list item
for (let i = 0; i < hours.length; i++ ){  
    const li = document.createElement("li")
    li.textContent = ` ${hours[i]}  ${seattle.cookiesEachHour[i]} cookies `
    ul.appendChild(li)
}
