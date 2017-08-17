$(document).ready(function() {

    var gameNotComplete = true;

    $("#startGame").on("click", function() {
        $("#startPage").hide();
        $("#questionPage").show();
        $(".fireworks").hide();

        var count = 45;
        var counter = setInterval(timer, 1000);
        console.log("stuff");

        function timer() {
            count = count - 1;
            if (count <= 0 && gameNotComplete) {
                clearInterval(counter);
                answerCheck();
                $("#questionPage").hide();
                $("#endPage").show();
            }
            $("#countDown").text(count);
        }
    });

    var amountCorrect = 0;

    function answerCheck() {
        var amountIncorrect = 0;
        var amountUnanswered = 0;
        $("#correctScore").text(amountCorrect);
        $("#incorrectScore").text(amountIncorrect);
        $("#unansweredQuestions").text(amountUnanswered);
        for (var i = 0; i <= 5; i++) {
            var radios = $("input[name=answer" + i + "]");
            var wasAnswered = false;

            for (var j = 0; j < radios.length; j++) {
                var radio = radios[j];
                if (radio.value == "correct" && radio.checked) {
                    amountCorrect++;
                    wasAnswered = true;
                    $("#correctScore").text(amountCorrect);

                } else if (radio.value == "wrong" && radio.checked) {
                    amountIncorrect++;
                    wasAnswered = true;
                    $("#incorrectScore").text(amountIncorrect);
                }
            }
            if (!wasAnswered) {
                amountUnanswered++;
                $("#unansweredQuestions").text(amountUnanswered);
            }
        }
        console.log("Correct Responses: " + amountCorrect);
        console.log("Incorrect Responses: " + amountIncorrect);
        console.log("Unanswered Responses: " + amountUnanswered)
    }

    var currentQuestion = 0;

    $("#nextQuestion").on("click", function() {
        $("#question" + currentQuestion).hide();
        currentQuestion++;
        $("#question" + currentQuestion).slideDown();
        var element = $("#question" + currentQuestion);
        if ($("#question" + currentQuestion).hasClass("lastQuestion")) {
            $("#nextQuestion").hide();
            $("#submit").show();
        }
    });
    $("#submit").on("click", function() {
        answerCheck();
        gameNotComplete = false;
        $("#questionPage").hide();
        $("#endPage").show();
        if (amountCorrect >= 4) {
            $(".fireworks").show();
        }

    });


});