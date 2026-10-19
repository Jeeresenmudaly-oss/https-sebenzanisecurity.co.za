const assessmentForm = document.querySelector('#assessment-form');
const requestSummary = document.querySelector('#request-summary');

if (assessmentForm && requestSummary) {
  const serviceChoice = document.querySelector('#service-choice');
  const formStatus = document.querySelector('#form-status');
  const submitButton = assessmentForm.querySelector('[type="submit"]');
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

  assessmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const details = new FormData(assessmentForm);
    const fields = ['organisation', 'name', 'telephone', 'email', 'service', 'requirements'];
    for (const key of fields) {
      requestSummary.querySelector(`[data-summary="${key}"]`).textContent = String(details.get(key) || '').trim();
    }
    details.set('form-name', assessmentForm.name);
    details.set('subject', `New security enquiry — ${details.get('organisation')}`);
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    formStatus.hidden = false;
    formStatus.textContent = 'Sending your request…';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(details).toString(),
      });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      assessmentForm.hidden = true;
      formStatus.hidden = true;
      requestSummary.hidden = false;
      requestSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      formStatus.textContent = 'We couldn’t send your request just now. Please try again, or email info@sebenzanisecurity.co.za directly.';
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });

  document.querySelector('#print-request').addEventListener('click', () => window.print());
}
