[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function() {
		img.removeAttribute('data-src');
	};
});

let hdr = {};

// move logo
hdr.logo = document.getElementById('jsLogo');

hdr.randomlyMoveElement = function(el){
  el.style.left = (Math.random() * 100) + "%";
  el.style.top = (Math.random() * 100) + "%";
  el.style.right = (Math.random() * 100) + "%";
  el.style.bottom = (Math.random() * 100) + "%";
}
// resize logo after 2 seconds
setTimeout(function(){
  if(!hdr.logo.classList.contains('hdr__logo--small')){
    hdr.logo.classList.add('hdr__logo--small');
  }
},2000)
// start moving logo every 3 seconds after 3 seconds
setTimeout(function(){
  setInterval(function(){
    hdr.randomlyMoveElement(hdr.logo);
  }, 3000)
},3000)
// fade in header text after 2 seconds
setTimeout(function(){
  document.getElementById('jsHdrTitle').classList.add('fade-in');
  document.getElementById('jsHdrSubtitle').classList.add('fade-in');
},2000)
// list of expertizes
hdr.expertize = [
  {title: 'Pop-Tart Aficionado', index: 1},
  {title: 'Hockey Expert', index: 2},
  {title: 'Pokemon Connoisseur', index: 3}
]
hdr.expertizeLocation = document.getElementById('jshdr__expertize');
hdr.expertizeMod = hdr.expertize.slice(0);
// randomly pick an expertize from the array
hdr.pickExpertize = function(){
  if(hdr.expertizeMod.length == 0){
    hdr.expertizeMod = hdr.expertize.slice(0);
  }
  let index = Math.round(Math.random() * (hdr.expertizeMod.length - 1));
  let expertize = hdr.expertizeMod[index];
  hdr.expertizeMod.splice(index,1);
  return expertize;
}
// change text on header
hdr.showExpertise = function(){
  let expertize = hdr.pickExpertize();
  hdr.expertizeLocation.innerText = expertize.title;
}
// run on element click
hdr.expertizeLocation.addEventListener('click', hdr.showExpertise);
// run on page load
hdr.showExpertise();





