var avator = document.getElementsByClassName("avator_image")[0]
var avator_div = document.getElementById("logos")
var avator_images = document.getElementsByClassName("avators")

var rigth_arrow = document.getElementById("right_button")//right button for levels
var left_arrow = document.getElementById("left_button")//left button for levels
var level = document.getElementById("level")

var player_name = document.getElementById('player_input').value //getting the player name 

var instruction = document.getElementById("instruction")
var rules = document.getElementById("rules")

var play_button = document.getElementById("play_button")
// event to make the avators visible 
avator.addEventListener('click',function(){
    avator_div.style.visibility = 'visible'

})


//function to insert the selected avator to the div and hide the avator div 
function update_avator(n){
    avator.innerHTML = `<img src="./assets/avator-${n}.png" alt="" class="avator_inserted">`
    avator_div.style.visibility = 'hidden'
    localStorage.setItem('avator','n'); 
}

// list of levels of hardness

l=['Easy','Medium','Hard']

var hardness = 0 
var game_level 

//function to update the level of hardness of the game 
function update_hardness(button){
    if (button == 'right'){
        hardness++
        if (hardness > 2){
            hardness = 2
            console.log(hardness)
        }
        level.textContent = l[hardness]
        game_level = l[hardness]
        
    }
    if (button == 'left'){
        hardness--
        if (hardness < 0){
            hardness = 0
        }
        level.textContent = l[hardness]
        
        game_level = l[hardness]
    }
}

//
play_button.addEventListener("click",function() {
    window.location.href = './game.html'
    localStorage.setItem('name',JSON.stringify(player_name))
    localStorage.setItem('level',JSON.stringify(game_level))
})


function update_instruction(){
    rules.style.visibility = "visible"
    play_button.style.visibility = "hidden"

}

function update_instruction1(){
    rules.style.visibility = "hidden"
    play_button.style.visibility = "visible"
}