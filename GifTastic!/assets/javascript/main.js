var dogsArray = ["boston terrier", "corgi", "bulldog", "golden retriever", "pug"];

function generateGifs() {
    var dogs = $(this).attr("nameData");

    //alert(dogs);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dogs + "&api_key=dc6zaTOxFJmzC&limit=12";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        $("#dogsView").empty();
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='col-md-4'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var dogImage = $("<img>");
            dogImage.attr("src", results[i].images.fixed_height_still.url);
            $(dogImage).attr("data-state", "still");
            $(dogImage).attr("data-animate", results[i].images.fixed_height.url);
            $(dogImage).attr("data-still", results[i].images.fixed_height_still.url);
            $(dogImage).addClass("gif");
            gifDiv.append(p);
            gifDiv.append(dogImage);
            $("#dogsView").append(gifDiv);
        }
    });
}

function createButtons() {
    $("#dogBreedButtons").empty();
    for (var i = 0; i < dogsArray.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("dogBreed");
        buttons.attr("nameData", dogsArray[i]);
        buttons.text(dogsArray[i]);
        $("#dogBreedButtons").append(buttons);
    }
}
$("#addDog").on("click", function(event) {
    event.preventDefault();
    var userInput = $("#dogInput").val().trim().toLowerCase();
    if (dogsArray.indexOf(userInput) === -1 && userInput != "") {
        dogsArray.push(userInput);
        createButtons();
        $("form").trigger("reset");
    }
});
$("body").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$(document).on("click", ".dogBreed", generateGifs);

createButtons();