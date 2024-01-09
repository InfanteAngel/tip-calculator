const tipBox5 = document.getElementById("tipBox5");
const tipBox10 = document.getElementById("tipBox10");
const tipBox15 = document.getElementById("tipBox15");
const tipBox25 = document.getElementById("tipBox25");
const tipBox50 = document.getElementById("tipBox50");
const tipBoxList = [tipBox5, tipBox10, tipBox15, tipBox25, tipBox50];

const billBox = document.getElementById("bill-input");
const customBox = document.getElementById("custom");
const peopleBox = document.getElementById("num-people");
const tipTotal = document.getElementById("tip-total-num");
const finalAmount = document.getElementById("amount-total-num");
const resetButton = document.getElementById("resetButton");
const errorText = document.getElementById("textError");


var myPercentage = 0;
var numPeople = 0;

function calculateTip() {
  totalAmount = 0;
  numPeople = 0;

  totalAmount += Number(document.getElementById("bill-input").value);
  numPeople += Number(document.getElementById("num-people").value);

  if (totalAmount == 0 || totalAmount == null) {
    totalAmount += 1;
  }

  const tipNum = totalAmount * myPercentage;

  const tipPerPerson = tipNum / numPeople;
  const total = tipPerPerson + totalAmount / numPeople;

  tipTotal.innerHTML = "$" + Math.round(tipPerPerson * 100) / 100;
  finalAmount.innerHTML = "$" + Math.round(total * 100) / 100;
  
  if(isNaN(tipPerPerson) || (tipPerPerson === Infinity)){
    tipTotal.innerHTML = "$0.00";
    finalAmount.innerHTML = "$0.00";
    if(errorText.getAttribute("aria-hidden") == "true"){
      errorText.classList.remove("visually-hidden");
      peopleBox.style.cssText = "border: 1.5px solid lightcoral";
      errorText.setAttribute("aria-hidden", "false");
    }
  }
  else if(isNumber(numPeople)){
    if (errorText.getAttribute("aria-hidden") == "false"){
      errorText.classList.toggle("visually-hidden");
      peopleBox.style.cssText = "border: none";
    }
    errorText.setAttribute("aria-hidden", "true");
  }
}


function isNumber(value) {
  return typeof value === "number";
}

function tipSelector(tipBoxSelected) {
  for (var i = 0; i < tipBoxList.length; i++) {
    if (tipBoxList[i] != tipBoxSelected) {
      tipBoxList[i].classList.remove("active-box");
      tipBoxList[i].classList.toggle("static-box");

      customBox.classList.remove("active-box");
      customBox.classList.toggle("static-box");
    }
  }
  tipBoxSelected.classList.remove("static-box");
  tipBoxSelected.classList.toggle("active-box");
}

function customSelected() {
  for (var i = 0; i < tipBoxList.length; i++) {
    tipBoxList[i].classList.remove("active-box");
    tipBoxList[i].classList.toggle("static-box");
    selectedPercentage = 0;
  }
}



customBox.addEventListener("change", function () {
  customSelected();
  const customTip = document.getElementById("custom").value;
  myPercentage = customTip / 100;
  console.log(myPercentage);
  calculateTip();
});

function toggle5() {
  myPercentage = 0.05;
  tipSelector(tipBox5);
  calculateTip();
}
tipBox5.addEventListener("click", toggle5);

function toggle10() {
  myPercentage = 0.1;
  tipSelector(tipBox10);
  calculateTip();
}
tipBox10.addEventListener("click", toggle10);

function toggle15() {
  myPercentage = 0.15;
  tipSelector(tipBox15);
  calculateTip();
}
tipBox15.addEventListener("click", toggle15);

function toggle25() {
  myPercentage = 0.25;
  tipSelector(tipBox25);
  calculateTip();
}
tipBox25.addEventListener("click", toggle25);

function toggle50() {
  myPercentage = 0.5;
  tipSelector(tipBox50);
  calculateTip();
}
tipBox50.addEventListener("click", toggle50);

function resetAll() {
  customSelected();
  totalAmount.innerHTML == "";
  customBox.innerHTML = "";
  tipTotal.innerHTML = "$0.00";
  finalAmount.innerHTML = "$0.00";
  location.reload();
}
resetButton.addEventListener("click", resetAll);


billBox.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    e.preventDefault();
    calculateTip();
  }
});

customBox.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    e.preventDefault();
    const customTip = document.getElementById("custom").value;
    myPercentage = customTip / 100;
    console.log(myPercentage);
    calculateTip();
  }
});

peopleBox.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    e.preventDefault();
    calculateTip();
  }
});
