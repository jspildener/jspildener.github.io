var config = {
    apiKey: "AIzaSyCn_oHlHPM8FNCoRm-LrMOXgCI26BYWA_g",
    authDomain: "anytimeistraintime-262fe.firebaseapp.com",
    databaseURL: "https://anytimeistraintime-262fe.firebaseio.com",
    projectId: "anytimeistraintime-262fe",
    storageBucket: "anytimeistraintime-262fe.appspot.com",
    messagingSenderId: "535422035110"
};

firebase.initializeApp(config);
var database = firebase.database();

setInterval(function() {
    $('.current-time').html(moment().format('hh:mm:ss A'))
}, 1000);

function validateInput(newTrain) {
    $("#nameError").hide();
    $("#destinationError").hide();
    $("#timeError").hide();
    $("#frequencyError").hide();

    var isValid = true;
    if (newTrain.name == "") {
        $("#nameError").show();
        isValid = false;
    }
    if (newTrain.destination == "") {
        $("#destinationError").show();
        isValid = false;
    }
    if (newTrain.time == "") {
        $("#timeError").show();
        isValid = false;
    }
    if (newTrain.frequency == "") {
        $("#frequencyError").show();
        isValid = false;
    }

    return isValid;
}

$("#submitTrain").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: trainFrequency
    };

    var submissionIsValid = validateInput(newTrain);

    if (submissionIsValid) {
        database.ref().push(newTrain);

        //make sure that submit train button works properly
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#trainFrequency").val("");
    } else {
        clearErrors();
    }


});

function getMinutesAway(newTime, newFrequency) {

    var diffTime = moment().diff(moment(newTime), "minutes");
    var trainRemainder = diffTime % newFrequency;
    var minutesAway = newFrequency - trainRemainder;
    return minutesAway;
}
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var newTrain = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newTime = moment(childSnapshot.val().time, "hh:mm");
    var newFrequency = childSnapshot.val().frequency;
    var minutesAway = getMinutesAway(newTime, newFrequency);
    var arrivalTime = moment().add(minutesAway, "minutes");
    var formattedTime = arrivalTime.format('LT');
    console.log(minutesAway);

    $("#trainTable > tbody").append("<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" +
        newFrequency + "</td><td>" + formattedTime + "</td><td>" + minutesAway);

});
