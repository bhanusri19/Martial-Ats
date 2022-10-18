var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadimage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
}

let imagepath = (frameno, animation) => {
    return  "./"+animation+"/"+frameno + ".png";
}

let frames = {
    idle: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    backward: [1, 2, 3, 4, 5, 6],
    block: [1,2,3,4,5,6,7,8,9],
    forward: [1,2,3,4,5,6]
};

let loadImages = (callback) => {
    let images={idle: [], kick: [], punch: [], backward: [], block: [], forward: []};
    let imagestoload=0;
    ["idle", "kick", "punch", "backward", "block", "forward"].forEach((animation) => {
        let animationFrames=frames[animation];
        imagestoload=imagestoload+animationFrames.length;
        animationFrames.forEach((frameno) => {
            let path=imagepath(frameno, animation);
            loadimage(path, (image) => {
              images[animation][frameno-1]=image;
              imagestoload=imagestoload-1;

              if(imagestoload===0){
                callback(images);
              }
            });
        });
    });
}

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index*100);
    });
    setTimeout(callback, images[animation].length*100);
}

loadImages((images) => {
    let queuedanimation=[];

    let aux = () => {
        let selectedanimation;
        if(queuedanimation.length===0){
            selectedanimation="idle";
        } else {
            selectedanimation=queuedanimation.shift()
        }
        animate(ctx, images, selectedanimation, aux);
    };
    aux();

    document.getElementById('kick').onclick = () => {
        queuedanimation.push("kick");
    };

    document.getElementById('punch').onclick = () => {
        queuedanimation.push("punch");
    };

    document.getElementById('backward').onclick = () => {
        queuedanimation.push("backward");
    };

    document.getElementById('block').onclick = () => {
        queuedanimation.push("block");
    };

    document.getElementById('forward').onclick = () => {
        queuedanimation.push("forward");
    };

    document.addEventListener('keyup', (event) => {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        if(key==="ArrowLeft") {
            queuedanimation.push("kick");
        } 
        else if(key==="ArrowRight") {
            queuedanimation.push("punch");
        }
        else if(key==="ArrowDown") {
            queuedanimation.push("backward");
        }
        else if(key==="ArrowUp") {
            queuedanimation.push("forward");
        }
        else if(key===" ") {
            queuedanimation.push("block");
        }
    });
});