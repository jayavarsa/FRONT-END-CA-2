// getting the elements from the html
var playagain = document.getElementById("playagain") //playagain button 
var home = document.getElementById("home") //homw button
var player_name = document.getElementById("player_name")
var computer_name = document.getElementById("computer_name")
var player_avatar = document.getElementById("player_avatar")
var computer_avatar = document.getElementById("computer_avatar")
var player_score = document.getElementById("player_score")
var computer_score = document.getElementById("computer_score")
var result_message = document.getElementById("win_word")
var won_message = document.getElementById("win_msg")


//getting the values from the local storage 
const avator = localStorage.getItem('avator')
const comp_avatar = localStorage.getItem('comp_avator')
const player_score_value = localStorage.getItem('player_score')
const computer_score_value = localStorage.getItem('computer_score')


//event to take to the game page again
playagain.addEventListener('click',function(){
    window.location.href = './game.html';
})

//event to take to the home paege
home.addEventListener('click',function() {
    window.location.href="index.html";
})

player_name.textContent = localStorage.getItem('name') //updating the player_name from localstorage
computer_name.textContent = localStorage.getItem('comp_name') //updating the computer_name from local storage


player_avatar.innerHTML = `<img src="./assets/avator-${avator}.png" alt="" >` //updating the player_avator from localstorage
computer_avatar.innerHTML = `<img src="./assets/comp_avator-${comp_avatar}.png" alt="">` //updating the computer_avator from localstorage

player_score.textContent = player_score_value //updating the player_score
computer_score.textContent = computer_score_value //updating the computer_score

var randomnum; //random number

player_win_word=[ //list of feedback/sentence to generate if player wins 
    'The computer demands a rematch, claiming it had a "virtual malfunction."🧐',
    "The computer declares, \"You win this time, but I'll be back with more circuits and less spin!",
    'Player wins, and the computer pledges to take ping-pong lessons from a rubber duck to improve its skills.',
    "I hope you enjoyed the game, because we're going to have another one soon.",
    "You've outsmarted the algorithms this time. But beware, I'll return with a paddle of pure chaos for our next match!",
    "You're a paddle-wielding wizard! I'll be in my virtual garage, recalibrating my dignity."
]

computer_win_word =[ //list of feedback/sentence to generate if computer wins 
    "Better luck next time, human! My algorithms are unstoppable! Mwahaha!",
    "You were good, but I was programmed to be great! Robots rule!",
    "You'll need more RAM to challenge me next time! I'm virtually unbeatable!",
    "Hope you learned something from our match! You can try again anytime!",
    "You might want to consider installing 'Paddle.exe' for better results next time!",
    "You played well, but I guess you could say I've got a 'ping' in my step and a 'pong' in my algorithms!"
]

randomnum = Math.floor(Math.random()*6) //getting a random number

//checking who won the game and pushing the senctence and the winning message
if (player_score_value > computer_score_value){
    result_message.textContent = player_win_word[randomnum];
    won_message.textContent = 'You Won!'

}else if(computer_score_value > player_score_value){
    result_message.textContent = computer_win_word[randomnum];
    won_message.textContent = `${localStorage.getItem('comp_name')} Won the Game`

}