var currentDate = moment().format('dddd, MMMM Do');

// display date at top of page
$("#currentDay").append(currentDate);

// load timeblocks from 9am - 5pm
var loadTimeBlocks = function() {
    // create timenblock rows
    for (var i = 9; i < 18; i++) {
        // create label for each block by converting 24-hour time into 12-hour time format
        var timeLabel = moment(i, "H").format("hA");
        $(".container").append(
            "<div class='row time-block'><div class='col hour card-header'><span>" + timeLabel + "</span></div>"
        );
    }
    // add textarea and button to each row
    $(".row").append(
        "<textarea class='col-10 description'></textarea>" +
        "<div class='col saveBtn'><i type='button' class='fas fa-save'></i></div>"
    );
};

loadTimeBlocks();