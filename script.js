/* ------------------------------------------------
   Happy Five Months - Shraddha
   script.js
------------------------------------------------ */

const intro = document.getElementById("intro");
const button = document.getElementById("openLetter");
const letter = document.getElementById("letter");
const music = document.getElementById("bgMusic");
const petals = document.getElementById("petals");

/* -------------------------------
      Open Letter
--------------------------------*/

button.addEventListener("click", () => {

    music.volume = 0;

    music.play().catch(() => {});

    let volumeFade = setInterval(() => {

        if (music.volume < 0.95) {
            music.volume += 0.02;
        } else {
            clearInterval(volumeFade);
        }

    }, 120);

    intro.style.opacity = "0";
    intro.style.pointerEvents = "none";

    setTimeout(() => {
        intro.style.display = "none";
    }, 1200);

    letter.classList.remove("hidden");

    setTimeout(() => {
        letter.style.opacity = "1";
    }, 300);

});


/* -------------------------------
      Falling Petals
--------------------------------*/

function createPetal(){

    const petal = document.createElement("div");

    petal.className = "petal";

    const size = Math.random()*12 + 10;

    petal.style.width = size + "px";
    petal.style.height = size*1.3 + "px";

    petal.style.left = Math.random()*100 + "vw";

    petal.style.animationDuration =
        (8 + Math.random()*8) + "s";

    petal.style.opacity =
        0.35 + Math.random()*0.5;

    petal.style.background =
        [
            "#efb2c1",
            "#f4c2cf",
            "#ffd8e1",
            "#f6b7cb",
            "#f7cad6"
        ][Math.floor(Math.random()*5)];

    petal.style.transform =
        `rotate(${Math.random()*360}deg)`;

    petals.appendChild(petal);

    setTimeout(()=>{
        petal.remove();
    },17000);

}

setInterval(createPetal,300);


/* --------------------------------
        Scroll Fade
-------------------------------- */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".poem p").forEach(p=>{

    p.style.transition =
        "1.2s ease";

    observer.observe(p);

});


/* -------------------------------
      Floating Flowers
--------------------------------*/

document.querySelectorAll(".flower").forEach((flower,i)=>{

    flower.animate(

        [

            {
                transform:"translateY(0px) rotate(0deg)"
            },

            {
                transform:
                "translateY(-12px) rotate(3deg)"
            },

            {
                transform:
                "translateY(0px) rotate(0deg)"
            }

        ],

        {

            duration:7000 + i*1000,

            iterations:Infinity

        }

    );

});


/* --------------------------------
        Cursor Glow
-------------------------------- */

const glow = document.createElement("div");

glow.style.position="fixed";
glow.style.width="18px";
glow.style.height="18px";
glow.style.borderRadius="50%";
glow.style.pointerEvents="none";
glow.style.background="rgba(230,180,190,.35)";
glow.style.backdropFilter="blur(4px)";
glow.style.transition="transform .15s";
glow.style.zIndex="9999";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX-9+"px";
    glow.style.top=e.clientY-9+"px";

});


/* --------------------------------
      Title changes
-------------------------------- */

const titles = [

"Happy Five Months, Shraddha",

"My Queen of Dreams",

"My Pozholi",

"My Cookie",

"My Potito",

"My Baby"

];

let current = 0;

setInterval(()=>{

    current++;

    if(current>=titles.length)
        current=0;

    document.title=titles[current];

},3500);


/* --------------------------------
      Secret Message
-------------------------------- */
const secretOverlay = document.getElementById("secretOverlay");
const secretText = document.getElementById("secretText");
const closeSecret = document.getElementById("closeSecret");

const message = `Shraddha,

Sometimes I wonder whether our souls met long before we ever did.

Maybe that's why your smile felt familiar.

Maybe that's why your laughter sounded like something I had been missing for years.

Thank you for every memory.

For Chamiers.

For Hocco.

For sharing that Golden Nut Cake with me.

For every conversation that lasted longer than time.

For every moment you made ordinary feel unforgettable.

Happy Five Months.

I hope that years from now,
when we look back at today,

we'll smile and think,

"That was only the beginning."

I love you.

Forever.

— Sarvan`;

let typingIndex = 0;

let secretClicks = 0;

document.querySelector(".signature").addEventListener("click",()=>{

secretClicks++;

if(secretClicks!==5)return;

secretOverlay.classList.add("show");

secretText.textContent="";

typingIndex=0;

typeLetter();

});

function typeLetter(){

if(typingIndex>=message.length)return;

secretText.textContent+=message.charAt(typingIndex);

typingIndex++;

setTimeout(typeLetter,28);

}

closeSecret.onclick=()=>{

secretOverlay.classList.remove("show");

};
/* ==========================
      Floating Hearts
========================== */

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const hearts = [];

function random(min,max){
    return Math.random()*(max-min)+min;
}

function createHeart(){

    hearts.push({

        x: random(0,canvas.width),

        y: canvas.height + 30,

        size: random(8,18),

        speed: random(0.4,1.1),

        drift: random(-0.5,0.5),

        alpha: random(.2,.6),

        angle: random(0,Math.PI*2)

    });

}

function drawHeart(x,y,s){

    ctx.beginPath();

    ctx.moveTo(x,y);

    ctx.bezierCurveTo(
        x,
        y-s/2,
        x-s,
        y-s/2,
        x-s,
        y
    );

    ctx.bezierCurveTo(
        x-s,
        y+s/2,
        x,
        y+s,
        x,
        y+s*1.4
    );

    ctx.bezierCurveTo(
        x,
        y+s,
        x+s,
        y+s/2,
        x+s,
        y
    );

    ctx.bezierCurveTo(
        x+s,
        y-s/2,
        x,
        y-s/2,
        x,
        y
    );

    ctx.fill();

}

function animateHearts(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    hearts.forEach((h,i)=>{

        h.y-=h.speed;

        h.x+=Math.sin(h.angle)*h.drift;

        h.angle+=0.01;

        ctx.save();

        ctx.globalAlpha=h.alpha;

        ctx.fillStyle="#d98aa1";

        drawHeart(h.x,h.y,h.size);

        ctx.restore();

        if(h.y<-50){

            hearts.splice(i,1);

        }

    });

    requestAnimationFrame(animateHearts);

}

animateHearts();

setInterval(createHeart,500);
const start = new Date("2026-02-14T00:00:00");

function updateDays(){

    const now = new Date();

    const diff = now - start;

    const days = Math.floor(diff/(1000*60*60*24));

    document.getElementById("daysTogether").textContent =
        `${days} days of loving you`;
}

updateDays();