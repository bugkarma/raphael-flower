(function(){
  var initGUI = function() {
    var prop, thisProp;
    for (prop in flowerSettings) {
      thisProp = flowerSettings[prop];
      thisProp.onChange = function(value) {
        flowerSettings[this.property].value = value;
        flowerLogo.drawFlower(flowerSettings);
      };
    }
    guiGlue(flowerSettings);
  };

  window.addEventListener('load',initGUI);
}());