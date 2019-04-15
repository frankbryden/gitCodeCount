class User{
    constructor(name){
        this.name = name;
        this.code = 0;
    }
}

var xhr = new XMLHttpRequest()
xhr.addEventListener("load", ev => {
    console.log("we're ready");
    var jsonData = JSON.parse(ev.target.responseText);
    processResults(jsonData);
});
xhr.onreadystatechange = (ev => {
    console.log(ev.readyState);
    console.log(ev);
})
xhr.open('GET', 'https://api.github.com/repos/frankbryden/seg20/stats/contributors');
xhr.send();

//update gui
function processResults(results){
    //Results is a list of users
    /*var user1 = new User("Jash");
    var user2 = new User("Jasmine");
    var user3 = new User("Frankie");

    user1.code = 200;
    user2.code = 300;
    user3.code = 4000;
    */
    let users = [];

    for (result of results){
        console.log(result);
        users.push(processUser(result));
    }
    
    for (var user of users){
        addUserToTable(user);
    }
}

// Called for each user. Sums up the contributions using the processWeeks function. Returns a User.
function processUser(userData){
    let user = new User(userData.author.login);
    user.code = processWeeks(userData.weeks);
    console.log(user);
    return user;
}

//Sums up additions/deletions for a user using the weeks.
// weeks is a list of objects containing the detailed stats for that week
function processWeeks(weeks){
    return weeks.map(week => week.a - week.d).reduce( (acc, val) => acc + val);
}

function addUserToTable(user){
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let codeCount = document.createElement("td");

    name.innerHTML = user.name;
    codeCount.innerHTML = user.code;

    row.appendChild(name);
    row.appendChild(codeCount);
    codeContTable.appendChild(row);
}

var codeContTable;
var contributionsData = null;

document.addEventListener("DOMContentLoaded", () => {
    codeContTable = document.getElementById("codeContTable");
    //processResults({});
}); 