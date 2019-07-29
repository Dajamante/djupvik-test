

function myFunction() {

let dots = document.getElementById("dots");
console.dir(dots)
let moreText = document.getElementById("more");
console.dir(moreText)
let btnText = document.getElementById("myBtn");

if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
} else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}