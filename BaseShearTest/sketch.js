const BUILDING_WIDTH = 200;
const CIRCLE_DIAMETER = 15;
const MULTIPLY_FACTOR = 10;
const BASE_SEPARATOR = 20;

function setup() {
  createCanvas(1400, 1000);
  background(220, 220, 220, 220);
  drawFigure();
  noLoop();
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function drawFigure() {
  drawStories(5, 14, 12, 2000, 1800, 1600);
}

function draw() {
  // Attempt #1: Draw 1 story
  //drawStories(2, 18, 14, 6000, null, 3000);
  //rectangle
  //rect(700, 200, 200, 450);

  //lines separating each section of rectangle
  // line(700, 312.5, 900, 312.5);
  // line(700, 425, 900, 425);
  // line(700, 537.5, 900, 537.5);
  //line(650, 650, 950, 650);


  // //diagonal line
  // line(525, 200, 675, 655);
  // //lines and arrows coming from diagonal line
  // line(525, 200, 650, 200);
  // triangle(650, 215, 650, 185, 665, 200);
  // line(562, 312.5, 650, 312.5);
  // triangle(650, 327.5, 650, 297.5, 665, 312.5);
  // line(600, 425, 650, 425);
  // triangle(650, 440, 650, 410, 665, 425);
  // line(636, 537.5, 650, 537.5);
  // triangle(650, 552.5, 650, 522.5, 665, 537.5);
  // //text on top of arrows
  // text("F4", 650, 180);
  // text("F3", 650, 292.5);
  // text("F2", 650, 405);
  // text("F1", 650, 517.5);
  // //vertical line on the right
  // line(925, 655, 925, 620);
  // line(925, 575, 925, 500);
  // line(925, 455, 925, 380);
  // line(925, 335, 925, 260);
  // line(925, 215, 925, 190);

  // //lines separating rectangle sections on vertical line on right (xy coordinate diagrams)
  //line(910, 200, 940, 200);
  //line(920, 210, 930, 190);
  // line(910, 312.5, 940, 312.5);
  // line(920, 322.5, 930, 302.5);
  // line(910, 425, 940, 425);
  // line(920, 435, 930, 415);
  // line(910, 537.5, 940, 537.5);
  // line(920, 547.5, 930, 527.5);
  // line(920, 660, 930, 640);
  // //labels in between each section
  // text("h1", 920, 597.5);
  // text("h2", 920, 477.5);
  // text("h3", 920, 357.5);
  // text("h4", 920, 237.5);
  // //labels for each level
  // text("1st", 960, 653);
  // text("2nd", 960, 540.5);
  // text("3rd", 960, 428);
  // text("4th", 960, 315.5);
  // text("5th", 960, 203);
}

/**
 *
 * @param {number} numOfStories - number of stories
 * @param {number} hBase - height of the first story
 * @param {number} mRoof - mass at roof
 * @param {number} m2 - mass at 2nd floor
 */
function drawStories(numOfStories, hBase, hTyp, m2, mTyp, mRoof) {
  // starting xy coordinate: (700, 650) <-- bottom left corner of story building.
  let finalFloorHeight = hBase;
  let startingPosition = changeStartingPosition(numOfStories);
  let firstFloorPositions = createPoints(startingPosition, hBase);
  let newPosition = firstFloorPositions;

  //draw base floor separator
  line(firstFloorPositions.x_right + (2 * BASE_SEPARATOR), firstFloorPositions.y_bottom + BASE_SEPARATOR, firstFloorPositions.x_right + (2 * BASE_SEPARATOR), firstFloorPositions.y_bottom - (2 * BASE_SEPARATOR)); // y-axis
  line(firstFloorPositions.x_right + BASE_SEPARATOR, firstFloorPositions.y_bottom, firstFloorPositions.x_right + (3 * BASE_SEPARATOR), firstFloorPositions.y_bottom); // x-axis
  line(firstFloorPositions.x_right + (1.5 * BASE_SEPARATOR), firstFloorPositions.y_bottom + (0.5 * BASE_SEPARATOR), firstFloorPositions.x_right + (2.5 * BASE_SEPARATOR), firstFloorPositions.y_bottom - (0.5 * BASE_SEPARATOR)); // slope
  if (hTyp) { // if hTyp parameter exists, use value for the final floor
    finalFloorHeight = hTyp;
  }
  if (numOfStories > 1) {
    drawSingleStory(startingPosition, firstFloorPositions, m2, hBase, BASE_SEPARATOR); // base floor
    startingPosition = new Point(startingPosition.x, firstFloorPositions.y_top);
    newPosition = createPoints(startingPosition, hTyp);
    drawVerticalSeparator(firstFloorPositions, BASE_SEPARATOR);
    for(let i = 1; i < numOfStories - 1; i++) { // middle floor(s)
      drawSingleStory(startingPosition, newPosition, mTyp, hTyp, BASE_SEPARATOR);
      drawVerticalSeparator(newPosition, BASE_SEPARATOR);
      startingPosition = new Point(startingPosition.x, newPosition.y_top);
      newPosition = createPoints(startingPosition, hTyp);
    }
  }
  drawSingleStory(startingPosition, newPosition, mRoof, finalFloorHeight, BASE_SEPARATOR); // final floor
  startingPosition = new Point(startingPosition.x, newPosition.y_top);
  newPosition = createPoints(startingPosition, hTyp);

  // draw top floor separator
  line(newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom + (2 * BASE_SEPARATOR), newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom - BASE_SEPARATOR); // y-axis
  line(newPosition.x_right + BASE_SEPARATOR, newPosition.y_bottom, newPosition.x_right + (3 * BASE_SEPARATOR), newPosition.y_bottom); // x-axis
  line(newPosition.x_right + (1.5 * BASE_SEPARATOR), newPosition.y_bottom + (0.5 * BASE_SEPARATOR), newPosition.x_right + (2.5 * BASE_SEPARATOR), newPosition.y_bottom - (0.5 * BASE_SEPARATOR)); // slope
}

function changeStartingPosition(numOfStories) {
  return (numOfStories > 3) ? new Point(700, 950) : new Point(700, 650);
}

 // potential ft to pixel conversion (1ft --> 10p pixels)
function convertFtToPixels(feet) {
  return feet * MULTIPLY_FACTOR;
}

function createPoints(startingPosition, feet) {
  let points = {
    "y_top": startingPosition.y - convertFtToPixels(feet),
    "x_right": startingPosition.x + BUILDING_WIDTH,
    "y_bottom": startingPosition.y
  };
  return points;
}

function drawSingleStory(startingPosition, otherPositions, mass, height, separator) {
  // draw story building
  line(startingPosition.x, startingPosition.y, startingPosition.x, otherPositions.y_top); // bottom left to top left
  line(startingPosition.x, otherPositions.y_top, otherPositions.x_right, otherPositions.y_top) // top left to top right
  line(otherPositions.x_right, otherPositions.y_top, otherPositions.x_right, otherPositions.y_bottom); // top right to bottom right

  // draw mass label
  let circleColor = color('black');
  fill(circleColor);
  circle((otherPositions.x_right - (BUILDING_WIDTH / 2)), otherPositions.y_top, CIRCLE_DIAMETER); // circle icon
  textSize(15);
  textAlign(CENTER, CENTER);
  text(mass.toString().concat(' k'), (otherPositions.x_right - (BUILDING_WIDTH / 2)), (otherPositions.y_top - (1.5 * CIRCLE_DIAMETER))); // display mass text
  text(height.toString().concat("' - 0''"), otherPositions.x_right + (2 * separator), otherPositions.y_top + (convertFtToPixels(height) / 2)); // height label
  // draw vertical and height label
  //drawVerticalLabels(otherPositions, separator, height);
}

function drawVerticalSeparator(position, separator) {
  line(position.x_right + (2 * separator), position.y_top + (2 * separator), position.x_right + (2 * separator), position.y_top - (2 * separator)); // y-axis
  line(position.x_right + separator, position.y_top, position.x_right + (3 * separator), position.y_top); // x-axis
  line(position.x_right + (1.5 * separator), position.y_top + (0.5 * separator), position.x_right + (2.5 * separator), position.y_top - (0.5 *separator)); // slope
}
