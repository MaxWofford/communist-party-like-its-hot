window.onload = function() {
  var els = document.querySelectorAll('.glitch');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.dataset.text = el.textContent;
  }
}
