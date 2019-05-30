// var dragging = false; // Is the object being dragged?
// var rollover = false; // Is the mouse over the ellipse?

// var x, y, w, h; // Location and size
// var offsetX, offsetY; // Mouseclick offset
let steinhausTriangle = [];
let steinhausTriangleCrucial = [
    [1],
    [],
    []
];

let radius, margin;
let trueSign = '+';
let falseSign = '-';
let isSteinhausTriangleCorrect = false;
let isSteinhausTriangleBalanced = false;
let showIfCurcial = false;
let steinhausTriangleRatio = 0;

function setup()
{
    createCanvas(windowWidth, windowHeight);

    // // Starting location
    // x = 100;
    // y = 100;
    // // Dimensions
    // w = 75;
    // h = 50;
    steinhausTriangle = [
        [{
            sign: true,
            x: 0,
            y: 0,
            currentStable: true,
            globalStable: true,
            crucial: true
        }, {
            sign: false,
            x: 0,
            y: 0,
            currentStable: true,
            globalStable: true,
            crucial: false
        }, {
            sign: true,
            x: 0,
            y: 0,
            currentStable: true,
            globalStable: true,
            crucial: false
        }],
        [{
            sign: false,
            x: 0,
            y: 0,
            currentStable: true,
            globalStable: true,
            crucial: false
        }, {
            sign: false,
            x: 0,
            y: 0,
            currentStable: true,
            globalStable: true,
            crucial: false
        }],
        [{
            sign: true,
            x: 0,
            y: 0,
            currentStable: true,
            globalStable: true,
            crucial: false
        }]
    ]
    radius = 20;
    margin = 5;
    decideIfCrucial();
    console.log(steinhausTriangleCrucial);
    calculateSteinhausTrianglePosition();
    isSteinhausTriangleCorrect = isThisSteinhausTriangle();
    isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();
    textFont("Courier New");
    textSize(32);
}



function calculateSteinhausTrianglePosition()
{

    // steinhausTriangle drawing
    for (let i = 0; i < steinhausTriangle.length; i++)
    {
        for (let j = 0; j < steinhausTriangle[i].length; j++)
        {
            steinhausTriangle[i][j].x = j * (2 * radius + margin) + radius + (i) * ((margin / 4) + radius);
            steinhausTriangle[i][j].y = i * (2 * radius + margin) + radius;
        }
    }
}

let x_offset, y_offset;

function draw()
{
    x_offset = width / 2 - (steinhausTriangle[0] ? steinhausTriangle[0].length : 0) * (radius + margin / 2) - margin;
    y_offset = height / 2 - steinhausTriangle.length * (radius + margin / 2) - margin;
    background(255);

    drawBackground();
    textSize(15);
    text("steinhaus triangle : " + isSteinhausTriangleCorrect, 10, 20);
    if (isSteinhausTriangleCorrect)
    {
        text("steinhaus triangle balanced : " + isSteinhausTriangleBalanced, 10, 40);
    }
    drawUI();
    text("steinhaus triangle ratio (P:N) : " + steinhausTriangleRatio, 10, 60);


    // // Is mouse over object
    // if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    //     rollover = true;
    // } else {
    //     rollover = false;
    // }

    // // Adjust location if being dragged
    // if (dragging) {
    //     x = mouseX + offsetX;
    //     y = mouseY + offsetY;
    // }

    // stroke(0);
    // // Different fill based on state
    // if (dragging) {
    //     fill(50);
    // } else if (rollover) {
    //     fill(100);
    // } else {
    //     fill(175, 200);
    // }
    // rect(x, y, w, h);


}

function drawBackground()
{
    textSize(32);
    for (let i = 0; i < steinhausTriangle.length; i++)
    {
        for (let j = 0; j < steinhausTriangle[i].length; j++)
        {
            fill(steinhausTriangle[i][j].sign ? '#61E8E1' : '#F2E863');
            if (within(steinhausTriangle[i][j].x + x_offset - radius, steinhausTriangle[i][j].y + y_offset - radius, radius * 2, radius * 2, mouseX, mouseY))
            {
                fill(steinhausTriangle[i][j].sign ? '#53c0bb' : '#d4cc5c');
            }
            if (!steinhausTriangle[i][j].currentStable)
            {
                strokeWeight(4);

                stroke('red');
            } else
            {
                strokeWeight(1);

                stroke(0);
            }
            circle(steinhausTriangle[i][j].x + x_offset, steinhausTriangle[i][j].y + y_offset, radius);

            if (showIfCurcial && steinhausTriangleCrucial[i].includes(j))
            {
                fill('red');
                circle(steinhausTriangle[i][j].x + x_offset, steinhausTriangle[i][j].y + y_offset - 20, radius / 3);
            }

            fill(0);
            text(steinhausTriangle[i][j].sign ? trueSign : falseSign, steinhausTriangle[i][j].x - radius / 2 + x_offset, steinhausTriangle[i][j].y + radius / 2 + y_offset);
        }
    }
    strokeWeight(1);
    stroke(0);
}


function drawUI()
{
    textSize(15);
    text("number of rows: " + steinhausTriangle.length, 10, height - 20);

    fill(within(10, height - 60, 20, 20, mouseX, mouseY) ? 220 : 255);
    rect(10, height - 60, 20, 20);
    fill(within(35, height - 60, 20, 20, mouseX, mouseY) && steinhausTriangle.length > 0 ? 220 : 255);
    rect(35, height - 60, 20, 20);

    if (showIfCurcial)
    {
        fill(within(60, height - 60, 180, 20, mouseX, mouseY) ? 'green' : 'lightgreen');
    } else
    {
        fill(within(60, height - 60, 180, 20, mouseX, mouseY) ? 220 : 255);
    }
    rect(60, height - 60, 180, 20);

    fill(0);
    text(trueSign, 16, height - 45);
    if (steinhausTriangle.length == 0)
    {
        fill(120);
    }
    text(falseSign, 41, height - 45);

    text("show deciding nodes", 66, height - 45);
}

function within(x, y, w, h, i, j)
{
    return x < i && x + w > i && y < j && y + h > j;
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}


function mousePressed()
{




    for2: {
        for (let row of steinhausTriangle)
        {
            for (let node of row)
            {
                // predetection
                if (node.x + radius + x_offset > mouseX && node.x + x_offset - radius < mouseX && node.y + y_offset + radius > mouseY && node.y + y_offset - radius < mouseY)
                {
                    node.sign = !node.sign;
                    break for2;
                }
            }
        }
    }
    isSteinhausTriangleCorrect = isThisSteinhausTriangle();
    isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();

    // // Did I click on the rectangle?
    // if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    //     dragging = true;
    //     // If so, keep track of relative location of click to corner of rectangle
    //     offsetX = x - mouseX;
    //     offsetY = y - mouseY;
    // }
}


function mouseReleased()
{

    if (within(10, height - 60, 20, 20, mouseX, mouseY))
    {

        let newRow = [];
        for (let i = 0; i < steinhausTriangle.length + 1; i++)
        {
            newRow.push({
                sign: true,
                x: 0,
                y: 0,
                currentStable: true,
                globalStable: true
            })
        }
        steinhausTriangle.unshift(newRow);
        decideIfCrucial();
        calculateSteinhausTrianglePosition();
        isSteinhausTriangleCorrect = isThisSteinhausTriangle();
        isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();

    } else if (within(35, height - 60, 20, 20, mouseX, mouseY))
    {

        steinhausTriangle.shift();
        decideIfCrucial();
        calculateSteinhausTrianglePosition();
        isSteinhausTriangleCorrect = isThisSteinhausTriangle();
        isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();


    } else if (within(60, height - 60, 180, 20, mouseX, mouseY))
    {
        showIfCurcial = !showIfCurcial;
    }

}

















function isThisSteinhausTriangleBalanced()
{
    let countOfP = 0;
    let countOfN = 0;
    for (let row of steinhausTriangle)
    {
        for (let node of row)
        {
            if (node.sign){
                countOfP ++;
            }else{
                countOfN ++;
            }
        }
    }
    steinhausTriangleRatio = countOfP/countOfN;
    return countOfP == countOfN;
}




function isThisSteinhausTriangle()
{
    steinhausTriangle = steinhausTriangle.reverse();
    console.log(JSON.stringify(steinhausTriangle))
    let res = isSteinhausTriangle(steinhausTriangle, 0, 0);
    steinhausTriangle = steinhausTriangle.reverse();
    return res;
}

/*
triangleList :
[
    "+",
    "-+"
]
*/
function isSteinhausTriangle(triangleList, row, column)
{
    // console.log({triangleList, row,column});
    // console.log(JSON.stringify(triangleList));
    if (triangleList.length -1 == row){
        console.log({row});
        for (let nodes of triangleList[row]){
            nodes.currentStable = true;
            nodes.globalStable = true;
            console.log("thisis called");
        }
        return true;
    }
    else if (triangleList.length - 1 <= row)
    {
        console.log("this should not be called");
        return true;
    } else
    {
        if (triangleList[row][column].sign)
        {
            triangleList[row][column].currentStable = triangleList[row + 1][column].sign == triangleList[row + 1][column + 1].sign;
        } else
        {
            triangleList[row][column].currentStable = triangleList[row + 1][column].sign != triangleList[row + 1][column + 1].sign;
        }
        let result1 = isSteinhausTriangle(triangleList, row + 1, column);
        let result2 = isSteinhausTriangle(triangleList, row + 1, column + 1)
        return triangleList[row][column].globalStable = triangleList[row][column].currentStable && result1 && result2;
    }
}

function decideIfCrucial()
{
    steinhausTriangleCrucial = [];
    for (let i = 0; i < steinhausTriangle.length; i++)
    {
        steinhausTriangleCrucial.push([]);
    }
    for (let i = 0; i < steinhausTriangleCrucial.length; i++)
    {
        if (i - 1 >= 0)
        {
            steinhausTriangleCrucial[i] = [];
            for (let j = 0; j < steinhausTriangleCrucial[i - 1].length; j++)
            {

                let search = steinhausTriangleCrucial[i].indexOf(steinhausTriangleCrucial[i - 1][j]);
                if (search == -1)
                {
                    steinhausTriangleCrucial[i].push(steinhausTriangleCrucial[i - 1][j]);
                } else
                {
                    steinhausTriangleCrucial[i].splice(search, 1);
                }

                search = steinhausTriangleCrucial[i].indexOf(steinhausTriangleCrucial[i - 1][j] + 1);
                if (search == -1)
                {
                    steinhausTriangleCrucial[i].push(steinhausTriangleCrucial[i - 1][j] + 1);
                } else
                {
                    steinhausTriangleCrucial[i].splice(search, 1);
                }
            }
        } else
        {
            steinhausTriangleCrucial[0] = [0];
        }
    }
    steinhausTriangleCrucial.reverse();

}
