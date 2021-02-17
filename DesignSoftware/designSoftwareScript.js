function draw(){
  var canvas = document.getElementById('diaphragmCanvas');
    canvas.width=canvas.clientWidth;
    canvas.height=canvas.clientHeight;
  var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    ctx.lineWidth=3;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.strokeRect(0.2*width, 0.2*height, 0.6*width, 0.6*height);
    ctx.font = "20px Arial";
    ctx.fillText("Width", 0.1*width, 0.5*height);
    ctx.fillText("Length", 0.45*width, 0.9*height);
}



function toggleDropdown() {
    var x = document.getElementById("dropdownClick");
    var y = document.getElementById("dropdownContainer");
    var z = document.getElementsByClassName("dropdownIcon");
    if (x.className == "menu-nav") {
        x.className += " responsive";
        z[0].getElementsByTagName("A")[0].innerHTML = "&#9587";
    } else {
        x.className = "menu-nav";
        z[0].getElementsByTagName("A")[0].innerHTML = "&#9776";
    }
    if (y.className == "top-nav-container") {
        y.className += " responsive";
    } else {
        y.className = "top-nav-container";
    }
}
        
function dropdownMenuLecture() {
    var x = document.getElementById("dropdownClickLecture");
    if (x.className == "topnavLecture") {
        x.className += " responsive";
    } else {
        x.className = "topnavLecture";
    }
}

function dropdownMenuQuestion() {
    var x = document.getElementById("dropdownClickQuestion");
    if (x.className == "sidenavQuestion") {
        x.className += " responsive";
    } else {
        x.className = "sidenavQuestion";
    }
}
        
function questionCheck(answer, docId) {
    var x = document.getElementById(docId);
    if (answer == "TRUE") {
        x.style.backgroundColor = "#a9fca7";
    } else {
        x.style.backgroundColor = "#ff7373";
    }
}








