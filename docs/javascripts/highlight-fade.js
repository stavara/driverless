document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelectorAll(".md-typeset mark").forEach(function (el) {
      el.style.transition = "background-color 1.2s ease, color 1.2s ease";
      el.style.backgroundColor = "transparent";
    });
  }, 2500);
});
