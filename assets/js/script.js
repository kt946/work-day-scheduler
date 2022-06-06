var currentDate = moment().format('dddd, MMMM Do');
var auditTimer = "";
// hide saved event message first
$(".savedAlert").children("p").hide();

// display date at top of page
$("#currentDay").append(currentDate);

// load timeblocks from 9AM - 5PM
var loadTimeBlocks = function() {
    // create timeblock rows from 9AM (i = 9) to 5PM (i = 17)
    for (var i = 9; i < 18; i++) {
        // create label for each row by converting 24-hour format into 12-hour format
        var timeLabel = moment(i, "H").format("hA");
        $(".container").append(
            "<div class='row time-block'><div class='col hour card-header'><span>"
             + timeLabel + "</span></div>"
        );
    }
    // add textarea and button to each row
    $(".row").append(
        "<textarea class='col-10 description'></textarea>" +
        "<div class='col saveBtn'><i type='button' class='fas fa-save'></i></div>"
    );
};

// compare current time to timeblocks
var auditTimeBlock = function() {
    // reset timeblock classes
    $("textarea").removeClass("past present future");

    // convert current time to 24-hour format
    var currentTime = moment().format("H");

    // check timeblocks and update colors 
    $(".row").each(function() {
        var timeLabel = $(this).find("span").text();
        var rowTime = parseInt(moment(timeLabel, "hA").format("H"));
        if (rowTime < currentTime) {
            $(this).find("textarea").addClass("past");
        }
        else if (rowTime > currentTime) {
            $(this).find("textarea").addClass("future");
        }
        else {
            $(this).find("textarea").addClass("present");
        }
    });
};

// ready method once document finishes loading
$(document).ready(function () {
    // load text field for each row from local storage
    $(".row").each(function() {
        var rowLabel = $(this).find("span").text();
        $(this).find("textarea").append(localStorage.getItem(rowLabel));
    });

    // save text field to local storage
    $("i").on("click", function() {
        var rowTimeId = $(this).parent().siblings().find("span").text();
        var rowText = $(this).parent().siblings("textarea").val();
    
        localStorage.setItem(rowTimeId, rowText);

        // display saved event message, then hide it
        $(".savedAlert").children("p").show();
        setTimeout(function() {
            $(".savedAlert").children("p").hide();
        }, 3000);
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