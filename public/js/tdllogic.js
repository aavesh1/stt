/*$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});*/

$(".fa-plus").click(function () {
  $("input").fadeToggle(20);
});

// Setting Date field value to today.

var field = document.querySelector("#today");
var date = new Date();
field.value =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0);
