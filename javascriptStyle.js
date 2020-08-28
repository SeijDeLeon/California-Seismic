/*eslint no-undef: "error"*/
/*eslint-env browser*/

function dropdownMenu() {
    var x = document.getElementById("dropdownClick");
    if (x.className == "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function toggleDropdown() {
    var x = document.getElementById("dropdownClick");
    if (x.className == "menu-nav") {
        x.className += " responsive";
    } else {
        x.className = "menu-nav";
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

function showSolution(docId) {
    var x = document.getElementById(docId);
    if (x.className == "questionSolution") {
        x.className += " visible";
    } else {
        x.className = "questionSolution";
    }
}
        
function hideSolution(docId) {
    var x = document.getElementById(docId);
    if (x.style.display != "none") {
        x.style.display == "none";
    }
}


/* sidebar from w3schools.com */
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("lectureSidebarExpanded").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    //document.getElementById("main").style.width = "calc(100% - 18px)";
    document.getElementById("lectureSidebarCollapsed").style.visibility = "hidden";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("lectureSidebarExpanded").style.width = "0";
    document.getElementById("lectureSidebarCollapsed").style.marginLeft = "0";
    document.getElementById("lectureSidebarCollapsed").style.visibility = "visible";
    document.getElementById("main").style.marginLeft = "0";
}
/* End sidebar code from w3schools.com */
