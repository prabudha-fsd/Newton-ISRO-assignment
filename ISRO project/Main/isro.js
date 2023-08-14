let centerData     // Global data storing

// API data fetch
async function fetchData() {
    try {
        const resp = await fetch("https://isro.vercel.app/api/centres");  // -- fetching the API data
        let data = await resp.json();
        // -- console.log(data);
        centerData = data.centres;
        render(centerData);           // -- Initially render all the data from API
    }
    catch (error) {
        console.log(error);
    }
}

let btnFlag = false;  // -- Global flag for buttons

// ** Rendering the data in div by creacting tables. ** //

function render(data) {
    
    const tdiv = document.getElementById("tabled");   // Getting the div from html
    const table = document.createElement("table");    // Creating the table element
    const tbody = document.createElement("tbody");    // Creating the table body.
    const val = ["name", "Place", "State"];

    data.forEach(itm => {           // For each loop to traverse on each data        

        const row = document.createElement("tr");  // -- Rows
        row.classList.add("row"); 
                    // Row class
        val.forEach((heads, idx) => {
            // Getting each value from val array
            const cell = document.createElement("td");   // -- Creating table data

            let a = "";
            if (idx === 0) {
                a = "CENTER";
            } else if (idx === 1) {                 // -- Assigning values
                a = "CITY";
            } else {
                a = "STATE";
            }

            // Writing the head values and the data from the API into the table data
            cell.innerHTML = `<div class="head"> ${a} </div> <div class="tdata"> ${itm[heads]} </div>`;

            // Appending table data in the row
            row.appendChild(cell);

        });
        // Appending the row in the table body
        tbody.appendChild(row);
    });
    // Appending the table body in the table.
    table.appendChild(tbody);

    // Appending the table in the div.
    tdiv.appendChild(table);
}

// ** Search and filter logic ** //
function searchBar(e) {
    const result = document.getElementById("tabled");                 // Fetch the results div to clear the initial data
    let input = document.getElementById("search").value.trim();   // Get user input values 
    if (input === "") {
        alert("Enter Details!")
        btnFlag = true;                // If the user input value is not fed than clear the result div and render the data again
        result.innerHTML = "";
        render(centerData);
    } else {
        result.innerHTML = "";
        btnFlag = false;
        let searchBy = e.id;
        let data = [];             // Else get the value from input from clicked button
        let i = 0;
        let val = 0;

        if(input.toLowerCase() === "punjab" || input.toLowerCase() === "haryana"){
              input = "punjab/haryana";  
        }

        centerData.forEach(itm => {        // Traversing on the whole API data
            if (input.toLowerCase() === itm[searchBy].toLowerCase()) {   // Check if input and button clicked value is same 
                data[i] = itm;                                           // and the value is present in the API
                i++;
                val = 1;
            }
        });

        if (val === 1) {
            render(data)
        }               // If the value is present only then values are rendered in the result div
        else {
            alert("Enter Valid Information!");
            btnFlag = true;                  // If the values dont match with api data than pop-up message is shown
            render(centerData);              // Then render the whole data
        }
    }
}

// ** Logic to applying the CSS and styling to the buttons after click ** //
function buttonRender() {
    let btnc = document.getElementById("name")
    let btns = document.getElementById("State");    // Getting the buttons using Id's
    let btnp = document.getElementById("Place");

    let flagc = false;
    let flags = false;
    let flagp = false;

    btnc.addEventListener("click", () => {             // Falling logic when button is clicked
        if (flagc || btnFlag) 
        {
            flagc = false;
            btnc.classList.remove('clicked');
            btns.classList.remove('clicked');       // If a button is already clicked then remove styling from all buttons
            btnp.classList.remove('clicked');       // Or even if  the global flag is true then remove all styling too
        } 
        else {
            flagc = true;
            btnc.classList.add('clicked');
            btns.classList.remove('clicked');       // When the button is clicked, add styling to the button
            flags = false;                          // and remove styling from other buttons
            btnp.classList.remove('clicked');
            flagp = false;
       
        }
    })


    btns.addEventListener("click", () => {          // Falling logic when button is clicked
        if (flags || btnFlag) {
            flags = false;
            btns.classList.remove('clicked');
            btnc.classList.remove('clicked');
            btnp.classList.remove('clicked');
        } else {
            flags = true;
            btns.classList.add('clicked');
            btnc.classList.remove('clicked');       // When button is clicked, add styling to the button
            flagc = false;                          // remove styling from other buttons
            btnp.classList.remove('clicked');
            flagp = false;
        }
    })


    btnp.addEventListener("click", () => {         // Falling logic when button is clicked
        if (flagp || btnFlag) {
            flagp = false;
            btnp.classList.remove('clicked');
            btns.classList.remove('clicked');
            btnc.classList.remove('clicked');
        } else {
            flagp = true;
            btnp.classList.add('clicked');
            btns.classList.remove('clicked');       // When button is clicked, add styling to the button
            flags = false;                          // remove styling from other buttons
            btnc.classList.remove('clicked');
            flagc = false;
        }
    })
}
buttonRender()
fetchData()