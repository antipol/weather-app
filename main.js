import { getPosition, search } from "./data.js";
const form = document.querySelector("form");
window.addEventListener("load", () => {
  getPosition();
  form.addEventListener("submit", search); // by press enter
});
