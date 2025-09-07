
// Currently handles fade-in on load for all elements with 'fade-in'
document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(el => { el.style.opacity = '1'; });
});
