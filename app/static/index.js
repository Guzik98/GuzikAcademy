const companiesList = [];
const usersList = [];

const url = "http://localhost:3000/";

const usersAddress = url+"users";
const companiesAddress = url+"companies"

const tbody = document.querySelector("tbody");
let table = ""
let fileNumber = 1;

document.addEventListener("DOMContentLoaded", () => {

  loadData().then(r =>{
    console.log(r)});
})

async  function loadData() {
  let userData = fetch(usersAddress);
  let companyData = fetch(companiesAddress);
  Promise.all([userData,companyData])
    .then((files) => {
      files.forEach(file =>{
        process(file.json())
      })
    })
    .catch(err => console.log(err)
    )
}

function process(prom) {
  prom.then(async (data) => {
    if (fileNumber === 1) {
      storeUserDataInList(data)
    } else {
      await storeCompanyDataInList(data)
      await ConnectUsersToCompany();
      await SortCompaniesByUsers();
      await insertCompanyInTable();
      await showRow()
    }
    fileNumber++;
  })
}

function storeCompanyDataInList(data) {
  for (let i = 0; i < data.length; i++) {
    companiesList.push({
      companyNumber: data[i].name,
      users: []
    });
  }
  console.log(companiesList)
}

  function storeUserDataInList(data) {
    for (let i = 0; i < data.length; i++) {
      usersList.push({
        name: data[i].name,
        email: data[i].email,
        companyNumber: data[i].uris.company.slice(11)
      });
    }
    console.log(usersList)
  }


//Wstawiamy uzytkownika do tabeli users in company
  function ConnectUsersToCompany() {
    for (let i = 0; i < usersList.length; i++) {
      const companyNumber = usersList[i].companyNumber;
      const companyUserName = usersList[i].name;
      companiesList[companyNumber].users.push(companyUserName);
    }
    console.log(companiesList);
  }

//Sortujemy firmy po ilosc uzytkownikow
  function SortCompaniesByUsers() {
    companiesList.sort(function (a, b) {
      return a.users.length - b.users.length;
    })
    console.log(companiesList);
  }

//wstawiamy firmy do tabeli
  function insertCompanyInTable() {


    for (let i = 0; i < companiesList.length; i++) {

      table += `<tr class="level-one">
                                    <td>${i + 1}</td>                                                              
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
                    <td>${j + 1}</td>                                                              
                    <td>${usersList[userIndex].name}</td>
                    <td>${usersList[userIndex].email}</td>
                  </tr>`
    }
}

//rozwijanie tabeli
function showRow (){
  const mainTable = document.querySelectorAll(".level-one")
  for (let i = 0; i < mainTable.length; i++) {
    mainTable[i].addEventListener("click", function () {
      let nextRow = this.nextElementSibling;
      let className = nextRow.getAttribute("class");
      while (className === "level-two") {

        if (nextRow.style.display === "table-row") {
          nextRow.style.display = "none";
        } else {
          nextRow.style.display = "table-row";
        }

        nextRow = nextRow.nextElementSibling;
        className = nextRow.getAttribute("class");
      }
    })
  }
}





