//getting the elements from html
var avator = document.getElementsByClassName("avator_image")[0] 
var avator_div = document.getElementById("logos")
var avator_images = document.getElementsByClassName("avators")
var rigth_arrow = document.getElementById("right_button")//right button for levels
var left_arrow = document.getElementById("left_button")//left button for levels
var level = document.getElementById("level")
var player_name = document.getElementById("player_input")//getting the player name 
var instruction = document.getElementById("instruction")
var rules = document.getElementById("rules")
var play_button = document.getElementById("play_button")
var audio = document.getElementById("background-music"); 


//event to make the avator division visible 
avator.addEventListener('click',function(){
    avator_div.style.visibility = 'visible'

})


//function to insert the selected avator to the div and hide the avator div 
function update_avator(n){
    avator.innerHTML = `<img src="./assets/avator-${n}.png" alt="" class="avator_inserted">`
    avator_div.style.visibility = 'hidden'
    localStorage.setItem('avator',n); 
    audio.play();
}

l=['Easy','Medium','Hard'] // list of levels of hardness

//initising the hardness (default to easy)
var hardness = 0 
var game_level = 'Easy'

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

//event to take to the game page 
play_button.addEventListener("click",function() {
    localStorage.setItem('name',player_name.value) 
    localStorage.setItem('level',game_level) //storing the player_name in the local storage

    //checking whther the user enterd some name 
    if (player_name.value !=''){
        window.location.href = "./game.html";
    }else{
        alert('Please enter your name!')
    }
})

//function to make the instruction visible 
function update_instruction(){
    rules.style.visibility = "visible"
    play_button.style.visibility = "hidden"

}
//function to make the instruction hidden 
function update_instruction1(){
    rules.style.visibility = "hidden"
    play_button.style.visibility = "visible"
}