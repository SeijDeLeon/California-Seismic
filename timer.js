var c = 0;
var minutes = 0;
var seconds = 0;
           function timerFunction() {
               c++
               minutes = Math.floor(c/60);
               seconds = c % 60;
               
               if(seconds<10) { //check if the value of seconds to display should have a 0 in front
                    document.getElementById("timeValue").innerHTML = minutes + ":0"+seconds; } 
               else {
                    document.getElementById("timeValue").innerHTML = minutes + ":"+seconds;
               }
               }
               