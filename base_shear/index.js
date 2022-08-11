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
const CIRCLE_DIAMETER = 15;
const MULTIPLY_FACTOR = 7;
const BASE_SEPARATOR = 20;
const Y_SEPARATOR = 10;
const X_SHIFT_FACTOR = 45;
const ARROW_HEAD_LENGTH = 10;
const CANVAS_SIZE_WIDTH = 0.7;
const CANVAS_SIZE_HEIGHT = 0.6;
const DIAGRAM_LABELS = {
  "height": ["hbase", "htyp"],
  "mass": ["m2", "mtyp", "mroof"]
};

window.onload = function () {
  const width = window.innerWidth * CANVAS_SIZE_WIDTH;
  const height = window.innerHeight * CANVAS_SIZE_HEIGHT;
  const myCanvas = createCanvas(width, height);
  myCanvas.parent('base-shear-diagram');
  background('white');
  noLoop();
  drawSampleDiagram();
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
      background('white');
      drawFigure(result);
      toggleFormView();
      displayProblemVariables(parseInt(option.value));
    }
  });
}

/**
 * Toggles the display of inputs to user whenever they change inputs in dropdown
 * menu.
 * @param {object} event - form event object
 */
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

/**
 * Processes each text input and validates then with predefined conditions
 * @returns {boolean} state of whether all user inputs are valid
 */
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

/**
 * Checks text inputs with test conditions and returns false if invalid, otherwise
 * returns true.
 * @param {object} input - DOM element of text input
 * @returns {boolean} state of text input
 */
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

/**
 * Checks if value has the correct decimal format. Returns true if valid, otherwise
 * returns false
 * @param {object} inputTag - DOM object of input field
 * @param {string} errorMessage - error message to display
 * @param {number} number - user input value
 * @param {number} places - total accepted decimal places
 * @param {number} decimalNum - number to check with user input
 * @returns {boolean} false if input is invalid, otherwise true
 */
function validateDecimals(inputTag, errorMessage, number, places, decimalNum) {
  if (!checkDecimals(number, places, decimalNum)) { // decimal values not valid
    return displayMessage(inputTag, errorMessage, false);
  }
  return displayMessage(inputTag, "", true);
}

/**
 * Validates the decimal positions of the user's number. Returns false if invalid,
 * otherwise return true.
 * @param {number} number - number to check decimals
 * @param {number} places - total decimal places
 * @param {number} decimalNum - value for decimal
 * @returns {boolean} false if decimal value is invalid, otherwise true
 */
function checkDecimals(number, places, decimalNum) {
  if (decimalCount(number) === 0) { // no decimals
    return true;
  }
  let totalDecimalsPositions = decimalCount(number);
  if (totalDecimalsPositions !== places) { // too many decimals
    return false;
  }
  if (decimalNum !== undefined) { // grab decimals from number
    return (grabDecimals(number) === decimalNum);
  }
  return true;
}

/**
 * Displays message if input is invalid, otherwise hide the error message. Returns
 * the state of whether input is valid
 * @param {object} input - DOM object of input field
 * @param {string} message - error message to display
 * @param {boolean} type - value to validate successful or invalid input
 * @returns {boolean} false if input is invalid, otherwise true
 */
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

/**
 * Grabs all text inputs in form and returns them to draw diagram.
 * @returns {object} user text inputs
 */
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
 * Toggle views of the page by displaying/hiding the form and variable section.
 */
function toggleFormView() {
  const form = document.getElementById("base-shear-form");
  const variablesSection = document.getElementById("variables");
  form.classList.toggle("hidden");
  variablesSection.classList.toggle("hidden");
}

/**
 * Displays the variables to the page for the user to use.
 * @param {number} numOfStories- number of stories of building
 */
function displayProblemVariables(numOfStories) {
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", resetForm);
  console.log(getRandomIntInclusive(7, 10));
  console.log(numOfStories);
  const buildingPeriod = numOfStories / getRandomIntInclusive(7, 10);
  const tValue = document.getElementById("t-value");
  tValue.textContent = buildingPeriod;
}

/**
 * Resets the diagram and form inputs and displays the form element page onto
 * the page.
 */
function resetForm() {
  toggleFormView();
  document.getElementById("base-shear-form").reset();
  let inputText = document.querySelectorAll("input[type=text]")
  for (let i = 0; i < inputText.length; i++) {
    inputText[i].classList.remove("success");
  }
  clear();
  background('white');
}

/**
 * Returns a random number between between the min and max values, inclusive.
 * Code sourced from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min - minimum value
 * @param {number} max - maximum value
 * @returns {number} random number
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * Runs once the page loads. Sets up canvas element for drawings.
 */
function setup() {
  background('white');
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
 * Draws base shear diagram with the given user inputs
 * @param {object} inputs - user inputs
 */
function drawFigure(inputs) {
  changeStyling(inputs.n);
  const yCoordinates = drawStories(inputs.n, inputs.hbase, inputs.htyp, inputs.m2, inputs.mtyp, inputs.mroof);
  drawForceVectors(yCoordinates, inputs.n);
}

/**
 * Draws sample base shear diagram with input variables.
 */
function drawSampleDiagram() {
  const yCoordinates = drawStories(3, 18, 16, 5000, 5000, 5000, true);
  drawForceVectors(yCoordinates, 3, true);
}

/**
 * Create and display story building with height labels. Relocate the starting position of
 * structure based on the numOfStories inputted. Change labels if isSample is true to display input
 * variables
 * @param {number} numOfStories - number of stories of building
 * @param {number} hBase - height of the first story
 * @param {number} hTyp - height of all other stories
 * @param {number} m2 - mass at 2nd floor
 * @param {number} mTyp - mass at typical floor
 * @param {number} mRoof - mass at roof
 * @param {boolean} isSample - state of diagram labels
 * @returns {object} New y-coordinate object for drawing force vectors
 */
function drawStories(numOfStories, hBase, hTyp, m2, mTyp, mRoof, isSample) {
  let yCoordinates = {}
  let finalFloorHeight = hBase;
  let roofMass = m2;
  let buildingWidth = convertFtToPixels(hBase, numOfStories);
  if (hTyp) { // if hTyp parameter exists, use value for top floor and adjust buildingWidth if larger
    if (hTyp > hBase) {
      buildingWidth = convertFtToPixels(hTyp, numOfStories);
    }
    finalFloorHeight = hTyp;
  }
  yCoordinates.width = buildingWidth;
  let startingPosition = changeStartingPosition(numOfStories);
  yCoordinates.bottom = startingPosition.y;
  let firstFloorPositions = createPoints(startingPosition, hBase, buildingWidth, numOfStories);
  let newPosition = firstFloorPositions;
  yCoordinates.y1 = firstFloorPositions.y_top;
  // draw base floor separator
  let separatorHeight = (numOfStories > 2) ? Y_SEPARATOR : 2.5 * Y_SEPARATOR;
  if (numOfStories > 5) {
    separatorHeight = Y_SEPARATOR / 2;
  }
  line(firstFloorPositions.x_right + (2 * BASE_SEPARATOR), firstFloorPositions.y_bottom + separatorHeight, firstFloorPositions.x_right + (2 * BASE_SEPARATOR), firstFloorPositions.y_bottom - (2 * separatorHeight)); // y-axis
  line(firstFloorPositions.x_right + BASE_SEPARATOR, firstFloorPositions.y_bottom, firstFloorPositions.x_right + (3 * BASE_SEPARATOR), firstFloorPositions.y_bottom); // x-axis
  line(firstFloorPositions.x_right + (1.5 * BASE_SEPARATOR), firstFloorPositions.y_bottom + (0.5 * BASE_SEPARATOR), firstFloorPositions.x_right + (2.5 * BASE_SEPARATOR), firstFloorPositions.y_bottom - (0.5 * BASE_SEPARATOR)); // slope
  if (mRoof) { // if mRoof parameter exists, use value for top floor
    roofMass = mRoof;
  }
  if (numOfStories > 1) {
    drawSingleStory(startingPosition, firstFloorPositions, m2, hBase, BASE_SEPARATOR, buildingWidth, numOfStories, isSample, 0); // base floor
    startingPosition = new Point(startingPosition.x, firstFloorPositions.y_top);
    newPosition = createPoints(startingPosition, hTyp, buildingWidth, numOfStories);
    yCoordinates.y2 = newPosition.y_top;
    drawVerticalSeparator(firstFloorPositions, BASE_SEPARATOR, separatorHeight);
    for (let i = 1; i < numOfStories - 1; i++) { // middle floor(s)
      drawSingleStory(startingPosition, newPosition, mTyp, hTyp, BASE_SEPARATOR, buildingWidth, numOfStories, isSample, 1);
      drawVerticalSeparator(newPosition, BASE_SEPARATOR, separatorHeight);
      startingPosition = new Point(startingPosition.x, newPosition.y_top);
      newPosition = createPoints(startingPosition, hTyp, buildingWidth, numOfStories);
      yCoordinates["y".concat(2 + i)] = newPosition.y_top;
    }
  }
  drawSingleStory(startingPosition, newPosition, roofMass, finalFloorHeight, BASE_SEPARATOR, buildingWidth, numOfStories, isSample, 2); // top floor
  startingPosition = new Point(startingPosition.x, newPosition.y_top);
  newPosition = createPoints(startingPosition, hTyp, buildingWidth, numOfStories);
  // draw top floor separator
  line(newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom + (2 * separatorHeight), newPosition.x_right + (2 * BASE_SEPARATOR), newPosition.y_bottom - separatorHeight); // y-axis
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
 * @param {number} width - width of building
 * @param {number} numOfStories - number of stories of building
 * @param {boolean} isSample - state of diagram labels
 * @param {number} index - array index for DIAGRAM_LABELS
 */
function drawSingleStory(startingPosition, otherPositions, mass, height, separator, width, numOfStories, isSample, index) {
  // draw story building
  textAlign(CENTER, CENTER);
  line(startingPosition.x, startingPosition.y, startingPosition.x, otherPositions.y_top); // bottom left to top left
  line(startingPosition.x, otherPositions.y_top, otherPositions.x_right, otherPositions.y_top) // top left to top right
  line(otherPositions.x_right, otherPositions.y_top, otherPositions.x_right, otherPositions.y_bottom); // top right to bottom right
  // draw mass label
  let circleColor = color('black');
  fill(circleColor);
  let diameter = CIRCLE_DIAMETER;
  if (numOfStories >= 7) {
    diameter = CIRCLE_DIAMETER - 5;
  }
  circle((otherPositions.x_right - (width / 2)), otherPositions.y_top, diameter); // circle icon
  mass = mass / 1000;
  let massLabel = mass.toString().concat(' k');
  let heightLabel = height.toString().concat("' - 0''");
  if (isSample) {
    massLabel = DIAGRAM_LABELS.mass[index];
    if (index > 1) {
      index--;
    }
    heightLabel = DIAGRAM_LABELS.height[index];
  }
  text(massLabel, (otherPositions.x_right - (width / 2)), (otherPositions.y_top - (1.5 * diameter))); // display mass text
  // draw height label
  text(heightLabel, otherPositions.x_right + (2 * separator), otherPositions.y_top + ((otherPositions.y_bottom - otherPositions.y_top) / 2));
}

/**
 * Draws vertical separators between height labels.
 * @param {object} position - Position object containing specific numbers
 * @param {number} separator - spacing between elements
 * @param {number} separatorHeight - spacing between height labels
 */
function drawVerticalSeparator(position, separator, separatorHeight) {
  line(position.x_right + (2 * separator), position.y_top + (2 * separatorHeight), position.x_right + (2 * separator), position.y_top - (2 * separatorHeight)); // y-axis
  line(position.x_right + separator, position.y_top, position.x_right + (3 * separator), position.y_top); // x-axis
  line(position.x_right + (1.5 * separator), position.y_top + (0.5 * separator), position.x_right + (2.5 * separator), position.y_top - (0.5 * separator)); // slope
}

/**
 * Changes font size of labels in diagram based on numOfStories.
 * @param {number} numOfStories - number of stories of building
 */
function changeStyling(numOfStories) {
  (numOfStories > 5) ? textSize(12) : textSize(15);
}

/**
 * Draws force vectors pointing to the building. Replaces labels with sample input
 * variables if isSample is true.
 * @param {object} yCoordinates - y-coordinates used for positioning force vectors
 * @param {number} numOfStories - number of stories of building
 * @param {boolean} isSample - state of diagram labels
 */
function drawForceVectors(yCoordinates, numOfStories, isSample) {
  const xStart = ((window.innerWidth * CANVAS_SIZE_WIDTH) / 2) - BASE_SEPARATOR;
  let xTop = (numOfStories > 2) ? xStart + 25 : xStart - 50;
  const topY = Object.keys(yCoordinates).pop();
  let shift = (numOfStories * X_SHIFT_FACTOR);
  if (numOfStories > 4 && numOfStories < 7) {
    shift = yCoordinates.width * 2;
  }
  if (numOfStories > 6) {
    shift = yCoordinates.width * 4;
  }
  const hypotenuse = dist(xStart, yCoordinates.bottom, xTop - shift, yCoordinates[topY]);
  const yTotalLength = yCoordinates.bottom - yCoordinates[topY];
  // inverse cosine is in radians, convert to degrees
  let angle = Math.acos(yTotalLength / hypotenuse);
  angle = radiansToDegrees(angle);
  line(xStart, yCoordinates.bottom, xTop - shift, yCoordinates[topY]); // diagonal line
  let forceIndex = 0;
  for (let i = 1; i <= numOfStories; i++) {
    let key = "y".concat(i);
    let forceLabel = "F".concat(i + 1);
    if (isSample) { // use sample diagram labels
      forceLabel = "Fi";
      if (forceIndex !== 0) {
        forceLabel = "Fi+".concat(i - 1);
      }
      forceIndex++;
    }
    let height = yCoordinates.bottom - yCoordinates[key];
    let xLength = getTanFromDegrees(angle) * height;
    line(xStart - xLength, yCoordinates[key], xStart, yCoordinates[key]); // horizontal line
    // draw arrow point
    line(xStart, yCoordinates[key], xStart - ARROW_HEAD_LENGTH, yCoordinates[key] - ARROW_HEAD_LENGTH);
    line(xStart, yCoordinates[key], xStart - ARROW_HEAD_LENGTH, yCoordinates[key] + ARROW_HEAD_LENGTH);
    // draw force label
    let labelSpacing = yCoordinates[key] - 15 - ARROW_HEAD_LENGTH;
    if (numOfStories > 6) {
      labelSpacing = labelSpacing + 10;
    }
    text(forceLabel, xStart, labelSpacing);
  }
}

/**
 * Changes the starting position of the diagram based on the numOfStories.
 * @param {number} numOfStories - number of stories of building
 * @returns {object} New Point object with set coordinates.
 */
function changeStartingPosition(numOfStories) {
  let xMid = window.innerWidth * CANVAS_SIZE_WIDTH / 2;
  let yBottom = window.innerHeight * CANVAS_SIZE_HEIGHT;
  if (numOfStories > 8) {
    return new Point(xMid, yBottom - 15);
  }
  if (numOfStories > 3) {
    return new Point(xMid, yBottom - 25);
  }
  if (numOfStories === 1) {
    return new Point(xMid, (yBottom / 2) + 100);
  }
  if (numOfStories === 2) {
    return new Point(xMid, (yBottom / 2) + 190);
  }
  return new Point(xMid, (yBottom / 2) + numOfStories * 60);
  //return new Point(700, 650 + ((numOfStories - 1) * 30));
}

/**
 * Converts feet to pixel amount with predetermined multiply factor
 * @param {number} feet - total number of feet
 * @param {number} numOfStories - number of stories of building
 * @returns {number} pixel conversion from feet
 */
function convertFtToPixels(feet, numOfStories) {
  if (numOfStories !== undefined && numOfStories !== 3) {
    if (numOfStories === 1) {
      return feet * (2 * MULTIPLY_FACTOR);
    }
    if (numOfStories === 2) {
      return feet * (1.5 * MULTIPLY_FACTOR);
    }
    if (numOfStories === 7) {
      return feet * (((2 * MULTIPLY_FACTOR) / numOfStories + 1.25));
    }
    if (numOfStories === 8) {
      return feet * (((1.75 * MULTIPLY_FACTOR) / numOfStories + 1.25));
    }
    if (numOfStories > 8) {
      return feet * (((2 * MULTIPLY_FACTOR) / numOfStories) + 1);
    }
    let factor = Math.abs(numOfStories - MULTIPLY_FACTOR);
    return (factor > 1) ? feet * (factor + 2.5) : feet * (factor + 2.75);
  }
  return feet * MULTIPLY_FACTOR;
}

/**
 * Creates points for positions of the building
 * @param {object} startingPosition - Point object with set coordinates
 * @param {number} feet - total number of feet
 * @param {number} width - width of building
 * @param {number} numOfStories - number of stories of building
 * @returns {object} New position object with location numbers
 */
function createPoints(startingPosition, feet, width, numOfStories) {
  let position = {
    "y_top": startingPosition.y - convertFtToPixels(feet, numOfStories),
    "x_right": startingPosition.x + width,
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

/**
 * Returns the length of force vector from the angle of triangle
 * @param {number} degrees - angle
 * @returns {number} length of force vector
 */
function getTanFromDegrees(degrees) {
  return Math.tan(degrees * Math.PI / 180);
}

/**
 * Counts the number of decimals places of the given float number
 * @param {number} num - float number
 * @returns {number} number of decimal places
 */
const decimalCount = num => {
  const numStr = String(num);
  if (numStr.includes(".")) { // String Contains Decimal
    return numStr.split(".")[1].length;
  };
  // String Does Not Contain Decimal
  return 0;
}

/**
 * Grabs decimals from float number
 * @param {number} num - float number
 * @returns {array} list of decimal numbers
 */
const grabDecimals = num => {
  return parseFloat(String(num).split(".")[1]);
}
