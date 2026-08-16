// booking.js — simple Google Forms integration helper
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('form[data-form-url]').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const url = form.dataset.formUrl;
      if(!url){ alert('Please set data-form-url on the form to your Google Form response URL.'); return; }

      // Create a classic POST form to open in a new tab — this avoids CORS for simple form posts.
      const submitForm = document.createElement('form');
      submitForm.method = form.method || 'POST';
      submitForm.action = url;
      submitForm.target = '_blank';

      // copy inputs
      const fm = new FormData(form);
      for(const [k,v] of fm.entries()){
        const input = document.createElement('input'); input.type='hidden'; input.name=k; input.value=v; submitForm.appendChild(input);
      }
      // append and submit
      document.body.appendChild(submitForm);
      submitForm.submit();
      submitForm.remove();

      // Basic UX feedback
      const btn = form.querySelector('button[type="submit"],button'); if(btn) btn.disabled = true; setTimeout(()=>{ if(btn) btn.disabled=false },2000);
    });
  });
});
