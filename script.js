const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

let w,h;

function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
}

resize();
window.addEventListener("resize",resize);


const particles=[];

const count=6000;


// Kalp matematiği
function heart(t){

    return {
        x:16*Math.pow(Math.sin(t),3),
        y:
        -(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t))
    };

}


// hedef noktalar

let targets=[];


for(let i=0;i<count;i++){

    let t=Math.random()*Math.PI*2;

    let p=heart(t);


    targets.push({

        x:w/2+p.x*15,
        y:h/2+p.y*15

    });

}



// parçacık oluştur

for(let i=0;i<count;i++){

particles.push({

    x:Math.random()*w,
    y:Math.random()*h,

    tx:targets[i].x,
    ty:targets[i].y,

    size:Math.random()*2+1,

    speed:Math.random()*0.04+0.02

});

}



// yıldızlar

const stars=[];

for(let i=0;i<150;i++){

stars.push({

x:Math.random()*w,
y:Math.random()*h,
s:Math.random()*2

});

}




let mouse={x:null,y:null};


window.addEventListener("mousemove",e=>{

mouse.x=e.clientX;
mouse.y=e.clientY;

});


window.addEventListener("touchmove",e=>{

mouse.x=e.touches[0].clientX;
mouse.y=e.touches[0].clientY;

});




function animate(){


ctx.fillStyle="rgba(0,0,0,0.25)";
ctx.fillRect(0,0,w,h);



// yıldız çiz

stars.forEach(s=>{

ctx.beginPath();

ctx.arc(
s.x,
s.y,
s.s,
0,
Math.PI*2
);

ctx.fillStyle="white";
ctx.fill();

});



// parçacıklar


particles.forEach(p=>{


let dx=p.tx-p.x;
let dy=p.ty-p.y;


p.x+=dx*p.speed;
p.y+=dy*p.speed;



// dokununca kaçma

if(mouse.x){

let mx=p.x-mouse.x;
let my=p.y-mouse.y;

let dist=Math.sqrt(mx*mx+my*my);


if(dist<100){

p.x+=mx/dist*8;
p.y+=my/dist*8;

}

}



ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);


ctx.fillStyle="#ff1744";

ctx.shadowColor="#ff1744";
ctx.shadowBlur=15;

ctx.fill();

ctx.shadowBlur=0;


});



requestAnimationFrame(animate);


}


animate();
