//global variables
var button_colours = ["red","blue","green","yellow"];
var game_pattern = [];
var user_clicked_pattern = [];
var started = false; 
var level = 0;

//functions
function nextSequence(){
user_clicked_pattern = [];
level = level + 1;
$("#level-title").html("Level "+ level);
    
var ramdomizer = Math.random() * 3;
var random = Math.round(ramdomizer);
    


var random_chosen_color = button_colours[random];
game_pattern.push(random_chosen_color);

$("#" + random_chosen_color).delay(100).fadeOut().fadeIn('slow');
playSound(random_chosen_color);
animatePress(random_chosen_color);



}

$(".btn").click(function(){
 var userChosenColor = $(this).attr("id");
 user_clicked_pattern.push(userChosenColor);
 playSound(userChosenColor);
 animatePress(userChosenColor);
 checkAnswer(user_clicked_pattern.length - 1);
});


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(current_color){
   $("."+ current_color).addClass("pressed");
   setTimeout(function(){
    $("."+ current_color).removeClass("pressed"),100
   });
}




$(document).keydown(function(event){
 var pressed_key = event;
 
 

 if(started == false){
 nextSequence();
 started = true;
}


});



function checkAnswer(current_level){

 if(game_pattern[current_level] === user_clicked_pattern[current_level]){
    console.log("Success");


  if(user_clicked_pattern.length === game_pattern.length){
    setTimeout(function(){
         nextSequence();
    },1000);
   }

 }
 else{
    var fail = new Audio("sounds/wrong.mp3");
    fail.play();
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    startOver();
    $("#level-title").html("Game Over, Press any key to restart!");
 }
}


function startOver(){
    level = 0;
    game_pattern =[];
    started = false;
}