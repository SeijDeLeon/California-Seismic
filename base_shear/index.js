"use strict";

// Error Messages for user inputs
const EMPTY_MESSAGE = "Please Enter Value";
const WRONG_FORMAT = "Please Enter Numbers";
const R_INVALID_MESSAGE = "Number Must Be [1-8]";
const SDS_INVALID_MESSAGE = "Number Must Be [0.5-2.0]";
const SD1_INVALID_MESSAGE = "Number Must Be [0.2-1.0]";
const SD1_GREATER_ERROR_MESSAGE = "Sd1 value is greater than Sds";
const MROOF_ERROR_MESSAGE = "Number Must Be [3000-30000]";
const M2_MTYP_ERROR_MESSAGE = "Number Must Be [5000-43000]";
const HBASE_ERROR_MESSAGE = "Number Must Be [10-18]";
const HTYP_ERROR_MESSAGE = "Number Must Be [10-16]";
const DECIMAL_ERROR = "Incorrect Decimal Format";
const WHOLE_NUM_ERROR = "Whole Numbers Only";

// Diagram constants
const BUILDING_WIDTH = 150;
const CIRCLE_DIAMETER = 15;
const MULTIPLY_FACTOR = 6;
const BASE_SEPARATOR = 20;
const Y_SEPARATOR = 10;
const X_SHIFT_FACTOR = 35;
const ARROW_HEAD_LENGTH = 10;


const decimalCount = num => {
  const numStr = String(num);
  if (numStr.includes(".")) { // String Contains Decimal
    return numStr.split(".")[1].length;
  };
  // String Does Not Contain Decimal
  return 0;
}

const grabDecimals = num => {
  return parseFloat(String(num).split(".")[1]);
}


window.onload = function () {
  const nInput = document.getElementById("n-value");
  nInput.addEventListener("change", displayInputs);
  const baseShearForm = document.getElementById("base-shear-form");
  baseShearForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = processInputs();
    if (isValid) { // inputs are valid
      let selectionInputs = {};
      // grab selected radio button value (Ie)
      const ieValue = document.querySelector("input[name='ie']:checked").value;
      selectionInputs["ie"] = parseFloat(ieValue);
      // grab selected dropdown value (n)
      const dropdown = document.getElementById("n-value");
      const option = dropdown.options[dropdown.selectedIndex];
      selectionInputs['n'] = parseInt(option.value);
      let textInputs = grabTextInputs();
      const result = {
        ...selectionInputs,
        ...textInputs
      }
      // resets previous diagram and creates new background canvas
      clear();
      background(220, 220, 220, 220);
      drawFigure(result);
    }
  });
}

function displayInputs(event) {
  if (event.target.value === "2") { // two story
    let hiddenElem = document.querySelectorAll("#mroof-hidden, #htyp-hidden");
    for (let i = 0; i < hiddenElem.length; i++) {
      hiddenElem[i].classList.remove("hidden");
    }
    document.querySelector("#mtyp-hidden").classList.add("hidden");
  } else if (event.target.value === "1") { // one story
    let hiddenElem = document.querySelectorAll("#mroof-hidden, #mtyp-hidden, #htyp-hidden");
    for (let i = 0; i < hiddenElem.length; i++) {
      hiddenElem[i].classList.add("hidden");
    }
  } else { // multiple story
    let hiddenElem = document.querySelectorAll("#mroof-hidden, #mtyp-hidden, #htyp-hidden");
    for (let i = 0; i < hiddenElem.length; i++) {
      hiddenElem[i].classList.remove("hidden");
    }
  }
}

function processInputs() {
  let validForm = [];
  const form = document.getElementById('base-shear-form');
  for (let i = 0; i < form.elements.length; i++) {
    // avoids radio, dropdown, hidden, and button inputs
    if (form.elements[i].parentNode.id !== "no-validation" &&
      form.elements[i].parentNode.classList.value !== 'field hidden' &&
      form.elements[i].type !== "submit") {
      validForm.push(validateInputs(form.elements[i]));
    }
  }
  return !validForm.includes(false);
}

function validateInputs(input) {
  if (input.value.trim() === "") { // empty string
    return displayMessage(input, EMPTY_MESSAGE, false);
  }
  if (isNaN(input.value)) { // string doesn't contain numbers
    return displayMessage(input, WRONG_FORMAT, false);
  }
  // input is not empty nor contains characters
  let value = parseFloat(input.value);
  if (input.id === "r-value") { // R validation
    if (value < 1 || value > 8) {
      return displayMessage(input, R_INVALID_MESSAGE, false);
    }
    return validateDecimals(input, DECIMAL_ERROR, value, 1, 5);
  }
  if (input.id === "sds") { // Sds validation
    if (value < 0.5 || value > 2.0) {
      return displayMessage(input, SDS_INVALID_MESSAGE, false);
    }
    return validateDecimals(input, DECIMAL_ERROR, value, 1);
  }
  if (input.id === "sd1") { // Sd1 validation
    const sdsValue = document.getElementById('base-shear-form').elements['sds'].value;
    if (value >= sdsValue) {
      return displayMessage(input, SD1_GREATER_ERROR_MESSAGE, false);
    }
    if (value < 0.2 || value > 1.0) {
      return displayMessage(input, SD1_INVALID_MESSAGE, false);
    }
    return validateDecimals(input, DECIMAL_ERROR, value, 1);
  }
  if (input.id === "mroof") { // Mroof validation
    if (value < 3000 || value > 30000) {
      return displayMessage(input, MROOF_ERROR_MESSAGE, false);
    }
    return validateDecimals(input, WHOLE_NUM_ERROR, value, 0);
  }
  if (input.id === "m2" || input.id === "mtyp") { // M2 and Mtyp validation
    if (value < 5000 || value > 43000) {
      return displayMessage(input, M2_MTYP_ERROR_MESSAGE, false);
    }
    return validateDecimals(input, WHOLE_NUM_ERROR, value, 0);
  }
  if (input.id === "hbase") { // Hbase validation
    if (value < 10 || value > 18) {
      return displayMessage(input, HBASE_ERROR_MESSAGE, false);
    }
    return validateDecimals(input, WHOLE_NUM_ERROR, value, 0);
  }
  if (input.id === "htyp") { // Htyp validation
    if (value < 10 || value > 18) {
      return displayMessage(input, HBASE_ERROR_MESSAGE, false);
    }
    return validateDecimals(input, WHOLE_NUM_ERROR, value, 0);
  }
}

function validateDecimals(inputTag, errorMessage, number, places, decimalNum) {
  if (!checkDecimals(number, places, decimalNum)) { // decimal values not valid
    return displayMessage(inputTag, errorMessage, false);
  }
  return displayMessage(inputTag, "", true);
}

function checkDecimals(number, places, decimalNum) {
  if (decimalCount(number) === 0) { // no decimals
    return true;
  }
  let totalDecimalsPositions = decimalCount(number);
  if (totalDecimalsPositions !== places) {
    return false;
  }
  if (decimalNum !== undefined) {
    return (grabDecimals(number) === decimalNum);
  }
  return true;
}

function displayMessage(input, message, type) {
  const msg = input.parentNode.querySelector("p.warning");
  if (message) { // message exists
    msg.innerHTML = message;
    msg.classList.remove("hidden");
  } else {
    msg.classList.add("hidden");
  }
  input.className = type ? "success" : "error";
  return type;
}

function grabTextInputs() {
  let userInputs = {};
  const form = document.getElementById('base-shear-form');
  for (let i = 0; i < form.elements.length; i++) {
    // avoids radio, dropdown, hidden, and button inputs
    if (form.elements[i].parentNode.id !== "no-validation" &&
    form.elements[i].parentNode.classList.value !== 'field hidden' &&
    form.elements[i].type !== "submit") {
      userInputs[form.elements[i].id] = parseFloat(form.elements[i].value);
    }
  }
  return userInputs;
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
 * Creates canvas element for base shear diagram
 */
function setup() {
  let myCanvas = createCanvas(1400, 1000);
  myCanvas.parent('base-shear-diagram');
  background(220, 220, 220, 220);
  noLoop();
}

/**
 *
 * @param {object} inputs
 */
function drawFigure(inputs) {
  console.log(inputs);
  // console.log("N: " + inputs.n, typeof inputs.n);
  // console.log("hBase: " + inputs.hbase, typeof inputs.hbase);
  // console.log("hTyp: " + inputs.htyp, typeof inputs.htyp);
  // console.log("m2: " + inputs.m2, typeof inputs.m2);
  // console.log("mTyp: " + inputs.mtyp, typeof inputs.mtyp);
  // console.log("mRoof: " + inputs.mroof, typeof inputs.mroof);
  const yCoordinates = drawStories(inputs.n, inputs.hbase, inputs.htyp, inputs.m2, inputs.mtyp, inputs.mroof);
  drawForceVectors(yCoordinates, inputs.n);
  // const yCoordinates = drawStories(10, 14, 14, 3000, 3000, 3000);
  // drawForceVectors(yCoordinates, 10);
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
  console.log(numOfStories, hBase, hTyp, m2, mTyp, mRoof);
  let yCoordinates = {}
  let finalFloorHeight = hBase;
  let roofMass = m2;
  let startingPosition = changeStartingPosition(numOfStories);
  yCoordinates.bottom = startingPosition.y;
  let firstFloorPositions = createPoints(startingPosition, hBase);
  let newPosition = firstFloorPositions;
  yCoordinates.y1 = firstFloorPositions.y_top;
  // draw base floor separator
  line(firstFloorPositions.x_right + (2 * BASE_SEPARATOR), firstFloorPositions.y_bottom + Y_SEPARATOR, firstFloorPositions.x_right + (2 * BASE_SEPARATOR), firstFloorPositions.y_bottom - (2 * Y_SEPARATOR)); // y-axis
  line(firstFloorPositions.x_right + BASE_SEPARATOR, firstFloorPositions.y_bottom, firstFloorPositions.x_right + (3 * BASE_SEPARATOR), firstFloorPositions.y_bottom); // x-axis
  line(firstFloorPositions.x_right + (1.5 * BASE_SEPARATOR), firstFloorPositions.y_bottom + (0.5 * BASE_SEPARATOR), firstFloorPositions.x_right + (2.5 * BASE_SEPARATOR), firstFloorPositions.y_bottom - (0.5 * BASE_SEPARATOR)); // slope
  if (hTyp) { // if hTyp parameter exists, use value for top floor
    finalFloorHeight = hTyp;
  }
  if (mRoof) { // if mRoof parameter exists, use value for top floor
    roofMass = mRoof;
  }
  if (numOfStories > 1) {
    drawSingleStory(startingPosition, firstFloorPositions, m2, hBase, BASE_SEPARATOR); // base floor
    startingPosition = new Point(startingPosition.x, firstFloorPositions.y_top);
    newPosition = createPoints(startingPosition, hTyp);
    yCoordinates.y2 = newPosition.y_top;
    drawVerticalSeparator(firstFloorPositions, BASE_SEPARATOR);
    console.log("works");
    for (let i = 1; i < numOfStories - 1; i++) { // middle floor(s)
      console.log("doesn't work");
      drawSingleStory(startingPosition, newPosition, mTyp, hTyp, BASE_SEPARATOR);
      drawVerticalSeparator(newPosition, BASE_SEPARATOR);
      startingPosition = new Point(startingPosition.x, newPosition.y_top);
      newPosition = createPoints(startingPosition, hTyp);
      yCoordinates["y".concat(2 + i)] = newPosition.y_top;
    }
  }
  drawSingleStory(startingPosition, newPosition, roofMass, finalFloorHeight, BASE_SEPARATOR); // top floor
  startingPosition = new Point(startingPosition.x, newPosition.y_top);
  newPosition = createPoints(startingPosition, hTyp);
  // draw top floor separator
  line(newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom + (2 * Y_SEPARATOR), newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom - Y_SEPARATOR); // y-axis
  line(newPosition.x_right + BASE_SEPARATOR, newPosition.y_bottom, newPosition.x_right + (3 * BASE_SEPARATOR), newPosition.y_bottom); // x-axis
  line(newPosition.x_right + (1.5 * BASE_SEPARATOR), newPosition.y_bottom + (0.5 * BASE_SEPARATOR), newPosition.x_right + (2.5 * BASE_SEPARATOR), newPosition.y_bottom - (0.5 * BASE_SEPARATOR)); // slope
  return yCoordinates;
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
  text(height.toString().concat("' - 0''"), otherPositions.x_right + (2 * separator), otherPositions.y_top + ((otherPositions.y_bottom - otherPositions.y_top) / 2));
}

/**
 * Draws vertical separators between height labels.
 * @param {object} position - Position object containing specific numbers
 * @param {number} separator - spacing between elements
 */
function drawVerticalSeparator(position, separator) {
  line(position.x_right + (2 * separator), position.y_top + (2 * Y_SEPARATOR), position.x_right + (2 * separator), position.y_top - (2 * Y_SEPARATOR)); // y-axis
  line(position.x_right + separator, position.y_top, position.x_right + (3 * separator), position.y_top); // x-axis
  line(position.x_right + (1.5 * separator), position.y_top + (0.5 * separator), position.x_right + (2.5 * separator), position.y_top - (0.5 * separator)); // slope
}

/**
 * Changes the starting position of the diagram based on the numOfStories.
 * Starting xy coordinate: (700, 650) <-- bottom left corner of story building.
 * Function is subject to change to fit canvas element
 * @param {number} numOfStories - number of stories of building
 * @returns {object} New Point object with set coordinates.
 */
function changeStartingPosition(numOfStories) {
  return new Point(700, 650 + ((numOfStories - 1) * 30));
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
 * Helper function to convert radians to degrees
 * @param {number} radians - number to convert
 * @returns {number} radians to degrees
 */
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function getTanFromDegrees(degrees) {
  return Math.tan(degrees * Math.PI / 180);
}


function drawForceVectors(yCoordinates, numOfStories) {
  const topY = Object.keys(yCoordinates).pop();
  const hypotenuse = dist(650, yCoordinates.bottom, 675 - (numOfStories * X_SHIFT_FACTOR), yCoordinates[topY]);
  const yTotalLength = yCoordinates.bottom - yCoordinates[topY];
  // inverse cosine is in radians, convert to degrees
  let angle =  Math.acos(yTotalLength / hypotenuse);
  angle = radiansToDegrees(angle);
  line(650, yCoordinates.bottom, 675 - (numOfStories * X_SHIFT_FACTOR), yCoordinates[topY]); // diagonal line
  for (let i = 1; i <= numOfStories; i++) {
    let key = "y".concat(i);
    let forceLabel = "F".concat(i + 1);
    let height = yCoordinates.bottom - yCoordinates[key];
    let xLength = getTanFromDegrees(angle) * height;
    line(650 - xLength, yCoordinates[key], 650, yCoordinates[key]); // horizontal line
    // draw arrow point
    line(650, yCoordinates[key], 650 - ARROW_HEAD_LENGTH, yCoordinates[key] - ARROW_HEAD_LENGTH);
    line(650, yCoordinates[key], 650 - ARROW_HEAD_LENGTH, yCoordinates[key] + ARROW_HEAD_LENGTH);
    // draw force label
    text(forceLabel, 650, yCoordinates[key] - 15 - ARROW_HEAD_LENGTH);
  }
}
