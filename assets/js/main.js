document.addEventListener('DOMContentLoaded', () => {
  // Fade-in effect
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.remove('opacity-0');
    el.classList.add('fade');
  });

  // Accessibility toggles
  const html = document.documentElement;
  const accToggle = document.getElementById('access-toggle');
  const sizeToggle = document.getElementById('size-toggle');

  try {
    if(localStorage.getItem('pog_access_mode') === 'high-contrast') html.classList.add('high-contrast');
    if(localStorage.getItem('pog_text_size') === 'large') html.classList.add('large-text');
  } catch(e){}

  if(accToggle) accToggle.addEventListener('click', () => {
    html.classList.toggle('high-contrast');
    try {
      if(html.classList.contains('high-contrast')) localStorage.setItem('pog_access_mode','high-contrast');
      else localStorage.removeItem('pog_access_mode');
    } catch(e) {}
  });

  if(sizeToggle) sizeToggle.addEventListener('click', () => {
    html.classList.toggle('large-text');
    try {
      if(html.classList.contains('large-text')) localStorage.setItem('pog_text_size','large');
      else localStorage.removeItem('pog_text_size');
    } catch(e) {}
  });

  // Contact form (Formspree)
  const form = document.querySelector('form[data-async="formspree"]');
  if(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(form.action, { method:'POST', body: new FormData(form), headers:{ 'Accept':'application/json' } })
        .then(r => {
          if(r.ok) {
            const msg = document.getElementById('success-msg');
            if(msg) msg.style.display = 'block';
            form.reset();
          } else {
            alert('Oops! There was a problem.');
          }
        }).catch(()=> alert('Oops! There was a problem.'));
    });
  }

  // ✅ No maintenance redirect
  // Do not add any code that changes location.href
});
