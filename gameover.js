var playagain = document.getElementById("playagain") //playagain button 
var home = document.getElementById("home") //homw button
var player_name = document.getElementById("player_name")
var computer_name = document.getElementById("computer_name")
var player_avatar = document.getElementById("player_avatar")
var computer_avatar = document.getElementById("computer_avatar")

playagain.addEventListener('click',function(){
    window.location.href = './game.html';
})

home.addEventListener('click',function() {
    window.location.href="index.html";
})

console.log(localStorage.getItem('level'))
player_name.textContent = localStorage.getItem('name')
computer_name.textContent = localStorage.getItem('comp_name')


const avator = localStorage.getItem('avator')
const comp_avatar = localStorage.getItem('comp_avator')
console.log(avator,comp_avatar)

