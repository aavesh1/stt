/*$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});*/

$(".fa-plus").click(function () {
  $("#top").slideToggle('swing');
});

// Setting Date field value to today.
$(document).ready(function(){
var field = document.querySelector("#today");
var date = new Date();
field.value =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0);


var date2 = new Date();
  var value = date2.getFullYear().toString() +
    "-" + (date2.getMonth() + 1).toString().padStart(2, 0) +
    "-" + date2.getDate().toString().padStart(2, 0) + ' at ' + date2.getHours().toString().padStart(2, 0) + ':' + date2.getMinutes().toString().padStart(2, 0);
$('input[name=time]').val(value); 
console.log(value)

})


