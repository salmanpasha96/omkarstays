// main.js — page behaviors
document.addEventListener('DOMContentLoaded', ()=>{
  // Page loader
  const loader = document.getElementById('pageLoader');
  if(loader){setTimeout(()=>loader.classList.add('hidden'),800);loader.style.display='none'}

  // Year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // Navbar glass effect
  const nav = document.getElementById('mainNav');
  const toggleGlass = ()=>{
    if(window.scrollY>60) nav.classList.add('glass-nav'); else nav.classList.remove('glass-nav');
  };
  window.addEventListener('scroll', toggleGlass); toggleGlass();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href'); if(href.length>1){
        e.preventDefault(); document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Initialize AOS (if available)
  if(window.AOS) AOS.init({duration:800,once:true});
});
