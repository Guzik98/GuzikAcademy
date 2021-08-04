const companiesList = [];
const usersList = [];

const url = "http://localhost:3000/";

const usersAddress = url+"users";
const companiesAddress = url+"companies"

const tbody = document.querySelector("tbody");
let table = ""

window.onload = function () {

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
    })

    .then(()=>{ConnectUsersToCompany();})

    .then(()=>{SortCompaniesByUsers();})

    .then(()=>{insertCompanyInTable();})
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

  let id = 0;
  for(let i = 0; i <companiesList.length; i++) {

    if (companiesList[i].users.length >= 1) {
      id += 1;
      table += `<tr onclick="showRow()" class="level-1">
                                    <td>${id}</td>                                                              
                                    <td>${companiesList[i].companyNumber}</td>
                                    <td>${companiesList[i].users.length}</td>
                                </tr>`
      table += `<thead >
                                        <tr class="level-2">
                                            <th scope="col">#</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>`
      insertUsersInTable(i);
    }
  }
  tbody.innerHTML = table
}

//wstawiamy uzytkownikow do tabeli
function insertUsersInTable(i) {
  for (let j = 0; j < companiesList[i].users.length; j++) {
    const userIndex = companiesList[i].users[j].slice(5)
    table += `<tr class="level-2">
                    <td >${j+1}</td>                                                              
                    <td>${usersList[userIndex].name}</td>
                    <td>${usersList[userIndex].email}</td>
                  </tr>`
  }
}

//funkcja do rozwijania tabeli
function showRow() {
  $(".level-1").on("click",function () {
    let target = $(this).nextUntil(".level-1");
    $(target).toggle();
  });
}




