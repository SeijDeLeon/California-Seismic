const BUILDING_WIDTH = 200;
const CIRCLE_DIAMETER = 15;
const MULTIPLY_FACTOR = 10;
const BASE_SEPARATOR = 20;

//variables for diagonal line (delete?)
let numberOfAdditionalStories = 3;
let xPixelforFirstStory = 37.5;
let yPixelforFirstStory = 113.75;
let xPixelsperStory = 37.5;
let yPixelsperStory = 113.75;

/**
 * Creates canvas element for base shear diagram
 */
function setup() {
  createCanvas(1400, 1000);
  background(220, 220, 220, 220);
  drawFigure();
  noLoop();
}

/**
 * Point class to help create new points for drawing
 * @param {String} x - x coordinate
 * @param {String} y - y coordinate
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * Draws base shear diagram with user inputs
 */
function drawFigure() {
  let yCoordinates = drawStories(3, 14, 12, 2000, 1800, 1600);
  drawForceVectors(yCoordinates);
}

/**
 * Create and display story building with height labels. Relocate the starting position of
 * structure based on the numOfStories inputted
 * @param {number} numOfStories - number of stories of building
 * @param {number} hBase - height of the first story
 * @param {number} hTyp - height of all other stories
 * @param {number} m2 - mass at 2nd floor
 * @param {number} mTyp - mass at typical floor
 * @param {number} mRoof - mass at roof
 * @returns {object} New y-coordinate object for drawing force vectors
 */
function drawStories(numOfStories, hBase, hTyp, m2, mTyp, mRoof) {
  let yCoordinates = {}
  let finalFloorHeight = hBase;
  let startingPosition = changeStartingPosition(numOfStories);
  let firstFloorPositions = createPoints(startingPosition, hBase);
  let newPosition = firstFloorPositions;
  yCoordinates.y1 = firstFloorPositions.y_top;

  // draw base floor separator
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
    yCoordinates.y2 = newPosition.y_top;
    drawVerticalSeparator(firstFloorPositions, BASE_SEPARATOR);
    for(let i = 1; i < numOfStories - 1; i++) { // middle floor(s)
      drawSingleStory(startingPosition, newPosition, mTyp, hTyp, BASE_SEPARATOR);
      drawVerticalSeparator(newPosition, BASE_SEPARATOR);
      startingPosition = new Point(startingPosition.x, newPosition.y_top);
      newPosition = createPoints(startingPosition, hTyp);
      yCoordinates["y".concat(2 + i)] = newPosition.y_top;
    }
  }
  drawSingleStory(startingPosition, newPosition, mRoof, finalFloorHeight, BASE_SEPARATOR); // top floor
  startingPosition = new Point(startingPosition.x, newPosition.y_top);
  newPosition = createPoints(startingPosition, hTyp);

  // draw top floor separator
  line(newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom + (2 * BASE_SEPARATOR), newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom - BASE_SEPARATOR); // y-axis
  line(newPosition.x_right + BASE_SEPARATOR, newPosition.y_bottom, newPosition.x_right + (3 * BASE_SEPARATOR), newPosition.y_bottom); // x-axis
  line(newPosition.x_right + (1.5 * BASE_SEPARATOR), newPosition.y_bottom + (0.5 * BASE_SEPARATOR), newPosition.x_right + (2.5 * BASE_SEPARATOR), newPosition.y_bottom - (0.5 * BASE_SEPARATOR)); // slope
  return yCoordinates;
}

/**
 * Changes the starting position of the diagram based on the numOfStories.
 * Starting xy coordinate: (700, 650) <-- bottom left corner of story building.
 * Function is subject to change to fit canvas element
 * @param {number} numOfStories - number of stories of building
 * @returns {object} New Point object with set coordinates.
 */
function changeStartingPosition(numOfStories) {
  return (numOfStories > 3) ? new Point(700, 950) : new Point(700, 650);
}

/**
 * Converts feet to pixel amount with predetermined multiply factor
 * @param {number} feet - total number of feet
 * @returns {number} pixel conversion from feet
 */
function convertFtToPixels(feet) {
  return feet * MULTIPLY_FACTOR;
}

/**
 * Creates points for positions of the building
 * @param {object} startingPosition - Point object with set coordinates
 * @param {number} feet - total number of feet
 * @returns {object} New position object with location numbers
 */
function createPoints(startingPosition, feet) {
  let position = {
    "y_top": startingPosition.y - convertFtToPixels(feet),
    "x_right": startingPosition.x + BUILDING_WIDTH,
    "y_bottom": startingPosition.y
  };
  return position;
}

/**
 * Draws a floor for the building with mass and height labels.
 * @param {object} startingPosition - Point object with starting coordinates
 * @param {object} otherPositions - Position object containing specific numbers
 * @param {number} mass - mass of the floor
 * @param {number} height - height of the floor
 * @param {number} separator - spacing between elements
 */
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

  // draw height label
  text(height.toString().concat("' - 0''"), otherPositions.x_right + (2 * separator), otherPositions.y_top + (convertFtToPixels(height) / 2));
}

/**
 * Draws vertical separators between height labels.
 * @param {object} position - Position object containing specific numbers
 * @param {number} separator - spacing between elements
 */
function drawVerticalSeparator(position, separator) {
  line(position.x_right + (2 * separator), position.y_top + (2 * separator), position.x_right + (2 * separator), position.y_top - (2 * separator)); // y-axis
  line(position.x_right + separator, position.y_top, position.x_right + (3 * separator), position.y_top); // x-axis
  line(position.x_right + (1.5 * separator), position.y_top + (0.5 * separator), position.x_right + (2.5 * separator), position.y_top - (0.5 *separator)); // slope
}

function drawForceVectors() {
  //diagonal line
  line(675, 650, 675 - xPixelforFirstStory - numberOfAdditionalStories * xPixelsperStory, 655 - yPixelforFirstStory - numberOfAdditionalStories * yPixelsperStory);
  //console.log(675 - xPixelforFirstStory);
  //lines, arrows, and text coming from diagonal line
  for(let i = 0; i <= numberOfAdditionalStories; i++)
  {
    line(675 - xPixelforFirstStory - 37 * i, 655 - yPixelforFirstStory - yPixelsperStory * i, 650, 655 - yPixelforFirstStory - yPixelsperStory * i);
    triangle(650, 655 - yPixelforFirstStory + 11.25 - yPixelsperStory * i, 650, 655 - yPixelforFirstStory - 11.25 - yPixelsperStory * i, 665, 655 - yPixelforFirstStory - yPixelsperStory * i);
    text("F" + (i + 1), 650, 655 - yPixelforFirstStory - 15 - yPixelsperStory * i);
  }
}
