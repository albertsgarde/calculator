"use strict";
let input = "";

function init()
{
  const buttons = document.querySelectorAll("#buttons button");
  const display = document.querySelector("#display text");
  buttons.forEach(b => b.addEventListener("click", e => 
    {
      input += b.input; // How to set data in html element?
      display.textContent = input;
    }
  ));
}