// gallery.js — lightbox and filters
document.addEventListener('DOMContentLoaded', ()=>{
  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if(lightbox){
    const img = lightbox.querySelector('img');
    const close = lightbox.querySelector('.lightbox-close');
    const items = Array.from(document.querySelectorAll('.gallery-item a'));

    const openAt = (index)=>{
      const a = items[index];
      if(!a) return;
      img.src = a.getAttribute('href');
      img.alt = a.querySelector('img')?.alt || 'Gallery image';
      lightbox.dataset.index = index;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      close.focus();
    };

    items.forEach((a, i)=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        openAt(i);
      });
    });

    const closeLightbox = ()=>{
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      img.src = '';
      delete lightbox.dataset.index;
    };

    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });

    // keyboard navigation: Esc to close, ArrowLeft/ArrowRight to navigate
    document.addEventListener('keydown', (e)=>{
      if(!lightbox.classList.contains('open')) return;
      const idx = parseInt(lightbox.dataset.index || '0', 10);
      if(e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
      else if(e.key === 'ArrowRight') { e.preventDefault(); openAt(Math.min(items.length-1, idx+1)); }
      else if(e.key === 'ArrowLeft') { e.preventDefault(); openAt(Math.max(0, idx-1)); }
    });
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
