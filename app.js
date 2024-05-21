function sales() {
    //Data
    const data = [
        {location:"Seattle", min_cus:23, max_cus:65, avg_sale:6.3},
        {location:"Tokyo", min_cus:3, max_cus:24, avg_sale:1.2},
        {location:"Dubai", min_cus:11, max_cus:38, avg_sale:3.7},
        {location:"Paris", min_cus:20, max_cus:38, avg_sale:2.3},
        {location:"Lima", min_cus:2, max_cus:16, avg_sale:4.6},
    ]
    const hr = ["6am","7am","8am","9am","10am","11am","12pm",
    "1pm","2pm","3pm","4pm","5pm","6pm","7pm"]

    //Generate sales
    let text ="";
    for (let i=0; i < data.length; i++) {
        text += "<br>" + data[i].location + "<br>";
        let min = data[i].min_cus;
        let max = data[i].max_cus;
        let avg_sales = data[i].avg_sale;
        let total = 0;
        let sales_data= [];
        for (let x=0; x < hr.length; x++) {
            let cus = Math.floor(Math.random()*(max - min + 1)) + min;
            let sales = Math.round(avg_sales*cus);                        
            sales_data.push(sales)
            text += hr[x] + ": " + sales + " cookies <br>";
            total += sales;
        }
        text += "Total: "+ total + " cookies <br>";
        Object.defineProperty(data[i], "sales_data", {value:sales_data});
        Object.defineProperty(data[i], "total", {value:total});
    }
    document.getElementById("data").innerHTML = text; 
}
