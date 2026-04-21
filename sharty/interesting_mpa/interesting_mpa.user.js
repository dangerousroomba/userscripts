// ==UserScript==
// @name        Interesting MPA
// @namespace   Violentmonkey Scripts
// @match       https://soyjak.st/*
// @grant       none
// @version     1.0
// @author      dangerousroomba
// @description randomize the 'media pending approval' image on soyjak party
// @downloadURL https://github.com/dangerousroomba/userscripts/raw/refs/heads/master/sharty/interesting_mpa/interesting_mpa.user.js
// ==/UserScript==

// okay tough guy you want to be different alright
// here's how you add your own shit smartass
// you're either gonna
// 1. upload your shit on some filehost
// 2. encode it as base64 and slam it in here
// option 2 is good in case filehosts suddenly kill themselves for whatever reason those fucks are shitting out nowadays, it'll make your js file MASSIVE so be careful with that
// then you're gonna wrap the url or base64 (it'll look like this base64(THE BASE 64 STRING YOU GOT) string in quotation marks (" " these things) then paste it to the bottom of this array and then add a , to the previous string in that
// P.S You can remove items with // (or just delete them from the list if you hate it that much)
// if you think this guide is stupid, it wasn't for you smartass
// each image should usually be around 140 pixels high, 50 pixels wide
const possibleImages = [
  "https://soyjak.st/static/approval/classic.png", // classic images, (/qa/, etc)
  "https://soyjak.st/static/approval/pol.png", // classic images, (/pol/)
  "https://soyjak.st/static/approval/default.png", // classic images, (/soy/)
  "https://raw.githubusercontent.com/dangerousroomba/userscripts/refs/heads/master/sharty/interesting_mpa/assets/foruse/soybooru_post_145551.png", // nuimages, Pulled from SoyBooru
  "https://raw.githubusercontent.com/dangerousroomba/userscripts/refs/heads/master/sharty/interesting_mpa/assets/foruse/soybooru_post_145552.png", // nuimages, Pulled from SoyBooru
  "https://raw.githubusercontent.com/dangerousroomba/userscripts/refs/heads/master/sharty/interesting_mpa/assets/foruse/soybooru_post_153306.png", // nuimages, Pulled from SoyBooru
  "https://raw.githubusercontent.com/dangerousroomba/userscripts/refs/heads/master/sharty/interesting_mpa/assets/foruse/soybooru_post_155096.png", // nuimages, Pulled from SoyBooru
  "https://raw.githubusercontent.com/dangerousroomba/userscripts/refs/heads/master/sharty/interesting_mpa/assets/foruse/soybooru_post_162015.gif", // nuimages, Pulled from SoyBooru
  "https://raw.githubusercontent.com/dangerousroomba/userscripts/refs/heads/master/sharty/interesting_mpa/assets/foruse/soybooru_post_91814_resized.png", // nuimages, Pulled from SoyBooru
];

let threadRegex = new RegExp("thread");
let isThread = threadRegex.test(window.location.href);

async function fetchAllUnapproved() {
  return document.querySelectorAll(".unapproved");
}

async function doStuff() {
  let elements = await fetchAllUnapproved();

  for (let i = 0; i < elements.length; i++) {
    elements[i].src =
      possibleImages[Math.floor(Math.random() * possibleImages.length)];
    elements[i].width = 140; // sanity check
  }
}

let observerSettings = {
  attributes: false,
  childList: true,
  subtree: false,
};

window.onload = function () {
  doStuff();
  if (isThread) {
    let postsDiv = document.querySelector(".thread");
    if (postsDiv) {
      // do you get the joke?
      const nophono = new MutationObserver(doStuff);
      nophono.observe(postsDiv, observerSettings);
      console.log("Nophono is watching...");
    }
  }
};
