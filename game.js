// VALUES FROM THE LOCAL STORAGE 

const player_name = localStorage.getItem('name') //getting the player_name from local storage
const game_level = localStorage.getItem('level') // "Easy" "Medium" "Hard"
const avator = localStorage.getItem('avator') // getting the number of the vavtor from local storage

// variables for the value updation

var player_image = document.getElementById("player_image") 
var computer_image = document.getElementById("computer_image")
var player_name_given = document.getElementById("player_name")
var computer_name = document.getElementById("computer_name")
var audio = document.getElementById("background-music");


// VARIABLES FOR THE BALL AND PADDLE  CLASS  ACCORDING TO HARDNESS
var initial_velocity = 0.05 //starting speed of the ball
var speed = 0.01//Acceleration of the ball
var speed_PADDLE = 1 // The accuracy and velocity of the computer paddle


// To change values according to the hardness selected 
if (game_level == 'Hard'){ //level = 'hard'
    initial_velocity = 0.05 
    speed = 0.0003 
    speed_PADDLE = 0.05
    console.log(initial_velocity,speed_PADDLE)

}else if (game_level == 'Medium'){ //level ='medium'
    initial_velocity = 0.03 
    speed = 0.0002
    speed_PADDLE = 0.09
    console.log(initial_velocity,speed_PADDLE)

} else if(game_level == 'Easy'){ //level ='easy'
    initial_velocity = 0.03 
    speed = 0.0001
    speed_PADDLE = 0.05
    console.log(initial_velocity,speed_PADDLE)
}

var head = document.getElementById("head") // to get the boundaries of the hearder

// this function gives the boundaries of the header 
function topbox(head){ 
    return head.getBoundingClientRect()
}

// CLASS BALL 
class Ball {
    constructor(ballelem) {
        this.ballelem = ballelem //the ball is being passed to this as a element
        this.reset() // calling function to initise the variables of x,y and velocity of the ball

    }
    // getting the x value from the css
     
    get x(){
        return parseFloat(getComputedStyle(this.ballelem).getPropertyValue("--x"))
    }

    // helper function to set the x value accordingly 
    set x(value){
        this.ballelem.style.setProperty('--x', value);
    }


    // getting the y value from the css
    get y(){
        return parseFloat(getComputedStyle(this.ballelem).getPropertyValue("--y"))
    }

    // helper function to set the y value accordingly 

    set y(value){
        this.ballelem.style.setProperty('--y', value);
    }

    // gives the the boundaries of the ball element 
    rectangle(){
        return this.ballelem.getBoundingClientRect() 
    }


    //function to reset the ball's values to start the game again
    reset(){
        this.x =50
        this.y = 55
        this.direction = {x:0}

        while (Math.abs(this.direction.x <=0.2) || Math.abs(this.direction.y >= 0.9)){ // to make sure that ball doesnot move vertically or horizontally completly
            const heading = randomanglebetween(0,2 * Math.PI)    // where i am heading to from 0 to 360 in radians 
            this.direction = {x: Math.cos(heading) , y: Math.sin(heading)} //getting the x and y direction direction of the using the vector concept 
            // console.log(this.direction)
        }

        this.velocity = initial_velocity  
    }

    
    //function to update the position of the ball at each timeframe
    update(delta,paddlerectangle){
        this.x +=this.direction.x * this.velocity * delta
        this.y +=this.direction.y * this.velocity * delta
        this.velocity += speed

        const rectangle = this.rectangle() //decelaring the varible to get the boundaries value from that function 

        //if ball hits top or bottom it bounces back
        if (rectangle.bottom >= window.innerHeight || rectangle.top <= topbox(head).bottom){  
            this.direction.y = this.direction.y *  -1
        }
        
        //if ball hits paddle it goes in the opposite direction in which it comes 
        if (paddlerectangle.some(r => iscollide(r, rectangle))){    //give the code to change color and add the bat sound effect here
            this.direction.x *=-1
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
            document.documentElement.style.setProperty("--hue", hue+ 50 + delta/50)
            var paddle_audio = document.getElementById("paddle")
            paddle_audio.play()
        }
    }


}

//function to get a random number m and n
function randomanglebetween(n,m){
    let angle = Math.random() * (m - n) + n;
    return angle;
}

//function to check whether the collide with paddle or not 
function iscollide(r1 , r2){
    return r1.left <=r2.right && r1.right >= r2.left && r1.top <=r2.bottom && r1.bottom >=r2.top
}

// CLASS FOR THE PADDLE 
class Paddle{
    constructor(paddlelem){
        this.paddlelem = paddlelem
        this.reset()
    }

    //geting the value of position from css
    get position(){
        return parseFloat(getComputedStyle(this.paddlelem).getPropertyValue("--position"))
    }

    //setting the position to its new value
    set position(value){
        this.paddlelem.style.setProperty('--position', value);
    }

    //function to get the boundaries of the paddle
    rectangle(){
        return this.paddlelem.getBoundingClientRect()
    }

    //function to reset the paddle position to start
    reset(){
        this.position = 60
    }


    //function to update the computer paddle position according to the y value of ball 
    update(delta , ballsize){
        // this.position = ballsize      // computer always win in this case 
        this.position += speed_PADDLE * (ballsize - this.position) *delta
    }
}

// variable initisation 
const ball = new Ball(document.getElementById('ball')) 
const player_paddle = new Paddle(document.getElementById('player_paddle'))
const computer_paddle = new Paddle(document.getElementById('computer_paddle'))
var gamearea = document.getElementById("gamearea")
var player_score = document.getElementById("player_score")
var computer_score = document.getElementById("computer_score")

var p_score = 0 //player_score
var c_score =0  //computer_score



let lasttime //time between two frames

// update function to update the position of paddle and ball
function update(time){

    if (lasttime != null ){ // to make sure we have a lastime to compare and get delta 

        const delta = time - lasttime //how time has pasted btw two frames (frame drop)
        // console.log(delta)
        ball.update(delta ,[player_paddle.rectangle() , computer_paddle.rectangle()])
        computer_paddle.update(delta,ball.y)
    }
    lasttime = time
    
    window.requestAnimationFrame(update)

    //to check whether the player or computer missed the ball
    if (ballout()){
        const rectangle = ball.rectangle()
        if (rectangle.right >=window.innerWidth){
            p_score++
            player_score.textContent = p_score
        }else{
            c_score++
            computer_score.textContent = c_score
        }
        ball.reset() //to reset the ball position
        computer_paddle.reset() // to reset the paddle position 
        who_win(c_score,p_score) //caliing to check if some body who or not 


    }
}


//event to make player_paddle according to their mouse movement 
gamearea.addEventListener('mousemove',e => {
    player_paddle.position = (e.y / window.innerHeight) * 100 // converting the y from pixels to percentage in terms of vh
})


// function to check whther the ball went out or not 
function ballout(){
    const rectangle = ball.rectangle()
    return rectangle.left <=0 || rectangle.right >= window.innerWidth

}

//calling the function update for every frame 
window.requestAnimationFrame(update)
 
l=['',"RoboPong",'PaddleMaster','TheBot','Ponginator'] //list of names for computer

update_avator_name(avator) //updates the avator of the player and name
update_comp_avator_name(l) // updates the avator of the computer and name


// console.log(player_name,game_level,avator)
// console.log(c_score,p_score)

// to update the avator and name
function update_avator_name(n){
    player_image.innerHTML = `<img src="./assets/avator-${n}.png" alt="" class="player_image">`
    player_name_given.textContent = localStorage.getItem('name')
    audio.play()
    audio.volume = 0.1
}

// to update computer avator and name
function update_comp_avator_name(l){
    let random = Math.floor(Math.random()*4)+1;
    computer_image.innerHTML = `<img src="./assets/comp_avator-${random}.png" alt="" class="computer_image">`
    computer_name.textContent = l[random]
    console.log(l[random])
    localStorage.setItem("comp_name",l[random])
    localStorage.setItem("comp_avator",random)
}


//function to check who the game 
function who_win(comp_score,player_score){
    if (player_score >=6){
        window.location.href = "./gameover.html"
        localStorage.setItem('player_score',player_score) // storing the player_score to the local storage
        localStorage.setItem('computer_score',comp_score) // storing the computer_score to the local storage 
    }else if (comp_score >=6){
        window.location.href = "./gameover.html"
        localStorage.setItem('player_score',player_score) // storing the player_score to the local storage
        localStorage.setItem('computer_score',comp_score) // storing the computer_score to the local storage 
    }
    
}