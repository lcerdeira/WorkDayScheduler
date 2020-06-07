// jQuery initial function
$(document).ready(function() {

    // Current day and time
    $(".timeDateTwo").text(moment().format('LL'));
    $(".timeDate").text(moment().format('LTS'));
    setInterval(function() {
        $(".timeDate").text(moment().format('LTS'));
    }, 1000);

    // Work day hours
    var hours = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];
    var value = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
    var time = "";
    var taskArray = [];

    // get local tasks
    getTasks()

    // Time, Input and Save button generation
    for (i = 0; i < hours.length; i++) {

        var hourBlocks = $("<div>");
        hourBlocks.addClass("hourBlock input-group mb-3");
        hourBlocks.data("index", i);

        time = $("<div>");
        time.addClass("input-group-prepend");
        time.css("color", "grey");

        var timeText = $("<span>");
        timeText.addClass("input-group-text");
        timeText.text(hours[i]);
        timeText.css("width", "4.5rem");

        var userInput = $("<div>");
        userInput.addClass("userInput");
        userInput.text(taskArray[i]);
        userInput.attr("contentEditable", "true");

        var UserInputAppend = $("<div>");
        UserInputAppend.addClass("input-group-append");

        var saveButton = $("<button>");
        saveButton.addClass("fa fa-floppy-o btn btn-secondary save");
        saveButton.data("index", i);

        UserInputAppend.append(saveButton);
        time.append(timeText);
        hourBlocks.append(time);
        hourBlocks.append(userInput);
        hourBlocks.append(UserInputAppend);
        $(".container").append(hourBlocks);

        // Changing div color based on current time
        var time = parseInt(moment().format('HH'))
        var timeIndex = parseInt(timeText.attr("value"))

        if (time > timeIndex) {
            timeText.css("background-color", "lightgrey")
        }
        if (time === timeIndex) {
            timeText.css("background-color", "lightblue")
        }
        if (time < timeIndex) {
            timeText.css("background-color", "lightgreen")
        }
        if (time > 20 && time < 24) {
            timeText.css("background-color", "lightgreen")
        }
    };

    // store information locally
    $(".save").on("click", function() {
        var task = $(this).parents(".hourBlock");
        var taskIndex = task.data("index");
        var userInputFind = task.find(".userInput");

        localStorage.setItem("task" + taskIndex, JSON.stringify(userInputFind.text()));
    });


    // get local information
    function getTasks() {

        for (i = 0; i < hours.length; i++) {
            var gotten = JSON.parse(localStorage.getItem("task" + i, ))
            taskArray.push(gotten)
        };
    };
});