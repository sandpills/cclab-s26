class TeddyBearDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.bearColor = color(158, 208, 236);
        this.strokeColor = color(60, 90, 120);
        this.muzzleColor = color(218, 242, 255);
        this.time = 0;
        this.bounceY = 0;
        this.tiltAngle = 0;
        this.leftArmAngle = 0;
        this.rightArmAngle = 0;
        this.leftLegAngle = 0;
        this.rightLegAngle = 0;
    }
    update() {
        // update properties here to achieve
        // your dancer's desired moves and behaviour
        this.time += 0.05;
        this.bounceY = sin(this.time * 4) * 10;
        this.tiltAngle = sin(this.time * 2) * 0.1;
        this.leftArmAngle = sin(this.time * 2) * 0.5;
        this.rightArmAngle = cos(this.time * 2) * 0.4;
        this.leftLegAngle = sin(this.time * 2 + PI) * 0.2;
        this.rightLegAngle = cos(this.time * 2 + PI) * 0.2;
    }
    display() {
        // the push and pop, along with the translate 
        // places your whole dancer object at this.x and this.y.
        // you may change its position on line 19 to see the effect.
        push();
        translate(this.x, this.y);

        // ******** //
        // ⬇️ draw your dancer from here ⬇️

        translate(0, this.bounceY);
        rotate(this.tiltAngle);
        scale(0.45);

        stroke(this.strokeColor);
        strokeWeight(1.5);
        fill(this.bearColor);

        push();
        translate(-30, 90);
        rotate(this.leftLegAngle);
        ellipse(0, 10, 70, 90);
        pop();

        push();
        translate(30, 90);
        rotate(this.rightLegAngle);
        ellipse(0, 10, 70, 90);
        pop();

        ellipse(0, 40, 130, 150);

        push();
        translate(-40, -10);
        rotate(this.leftArmAngle);
        ellipse(0, 30, 50, 100);
        pop();

        push();
        translate(40, -10);
        rotate(this.rightArmAngle);
        ellipse(0, 30, 50, 100);
        pop();

        ellipse(0, -60, 120, 110);

        ellipse(-50, -110, 45, 45);
        ellipse(50, -110, 45, 45);

        fill(this.muzzleColor);
        ellipse(-50, -110, 30, 30);
        ellipse(50, -110, 30, 30);

        ellipse(0, -45, 70, 55);

        noStroke();
        fill(30);
        ellipse(-25, -70, 12, 12);
        ellipse(25, -70, 12, 12);

        ellipse(0, -55, 25, 18);

        noFill();
        stroke(30);
        strokeWeight(2);
        line(0, -46, 0, -30);
        arc(0, -30, 30, 15, 0, PI);

        pop();
    }
}


class CatDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY + 200;
        // add properties for your dancer here:
        // properties for movement
        this.angle = 0; // spinning
        this.jumpOffset = 0; // vertical movement
        this.timer = 0; // progress tracker for the jump math
        this.noiseOffset = random(1000); // random starting point for noise
        this.eyeH = 8;
        this.blink = 8;
        this.shake = 0;

        // For Mouse Interaction
        this.extraJump = 0;
    }

    update() {
        // 1. Natural Wandering (Noise)
        let n = noise(this.noiseOffset + frameCount * 0.02);
        let drift = map(n, 0, 1, -15, 15);
        this.noiseOffset += 0.01;

        // 2. Smooth Combined Jump (Sine + Noise)
        this.timer += 0.08;

        // We only calculate this ONCE so it doesn't flicker
        this.jumpOffset = (sin(this.timer) * 30) + drift;

        // 3. Mouse Jump (Lerp for smoothness)
        if (mouseIsPressed) {
            this.extraJump = lerp(this.extraJump, -100, 0.1);
        } else {
            this.extraJump = lerp(this.extraJump, 0, 0.1);
        }

        this.angle += 0.04;

        this.shake = sin(frameCount * 0.05) * 0.1;
        if (random(1) > 0.98) {
            this.shake += random(-0.3, 0.3);
        }

        // 6. Blink logic
        let blinkSpeed = abs(sin(frameCount * 0.07));
        this.blink = (blinkSpeed > 0.96) ? 1 : this.eyeH;
    }

    display() {
        push();
        translate(this.x, this.y + this.jumpOffset + this.extraJump);
        rotate(this.angle + this.shake); // rotate the cat

        // ⬇️ draw your dancer from here ⬇️
        noStroke();

        // Body changes color slightly when clicked!
        if (mouseIsPressed) fill(200, 255, 150);
        else fill(150, 255, 100); // Lime Green

        // Ears
        triangle(-25, -20, -25, -40, 0, -20); // left ear
        triangle(25, -20, 25, -40, 0, -20);   // right ear

        //Antennas
        stroke(150, 255, 100);
        strokeWeight(2);
        line(-8, -25, -15, -50 + this.shake * 10);
        line(8, -25, 15, -50 - this.shake * 10);

        // Face+Body
        ellipse(0, 0, 60, 55);

        // Whiskers
        stroke(255); // white whiskers
        strokeWeight(1);

        // Left side
        line(-15, 5, -45, 0);
        line(-15, 8, -45, 10);
        line(-15, 11, -45, 20);

        // Right side
        line(15, 5, 45, 0);
        line(15, 8, 45, 10);
        line(15, 11, 45, 20);
        noStroke();

        // Eyes
        fill(0);
        ellipse(-12, -5, 8, this.blink); // left eye
        ellipse(12, -5, 8, this.blink);  // right eye

        // Nose
        fill(255, 150, 150);
        triangle(-4, 2, 4, 2, 0, 6);

        // Paws
        fill(150, 255, 100);

        // Paws "reach out" when jumping high

        let pawReach = mouseIsPressed ? 10 : 0;
        ellipse(-20, 25 + pawReach, 15, 10); // left
        ellipse(20, 25 + pawReach, 15, 10); // right
        pop();

    }
}

class TamilaDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        // add properties for your dancer here:

        this.tailAngle = 0;
        this.bodyY = 0;
        this.bodyX = 0;
        this.bodyRotate = 0;


    }
    update() {
        // update properties here to achieve
        // your dancer's desired moves and behaviour

        // tail moves like a sine wave
        this.tailAngle = sin(frameCount * 0.15) * 0.8;
        // whole body moves up and down slightly
        this.bodyY = sin(frameCount * 0.1) * 3;
        // body sways left and right
        this.bodyX = sin(frameCount * 0.08) * 5;
        // body rotates slightly
        this.bodyRotate = sin(frameCount * 0.2) * 0.2;
    }
    display() {
        // the push and pop, along with the translate 
        // places your whole dancer object at this.x and this.y.
        // you may change its position on line 19 to see the effect.
        push();
        translate(this.x + this.bodyX, this.y + this.bodyY);



        // ******** //
        // ⬇️ draw your dancer from here ⬇️

        stroke(242, 115, 5);
        strokeWeight(1.5);
        noFill();


        // tail
        push();
        translate(0, -50);
        rotate(this.tailAngle * 0.3);
        beginShape();
        stroke(245, 148, 64);
        strokeWeight(16);
        noFill();
        for (let y = 0; y <= 50; y += 4) {
            let x = sin(y * 0.12 + frameCount * 0.1) * 4;
            vertex(x, -y);
        }
        endShape();
        pop();

        // body
        push();
        rotate(this.bodyRotate);
        fill(245, 148, 64);
        stroke(156, 74, 3);
        ellipse(0, 0, 75, 100);
        pop();

        // arms
        fill(245, 141, 51);
        stroke(156, 74, 3);
        ellipse(-40, 72, 37, 22);
        ellipse(40, 72, 37, 22);

        // head
        fill(245, 148, 64);
        ellipse(0, 55, 86, 70);

        // ears
        fill(245, 141, 51);
        triangle(-40, 37, -30, 0, -12, 20);
        triangle(40, 37, 30, 0, 12, 20);

        fill(250, 197, 240);
        triangle(-30, 25, -28, 8, -19, 18);
        triangle(30, 25, 28, 8, 19, 18);


        // cheeks
        stroke(247, 139, 204)
        fill(250, 197, 240);
        ellipse(-30, 55, 15, 10);
        ellipse(30, 55, 15, 10);

        // eyes
        stroke(156, 74, 3);
        fill(255);
        ellipse(-20, 50, 20, 17);
        ellipse(20, 50, 20, 17);

        // pupils
        fill(0);
        noStroke()
        ellipse(-20, 50, 13, 17);
        ellipse(20, 50, 13, 17);

        // nose
        stroke(128, 10, 81)
        strokeWeight(0.6);
        fill(222, 82, 143);
        triangle(-5, 60, 0, 65, 5, 60);

        // mouse
        noFill();
        stroke(54, 3, 33);
        strokeWeight(2)
        arc(0, 65, 20, 12, 0, PI / 2);

        pop();
    }
}

class SavannaDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        // add properties for your dancer here:
        //head
        this.headW = 108;
        this.headH = 108;
        //eyes
        this.eyeW = 10;
        this.eyeY = 30;
        this.eyeH = 20;
        this.eyeX = 30;
        //mouth
        this.mouthW = 20;
        this.mouthH = 9;
        this.mouthY = 55;
        //cheek
        this.cheekW = 20;
        this.cheekH = 10;
        this.cheekY = 50;
        //update
        this.bounce = 0;
        this.blink;
        this.shake;
    }
    update() {
        // update properties here to achieve
        // your dancer's desired moves and behaviour
        this.bounce = sin(frameCount * 0.08) * 10;
        let blinkSpeed = map(sin(frameCount * 0.07), -1, 1, 0, 20);

        if (blinkSpeed > 0.95) {
            this.blink = 2;
        } else {
            this.blink = this.eyeH;
        }
        this.shake = sin(frameCount * 0.05) * 0.5;
    }
    display() {
        // the push and pop, along with the translate 
        // places your whole dancer object at this.x and this.y.
        // you may change its position on line 19 to see the effect.
        push();
        translate(this.x, this.y + this.bounce);
        rotate(this.shake);
        // ******** //
        // ⬇️ draw your dancer from here ⬇️

        //Frog head
        fill(144, 238, 144);
        noStroke();
        ellipse(0, 0, 180, 138);

        circle(-72, -56, 57);
        circle(72, -56, 57);

        fill(0);
        stroke(0);
        strokeWeight(5);
        fill(144, 238, 144);
        arc(0, -48, 20, 9, 2 * PI, PI);

        fill(0);
        noStroke();
        circle(-72, -52, 30);
        circle(72, -52, 30);

        fill(200);
        circle(-72, -58, 10);
        circle(70, -58, 10);

        //Savana's Head
        noStroke()
        fill(240, 211, 192);
        ellipse(0, 16, this.headW, this.headH);

        //Savanna's Hair
        fill(0);
        arc(0, -10, 99, 60, 159.9, PI / 10.5);
        arc(43, 20, 25, 80, 29.5, PI / 2);
        arc(-43, 20, 25, 80, PI / 2, 30.25);
        arc(0, -10, 99, 60, 159.9, PI / 10.5);

        //Savanna's Eyes
        stroke(0);
        strokeWeight(3);
        ellipse(-this.eyeX, this.eyeY, this.eyeW, this.blink);
        ellipse(this.eyeX, this.eyeY, this.eyeW, this.blink);

        //Savanna's Mouth
        fill(245, 116, 124);
        noStroke();
        strokeWeight(1);
        ellipse(0, this.mouthY, this.mouthW, this.mouthH);

        fill(255, 177, 182);
        noStroke();
        ellipse(0, 59, 10, 2);

        //Savanna's cheek
        noStroke();
        fill(255, 217, 236);
        ellipse(-this.eyeXOffset, this.cheekY, this.cheekW, this.cheekH);
        ellipse(this.eyeXOffset, this.cheekY, this.cheekW, this.cheekH);


        pop();
    }
}

class NurbolDancer {
    constructor(startX, startY) {
        this.x = startX
        this.y = startY
        this.t = random(1000)
        this.angle = 0
        this.armAngle = 0
        this.legAngle = 0
        this.bounceY = 0
        this.headBob = 0
        this.spinAngle = 0
        this.green = random(10, 200)
        this.col = color(255, 80, this.green)
    }

    update() {
        this.t += 0.05;
        this.angle = sin(this.t) * 0.3
        this.armAngle = sin(this.t * 2) * 0.8
        this.legAngle = sin(this.t * 2) * 0.4
        this.bounceY = sin(this.t * 3.5) * -15
        this.headBob = sin(this.t * 2) * 4
        this.spinAngle = sin(this.t * 0.5) * 0.2
    }

    display() {
        push();
        translate(this.x, this.y + this.bounceY)
        rotate(this.spinAngle)

        // shadow
        noStroke();
        fill(0, 0, 0, 60)
        ellipse(0, 95 - this.bounceY, 60, 10)

        // legs
        this.drawLimb(-10, 60, -10 + sin(this.legAngle) * 25, 95, 6, this.col)
        this.drawLimb(10, 60, 10 - sin(this.legAngle) * 25, 95, 6, this.col)
        // feet
        fill(80, 60, 180)
        noStroke();
        ellipse(-10 + sin(this.legAngle) * 25, 97, 18, 8)
        ellipse(10 - sin(this.legAngle) * 25, 97, 18, 8)

        // body
        fill(this.col)
        stroke(220, 40, 90)
        strokeWeight(1.5)
        rect(-23, 10, 46, 52, 10)

        // belly pattern (dots)
        /* noStroke();
        fill(255, 160, 180, 180)
        ellipse(-10, 30, 8, 8)
        ellipse(10, 30, 8, 8)
        ellipse(0, 45, 8, 8); */

        // left arm
        push();
        translate(-23, 18)
        rotate(-this.armAngle - 0.3)
        this.drawLimb(0, 0, 0, 40, 7, this.col)
        // left hand
        fill(255, 200, 160)
        noStroke();
        ellipse(0, 44, 14, 14)
        pop();

        // right arm
        push();
        translate(23, 18)
        rotate(this.armAngle + 0.3)
        this.drawLimb(0, 0, 0, 40, 7, this.col)
        // right hand
        fill(255, 200, 160)
        noStroke();
        ellipse(0, 44, 14, 14)
        pop();

        // head
        fill(255, 200, 160)
        noStroke();
        rect(-6, -4, 12, 16, 4)
        push()
        translate(this.headBob, -20)
        fill(255, 200, 160)
        stroke(220, 160, 120)
        strokeWeight(1);
        ellipse(0, 0, 52, 52)

        // eyes
        fill(255)
        noStroke();
        ellipse(-11, -4, 14, 14)
        ellipse(11, -4, 14, 14)

        // pupils 
        fill(40, 30, 80);
        noStroke();
        let lookX = map(mouseX, 0, width, -3, 3);
        let lookY = map(mouseY, 0, height, -3, 3);
        lookX = constrain(lookX, -3, 3);
        lookY = constrain(lookY, -3, 3);

        ellipse(-11 + lookX, -3 + lookY, 7, 8);
        ellipse(11 + lookX, -3 + lookY, 7, 8);

        // eyebrows 
        stroke(120, 80, 60)
        strokeWeight(2)
        let browLift = sin(this.t * 2) * 2 + 3
        line(-16, -13 - browLift, -6, -11 - browLift)
        line(6, -11 - browLift, 16, -13 - browLift)

        // mouth
        noFill();
        stroke(180, 80, 80)
        strokeWeight(2)
        let smileW = 14 + sin(this.t * 2) * 3
        arc(0, 8, smileW, 10, 0, PI)

        // hair tufts
        stroke(80, 50, 30)
        strokeWeight(3)
        noFill();
        line(-10, -24, -14, -38)
        line(0, -26, 0, -40);
        line(10, -24, 14, -38)

        pop();

        pop();
    }

    drawLimb(x1, y1, x2, y2, weight, col) {
        stroke(col);
        strokeWeight(weight);
        line(x1, y1, x2, y2);
    }
}

class myBot {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.floatOffset = 0;
        this.speed = 0.05;

        //color
        this.bodyColor = [230, 230, 230];
        this.armColor = [210, 210, 210];
        this.darkColor = [90, 90, 90];
        this.lightBlue = [111, 225, 242];
        this.eyeColor = [90, 218, 237];
        this.antennaColor = [170, 170, 170];
        this.headColor = [240, 240, 240];
        this.neckColor = [180, 180, 180];

        //[x, y, w, h]
        this.parts = {
            wheels: [
                [-30, 30, 15, 80],
                [15, 30, 15, 80]
            ],
            neck: [
                [-10, -30, 20, 30]
            ],
            antennaBars: [
                [-50, -40, 100, 15],
                [-50, -80, 10, 40],
                [40, -80, 10, 40]
            ],
            antennaTips: [
                [-52.5, -90, 15, 15],
                [37.5, -90, 15, 15]
            ],
            head: [
                [-35, -60, 70, 50]
            ],
            arms: [
                [-50, 5, 30, 50],
                [20, 5, 30, 50]
            ],
            body: [
                [-40, 0, 80, 60]
            ],
            eyes: [
                [-25, -50, 10, 30],
                [15, -50, 10, 30]
            ]
        };
    }
    update() {
        this.floatOffset = sin(frameCount * this.speed) * 20;
    }
    display() {

        push();
        translate(this.x, this.y + 70);

        noStroke();

        // wheels
        fill(this.darkColor[0], this.darkColor[1], this.darkColor[2]);
        for (let i = 0; i < this.parts.wheels.length; i++) {
            let p = this.parts.wheels[i];
            rect(p[0], p[1], p[2], p[3]);
        }


        // bouncing part
        push();
        translate(0, this.floatOffset);

        // neck
        fill(this.neckColor[0], this.neckColor[1], this.neckColor[2]);
        for (let i = 0; i < this.parts.neck.length; i++) {
            let p = this.parts.neck[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        // antenna bars
        fill(this.antennaColor[0], this.antennaColor[1], this.antennaColor[2]);
        for (let i = 0; i < this.parts.antennaBars.length; i++) {
            let p = this.parts.antennaBars[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        // antenna tips
        fill(this.lightBlue[0], this.lightBlue[1], this.lightBlue[2]);
        for (let i = 0; i < this.parts.antennaTips.length; i++) {
            let p = this.parts.antennaTips[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        // head
        fill(this.headColor[0], this.headColor[1], this.headColor[2]);
        for (let i = 0; i < this.parts.head.length; i++) {
            let p = this.parts.head[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        // arms
        fill(this.armColor[0], this.armColor[1], this.armColor[2]);
        for (let i = 0; i < this.parts.arms.length; i++) {
            let p = this.parts.arms[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        // body
        fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
        for (let i = 0; i < this.parts.body.length; i++) {
            let p = this.parts.body[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        // eyes
        fill(this.eyeColor[0], this.eyeColor[1], this.eyeColor[2]);
        for (let i = 0; i < this.parts.eyes.length; i++) {
            let p = this.parts.eyes[i];
            rect(p[0], p[1], p[2], p[3]);
        }

        pop();


        // ⬆️ draw your dancer above ⬆️
        // ******** //

        pop();
    }
}

class MindyDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        //color
        this.r = 255;
        this.b = 180;
        this.g = 220;

        //movement
        this.bounce = 0;
        this.stretchX = 1;
        this.stretchY = 1;
        this.slide = 0;

        this.smallBounce = 0;
        this.smallBounce2 = 0;


        // add properties for your dancer here:
        //..
        //..
        //..
    }
    update() {
        // update properties here to achieve
        // your dancer's desired moves and behaviour
        let t = frameCount * 0.05;
        //color
        this.r = 220 + sin(t) * 55;       // pink 
        this.g = 180 + sin(t + 2) * 40;   //green and blue
        this.b = 230 + sin(t + 4) * 25;   //purpleish

        //movement
        this.bounce = sin(t * 2) * 10;
        this.stretchX = 1 + sin(t * 2) * 0.08;
        this.stretchY = 1 - sin(t * 2) * 0.08;
        this.slide = sin(t) * 8;

        //small slimes
        this.smallBounce = sin(t * 2.5 + 1) * 6;
        this.smallBounce2 = sin(t * 2.2 + 3) * 5;
    }
    display() {
        // the push and pop, along with the translate 
        // places your whole dancer object at this.x and this.y.
        // you may change its position on line 19 to see the effect.
        push();
        let slideX = this.slide;

        translate(this.x + slideX, this.y + this.bounce);

        //main slime
        //push();
        scale(this.stretchX, this.stretchY);
        this.drawSlime(0, 0, 1);

        this.drawSlime(-60, 50 + this.smallBounce, 0.5);
        //2nd baby 
        this.drawSlime(50, 40 + this.smallBounce2, 0.3);
        // ******** //
        // ⬇️ draw your dancer from here ⬇️
    }
    drawSlime(x, y, scaleFactor) {
        push();
        translate(x, y);
        scale(scaleFactor);

        noStroke();

        // legs
        fill(this.r, this.g, this.b);
        ellipse(-22, 28, 18, 20);
        ellipse(0, 32, 22, 26);
        ellipse(24, 26, 16, 20);

        // body
        ellipse(0, 0, 85, 75);

        // highlight
        fill(255, 255, 255, 95);
        ellipse(-16, -24, 18, 14);

        // eyes
        fill(0);
        ellipse(-14, -6, 8, 12);
        ellipse(14, -6, 8, 12);

        // smile
        noFill();
        stroke(40);
        strokeWeight(2 / scaleFactor);
        arc(0, 8, 10, 3, 0, PI);

        // blush
        noStroke();
        fill(193, 28, 132, 90);
        ellipse(-20, 5, 20, 12);
        ellipse(20, 5, 20, 12);

        pop();
    }
}


class spongeDancer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        this.y = height / 2 + 10 * sin(frameCount * 0.21);
        this.movingarmX = map(sin(frameCount * 0.21), -1, 1, -30, 30);
        this.movingarmY = map(sin(frameCount * 0.21), -1, 1, -35, -15);
        this.movinglegX = map(sin(frameCount * 0.21), -1, 1, -30, 50);
        this.movinglegY = map(sin(frameCount * 0.21), -1, 1, 60, 90);
    }
    display() {
        push();
        translate(this.x, this.y);

        noStroke();

        //face
        rectMode(CENTER);
        fill(247, 247, 87);
        rect(0, -50, 75, 60, 8);

        // music recorder

        // outside
        fill('skyblue');
        rect(35, 0, 75, 40, 50);

        // inner circle left
        push()
        noFill()
        stroke(random(0, 250), 100, 100)
        strokeWeight(3)
        circle(20, -0, 20);
        pop()

        // inner circle right
        push()
        noFill()
        stroke(random(0, 250), 100, 100)
        strokeWeight(3)
        circle(50, -0, 20);
        pop()

        //eyes

        //eyebrow left
        push()
        stroke(0)
        strokeWeight(2)
        beginShape()

        vertex(-15, -60);
        vertex(-20, -70);

        endShape()
        pop()


        push()
        stroke(0)
        strokeWeight(2)
        beginShape()

        vertex(-12, -60);
        vertex(-12, -71);

        endShape()
        pop()


        push()
        stroke(0)
        strokeWeight(2)
        beginShape()

        vertex(-9, -60);
        vertex(-4, -70);

        endShape()
        pop()


        //eyebrow right
        push()
        stroke(0)
        strokeWeight(2)
        beginShape()

        vertex(15, -60);
        vertex(20, -70);

        endShape()
        pop()


        push()
        stroke(0)
        strokeWeight(2)
        beginShape()

        vertex(12, -60);
        vertex(12, -71);

        endShape()
        pop()


        push()
        stroke(0)
        strokeWeight(2)
        beginShape()

        vertex(9, -60);
        vertex(4, -70);

        endShape()
        pop()

        //whites
        fill(255);
        stroke(0);
        ellipse(-12, -55, 20, 23);
        ellipse(12, -55, 20, 23);

        //iris
        fill(124, 185, 217);
        noStroke()
        circle(-12, -55, 9);
        circle(12, -55, 9);

        //pupil
        fill(0);
        circle(-12, -55, 3);
        circle(12, -55, 3);

        //mouth
        fill(220, 20, 60);
        arc(0, -35, 20, 20, 0, PI);

        //tongue
        fill(255, 192, 203);
        arc(0, -30, 10, 20, 0, PI);

        //teeth
        fill(255);
        square(-5, -32.5, 5);
        square(5, -32.5, 5);

        //static body part of bob
        stroke(247, 247, 87);
        strokeWeight(8);
        line(0, -15, -15, 10);
        line(0, -15, 0, 20);
        line(0, 20, 10, 50);
        line(10, 50, 5, 100);

        //moving leg of bob
        stroke(247, 247, 87);
        line(0, 20, 25, 50);
        line(25, 50, this.movinglegX, this.movinglegY);

        //moving arm of bob
        line(-15, 10, this.movingarmX, this.movingarmY);

        pop();
    }
}

class Cat {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
    }
    update() {
    }

    display() {
        push();
        translate(this.x, this.y);

        push()
        scale(1.4)
        this.drawTail();

        //body
        noStroke();
        fill(255);
        triangle(0, -15, -20, 60, 20, 60);

        this.drawHead();
        this.drawPaws();

        pop()

        // this.drawReferenceShapes()
        pop()
    }

    drawHead() {
        let sinVal = sin(frameCount * 0.05);
        let headRot = map(sinVal, -1, 1, -0.5, 0.5);

        push();
        rotate(headRot);

        // ears
        fill(255);
        noStroke();
        triangle(-20, -60, -25, -10, 0, -15);
        triangle(20, -60, 25, -10, 0, -15);
        fill(235, 172, 169);
        triangle(-18, -50, -20, -10, -5, -15);
        triangle(18, -50, 20, -10, 5, -15);

        // headphone connection
        stroke(165, 210, 232);
        strokeWeight(4);
        noFill();
        ellipse(0, -15, 50, 35);

        //head
        noStroke();
        fill(255);
        ellipse(0, -8, 45, 35);

        // nose
        stroke(235, 172, 169)
        strokeWeight(1)
        line(-1, 1, 1, 1)

        // eyes
        push();
        translate(0, 2.5);
        stroke(0);
        strokeWeight(0.3);
        circle(-10, -10, 16);
        circle(10, -10, 16);
        fill(0);
        circle(10, -10, 12);
        circle(-10, -10, 12);
        fill(255);
        circle(-11, -12, 2);
        circle(9, -12, 2);
        pop();

        // headphone (ear muffs)
        noStroke();
        fill(165, 210, 232);
        ellipse(-25, -10, 13, 22);
        ellipse(25, -10, 13, 22);

        pop();
    }

    drawTail() {
        let cosVal = cos(frameCount * 0.05);
        let tailRot = map(cosVal, -1, 1, -0.5, 0.6);

        push();
        translate(0, 52);
        rotate(3);
        rotate(tailRot);
        stroke(255);
        noFill();
        strokeWeight(7);
        beginShape();
        for (let i = 0; i < 40; i++) {
            let offset = sin(frameCount * 0.01 + i * 0.5);
            vertex(offset, 10 + i);
        }
        endShape();
        pop();
    }

    drawPaws() {
        let sinVal = sin(frameCount * 0.2);
        let paw1 = map(sinVal, 0, 1, 58, 60);
        let paw2 = map(sinVal, 0, 1, 60, 58);

        push();
        stroke(235, 172, 169);
        strokeWeight(0.8);
        fill(255);
        //left paw
        ellipse(-10, paw1, 15, 10);
        line(-12, paw1, -12, paw1 + 5)
        line(-9, paw1, -8, paw1 + 5)

        //rightpaw
        ellipse(10, paw2, 15, 10);
        line(12, paw2, 12, paw2 + 5)
        line(9, paw2, 8, paw2 + 5)
        pop();
    }
}


class daiadancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.offset = 0;
        this.cinabounceX = 0;
        this.cinabounceY = 0;
        this.tilt = 0;
        this.earbounce = 0;
        this.hands = 0;
    }
    update() {
        angleMode(DEGREES)
        this.offset = this.offset + 3;
        let noiseval = noise(frameCount * 0.003);
        //     this.cinabounceX = map(noiseval, 0, 1, 20, 30)
        //     this.cinabounceY = map(noiseval, 0, 1, 20, 40)
        this.cinabounceX = sin(this.offset * 0.5) * 15;
        this.cinabounceY = sin(this.offset) * 10;
        this.tilt = sin(this.offset) * 0.9;

        this.earbounce = sin(this.offset * 2) * 5;
        this.hands = sin(this.offset * 2) * 10;
    }
    display() {
        push();
        translate(this.x + this.cinabounceX, this.y + this.cinabounceY);
        rotate(this.tilt);
        stroke(152, 178, 217);
        strokeWeight(4);
        fill(255);
        // lefty ear
        push();
        translate(0 - 40, 0 - 55);
        rotate(15 + this.earbounce);
        beginShape();
        curveVertex(0, 0);
        vertex(0, 0);
        vertex(0 - 14, 0 + 17);
        vertex(0 - 35, 0 + 72);
        vertex(0 - 28, 0 + 127);
        vertex(0 - 6, 0 + 122);
        vertex(0 + 10, 0 + 62);
        vertex(0, 0);
        vertex(0, 0);
        endShape();
        pop();

        // rightyy
        push();
        translate(0 + 40, 0 - 55);
        rotate(-15 - this.earbounce);
        beginShape();
        curveVertex(0, 0);
        vertex(0, 0);
        vertex(0 + 14, 0 + 17);
        vertex(0 + 35, 0 + 72);
        vertex(0 + 28, 0 + 127);
        vertex(0 + 6, 0 + 122);
        vertex(0 - 10, 0 + 62)
        vertex(0, 0);
        vertex(0, 0);
        endShape();
        pop();

        beginShape();
        curveVertex(0 - 16, 0 + 10);
        vertex(0 - 16, 0 + 10);
        vertex(0 - 28, 0 + 32);
        vertex(0 - 24, 0 + 60);
        vertex(0 - 17, 0 + 78);
        vertex(0 - 5, 0 + 70);
        vertex(0 + 5, 0 + 70);
        vertex(0 + 17, 0 + 78);
        vertex(0 + 24, 0 + 60);
        vertex(0 + 28, 0 + 32);
        vertex(0 + 16, 0 + 10);
        vertex(0 - 16, 0 + 10);
        vertex(0 - 16, 0 + 10);
        endShape();

        ellipse(0, 0 - 25, 133, 90);

        stroke(152, 178, 217);
        strokeWeight(4);
        circle(0 - 25, 0 + 30 + this.hands, 30);
        circle(0 + 25, 0 + 30 - this.hands, 30);

        // face
        noStroke();
        fill(180, 211, 240);
        ellipse(0 - 33, 0 - 22, 20, 25);
        ellipse(0 + 33, 0 - 22, 20, 25);

        fill(250, 197, 201);
        ellipse(0 - 38, 0, 30, 20);
        ellipse(0 + 38, 0, 30, 20);

        noFill();
        stroke(135, 149, 201);
        strokeWeight(3);
        arc(0 - 4, 0 - 5, 8, 6, 0, 180);
        arc(0 + 4, 0 - 5, 8, 6, 0, 180);

    }
}

class dancerGhost {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.xSpd = 2;

        this.xArms = -70;
        this.yArms = 150;
        this.yArmSpd = -1;
        this.xArmSpd = -1;

        this.xArms1 = 70;
        this.yArms1 = 10;
        this.yArmSpd1 = 1;
        this.xArmSpd1 = 1;

        this.xLegs = -15;
        this.xLegSpd = -1;

        this.xLegs1 = 15;
        this.xLegSpd1 = 1;

    }
    update() {
        if (mouseIsPressed) {
            this.xArms = this.xArms + this.xArmSpd;
            this.xArms1 = this.xArms1 + this.xArmSpd1;
        }

        if (this.xArms < -70 || this.xArms > 100) {
            this.xArmSpd = -this.xArmSpd;
        }

        if (this.xArms1 < -70 || this.xArms1 > 100) {
            this.xArmSpd1 = -this.xArmSpd1;
        }

        if (key === 'm') {
            this.x = this.x + this.xSpd;
        }

        if (this.x > width || this.x < 0) {
            this.xSpd = -this.xSpd;
        }

        if (key === 's') {
            this.x = width / 2
        }



    }
    display() {
        push();
        translate(this.x, this.y);

        fill(255);
        noStroke();
        // head
        circle(0, 0, 50);
        // neck
        rect(0 - 7, 0 + 20, 13, 20);
        // body   
        ellipse(0, 0 + 85, 70, 110);
        rect(0 - 35, 0 + 80, 70, 70);
        // arms
        stroke(225);
        strokeWeight(10);
        line(0 - 35, 0 + 80, this.xArms, this.yArms);
        line(0 + 35, 0 + 80, this.xArms1, this.yArms1);

        this.yArms = this.yArms + this.yArmSpd;
        this.yArms1 = this.yArms1 + this.yArmSpd1;

        if (this.yArms < 10 || this.yArms > 150) {
            this.yArmSpd = -this.yArmSpd;
        }

        if (this.yArms1 < 10 || this.yArms1 > 150) {
            this.yArmSpd1 = -this.yArmSpd1;
        }

        // legs 
        line(0 - 15, 0 + 150, this.xLegs, 220);
        line(0 + 15, 0 + 150, this.xLegs1, 220);

        this.xLegs = this.xLegs + this.xLegSpd;
        this.xLegs1 = this.xLegs1 + this.xLegSpd1;

        if (this.xLegs > 20 || this.xLegs < -50) {
            this.xLegSpd = -this.xLegSpd;
        }

        if (this.xLegs1 > 50 || this.xLegs1 < -20) {
            this.xLegSpd1 = -this.xLegSpd1;
        }

        fill(255, 0, 0);
        textSize(10);
        text('"m" to move, "s" to reset position', 50, 200);
        text('long press 4 suprise', 50, 220);


        // this.drawReferenceShapes()

        pop();
    }
}

class CircleDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;

        // body + motion values
        this.baseRadius = 50;
        this.bodyRadius = this.baseRadius;
        this.motion = 0;
        this.motionDir = 1;

        // limb angles and lengths
        this.armLength = 30;
        this.legLength = 36;
        this.armBaseLength = 24;
        this.armExtraLength = 30;
        this.legBaseLength = 30;
        this.legExtraLength = 34;

        // x-only movement
        this.homeX = startX;
        this.moveRange = 50;
        this.moveStep = 1.6;
        this.moveDir = 1;
    }
    update() {


        // limbs expand while body shrinks
        this.motion += 0.03 * this.motionDir;
        if (this.motion > 1) {
            this.motion = 1;
            this.motionDir *= -1;
        }
        if (this.motion < 0) {
            this.motion = 0;
            this.motionDir *= -1;
        }

        this.armLength = this.armBaseLength + this.armExtraLength * this.motion;
        this.legLength = this.legBaseLength + this.legExtraLength * this.motion;
        this.bodyRadius = this.baseRadius - 8 * this.motion;

        // move only in x direction: +/- 50 from starting x
        this.x += this.moveStep * this.moveDir;
        if (this.x > this.homeX + this.moveRange) {
            this.x = this.homeX + this.moveRange;
            this.moveDir = -1;
        }
        if (this.x < this.homeX - this.moveRange) {
            this.x = this.homeX - this.moveRange;
            this.moveDir = 1;
        }
    }
    display() {

        push();
        translate(this.x, this.y);

        // ******** //
        // ⬇️ draw your dancer from here ⬇️
        // Body
        fill(100, 200, 255);
        noStroke();
        ellipse(0, 0, this.bodyRadius * 2, this.bodyRadius * 2);

        // ellipse(0, -60, 60, 60);

        // Eyes
        fill(255);
        ellipse(-this.bodyRadius * 0.4, -this.bodyRadius * 0.2, 20, 20); // left eye
        ellipse(this.bodyRadius * 0.4, -this.bodyRadius * 0.2, 20, 20);  // right eye
        fill(0);
        ellipse(-this.bodyRadius * 0.4, -this.bodyRadius * 0.2, 8, 8);   // left pupil
        ellipse(this.bodyRadius * 0.4, -this.bodyRadius * 0.2, 8, 8);    // right pupil

        // Smile
        noFill();
        stroke(0);
        strokeWeight(3);
        arc(0, this.bodyRadius * 0.35, 40, 20, 0, PI); // smile

        // Arms + legs
        stroke(80, 180, 255);
        strokeWeight(10);

        // Left arm
        push();
        rotate(PI + 0.35);
        translate(this.bodyRadius, 0);
        line(0, 0, this.armLength, 0);
        pop();

        // Right arm
        push();
        rotate(-0.35);
        translate(this.bodyRadius, 0);
        line(0, 0, this.armLength, 0);
        pop();

        // Left leg
        push();
        rotate(PI / 2 + 0.55);
        translate(this.bodyRadius, 0);
        line(0, 0, this.legLength, 0);
        pop();

        // Right leg
        push();
        rotate(PI / 2 - 0.55);
        translate(this.bodyRadius, 0);
        line(0, 0, this.legLength, 0);
        pop();



        // ⬆️ draw your dancer above ⬆️
        // ******** //

        // the next function draws a SQUARE and CROSS
        // to indicate the approximate size and the center point
        // of your dancer.
        // it is using "this" because this function, too, 
        // is a part if your Dancer object.
        // comment it out or delete it eventually.
        // this.drawReferenceShapes()

        pop();
    }
    drawReferenceShapes() {
        noFill();
        stroke(255, 0, 0);
        line(-5, 0, 5, 0);
        line(0, -5, 0, 5);
        stroke(255);
        rect(-100, -100, 200, 200);
        fill(255);
        stroke(0);
    }
}
