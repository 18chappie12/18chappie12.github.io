const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const menuButton = $('.menu-toggle');
const navLinks = $('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
$$('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = $$('[data-reveal]');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('revealed'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const skillNodes = $$('.skill-node');
skillNodes.forEach((node) => node.addEventListener('click', () => {
  skillNodes.forEach((skill) => skill.classList.remove('is-active'));
  node.classList.add('is-active');
}));

if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
  const glow = $('.cursor-glow');
  window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }, { passive: true });
  $$('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.18;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

const projectData = {
  trip: { kicker: '01 / PRODUCT CONCEPT', title: 'TripInMood', description: 'A mood-aware travel and wellbeing concept focused on helping someone choose an escape that fits how they feel. Expand this entry with the problem statement, prototype decisions, and technology used as the work develops.', tags: ['PRODUCT CONCEPT', 'UX', 'TRAVEL'] },
  ecoroute: { kicker: '02 / PRODUCT CONCEPT', title: 'EcoRoute', description: 'A sustainability-focused routing concept. This card is designed to grow with the project—add route logic, research, screens, and implementation details when they are ready to share.', tags: ['ROUTING', 'IMPACT', 'CONCEPT'] },
  solo: { kicker: '03 / PERSONAL BUILD', title: 'Solo Leveling', description: 'A personal project with an evolving brief. Add the project’s purpose, responsibilities, technology, and any live or source links here to make this case study more specific for recruiters.', tags: ['PERSONAL BUILD', 'ADD DETAILS'] },
  jarvis: { kicker: '04 / LOCAL AI EXPERIMENT', title: 'Local AI / Jarvis Work', description: 'Hands-on exploration of local assistant workflows and conversational computing. This space can document the architecture, capabilities, privacy considerations, and lessons learned as the experiment grows.', tags: ['LOCAL AI', 'EXPLORATION', 'CONVERSATIONAL UX'] }
};
const dialog = $('.project-dialog');
const closeDialog = $('.dialog-close');
const showProject = (key) => {
  const project = projectData[key];
  $('#dialog-kicker').textContent = project.kicker;
  $('#dialog-title').textContent = project.title;
  $('#dialog-description').textContent = project.description;
  $('#dialog-tags').replaceChildren(...project.tags.map((tag) => { const chip = document.createElement('span'); chip.textContent = tag; return chip; }));
  dialog.showModal();
  closeDialog.focus();
};
$$('.round-button').forEach((button) => button.addEventListener('click', () => {
  showProject(button.closest('[data-project]').dataset.project);
}));
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const toast = $('.toast');
let toastTimer;
const announce = (message) => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3200); };
const resumeLink = $('a[download]');
resumeLink.addEventListener('click', () => announce('Resume placeholder downloaded — replace it with Bhanu Teja’s PDF when available.'));
