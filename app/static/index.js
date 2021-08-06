const companiesList = [];
const usersList = [];

const url = "http://localhost:3000/";

const usersAddress = url+"users";
const companiesAddress = url+"companies"

const tbody = document.querySelector("tbody");
let table = ""

window.onload = async function () {

  fetchUsers();

  fetchCompany();

}

function fetchUsers() {
  fetch(usersAddress)
    .then(res => res.json())
    .then(res =>{
      for( let i = 0; i<res.length; i++){
        usersList.push({
          name: res[i].name,
          email: res[i].email,
          companyNumber: res[i].uris.company.slice(11)
        });
      }
      console.log(usersList)
    })
}

function fetchCompany() {
  fetch(companiesAddress)
    .then(res => res.json())

    .then(res => {
      for (let i = 0; i < res.length; i++) {
        companiesList.push({
          companyNumber: res[i].name,
          users: []
        });
      }
      console.log(companiesList)
    })

    .then(()=>{ConnectUsersToCompany();})

    .then(()=>{SortCompaniesByUsers();})

    .then(()=>{insertCompanyInTable();})

    .then(()=> {
      const mainTable = document.querySelectorAll(".level-one")
      for (let i = 0; i < mainTable.length; i++) {
        mainTable[i].addEventListener("click", function () {

          let nextRow = this.nextElementSibling;
          let className = nextRow.getAttribute("class");
          while (className === "level-two") {

            if(nextRow.style.display === "table-row"){
              nextRow.style.display = "none";
            }else{
              nextRow.style.display = "table-row";
            }

            nextRow = nextRow.nextElementSibling;
            className = nextRow.getAttribute("class");
          }
        })
      }
    })
}

//Wstawiamy uzytkownika do tabeli users in company
function ConnectUsersToCompany() {
  for (let i = 0; i < usersList.length; i++) {
    const companyNumber = usersList[i].companyNumber;
    const companyUserName = usersList[i].name;
    companiesList[companyNumber].users.push(companyUserName);
  }
}

//Sortujemy firmy po ilosc uzytkownikow
function SortCompaniesByUsers(){
  companiesList.sort(function (a, b) {
    return a.users.length - b.users.length;
  })
}

//wstawiamy firmy do tabeli
function insertCompanyInTable() {


  for(let i = 0; i <companiesList.length; i++) {

      table += `<tr class="level-one">
                                    <td>${i+1}</td>                                                              
                                    <td>${companiesList[i].companyNumber}</td>
                                    <td>${companiesList[i].users.length}</td>
                                </tr>`
    if (companiesList[i].users.length >= 1) {
      table += `<thead>
                                        <tr class="level-two">
                                            <th class="th-level-two" scope="col">#</th>
                                            <th class="th-level-two" scope="col">User Name</th>
                                            <th class="th-level-two" scope="col">Email</th>
                                        </tr>
                                  </thead> `
      insertUsersInTable(i);
    }
  }
  tbody.innerHTML = table
}

//wstawiamy uzytkownikow do tabeli
function insertUsersInTable(i) {
  for (let j = 0; j < companiesList[i].users.length; j++) {
    const userIndex = companiesList[i].users[j].slice(5)
    table += `<tr class="level-two">
                    <td>${j+1}</td>                                                              
                    <td>${usersList[userIndex].name}</td>
                    <td>${usersList[userIndex].email}</td>
                  </tr>`
  }
}




