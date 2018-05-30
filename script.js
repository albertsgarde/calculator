"use strict";
const operators = ["+", "-", "*", "/"];
let numbers = [];
for (let i = 0; i < 10; i++)
  numbers.push("" + i);
const validInputs = operators.concat(["clr", "del", "=", "."]).concat(numbers);

let expr = "";
function init()
{
  const buttons = document.querySelectorAll("#buttons button");
  buttons.forEach(b => b.addEventListener("click", e => handleInput(b.dataset.input)));
  
  document.addEventListener('keydown', function(event) 
    {
      let input = String.fromCharCode(event.which);
      if (event.keyCode === 8) //backspace
        input = "del";
      handleInput(input);
    }
  );
}

function handleInput(input)
{
  if (input === "clr")
    expr = "";
  else if (input === "del")
    expr = expr.substring(0, expr.length - 1);
  else if (validInputs.includes(input) && 
      !(input === "." && getCurrentNumber(expr).includes(".")) && 
      !(operators.includes(input) && (operators.includes(expr.slice(-1)) || expr.length === 0)))
  {
    expr += input;
  }
  update();
}

function update()
{
  const display = document.querySelector("#input text");
  const result = document.querySelector("#result text");
  if (expr.slice(-1) === "=")
  {
    expr = expr.substring(0, expr.length - 1);
    if (isValidExpression(expr))
      expr = "" + evaluate(expr);
  }
  if (isValidExpression(expr))
  {
    result.textContent = evaluate(expr);
  }
  else if (expr === "")
  {
    result.textContent = "";
  }
  else
    result.textContent = "NaN";
  display.textContent = expr;
}

/*
  Always true if expression is valid, not necessarily false if expression is invalid.
*/
function isValidExpression(expr)
{
  return !expr.includes("=") && expr.slice(-1).match(/[0-9]/) && evaluate(expr) != Infinity;
}

function evaluate(expr)
{
  let result = eval(expr);
  return result;
}

/*
  returns the number currently being entered as a string.
*/
function getCurrentNumber(expr)
{
  return expr.substring(lastOperator(expr) + 1);
}

function lastOperator(expr)
{
  for (let i = expr.length - 1; i >= 0; i--)
  {
    if (operators.includes(expr[i]))
      return i;
  }
  return -1;
}