// click function drawing a circle stopping on the third

// draw a line connecting the three first circles

// add a fourth circle that is the double of the distance of the 
// first on and the line between the second and third

// remove the line between the second and third and draw another
// one connecting the second and the third to the fourth

// draw the circle inside the parallelogram

var canvas = null,
    circles = [],
    lines = [],
    bigCircle = null,
    btnAbout = null,
    btnReset = null,
    btnLink = null,
    textAbout = '';

class Circle {
    constructor(x, y, diameter = 11, col = 'red') {
        this._x = x;
        this._y = y;
        this._color = col;
        this._diameter = diameter;
    }

    display() {
        stroke(this._color);
        noFill();
        ellipse(this._x, this._y, this._diameter);
        this.showCoordinates();
    }

    showCoordinates() {
        textSize(12);
        noStroke();
        fill(0)
        text(`x: ${this._x}, y: ${this._y}`, this._x, (this._y - 12));
    }
}

class Line {
    constructor(originX, originY, targetX, targetY) {
        this._originX = originX;
        this._originY = originY;
        this._targetX = targetX;
        this._targetY = targetY;
        this._color = color(0, 0, 255)
    }

    display() {
        stroke(this._color);
        line(this._originX, this._originY, this._targetX, this._targetY);
    }
}

function setup() {
    // initialize canvas
    canvas = createCanvas(800, 500);
    canvas.class('main-canvas');
    canvas.mousePressed(onMousePressed)

    // initialize about button
    btnAbout = createButton('About');
    btnAbout.class('btn btn-about');
    btnAbout.mousePressed(showAbout);

    // initialize reset button
    btnReset = createButton('Reset');
    btnReset.class('btn btn-reset');
    btnReset.mousePressed(resetCanvas);

    // initialize link button
    btnLink = createButton('Fillipe Hott');
    btnLink.class('btn btn-link');
    btnLink.mousePressed(link);

    // initialize the big circle
    bigCircle = new Circle(-10, -10, 0, 'red');
}

function draw() {
    // a gray background
    background('#CCC');
    
    // drawing the circles
    for (var i = 0; i < circles.length; i++) {
        circles[i].display();
    }

    // draw the lines
    for (var i = 0; i < lines.length; i++) {
        lines[i].display();
    }

    // draw the parallelogram and the big circle when
    // is the time
    if (circles.length === 3) {
        drawParallelogram();
        drawBigCircle();
    }

    // the big circle is always on the screen, but invisible
    // and show when is time
    bigCircle.display();

    // about text
    textSize(18);
    fill(100)
    textAlign(LEFT, TOP);
    text(textAbout, 20, 20, 600, 600);
}

function onMousePressed() {
    // hide about text
    textAbout = '';

    // redraw the circles and lines
    if (circles.length === 4) {
        circles = circles.slice(1,3);
        lines = lines.slice(1, 2);
    }

    circles.push(new Circle(mouseX, mouseY));

    // draw the first rect
    if (circles.length === 2) {
        lines.push(new Line(circles[0]._x, circles[0]._y, circles[1]._x, circles[1]._y));
    }
}

function drawParallelogram() {
    // calculate the X coordinate of the fourth point
    var xAux = circles[2]._x - circles[1]._x;
    xAux = xAux + circles[0]._x;

    // calculate the Y coordinate of the fourth point
    var yAux = circles[2]._y - circles[1]._y;
    yAux = yAux + circles[0]._y;

    // draw the fourth point
    circles.push(new Circle(xAux, yAux));

    // draw the two rects and building the parallelogram
    lines.push(new Line(circles[1]._x, circles[1]._y, circles[2]._x, circles[2]._y));
    lines.push(new Line(circles[0]._x, circles[0]._y, circles[3]._x, circles[3]._y));
    lines.push(new Line(circles[2]._x, circles[2]._y, circles[3]._x, circles[3]._y));
}

function drawBigCircle() {
    // calculate the distancies to build the triangle
    var dist1 = dist(circles[0]._x, circles[0]._y, circles[1]._x, circles[1]._y);
    var dist2 = dist(circles[1]._x, circles[1]._y, circles[2]._x, circles[2]._y);
    
    // calculate the radius of the circle
    var triangleArea = (dist1 + dist2) / 2;
    var parallelogramArea = triangleArea * 2;
    var radius = parallelogramArea/Math.PI

    // calculate the center of the parallelogram
    var centerX = (circles[0]._x + circles[2]._x) / 2;
    var centerY = (circles[0]._y + circles[2]._y) / 2;

    // update the big circle
    bigCircle = new Circle(centerX, centerY, radius * 2, 'yellow');
}

function resetCanvas() {
    textAbout = '';
    circles = [];
    lines = [];
    bigCircle = new Circle(0, 0, 0, 'red');
}

function showAbout() {
    resetCanvas();

    textAbout = 'This is a front-end challenge from Record Union :D\n\n';
    textAbout += 'When you click on the canvas area, it will draw a red circle, on the third circle, the program will draw another circle which is the fouth point of a parallelogram, complete the parallelogram with blue lines and draw a yellow circle at the center of the parallelogram with the same area of it.\n\n';
    textAbout += 'I did this and my name is Fillipe Hott, you can know more about me clicking on the "Fillipe Hott" button on the left of your screen ;)\n\n';
    textAbout += 'Just click anywhere in the canvas\nto close this message.';
}

function link() {
    window.open('https://about.me/fhott/','_blank');
}