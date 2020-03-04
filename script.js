
/** An object containing references to json files. */
var files = {
    "mens": 'mens-grand-slam-winners.json',
    "womens": 'womens-grand-slam-winners.json'
};

/** Count of the number of search results, to be displayed in the results area*/
var resultsCount = 0;

/**
 * Returns true if year in the given range.
 * Alerts user if year not in range.
 * @param {string} year A year
 * @param {number} lower A lower limit
 * @param {number} upper An upper limit
 * @returns {boolean}
 */
function yearInRange(year, lower, upper){
    var value = parseInt(year);
    if (value < lower || value > upper){
        alert("Enter a year in the proper range, or leave blank. \n" +
            "Please enter a year between " + lower + " and " + upper);
        return false;
    }
    else
        return true;
}

/**
 * Resets results count to zero, and removes any entries from the results table.
 * Checks year is in range before proceeding.
 * Determines which json files to load.
 * Loads json files.
 * Calls resultsHandler for each file loaded.
 * @param {Object} files An object containing references to json files.
 */
function onClick(files) {
    resultsCount = 0;
    $("#resultsCount").empty();
    $('#results tr:gt(0)').remove();
    if (yearInRange($("#year").val(), 1870, 2021)){
        var g = $("#gender :selected").val();
        // Boolean values to determine if mens and/or womens files should be loaded
        var mens = g === "mens" || g === "both";
        var womens = g === "womens" || g === "both";
    
        if (mens) {
            $.getJSON(files.mens, function (file) {
                resultsHandler(file);
            });
        }
        if (womens) {
            $.getJSON(files.womens, function (file) {
                resultsHandler(file);
            });
        }
    }
}

/**
 * Iterates through the result elements and passes each element to the
 * resultValidator.
 * Updates the resultsCount HTML element with the number of results.
 * @param {string} file A json file name
 */
function resultsHandler(file) {
    $.each(file, function (index, element) {
        $.each(element, function (index, element) {
            resultValidator(index, element);
        });
		
		// Contructs string 'Search [searchterm] returned n result(s)'
        var searchterm = $("#player").val();
        document.getElementById("resultsCount").innerHTML =
            "Search "
            + (searchterm && $("#playerCondition").val() !== 'none' 
            ? "\"" + searchterm + "\"" : '')
            + " returned " + resultsCount
            + (resultsCount === 1 ? " result" : " results"
            );
    })
}

/**
 * Validates each result value according to the search criteria.
 * Passes validated values to addValidatedRow.
 * @param {number} index Index of the result element
 * @param {Object} element Content of the result element
 */
function resultValidator(index, element) {
    var year = element["year"];
    var tournament = element["tournament"];
    var winner = element["winner"];
    var runnerUp = element["runner-up"];

    // Takes ANDed boolean values from three validation functions
    var validated =
           validateYear(year)
        && validateTournament(tournament)
        && validatePlayer(winner, runnerUp);

    // If true, a new row is added to results
    if (validated)
        addValidatedRow(year, tournament, winner, runnerUp);
}

/**
 * Receives validated values to add to a new row in the results table.
 * Creates and adds new row.
 * Increments resultsCount.
 * @param {number} year
 * @param {string} tournament
 * @param {string} winner
 * @param {string} runnerUp
 */
function addValidatedRow(year, tournament, winner, runnerUp) {
    var row = document.createElement("tr");
    $(row).append($('<td/>').text(year))
    .append($('<td/>').text(tournament))
    .append($('<td/>').text(winner))
    .append($('<td/>').text(runnerUp));
    $('#results').append(row);
    resultsCount++;
}

/**
 * Checks the given year against the user-inputted year
 * and yearCondition option.
 * @param {number} year
 * @returns {boolean} 
 */
function validateYear(year) {
    var yearInput = $("#year").val();
    if (yearInput === "")
        return true;
    else  
        switch($("#yearCondition :selected").val()) {
            case "equals":
                return year === parseInt(yearInput);
            case "greater":
                return year > parseInt(yearInput);
            case "less":
                return year < parseInt(yearInput);
            default:
                return false;
    }
}

/**
 * Checks the given tournament against the user selected tournament option.
 * @param {string} tournament
 * @returns {boolean}
 */
function validateTournament(tournament) {
    return ($("#tournament :selected").text() === "Any"
        || $("#tournament :selected").text() === tournament);      
}

/**
 * Checks whether the user inputted player string matches the winner
 * or runnerUp values, according to the user selected search criteria.
 * @param {string} winner
 * @param {string} runnerUp
 * @returns {boolean}
 */
function validatePlayer(winner, runnerUp) {
    var condition = $("#playerCondition :selected").val();
    if (condition === 'none') {
        return true;
    }
    else {
        var rank = $("#playerRank :selected").val();
        var player = $("#player").val();
        switch (condition) {
            case "equals":
                // Returns true if the value of winner or runnerUP is equal
                // to the user input
                return ((rank === "winner" && winner === player) ||
                    (rank === "runnerUp" && runnerUp === player) ||
                    rank === "either" && (runnerUp === player ||
                        winner === player));
            case "contains":
                // Will not return true if there is no 'player' input
                if (player.length > 0)
                    // Returns true if the user input is a substring of winner
                    // or runnerUp
                    return ((rank === "winner" && winner.includes(player)) ||
                        (rank === "runnerUp" && runnerUp.includes(player)) ||
                        rank === "either" && (runnerUp.includes(player) ||
                            winner.includes(player)));
            default:
                return false;
        }
    }
}

/** On window load:
 * call onClick when Search is clicked
 * */
window.onload = function () {
    $('#searchButton').click(function () {
        onClick(files)
    })
};
