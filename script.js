function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loaderPageAnimation() {
  let loader = document.querySelector(".line1 > h3 > span");
  loaderCount = 0;

  let tl = gsap.timeline();

  tl.to("body", {
    overflowY: "hidden",
  });
  tl.from(".line h1", {
    opacity: 0,
    y: 100,
    stagger: 0.3,
  });
  tl.from(".line1 h3, .line3 h1 span, .loader-page h4", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    onStart: () => {
      const timer = setInterval(() => {
        loaderCount++;
        loader.textContent = loaderCount;
        if (loaderCount == 100) {
          clearInterval(timer);
        }
      }, 25);
    },
  });
  tl.to(".line, .loader-page h4", {
    opacity: 0,
    stagger: 0.07,
    delay: 2.9,
  });
  tl.to(".loader-page", {
    opacity: 0,
    duration: 0.1,
    delay: 0.1,
    display: "none",
  });
  tl.from(".page1", {
    y: 1600,
    // delay: 0.3,
  });
  tl.from("nav", {
    opacity: 0,
  });

  // page1

  tl.from(
    ".p1-line1 h1, .p1-line2 h1, .p1-line3 h2, .p1-line3 h3, .p1-line4 h1",
    {
      opacity: 0,
      y: 100,
      stagger: 0.1,
    }
  );
}

function cursorAnimation() {
  Shery.makeMagnet(".nav-right h4", {});
  Shery.makeMagnet(".nav-part1 .menuIcon", {});

  const customCursor = document.querySelector(".custom-cursor");
  document.addEventListener("mousemove", (dets) => {
    customCursor.style.left = `${dets.x}px`;
    customCursor.style.top = `${dets.y}px`;
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    config: {
      a: { value: 0.69, range: [0, 30] },
      b: { value: 0.88, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8518518518518519 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.18, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.61, range: [0, 10] },
      metaball: { value: 0.5, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 9.92, range: [0, 100] },
    },
    gooey: true,
  });
}

function flagAnimation() {
  const hoverOnElem = document.querySelectorAll(".p1-line3 h2");
  const flag = document.querySelector("#flag");

  hoverOnElem.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      flag.style.display = "block";
    });
  });
  hoverOnElem.forEach((e) => {
    e.addEventListener("mouseleave", () => {
      flag.style.display = "none";
    });
  });

  document.addEventListener("mousemove", (dets) => {
    flag.style.left = `${dets.x}px`;
    flag.style.top = `${dets.y}px`;
  });
}

function textillate() {
  $(".a1, .a2").textillate({
    autoStart: false,
    in: { effect: "fadeIn", delay: 40, sync: false },
    out: { effect: "fadeOut", delay: 40, sync: false },
  });

  $(".a1").show().textillate("in");

  $(".a1").mouseenter(function () {
    $(this).textillate("out");
    setTimeout(function () {
      $(".a1").hide();
      $(".a2").show().textillate("in");
    }, 70);
  });

  $(".a2").mouseleave(function () {
    $(this).textillate("out");
    setTimeout(function () {
      $(".a2").hide();
      $(".a1").show().textillate("in");
    }, 70);
  });
}

function videoPlayPauseBTN(){
  const videoContainer = document.querySelector('.video-container')
const videoCursor = document.querySelector('.video-cursor')
const video = document.querySelector('.video-container video')

let lastX = 0;

videoContainer.addEventListener('mouseenter',() =>{
  document.body.style.cursor = 'none'

  videoContainer.addEventListener('mousemove',(dets) =>{
    lastX = dets.x - 1250; 
    gsap.to('.video-cursor', {
      x: lastX,
      y: dets.y - 100,
      ease: "power2.out",
      duration: 0.2
    });
  })
})



videoContainer.addEventListener('wheel', (e) => {
  gsap.to('.video-cursor',{
    x: lastX,
    y: `+=${e.deltaY}`, 
    ease: "power2.out",
    duration: 0.5
  });
});

videoContainer.addEventListener('mouseleave',() =>{
  document.body.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgba(255,255,255,1)' stroke-width='1.2'%3E%3Ccircle cx='20' cy='20' r='19'/%3E%3C/svg%3E") 20 20, pointer`
  gsap.to('.video-cursor',{
    x: `-1rem`,
    y: `1%`
  })
})

let flag = 0
videoContainer.addEventListener('click',() =>{
  if(flag == 0){
    gsap.to('#bg',{
      opacity: 0
    })
    video.play()
    video.style.opacity = 1
    videoCursor.innerHTML = `<i class="ri-pause-large-fill"></i>`
    gsap.to('.video-cursor',{
      scale: 0.5
    })
    flag = 1
  }
  else if(flag == 1){
    gsap.to('#bg',{
      opacity: 1
    })
    video.pause()
    video.style.opacity = 0
    videoCursor.innerHTML = `<i class="ri-play-large-fill"></i>`
    gsap.to('.video-cursor',{
      scale: 1
    })
    flag = 0
  }
})
}

loaderPageAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
flagAnimation();
textillate();
videoPlayPauseBTN()





