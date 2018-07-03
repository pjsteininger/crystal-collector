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
            console.log("hello");
            $("#overlay").css("visibility", "hidden");
            $("#title-div").css("visibility", "visible");
            $("#crystal-buttons").css("visibility", "visible");
            crystalGame.crystalize();
            for (let i = 0; i < 20; i++) {
                crystalGame.crystalAppear();
            }
        }),






        crystalAppear: function () {
            if (this.gameRunning) {
                var image = $("<img>");
                image.attr("src", "assets/images/gem1-100x100.png");
                image.css("left", 15 + (Math.random() * 80) + "%");
                image.css("top", 15 + Math.random() * 60 + "%");
                image.css("position", "absolute");
                image.css("-webkit-touch-callout", "none");
                image.css("-webkit-user-select", "none");
                image.css("-khtml-user-select", "none");
                image.css("-moz-user-select", "none");
                image.css("-ms-user-select", "none");
                image.css("user-select", "none");
                image.css("-webkit-user-drag", "none");
                image.addClass("clickCrystals");
                $("#crystal-area-bottom").append(image);
            }
        },






        scorePoints: $(document).on("click", ".clickCrystals", function () {
            console.log(this);
            $(this).css("display", "none");
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

