let pt
let f
let pts
let veh
let veh2
let vehs =[] 
let vehs2 =[] 
 let png
 let cols =[]
 
function preload(){
f = loadFont('3.ttf')
png = loadImage('1.svg')

}



function setup() {
  createCanvas(400, 400);
   

///pts

  pt =f.textToPoints('F',20,370,350,{
    sampleFactor: .5,
    simplifyThreshold:.05
  })
 for (let i =0; i<pt.length; i++){
  pts = pt[i]
 veh = new vehicle (pts.x,pts.y)
 
 vehs.push(veh)
 }




}




function draw() {
 background(255);



beginShape()
 for (let i =0; i<pt.length; i++){


  
  vehs[i].show()
  vehs[i].update()
  vehs[i].behaviour()
  fill(0)
vertex(vehs[i].pos.x,vehs[i].pos.y)

 
  }
endShape();




 ///img

}




 