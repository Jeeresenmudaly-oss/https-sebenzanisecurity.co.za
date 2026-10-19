const assessmentForm = document.querySelector('#assessment-form');
const requestSummary = document.querySelector('#request-summary');

if (assessmentForm && requestSummary) {
  const serviceChoice = document.querySelector('#service-choice');
  const serviceSlugs = {
    'armed-response': 'Armed response',
    'cctv-monitoring': 'CCTV & monitoring',
    'security-operations-centre': 'Security operations centre',
    'risk-assessment': 'Risk assessment',
    'guarding-patrols': 'Guarding & patrols',
    'specialist-protection': 'Specialist protection',
  };
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (serviceSlugs[requestedService]) serviceChoice.value = serviceSlugs[requestedService];

  assessmentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const details = new FormData(assessmentForm);
    for (const key of ['organisation', 'name', 'telephone', 'email', 'service', 'requirements']) {
      requestSummary.querySelector(`[data-summary="${key}"]`).textContent = details.get(key).trim();
    }
    assessmentForm.hidden = true;
    requestSummary.hidden = false;
    requestSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelector('#email-request').addEventListener('click', () => {
    const value = (key) => requestSummary.querySelector(`[data-summary="${key}"]`).textContent;
    const subject = `Security assessment request — ${value('organisation')}`;
    const body = [
      'Security assessment request',
      '',
      `Organisation: ${value('organisation')}`,
      `Contact name: ${value('name')}`,
      `Telephone: ${value('telephone')}`,
      `Email: ${value('email')}`,
      `Service of interest: ${value('service')}`,
      '',
      'How can we help?',
      value('requirements'),
    ].join('\n');
    window.location.href = `mailto:info@sebenzanisecurity.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.querySelector('#print-request').addEventListener('click', () => window.print());
  document.querySelector('#edit-request').addEventListener('click', () => {
    requestSummary.hidden = true;
    assessmentForm.hidden = false;
    assessmentForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
