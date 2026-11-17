(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  if (menuButton && menu) {
    function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); }
    menuButton.addEventListener('click', () => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => {
      if (!menu.hidden && !menu.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
    });
  }

  const observers = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .06, rootMargin: '0px 0px 20px 0px' });
    observers.forEach(el => observer.observe(el));
  } else observers.forEach(el => el.classList.add('visible'));

  const gallery = document.querySelector('.gallery-grid');
  const filters = document.querySelectorAll('.gallery-filters .filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filters.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    galleryItems.forEach(item => item.classList.toggle('is-hidden', value !== 'all' && item.dataset.category !== value));
    gallery.classList.toggle('filtered', value !== 'all');
  }));

  const dateInput = document.getElementById('date');
  if (dateInput) {
    const local = new Date();
    const yyyy = local.getFullYear();
    const mm = String(local.getMonth() + 1).padStart(2, '0');
    const dd = String(local.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  const eventSelect = document.getElementById('event');
  document.querySelectorAll('[data-event]').forEach(link => link.addEventListener('click', () => {
    if (eventSelect) eventSelect.value = link.dataset.event;
  }));

  document.getElementById('year').textContent = new Date().getFullYear();
  const form = document.getElementById('enquiry-form');
  const error = document.getElementById('form-error');
  const dialog = document.getElementById('enquiry-dialog');
  const preview = document.getElementById('enquiry-preview');
  const copyButton = document.getElementById('copy-enquiry');
  const copyStatus = document.getElementById('copy-status');
  const close = document.getElementById('dialog-close');
  if (!form) return;

  const clean = v => String(v || '').trim();
  function formatDate(value) {
    if (!value) return 'To be decided';
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('en-IN', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(year, month - 1, day));
  }
  function fieldError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    field.focus();
    error.hidden = false;
    error.textContent = message;
  }
  form.querySelectorAll('input,select,textarea').forEach(el => el.addEventListener('input', () => {
    el.removeAttribute('aria-invalid'); error.hidden = true;
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    error.hidden = true;
    const name = clean(form.elements.name.value);
    const phone = clean(form.elements.phone.value);
    const event = clean(form.elements.event.value);
    const date = clean(form.elements.date.value);
    const guests = clean(form.elements.guests.value);
    const location = clean(form.elements.location.value);
    const notes = clean(form.elements.notes.value);
    if (name.length < 2) return fieldError(form.elements.name, 'Please enter your name.');
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) return fieldError(form.elements.phone, 'Please enter a valid contact number (10–13 digits).');
    if (!event) return fieldError(form.elements.event, 'Please select your occasion.');
    if (!date || date < dateInput.min) return fieldError(form.elements.date, 'Please choose a future event date.');
    if (guests && (!Number.isSafeInteger(Number(guests)) || Number(guests) < 1 || Number(guests) > 100000)) return fieldError(form.elements.guests, 'Please enter a valid number of guests.');

    const message = [
      'Hello Padiyar Caterers & Events Co.!',
      '',
      'I would love to enquire about your catering services.',
      '',
      `Name: ${name}`,
      `Contact number: ${phone}`,
      `Occasion: ${event}`,
      `Event date: ${formatDate(date)}`,
      `Number of guests: ${guests || 'To be confirmed'}`,
      `Location: ${location || 'To be confirmed'}`,
      `Additional details: ${notes || 'None yet'}`,
      '',
      'Please let me know the next steps. Thank you!'
    ].join('\n');
    preview.value = message;
    copyStatus.textContent = '';
    copyButton.textContent = 'Copy enquiry details';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else { dialog.setAttribute('open', ''); }
    document.body.classList.add('dialog-open');
  });
  function closeDialog() { dialog.close ? dialog.close() : dialog.removeAttribute('open'); document.body.classList.remove('dialog-open'); }
  close.addEventListener('click', closeDialog);
  dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  copyButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(preview.value);
      copyButton.textContent = 'Copied ✓';
      copyStatus.textContent = 'Copied! Now tap Open Instagram DM and paste the enquiry.';
    } catch (err) {
      preview.focus(); preview.select();
      try {
        if (document.execCommand('copy')) {
          copyButton.textContent = 'Copied ✓';
          copyStatus.textContent = 'Copied! You can now paste it into Instagram.';
          return;
        }
      } catch (_) { /* fallback to manual selection */ }
      copyStatus.textContent = 'Select and copy the message above, then open Instagram.';
    }
  });
})();
