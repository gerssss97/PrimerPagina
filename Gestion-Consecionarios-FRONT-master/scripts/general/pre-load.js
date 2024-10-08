window.onload = function() {
  document.documentElement.scrollTop = 0;
};

window.addEventListener('DOMContentLoaded', function () {
  
  setTimeout(function () {
   
    $('#preloader').fadeOut(); 
    document.body.classList.remove('hidden-carga'); 
  }, 700); 
});