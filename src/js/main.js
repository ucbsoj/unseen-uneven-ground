import $ from "jquery"; // importing jQuery, you can delete if not needed
require("./lib/social"); // Twitter intent JS


var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});