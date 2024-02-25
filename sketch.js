let img,img2, pg,finalCanvas2,imageNumber = null,maskerOn,burnOn,lightOn,smallerDimension,myFunction = function() {};
const queryString = window.location.search;
let density = queryString.indexOf("density=1") > -1 ? 1 : queryString.indexOf("density=2") > -1 ? 2 :  queryString.indexOf("density=4") > -1 ? 4 :
    queryString.indexOf("density=5") > -1 ? 5 : queryString.indexOf("density=6") > -1 ? 6 : queryString.indexOf("density=7") > -1 ? 7 : 3;

function preload() {
    while(imageNumber == null) {
      imageNumber = hl.randomInt(1,55);
    }
    let imageFile = 'https://vafbn5mmhrddcmkbvt5nm3smwzoxihoqfskrhvva65zrupkibwpa.arweave.net/qAoW9Yw8RjExQaz61m5Mtl10HdAslRPWoPdzGj1IDZ4/Image-'+imageNumber+'.jpg';
    img = loadImage(imageFile);
}
let flippedX,flippedY;
let masker;
let random;
function setup() {
    noiseSeed(hl.randomInt(0,255));
    createCanvas(500, 500);
    pg = createGraphics(500, 500);
    masker = createGraphics(500, 500);
    finalCanvas2 = createGraphics(500, 500);
    img2 = createImage(1500, 1500);
    masker.pixelDensity(density);
    pg.pixelDensity(density);
    pixelDensity(density);
    finalCanvas2.pixelDensity(density/2);
    flippedX = hl.randomBool(.5);
    flippedY = hl.randomBool(.5);
    maskerOn = hl.randomBool(.3);
    burnOn = hl.randomBool(.2);
    if(!burnOn) {
        location.reload();
    }
    lightOn = hl.randomBool(.1);
    rotateOn = hl.randomBool(.1);
    if(burnOn && lightOn) {
      myFunction = function() {
        if(!setBurn() && !setLightest()) {
          setBlend();
        }
      }
    } else if(burnOn) {
      myFunction = function() {
        if(!setBurn()) {
          setBlend();
        }
      }
    } else if(lightOn) {
      myFunction = function() {
        if(!setLightest()) {
          setBlend();
        }
      }
    } else {
      myFunction = function() {
        setBlend();
      }
    }
    colorMode(HSB);
    setSizeAndShadow();
    let traits = { photo: imageNumber };
    hl.token.setTraits(traits);
    console.log(hl.tx.hash);
    // hl.token.setName(`Solar #${hl.tx.tokenId}`);
    // hl.token.setDescription(
    // `This is an token generated as part of an example project for using hl-gen.js. It has ${numberOfRectangles} rectangles with random colors. The colors have a saturation of ${randomSaturation} and a brightness of ${randomBrightness}. The timestamp of the mint was ${hl.tx.timestamp}. The minting wallet address was ${hl.tx.walletAddress}`
    // );
}

function setSizeAndShadow() {
    let e;
    smallerDimension = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    document.getElementsByTagName("canvas")[0].style.width = smallerDimension + "px";
    document.getElementsByTagName("canvas")[0].style.height = smallerDimension + "px";
    let a = document.getElementById("defaultCanvas0");
    void 0 !== a && null != a ? a.style.boxShadow = "0 0 1.5rem #252525" : 1==1;
}

function draw() {
    image(img, 0, 0, width, height);
    if(flippedX) {
        translate(width,0);
        scale(-1,1);
        finalCanvas2.translate(width,0);
        finalCanvas2.scale(-1,1);
    }
    if(flippedY) {
        translate(0,height);
        scale(1,-1);
        finalCanvas2.translate(width,0);
        finalCanvas2.scale(-1,1);
    }
    if(rotateOn) {
        translate(width/2,height/2);
        rotate(hl.randomElement([PI/3,-PI/3]));
        translate(-width/2,-height/2);
    }
    for (let i = 0; i < noise(100)*100; i++) {
        push();
        myFunction();
        masker.clear();
        let x = hl.random(0,width);
        let y = hl.random(0,height);
        let w = hl.random(10, 100)*5;
        let h = hl.random(10, 100)*5;

        masker.rect(x, y, w, h);

        img2.copy(img, 0, 0, img.width, img.height, 0, 0, img2.width, img2.height);

        let offsetX = floor(hl.random(-25, 26)) * 10; 
        let offsetY = floor(hl.random(-25, 26)) * 10;
        if(maskerOn) {
        img2.mask(masker);
        }
        image(img2, x + offsetX, y + offsetY, 500, 500);
        pop();
    }
    finalCanvas2.image(get(),0,0,finalCanvas2.width,finalCanvas2.height);
    hl.token.capturePreview();
    noLoop();
}

function keyPressed() {
    if (keyCode === 83) {
        save(hl.tx.hash + ".png");
    }
    if (keyCode === 68) {
        saveCanvas(finalCanvas2, hl.tx.hash + ".png");
    }
}

function setBurn() {
  if(hl.randomBool(.1)) {
    blendMode(BURN);
    return true;
  }
  return false;
}


function setLightest() {
  if(hl.randomBool(.1)) {
    blendMode(LIGHTEST);
    return true;
  }
  return false;
}

function setBlend() {
  blendMode(BLEND);
}

