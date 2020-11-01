/*eslint no-undef: "error"*/
/*eslint-env browser*/

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

//$(document).ready(function() {
//        var $sidebar   = $("#lectureSidebar"), 
//            $window    = $(window),
//            offset     = $sidebar.offset(),
//            topPadding = 73;
//
//        $window.scroll(function() {
//            if ($window.scrollTop() > offset.top) {
//                $sidebar.stop().animate({
//                    marginTop: $window.scrollTop() - offset.top + topPadding
//                });
//            } else {
//                $sidebar.stop().animate({
//                    marginTop: 0
//                });
//            }
//        });
//});

$(document).ready(function () {
    var top = $('#lectureSidebar').offset().top - parseFloat($('#lectureSidebar').css('marginTop').replace(/auto/, 0)) - 20;
    
    var footer = $('.footingMain');
    var sidebar = $('.lectureSidebar');
    var body = document.body;
    var html = document.documentElement;
//    var docHeight = Math.max( $(body).scrollHeight, $(body).offsetHeight, $(html).clientHeight, $(html).scrollHeight, $(html).offsetHeight );
    var docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
//    var docHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    var sidebarHeight = $('#lectureSidebar').height();
    var footerHeight = $('#footingMain').height();
    
    $(window).scroll(function (event) {
        // Lecture Sidebar Sticky
        var y = $(this).scrollTop();
        if (y >= top) {
            $('#lectureSidebarWrapper').css('top', 20 + 'px');
        } else {
            $('#lectureSidebarWrapper').css('top', 93 - y + 'px');
        }     
        if (y+sidebarHeight+40 >= docHeight-footerHeight) {
            var endHeight = docHeight - y - footerHeight - sidebarHeight;
            $('#lectureSidebar').css('top', endHeight + 'px');
        }
    });
});