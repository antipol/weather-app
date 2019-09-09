import { getPosition, search, write } from "./data.js";

const form = document.querySelector("form");

window.addEventListener("load", () => {
  getPosition();


  //Why do you have this eventlistener inside the onload function?
  form.addEventListener("submit", search); // by press enter


  // write(getPosition());
});
