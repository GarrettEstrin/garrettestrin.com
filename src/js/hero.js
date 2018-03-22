let hero = {};
hero.prevRatio = 0.0;

hero.entries = function(entries, observer) {
  for(i=0;i < entries.length; i++){
    if(entries[i].intersectionRatio > hero.prevRatio){
      // put hero animation start function here
    }
    hero.prevRatio = entries[i].intersectionRatio;
  }
}

hero.heroIO = new IntersectionObserver(hero.entries,
  {
    // Options
    threshold: [1]
  }
);

hero.heroIO.observe(document.getElementById('jsHero'));

