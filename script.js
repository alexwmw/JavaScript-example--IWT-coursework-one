

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





function populateYears(){}

window.onload = function () {
    $(document).ready(function () {
        $('#searchButton').click(
            function () {
                $('#results tr:gt(0)').remove();
                $.getJSON('mens-grand-slam-winners.json', function (mens) {
                    $.each(mens.result, function (index, entry) {
                        //$('#results').append($('<tr/>').text(JSON.stringify(result)));
                        var row = document.createElement("tr");
                        iteration:
                        for ([key, value] of Object.entries(entry)) {
                            //$(row).append($('<td/>').text(value));
                            switch (key) {
                                case "year":
                                    if ($("#year :selected").val() == "any")
                                        $(row).append($('<td/>').text(value));
                                    else {
                                        switch ($("#yearCondition :selected").val()) {
                                            case "equals":
                                                if (value == $("#year :selected").val()) {
                                                    $(row).append($('<td/>').text(value));
                                                    break;
                                                }
                                                else { break iteration; }
                                            case "greater":
                                                if (value > $("#year :selected").val()) {
                                                    $(row).append($('<td/>').text(value));
                                                    break;
                                                }
                                                else { break iteration; }
                                            case "less":
                                                if (value < $("#year :selected").val()) {
                                                    $(row).append($('<td/>').text(value));
                                                    break;
                                                }
                                                else { break iteration; }
                                        }
                                    }
                                    break;

                                case "tournament":
                                    if ($("#tournament :selected").val() == "any")
                                        $(row).append($('<td/>').text(value));
                                    else if ($("#tournament :selected").text() == value)
                                        $(row).append($('<td/>').text(value));
                                    else
                                        break iteration;
                                    break;

                                case "winner":
                                    if ($("#playerRank :selected").text() == "Either")
                                        $(row).append($('<td/>').text(value));
                                    else
                                        break iteration;
                                    break;

                                //$(row).append($('<td/>').text(value));
                                //break;
                                case "runner-up":
                                    if ($("#playerRank :selected").val() == "either")
                                        $(row).append($('<td/>').text(value));
                                    else
                                        break iteration;
                                    break;
                            }




                        }
                        if (row.childNodes.length == 4)
                            document.getElementById("results").appendChild(row);




                    }
                    );

                })
            });
    });
};






/*


window.onload = function () {
    $(document).ready(function(){
        $('#searchButton').click(
            function () {
                $.getJSON('mens-grand-slam-winners.json',function (mens) {
                        $.each(mens.result, function (index, entry) {
                            //$('#results').append($('<tr/>').text(JSON.stringify(result)));
                            var row = document.createElement("tr");
                            for ([key, value] of Object.entries(entry)) {
                                $(row).append($('<td/>').text(value));
                            }
                            document.getElementById("results").appendChild(row);




                        }
                        );

                })
            });
    });
};


                        var elem = document.getElementById("results");
                        var row = document.createElement("tr");
                        // Create nodes from data
                        var year = document.createTextNode("Hello");
                        var tournament = document.createTextNode("World");
                        var winner = document.createTextNode("How");
                        var runnerUp = document.createTextNode("Are You?");
                        // Append items to results table
                        var ls = [year,tournament,winner,runnerUp];
                        ls.forEach(item => {
                            var td = document.createElement("td");
                            td.appendChild(item);
                            row.appendChild(td);
                            });
                        elem.appendChild(row);
                         */
