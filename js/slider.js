// slider.js — initialize hero swiper and fallback behavior
document.addEventListener('DOMContentLoaded', ()=>{
  // Initialize hero swiper for fade slideshow
  try{
    const swiper = new Swiper('#heroSlider',{
      loop:true,autoplay:{delay:4500,disableOnInteraction:false},effect:'fade',fadeEffect:{crossFade:true}
    });
  }catch(e){/* no swiper available */}

  // If video missing or cannot play, hide video to show slider
  const video = document.getElementById('heroVideo');
  if(video){
    video.addEventListener('error', ()=>{
      video.style.display='none'; document.getElementById('heroSlider').style.display='block';
    });
    // if user prefers reduced motion, pause video
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mq && mq.matches){ video.pause(); }
  }
});
