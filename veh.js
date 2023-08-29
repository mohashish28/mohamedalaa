class vehicle {
constructor (x,y){
this.pos = createVector(x,y)
this.target = createVector(x,y)
this.vel = createVector(0,0)
this.acc = createVector(0,0)
this.maxspeed =10
this.maxforce = .5

}

show (){
    strokeWeight(1)
    fill(255)
    point(this.pos.x,this.pos.y)
  ///  circle(this.pos.x,this.pos.y,20)
}

update(){
this.vel.add(this.acc)
this.pos.add (this.vel)
this.acc.set(0,0)


}

applyforce(f){
this.acc.add(f)
}

flee(target){
let force = p5.Vector.sub(this.pos,target)
let d = force.mag()
let speed =this.maxspeed
if (d<60){

    force.setMag(speed)
    force.sub(this.vel)
    force.mult(-1)
force.mult(this.maxforce)
}else {

force.set(0,0)

}



return force
}

arrive (target){

    let force = p5.Vector.sub(target,this.pos)
    let d = force.mag()
    let speed =this.maxspeed
    if (d<60){
    
        speed = map (d,0,60,0,this.maxspeed)
  
    }
    force.setMag(speed)
    force.sub(this.vel)
    force.mult(this.maxforce)

    return force
}



behaviour(){

let flee 
let mous = createVector(mouseX,mouseY)
flee =this.flee(mous)
this.applyforce(flee)


let arrive 
arrive = this.arrive(this.target)
this.applyforce(arrive)

}




}