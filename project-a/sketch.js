let creatureX = 200;
let creatureY = 200;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container")
}

function draw() {
    background(220);

    creatureX = lerp(creatureX, mouseX, 0.02);
    creatureY = lerp(creatureY, mouseY, 0.02);
    drawCreature(creatureX, creatureY);
}

function drawCreature(creatureX, creatureY) {
    for (let a = 0; a < 360; a += 30) {
        push()
        fill(255)
        translate(creatureX, creatureY) // translation for the entire thing
        rotate(frameCount * 0.01) // rotation for the entire creature
        let x = cos(radians(a)) * 100 // freq + amp
        let y = sin(radians(a)) * 100

        //draw small rect
        push()
        let offset = map(sin(frameCount * 0.1), -1, 1, -20, 20) // oscilating offset
        translate(x, y)
        rotate(radians(a))
        rect(0 - 20 + offset, 0 - 5, 40, 10)

        // helper circle
        fill("blue")
        circle(0, 0, 5)
        pop()

        //draw rotating rect
        push()
        translate(x * 0.8, y * 0.8)
        fill(5)
        rotate(frameCount * 0.1)
        rect(0 - 10, 0 - 10, 20, 20)

        // helper circle
        fill("red")
        circle(0, 0, 5)
        pop()

        pop()
    }
}