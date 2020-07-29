$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});

$(".fa-plus").click(function () {
  $("input").fadeToggle(20);
});
