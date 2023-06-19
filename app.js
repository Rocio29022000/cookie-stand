"use strict";

const parentElement = document.getElementById("shops")

//Hours
const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

//Create objet for First shop: Seattle

const seattle = {
    storeName: "Seattle",
    minCustPerHour: 23,
    maxCustPerHour: 65,
    avgCookiesPerCust: 6.3,
    customersEachHour: [],
    cookiesEachHour: [],
    totalDailyCookies: 0,
    calcCustomersEachHour: function(){
        for (let i = 0; i < hours.length; i++ ){
            this.customersEachHour.push(randomCust(this.minCustPerHour, this.maxCustPerHour))
        }
        console.log(this.customersEachHour)
    },
    calcCookiesEachHour: function(){
        console.log("hi")
    },
    render: function(){
        this.calcCustomersEachHour()
        const article = document.createElement("article");
        parentElement.appendChild(article);
        const h3 = document.createElement("h3");
        h3.textContent = this.storeName;
        article.appendChild(h3);
        const ul = document.createElement("ul");
        article.appendChild(ul);
        for (let i = 0; i < hours.length; i++ ){  
            const li = document.createElement("li")
            li.textContent = ` ${hours[i]}  ${this.cookiesEachHour[i]} cookies `
            ul.appendChild(li)
        }
    }
    
    
}

seattle.render()

//function to generate random customers
function randomCust(min,max){
    return Math.floor(Math.random()* (max - min + 1 ) + min)
    // let randCustNum = []
    // for (let i = 0; i < hours.length; i++){
    //     randCustNum[i] = Math.floor(Math.random() * (max - min + 1) + min);
    // }
    // return randCustNum;

}

// console.log(randomCust(seattle.minCustPerHour, seattle.maxCustPerHour))

// console.log(seattle.totalDailyCookies())

// totalDailyCookies: function(){
    //     let totalDailyCookies = 0
    //     console.log(this.cookiesEachHour.length)
    //     for (let i = 0; i < this.cookiesEachHour.length; i++){
    //         totalDailyCookies += this.cookiesEachHour[i];
    //     }
    //     return totalDailyCookies
    // }
