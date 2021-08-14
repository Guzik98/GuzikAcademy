const url = "http://localhost:3000/";

const usersAddress = url+"users";
const companiesAddress = url+"companies"

const tbody = document.querySelector("tbody");

const userData = fetch(usersAddress);
const companyData = fetch(companiesAddress);

let usersAndCompanies = [];

document.addEventListener("DOMContentLoaded", () => {
  parseData();
})

//parsowanie danych
function parseData() {
  Promise.all([userData,companyData])
    .then((file) => {
      const userFile = file[0].json();
      const companyFile = file[1].json();
      processData(userFile, companyFile);
    })
    .catch(err => alert("sprawdz czy serwer działa \n kod: " + err)
    )
}

//procesowanie danych
function processData(userFile,companyFile){
  Promise.all([userFile,companyFile])
    .then(data => {
      connectUsersToCompany(data)
      insertDataInHtml()
    })
    .catch((err) => {alert(err.message)});
}

//laczenie uzytkonikow i firm w jedna nowa liste
function connectUsersToCompany(data) {
  usersAndCompanies = data[1].map(index => {
    return {companyName: index.name, users: []}
  });

  data[0].forEach(index => {
    const companyNumber = index.uris.company.slice(11);
    const name = index.name;
    const email = index.email;
    usersAndCompanies[companyNumber].users.push({name: name, email: email})
  })
  sortingByNumberOfUsers()
}

//sortowanie po ilośc uzytkowników
const sortingByNumberOfUsers = () => {
  usersAndCompanies.sort((a,b) => {
    return a.users.length - b.users.length;
  })
}

//wstawienie do tabeli html
function insertDataInHtml() {
  let companyCounter = 0;
  let table = ""
  table += usersAndCompanies.map((companyIndex) => {
    companyCounter++;
    if (companyIndex.users.length === 0) {
      return  insertCompany(companyIndex,companyCounter);
    } else {
      return insertCompany(companyIndex,companyCounter) + usersThead() + insertUsersInTable(companyIndex);
    }
  })
  table = table.replace(/,/g, '');
  tbody.innerHTML=table;
  showRow();
}

//tabela html firm
function insertCompany(companyIndex, companyCounter) {
   return `<tr class="company-level">
                <td>${companyCounter}</td>                                                              
                <td>${companyIndex.companyName}</td>
                <td>${companyIndex.users.length}</td>
              </tr>`
}

// wstawianie naglowka uzytkownikow
const usersThead = () => {
    return `<thead>
                   <tr class="user-level">
                       <th class="th-user-level scope="col">#</th>
                       <th class="th-user-level" scope="col">User Name</th>
                       <th class="th-user-level" scope="col">Email</th>
                   </tr>
             </thead>`
}

//wstawiamy uzytkownikow do tabeli html
function insertUsersInTable(companyIndex) {
  let userCounter = 1;
  return companyIndex.users.map((userIndex) =>{
    userCounter++
    return userTable(userIndex, userCounter);
  })
}

//tabela uzytkownikow
function userTable(userIndex, userCounter){
  return `<tr class="user-level">
                  <td>${userCounter}</td>
                  <td>${userIndex.name}</td>
                  <td>${userIndex.email}</td>
             </tr>`
}

//rozwijanie tabeli
function showRow (){
  const mainTable = document.querySelectorAll(".company-level")
  for (let i = 0; i < mainTable.length; i++) {
    mainTable[i].addEventListener("click",  function (){
      let nextRow = this.nextElementSibling;
      let className = nextRow.getAttribute("class");
      toggle(nextRow,className)
    })
  }
}

function toggle(nextRow, className) {
  while (className === "user-level") {
    if (nextRow.style.display === "table-row") {
      nextRow.style.display = "none";
    } else {
      nextRow.style.display = "table-row";
    }
    nextRow = nextRow.nextElementSibling;
    className = nextRow.getAttribute("class");
  }
}