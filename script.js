const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

const yearLabel = document.querySelector('#year');
if (yearLabel) yearLabel.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  '.intro, .section-top, .service-card, .sector-heading, .sector-list > div, .capability-image, .capability-copy, .proof-heading, .proof-stat, .contact-panel, .service-hero-copy, .service-hero-media, .service-detail-grid > div, .service-cta'
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add('reveal');
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add('in-view'));
}

// A short branded curtain makes navigation between detail pages feel deliberate.
const transitionCurtain = document.createElement('div');
transitionCurtain.className = 'page-transition';
transitionCurtain.setAttribute('aria-hidden', 'true');
transitionCurtain.innerHTML = '<span class="page-transition-mark">Sebenzani <i></i> Security</span>';
document.body.append(transitionCurtain);
transitionCurtain.classList.add('is-arriving');
transitionCurtain.addEventListener('animationend', () => transitionCurtain.classList.remove('is-arriving'), { once: true });

let pageNavigationPending = false;
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || pageNavigationPending || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
  const destination = new URL(link.href, window.location.href);
  if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  event.preventDefault();
  pageNavigationPending = true;
  transitionCurtain.classList.remove('is-arriving');
  transitionCurtain.classList.add('is-leaving');
  window.setTimeout(() => window.location.assign(destination.href), 370);
});
