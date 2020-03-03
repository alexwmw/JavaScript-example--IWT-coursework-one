
/** An object containing references to json files. */
var files = {
    "mens": 'mens-grand-slam-winners.json',
    "womens": 'womens-grand-slam-winners.json'
}

/** Count of the number of search results, to be displayed in the results area*/
var resultsCount = 0;

/**
 * Adds an option for each year to the year selector. Always starts with the
 * current year. Having all valid years given as options removes the
 * opportunity for the user to input erroneous data.
 * */
function populateYears() {
    for (var year = (new Date).getFullYear(); year >= 1877; --year)
        $('#year').append(new Option(year, year));
}

/**
 * Resets results count to zero, and removes any entries from the results table.
 * Determines which json files to load.
 * Loads json files.
 * Calls resultsHandler for each file loaded.
 * @param {Object} files An object containing references to json files.
 */
function onClick(files) {
    resultsCount = 0;
    $('#results tr:gt(0)').remove();

    var g = $("#gender :selected").val();

    // Boolean values to determine if mens and/or womens files should be loaded
    var mens = g == "mens" || g == "both";
    var womens = g == "womens" || g == "both";

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
		
		// Contructs string 'Search [player] returned [n] result(s)'
        document.getElementById("resultsCount").innerHTML =
            "Search "
            + ($("#player").val() ? "\"" + $("#player").val() + "\"" : '')
            + " returned " + resultsCount
            + (resultsCount == 1 ? " result" : " results"
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
 * Checks the given year against the user selected year
 * and yearCondition options.
 * @param {number} year
 * @returns {boolean} 
 */
function validateYear(year) {
    if ($("#year :selected").text() == "Any")
        return true;
    else  
        switch($("#yearCondition :selected").val()) {
            case "equals":
                return year == $("#year :selected").text();
            case "greater":
                return year > $("#year :selected").text();
            case "less":
                return year < $("#year :selected").text();
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
    return ($("#tournament :selected").text() == "Any"
        || $("#tournament :selected").text() == tournament);      
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
    if (condition == 'none') {
        return true;
    }
    else {
        var rank = $("#playerRank :selected").val();
        var player = $("#player").val();
        switch (condition) {
            case "equals":
                // Returns true if the value of winner or runnerUP is equal
                // to the user input
                return ((rank == "winner" && winner == player) ||
                    (rank == "runnerUp" && runnerUp == player) ||
                    rank == "either" && (runnerUp == player ||
                        winner == player));
            case "contains":
                // Will not return true if there is no 'player' input
                if (player.length > 0)
                    // Returns true if the user input is a substring of winner
                    // or runnerUp
                    return ((rank == "winner" && winner.includes(player)) ||
                        (rank == "runnerUp" && runnerUp.includes(player)) ||
                        rank == "either" && (runnerUp.includes(player) ||
                            winner.includes(player)));
            default:
                return false;
        }
    }
}

/** On window load:
 * populate year options,
 * call onClick when search is clicked
 * */
window.onload = function () {
    this.populateYears(),
        $('#searchButton').click(function () {
            onClick(files)
        })
};
