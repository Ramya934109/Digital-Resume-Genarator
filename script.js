document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const resumePreview = document.getElementById('resumePreview');
  const resumeName = document.getElementById('resumeName');
  const resumeRole = document.getElementById('resumeRole');
  const resumeEmail = document.getElementById('resumeEmail');
  const resumePhone = document.getElementById('resumePhone');
  const resumeSkills = document.getElementById('resumeSkills');
  const resumeExperience = document.getElementById('resumeExperience');
  const resumeEducation = document.getElementById('resumeEducation');
  const resumeProject = document.getElementById('resumeProject');
  const resumeInternship = document.getElementById('resumeInternship');
  const resumeLanguages = document.getElementById('resumeLanguages');

  generateBtn.addEventListener('click', () => {
    // Personal Details
    resumeName.textContent = document.getElementById('name').value || 'Your Name';
    resumeRole.textContent = document.getElementById('role').value || 'Your Role';
    resumeEmail.textContent = document.getElementById('email').value || 'your@email.com';
    resumePhone.textContent = document.getElementById('phone').value || '000-000-0000';

    // Skills
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    resumeSkills.innerHTML = skills.length ? skills.map(skill => `<span class="chip">${skill}</span>`).join(' ') : 'Your Skills';

    // Experience
    resumeExperience.textContent = document.getElementById('experience').value || 'Your Work Experience';

    // Education
    resumeEducation.textContent = document.getElementById('education').value || 'Your Education';

    // Project
    const projectTitle = document.getElementById('projectTitle').value;
    const projectTech = document.getElementById('projectTech').value;
    const projectDesc = document.getElementById('projectDesc').value;
    const projectLink = document.getElementById('projectLink').value;
    resumeProject.innerHTML = projectTitle ? `
      <h4>${projectTitle}</h4>
      <p class="tech">Tech: ${projectTech}</p>
      <p class="desc">${projectDesc}</p>
      <p class="link"><a href="${projectLink}" target="_blank">Link</a></p>
    ` : 'No projects added';

    // Internship
    const internPosition = document.getElementById('internPosition').value;
    const internCompany = document.getElementById('internCompany').value;
    const internDuration = document.getElementById('internDuration').value;
    const internResponsibilities = document.getElementById('internResponsibilities').value;
    resumeInternship.innerHTML = internPosition ? `
      <h4>${internPosition}</h4>
      <p class="company">Company: ${internCompany}</p>
      <p class="duration">Duration: ${internDuration}</p>
      <p class="resp">${internResponsibilities}</p>
    ` : 'No internships added';

    // Languages
    const languages = Array.from(document.getElementById('languagesSelect').selectedOptions).map(option => option.value);
    resumeLanguages.textContent = languages.length ? languages.join(', ') : 'No languages selected';

    // Toggle visibility
    document.querySelector('.form-panel').style.display = 'none';
    resumePreview.style.display = 'block';
  });

  // PDF Export
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const resumeElement = document.getElementById('resume');
    html2pdf()
      .from(resumeElement)
      .save('resume.pdf');
  });
});
