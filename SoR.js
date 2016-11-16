var SoR = {
  tempYArr: [],
  size: 500,

  function evaluateEquation(x, equationToEval) {
    return parseFloat(parseFloat(math.eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
  },

  function storyYVals() {
    for (var i = 0; i <= SoR.size * (b - a); i++) {
      SoR.tempYArr.push(evaluateEquation(xVal, equationToEval));
      xVal = xVal - (1 / SoR.size);
    }
  },

  function integral() {
    var equationToEval = "3.14159265*(" + document.getElementById('equation').value + ")^2";
    var integralValue = 0;
    var N = parseInt($('#rectangles').val());
    var a = parseInt($('#minX').val());
    var b = parseInt($('#maxX').val());
    var xVal = b;
    var tempY = 0;
    var count = SoR.size * (b - a);
    var prevYVal = 0;
    for (var i = 0; i < SoR.size * (b - a); i++) {
      tempY = SoR.tempYArr[count] * (1 / SoR.size);
      // integralValue += parseFloat(tempY.toFixed(6));
      // xVal = xVal - (1 / SoR.size);
      if (i > 0) {
        if (!isFinite(tempY)) {
          //integralValue = "diverges";
          break;
        } else if (Math.abs((tempY - prevYVal) / (1 / SoR.size)) >= 999999) {
          integralValue = "diverges";
          break;
        } else {
          integralValue += parseFloat(tempY.toFixed(6));
        }
      } else {
        if (isFinite(tempY) && !isNaN(tempY)) {
          integralValue += parseFloat(tempY.toFixed(6));
        }
      }
      xVal = xVal - (1 / SoR.size);
      prevYVal = tempY;
      count--;
    }
    tempY = 0;
    var prevYVal = 0;
    var temporary = 0;
    count = 0;
    xVal = a;
    if (integralValue != "diverges") {
      for (var i = 0; i < SoR.size * (b - a); i++) {
        tempY = SoR.tempYArr[count] * (1 / SoR.size);

        // temporary += parseFloat(tempY.toFixed(6));
        // xVal = xVal + (1 / SoR.size);
        if (i > 0) {
          if (!isFinite(tempY)) {
            //integralValue = "diverges";
            break;
          } else if (Math.abs((tempY - prevYVal) / (1 / SoR.size)) >= 999999) {
            integralValue = "diverges";
            break;
          } else {
            temporary += parseFloat(tempY.toFixed(6));
          }
        } else {
          if (isFinite(tempY) && !isNaN(tempY)) {
            temporary += parseFloat(tempY.toFixed(6));
          }
        }
        xVal = xVal + (1 / SoR.size);
        prevYVal = tempY;
        count++;
      }
    }
    console.log(integralValue + "    " + temporary);
    if (integralValue != "diverges") {
      integralValue = (integralValue + temporary) / 2;
      integralValue = parseFloat(integralValue.toFixed(3));
    }
    MathJax.Hub.Queue(function() {
      if (integralValue != "diverges") {
        $('#integral').empty().append("Volume: `int_(" + a + ")^(" + b + ")" + equationToEval + " dx = " + integralValue + "`");
      } else {
        $('#integral').empty().append("Volume: `int_(" + a + ")^(" + b + ")" + equationToEval + " = " + integralValue + "`");
      }
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  },

  function surfaceArea() {
    var equationToEval = "2*3.14159265*(" + document.getElementById('equation').value + ")";
    var integralValue = 0;
    var N = parseInt($('#rectangles').val());
    var a = parseInt($('#minX').val());
    var b = parseInt($('#maxX').val());
    var xVal = b;
    var tempY = 0;
    var prevYVal = 0;
    var count = SoR.size * (b - a) - 1;
    for (var i = 0; i < SoR.size * (b - a) - 1; i++) {
      tempY = (((SoR.tempYArr[count] + evaluateEquation(xVal - (1 / SoR.size), equationToEval)) / 2) * (1 / SoR.size));
      // integralValue += parseFloat(tempY.toFixed(6));
      // xVal = xVal - (1 / SoR.size);
      if (i > 0) {
        if (!isFinite(tempY)) {
          //integralValue = "diverges";
          break;
        } else if (Math.abs((tempY - prevYVal) / (1 / SoR.size)) >= 999999) {
          integralValue = "diverges";
          break;
        } else {
          integralValue += parseFloat(tempY.toFixed(6));
        }
      } else {
        if (isFinite(tempY) && !isNaN(tempY)) {
          integralValue += parseFloat(tempY.toFixed(6));
        }
      }
      xVal = xVal - (1 / SoR.size);
      prevYVal = tempY;
      count--;
    }
    tempY = 0;
    var prevYVal = 0;
    var temporary = 0;
    xVal = a;
    count = 0;
    if (integralValue != "diverges") {
      for (var i = 0; i < SoR.size * (b - a) - 1; i++) {
        tempY = (((SoR.tempYArr[count] + evaluateEquation(xVal + (1 / SoR.size), equationToEval)) / 2) * (1 / SoR.size))

        // temporary += parseFloat(tempY.toFixed(6));
        // xVal = xVal + (1 / SoR.size);
        if (i > 0) {
          if (!isFinite(tempY)) {
            //integralValue = "diverges";
            break;
          } else if (Math.abs((tempY - prevYVal) / (1 / SoR.size)) >= 999999) {
            integralValue = "diverges";
            break;
          } else {
            temporary += parseFloat(tempY.toFixed(6));
          }
        } else {
          if (isFinite(tempY) && !isNaN(tempY)) {
            temporary += parseFloat(tempY.toFixed(6));
          }
        }
        xVal = xVal + (1 / SoR.size);
        prevYVal = tempY;
        count++;
      }
    }
    console.log(integralValue + "    " + temporary);
    if (integralValue != "diverges") {
      integralValue = (integralValue + temporary) / 2;
      integralValue = parseFloat(integralValue.toFixed(3));
    }
    MathJax.Hub.Queue(function() {
      if (integralValue != "diverges") {
        $('#surfaceArea').empty().append("Surface Area: `int_(" + a + ")^(" + b + ")" + equationToEval + " dx = " + integralValue + "`");
      } else {
        $('#surfaceArea').empty().append("Surface Area: `int_(" + a + ")^(" + b + ")" + equationToEval + " = " + integralValue + "`");
      }
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  },

  function changeInputs() {
    parametric = document.getElementById('parametric').checked;
    console.log(parametric)
    if (parametric) {
      document.getElementById("eqLab1").style.display = 'inline';
      document.getElementById("eqLab").style.display = 'none';
    } else {
      document.getElementById("eqLab1").style.display = 'none';
      document.getElementById("eqLab").style.display = 'inline';
    }
  },

  function RenderEquations(e) {
    equationToEval = document.getElementById('equation').value;
    MathJax.Hub.Queue(["Text", MathJax.Hub.getAllJax(document.getElementById('equationFormatShown'))[0], 'f(x)=' + equationToEval]);
  },

  function drawGraph() {
    z1 = [];
    y1 = [];
    x1 = [];
    parametric = document.getElementById('parametric').checked;
    if (!parametric) {
      equation = document.getElementById('equation').value;
      minX = parseFloat(document.getElementById("minX").value);
      maxX = parseFloat(document.getElementById("maxX").value);
      minY = parseFloat(document.getElementById("minY").value);
      maxY = parseFloat(document.getElementById("maxY").value);
      minZ = parseFloat(document.getElementById("minZ").value);
      maxZ = parseFloat(document.getElementById("maxZ").value);
      iterate = parseFloat(document.getElementById("iterate").value);
      for (y = minY; y <= maxY; y += iterate) {
        tempz = [];
        tempy = [];
        tempx = [];
        for (x = minX; x <= maxX; x += iterate) {
          z = parseFloat(parseFloat(math.eval(((equation).replace(new RegExp("x", 'g'), "(" + x + ")").replace(new RegExp("y", 'g'), "(" + y + ")")))).toFixed(3));
          if ((z <= maxZ) && (z >= minZ)) {
            tempx.push(x);
            tempy.push(y);
            tempz.push(eval(equation));
          } else {
            tempx.push(null);
            tempy.push(null);
            tempz.push(null);
          }
        }
        //dumb = false;
        x1.push(tempx);
        y1.push(tempy);
        z1.push(tempz);
      }
    } else {
      console.log("dumb");
      equationx = "cos(p)*" + document.getElementById('equation').value;
      equationx = equationx.replace(new RegExp("x", 'g'), "t");
      equationy = "t";
      equationy = equationy.replace(new RegExp("x", 'g'), "t");
      equationz = "sin(p)*" + document.getElementById('equation').value;
      equationz = equationz.replace(new RegExp("x", 'g'), "t");
      minX = parseFloat(document.getElementById("minX").value);
      maxX = parseFloat(document.getElementById("maxX").value);
      minY = parseFloat(document.getElementById("minY").value);
      maxY = parseFloat(document.getElementById("maxY").value);
      minZ = parseFloat(document.getElementById("minZ").value);
      maxZ = parseFloat(document.getElementById("maxZ").value);
      iterate = parseFloat(document.getElementById("iterate").value);
      for (p = minY; p <= maxY; p += iterate) {
        tempz = [];
        tempy = [];
        tempx = [];
        for (t = minX; t <= maxX; t += iterate) {
          temptempz = parseFloat(parseFloat(math.eval(((equationz).replace(new RegExp("p", 'g'), "(" + p + ")").replace(new RegExp("t", 'g'), "(" + t + ")")))).toFixed(2));
          if (temptempz <= maxZ || temptempz >= minZ) {
            //if ((z <= maxZ) && (z >= minZ)) {
            tempx.push(parseFloat(math.eval(((equationx).replace(new RegExp("p", 'g'), "(" + p + ")").replace(new RegExp("t", 'g'), "(" + t + ")")))).toFixed(2));
            tempy.push(parseFloat(math.eval(((equationy).replace(new RegExp("p", 'g'), "(" + p + ")").replace(new RegExp("t", 'g'), "(" + t + ")")))).toFixed(2));
            tempz.push(parseFloat(math.eval(((equationz).replace(new RegExp("p", 'g'), "(" + p + ")").replace(new RegExp("t", 'g'), "(" + t + ")")))).toFixed(2));
          } else {
            tempx.push(null);
            tempy.push(null);
            tempz.push(null);
          }
        }
        //dumb = false;
        x1.push(tempx);
        y1.push(tempy);
        z1.push(tempz);
      }
    }
    op = document.getElementById('opacity').value;
    lowCol = document.getElementById('lowCol').value;
    midCol = document.getElementById('midCol').value;
    maxCol = document.getElementById('maxCol').value;
    console.log(lowCol);
    var data_z1 = {
      x: x1,
      y: y1,
      z: z1,
      type: 'surface',
      opacity: op,
      colorscale: [
        [0, lowCol],
        [0.5, midCol],
        [1, maxCol]
      ]
    };
    Plotly.newPlot('tester', [data_z1]);
    integral();
    surfaceArea();
  }
}
