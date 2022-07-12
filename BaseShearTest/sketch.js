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
    line(700, 537.5, 900, 537.5);
    line(650, 650, 950, 650);
    //diagonal line
    line(525, 200, 675, 655);
    //lines and arrows coming from diagonal line
    line(525, 200, 650, 200);
    triangle(650, 215, 650, 185, 665, 200);
    line(562, 312.5, 650, 312.5);
      triangle(650, 327.5, 650, 297.5, 665, 312.5);
    line(600, 425, 650, 425);
    triangle(650, 440, 650, 410, 665, 425);
    line(636, 537.5, 650, 537.5);
    triangle(650, 552.5, 650, 522.5, 665, 537.5);
  //text on top of arrows
    text("F4", 650, 180);
    text("F3", 650, 292.5);
    text("F2", 650, 405);
    text("F1", 650, 517.5);
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
    text("5th", 960, 203)
  
  
    
  
    
    
    
  
  
  
  
    
  
  
    
    
  
    
    
  }