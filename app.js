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

const store = [
    {location:"Seattle", contact: "123-456-7890", address: "2901 3rd Ave #300, Seattle, WA 98121"},
    {location:"Tokyo", contact: "222-222-2222", address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-8634"},
    {location:"Dubai", contact: "333-333-3333", address: "1 Sheikh Mohammed bin Rashid Blvd - Dubai"},
    {location:"Paris", contact: "444-444-4444", address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris"},
    {location:"Lima", contact: "555-555-5555", address: "Ca. Gral. Borgono cuadra 8, Miraflores 15704"}
]

function pageload() {
    tablehead();
    tablefooter(); 
}
window.onload = pageload();

//Generate Store Data
function store_data() {
    for (let i = 0; i < store.length; i++) {
        let tag = document.createElement("div");
        tag.setAttribute("id",store[i].location);
        
        let location = document.createElement("h2");
        location.textContent = store[i].location;
        tag.appendChild(location);
        
        let store_hr = document.createElement("p");
        store_hr.textContent = "Hours Open: 6am - 7pm";
        tag.appendChild(store_hr);
        
        let contact = document.createElement("p");
        contact.textContent = "Contact Info: " + store[i].contact;
        tag.appendChild(contact);

        let add = document.createElement("p");
        add.textContent = "Location: " + store[i].address;
        tag.appendChild(add);

        document.getElementById("store_info").appendChild(tag);
    }
}

function tablehead() {
    let table = document.getElementById("table_sales");
    //new header row creation
    let headerRow = document.createElement("tr");
    headerRow.setAttribute("id","thead");
    //make header cells
    for (let i=0; i<hr.length+2;i++) {
        let headerCell = document.createElement("th");
        if (i == 0) {
            headerCell.textContent = "Locations";
        } else if (i == hr.length+1) {
            headerCell.textContent = "Location Totals";
        } else {
            headerCell.textContent = hr[i-1];
        }
        //add header cells to header row
        headerRow.appendChild(headerCell);    
    }
    //add header row to table
    table.appendChild(headerRow);
}

// JS Constructor Funtion Methods
function sale_instance(location,min_cus,max_cus,avg_sale) {
    this.location = location;
    this.min_cus = min_cus;
    this.max_cus = max_cus;
    this.avg_sale = avg_sale;
    this.saledata = function() {       
        let cus = Math.floor(Math.random()*(this.max_cus - this.min_cus + 1)) + this.min_cus;
        let sale = Math.round(cus*this.avg_sale);
        return sale;       
    }
    this.render = function() {
        let table = document.getElementById("table_sales");
        let x = table.rows.length;
        console.log(x);
        let row = table.insertRow(x-1);
            // data sales for each location
            total = 0;
            for (let y = 0; y < hr.length+2; y++) {
                let cell = row.insertCell(y);
                if (y == 0 ) {
                    cell.innerHTML = this.location;
                } else if (y == hr.length+1) {
                    cell.innerHTML = total;
                } else {
                    sale = this.saledata();
                    cell.innerHTML = sale;
                    total += sale;
                }
            }
        }
    }

const store1 = new sale_instance("Seattle",23,65,6.3);
store1.render();
const store2 = new sale_instance("Tokyo",3,24,1.2);
store2.render();
const store3 = new sale_instance("Dubai",11,38,3.7);
store3.render();
const store4 = new sale_instance("Paris",20,38,2.3);
store4.render();
const store5 = new sale_instance("Lima",2,16,4.6);
store5.render();


function sales() {
    //Generate sales
    for (let i=0; i < data.length; i++) {
        let min = data[i].min_cus;
        let max = data[i].max_cus;
        let avg_sales = data[i].avg_sale;
        let total = 0;
        let sales_data= [];
        for (let x=0; x < hr.length; x++) {
            let cus = Math.floor(Math.random()*(max - min + 1)) + min;
            let sales = Math.round(avg_sales*cus);                        
            sales_data.push(sales)
            total += sales;
        }
        Object.defineProperty(data[i], "sales_data", {value:sales_data});
        Object.defineProperty(data[i], "total", {value:total});
    }
    console.log(data)
}
    
    //make data sales table
function tabledata() {
    let table = document.getElementById("table_sales");
    for (let x = 0; x < data.length; x++) {
        let row = table.insertRow(x+1);
        // data sales for each location
        for (let y = 0; y < hr.length+2; y++) {
            let cell = row.insertCell(y);
            if (y == 0 ) {
                cell.innerHTML = data[x].location;
            } else if (y == hr.length+1) {
                cell.innerHTML = data[x].total;
            } else {
                cell.innerHTML = data[x].sales_data[y-1];
            }
        }
    }
}

function tablefooter() {
    // total sales by time at all locations
    let table = document.getElementById("table_sales");
    let a = table.rows.length;
    let row = table.insertRow(a);
    row.setAttribute("id","tfooter");            
    for (let y = 0; y < hr.length+2; y++) {
        cell = row.insertCell(y);
        if (y == 0) {
            cell.innerHTML = "Hourly Totals for All Locations";
        } else {
            cell.innerHTML = 0;
        }
    } 
}

function logSubmit(event) {
    event.preventDefault() //prevents the form from autosubmitting

    //Create an Object
    const list = new Object();
    
    //Add properties
    list.location = document.getElementById("location").value;
    list.min_cus = Number(document.getElementById("min_cus").value); 
    list.max_cus = Number(document.getElementById("max_cus").value); 
    list.avg_sale = Number(document.getElementById("avg_sale").value); 

    data.push(list);

    //Generate sales
    let i = data.length -1;    
    let min = data[i].min_cus;
    let max = data[i].max_cus;
    let avg_sales = data[i].avg_sale;
    let total = 0;
    let sales_data= [];
    for (let x=0; x < hr.length; x++) {
        let cus = Math.floor(Math.random()*(max - min + 1)) + min;
        let sales = Math.round(avg_sales*cus);                      
        sales_data.push(sales)
        total += sales;
    }
    Object.defineProperty(data[i], "sales_data", {value:sales_data});
    Object.defineProperty(data[i], "total", {value:total});
    
    console.log(data)

    let table = document.getElementById("table_sales");
    let row = table.insertRow(i+1);
    // data sales for added location
    for (let y = 0; y < hr.length+2; y++) {
        let cell = row.insertCell(y);
        if (y == 0 ) {
            cell.innerHTML = data[i].location;
        } else if (y == hr.length+1) {
            cell.innerHTML = data[i].total;
        } else {
            cell.innerHTML = data[i].sales_data[y-1];
        }
    }

    //change table footer
    let a = table.rows.length-1;
    console.log(a);
    let fter_row = table.rows[a].cells; 
    for (let y = 0; y < hr.length+2; y++) {
        if (y == 0) {
            fter_row[y].innerHTML = "Hourly Totals for All Locations";
        } else {
            let hr_total = 0;
            for (let z=0; z < data.length; z++) {
                if (y != hr.length+1) {
                    hr_total += data[z].sales_data[y-1];
                } else {
                    hr_total += data[z].total;
                }
            }
                fter_row[y].innerHTML = hr_total;
        }
    } 
}

var form = document.getElementById("form");
form.addEventListener("submit", logSubmit);



