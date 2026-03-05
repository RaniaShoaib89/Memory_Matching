$(document).ready(function(){

    var symbols = ["🍎","🍌","🍇","🍓","🍉","🍒","🍍","🥝"];
    var timerInterval;
    var first = null;
    var second = null;
    var lock = false;
    var moves = 0;
    var matches = 0;
    var time = 0;
    
    // Shuffle function
    function shuffle(arr){
        var array = $.extend([], arr);
        var i = array.length - 1;
        while(i > 0){
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i--;
        }
        return array;
    }
    
    // Create board
    function createBoard(){
        $("#game-board").empty();
        
        var deck = [];
        $.each(symbols, function(index, value){
            deck.push(value);
            deck.push(value);
        });
        
        deck = shuffle(deck);
        
        $.each(deck, function(index, value){
            var $card = $("<div>").addClass("card").attr("data-symbol", value);
            $("#game-board").append($card);
        });
    }
    
    // Timer
    function startTimer(){
        clearInterval(timerInterval);
        time = 0;
        $("#time").text(time);
        timerInterval = setInterval(function(){
            time++;
            $("#time").text(time);
        }, 1000);
    }
    
    // Reset
    function resetGame(){
        first = null;
        second = null;
        lock = false;
        moves = 0;
        matches = 0;
        time = 0;
        clearInterval(timerInterval);
        $("#moves").text(0);
        $("#matches").text(0);
        $("#time").text(0);
    }
    
    // Start game
    function startGame(){
        resetGame();
        createBoard();
        startTimer();
        $("#win-screen").hide();
    }
    
    // Card click
    $(document).on("click", ".card", function(){
        var $card = $(this);
        
        if(lock || $card.hasClass("flipped") || $card.hasClass("matched")) return;
        
        $card.addClass("flipped").text($card.attr("data-symbol"));
        
        if(first === null){
            first = $card[0];
            return;
        }
        
        second = $card[0];
        lock = true;
        moves++;
        $("#moves").text(moves);
        
        var sym1 = $(first).attr("data-symbol");
        var sym2 = $(second).attr("data-symbol");
        
        if(sym1 === sym2){
            $(first).addClass("matched");
            $(second).addClass("matched");
            matches++;
            $("#matches").text(matches);
            
            first = null;
            second = null;
            lock = false;
            
            if(matches === symbols.length){
                clearInterval(timerInterval);
                var timeStr = time + "s";
                $("#final-stats").text("Moves: " + moves + " | Time: " + timeStr);
                setTimeout(function(){
                    $("#win-screen").fadeIn();
                }, 300);
            }
        } else {
            setTimeout(function(){
                $(first).removeClass("flipped").text("");
                $(second).removeClass("flipped").text("");
                first = null;
                second = null;
                lock = false;
            }, 1000);
        }
    });
    
    // Buttons
    $("#restart").on("click", function(){
        $("#win-screen").fadeOut(function(){
            startGame();
        });
    });
    
    $("#play-again").on("click", function(){
        $("#win-screen").fadeOut(function(){
            startGame();
        });
    });
    
    startGame();

});