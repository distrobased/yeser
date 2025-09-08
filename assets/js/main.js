// Main JS for POG site: fade-ins, accessibility toggles, form handling, maintenance redirect
document.addEventListener('DOMContentLoaded', () => {
  // fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => { el.classList.remove('opacity-0'); el.classList.add('fade'); });
  // accessibility toggle
  const accToggle = document.getElementById('access-toggle');
  const sizeToggle = document.getElementById('size-toggle');
  const html = document.documentElement;
  try {
    const saved = localStorage.getItem('pog_access_mode');
    if(saved === 'high-contrast') html.classList.add('high-contrast');
    const savedSize = localStorage.getItem('pog_text_size');
    if(savedSize === 'large') html.classList.add('large-text');
  } catch(e){}
  if(accToggle) accToggle.addEventListener('click', () => {
    html.classList.toggle('high-contrast');
    try { if(html.classList.contains('high-contrast')) localStorage.setItem('pog_access_mode','high-contrast'); else localStorage.removeItem('pog_access_mode'); } catch(e) {}
  });
  if(sizeToggle) sizeToggle.addEventListener('click', () => {
    html.classList.toggle('large-text');
    try { if(html.classList.contains('large-text')) localStorage.setItem('pog_text_size','large'); else localStorage.removeItem('pog_text_size'); } catch(e) {}
  });
  // contact form async (Formspree)
  const form = document.querySelector('form[data-async="formspree"]');
  if(form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const url = form.action;
      fetch(url, { method:'POST', body:new FormData(form), headers:{ 'Accept':'application/json' } })
      .then(r => {
        if(r.ok) { document.getElementById('success-msg').style.display='block'; form.reset(); }
        else { alert('Oops! There was a problem.'); }
      }).catch(()=> alert('Oops! There was a problem.'));
    });
  }
  // maintenance redirect: if index.html missing -> redirect to maintenance.html (useful when index removed)
  fetch('/index.html', {method:'GET', cache:'no-store'}).then(resp => {
    if(!resp.ok) {
      if(!location.pathname.endsWith('/maintenance.html')) location.href = '/maintenance.html';
    }
  }).catch(()=>{
    if(!location.pathname.endsWith('/maintenance.html')) location.href = '/maintenance.html';
  });
});