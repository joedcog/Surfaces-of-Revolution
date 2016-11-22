var SoR = {
    //tempYArr1: [],
    tempYArr2: [],
    size: 200,

    evaluateEquation: function(x, equationToEval) {
        var a = math.eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")));
        if(!isNaN(a)){
          return parseFloat(parseFloat(math.eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
        }
        else{
          return null
        }
    },

    storeYVals: function() {
        var equationToEval = document.getElementById('equation').value;
        var a = parseInt($('#minX').val());
        var b = parseInt($('#maxX').val());
        //SoR.tempYArr1 = [];
        SoR.tempYArr2 = [];
        //var xVal = a;
        // for (var i = 0; i <= SoR.size * (b - a); i++) {
        //     SoR.tempYArr1.push(SoR.evaluateEquation(xVal, equationToEval));
        //     xVal = xVal + (1 / SoR.size);
        // }
        var xVal = b;
        for (var i = 0; i <= SoR.size * (b - a); i++) {
            SoR.tempYArr2.push(SoR.evaluateEquation(xVal, equationToEval));
            xVal = xVal - (1 / SoR.size);
        }
    },

    integral: function() {
        var equationToEval = "pi*(" + document.getElementById('equation').value + ")^2";
        var integralValue = 0;
        var N = parseInt($('#rectangles').val());
        var a = parseInt($('#minX').val());
        var b = parseInt($('#maxX').val());
        var xVal = b;
        var tempY = 0;
        var count = 0;
        var prevYVal = 0;
        for (var i = 0; i < SoR.size * (b - a); i++) {
            //tempY = 3.14159265359 * Math.pow(SoR.tempYArr2[count], 2) * (1 / SoR.size);
            tempY = (1/3)*3.14159265359*(1/SoR.size)*(Math.pow(SoR.tempYArr2[count],2) + SoR.tempYArr2[count]*SoR.tempYArr2[count+1] + Math.pow(SoR.tempYArr2[count+1],2));
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
            count++;
        }
        tempY = 0;
        // var prevYVal = 0;
        // var temporary = 0;
        // count = 0;
        // xVal = a;
        // if (integralValue != "diverges") {
        //     for (var i = 0; i < SoR.size * (b - a); i++) {
        //         tempY = 3.14159265359 * Math.pow(SoR.tempYArr1[count], 2) * (1 / SoR.size);

        //         // temporary += parseFloat(tempY.toFixed(6));
        //         // xVal = xVal + (1 / SoR.size);
        //         if (i > 0) {
        //             if (!isFinite(tempY)) {
        //                 //integralValue = "diverges";
        //                 break;
        //             } else if (Math.abs((tempY - prevYVal) / (1 / SoR.size)) >= 999999) {
        //                 integralValue = "diverges";
        //                 break;
        //             } else {
        //                 temporary += parseFloat(tempY.toFixed(6));
        //             }
        //         } else {
        //             if (isFinite(tempY) && !isNaN(tempY)) {
        //                 temporary += parseFloat(tempY.toFixed(6));
        //             }
        //         }
        //         xVal = xVal + (1 / SoR.size);
        //         prevYVal = tempY;
        //         count++;
        //     }
        // }
        //console.log(integralValue + "    " + temporary);
        if (integralValue != "diverges") {
            //integralValue = (integralValue + temporary) / 2;
            integralValue = parseFloat(integralValue.toFixed(3));
        }
        MathJax.Hub.Queue(function() {
            if (integralValue != "diverges") {
                $('#integral').empty().append("Volume: `int_(" + a + ")^(" + b + ")" + equationToEval + " dx approx " + integralValue + "`");
            } else {
                $('#integral').empty().append("Volume: " + integralValue);
            }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    },

    surfaceArea: function() {
        var equationToEval = "2*pi*(" + document.getElementById('equation').value + ")";
        var integralValue = 0;
        var N = parseInt($('#rectangles').val());
        var a = parseInt($('#minX').val());
        var b = parseInt($('#maxX').val());
        var xVal = b;
        var tempY = 0;
        var prevYVal = 0;
        var count = 0;
        for (var i = 0; i < SoR.size * (b - a); i++) {
            //tempY = (((SoR.tempYArr2[count] + SoR.evaluateEquation(xVal - (1 / SoR.size), equationToEval)) / 2) * (1 / SoR.size));
            //tempY = Math.sqrt(Math.pow(SoR.tempYArr2[count+1]-SoR.tempYArr2[count],2)+(1 / Math.pow(SoR.size,2)));
            tempY = Math.abs(3.14159265359 * (SoR.tempYArr2[count + 1] + SoR.tempYArr2[count]) * (Math.sqrt(Math.pow(SoR.tempYArr2[count + 1] - SoR.tempYArr2[count], 2) + (1 / Math.pow(SoR.size, 2)))));
            // integralValue += parseFloat(tempY.toFixed(6));
            // xVal = xVal - (1 / SoR.size);
            //console.log(tempY);
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
            //xVal = xVal - (1 / SoR.size);
            prevYVal = tempY;
            count++;
        }

        //console.log(integralValue);
        tempY = 0;
        var prevYVal = 0;
        var temporary = 0;
        xVal = a;
        count = 0;
        //     if (integralValue != "diverges") {
        //       for (var i = 0; i < SoR.size * (b - a) - 1; i++) {
        //         //tempY = (((SoR.tempYArr1[count] + SoR.evaluateEquation(xVal + (1 / SoR.size), equationToEval)) / 2) * (1 / SoR.size))
        //         //tempY = Math.sqrt(Math.pow(SoR.tempYArr1[count+1]-SoR.tempYArr1[count],2)+(1 / Math.pow(SoR.size,2)));
        //         tempY = 3.14159265*(SoR.tempYArr1[count+1]+SoR.tempYArr1[count])*Math.sqrt(Math.pow(SoR.tempYArr1[count+1]-SoR.tempYArr1[count],2)+(1 / Math.pow(SoR.size,2)));
        //         // temporary += parseFloat(tempY.toFixed(6));
        //         // xVal = xVal + (1 / SoR.size);
        //         if (i > 0) {
        //           if (!isFinite(tempY)) {
        //             //integralValue = "diverges";
        //             break;
        //           } else if (Math.abs((tempY - prevYVal) / (1 / SoR.size)) >= 999999) {
        //             integralValue = "diverges";
        //             break;
        //           } else {
        //             temporary += parseFloat(tempY.toFixed(6));
        //           }
        //         } else {
        //           if (isFinite(tempY) && !isNaN(tempY)) {
        //             temporary += parseFloat(tempY.toFixed(6));
        //           }
        //         }
        //         xVal = xVal + (1 / SoR.size);
        //         prevYVal = tempY;
        //         count++;
        //       }
        //     }
        //console.log(integralValue + "    " + temporary);
        if (integralValue != "diverges") {
            //integralValue = (integralValue + temporary) / 2;
            integralValue = parseFloat(integralValue.toFixed(3));
        }
        MathJax.Hub.Queue(function() {
            if (integralValue != "diverges") {
                $('#surfaceArea').empty().append("Surface Area: `int_(" + a + ")^(" + b + ")" + equationToEval + "* sqrt(1+((dy)/(dx))^2) dx approx " + integralValue + "`");
            } else {
                $('#surfaceArea').empty().append("Surface Area: " + integralValue);
            }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    },

    //   changeInputs: function() {
    //     parametric = document.getElementById('parametric').checked;
    //     console.log(parametric)
    //     if (parametric) {
    //       document.getElementById("eqLab1").style.display = 'inline';
    //       document.getElementById("eqLab").style.display = 'none';
    //     } else {
    //       document.getElementById("eqLab1").style.display = 'none';
    //       document.getElementById("eqLab").style.display = 'inline';
    //     }
    //   },

    RenderEquations: function(e) {
        equationToEval = document.getElementById('equation').value;
        MathJax.Hub.Queue(["Text", MathJax.Hub.getAllJax(document.getElementById('equationFormatShown'))[0], 'f(x)=' + equationToEval]);
    },

    drawGraph: function() {
        SoR.storeYVals();
        z1 = [];
        y1 = [];
        x1 = [];
        //     parametric = document.getElementById('parametric').checked;
        //     if (!parametric) {
        //       equation = document.getElementById('equation').value;
        //       minX = parseFloat(document.getElementById("minX").value);
        //       maxX = parseFloat(document.getElementById("maxX").value);
        //       minY = parseFloat(document.getElementById("minY").value);
        //       maxY = parseFloat(document.getElementById("maxY").value);
        //       minZ = parseFloat(document.getElementById("minZ").value);
        //       maxZ = parseFloat(document.getElementById("maxZ").value);
        //       iterate = parseFloat(document.getElementById("iterate").value);
        //       for (y = minY; y <= maxY; y += iterate) {
        //         tempz = [];
        //         tempy = [];
        //         tempx = [];
        //         for (x = minX; x <= maxX; x += iterate) {
        //           z = parseFloat(parseFloat(math.eval(((equation).replace(new RegExp("x", 'g'), "(" + x + ")").replace(new RegExp("y", 'g'), "(" + y + ")")))).toFixed(3));
        //           if ((z <= maxZ) && (z >= minZ)) {
        //             tempx.push(x);
        //             tempy.push(y);
        //             tempz.push(eval(equation));
        //           } else {
        //             tempx.push(null);
        //             tempy.push(null);
        //             tempz.push(null);
        //           }
        //         }
        //         //dumb = false;
        //         x1.push(tempx);
        //         y1.push(tempy);
        //         z1.push(tempz);
        //       }
        //     } else {
        console.log("dumb");
        equationx = "cos(_p_)*" + document.getElementById('equation').value;
        equationx = equationx.replace(new RegExp("x", 'g'), "_t_");
        equationy = "_t_";
        //equationy = equationy.replace(new RegExp("x", 'g'), "_t_");
        equationz = "sin(_p_)*" + document.getElementById('equation').value;
        equationz = equationz.replace(new RegExp("x", 'g'), "_t_");
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
                //temptempz = parseFloat(parseFloat(math.eval(((equationz).replace(new RegExp("_p_", 'g'), "(" + p + ")").replace(new RegExp("_t_", 'g'), "(" + t + ")")))).toFixed(2));
                // if (temptempz <= maxZ || temptempz >= minZ) {
                    //if ((z <= maxZ) && (z >= minZ)) {
                    xtemp = math.eval(((equationx).replace(new RegExp("_p_", 'g'), "(" + p + ")").replace(new RegExp("_t_", 'g'), "(" + t + ")")));
                    //ytemp = math.eval(((equationy).replace(new RegExp("_p_", 'g'), "(" + p + ")").replace(new RegExp("_t_", 'g'), "(" + t + ")")));
                    ytemp = t;
                    ztemp = math.eval(((equationz).replace(new RegExp("_p_", 'g'), "(" + p + ")").replace(new RegExp("_t_", 'g'), "(" + t + ")")));
                    //console.log(xtemp + '   ' + ytemp + '   ' + ztemp);
                if(!isNaN(xtemp) && !isNaN(ytemp) && !isNaN(ztemp) && (ztemp <= maxZ || ztemp >= minZ) ){
                  tempx.push(parseFloat(xtemp).toFixed(2));
                  tempy.push(parseFloat(ytemp).toFixed(2));
                  tempz.push(parseFloat(ztemp).toFixed(2));
                // }
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
            //}
        }
        op = document.getElementById('opacity').value;
        lowCol = document.getElementById('lowCol').value;
        midCol = document.getElementById('midCol').value;
        maxCol = document.getElementById('maxCol').value;
        //console.log(lowCol);
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
        SoR.integral();
        SoR.surfaceArea();
    }
}
