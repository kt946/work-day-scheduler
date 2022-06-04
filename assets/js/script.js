var currentDate = moment().format('dddd, MMMM Do');

// display date at top of page
$("#currentDay").append(currentDate);

// load timeblocks from 9AM - 5PM
var loadTimeBlocks = function() {
    // create timeblock rows from 9AM (9 hours) to 5PM (18 hours)
    for (var i = 9; i < 18; i++) {
        // create label for each row by converting 24-hour time into 12-hour time format
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

// compare current time to timeblocks
var auditTimeBlock = function(){
    // reset timeblock classes
    $("textarea").removeClass("past present future");

    // convert current time to 24-hour format
    var currentTime = moment().format("H");
    
    // counter for row index
    var index = 0;

    // check timeblocks between 9AM (9 hours) to 5PM (18 hours)
    for (var i = 9; i < 18; i++) {
        if (i < currentTime) {
            $(".row").eq(index).find("textarea").addClass("past");
            index++;
        }
        else if (i > currentTime) {
            $(".row").eq(index).find("textarea").addClass("future");
            index++;
        }
        else {
            $(".row").eq(index).find("textarea").addClass("present");
            index++;
        }
    }
};

loadTimeBlocks();

auditTimeBlock();