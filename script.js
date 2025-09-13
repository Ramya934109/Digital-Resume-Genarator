// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Fields in form
  const fields = ['name','title','email','phone','summary','education','skills','experience','projects','links'];
  const els = {};
  fields.forEach(f => {
    els[f] = document.getElementById(f);
  });

  // The new select for Languages
  const languagesSelect = document.getElementById('languagesSelect');

  // Preview elements
  const cvName = document.getElementById('cvName');
  const cvTitle = document.getElementById('cvTitle');
  const cvEmail = document.getElementById('cvEmail');
  const cvPhone = document.getElementById('cvPhone');
  const cvSummary = document.getElementById('cvSummary');
  const cvEducation = document.getElementById('cvEducation');
  const cvSkills = document.getElementById('cvSkills');
  const cvExperience = document.getElementById('cvExperience');
  const cvProjects = document.getElementById('cvProjects');
  const cvLinks = document.getElementById('cvLinks');
  const cvLanguages = document.getElementById('resumeLanguages');  // where selected language will show

  const templateSelect = document.getElementById('templateSelect');
  const resumeEl = document.getElementById('resume');
  const downloadBtn = document.getElementById('downloadBtn');
  const resetBtn = document.getElementById('resetBtn');

  function updatePreview(){
    cvName.textContent = els.name.value.trim() || 'Your Name';
    cvTitle.textContent = els.title.value.trim() || 'Professional Title';
    cvEmail.textContent = els.email.value.trim() || 'you@example.com';
    cvPhone.textContent = els.phone.value.trim() || '+91 xxxxx xxxxx';
    cvSummary.textContent = els.summary.value.trim() || 'Short professional summary goes here.';

    // Education (newline -> list items)
    cvEducation.innerHTML = '';
    els.education.value.split('\n').map(s => s.trim()).filter(Boolean).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      cvEducation.appendChild(li);
    });

    // Skills: comma separated, chips
    cvSkills.innerHTML = '';
    els.skills.value.split(',').map(s => s.trim()).filter(Boolean).slice(0,30).forEach(skill => {
      const span = document.createElement('span');
      span.className = 'chip';
      span.textContent = skill;
      cvSkills.appendChild(span);
    });

    // Experience
    cvExperience.innerHTML = '';
    els.experience.value.split('\n').map(s => s.trim()).filter(Boolean).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      cvExperience.appendChild(li);
    });

    // Projects
    cvProjects.innerHTML = '';
    els.projects.value.split('\n').map(s => s.trim()).filter(Boolean).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      cvProjects.appendChild(li);
    });

    // Links
    cvLinks.innerHTML = '';
    els.links.value.split(',').map(s => s.trim()).filter(Boolean).forEach(link => {
      const a = document.createElement('a');
      a.href = link;
      a.textContent = link;
      a.target = '_blank';
      a.style.display = 'block';
      a.style.color = '#1b6fbf';
      cvLinks.appendChild(a);
    });

    // Languages Known — from select
    if(languagesSelect) {
      const selectedLang = languagesSelect.value;
      cvLanguages.textContent = selectedLang && selectedLang.trim() !== '' ? selectedLang : 'Languages Known';
    }
  }

  // Initial preview
  updatePreview();

  // Event listeners for form input fields
  fields.forEach(f => {
    if (els[f]) {
      els[f].addEventListener('input', updatePreview);
    }
  });

  // Listener for languages select
  if (languagesSelect) {
    languagesSelect.addEventListener('change', updatePreview);
  }

  // Template selection
  templateSelect.addEventListener('change', () => {
    const t = templateSelect.value;
    resumeEl.className = (t === 'classic') ? 'template-classic' : 'template-modern';
  });

  // Download PDF
  downloadBtn.addEventListener('click', () => {
    const nameVal = els.name.value.trim() || 'resume';
    const opt = {
      margin:       0.3,
      filename:     `${nameVal.replace(/\s+/g, '_')}_Resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(resumeEl).save();
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    fields.forEach(f => {
      if (els[f]) {
        els[f].value = '';
      }
    });
    if (languagesSelect) {
      languagesSelect.value = '';  // reset select also
    }
    updatePreview();
  });
});
