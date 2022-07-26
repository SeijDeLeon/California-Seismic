//variables for diagonal line
let numberOfAdditionalStories = 3;
let xPixelforFirstStory = 37.5;
let yPixelforFirstStory = 113.75;
let xPixelsperStory = 37.5;
let yPixelsperStory = 113.75;
function setup() {
    createCanvas(1400, 1000);
  }
  
  function draw() {
    background(220, 220, 220, 220);
    //rectangle
    rect(700, 200, 200, 450);
    //lines separating each section of rectangle
    line(700, 312.5, 900, 312.5);
    line(700, 425, 900, 425);
    line(700, 537.5, 900, 537.5); //first story barrier
    line(650, 650, 950, 650);
    //diagonal line
    line(675, 655, 675 - xPixelforFirstStory - numberOfAdditionalStories * xPixelsperStory, 655 - yPixelforFirstStory - numberOfAdditionalStories * yPixelsperStory);
    console.log(675 - xPixelforFirstStory);
    //lines, arrows, and text coming from diagonal line
    for(let i = 0; i <= numberOfAdditionalStories; i++)
    {
      line(675 - xPixelforFirstStory - 37 * i, 655 - yPixelforFirstStory - yPixelsperStory * i, 650, 655 - yPixelforFirstStory - yPixelsperStory * i);
      triangle(650, 655 - yPixelforFirstStory + 11.25 - yPixelsperStory * i, 650, 655 - yPixelforFirstStory - 11.25 - yPixelsperStory * i, 665, 655 - yPixelforFirstStory - yPixelsperStory * i);
      text("F" + (i + 1), 650, 655 - yPixelforFirstStory - 15 - yPixelsperStory * i);
    }
  //vertical line on the right
    line(925, 655, 925, 620);
    line(925, 575, 925, 500);
    line(925, 455, 925, 380);
    line(925, 335, 925, 260);
    line(925, 215, 925, 190);
  //lines separating rectangle sections on vertical line on right
    line(910, 200, 940, 200);
    line(920, 210, 930, 190);
    line(910, 312.5, 940, 312.5);
    line(920, 322.5, 930, 302.5);
    line(910, 425, 940, 425);
    line(920, 435, 930, 415);
    line(910, 537.5, 940, 537.5);
    line(920, 547.5, 930, 527.5);
    line(920, 660, 930, 640);
    //labels in between each section
    text("h1", 920, 597.5);
    text("h2", 920, 477.5);
    text("h3", 920, 357.5);
    text("h4", 920, 237.5);
    //labels for each level
    text("1st", 960, 653);
    text("2nd", 960, 540.5);
    text("3rd", 960, 428);
    text("4th", 960, 315.5);
    text("5th", 960, 203);
  }