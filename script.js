

/* Form IDs
 *  player          [text]
 *  playerCondition [option]
 *  year            [option]
 *  yearCondition   [option]
 *  gender          [option]
 *  tournament      [option]
 *  playerRank      [option]
 *  
 *  
 */

function populateTable() {

    //Get values from form
    var playerValue = document.getElementById("player").value;
    var playerConditionValue = document.getElementById("playerCondition").value;
    var yearValue = document.getElementById("year").value;
    var yearConditionValue = document.getElementById("yearCondition").value;
    var genderValue = document.getElementById("gender").value;
    var tournamentValue = document.getElementById("tournament").value;
    var playerRankValue = document.getElementById("playerRank").value;

    //Construct new elements
    var elem = document.getElementById("results");
    var row = document.createElement("tr");
    var year = document.createTextNode("Hello");
    var tournament = document.createTextNode("World");
    var winner = document.createTextNode("How");
    var runnerUp = document.createTextNode("Are You?");

    //Append to table
    row.appendChild(year);
    elem.appendChild(row);

    window.alert('Search complete!');
    window.alert(playerValue);
}

window.onload = function () {
    document.getElementById("searchButton").onclick = populateTable;
}