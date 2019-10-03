window.onscroll = function(){stickyFunction()};

var navbar = document.getElementById("topnav");
var sticky = navbar.offsetTop;


function stickyFunction() {
   /* window.alert("navbar is"+navbar); */
   /* window.alert("Sticky Function has been entered"); */
   /* sticky = navbar.offsetTop;  */
   /* window.alert("Y offset is "+ window.pageYOffset + "top offset is " + navbar.offsetTop) */
  if (window.pageYOffset >= sticky) {
       
    navbar.classList.add("sticky")
  } else {
     
    navbar.classList.remove("sticky");
  }
}


