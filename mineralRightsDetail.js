const sidebar = document.querySelector('.sidebar');
const navToggleOpen = document.querySelector('.hamburger-toggle.open');
const navToggleClose = document.querySelector('.hamburger-toggle.close');

const sidebarItems = document.querySelectorAll('.sidebar-nav-item-link');
const sidebarLogoutItem = document.querySelector('#sidebar-logout-item');
const headerLogoutButton = document.querySelector('#header-logout-button');

const updateWindow = document.querySelector('.add-record-window');
fieldTexts = document.getElementsByClassName('field-text');
inputFields = document.getElementsByClassName('input-field');
editFieldTexts = document.getElementsByClassName('edit-field-text');

// clicking the hamburger menu icon -> sidebar is opened 
navToggleOpen.addEventListener('click', () => {
    console.log("Opened sidebar");
    sidebar.setAttribute("data-visible", true);
    updateWindow.setAttribute("sidebar-open", true);
})

// clicking the close menu icon -> sidebar is closed 
navToggleClose.addEventListener('click', () => {
    console.log("Closed sidebar 1");
    sidebar.setAttribute("data-visible", false);
    updateWindow.setAttribute("sidebar-open", false);
})

// when sidebar is opened, clicking any nav item -> sidebar is closed
for (let i = 0; i < sidebarItems.length; i++) {
    sidebarItems[i].addEventListener('click', () => {
        console.log("Closed sidebar 2");
        sidebar.setAttribute("data-visible", false)
        updateWindow.setAttribute("sidebar-open", false);
    })
}

// when window size is less than 400px and sidebar is open -> move logout button from header to sidebar
window.addEventListener('resize', () => {
    if (window.innerWidth < '390' && sidebar.getAttribute('data-visible') === 'true') {
        console.log('Log out button on header IS NOT visible');
        sidebarLogoutItem.setAttribute('data-visible', true);
        headerLogoutButton.setAttribute('data-visible', false);
    } else {
        console.log('Log out button on header IS visible');
        sidebarLogoutItem.setAttribute('data-visible', false);
        headerLogoutButton.setAttribute('data-visible', true);
    }
})
//Backend API URL, CHANGE TO THE CURRENT ONE
let url = '127.0.0.1:9100';

//Declare empty string variable to store Project Id
let projectID = "";

//Get Project ID (using GetID() from API)
async function getProjectID() {
    let response = await fetch(url); // IN CASE GET AND POST FUNCTION IS FROM DIFFERENT URL, CHANGE THIS!!!!!
    let data = await response.text();
    projectID = data; //Get the Project ID
    //Update the new Project ID into the text field in HTML
    var HTML_Project_ID_Field = document.getElementById("project-id-field");
    HTML_Project_ID_Field.innerHTML = projectID;
    console.log(data); //Log project Id to console

}

//Table Script
class mineralEntry {
    constructor(mineral_mineralID,
        mineral_projectID,
        mineral_mineralOwner,
        mineral_interest,
        mineral_netAcres
        ) {
        this.mineral_mineralID = mineral_mineralID;
        this.mineral_projectID = mineral_projectID;
        this.mineral_mineralOwner = mineral_mineralOwner;
        this.mineral_interest = mineral_interest;
        this.mineral_netAcres = mineral_netAcres;
  
    }
}
//Example data - after API works, data will be obtain through backend API
let mineral_entry = [];
mineral_entry[0] = new mineralEntry(
    'd4a6yi',
    'c18990',
    '3ll1um',
    'richardson',
    6649,
    1122,
    'Richardson Well 1',
    1,
    'good',
    'David Simpson')

mineral_entry[1] = new mineralEntry(
    'd4ahh8',
    'c18990',
    '3ll1um',
    'plano',
    6649,
    1124,
    'Plano Well 1',
    1,
    'good',
    'David Simpson')

mineral_entry[2] = new mineralEntry(
    'd4afti',
    'c18990',
    '3ll1um',
    'plano',
    6649,
    1126,
    'Richardson Well 2',
    2,
    'good',
    'David Simpson')

//Number of entry obtained from backend 
let mineral_numEntry = 3;

//Obtain the value of entries and put to HTML

//Table add and edit script

function edit_row(num) {
    document.getElementById("edit_button" + num).style.display = "none";
    document.getElementById("save_button" + num).style.display = "inline";

    var mineralID = document.getElementById("mineralID_row" + num);
    var projectID = document.getElementById("projectID_row" + num);
    var mineralOwner = document.getElementById("mineralOwner_row" + num);
    var interest = document.getElementById("interest_row" + num);
    var netAcres = document.getElementById("netAcres_row" + num);

    var mineralID_data = mineralID.innerHTML;
    var mineralOwner_data = mineralOwner.innerHTML;
    var projectID_data = projectID.innerHTML;
    var interest_data = interest.innerHTML;
    var netAcres_data = netAcres.innerHTML;

    mineralID.innerHTML = "<input type='text' class ='add-row-input' id='mineralID_text" + num + "' value='" + mineralID_data + "'>";
    mineralOwner.innerHTML = "<input type='text' class ='add-row-input' id='mineralOwner_text" + num + "' value='" + mineralOwner_data + "'>";
    projectID.innerHTML = "<input type='text' class ='add-row-input' id='projectID_text" + num + "' value='" + projectID_data + "'>";
    interest.innerHTML = "<input type='text' class ='add-row-input' id='interest_text" + num + "' value='" + interest_data + "'>";
    netAcres.innerHTML = "<input type='text' class ='add-row-input' id='netAcres_text" + num + "' value='" + netAcres_data + "'>";
}

function save_row(num) {
    var mineralID_val = document.getElementById("mineralID_text" + num).value;
    var mineralOwner_val = document.getElementById("mineralOwner_text" + num).value;
    var projectID_val = document.getElementById("projectID_text" + num).value;
    var interest_val = document.getElementById("interest_text" + num).value;
    var netAcres_val = document.getElementById("netAcres_text" + num).value;

    document.getElementById("mineralID_row" + num).innerHTML = mineralID_val;
    document.getElementById("mineralOwner_row" + num).innerHTML = mineralOwner_val;
    document.getElementById("projectID_row" + num).innerHTML = projectID_val;
    document.getElementById("interest_row" + num).innerHTML = interest_val;
    document.getElementById("netAcres_row" + num).innerHTML = netAcres_val;
    document.getElementById("edit_button" + num).style.display = "inline";
    document.getElementById("save_button" + num).style.display = "none";
}

function delete_row(num) {
    document.getElementById("row" + num + "").outerHTML = "";
}

function add_row() {
    var new_mineralID = document.getElementById("new_mineralID").value;
    var new_mineralOwner = document.getElementById("new_mineralOwner").value;
    var new_projectID = document.getElementById("new_projectID").value;
    var new_interest = document.getElementById("new_interest").value;
    var new_netAcres = document.getElementById("new_netAcres").value;

    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='mineralID_row" + table_len + "'>" + new_mineralID 
    + "</td><td id='mineralOwner_row" + table_len + "'>" + new_mineralOwner 
    + "</td><td id='projectID_row" + table_len + "'>" + new_projectID
    + "</td><td id='interest_row" + table_len + "'>" + new_interest
    + "</td><td id='netAcres_row" + table_len + "'>" + new_netAcres  
    + "</td><td class ='action-column'><input type='button' class='well-button' id='edit_button" + table_len + "' value='Edit' onclick='edit_row(" + table_len + ")'> <input type='button' class='well-button' id='save_button" + table_len + "' value='Save' onclick='save_row(" + table_len + ")'style='display:none;''> <input type='button' class='well-button' value='Delete' onclick='delete_row(" + table_len + ")'></td></tr>";

    document.getElementById("new_mineralID").value = "";
    document.getElementById("new_mineralOwner").value = "";
    document.getElementById("new_projectID").value = "";
    document.getElementById("new_interest").value = "";
    document.getElementById("new_netAcres").value = "";
  
}






//Modal 
// Get the modal
var modal_add = document.getElementById("modal-add");

// Get the button that opens the modal
var button_add = document.getElementById("button-bar-add");

// Get the <span> element that closes the modal
var close_button = document.getElementById("modal-add-close");

// Open Modal on button click
button_add.onclick = function() {
  modal_add.style.display = "block";
}

// Close Modal when clicking on "x"
close_button.onclick = function() {
  modal_add.style.display = "none";
}

// Close Modal when clicking outside of the box
window.onclick = function(event) {
  if (event.target == modal_add) {
    modal_add.style.display = "none";
  }
}

/* Add Row for Modal Form*/
function add_row_modal() {
    var new_mineralID = document.getElementById("add-field-1").value;
    var new_mineralOwner = document.getElementById("add-field-2").value;
    var new_projectID = document.getElementById("add-field-3").value;
    var new_interest = document.getElementById("add-field-4").value;
    var new_netAcres = document.getElementById("add-field-5").value;


    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='mineralID_row" + table_len + "'>" + new_mineralID 
    + "</td><td id='mineralOwner_row" + table_len + "'>" + new_mineralOwner 
    + "</td><td id='projectID_row" + table_len + "'>" + new_projectID
    + "</td><td id='interest_row" + table_len + "'>" + new_interest
    + "</td><td id='netAcres_row" + table_len + "'>" + new_netAcres 
    + "</td><td class ='action-column'><input type='button' class='well-button' id='edit_button" + table_len + "' value='Edit' onclick='edit_row(" + table_len + ")'> <input type='button' class='well-button' id='save_button" + table_len + "' value='Save' onclick='save_row(" + table_len + ")'style='display:none;''> <input type='button' class='well-button' value='Delete' onclick='delete_row(" + table_len + ")'></td></tr>";

    document.getElementById("new_mineralID").value = "";
    document.getElementById("new_mineralOwner").value = "";
    document.getElementById("new_projectID").value = "";
    document.getElementById("new_interest").value = "";
    document.getElementById("new_netAcres").value = "";
   

    //Close Modal
    modal_add.style.display = "none";
}