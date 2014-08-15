// Init Raphael
var $context  = $('div#context')
    paper     = Raphael($context[0], $context.width(), $context.height()),
    timer     = null,
    origin    = { x: paper.width/2, y: paper.width/2 },

    // Draw flower
    drawFlower = function(newOptions) {
      paper.clear();
      
      var flower   = paper.set(),     // Declare a 'set' (a set of petals will make a flower)
          options  = flowerSettings;  // Copy settings for dat.gui

      $.extend(options,newOptions);   // Extend options from dat.gui

      // Settings shortcuts
      var mx = options.sizeMultiplier,
          pw = options.petalWidth,
          or = options.opacityRange,
          as = options.angleSwingRange,
          np = options.numOfPetals.value,

      // Get SVG path string for a petal
        getPetalPathString = function(i) {
          var path  = 'M ' + (origin.x + (cr * Math.cos(2 * Math.PI * i-0 / np))) + ' ';
              path += (origin.y + (cr * Math.sin(2 * Math.PI * i-0 / np)));
              path += ', c ' + mx + ' ' + (pw * mx) + ', ' + (3 * mx) + ' ' + (pw * mx) + ', ' + (4 * mx) + ' 0,';
              path += 'c -' + mx + ' -' + (pw * mx) + ', -' + (3 * mx) +' -' + (pw * mx) + ', -' + (4 * mx) + ' 0';
          return path;
        },

        colors = '#BB0502,#C00700,#C50A00,#C90E00,#CD1300,#D21900,#D62000,#D92500,#DB2A00,#DF3200,#E13600,#E33C00,#E74400,#EA4B00,#EC5200,#EE5900,#F05E00,#F26300,#F46C00,#F77500,#F97C00,#FB8400,#FD8B00,#FE9400,#FF9D00,#FFA400,#FFAC00,#FFB400,#FFBC00,#FFC400,#FFCB00,#FFD300,#FFD900,#FFDD00,#FFE200,#FFE500,#FFE900,#FFED00,#FDF000,#F8F000,#F5F000,#F1F000,#EDF000,#EAF000,#E5F000,#E1EF00,#DBEC00,#D3E900,#CCE600,#C6E300,#C2E100,#BBDD00,#B4DA00,#AED600,#A8D400,#A4D100,#9ECE00,#99CB00,#96C900,#93C700,#8CC400,#86C000,#82BD00,#7CBA00,#73B500,#6CB100,#66AD00,#60AA00,#5AA600,#53A200,#4B9D00,#439900,#3B9500,#349100,#2F8F00,#2A8D00,#238A00,#1D8904,#1A8909,#16890E,#138915,#11891B,#0F8920,#0E8926,#0C892D,#0A8934,#09893A,#088941,#078A47,#068B4B,#058B52,#058D5B,#048E63,#038F6C,#039073,#03927A,#029383,#02948C,#029693,#01979C,#0199A5,#019AAC,#019BB2,#019CBA,#019EC2,#019FC9,#01A0CD,#01A1D2,#01A2DB,#01A4E3,#01A5E9,#01A6EE,#01A6F2,#01A7F6,#01A6FA,#00A8FE,#02A7FD,#05A4F9,#07A2F6,#09A0F3,#0B9EF0,#0E9AEB,#1297E7,#1593E2,#198FDD,#1D8AD7,#2186D2,#2582CC,#2A7CC4,#2E77BD,#3273B9,#376EB2,#3C67AA,#4162A3,#455E9E,#485A99,#4B5895,#4D5592,#51518C,#574A83,#5E447B,#633F74,#663B6E,#69396B,#6D3566,#703261,#742E5C,#792955,#7D2650,#7F244C,#842046,#8B1A3C,#921533,#98112C,#9D0D25,#A50A1C,#AB0713,#AF060F,#B3050B,#B70506'.split(',');

      // Loop and create petals
      var i=0, thisPetal, prevPetal, thisFilter, newAngle, newColor, newOriginString;

      for (;i<np;i++) {
        // Randomize
        pw = getRandom(options.petalWidthRange);                                                    // Petal width
        mx = getRandom(options.sizeMultiplierRange);                                                // Petal size
        cr = getRandom(options.centerRadiusRange);                                                  // Center radius

        thisPetal = paper.path(getPetalPathString(i));                                              // Create petal from path string

        newAngle = (360/np*i)+(360/np/2);                                                           // Find angle
        newAngle = getRandom(newAngle-as.max,newAngle+as.max);                                      // Apply swing
        if (newAngle>=360)  newAngle -= 360;                                                        // Keep angle 0 <= n > 360
        if (newAngle<0)     newAngle += 360;
        
        newOriginString = origin.x + ' ' + origin.y;                                                // Stringify origin
        newColor = colors[Math.floor(colors.length * (newAngle/360))];                              // Find color

        thisPetal.transform('r' + newAngle + ' ' + newOriginString + ' s0.1 ' + newOriginString);   // Rotate
        //thisPetal.attr('fill','#333366');                                                         // Fill debug

        thisPetal.attr('fill',newColor);                                                            // Fill
        thisPetal.attr('fill-opacity',getRandom(or));                                               // Opacity
        thisPetal.attr('stroke','none');                                                            // Remove stroke

        $(thisPetal.node).attr('class','petal');                                                    // Add class for CSS
        thisPetal.blur(getRandom(flowerSettings.blurRange));                                        // Blur

        flower.push(thisPetal);                                                                     // Add to set

        prevPetal = thisPetal;                                                                      // Remember previous petal for next iteration
      }
    };