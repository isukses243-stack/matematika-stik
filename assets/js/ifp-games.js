/**
 * KREASI STIK PINTAR - IFP Games Engine (Interactive Flat Panel)
 * Dirancang khusus untuk Layar Sentuh Interaktif Besar Kelas (Smart Board / IFP).
 * Fitur:
 * 1. Duel 2 Tim Split-Screen (Tim Siti vs Tim Beni): Touch target ekstra besar (80px+), first to 5 points.
 * 2. Tangkap & Hitung Stik Raksasa: Touch & pop arcade dengan timer countdown 60s.
 * 3. Roda Putar Keberuntungan STEAM & Koperasi: Lucky wheel interaktif untuk giliran siswa maju ke IFP.
 */

class IFPGamesEngine {
  constructor() {
    this.currentMode = 'duel'; // 'duel' | 'catch' | 'wheel'
    this.starsEarned = 0;

    // --- State Mode 1: Duel 2 Tim ---
    this.teamA = { name: "Tim Siti (Merah)", score: 0, avatar: "👧" };
    this.teamB = { name: "Tim Beni (Biru)", score: 0, avatar: "👦" };
    this.targetWins = 5;
    this.duelRound = 1;
    this.duelActiveQuestion = null;
    this.isDuelRoundLocked = false;

    // Database Soal Duel IFP (Penjumlahan Kontekstual Koperasi & STEAM)
    this.duelQuestions = [
      {
        q: "Siti beli 10 stik es krim kayu dan 10 stik warna dari Ms. Tammy. Berapa total stik?",
        ans: 20,
        options: [15, 20, 25, 30]
      },
      {
        q: "Beni menata 10 stik mendatar dan 4 stik melintang untuk alas tempat pensil. Berapa stik semuanya?",
        ans: 14,
        options: [12, 14, 16, 18]
      },
      {
        q: "Dinding depan-belakang butuh 20 stik, dinding kanan-kiri butuh 20 stik. Berapa total stik dinding?",
        ans: 40,
        options: [30, 35, 40, 50]
      },
      {
        q: "Siti mewarnai 24 stik kuning, Beni mewarnai 16 stik biru dari koperasi Ms. Tammy. Berapa jumlahnya?",
        ans: 40,
        options: [38, 40, 42, 44]
      },
      {
        q: "Kelompok 1 membuat tempat pensil (50 stik), Kelompok 2 juga (50 stik). Berapa total stik kedua kelompok?",
        ans: 100,
        options: [80, 90, 100, 110]
      },
      {
        q: "Edo memesan 15 stik es krim dan Dayu memesan 12 stik di Koperasi Sekolah. Berapa jumlah pesanan?",
        ans: 27,
        options: [25, 27, 29, 31]
      },
      {
        q: "Ms. Indah membawa 30 stik es krim, lalu membagikan lagi 20 stik. Berapa stik dari Ms. Indah?",
        ans: 50,
        options: [40, 45, 50, 60]
      },
      {
        q: "Udin membeli 1 ikat puluhan (10 stik) dan 8 stik satuan. Berapa banyak stik Udin?",
        ans: 18,
        options: [16, 18, 20, 28]
      },
      {
        q: "Untuk palang pengunci, butuh 2 stik di bawah dan 2 stik di atas alas. Berapa stik pengunci?",
        ans: 4,
        options: [2, 3, 4, 5]
      },
      {
        q: "Di etalase Ms. Tammy ada 35 stik polos dan 25 stik warna. Berapa seluruh stik di etalase?",
        ans: 60,
        options: [50, 55, 60, 65]
      }
    ];

    // --- State Mode 2: Tangkap & Hitung Stik ---
    this.catchTarget = 24;
    this.catchCurrentCount = 0;
    this.catchTens = 0;
    this.catchUnits = 0;
    this.catchTimer = 60;
    this.catchTimerInterval = null;
    this.catchScore = 0;
    this.isCatchRunning = false;

    // --- State Mode 3: Roda Putar Tantangan ---
    this.wheelSlices = [
      { text: "Beli 20 Stik ke Ms. Tammy", color: "#EF4444", icon: "🏪", desc: "Sebutkan kalimat matematika untuk membeli 2 ikat puluhan stik di koperasi!" },
      { text: "Tantangan Alas Ms. Indah", color: "#F59E0B", icon: "📐", desc: "Mengapa alas tempat pensil harus diberi palang melintang pengunci?" },
      { text: "Hitung 4 Sisi Dinding", color: "#10B981", icon: "🪵", desc: "Jika 1 dinding butuh 10 stik, berapa stik untuk 4 dinding persegi?" },
      { text: "Tebak Kata Kunci Bacaan", color: "#3B82F6", icon: "📖", desc: "Apa bedanya informasi 'Diketahui' dan 'Ditanyakan' dalam soal cerita?" },
      { text: "Bonus 3 Bintang Emas ⭐", color: "#8B5CF6", icon: "🌟", desc: "Hore! Kamu dan kelompokmu langsung mendapatkan 3 Bintang Prestasi!" },
      { text: "Misi Kasir Cilik Cepat", color: "#EC4899", icon: "🔔", desc: "Maju ke layar dan hitung pesanan pembeli: 14 + 13 stik!" },
      { text: "Koding Balok Prosedur", color: "#14B8A6", icon: "🤖", desc: "Sebutkan langkah nomor 1 dalam membuat tempat pensil stik es krim!" },
      { text: "Pameran Etalase Koperasi", color: "#F97316", icon: "🏆", desc: "Apa makna gotong royong saat membuat prakarya bersama teman?" }
    ];
    this.wheelRotation = 0;
    this.isWheelSpinning = false;
  }

  // Pilih Mode Permainan IFP
  setMode(mode) {
    this.currentMode = mode;
    if (window.sound) window.sound.playWoodClick();
    this.render();
  }

  // =========================================================================
  // --- MODE 1: DUEL 2 TIM SPLIT-SCREEN IFP ---
  // =========================================================================
  
  startDuelRound() {
    this.isDuelRoundLocked = false;
    // Pilih soal acak
    const randIdx = Math.floor(Math.random() * this.duelQuestions.length);
    this.duelActiveQuestion = this.duelQuestions[randIdx];

    const qTextEl = document.getElementById('ifp-duel-question-text');
    if (qTextEl) qTextEl.textContent = this.duelActiveQuestion.q;

    // Render Tombol Opsi Tim A (Kiri)
    const optionsTeamA = document.getElementById('ifp-duel-options-a');
    if (optionsTeamA) {
      optionsTeamA.innerHTML = this.duelActiveQuestion.options.map(opt => `
        <button onclick="window.ifpGame.handleDuelAnswer('A', ${opt})" 
          class="btn-fun ifp-touch-btn bg-white hover:bg-rose-50 text-rose-900 border-4 border-rose-300 hover:border-rose-500 rounded-3xl text-2xl sm:text-3xl font-black py-4 shadow-lg active:scale-95 transition transform">
          ${opt}
        </button>
      `).join('');
    }

    // Render Tombol Opsi Tim B (Kanan)
    const optionsTeamB = document.getElementById('ifp-duel-options-b');
    if (optionsTeamB) {
      optionsTeamB.innerHTML = this.duelActiveQuestion.options.map(opt => `
        <button onclick="window.ifpGame.handleDuelAnswer('B', ${opt})" 
          class="btn-fun ifp-touch-btn bg-white hover:bg-sky-50 text-sky-900 border-4 border-sky-300 hover:border-sky-500 rounded-3xl text-2xl sm:text-3xl font-black py-4 shadow-lg active:scale-95 transition transform">
          ${opt}
        </button>
      `).join('');
    }

    // Reset status ronde
    const banner = document.getElementById('ifp-duel-round-banner');
    if (banner) {
      banner.className = 'text-xs sm:text-sm font-black text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-200 inline-block';
      banner.textContent = `Ronde ${this.duelRound} • Siapa Cepat dan Tepat!`;
    }
  }

  handleDuelAnswer(team, selectedVal) {
    if (this.isDuelRoundLocked) return;
    const isCorrect = (selectedVal === this.duelActiveQuestion.ans);

    if (isCorrect) {
      this.isDuelRoundLocked = true;
      if (window.sound) {
        window.sound.playSuccess();
        window.sound.playBuzzer();
      }

      if (team === 'A') {
        this.teamA.score++;
      } else {
        this.teamB.score++;
      }

      this.updateDuelScores();

      const banner = document.getElementById('ifp-duel-round-banner');
      if (banner) {
        const winnerName = team === 'A' ? this.teamA.name : this.teamB.name;
        banner.className = 'text-sm sm:text-base font-black text-emerald-800 bg-emerald-100 px-5 py-2 rounded-full border-2 border-emerald-400 inline-block animate-bounce';
        banner.textContent = `🎉 POIN UNTUK ${winnerName.toUpperCase()}! Jawaban: ${this.duelActiveQuestion.ans}`;
      }

      // Cek kemenangan akhir (First to 5 Points)
      if (this.teamA.score >= this.targetWins || this.teamB.score >= this.targetWins) {
        this.finishDuelGame(team);
      } else {
        this.duelRound++;
        setTimeout(() => this.startDuelRound(), 1800);
      }
    } else {
      if (window.sound) window.sound.playOops();
      // Efek tombol salah bergetar
      const banner = document.getElementById('ifp-duel-round-banner');
      if (banner) {
        banner.className = 'text-xs sm:text-sm font-black text-rose-700 bg-rose-100 px-4 py-1.5 rounded-full border border-rose-300 inline-block';
        banner.textContent = `Kurang tepat! Tim lawan masih berkesempatan menjawab!`;
      }
    }
  }

  updateDuelScores() {
    const scoreAEl = document.getElementById('ifp-duel-score-a');
    if (scoreAEl) scoreAEl.textContent = this.teamA.score;

    const scoreBEl = document.getElementById('ifp-duel-score-b');
    if (scoreBEl) scoreBEl.textContent = this.teamB.score;

    // Indikator Bintang Ronde (Bintang 1-5)
    const starsAEl = document.getElementById('ifp-duel-stars-a');
    if (starsAEl) {
      starsAEl.innerHTML = '⭐'.repeat(this.teamA.score) + '⚪'.repeat(Math.max(0, this.targetWins - this.teamA.score));
    }
    const starsBEl = document.getElementById('ifp-duel-stars-b');
    if (starsBEl) {
      starsBEl.innerHTML = '⭐'.repeat(this.teamB.score) + '⚪'.repeat(Math.max(0, this.targetWins - this.teamB.score));
    }
  }

  finishDuelGame(winningTeam) {
    this.starsEarned += 5;
    if (window.sound) {
      window.sound.playFanfare();
    }
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }

    const winner = winningTeam === 'A' ? this.teamA : this.teamB;
    const banner = document.getElementById('ifp-duel-round-banner');
    if (banner) {
      banner.className = 'p-4 rounded-3xl bg-amber-400 text-amber-950 font-black text-lg sm:text-2xl shadow-xl border-4 border-white inline-block animate-pulse';
      banner.innerHTML = `🏆 SELAMAT! ${winner.name.toUpperCase()} JUARA DUEL IFP! 🏆`;
    }

    if (window.appUpdateGlobalStars) window.appUpdateGlobalStars();
  }

  resetDuelGame() {
    this.teamA.score = 0;
    this.teamB.score = 0;
    this.duelRound = 1;
    this.updateDuelScores();
    this.startDuelRound();
    if (window.sound) window.sound.playWoodClick();
  }

  // =========================================================================
  // --- MODE 2: TANGKAP & HITUNG STIK RAKSASA IFP ---
  // =========================================================================

  startCatchGame() {
    this.isCatchRunning = true;
    this.catchTimer = 60;
    this.catchScore = 0;
    this.generateNewCatchTarget();
    this.catchCurrentCount = 0;
    this.catchTens = 0;
    this.catchUnits = 0;
    this.updateCatchUI();

    if (this.catchTimerInterval) clearInterval(this.catchTimerInterval);
    this.catchTimerInterval = setInterval(() => {
      this.catchTimer--;
      const timerEl = document.getElementById('ifp-catch-timer-display');
      if (timerEl) timerEl.textContent = `${this.catchTimer}s`;

      if (this.catchTimer <= 0) {
        clearInterval(this.catchTimerInterval);
        this.finishCatchGame();
      }
    }, 1000);

    if (window.sound) window.sound.playSuccess();
  }

  generateNewCatchTarget() {
    // Angka target puluhan & satuan ramah kelas 2 (14 - 60)
    const targets = [14, 20, 24, 30, 34, 40, 42, 50, 55, 60];
    const rand = targets[Math.floor(Math.random() * targets.length)];
    this.catchTarget = rand;
    const targetEl = document.getElementById('ifp-catch-target-display');
    if (targetEl) targetEl.textContent = this.catchTarget;
  }

  catchAddTens() {
    if (!this.isCatchRunning) return;
    this.catchTens++;
    this.catchCurrentCount = (this.catchTens * 10) + this.catchUnits;
    if (window.sound) window.sound.playWoodClick();
    this.checkCatchGoal();
    this.updateCatchUI();
  }

  catchAddUnits() {
    if (!this.isCatchRunning) return;
    this.catchUnits++;
    this.catchCurrentCount = (this.catchTens * 10) + this.catchUnits;
    if (window.sound) window.sound.playWoodClick();
    this.checkCatchGoal();
    this.updateCatchUI();
  }

  catchResetBasket() {
    this.catchTens = 0;
    this.catchUnits = 0;
    this.catchCurrentCount = 0;
    if (window.sound) window.sound.playWoodClick();
    this.updateCatchUI();
  }

  checkCatchGoal() {
    if (this.catchCurrentCount === this.catchTarget) {
      this.catchScore += 10;
      this.starsEarned += 2;
      if (window.sound) {
        window.sound.playCashRegister();
        window.sound.playSuccess();
      }
      if (typeof confetti === 'function') {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }

      // Animasi target tercapai & beri target baru
      const feedback = document.getElementById('ifp-catch-feedback');
      if (feedback) {
        feedback.className = 'text-emerald-700 font-black text-sm sm:text-base animate-bounce block';
        feedback.textContent = `🎯 TEPAT SEKALI! ${this.catchTarget} Stik Selesai Ditata! +10 Poin!`;
      }

      setTimeout(() => {
        this.generateNewCatchTarget();
        this.catchResetBasket();
        if (feedback) feedback.className = 'hidden';
      }, 1400);

      if (window.appUpdateGlobalStars) window.appUpdateGlobalStars();
    } else if (this.catchCurrentCount > this.catchTarget) {
      if (window.sound) window.sound.playOops();
      const feedback = document.getElementById('ifp-catch-feedback');
      if (feedback) {
        feedback.className = 'text-rose-600 font-bold text-xs sm:text-sm block';
        feedback.textContent = `Lewat! Jumlahnya (${this.catchCurrentCount}) melebihi target (${this.catchTarget}). Klik tombol Kosongkan Keranjang ya!`;
      }
    }
  }

  updateCatchUI() {
    const currentEl = document.getElementById('ifp-catch-current-display');
    if (currentEl) currentEl.textContent = this.catchCurrentCount;

    const scoreEl = document.getElementById('ifp-catch-score-display');
    if (scoreEl) scoreEl.textContent = this.catchScore;

    // Visual Wadah Stik
    const visualBox = document.getElementById('ifp-catch-visual-basket');
    if (visualBox) {
      let html = '';
      for (let i = 0; i < this.catchTens; i++) {
        html += `
          <div class="inline-flex flex-col items-center bg-amber-100 border-4 border-red-500 p-2 rounded-2xl shadow-md m-1 animate-scale-in">
            <div class="flex gap-1">
              ${'<span class="w-2.5 h-12 bg-amber-700 rounded-full inline-block"></span>'.repeat(5)}
            </div>
            <span class="text-xs font-black text-white bg-red-600 px-2 py-0.5 rounded-full mt-1">10</span>
          </div>
        `;
      }
      for (let j = 0; j < this.catchUnits; j++) {
        html += `
          <div class="inline-flex flex-col items-center bg-white border-2 border-amber-400 p-2 rounded-xl shadow-xs m-1 animate-scale-in">
            <span class="w-2.5 h-12 bg-amber-500 rounded-full inline-block"></span>
            <span class="text-[10px] font-bold text-amber-800 mt-1">1</span>
          </div>
        `;
      }
      visualBox.innerHTML = html || '<span class="text-gray-400 font-bold text-sm">Sentuh tombol +10 Puluhan atau +1 Satuan di bawah!</span>';
    }
  }

  finishCatchGame() {
    this.isCatchRunning = false;
    if (window.sound) window.sound.playFanfare();
    const feedback = document.getElementById('ifp-catch-feedback');
    if (feedback) {
      feedback.className = 'p-4 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-lg block';
      feedback.innerHTML = `🏁 WAKTU HABIS! Skor Akhir Kelas: <strong>${this.catchScore} Poin</strong>! Luar biasa!`;
    }
  }

  // =========================================================================
  // --- MODE 3: RODA PUTAR KEBERUNTUNGAN STEAM & KOPERASI (LUCKY WHEEL IFP) ---
  // =========================================================================

  drawWheel() {
    const canvas = document.getElementById('ifp-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 12;
    const numSlices = this.wheelSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    ctx.clearRect(0, 0, width, height);

    // Gambar Juring Roda
    for (let i = 0; i < numSlices; i++) {
      const angle = this.wheelRotation + (i * sliceAngle);
      const slice = this.wheelSlices[i];

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Gambar Teks & Icon
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px Fredoka, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(`${slice.icon} ${slice.text}`, radius - 20, 5);
      ctx.restore();
    }

    // Poros Tengah Emas Roda
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IFP', centerX, centerY);
  }

  spinWheel() {
    if (this.isWheelSpinning) return;
    this.isWheelSpinning = true;

    const modalResult = document.getElementById('ifp-wheel-result-modal');
    if (modalResult) modalResult.classList.add('hidden');

    const totalDegrees = 1800 + Math.random() * 1440; // 5 - 9 Putaran Penuh
    const totalRadians = (totalDegrees * Math.PI) / 180;
    const duration = 4000;
    const startTime = performance.now();
    const initialRotation = this.wheelRotation;

    let lastTick = 0;

    const animateSpin = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Easing cubic out
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.wheelRotation = initialRotation + (totalRadians * easeOut);
      this.drawWheel();

      // Sound ticking
      if (now - lastTick > 90) {
        if (window.sound) window.sound.playWheelTick();
        lastTick = now;
      }

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        this.isWheelSpinning = false;
        this.onWheelStop();
      }
    };

    requestAnimationFrame(animateSpin);
  }

  onWheelStop() {
    const numSlices = this.wheelSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    // Jarum penunjuk berada di arah jam 3 (kanan, angle = 0)
    let normalized = (2 * Math.PI - (this.wheelRotation % (2 * Math.PI))) % (2 * Math.PI);
    const winningIndex = Math.floor(normalized / sliceAngle) % numSlices;
    const winner = this.wheelSlices[winningIndex];

    if (window.sound) {
      window.sound.playCashRegister();
      window.sound.playSuccess();
    }
    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }

    const modalResult = document.getElementById('ifp-wheel-result-modal');
    const resultTitle = document.getElementById('ifp-wheel-result-title');
    const resultDesc = document.getElementById('ifp-wheel-result-desc');

    if (resultTitle) resultTitle.textContent = `${winner.icon} ${winner.text}`;
    if (resultDesc) resultDesc.textContent = winner.desc;
    if (modalResult) modalResult.classList.remove('hidden');

    this.starsEarned += 2;
    if (window.appUpdateGlobalStars) window.appUpdateGlobalStars();
  }

  // --- RENDER MAIN INTERFACE ---
  render() {
    const panelDuel = document.getElementById('ifp-panel-duel');
    const panelCatch = document.getElementById('ifp-panel-catch');
    const panelWheel = document.getElementById('ifp-panel-wheel');

    const btnDuel = document.getElementById('btn-ifp-nav-duel');
    const btnCatch = document.getElementById('btn-ifp-nav-catch');
    const btnWheel = document.getElementById('btn-ifp-nav-wheel');

    if (panelDuel) panelDuel.classList.toggle('hidden', this.currentMode !== 'duel');
    if (panelCatch) panelCatch.classList.toggle('hidden', this.currentMode !== 'catch');
    if (panelWheel) panelWheel.classList.toggle('hidden', this.currentMode !== 'wheel');

    if (btnDuel) {
      btnDuel.className = `btn-fun px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 ${
        this.currentMode === 'duel' ? 'bg-rose-500 text-white shadow-md border-2 border-rose-600' : 'bg-white text-gray-700 hover:bg-slate-100'
      }`;
    }
    if (btnCatch) {
      btnCatch.className = `btn-fun px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 ${
        this.currentMode === 'catch' ? 'bg-amber-500 text-white shadow-md border-2 border-amber-600' : 'bg-white text-gray-700 hover:bg-slate-100'
      }`;
    }
    if (btnWheel) {
      btnWheel.className = `btn-fun px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 ${
        this.currentMode === 'wheel' ? 'bg-purple-600 text-white shadow-md border-2 border-purple-700' : 'bg-white text-gray-700 hover:bg-slate-100'
      }`;
    }

    if (this.currentMode === 'duel') {
      if (!this.duelActiveQuestion) this.startDuelRound();
    } else if (this.currentMode === 'catch') {
      if (!this.isCatchRunning) this.startCatchGame();
    } else if (this.currentMode === 'wheel') {
      setTimeout(() => this.drawWheel(), 50);
    }
  }
}

// Inisialisasi Global
window.IFPGamesEngine = IFPGamesEngine;
