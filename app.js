/* ============================================================
 *  SECRET DESIGNER · APP LOGIC
 *  Don't edit this file. Edit assignments.js instead.
 * ============================================================ */

(function () {
  /* ----- DOM ----- */
  const namePicker  = document.getElementById('namePicker');
  const codeInput   = document.getElementById('codeInput');
  const revealBtn   = document.getElementById('revealBtn');
  const errorMsg    = document.getElementById('errorMsg');
  const modal       = document.getElementById('modal');
  const modalClose  = document.getElementById('modalClose');
  const modalHi     = document.getElementById('modalHi');
  const targetName  = document.getElementById('targetName');
  const targetEn    = document.getElementById('targetEn');
  const infoTitle   = document.getElementById('infoTitle');
  const infoBody    = document.getElementById('infoBody');

  /* upload */
  const uploadForm    = document.getElementById('uploadForm');
  const uploadSubmit  = document.getElementById('uploadSubmit');
  const uploadResult  = document.getElementById('uploadResult');
  const fileInput     = document.getElementById('up-file');
  const fileNameEl    = document.getElementById('file-name');
  const fileTextEl    = document.getElementById('file-text');

  /* state */
  let selectedTraineeId = null;
  const LS_KEY = 'moomken_secret_designer_signups_v1';

  /* ---------- helpers ---------- */
  function getSignupLog() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function saveSignupLog(log) {
    localStorage.setItem(LS_KEY, JSON.stringify(log));
  }

  /* ---------- Render name buttons ---------- */
  const signupLog = getSignupLog();

  TRAINEES.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'name-btn';
    btn.textContent = t.name;
    btn.dataset.id = t.id;

    /* If this name has already revealed on this device, leave it
       enabled so they can re-view (they just need the code again).
       This prevents anyone else on the same device from seeing
       their pair without the code. */

    btn.addEventListener('click', () => {
      document.querySelectorAll('.name-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTraineeId = t.id;
      updateRevealBtn();
      errorMsg.textContent = '';
    });
    namePicker.appendChild(btn);
  });

  /* ---------- Enable reveal button ---------- */
  function updateRevealBtn() {
    const hasName = selectedTraineeId !== null;
    const hasCode = codeInput.value.trim().length >= 4;
    revealBtn.disabled = !(hasName && hasCode);
  }

  codeInput.addEventListener('input', () => {
    updateRevealBtn();
    errorMsg.textContent = '';
  });

  codeInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !revealBtn.disabled) revealBtn.click();
  });

  /* ---------- Send signup notification to trainer ---------- */
  async function notifyTrainer(trainee, target) {
    /* Skip silently if Formspree isn't configured yet */
    if (!FORMSPREE_SIGNUP || FORMSPREE_SIGNUP.includes('YOUR_SIGNUP_ID')) {
      console.warn('Formspree signup endpoint not configured.');
      return;
    }

    /* Avoid spamming the trainer with duplicate notifications */
    const log = getSignupLog();
    if (log[trainee.id]) {
      console.log('Already notified for', trainee.name);
      return;
    }

    const payload = {
      _subject: '🎨 Secret Designer · New Signup: ' + trainee.name,
      trainee_id: trainee.id,
      trainee_name: trainee.name,
      trainee_name_en: trainee.nameEn,
      designs_for_id: target.id,
      designs_for_name: target.name,
      designs_for_name_en: target.nameEn,
      timestamp: new Date().toISOString(),
      message:
        trainee.name + ' (' + trainee.nameEn + ') just revealed their secret target.\n' +
        'They are designing for: ' + target.name + ' (' + target.nameEn + ').\n' +
        'Timestamp: ' + new Date().toLocaleString('en-GB', { timeZone: 'Africa/Tripoli' })
    };

    try {
      const res = await fetch(FORMSPREE_SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        log[trainee.id] = { revealedAt: payload.timestamp, target: target.id };
        saveSignupLog(log);
      } else {
        console.warn('Signup notification failed:', res.status);
      }
    } catch (err) {
      console.warn('Signup notification error:', err);
    }
  }

  /* ---------- Reveal flow ---------- */
  revealBtn.addEventListener('click', async () => {
    if (selectedTraineeId === null) {
      errorMsg.textContent = '⚠ اختر اسمك أولاً';
      return;
    }

    const trainee = TRAINEES.find(t => t.id === selectedTraineeId);
    const enteredCode = codeInput.value.trim().toUpperCase();
    const expectedCode = trainee.code.toUpperCase();

    if (enteredCode !== expectedCode) {
      errorMsg.textContent = '❌ الكود غير صحيح. تأكّد من الكود الذي استلمته من المدرّب.';
      revealBtn.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-8px)' },
          { transform: 'translateX(8px)' },
          { transform: 'translateX(-4px)' },
          { transform: 'translateX(0)' }
        ],
        { duration: 350, easing: 'ease-out' }
      );
      return;
    }

    /* loading state */
    const originalText = revealBtn.textContent;
    revealBtn.disabled = true;
    revealBtn.innerHTML = 'جاري الكشف <span class="spinner"></span>';

    const target = TRAINEES.find(t => t.id === trainee.target);

    /* Fire notification (don't block UI on it) */
    notifyTrainer(trainee, target);

    /* Brief delay for dramatic effect */
    await new Promise(r => setTimeout(r, 600));

    modalHi.textContent = 'أهلاً ' + trainee.name + ' 👋';
    targetName.textContent = target.name;
    targetEn.textContent = target.nameEn;
    infoTitle.textContent = trainee.infoCategory.title;
    infoBody.textContent = trainee.infoCategory.body;

    modal.classList.add('active');

    revealBtn.disabled = false;
    revealBtn.textContent = originalText;
  });

  /* ---------- Modal controls ---------- */
  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });

  /* ============================================================
   *  UPLOAD FORM
   * ============================================================ */

  /* show selected filename */
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if (f) {
      const sizeMB = (f.size / (1024 * 1024)).toFixed(2);
      fileNameEl.textContent = '✓ ' + f.name + ' (' + sizeMB + ' MB)';
      fileTextEl.style.display = 'none';
    } else {
      fileNameEl.textContent = '';
      fileTextEl.style.display = '';
    }
  });

  /* drag and drop */
  const fileLabel = document.querySelector('.file-input-label');
  ['dragenter', 'dragover'].forEach(ev => {
    fileLabel.addEventListener(ev, e => {
      e.preventDefault();
      fileLabel.style.borderColor = 'var(--coral)';
      fileLabel.style.background = 'white';
    });
  });
  ['dragleave', 'drop'].forEach(ev => {
    fileLabel.addEventListener(ev, e => {
      e.preventDefault();
      fileLabel.style.borderColor = '';
      fileLabel.style.background = '';
    });
  });
  fileLabel.addEventListener('drop', e => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
    }
  });

  /* submit */
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!FORMSPREE_UPLOAD || FORMSPREE_UPLOAD.includes('YOUR_UPLOAD_ID')) {
      uploadResult.className = 'upload-result error';
      uploadResult.textContent = '⚠ نظام الرفع غير مفعّل بعد. تواصل مع المدرّب.';
      return;
    }

    const file = fileInput.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      uploadResult.className = 'upload-result error';
      uploadResult.textContent = '⚠ حجم الملف أكبر من 10 ميغابايت. اضغطه أو صدّره بحجم أصغر.';
      return;
    }

    const formData = new FormData(uploadForm);
    formData.append('_subject',
      '🎨 Design Submission · ' + (formData.get('trainee_name') || 'Unknown'));

    uploadSubmit.disabled = true;
    uploadSubmit.innerHTML = 'جاري الإرسال <span class="spinner"></span>';
    uploadResult.style.display = 'none';

    try {
      const res = await fetch(FORMSPREE_UPLOAD, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        uploadResult.className = 'upload-result success';
        uploadResult.textContent = '✓ تم رفع التصميم بنجاح! نشوفك في الجلسة 🎉';
        uploadForm.reset();
        fileNameEl.textContent = '';
        fileTextEl.style.display = '';
      } else {
        const data = await res.json().catch(() => ({}));
        uploadResult.className = 'upload-result error';
        uploadResult.textContent = '⚠ فشل الإرسال: ' +
          (data.error || 'تأكّد من اتصالك بالإنترنت وحاول مرة أخرى.');
      }
    } catch (err) {
      uploadResult.className = 'upload-result error';
      uploadResult.textContent = '⚠ فشل الإرسال — تأكّد من اتصالك بالإنترنت.';
    } finally {
      uploadSubmit.disabled = false;
      uploadSubmit.textContent = 'إرسال التصميم 🚀';
    }
  });

})();
