
function populateYears() {
    for (var i = (new Date).getFullYear(); i >= 1877; --i)
        $('#year').append(new Option(i, i));
}
function onClick(files) {
    var fileToUse = $("#gender :selected").val()
    if (fileToUse == "both") {
        $.getJSON(files.mens, function (result) {
            onFileLoad(result);
        });
        $.getJSON(files.womens, function (result) {
            onFileLoad(result);
        });
    }
    else {
        $.getJSON(eval("files."+fileToUse), function (result) {
            onFileLoad(result);
        })
    }
}
function onFileLoad(result) {
    $.each(result, function (index, element) {
        $.each(element, function (index, element) {
            forEachResult(index, element);
        });
        if (document.getElementById("results").rows.length > 1) {
            document.getElementById("noResults").style.display = "none";
        }
        else {
            alert("No Results");
            document.getElementById("noResults").style.display = "block";
        }
    })
}
function forEachResult(index, element) {
    var year =
        element["year"];
    var tournament =
        element["tournament"];
    var winner =
        element["winner"];
    var runnerUp =
        element["runner-up"];
    var verified =
           verifyYear(year)
        && verifyTournament(tournament)
        && verifyWinner(winner)
        && verifyRunnerUp(runnerUp);
    if (verified) {
        var row = document.createElement("tr");
        $(row).append($('<td/>').text(year));
        $(row).append($('<td/>').text(tournament));
        $(row).append($('<td/>').text(winner));
        $(row).append($('<td/>').text(runnerUp));
        $('#results').append(row);
    }
}
function verifyYear(year) {
    if ($("#year :selected").text() == "Any")
        return true;
    else  
        switch($("#yearCondition :selected").text()) {
            case "Equals":
                return year == $("#year :selected").text();
            case ">":
                return year > $("#year :selected").text();
            case "<":
                return year < $("#year :selected").text();
            default:
                return false;
    }
}
function verifyTournament(tournament) {
    return ($("#tournament :selected").text() == "Any"
        || $("#tournament :selected").text() == tournament);      
}
function verifyWinner(winner) {
    return true;
}
function verifyRunnerUp(runnerUp) {
    return true;
}
var files = { "mens": 'mens-grand-slam-winners.json', "womens": 'womens-grand-slam-winners.json' }

window.onload = function () {
    this.populateYears(),
        $('#searchButton').click(function () {
            
            $('#results tr:gt(0)').remove();
            onClick(files);
        })
};