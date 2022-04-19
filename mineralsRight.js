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
for(let i = 0;  i < sidebarItems.length; i++) {
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

// on clicking ad% (save changes)
async function addRecord(){
    let url = '127.0.0.1:9100'; //Login URL, CHANGE TO THE CURRENT ONE

  //Take username and password from HTML 
  var mineral_Owner1 = document.getElementById("add-field-1").value;
  console.log('Mineral Owner 1:', mineral_Owner1);
  var interest_percentage1 = document.getElementById("add-field-2").value;
  console.log('Interest 1:', interest_percentage1);
  var net_Acres1 = document.getElementById("add-field-3").value;
  console.log('Document Type 1:', net_Acres1);
  
  var mineral_Owner2 = document.getElementById("add-field-4").value;
  console.log('Mineral Owner 2:', mineral_Owner2);
  var interest_percentage2 = document.getElementById("add-field-5").value;
  console.log('Interest 2:', interest_percentage2);
  var net_Acres2 = document.getElementById("add-field-6").value;
  console.log('Document Type 2:', net_Acres2);

  var mineral_Owner3 = document.getElementById("add-field-7").value;
  console.log('Mineral Owner 3:', mineral_Owner3);
  var interest_percentage3 = document.getElementById("add-field-8").value;
  console.log('Interest 3:', interest_percentage3);
  var net_Acres3 = document.getElementById("add-field-9").value;
  console.log('Document Type 3:',net_Acres3);

 
    const data = {mineral_own1: mineral_Owner1, 
      interest_per1 : interest_percentage1,
      net_acre1 : net_Acres1,
      mineral_own2: mineral_Owner2, 
      interest_per2 : interest_percentage2,
      net_acre2 : net_Acres2,
      mineral_own3: mineral_Owner3, 
      interest_per3 : interest_percentage3,
      net_acre3 : net_Acres3,
    }

  //Fetch function to back-end
  const response = await fetch(url, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
        //If add success

        //If add fail

        //Exception  
      
    })

    console.log("Record Added");
    // Resetting input fields
    document.getElementById('add-field-1').value = '';
    document.getElementById('add-field-2').value = '';
    document.getElementById('add-field-3').value = '';
    document.getElementById('add-field-4').value = '';
    document.getElementById('add-field-5').value = '';
    document.getElementById('add-field-6').value = '';
    document.getElementById('add-field-7').value = '';
    document.getElementById('add-field-8').value = '';
    document.getElementById('add-field-9').value = '';
    document.getElementById('add-field-10').value = '';
    document.getElementById('add-field-11').value = '';
    document.getElementById('add-field-12').value = '';

    return response.json();
}