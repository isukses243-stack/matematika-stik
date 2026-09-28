/**
 * KREASI STIK PINTAR - Main Application Controller
 * Mengintegrasikan Story Quest (Deep Learning), Model 3D, Mesin Matematika,
 * KKA Koding Blok, Audio Narator, dan Navigasi Antarmuka Pengguna.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Objek Utama
  const soundEngine = window.sound || new SoundEngine();
  window.sound = soundEngine;

  const model3d = new PencilHolder3D('canvas3d-container');
  const storyEngine = new StoryEngine();
  const mathEngine = new MathEngine();
  const stemKka = new StemKkaEngine();
  const coopGame = new CooperativeGameEngine();
  window.coopGame = coopGame;

  const ifpGame = new IFPGamesEngine();
  window.ifpGame = ifpGame;

  // State Aplikasi
  let activeTab = 'tab-story'; // default tab: petualangan soal cerita

  // --- 1. GLOBAL STARS BADGE UPDATE ---
  const globalStarsBadge = document.getElementById('global-stars-badge');
  function updateGlobalStars() {
    const total = storyEngine.totalStars + 
                  mathEngine.quizScore + 
                  (window.coopGame ? window.coopGame.starsEarned : 0) + 
                  (window.ifpGame ? window.ifpGame.starsEarned : 0);
    if (globalStarsBadge) globalStarsBadge.textContent = total;
  }
  window.appUpdateGlobalStars = updateGlobalStars;

  // --- 2. NAVIGASI TAB UTAMA ---
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content-panel');

  function switchTab(tabId) {
    activeTab = tabId;
    navTabs.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabContents.forEach(panel => {
      if (panel.id === tabId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    if (window.sound) window.sound.playWoodClick();

    // Re-adjust 3D canvas saat tab 3D aktif
    if (tabId === 'tab-3d' && model3d) {
      setTimeout(() => model3d.onWindowResize(), 60);
    }

    // Render tab koperasi jika dipilih
    if (tabId === 'tab-coop' && window.coopGame) {
      window.coopGame.render();
    }

    // Render tab IFP jika dipilih
    if (tabId === 'tab-ifp' && window.ifpGame) {
      window.ifpGame.render();
    }
  }

  navTabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // =========================================================================
  // --- 3. STORY QUEST (PETUALANGAN SOAL CERITA & PEMBELAJARAN MENDALAM) ---
  // =========================================================================
  const chapterTabsContainer = document.getElementById('story-chapter-tabs');
  const charAvatar = document.getElementById('story-char-avatar');
  const charName = document.getElementById('story-char-name');
  const charTheme = document.getElementById('story-chapter-theme');
  const charDialogue = document.getElementById('story-char-dialogue');
  const steamPillar = document.getElementById('story-steam-pillar');
  const steamText = document.getElementById('story-steam-text');
  const vocabContainer = document.getElementById('story-vocab-container');

  const chapterTitleBadge = document.getElementById('story-chapter-title-badge');
  const chapterTitle = document.getElementById('story-chapter-title');
  const stepNavBtns = document.querySelectorAll('.step-nav-btn');

  // Substep Panels
  const panelStep1 = document.getElementById('substep-panel-1');
  const panelStep2 = document.getElementById('substep-panel-2');
  const panelStep3 = document.getElementById('substep-panel-3');

  // Substep 1 Elements
  const storyMainParagraph = document.getElementById('story-main-paragraph');
  const storyKnownDisplay = document.getElementById('story-known-display');
  const storyAskDisplay = document.getElementById('story-ask-display');
  const btnStoryReadAloud = document.getElementById('btn-story-read-aloud');
  const btnToggleKeywords = document.getElementById('btn-toggle-keywords');
  const btnGoStep2 = document.getElementById('btn-go-step-2');

  // Substep 2 Elements (Manipulatif Meja Kerja)
  const workbenchLabelA = document.getElementById('workbench-label-a');
  const workbenchValA = document.getElementById('workbench-val-a');
  const workbenchSticksA = document.getElementById('workbench-sticks-a');
  const workbenchLabelB = document.getElementById('workbench-label-b');
  const workbenchValB = document.getElementById('workbench-val-b');
  const workbenchSticksB = document.getElementById('workbench-sticks-b');
  const btnMergeSticks = document.getElementById('btn-merge-sticks');
  const btnResetWorkbench = document.getElementById('btn-reset-workbench');
  const workbenchMergedTotal = document.getElementById('workbench-merged-total');
  const workbenchMergedExplanation = document.getElementById('workbench-merged-explanation');
  const workbenchSticksMerged = document.getElementById('workbench-sticks-merged');
  const btnBackStep1 = document.getElementById('btn-back-step-1');
  const btnGoStep3 = document.getElementById('btn-go-step-3');

  // Substep 3 Elements (Kesimpulan Matematika & Refleksi)
  const storyMathEquationDisplay = document.getElementById('story-math-equation-display');
  const storyQuizOptions = document.getElementById('story-quiz-options');
  const storyAnswerFeedback = document.getElementById('story-answer-feedback');
  const storyReflectionQ = document.getElementById('story-reflection-q');
  const storyReflectionA = document.getElementById('story-reflection-a');
  const btnBackStep2 = document.getElementById('btn-back-step-2');
  const btnNextChapterAction = document.getElementById('btn-next-chapter-action');

  function renderChapterTabs() {
    if (!chapterTabsContainer) return;
    chapterTabsContainer.innerHTML = '';

    storyEngine.chapters.forEach((ch, idx) => {
      const btn = document.createElement('button');
      const isSolved = storyEngine.solvedChapters.has(ch.id);
      const isActive = (idx === storyEngine.currentChapterIndex);

      btn.className = `p-2.5 rounded-2xl text-left border-2 transition ${
        isActive 
          ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300' 
          : 'bg-slate-50 text-gray-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
      }`;

      btn.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-indigo-200' : 'text-gray-500'}">
            Babak ${ch.id}
          </span>
          <span>${isSolved ? '⭐' : '🔒'}</span>
        </div>
        <p class="text-xs font-extrabold truncate mt-0.5">${ch.theme}</p>
      `;

      btn.addEventListener('click', () => {
        storyEngine.selectChapter(idx);
        renderCurrentChapter();
      });

      chapterTabsContainer.appendChild(btn);
    });
  }

  function setStorySubStep(stepNum) {
    storyEngine.currentSubStep = stepNum;

    // Update Nav Buttons
    stepNavBtns.forEach(btn => {
      const bStep = parseInt(btn.dataset.step, 10);
      if (bStep === stepNum) {
        btn.className = 'step-nav-btn active px-3 py-1.5 rounded-xl text-xs font-black bg-indigo-600 text-white shadow-sm';
      } else {
        btn.className = 'step-nav-btn px-3 py-1.5 rounded-xl text-xs font-black text-gray-500 hover:text-gray-800';
      }
    });

    // Toggle Panels
    if (panelStep1) panelStep1.classList.toggle('hidden', stepNum !== 1);
    if (panelStep2) panelStep2.classList.toggle('hidden', stepNum !== 2);
    if (panelStep3) panelStep3.classList.toggle('hidden', stepNum !== 3);

    if (window.sound) window.sound.playWoodClick();
  }

  stepNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step, 10);
      setStorySubStep(step);
    });
  });

  if (btnGoStep2) btnGoStep2.addEventListener('click', () => setStorySubStep(2));
  if (btnBackStep1) btnBackStep1.addEventListener('click', () => setStorySubStep(1));
  if (btnGoStep3) btnGoStep3.addEventListener('click', () => setStorySubStep(3));
  if (btnBackStep2) btnBackStep2.addEventListener('click', () => setStorySubStep(2));

  function renderCurrentChapter() {
    const ch = storyEngine.getCurrentChapter();
    if (!ch) return;

    // Header & Sidebar Info
    if (chapterTitleBadge) chapterTitleBadge.textContent = `Babak ${ch.id} dari 5`;
    if (chapterTitle) chapterTitle.textContent = ch.title;
    if (charAvatar) {
      if (ch.characterA.includes('Indah') && ch.characterA.includes('Tammy')) {
        charAvatar.innerHTML = `
          <div class="flex items-center -space-x-2">
            <img src="assets/img/ms-indah.svg" alt="Ms. Indah" class="w-8 h-8 rounded-full border-2 border-white shadow-xs">
            <img src="assets/img/ms-tammy.svg" alt="Ms. Tammy" class="w-8 h-8 rounded-full border-2 border-white shadow-xs">
          </div>
        `;
      } else if (ch.characterA.includes('Indah')) {
        charAvatar.innerHTML = `<img src="assets/img/ms-indah.svg" alt="Ms. Indah" class="w-10 h-10 object-contain">`;
      } else if (ch.characterA.includes('Tammy')) {
        charAvatar.innerHTML = `<img src="assets/img/ms-tammy.svg" alt="Ms. Tammy" class="w-10 h-10 object-contain">`;
      } else {
        charAvatar.textContent = ch.avatarA;
      }
    }
    if (charName) charName.textContent = ch.characterA;
    if (charTheme) charTheme.textContent = ch.theme;
    if (charDialogue) charDialogue.textContent = `"${ch.dialogue}"`;
    if (steamPillar) steamPillar.textContent = ch.steamInsight.pillar;
    if (steamText) steamText.textContent = ch.steamInsight.text;

    // Render Kosakata
    if (vocabContainer) {
      vocabContainer.innerHTML = '';
      ch.vocabulary.forEach(v => {
        const item = document.createElement('div');
        item.className = 'p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs';
        item.innerHTML = `
          <span class="font-extrabold text-indigo-700">${v.word}:</span>
          <span class="text-gray-600 font-medium">${v.meaning}</span>
        `;
        vocabContainer.appendChild(item);
      });
    }

    // Step 1: Mindful Reading
    renderStoryTextWithKeywords();
    if (storyKnownDisplay) storyKnownDisplay.textContent = ch.knownText;
    if (storyAskDisplay) storyAskDisplay.textContent = ch.askText;

    // Step 2: Workbench
    renderWorkbench();

    // Step 3: Math & Reflection
    if (storyMathEquationDisplay) {
      storyMathEquationDisplay.innerHTML = `${ch.valA} + ${ch.valB} = <span class="text-amber-500 underline decoration-wavy">?</span>`;
    }
    if (storyReflectionQ) storyReflectionQ.textContent = ch.reflectionQuestion;
    if (storyReflectionA) storyReflectionA.textContent = ch.reflectionAnswer;

    if (storyAnswerFeedback) {
      storyAnswerFeedback.className = 'hidden';
      storyAnswerFeedback.innerHTML = '';
    }

    // Render Pilihan Jawaban Step 3
    if (storyQuizOptions) {
      storyQuizOptions.innerHTML = '';
      ch.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-fun btn-secondary text-lg font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2';
        btn.textContent = `${opt} Stik`;
        btn.addEventListener('click', () => handleStoryAnswer(opt));
        storyQuizOptions.appendChild(btn);
      });
    }

    renderChapterTabs();
    setStorySubStep(storyEngine.currentSubStep);
  }

  function renderStoryTextWithKeywords() {
    const ch = storyEngine.getCurrentChapter();
    if (!storyMainParagraph || !ch) return;

    if (storyEngine.highlightActive) {
      storyMainParagraph.innerHTML = `
        <span class="highlight-known-badge" title="Informasi yang diketahui">${ch.knownText}</span>
        <br><br>
        <span class="highlight-ask-badge" title="Pertanyaan cerita">${ch.askText}</span>
      `;
    } else {
      storyMainParagraph.textContent = ch.storyText;
    }
  }

  if (btnToggleKeywords) {
    btnToggleKeywords.addEventListener('click', () => {
      const active = storyEngine.toggleHighlight();
      btnToggleKeywords.classList.toggle('bg-amber-500', active);
      btnToggleKeywords.classList.toggle('text-white', active);
      renderStoryTextWithKeywords();
      if (window.sound) window.sound.playWoodClick();
    });
  }

  if (btnStoryReadAloud) {
    btnStoryReadAloud.addEventListener('click', () => {
      const ch = storyEngine.getCurrentChapter();
      if (ch && window.sound) {
        const textToRead = `${ch.title}. ${ch.storyText}. Pertanyaannya: ${ch.askText}`;
        window.sound.speak(textToRead);
      }
    });
  }

  // --- RENDER MEJA KERJA MANIPULATIF STIK ---
  function renderWorkbench() {
    const ch = storyEngine.getCurrentChapter();
    if (!ch) return;

    if (workbenchLabelA) workbenchLabelA.textContent = `Wadah A (${ch.characterA}): ${ch.valA} Stik`;
    if (workbenchValA) workbenchValA.textContent = `${ch.valA} Stik`;
    if (workbenchLabelB) workbenchLabelB.textContent = `Wadah B (${ch.characterB}): ${ch.valB} Stik`;
    if (workbenchValB) workbenchValB.textContent = `${ch.valB} Stik`;

    // Visual stik Wadah A
    if (workbenchSticksA) {
      workbenchSticksA.innerHTML = renderStickVisuals(ch.valA);
    }

    // Visual stik Wadah B
    if (workbenchSticksB) {
      workbenchSticksB.innerHTML = renderStickVisuals(ch.valB);
    }

    // Status Wadah Penggabungan
    if (storyEngine.workbenchMerged) {
      if (workbenchMergedTotal) workbenchMergedTotal.textContent = `${ch.result} Stik!`;
      if (workbenchMergedExplanation) {
        workbenchMergedExplanation.innerHTML = `🎉 <strong>${ch.equation}</strong> (${ch.tensExplanation})`;
      }
      if (workbenchSticksMerged) {
        workbenchSticksMerged.innerHTML = renderStickVisuals(ch.result);
      }
    } else {
      if (workbenchMergedTotal) workbenchMergedTotal.textContent = `0 Stik`;
      if (workbenchMergedExplanation) {
        workbenchMergedExplanation.textContent = `Klik tombol "Satukan Stik" untuk melihat hasil penggabungan!`;
      }
      if (workbenchSticksMerged) {
        workbenchSticksMerged.innerHTML = '<span class="text-xs text-gray-400 italic">Wadah masih kosong</span>';
      }
    }
  }

  function renderStickVisuals(count) {
    const tens = Math.floor(count / 10);
    const ones = count % 10;
    let html = '';

    // Render bundel puluhan
    for (let i = 0; i < tens; i++) {
      html += `
        <div class="mini-bundle-ten animate-bounce-slow" title="1 Ikat = 10 Stik Puluhan">
          <div class="flex gap-0.5">
            ${Array(10).fill('<div class="mini-stick"></div>').join('')}
          </div>
        </div>
      `;
    }

    // Render satuan lepas
    for (let j = 0; j < ones; j++) {
      html += `<div class="mini-stick mini-stick-yellow" title="1 Stik Satuan"></div>`;
    }

    return html;
  }

  if (btnMergeSticks) {
    btnMergeSticks.addEventListener('click', () => {
      storyEngine.mergeWorkbenchSticks();
      renderWorkbench();
      triggerConfetti();
    });
  }

  if (btnResetWorkbench) {
    btnResetWorkbench.addEventListener('click', () => {
      storyEngine.resetManipulatives();
      renderWorkbench();
      if (window.sound) window.sound.playWoodClick();
    });
  }

  // --- SUBMIT JAWABAN SOAL CERITA STEP 3 ---
  function handleStoryAnswer(selected) {
    const res = storyEngine.submitAnswer(selected);
    updateGlobalStars();

    if (storyAnswerFeedback) {
      storyAnswerFeedback.classList.remove('hidden');
      if (res.success) {
        storyAnswerFeedback.className = 'p-4 bg-emerald-100 border-2 border-emerald-500 rounded-2xl text-emerald-900 font-bold';
        storyAnswerFeedback.innerHTML = `
          <div class="flex items-center justify-center gap-2">
            <span class="text-2xl">🎉</span>
            <div>
              <p class="text-base">${res.message}</p>
              <p class="text-xs text-emerald-700 font-normal mt-0.5">${res.explanation}</p>
            </div>
          </div>
        `;
        triggerConfetti();
        renderChapterTabs();
      } else {
        storyAnswerFeedback.className = 'p-4 bg-amber-100 border-2 border-amber-500 rounded-2xl text-amber-900 font-bold';
        storyAnswerFeedback.innerHTML = `
          <div class="flex items-center justify-center gap-2">
            <span class="text-2xl">💡</span>
            <div>
              <p class="text-base">${res.message}</p>
              <p class="text-xs text-amber-800 font-normal mt-0.5">${res.hint}</p>
            </div>
          </div>
        `;
      }
    }
  }

  if (btnNextChapterAction) {
    btnNextChapterAction.addEventListener('click', () => {
      const nextIdx = (storyEngine.currentChapterIndex + 1) % storyEngine.chapters.length;
      storyEngine.selectChapter(nextIdx);
      renderCurrentChapter();
      if (window.sound) window.sound.playWoodClick();
    });
  }


  // =========================================================================
  // --- 4. KONTROL 3D TEMPAT PENSIL & RAKIT PULUHAN ---
  // =========================================================================
  const btnNextStep = document.getElementById('btn-next-step');
  const btnPrevStep = document.getElementById('btn-prev-step');
  const stepBadge = document.getElementById('3d-step-badge');
  const stepTitle = document.getElementById('3d-step-title');
  const mathFormulaDisplay = document.getElementById('3d-math-formula');
  const stickCountDisplay = document.getElementById('3d-total-sticks');
  const btnAutoRotate = document.getElementById('btn-auto-rotate');
  const btnExplode = document.getElementById('btn-explode');
  const btnResetCam = document.getElementById('btn-reset-cam');
  const btnSpeakStep = document.getElementById('btn-speak-step');

  function update3DUI(info) {
    if (stepBadge) stepBadge.textContent = `Langkah ${info.step} dari 6`;
    if (stepTitle) stepTitle.textContent = info.stepTitle;
    if (mathFormulaDisplay) mathFormulaDisplay.textContent = info.mathFormula;
    if (stickCountDisplay) stickCountDisplay.textContent = info.totalSticks;

    if (info.step === 5 || info.step === 6) {
      triggerConfetti();
    }
  }

  if (btnNextStep) {
    btnNextStep.addEventListener('click', () => {
      const info = model3d.nextStep();
      update3DUI(info);
    });
  }

  if (btnPrevStep) {
    btnPrevStep.addEventListener('click', () => {
      const info = model3d.prevStep();
      update3DUI(info);
    });
  }

  if (btnAutoRotate) {
    btnAutoRotate.addEventListener('click', () => {
      const active = model3d.toggleAutoRotate();
      btnAutoRotate.classList.toggle('bg-blue-600', active);
      btnAutoRotate.classList.toggle('text-white', active);
      if (window.sound) window.sound.playWoodClick();
    });
  }

  if (btnExplode) {
    btnExplode.addEventListener('click', () => {
      const exploded = model3d.toggleExplode();
      btnExplode.classList.toggle('bg-purple-600', exploded);
      btnExplode.classList.toggle('text-white', exploded);
      if (window.sound) window.sound.playWoodClick();
    });
  }

  if (btnResetCam) {
    btnResetCam.addEventListener('click', () => {
      model3d.resetCamera();
      if (window.sound) window.sound.playWoodClick();
    });
  }

  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      model3d.setColorTheme(theme);
      themeButtons.forEach(b => b.classList.remove('ring-4', 'ring-blue-500'));
      btn.classList.add('ring-4', 'ring-blue-500');
      if (window.sound) window.sound.playWoodClick();
    });
  });

  if (btnSpeakStep) {
    btnSpeakStep.addEventListener('click', () => {
      const textToRead = `${stepTitle.textContent}. Rumus matematikanya: ${mathFormulaDisplay.textContent}`;
      window.sound.speak(textToRead);
    });
  }


  // =========================================================================
  // --- 5. MESIN MATEMATIKA: KALKULATOR BUNDEL PULUHAN ---
  // =========================================================================
  const btnAddTen = document.getElementById('btn-add-ten');
  const btnAddOne = document.getElementById('btn-add-one');
  const btnResetMath = document.getElementById('btn-reset-math');
  const displayTensCount = document.getElementById('math-tens-count');
  const displayOnesCount = document.getElementById('math-ones-count');
  const displayTotalMath = document.getElementById('math-total-display');
  const visualBundlesContainer = document.getElementById('visual-bundles-container');
  const visualUnitsContainer = document.getElementById('visual-units-container');
  const mathExplainText = document.getElementById('math-explain-text');

  function updateMathDisplay(data) {
    if (displayTensCount) displayTensCount.textContent = data.tens;
    if (displayOnesCount) displayOnesCount.textContent = data.ones;
    if (displayTotalMath) displayTotalMath.textContent = data.total;
    if (mathExplainText) mathExplainText.textContent = data.textExplanation;

    if (visualBundlesContainer) {
      visualBundlesContainer.innerHTML = '';
      for (let i = 0; i < data.tens; i++) {
        const bundle = document.createElement('div');
        bundle.className = 'stick-bundle-ten animate-bounce-slow';
        bundle.innerHTML = `
          <div class="flex gap-0.5">
            ${Array(10).fill('<div class="stick-unit"></div>').join('')}
          </div>
        `;
        visualBundlesContainer.appendChild(bundle);
      }
      if (data.tens === 0) {
        visualBundlesContainer.innerHTML = '<span class="text-sm text-gray-400 italic">Belum ada ikatan puluhan</span>';
      }
    }

    if (visualUnitsContainer) {
      visualUnitsContainer.innerHTML = '';
      for (let i = 0; i < data.ones; i++) {
        const unit = document.createElement('div');
        unit.className = 'stick-unit';
        visualUnitsContainer.appendChild(unit);
      }
      if (data.ones === 0) {
        visualUnitsContainer.innerHTML = '<span class="text-sm text-gray-400 italic">0 satuan</span>';
      }
    }
  }

  if (btnAddTen) {
    btnAddTen.addEventListener('click', () => {
      const data = mathEngine.addSticks(10);
      updateMathDisplay(data);
    });
  }

  if (btnAddOne) {
    btnAddOne.addEventListener('click', () => {
      const data = mathEngine.addSticks(1);
      updateMathDisplay(data);
    });
  }

  if (btnResetMath) {
    btnResetMath.addEventListener('click', () => {
      const data = mathEngine.resetSticks();
      updateMathDisplay(data);
    });
  }

  // --- KUIS CEPAT BERHITUNG PULUHAN ---
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsContainer = document.getElementById('quiz-options');
  const quizScoreEl = document.getElementById('quiz-score');
  const quizFeedbackEl = document.getElementById('quiz-feedback');
  const btnNextQuiz = document.getElementById('btn-next-quiz');
  const filterBtns = document.querySelectorAll('.quiz-filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'active');
        b.classList.add('bg-slate-100', 'text-gray-700');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'active');
      btn.classList.remove('bg-slate-100', 'text-gray-700');
      mathEngine.setFilterMode(btn.dataset.mode);
      renderQuizQuestion();
      if (window.sound) window.sound.playWoodClick();
    });
  });

  function renderQuizQuestion() {
    const q = mathEngine.getCurrentQuiz();
    if (!q) return;

    if (quizQuestionEl) quizQuestionEl.textContent = q.question;
    if (quizFeedbackEl) {
      quizFeedbackEl.className = 'hidden';
      quizFeedbackEl.innerHTML = '';
    }
    if (btnNextQuiz) btnNextQuiz.classList.add('hidden');

    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-fun btn-secondary text-base font-extrabold py-3.5 px-6 rounded-2xl';
        btn.textContent = `${opt} Stik`;
        btn.addEventListener('click', () => handleQuizAnswer(opt));
        quizOptionsContainer.appendChild(btn);
      });
    }
  }

  function handleQuizAnswer(selected) {
    const result = mathEngine.answerQuiz(selected);
    if (quizScoreEl) quizScoreEl.textContent = result.score;
    updateGlobalStars();

    const buttons = quizOptionsContainer.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (quizFeedbackEl) {
      quizFeedbackEl.classList.remove('hidden');
      if (result.isCorrect) {
        quizFeedbackEl.className = 'p-4 bg-green-100 border-2 border-green-500 rounded-2xl text-green-800 font-bold';
        quizFeedbackEl.innerHTML = `🎉 Hebat sekali! Jawabanmu Benar! <br><span class="text-xs font-normal">${result.clue}</span>`;
        triggerConfetti();
      } else {
        quizFeedbackEl.className = 'p-4 bg-red-100 border-2 border-red-400 rounded-2xl text-red-800 font-bold';
        quizFeedbackEl.innerHTML = `Semangat! Jawaban yang tepat adalah ${result.correctAnswer} stik. <br><span class="text-xs font-normal">${result.clue}</span>`;
      }
    }

    if (btnNextQuiz) btnNextQuiz.classList.remove('hidden');
  }

  if (btnNextQuiz) {
    btnNextQuiz.addEventListener('click', () => {
      mathEngine.nextQuiz();
      renderQuizQuestion();
    });
  }


  // =========================================================================
  // --- 6. KKA: KODING BLOK ALGORITMA TEKS PETUNJUK ---
  // =========================================================================
  const sourceBlocksContainer = document.getElementById('source-blocks-container');
  const dropSlots = document.querySelectorAll('.drop-slot');
  const btnRunCode = document.getElementById('btn-run-code');
  const btnResetBlocks = document.getElementById('btn-reset-blocks');
  const kkaResultBox = document.getElementById('kka-result-box');

  function renderSourceBlocks() {
    if (!sourceBlocksContainer) return;
    sourceBlocksContainer.innerHTML = '';
    const blocks = stemKka.getShuffledBlocks();

    blocks.forEach(block => {
      const el = document.createElement('div');
      el.className = `code-block code-step-${block.id} cursor-pointer`;
      el.draggable = true;
      el.dataset.id = block.id;
      el.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase font-extrabold tracking-wider opacity-75">${block.category}</span>
          <span class="text-xs font-mono bg-white/70 px-2 py-0.5 rounded">${block.code}</span>
        </div>
        <p class="text-sm font-bold mt-1">${block.stepText}</p>
      `;

      el.addEventListener('click', () => {
        const emptySlotIdx = stemKka.currentSlots.findIndex(s => s === null);
        if (emptySlotIdx !== -1) {
          stemKka.assignBlockToSlot(block.id, emptySlotIdx);
          updateSlotsUI();
        }
      });

      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', block.id);
      });

      sourceBlocksContainer.appendChild(el);
    });
  }

  function updateSlotsUI() {
    dropSlots.forEach((slot, index) => {
      const block = stemKka.currentSlots[index];
      if (block) {
        slot.innerHTML = `
          <div class="w-full p-3 rounded-xl bg-white border-2 border-blue-400 flex items-center justify-between shadow-sm">
            <div>
              <span class="text-xs font-mono text-blue-600 font-bold">${block.code}</span>
              <p class="text-xs text-gray-800 font-semibold">${block.short}</p>
            </div>
            <button class="remove-block-btn text-red-500 hover:text-red-700 font-bold px-2 py-1 text-sm">✕</button>
          </div>
        `;
        slot.querySelector('.remove-block-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          stemKka.removeBlockFromSlot(index);
          updateSlotsUI();
        });
      } else {
        slot.innerHTML = `
          <div class="text-gray-400 text-xs font-bold text-center">
            [ Slot Langkah ${index + 1} Kosong ]
          </div>
        `;
      }
    });
  }

  dropSlots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      const blockId = e.dataTransfer.getData('text/plain');
      const slotIndex = parseInt(slot.dataset.slotIndex, 10);
      stemKka.assignBlockToSlot(blockId, slotIndex);
      updateSlotsUI();
    });
  });

  if (btnRunCode) {
    btnRunCode.addEventListener('click', () => {
      const outcome = stemKka.runAlgorithm();
      if (kkaResultBox) {
        kkaResultBox.classList.remove('hidden');
        if (outcome.success) {
          kkaResultBox.className = 'p-4 bg-green-100 border-2 border-green-500 rounded-2xl text-green-900 font-bold';
          kkaResultBox.innerHTML = `
            <div class="flex items-center gap-2">
              <span class="text-2xl">🚀</span>
              <div>
                <p class="text-base">${outcome.message}</p>
                <p class="text-xs text-green-700 font-normal mt-1">${outcome.debugHint}</p>
              </div>
            </div>
          `;
          triggerConfetti();
        } else {
          kkaResultBox.className = 'p-4 bg-amber-100 border-2 border-amber-500 rounded-2xl text-amber-900 font-bold';
          kkaResultBox.innerHTML = `
            <div class="flex items-center gap-2">
              <span class="text-2xl">⚠️</span>
              <div>
                <p class="text-base">${outcome.message}</p>
                <p class="text-xs text-amber-800 font-normal mt-1">${outcome.debugHint}</p>
              </div>
            </div>
          `;
        }
      }
    });
  }

  if (btnResetBlocks) {
    btnResetBlocks.addEventListener('click', () => {
      stemKka.resetSlots();
      updateSlotsUI();
      if (kkaResultBox) kkaResultBox.classList.add('hidden');
      if (window.sound) window.sound.playWoodClick();
    });
  }


  // =========================================================================
  // --- 7. RUANG GURU: SUBTAB NAVIGATION ---
  // =========================================================================
  const teacherSubtabBtns = document.querySelectorAll('.teacher-subtab-btn');
  const teacherContainers = [
    document.getElementById('teacher-modul-container'),
    document.getElementById('lkpd-container'),
    document.getElementById('certificate-container')
  ];

  teacherSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      teacherSubtabBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'active');
        b.classList.add('bg-slate-100', 'text-gray-700');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'active');
      btn.classList.remove('bg-slate-100', 'text-gray-700');

      teacherContainers.forEach(c => {
        if (c) c.classList.toggle('hidden', c.id !== targetId);
      });

      if (window.sound) window.sound.playWoodClick();
    });
  });


  // =========================================================================
  // --- 8. AUDIO CONTROLS BAR (GLOBAL) ---
  // =========================================================================
  const btnToggleMute = document.getElementById('btn-toggle-mute');
  const btnToggleBgm = document.getElementById('btn-toggle-bgm');

  if (btnToggleMute) {
    btnToggleMute.addEventListener('click', () => {
      const muted = window.sound.toggleMute();
      btnToggleMute.textContent = muted ? '🔇 Suara Mati' : '🔊 Suara';
      btnToggleMute.classList.toggle('bg-red-500', muted);
      btnToggleMute.classList.toggle('text-white', muted);
    });
  }

  if (btnToggleBgm) {
    btnToggleBgm.addEventListener('click', () => {
      const playing = window.sound.toggleBGM();
      btnToggleBgm.textContent = playing ? '🎵 Musik: Nyala' : '🎵 Musik';
      btnToggleBgm.classList.toggle('bg-purple-600', playing);
      btnToggleBgm.classList.toggle('text-white', playing);
    });
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }


  // --- QUICK 3D FLOATING MODAL CONTROLLER (PUTAR 360° BEBAS) ---
  let quick3DInstance = null;
  const btnQuick3DFloat = document.getElementById('btn-quick-3d-float');
  const modalQuick3D = document.getElementById('modal-quick-3d');
  const btnCloseQuick3D = document.getElementById('btn-close-quick-3d');
  const btnModalRotateToggle = document.getElementById('btn-modal-rotate-toggle');
  const btnModalResetCam = document.getElementById('btn-modal-reset-cam');
  const btnModalGoStudio = document.getElementById('btn-modal-go-studio');

  if (btnQuick3DFloat && modalQuick3D) {
    btnQuick3DFloat.addEventListener('click', () => {
      modalQuick3D.classList.remove('hidden');
      if (window.sound) window.sound.playWoodClick();

      if (!quick3DInstance) {
        quick3DInstance = new PencilHolder3D('quick-3d-canvas-container');
        quick3DInstance.setStep(6);
      }
      setTimeout(() => {
        if (quick3DInstance) quick3DInstance.onWindowResize();
      }, 100);
    });
  }

  if (btnCloseQuick3D && modalQuick3D) {
    btnCloseQuick3D.addEventListener('click', () => {
      modalQuick3D.classList.add('hidden');
      if (window.sound) window.sound.playWoodClick();
    });
  }

  if (btnModalRotateToggle) {
    btnModalRotateToggle.addEventListener('click', () => {
      if (quick3DInstance) {
        const rotating = quick3DInstance.toggleAutoRotate();
        btnModalRotateToggle.textContent = rotating ? '⏸ Jeda Putar' : '🔄 Putar Otomatis';
      }
    });
  }

  if (btnModalResetCam) {
    btnModalResetCam.addEventListener('click', () => {
      if (quick3DInstance) quick3DInstance.resetCamera();
    });
  }

  if (btnModalGoStudio) {
    btnModalGoStudio.addEventListener('click', () => {
      if (modalQuick3D) modalQuick3D.classList.add('hidden');
      switchTab('tab-3d');
    });
  }

  // =========================================================================
  // --- 9. INISIALISASI TAMPILAN AWAL ---
  // =========================================================================
  renderCurrentChapter();

  // Inisialisasi Toko Koperasi Cilik
  if (window.coopGame) {
    window.coopGame.render();
  }

  const initial3D = model3d.setStep(5);
  update3DUI(initial3D);

  const initialMath = mathEngine.getValuePlaceData();
  updateMathDisplay(initialMath);

  renderQuizQuestion();
  renderSourceBlocks();
  updateSlotsUI();

  // Render Ruang Guru, LKPD & Sertifikat
  if (typeof renderTeacherModul === 'function') {
    renderTeacherModul('teacher-modul-container');
  }
  if (typeof renderLkpdSection === 'function') {
    renderLkpdSection('lkpd-container');
  }
  if (typeof renderCertificateSection === 'function') {
    renderCertificateSection('certificate-container');
  }

  updateGlobalStars();
});
