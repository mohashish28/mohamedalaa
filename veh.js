class vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.target = createVector(x, y)
    this.vel = p5.Vector.random2D()
    this.acc = createVector(0, 0)

    this.maxspeed = 10
    this.maxforce = 0.15   // 🔹 lower = smoother curves
  }

  show() {
    strokeWeight(1)
    stroke(255)
    point(this.pos.x, this.pos.y)
  }

  update() {
    // apply forces
    this.vel.add(this.acc)

    // 🔹 SMOOTHING (Bezier-like curvature)
    let desired = this.vel.copy().setMag(this.maxspeed)
    this.vel.lerp(desired, 0.05)   // ← magic line

    this.pos.add(this.vel)
    this.acc.set(0, 0)
  }

  applyforce(f) {
    this.acc.add(f)
  }

  flee(target) {
    let force = p5.Vector.sub(this.pos, target)
    let d = force.mag()

    if (d < 60) {
      force.setMag(this.maxspeed)
      force.sub(this.vel)
      force.limit(this.maxforce)
      force.mult(-1)
      return force
    }

    return createVector(0, 0)
  }

  arrive(target) {
    let force = p5.Vector.sub(target, this.pos)
    let d = force.mag()

    let speed = this.maxspeed
    if (d < 60) {
      speed = map(d, 0, 60, 0, this.maxspeed)
    }

    force.setMag(speed)
    force.sub(this.vel)
    force.limit(this.maxforce)
    return force
  }

  behaviour() {
    let mouse = createVector(mouseX, mouseY)

    let fleeForce = this.flee(mouse)
    let arriveForce = this.arrive(this.target)

    this.applyforce(fleeForce)
    this.applyforce(arriveForce)
  }
}
