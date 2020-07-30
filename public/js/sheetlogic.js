$(document).ready(function () {
  $("#hidebtn").click(function () {
    $("#hideinput").fadeToggle();
  });

  $("#stats").click(function () {
    $("#datatable").fadeToggle("fast");
    $("#pop").fadeToggle("fast");
    if ($(this).text() == "Statistics") $(this).text("Table");
    else $(this).text("Statistics");
  });
});

