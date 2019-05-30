// var dragging = false; // Is the object being dragged?
// var rollover = false; // Is the mouse over the ellipse?

// var x, y, w, h; // Location and size
// var offsetX, offsetY; // Mouseclick offset
// let steinhausTriangle = [];
// let radius, margin;
// let trueSign = '+';
// let falseSign = '-';
// let isSteinhausTriangleCorrect = false;
// let isSteinhausTriangleBalanced = false;
var snapPointMain = [];
var snapPointSide = [];
var direction = {
    0:{ L:undefined,R:1,D:undefined,U:undefined },
    1:{ L:0,R:2,D:9,U:undefined },
    2:{ L:1,R:3,D:undefined,U:undefined },
    3:{ L:2,R:4,D:undefined,U:undefined },
    4:{ L:3,R:5,D:undefined,U:undefined },
    5:{ L:4,R:6,D:undefined,U:undefined },
    6:{ L:5,R:7,D:undefined,U:undefined },
    7:{ L:6,R:8,D:15,U:undefined},
    8:{ L:7,R:undefined,D:undefined,U:undefined },
    9:{ L:undefined,R:10,D:undefined,U:1 },
    10:{ L:9,R:11,D:undefined,U:undefined },
    11:{ L:10,R:12,D:undefined,U:undefined },
    12:{ L:11,R:13,D:undefined,U:undefined },
    13:{ L:12,R:14,D:undefined,U:undefined },
    14:{ L:13,R:15,D:undefined,U:undefined },
    15:{ L:14,R:undefined,D:undefined,U:7 }

}
let img;
function preload(){
    // img = loadImage("./train.png");

}
function setup() {
    createCanvas(windowWidth, windowHeight);

    totalWidth = width*3/5;
    // increment
    increment = totalWidth/8;
    starting = width/5;
    width*3/5;

    for(let i = 0 ; i < 9; i++){
        snapPointMain.push(new SnapPoint(starting,height/2-40));
        if (i != 0 && i != 8){

            snapPointSide.push(new SnapPoint(starting,height/2+40));
        }
        starting+=increment;
    }
    starting = width/5;
    for(let i = 1 ; i< 9 ;i++){
    btnArray.push( new GameObject(starting-15,height/2-40-15,30,30,i,false,false,(dat)=>{console.log(dat)},snapPointMain[i-1]));
        starting += increment;
    }
    btnArray.push( new GameObject(width/2-15,height/2+40-15,30,30,"e",false,false,(dat)=>{console.log(dat)},snapPointSide[3]));
    // image(img, 0, 0);
    // for(let i = 0; i < btnArray.length ; i++){
    //     // if (btnArray[i].holding){
    //         btnArray[i].endHeld();
    //     // }
    // }

    
    // // Starting location
    // x = 100;
    // y = 100;
    // // Dimensions
    // w = 75;
    // h = 50;
    // steinhausTriangle = [
    //     [{
    //         sign: true,
    //         x: 0,
    //         y: 0,
    //         currentStable : true,
    //         globalStable : true,
    //     }, {
    //         sign: false,
    //         x: 0,
    //         y: 0,
    //         currentStable : true,
    //         globalStable : true,
    //     }, {
    //         sign: true,
    //         x: 0,
    //         y: 0,
    //         currentStable : true,
    //         globalStable : true,
    //     }],
    //     [{
    //         sign: false,
    //         x: 0,
    //         y: 0,
    //         currentStable : true,
    //         globalStable : true,
    //     }, {
    //         sign: false,
    //         x: 0,
    //         y: 0,
    //         currentStable : true,
    //         globalStable : true,
    //     }],
    //     [{
    //         sign: true,
    //         x: 0,
    //         y: 0,
    //         currentStable : true,
    //         globalStable : true,
    //     }]
    // ]
    // radius = 20;
    // margin = 5;
    // calculateSteinhausTrianglePosition();
    // isSteinhausTriangleCorrect =isThisSteinhausTriangle();
    // isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();
    textFont("Courier New");
    textSize(32);
}


// function calculateSteinhausTrianglePosition() {

//     // steinhausTriangle drawing
//     for (let i = 0; i < steinhausTriangle.length; i++) {
//         for (let j = 0; j < steinhausTriangle[i].length; j++) {
//             steinhausTriangle[i][j].x = j * (2 * radius + margin) + radius + (i) * ((margin / 4) + radius);
//             steinhausTriangle[i][j].y = i * (2 * radius + margin) + radius;
//         }
//     }
// }

let x_offset,y_offset;

function draw() {
    x_offset = width / 2 
    // - (steinhausTriangle[0]?steinhausTriangle[0].length:0) * (radius + margin / 2) - margin;
    y_offset = height / 2 
    // - steinhausTriangle.length * (radius + margin / 2) - margin;
    background(255);

    // drawBackground();

    
    // image(img, x_offset-width*0.35  ,y_offset-height*0.15+5,width*0.7,height*0.3);

    strokeWeight(10);

    line(width/5-40,height/2,width/4-30,height/2);
    line(width/4+80,height/2,width*3/4-80,height/2);
    line(width/5-40,height/2-80,width*4/5+40,height/2-80);
    line(width*3/4 +30,height/2,width*4/5+40,height/2);
    stroke("black");
    fill(255);

    rect(width/4-30, height/2, width*2/4+60,80, 0, 0, 20, 20);
    strokeWeight(0);
    fill("white");
    rect(width/4-25, height/2-10, 100,20);
    rect(width*3/4-75, height/2-10, 100,20);
    strokeWeight(1 );
    textSize(15);
    for(let sp of snapPointMain){
        sp.draw();
    }

    for(let sp of snapPointSide){
        sp.draw();
    }

    for(let btn of btnArray){
        btn.draw();
    }

    

    // textSize(15);
    // text("steinhaus triangle : "+ isSteinhausTriangleCorrect,10,20);
    // if (isSteinhausTriangleCorrect){
    //     text("steinhaus triangle balanced : "+ isSteinhausTriangleBalanced,10,40);
    // }
    drawUI();


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

function drawBackground() {  
    // textSize(32);
    // for (let i = 0; i < steinhausTriangle.length; i++) {
    //     for (let j = 0; j < steinhausTriangle[i].length; j++) {
    //         fill(steinhausTriangle[i][j].sign ?'#61E8E1':'#F2E863');

    //         if (!steinhausTriangle[i][j].currentStable){
    //             strokeWeight(2);

    //             stroke('red');
    //         }else{
    //             strokeWeight(1);

    //             stroke(0);
    //         }
    //         circle(steinhausTriangle[i][j].x + x_offset, steinhausTriangle[i][j].y + y_offset, radius);
    //         fill(0);
    //         text(steinhausTriangle[i][j].sign ? trueSign : falseSign, steinhausTriangle[i][j].x - radius / 2 + x_offset, steinhausTriangle[i][j].y + radius / 2 + y_offset);
    //     }
    // }
    // strokeWeight(1);
    // stroke(0);
}

var noOfMoves=0
function drawUI() {
    textSize(25);
    textAlign(CENTER);
    text("number of moves: "+noOfMoves,width/2, 80);
    text("number of moves left: "+(26-noOfMoves),width/2, 160);
    
    // fill(within(10,height-60,20,20,mouseX,mouseY)?220:255);
    // rect(10,height-60,20,20);
    // fill(within(35,height-60,20,20,mouseX,mouseY)?220:255);
    // rect(35,height-60,20,20);
    fill(0);
    // text(trueSign,16, height-45);
    // if (steinhausTriangle.length == 0){
    //     fill(120);
    // }
    // text(falseSign,41, height-45);

}
class GameObject{
    constructor(x,y,w,h,textTD,stickBottom,stickRight,ifClicked,bindTo){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = textTD;
        this.stickBottom = stickBottom;
        this.stickRight = stickRight;
        this.ifClicked = ()=>{
            ifClicked(this);
        };
        this.bindTo = bindTo;
        this.bindTo.bind(this);
    }
    draw(){
        let posx = this.x; 
        let posy = this.y; 
        if (this.stickRight){
            posx = width - posx;
        }
        if (this.stickBottom){
            posy = height-posy;
        }
        if (within(posx,posy,this.w,this.h,mouseX,mouseY)){
            fill(150);
        }else{
            fill(210);
        }
        rect(posx,posy,this.w,this.h);
        fill(0);
        textAlign(CENTER);
        text( this.text,posx +this.w/2  ,posy+this.h/1.5);

    }
    startToHeld(){
        this.hold = true;
    }
    endHeld(){

        

        let finalSP;
        let minlen = 10000;
        let index=0;
        for(let sp of snapPointMain){
            var len = sp.l2(this);
            if (len < minlen ){
                // console.log(len); 
                minlen = len;
                finalSP = sp;
            }
        }

        for(let sp of snapPointSide){
            var len = sp.l2(this);
            if (len < minlen ){
                minlen = len;
                finalSP = sp;
            }
        }

        console.log("index:"+ index);
        let walked = [];
        for (let i = 0 ; i < 16 ; i++){
            walked.push([false,false,false,false]);
        }
        let initialIdx = SPToCode(this.bindTo);
        let finalIdx = SPToCode(finalSP);
        let res = allowToGo(initialIdx,finalIdx,walked );
        console.log(res);
        console.log(SPToCode(finalSP));
        if (!finalSP.bindedOn && res){
            if (initialIdx >8 && finalIdx<9){
                noOfMoves++;
            }else if (initialIdx<9&&finalIdx>8){
                noOfMoves++;
            }


            console.log(finalSP.bindedOn);
            finalSP.bind(this);
            // if (this.bindTo){
                this.bindTo.debind();
            // }
            this.bindTo = finalSP;

            this.x = finalSP.x-this.w/2;
            this.y = finalSP.y-this.h/2;
        }else{
            // if (this.bindTo){
                this.x = this.bindTo.x - this.w/2;
                this.y = this.bindTo.y - this.h/2;
            // }
        }
        



        this.hold = false;
    }
    get  holding(){
        return this.hold;
    }
    held(){
            this.x = mouseX-this.w/2;
            this.y = mouseY-this.h/2;
        
    }
    within(){
        return within(this.x,this.y,this.w,this.h,mouseX,mouseY);
    }
    get bindedOn(){
        return this.bindTo;
    }
}
function codeToSP(code){
    if (code > 8){
        return snapPointSide[code-9];
    }else{
        return snapPointMain[code];
    }
}

function SPToCode(SP){
    for (let i = 0 ;i  <snapPointMain.length ; i++){
        if (snapPointMain[i] == SP){
            return i;
        }
    }
    for (let i = 0 ;i  <snapPointSide.length ; i++){
        if (snapPointSide[i] == SP){
            return i+9;
        }
    }
}

function allowToGo(startCode,destCode,walked){
    // not allow to move if it is in between two box
    // not allow to move
    console.log(startCode);
    console.log(destCode);
    console.log(walked)
    if (startCode == destCode){
        return true;
    }
    
    let res = false;
    console.log(direction[startCode]);
    if (direction[startCode].L != undefined && codeToSP(direction[startCode].L).bindedOn == undefined && !walked[startCode][0]){
        walked[startCode][0]=true;
        res = res || allowToGo(direction[startCode].L,destCode,walked);
    }

    if (!res && direction[startCode].R != undefined && codeToSP(direction[startCode].R).bindedOn == undefined&&!walked[startCode][1]){
        walked[startCode][1]=true;
        res = res || allowToGo(direction[startCode].R,destCode,walked);
    }

    if (!res && direction[startCode].D != undefined && codeToSP(direction[startCode].D).bindedOn == undefined&& !walked[startCode][2]){
        walked[startCode][2]=true;
        res = res || allowToGo(direction[startCode].D,destCode,walked);
    }

    if (!res && direction[startCode].U != undefined && codeToSP(direction[startCode].U).bindedOn == undefined&& !walked[startCode][3]){
        walked[startCode][3]=true;
        res = res || allowToGo(direction[startCode].U,destCode,walked);
    }
    console.log(res);
    return res;
}

class SnapPoint{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }


    draw(){
        fill(240);
        ellipse(this.x, this.y, 10, 10);
    }

    l2(btn){
        let btnx = btn.x+btn.w/2;
        let btny = btn.y+btn.h/2;
        return Math.sqrt((btnx-this.x)*(btnx-this.x) + (btny- this.y)*(btny - this.y)); 
    }
    bind(btn){
        this.binded = btn;
    }
    get bindedOn(){
        return this.binded;
    }

    debind(){
        this.binded =undefined;
    }

}



function within(x,y,w,h,i,j){
    return x < i && x + w > i && y < j && y + h > j ;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function mouseDragged(){
    for(let btn of btnArray){
        if (btn.holding){
            btn.held();
        }
    }
}

function mousePressed() {

    // btn.ifClicked();
    for (let btn of btnArray){
        if (btn.within()){
            btn.startToHeld();
            break;
        }
    }



    // for2: {
    //     for (let row of steinhausTriangle) {
    //         for (let node of row) {
    //             // predetection
    //             if (node.x + radius + x_offset > mouseX && node.x + x_offset - radius < mouseX && node.y +y_offset + radius > mouseY && node.y+y_offset - radius < mouseY) {
    //                 node.sign = !node.sign;
    //                 break for2;
    //             }
    //         }
    //     }
    // }
    // isSteinhausTriangleCorrect = isThisSteinhausTriangle();
    // isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();

    // // Did I click on the rectangle?
    // if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    //     dragging = true;
    //     // If so, keep track of relative location of click to corner of rectangle
    //     offsetX = x - mouseX;
    //     offsetY = y - mouseY;
    // }
}

var btnArray = [];

function mouseReleased() {
//    btnArray[3].endHeld;
//    let btn;
    for(let i = 0; i < btnArray.length ; i++){
        if (btnArray[i].holding){
            btnArray[i].endHeld();
        }
    }

    // if (within(10,height-60,20,20,mouseX,mouseY)){
        
    //     let newRow = [];
    //         for (let i = 0 ; i < steinhausTriangle.length + 1 ; i++){
    //             newRow.push({
    //                 sign : true,
    //                 x:0,
    //                 y:0,
    //                 currentStable : true,
    //                 globalStable:true
    //             })
    //         }
    //     steinhausTriangle.unshift(newRow);
    //     calculateSteinhausTrianglePosition();
    //     isSteinhausTriangleCorrect = isThisSteinhausTriangle();
    //     isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();
    // }else if (within(35,height-60,20,20,mouseX,mouseY)){
        
    //     steinhausTriangle.shift();
    //     calculateSteinhausTrianglePosition();

    //     isSteinhausTriangleBalanced = isThisSteinhausTriangleBalanced();

    // }

}

















function isThisSteinhausTriangleBalanced() {
    let netTF = 0;
    for (let row of steinhausTriangle){
        for (let node of row){
            netTF += node.sign ? 1 : -1;
        }
    }
    return netTF == 0;
}




function isThisSteinhausTriangle() {
    steinhausTriangle.reverse();
    let res = isSteinhausTriangle(steinhausTriangle, 0, 0);
    steinhausTriangle.reverse();
    return res;
}

/*
triangleList :
[
    "+",
    "-+"
]
*/
function isSteinhausTriangle(triangleList, row, column) {
    if (triangleList.length - 1 <= row) {
        triangleList.currentStable = true;
        return triangleList.globalStable = true;
    } else {
        if (triangleList[row][column].sign) {
            triangleList[row][column].currentStable = triangleList[row + 1][column].sign == triangleList[row + 1][column + 1].sign;
        } else {
            triangleList[row][column].currentStable = triangleList[row + 1][column].sign != triangleList[row + 1][column + 1].sign;
        }
        let result1 = isSteinhausTriangle(triangleList, row + 1, column);
        let result2 = isSteinhausTriangle(triangleList, row + 1, column + 1)
        return triangleList[row][column].globalStable = triangleList[row][column].currentStable &&  result1&& result2;
    }
}