//setting up variables for inputs
let button=document.getElementById("Submit");
let inputs=document.getElementsByClassName("inputs");
let warnings=document.getElementsByClassName("warning");
let ieInput=document.getElementById("Ie");
let ieWarning=document.getElementById("ie-warning");
let rInput=document.getElementById("r");
let rWarning=document.getElementById("r-warning");
let tInput=document.getElementById("t");
let tWarning=document.getElementById("t-warning");
let sdsInput=document.getElementById("sds");
let sdsWarning=document.getElementById("sds-warning");
let h1Input=document.getElementById("h1");
let h1Warning=document.getElementById("h1-warning");
let h2Input=document.getElementById("h2");
let h2Warning=document.getElementById("h2-warning");
let sd1Input=document.getElementById("sd1");
let sd1Warning=document.getElementById("sd1-warning");
let s1Input=document.getElementById("s1");
let s1Warning=document.getElementById("s1-warning");
let nInput=document.getElementById("n");
let nWarning=document.getElementById("n-warning");
let mroofInput=document.getElementById("mroof");
let mroofWarning=document.getElementById("mroof-warning");
let mtypInput=document.getElementById("mtyp");
let mtypWarning=document.getElementById("mtyp-warning");
let m2Input=document.getElementById("m2");
let m2Warning=document.getElementById("m2-warning");
button.addEventListener("click", generate);

function generate() {
 //checks for empty fields
  for(let i=0;i<warnings.length;i++){
    if(inputs[i].value==""){
      warnings[i].innerHTML="Please Enter Value";
      warnings[i].style.visibility="visible";
    }
    if(inputs[i].value!=""){
      warnings[i].innerHTML="";
      warnings[i].style.visibility="hidden";
    }
  }
  //input validation for Ie
  if(((ieInput.value!=1.0)&&(ieInput.value!=1.5)&&(ieInput.value!=2.0))&&(ieInput.value!="")){
    ieWarning.innerHTML="Invalid Input";
    ieWarning.style.visibility="visible";

  }
  //input validation for R
  if(((rInput.value<1)||(rInput.value>8))&&(rInput.value!=="")){
    rWarning.innerHTML="Invalid Input";
    rWarning.style.visibility="visible";
  }

  if((rInput.value-Math.floor(rInput.value)!=0)&&(rInput.value-Math.floor(rInput.value)!=0.5)){
    rWarning.innerHTML="Invalid Input";
    rWarning.style.visibility="visible";
  }
  //input validation for t
  if(((tInput.value<0.1)||(tInput.value>2))&&(tInput.value!=="")){
    tWarning.innerHTML="Invalid Input";
    tWarning.style.visibility="visible";
  }
  //input validation for Sds
  if(((sdsInput.value<0.5)||(sdsInput.value>2))&&(sdsInput.value!=="")){
    sdsWarning.innerHTML="Invalid Input";
    sdsWarning.style.visibility="visible";
  }
  //input validation for h1
  if(((h1Input.value<10)||(h1Input.value>18))&&(h1Input.value!=="")){
    h1Warning.innerHTML="Invalid Input";
    h1Warning.style.visibility="visible";
  }
  //input validation for h2
  if(((h2Input.value<10)||(h2Input.value>16))&&(h2Input.value!=="")){
    h2Warning.innerHTML="Invalid Input";
    h2Warning.style.visibility="visible";
  }
  //input validation for sd1
  if(((sd1Input.value<0.2)||(sd1Input.value>1.0))&&(sd1Input.value!=="")){
    sd1Warning.innerHTML="Invalid Input";
    sd1Warning.style.visibility="visible";
  }
  if((sd1Input.value>=sdsInput.value)&&(sdsInput.value!="")){
    sd1Warning.innerHTML="Invalid Input";
    sd1Warning.style.visibility="visible";
  }
  //input validation for s1
  if((s1Input.value!=sd1Input.value*1.5)&&(sd1Input.value!="")&&(s1Input.value!="")){
    s1Warning.innerHTML="Invalid Input";
    s1Warning.style.visibility="visible";
  }
  //input validation for n
  if(((nInput.value<1)||(nInput.value>10))&&(nInput.value!=="")){
    nWarning.innerHTML="Invalid Input";
    nWarning.style.visibility="visible";
  }
  //input validation for mroof, mtyp, and m2
  if((nInput.value==1)&&(mtypInput.value!="")){
    mtypWarning.innerHTML="Not needed for n=1";
    mtypWarning.style.visibility="visible";

  }
  if((nInput.value==1)&&(m2Input.value!="")){
    m2Warning.innerHTML="Not needed for n=1";
    m2Warning.style.visibility="visible";
  }
  if((nInput.value==2)&&(mtypInput.value!="")){
    mtypWarning.innerHTML="Not needed for n=2";
    mtypWarning.style.visibility="visible";
  }
  if(((mroofInput.value<1000)||(mroofInput.value>10000))&&(mroofInput.value!=="")){
    mroofWarning.innerHTML="Invalid Input";
    mroofWarning.style.visibility="visible";
  }
  if(((mtypInput.value<1000)||(mtypInput.value>10000))&&(mtypInput.value!=="")){
    mtypWarning.innerHTML="Invalid Input";
    mtypWarning.style.visibility="visible";
  }
  if(((m2Input.value<1000)||(m2Input.value>10000))&&(m2Input.value!=="")){
    m2Warning.innerHTML="Invalid Input";
    m2Warning.style.visibility="visible";
  }

}
