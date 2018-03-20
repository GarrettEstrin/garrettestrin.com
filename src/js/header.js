[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function() {
		img.removeAttribute('data-src');
	};
});

let hdr = {};

// move logo
hdr.logo = document.getElementById('jsLogo');

hdr.fadeLogo = function(){
  hdr.logo.classList.add("fade");
}
hdr.moveAndResizeLogo = function(){
  hdr.logo.width = 200;
  hdr.logo.style.position = "absolute";
  hdr.logo.style.left = (Math.random() * 100) + "%";
  hdr.logo.style.top = (Math.random() * 100) + "%";
}
hdr.showLogo = function(){
  hdr.logo.classList.remove("fade");
}
setInterval(function(){
  hdr.fadeLogo();
  setTimeout(function(){
    hdr.moveAndResizeLogo();
    hdr.showLogo();
  }, 2000)
}, 3000)


