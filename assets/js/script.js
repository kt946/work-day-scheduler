// let code load HTML/CSS and timeblocks first
var currentDate = moment().format('dddd, MMMM Do');
var auditTimer = "";

// display date at top of page
$("#currentDay").append(currentDate);

// load timeblocks from 9AM - 5PM
var loadTimeBlocks = function() {
    // create timeblock rows from 9AM (9 hours) to 5PM (18 hours)
    for (var i = 9; i < 18; i++) {
        // create label for each row by converting 24-hour time into 12-hour time format
        var timeLabel = moment(i, "H").format("hA");
        $(".container").append(
            "<div class='row time-block'><div class='col hour card-header'><span>"
             + timeLabel + "</span></div>"
        );
    }
    // add textarea and button to each row
    $(".row").append(
        "<textarea class='col-10 description'></textarea>" +
        "<button class='col saveBtn'><i type='button' class='fas fa-save'></i></button>"
    );
};

// compare current time to timeblocks
var auditTimeBlock = function() {
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

// ready once document finishes loading HTML/CSS and timeblocks
$(document).ready(function () {
    $(".saveBtn").on("click", function() {
        var rowTimeId = $(this).parent().children().find("span").text();
        var rowText = $(this).siblings("textarea").val();
    
        localStorage.setItem(rowTimeId, rowText);
    });
});

// interval for checking timeblocks
var timer = function() {
    // run function once at start of hour
    auditTimeBlock();
    // set interval for every hour
    auditTimer = setInterval(auditTimeBlock, (1000*60)*60);
};
// variable to check how much time is left until next hour in milliseconds
var timeLeft = moment().add(1, 'h').minute(0).second(0).millisecond(0).diff(moment());
// timeout interval set to start upon next hour
setTimeout(timer, timeLeft);

loadTimeBlocks();

// check timeblocks once upon loading schedule
auditTimeBlock();