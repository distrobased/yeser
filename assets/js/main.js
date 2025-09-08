document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // Fade-in effect
  // -------------------------------
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.remove('opacity-0');
    el.classList.add('fade');
  });

  // -------------------------------
  // Accessibility toggles
  // -------------------------------
  const html = document.documentElement;
  const accToggle = document.getElementById('access-toggle');
  const sizeToggle = document.getElementById('size-toggle');

  // Load previous settings
  try {
    if(localStorage.getItem('pog_access_mode') === 'high-contrast') html.classList.add('high-contrast');
    if(localStorage.getItem('pog_text_size') === 'large') html.classList.add('large-text');
  } catch(e){}

  // High-contrast toggle
  if(accToggle) accToggle.addEventListener('click', () => {
    html.classList.toggle('high-contrast');
    try {
      if(html.classList.contains('high-contrast')) localStorage.setItem('pog_access_mode','high-contrast');
      else localStorage.removeItem('pog_access_mode');
    } catch(e) {}
  });

  // Large-text toggle
  if(sizeToggle) sizeToggle.addEventListener('click', () => {
    html.classList.toggle('large-text');
    try {
      if(html.classList.contains('large-text')) localStorage.setItem('pog_text_size','large');
      else localStorage.removeItem('pog_text_size');
    } catch(e) {}
  });

  // -------------------------------
  // Contact form async submit (Formspree)
  // -------------------------------
  const form = document.querySelector('form[data-async="formspree"]');
  if(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(form.action, {
        method:'POST',
        body: new FormData(form),
        headers:{ 'Accept':'application/json' }
      })
      .then(response => {
        if(response.ok){
          const successMsg = document.getElementById('success-msg');
          if(successMsg) successMsg.style.display = 'block';
          form.reset();
        } else {
          alert('Oops! There was a problem submitting the form.');
        }
      })
      .catch(()=> alert('Oops! There was a problem submitting the form.'));
    });
  }

  // -------------------------------
  // ⚠️ MAINTENANCE REDIRECT REMOVED
  // -------------------------------
  // Do NOT add any code that changes location.href
});
