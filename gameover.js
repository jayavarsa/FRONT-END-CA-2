var playagain = document.getElementById("playagain") //playagain button 
var home = document.getElementById("home") //homw button
var player_name = document.getElementById("player_name")


playagain.addEventListener('click',function(){
    window.location.reload();
})

home.addEventListener('click',function() {
    window.location.href="index.html";
})

console.log(localStorage.getItem('level'))
player_name.textContent = localStorage.getItem('name')