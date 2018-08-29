$(document).ready(function () {
    var crystalGame = {


        currentScore: 0,
        crystalScores: [],
        gameRunning: false,

        //crystalize() initializes the game.

        crystalize: function () {
            this.currentScore = 0;
            this.crystalScores = [];
            while (this.crystalScores.length < 4) {
                var num = (Math.floor(Math.random() * 10) + 1) * 50;
                if (this.crystalScores.indexOf(num) > -1) continue;
                this.crystalScores[this.crystalScores.length] = num;
            }
            console.log(this.crystalScores);
            this.gameRunning = true;
        },

        clickStart: $("#overlay").click(function () {
            $("#overlay").css("visibility", "hidden");
            $("#title-div").css("visibility", "visible");
            $("#belt-div").css("visibility", "visible");
            crystalGame.crystalize();
            $(".crystal-button").on("click", function() {
                for (let i = 0; i < 10; i++) {
                    crystalGame.crystalAppear($(this).children().attr("src"));
                }
            });

        }),

        crystalAppear: function (src) {
            if (this.gameRunning) {
                var image = $("<img>");
                image.attr("src", src);
                image.css({
                    height: "50px",
                    width: "50px",
                    "position": "absolute",
                    "left": Math.random() * ($("#game-area").width() - 100) + 30,
                    "top": Math.random() * ($("#belt-div").offset().top - $("#game-area").offset().top - 80) +$("#game-area").offset().top + 10,
                    "-webkit-touch-callout": "none",
                    "-webkit-user-select": "none",
                    "-khtml-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none",
                    "user-select": "none",
                    "-webkit-user-drag": "none",
                    "opacity": 0.7
                });
                image.addClass("clickCrystals");
                $("#game-area").append(image);
            }
        },






        scorePoints: $(document).on("click", ".clickCrystals", function () {
            $(this).remove();
        }),
        //new game button, hidden during play, pops up so the game isn't automatically restart only functions if game is over
        newGame: $("#new-game-button").click(function () {
            if (crystalGame.gameOver) {
                $("#new-game-button").css("visibility", "hidden");
                $("#win-loss-message").text("");
                crystalGame.crystalize();
            }
        }),
        //lose game: losses incremented and displayed, game over pops up new game button
        loseGame: function () {
            this.losses++;
            $("#losses-count").text(crystalGame.losses);
            this.gameOver = true;
            $("#win-loss-message").text("You lose!");
            $("#new-game-button").css("visibility", "visible");
        },
        //win game: wins incremented and displayed, game over pops up new game button
        winGame: function () {
            this.wins++;
            $("#wins-count").text(crystalGame.wins);
            this.gameOver = true;
            $("#win-loss-message").text("You win!");
            $("#new-game-button").css("visibility", "visible");
        },
    }

});

