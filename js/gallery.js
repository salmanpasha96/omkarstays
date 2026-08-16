// gallery.js — lightbox and filters
document.addEventListener('DOMContentLoaded', ()=>{
  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if(lightbox){
    const img = lightbox.querySelector('img');
    const close = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.gallery-item a').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault(); img.src = a.getAttribute('href'); lightbox.classList.add('open');
      });
    });
    close.addEventListener('click', ()=>lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });
  }

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#galleryGrid .gallery-item').forEach(item=>{
        if(filter==='*' || item.dataset.category===filter) item.style.display='block'; else item.style.display='none';
      });
    });
  });
});
