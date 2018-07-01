$(document).ready(function () {
    var crystalGame = {
        targetScore: 0,
        wins: 0,
        losses: 0,
        currentScore: 0,
        crystalScores: [],
        gameOver: false,
        //crystalize() initializes the game. Reinitializes values and updates text on screen.
        //crystal scores are random numbers 1-12 checked for duplicity and put in an empty array
        crystalize: function () {
            this.gameOver = false;
            this.currentScore = 0;
            $("#current-score").text(this.currentScore);
            this.targetScore = Math.floor(Math.random() * 102 + 19);
            $("#target-score").text(this.targetScore);
            this.crystalScores = [];
            while (this.crystalScores.length < 4) {
                var num = Math.floor(Math.random() * 12) + 1;
                if (this.crystalScores.indexOf(num) > -1) continue;
                this.crystalScores[this.crystalScores.length] = num;
            }
            console.log(this.crystalScores);
        },
        //whenever a crystal is clicked, check if game is over. 
        //If not, add one of the scores in the array to the player's score
        //If the score becomes equal or greater, run win/loseGame respectively
        scorePoints: $(".crystal").click(function () {
            if (!crystalGame.gameOver) {
                crystalGame.currentScore += crystalGame.crystalScores[$(".crystal").index(this)];
                $("#current-score").text(crystalGame.currentScore);
                if (crystalGame.currentScore > crystalGame.targetScore) {
                    crystalGame.loseGame();
                } else if (crystalGame.currentScore === crystalGame.targetScore) {
                    crystalGame.winGame();
                }
            }
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
    crystalGame.crystalize();
});