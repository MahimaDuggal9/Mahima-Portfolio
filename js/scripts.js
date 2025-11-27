// Initialize AOS
AOS.init({
  duration: 700,
  once: true,
  easing: 'ease-in-out'
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- BACKGROUND SLIDESHOW ----------
const bg = document.getElementById('bg-slideshow');
// Replace these URLs with your own images if you like
const images = [
  'https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f6d8b6b5a2f5c96c6d7d6bba9c1b6b3',
  'https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=b6b2a2bf7e1f0c3cfd2829c6c6f9f2d6',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=5d5b5a7d7f1f6f7d2b8b8a6f5c7c7f6e',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=a6a9b5f7a8c5b6c1d3d6a9b7d8a6c6b3'
];

let idx = 0;
function setBg(i){
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url('${images[i]}')`;
    bg.style.opacity = 1;
  }, 450);
}
setBg(0);
setInterval(() => {
  idx = (idx + 1) % images.length;
  setBg(idx);
}, 6000);

// ---------- TYPING EFFECT FOR JOB TITLES ----------
const titles = [
  "Software Developer",
  "Java Expert",
  "Spring Boot",
  "Robotic Process Automation",
  "Power Automate / Power Apps"
];

const typedEl = document.getElementById('typed');
const cursorEl = document.querySelector('.cursor');
let tIndex = 0, cIndex = 0, deleting = false;

function typeLoop(){
  const current = titles[tIndex];
  if(!deleting){
    // type forward
    typedEl.textContent = current.slice(0, cIndex + 1);
    cIndex++;
    if(cIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1200); // pause at full word
      return;
    }
    setTimeout(typeLoop, 80 + Math.random()*60);
  } else {
    // delete
    typedEl.textContent = current.slice(0, cIndex - 1);
    cIndex--;
    if(cIndex === 0){
      deleting = false;
      tIndex = (tIndex + 1) % titles.length;
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 40 + Math.random()*30);
  }
}
typeLoop();

// Blink cursor handled via CSS keyframe; add small JS fallback
setInterval(()=> {
  if(cursorEl) cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
}, 530);

// ---------- CONTACT FORM (mock) ----------
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  const msgEl = document.getElementById('formMsg');

  if(!name || !email || !message){
    msgEl.textContent = 'Please fill required fields.';
    return;
  }

  // If you have a backend endpoint, replace this with a fetch() call to your /contact route.
  // For now we mock success:
  msgEl.textContent = 'Sending message...';
  setTimeout(()=> {
    msgEl.textContent = 'Thanks! Your message has been sent (mock). I will get back to you soon.';
    form.reset();
  }, 900);
}

