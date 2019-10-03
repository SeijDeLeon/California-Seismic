 function dropdownMenu() {
        
        var x = document.getElementById("dropdownClick");
        if (x.className == "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
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
    if (answer=="TRUE") {
        x.style.backgroundColor = "#a9fca7";
    } else {
            x.style.backgroundColor = "#ff7373";
        }
    }

function showSolution(docId){
    var x = document.getElementById(docId);
    if (x.className == "questionSolution") {
            x.className += " visible"; 
        } else {
            x.className = "questionSolution";
        }
}
        
function hideSolution(docId){
    var x = document.getElementById(docId);
    if (x.style.display != "none"){
        x.style.display == "none";
    }
}