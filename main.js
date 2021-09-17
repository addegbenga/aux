// window.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => alert("HELLO"), 100);
// });

const main = document.getElementsByTagName("main");
gsap.set(".ball", { xPercent: -50, yPercent: -50 });

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });

gsap.registerPlugin(ScrollTrigger);
gsap.to("progress", {
  value: 100,
  ease: "none",
  scrollTrigger: { scrub: 0.3 },
});

var text = document.getElementById("text");

//var tl = new TimelineLite();
//tl.to(element, 1, {width:"50%"});

var tl = new TimelineMax({
  repeat: -1,
  yoyo: false,
  repeatDelay: 0,
  onComplete: timelineDone,
  onCompleteParams: ["test1", "test2"],
});

tl.to(text, 1.5, {
  text: {
    value: `master b42c5b5] changes 4 files changed, 62 insertions(+), 117
deletions(-) rewrite index.css.map (81%) [master (root-commit)
8446585] mobile 11 files changed, 1049 insertions(+) ☑️☑️`,
    padSpace: true,
    ease: Linear.easeNone,
  },
  delay: 10,
});
tl.to(text, 1.5, {
  text: {
    value: `files changed, 62 insertions(+), 117
    deletions(-) rewrite index.css.map (81%) [master (root-commit)
    8446585] mobile 11 files changed, 1049 insertions(+) ☑️☑️`,
    padSpace: true,
    ease: Linear.easeNone,
  },
  delay: 10,
});
tl.to(text, 1.5, {
  text: {
    value: `[master b42c5b5] changes 4 files changed, 62 insertions(+), 117
    deletions(-) rewrite index.css.map (81%) [master (root-commit)
    8446585] mobile 11 files changed, 1049 insertions(+) ☑️☑️`,
    padSpace: true,
    ease: Linear.easeNone,
  },
  delay: 10,
});
//kkk

function timelineDone(p1, p2) {
  console.log("timeline done. params: " + p1 + " and " + p2);
}
const bx = document.querySelectorAll(".bxs");

const timeline = gsap.timeline({
  repeat: -1,
  duration: 3,
  ease: "Power2.easeIn",
});

timeline
  .to(bx, {
    background: "linear-gradient(290deg, #2af598 0%, #009efd 100%)",
  })
  .to(bx, {
    background: "linear-gradient(290deg, #2af598 0%, #009efd 100%)",
  });

  function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.25, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
      hide(elem); // assure that the element is hidden when scrolled into view
      
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function() { animateFrom(elem) }, 
        onEnterBack: function() { animateFrom(elem, -1) },
        onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
      });
    });
  });
