// click function drawing a circle stopping on the third

// draw a line connecting the three first circles

// add a fourth circle that is the double of the distance of the 
// first on and the line between the second and third

// remove the line between the second and third and draw another
// one connecting the second and the third to the fourth

// draw the circle inside the parallelogram

var circles = [];
var lines = [];
var bigCircle = null;

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
    createCanvas(500, 500);

    // initializing the big circle
    bigCircle = new Circle(0, 0, 0, 'red');
}

function draw() {
    // a gray background
    background(200);
    
    // drawing all the circles
    for (var i = 0; i < circles.length; i++) {
        circles[i].display();
    }

    // drawing all the lines
    for (var i = 0; i < lines.length; i++) {
        lines[i].display();
    }

    // drawing the parallelogram and the big circle when
    // is the time
    if (circles.length === 3) {
        drawParallelogram();
        drawBigCircle();
    }

    // the big circle is always on the screen, but invisible
    // and show when is time
    bigCircle.display();
}

function mousePressed() {
    // redrawing the circles and lines
    if (circles.length === 4) {
        circles = circles.slice(1,3);
        lines = lines.slice(1, 2);
    }

    circles.push(new Circle(mouseX, mouseY));

    // drawing the first rect
    if (circles.length === 2) {
        lines.push(new Line(circles[0]._x, circles[0]._y, circles[1]._x, circles[1]._y));
    }
}

function drawParallelogram() {
    // calculating the X coordinate of the fourth point
    var xAux = circles[2]._x - circles[1]._x;
    xAux = xAux + circles[0]._x;

    // calculating the Y coordinate of the fourth point
    var yAux = circles[2]._y - circles[1]._y;
    yAux = yAux + circles[0]._y;

    // drawing the fourth point
    circles.push(new Circle(xAux, yAux));

    // drawing the two rects and building the parallelogram
    lines.push(new Line(circles[1]._x, circles[1]._y, circles[2]._x, circles[2]._y));
    lines.push(new Line(circles[0]._x, circles[0]._y, circles[3]._x, circles[3]._y));
    lines.push(new Line(circles[2]._x, circles[2]._y, circles[3]._x, circles[3]._y));
}

function drawBigCircle() {
    // calculating the distancies to build the triangle
    var dist1 = dist(circles[0]._x, circles[0]._y, circles[1]._x, circles[1]._y);
    var dist2 = dist(circles[1]._x, circles[1]._y, circles[2]._x, circles[2]._y);
    
    // calculating the radius of the circle
    var triangleArea = (dist1 + dist2) / 2;
    var parallelogramArea = triangleArea * 2;
    var radius = parallelogramArea/Math.PI

    // calculating the center of the parallelogram
    var centerX = (circles[0]._x + circles[2]._x) / 2;
    var centerY = (circles[0]._y + circles[2]._y) / 2;

    // updating the big circle
    bigCircle = new Circle(centerX, centerY, radius * 2, 'yellow');
}