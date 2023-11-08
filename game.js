// VALUES FROM THE LOCAL STORAGE 

const player_name = localStorage.getItem('name')
const game_level = localStorage.getItem('level') // "Easy" "Medium" "Hard"
const avator = localStorage.getItem('avator')

// variables for the value updation

var player_image = document.getElementById("player_image")
var computer_image = document.getElementById("computer_image")
var player_name_given = document.getElementById("player_name")
var computer_name = document.getElementById("computer_name")


// VARIABLES FOR THE BALL AND PADDLE  CLASS  ACCORDING TO HARDNESS
var initial_velocity = 0.05 //change according to hardness
var speed = 0.01//change according to the hardness
var head
var speed_PADDLE = 1 // make to one in hard level

if (game_level == 'Hard'){
    initial_velocity = 0.05 
    speed = 0.0003 
    speed_PADDLE = 0.1
    console.log(initial_velocity,speed_PADDLE)

}else if (game_level == 'Medium'){
    initial_velocity = 0.03 
    speed = 0.0002
    speed_PADDLE = 0.09
    console.log(initial_velocity,speed_PADDLE)

} else if(game_level == 'Easy'){
    initial_velocity = 0.03 
    speed = 0.0001
    speed_PADDLE = 0.05
    console.log(initial_velocity,speed_PADDLE)
}

head = document.getElementById("head") // to get the boundaries of the hearder
function topbox(head){ // this function gives the boundaries of the header 
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


    rectangle(){
        return this.ballelem.getBoundingClientRect() // gives the position of the ball
    }

    reset(){
        this.x =50
        this.y = 55
        this.direction = {x:0}

        while (Math.abs(this.direction.x <=0.2) || Math.abs(this.direction >= 0.9)){ // to make sure that ball doesnot move vertically or horizontally completly
            const heading = randomanglebetween(0,2 * Math.PI)    // where i am heading to from 0 to 360 in radians 
            this.direction = {x: Math.cos(heading) , y: Math.sin(heading)}
            // console.log(this.direction)
        }

        this.velocity = initial_velocity
    }

    

    update(delta,paddlerectangle){
        this.x +=this.direction.x * this.velocity * delta
        this.y +=this.direction.y * this.velocity * delta
        this.velocity += speed

        const rectangle = this.rectangle()

        if (rectangle.bottom >= window.innerHeight || rectangle.top <= topbox(head).bottom){  
            this.direction.y = this.direction.y *  -1
        }
        
        if (paddlerectangle.some(r => iscollide(r, rectangle))){    //give the code to change color and add the bat sound effect here
            this.direction.x *=-1
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
            document.documentElement.style.setProperty("--hue", hue+ 50 + delta/50)



        }
    }


}

function randomanglebetween(n,m){
    let angle = Math.random() * (m - n) + n;
    return angle;
}

function iscollide(r1 , r2){
    return r1.left <=r2.right && r1.right >= r2.left && r1.top <=r2.bottom && r1.bottom >=r2.top
}


//-----------------------------X-----------------X-----------


// CLASS FOR THE PADDLE 
class Paddle{
    constructor(paddlelem){
        this.paddlelem = paddlelem
        this.reset()
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddlelem).getPropertyValue("--position"))
    }

    set position(value){
        this.paddlelem.style.setProperty('--position', value);
    }

    rectangle(){
        return this.paddlelem.getBoundingClientRect()
    }

    reset(){
        this.position = 60
    }


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

var p_score = 0
var c_score =0 


// update function to update the position of paddle and ball
let lasttime

function update(time){

    if (lasttime != null ){ // to make sure we have a lastime to compare and get delta 

        const delta = time - lasttime //how time has pasted btw two frames (frame drop)
        // console.log(delta)
        ball.update(delta ,[player_paddle.rectangle() , computer_paddle.rectangle()])
        computer_paddle.update(delta,ball.y)
        // const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        // document.documentElement.style.setProperty("--hue", hue+ 50 + delta/5)


    }
    lasttime = time
    
    window.requestAnimationFrame(update)

    if (ballout()){
        const rectangle = ball.rectangle()
        if (rectangle.right >=window.innerWidth){
            p_score++
            player_score.textContent = p_score
        }else{
            c_score++
            computer_score.textContent = c_score
        }
        ball.reset()
        computer_paddle.reset()
        who_win(c_score,p_score)


    }
}

gamearea.addEventListener('mousemove',e => {
    player_paddle.position = (e.y / window.innerHeight) * 100 // converting the y from pixels to percentage in terms of vh
})

function ballout(){
    const rectangle = ball.rectangle()
    return rectangle.left <=0 || rectangle.right >= window.innerWidth

}

window.requestAnimationFrame(update)

l=['',"RoboPong",'PaddleMaster','TheBot','Ponginator']

update_avator_name(avator)
update_comp_avator_name(l)


console.log(player_name,game_level,avator)
console.log(c_score,p_score)



// to update the avator

function update_avator_name(n){
    player_image.innerHTML = `<img src="./assets/avator-${n}.png" alt="" class="player_image">`
    player_name_given.textContent = localStorage.getItem('name')

}



// to update computer avator 

function update_comp_avator_name(l){
    let random = Math.floor(Math.random()*4)+1;
    computer_image.innerHTML = `<img src="./assets/comp_avator-${random}.png" alt="" class="computer_image">`
    computer_name.textContent = l[random]
    console.log(l[random])
    localStorage.setItem("comp_name",l[random])
    localStorage.setItem("comp_avator",random)
}


function who_win(comp_score,player_score){
    if (player_score >=6){
        window.location.href = "./gameover.html"
        
    }else if (comp_score >=6){
        window.location.href = "./gameover.html"
    }
    
}