/**
 * KREASI STIK PINTAR - Toko Koperasi Cilik Game Engine
 * Mengintegrasikan Kolaborasi Koperasi Sekolah, Perhitungan Soal Cerita Penjumlahan,
 * STEAM Belanja Bahan Tempat Pensil, dan Roleplay Kasir Cilik Kelas 2 SD.
 */

class CooperativeGameEngine {
  constructor() {
    this.currentMode = 'shopping'; // 'shopping' (Belanja Bahan) | 'cashier' (Kasir Cilik)
    this.currentLevel = 1; // 1 to 5
    this.starsEarned = 0;
    this.cart = {
      bundle10: 0,
      stick1: 0,
      glue: 0,
      paint: 0,
      ribbon: 0
    };

    // State Kasir Cilik
    this.cashierScore = 0;
    this.cashierCustomerIndex = 0;
    this.cashierInputValue = '';
    this.cashierTensCount = 0;
    this.cashierUnitsCount = 0;

    // Database Soal Mode Belanja Bahan STEAM (5 Level)
    this.shoppingMissions = [
      {
        level: 1,
        title: "Level 1: Misi Beli Stik Puluhan (Alas Sederhana)",
        buyer: "Siti & Beni",
        buyerAvatar: "👧👦",
        context: "Siti dan Beni menemui Ms. Tammy di Koperasi Sekolah untuk membeli stik es krim perdana.",
        story: "Ms. Tammy menyapa: 'Halo Siti dan Beni! Untuk membuat dasar tempat pensil, kalian butuh stik puluhan.' Siti membeli 1 ikat stik puluhan (10 stik) dan Beni membeli 1 ikat stik puluhan lagi (10 stik). Berapa jumlah stik es krim yang dibeli Siti dan Beni di koperasi?",
        valA: 10,
        valB: 10,
        result: 20,
        equation: "10 + 10 = 20",
        hint: "1 Puluhan (10) + 1 Puluhan (10) = 2 Puluhan (20)",
        options: [15, 20, 25],
        requiredCart: { bundle10: 2, stick1: 0 }
      },
      {
        level: 2,
        title: "Level 2: Tambahan Stik Palang Pengunci & Lem Kayu",
        buyer: "Beni",
        buyerAvatar: "👦",
        context: "Beni kembali ke Koperasi Sekolah untuk membeli bahan penguat agar tempat pensil kokoh.",
        story: "Ms. Tammy berkata: 'Beni, alasmu butuh stik melintang dan lem kayu kuat!' Beni membeli 10 stik es krim kayu dan 4 stik es krim tambahan, ditambah 1 botol lem kayu. Berapa jumlah stik es krim yang dibeli Beni?",
        valA: 10,
        valB: 4,
        result: 14,
        equation: "10 + 4 = 14",
        hint: "1 Puluhan (10) + 4 Satuan (4) = 14",
        options: [12, 14, 18],
        requiredCart: { bundle10: 1, stick1: 4 }
      },
      {
        level: 3,
        title: "Level 3: Belanja Stik Dinding Interlocking (Dua Angka)",
        buyer: "Siti",
        buyerAvatar: "👧",
        context: "Siti membutuhkan stik es krim lebih banyak untuk merakit 4 dinding persegi.",
        story: "Di Koperasi, Siti membeli 21 stik es krim warna merah dan 13 stik es krim warna hijau untuk membuat dinding selang-seling. Berapa jumlah seluruh stik dinding yang dibeli Siti?",
        valA: 21,
        valB: 13,
        result: 34,
        equation: "21 + 13 = 34",
        hint: "Puluhan: 20 + 10 = 30. Satuan: 1 + 3 = 4. Total = 34",
        options: [31, 34, 37],
        requiredCart: { bundle10: 3, stick1: 4 }
      },
      {
        level: 4,
        title: "Level 4: Belanja Paket Seni & Cat (Teknik Menyimpan)",
        buyer: "Siti & Dayu",
        buyerAvatar: "👧🧒",
        context: "Siti mengajak Dayu ke koperasi untuk melengkapi hiasan estetika tempat pensil.",
        story: "Siti membeli 18 stik es krim berukir, sedangkan Dayu membeli 15 stik es krim warna pastel. Berapa total stik es krim hiasan yang mereka beli bersama di Koperasi Ms. Tammy?",
        valA: 18,
        valB: 15,
        result: 33,
        equation: "18 + 15 = 33",
        hint: "Satuan: 8 + 5 = 13 (simpan 1 puluhan, sisa 3 satuan). Puluhan: 1 + 1 + 1 = 3 puluhan. Hasil: 33",
        options: [30, 33, 36],
        requiredCart: { bundle10: 3, stick1: 3 }
      },
      {
        level: 5,
        title: "Level 5: Borong Bahan Akbar untuk Pameran Sekolah",
        buyer: "Siti, Beni & Teman Sekelas",
        buyerAvatar: "👧👦🧒👦",
        context: "Seluruh kelas 2 bersiap menggelar pameran karya tempat pensil di etalase koperasi.",
        story: "Ms. Tammy menyiapkan stok besar: Kelompok 1 membeli 45 stik es krim polos, dan Kelompok 2 membeli 55 stik es krim pelangi untuk membuat tempat pensil raksasa. Berapa jumlah seluruh stik es krim yang dibeli?",
        valA: 45,
        valB: 55,
        result: 100,
        equation: "45 + 55 = 100",
        hint: "Satuan: 5 + 5 = 10 (simpan 1 puluhan). Puluhan: 1 (simpan) + 4 + 5 = 10 puluhan. 10 puluhan = 100 (1 Ratusan)!",
        options: [90, 100, 110],
        requiredCart: { bundle10: 10, stick1: 0 }
      }
    ];

    // Database Pelanggan Mode Kasir Cilik (5 Pembeli Antre)
    this.cashierCustomers = [
      {
        id: 1,
        name: "Edo",
        avatar: "👦",
        tagline: "Siswa Kelas 2A",
        bubble: "Halo Kasir Cilik! Saya mau beli 10 stik es krim kayu dan 10 stik warna untuk alas tempat pensil. Berapa total stik pesanan saya?",
        valA: 10,
        valB: 10,
        result: 20,
        speech: "Halo Kasir Cilik! Saya mau beli sepuluh stik es krim kayu dan sepuluh stik warna untuk alas tempat pensil. Berapa total stik pesanan saya?",
        hint: "10 ditambah 10 sama dengan 20 stik!"
      },
      {
        id: 2,
        name: "Dayu",
        avatar: "👧",
        tagline: "Siswa Kelas 2B",
        bubble: "Permisi Kasir! Saya pesan 14 stik es krim polos dan 12 stik stik es krim hijau untuk dinding. Tolong hitungkan ya!",
        valA: 14,
        valB: 12,
        result: 26,
        speech: "Permisi Kasir! Saya pesan empat belas stik polos dan dua belas stik hijau. Tolong hitungkan ya!",
        hint: "14 ditambah 12: hitung satuan 4 + 2 = 6, puluhan 1 + 1 = 2 puluhan. Jadi 26!"
      },
      {
        id: 3,
        name: "Udin",
        avatar: "👦",
        tagline: "Siswa Kelas 2A",
        bubble: "Hai teman! Saya butuh 20 stik untuk sisi kanan-kiri dan 15 stik untuk sisi depan-belakang. Berapa stik semuanya?",
        valA: 20,
        valB: 15,
        result: 35,
        speech: "Hai teman! Saya butuh dua puluh stik sisi samping dan lima belas stik sisi depan-belakang. Berapa stik semuanya?",
        hint: "20 ditambah 15 sama dengan 35 stik!"
      },
      {
        id: 4,
        name: "Lani",
        avatar: "👧",
        tagline: "Siswa Kelas 2C",
        bubble: "Kasir pintar, saya beli 17 stik es krim pelangi dan 15 stik es krim kuning emas. Berapa jumlah totalnya?",
        valA: 17,
        valB: 15,
        result: 32,
        speech: "Kasir pintar, saya beli tujuh belas stik pelangi dan lima belas stik kuning emas. Berapa jumlah totalnya?",
        hint: "Teknik menyimpan: 7 + 5 = 12 (tulis 2, simpan 1). 1 + 1 + 1 = 3 puluhan. Hasilnya 32!"
      },
      {
        id: 5,
        name: "Budi & Tim",
        avatar: "👦🧑",
        tagline: "Perwakilan Kelompok STEAM",
        bubble: "Wah Koperasi ramai sekali! Kami pesan 30 stik es krim tebal dan 30 stik es krim standar untuk stan pameran. Berapa semuanya?",
        valA: 30,
        valB: 30,
        result: 60,
        speech: "Wah Koperasi ramai sekali! Kami pesan tiga puluh stik tebal dan tiga puluh stik standar. Berapa semuanya?",
        hint: "3 puluhan (30) ditambah 3 puluhan (30) sama dengan 6 puluhan (60 stik)!"
      }
    ];
  }

  // Ganti Mode Permainan: Belanja Bahan vs Kasir Cilik
  setMode(mode) {
    this.currentMode = mode;
    if (window.sound) window.sound.playWoodClick();
    this.render();
  }

  // Pilih Level Belanja Bahan
  selectShoppingLevel(lvl) {
    this.currentLevel = Math.max(1, Math.min(5, lvl));
    this.resetCart();
    if (window.sound) window.sound.playWoodClick();
    this.renderShoppingMission();
  }

  // Tambah item ke Keranjang Belanja
  addToCart(itemKey) {
    if (this.cart.hasOwnProperty(itemKey)) {
      this.cart[itemKey]++;
      if (itemKey === 'bundle10' || itemKey === 'stick1') {
        if (window.sound) window.sound.playWoodClick();
      } else {
        if (window.sound) window.sound.playCoin();
      }
      this.updateCartUI();
    }
  }

  // Kurangi item dari Keranjang Belanja
  removeFromCart(itemKey) {
    if (this.cart[itemKey] > 0) {
      this.cart[itemKey]--;
      if (window.sound) window.sound.playWoodClick();
      this.updateCartUI();
    }
  }

  // Kosongkan keranjang belanja
  resetCart() {
    this.cart = {
      bundle10: 0,
      stick1: 0,
      glue: 0,
      paint: 0,
      ribbon: 0
    };
    this.updateCartUI();
  }

  // Hitung total stik di keranjang belanja
  getTotalSticksInCart() {
    return (this.cart.bundle10 * 10) + this.cart.stick1;
  }

  // Verifikasi Pembelian Belanja Bahan
  checkShoppingAnswer(selectedOption) {
    const mission = this.shoppingMissions[this.currentLevel - 1];
    const isCorrect = (parseInt(selectedOption, 10) === mission.result);

    const feedbackEl = document.getElementById('shop-feedback-box');
    if (!feedbackEl) return;

    if (isCorrect) {
      this.starsEarned += 3;
      if (window.sound) {
        window.sound.playCashRegister();
        window.sound.playSuccess();
      }

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      feedbackEl.className = 'p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-bold block animate-bounce-once';
      feedbackEl.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">🎉</span>
          <span class="text-base font-black">Hebat Sekali! Transaksi Berhasil!</span>
        </div>
        <p class="text-xs sm:text-sm font-medium">
          Ms. Tammy tersenyum ramah: "Perhitunganmu tepat sekali! Kalimat matematikanya: <strong>${mission.equation} stik</strong>."
        </p>
        <div class="mt-3 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs font-black text-amber-800 bg-amber-200 px-3 py-1 rounded-xl">⭐ +3 Bintang Koperasi Didapat!</span>
          <button id="btn-shop-next-level" class="btn-fun bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow">
            ${this.currentLevel < 5 ? 'Lanjut Level Berikutnya ➔' : 'Selamat! Semua Misi Belanja Tuntas 🏆'}
          </button>
        </div>
      `;

      const nextBtn = document.getElementById('btn-shop-next-level');
      if (nextBtn) {
        nextBtn.onclick = () => {
          if (this.currentLevel < 5) {
            this.selectShoppingLevel(this.currentLevel + 1);
          } else {
            alert('Luar biasa! Kamu telah menguasai semua 5 level belanja bahan di Koperasi Sekolah!');
          }
        };
      }

      if (window.appUpdateGlobalStars) window.appUpdateGlobalStars();
    } else {
      if (window.sound) window.sound.playOops();
      feedbackEl.className = 'p-4 rounded-2xl bg-rose-100 border-2 border-rose-400 text-rose-900 font-bold block';
      feedbackEl.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">💡</span>
          <span class="text-base font-black">Yuk Coba Hitung Lagi!</span>
        </div>
        <p class="text-xs sm:text-sm font-medium">
          Ms. Tammy membantumu: "Ingat, ${mission.hint}. Gunakan tombol stik di etalase untuk mempermudah menghitung ya!"
        </p>
      `;
    }
  }

  // --- KASIR CILIK FUNCTIONS ---

  getCurrentCustomer() {
    return this.cashierCustomers[this.cashierCustomerIndex];
  }

  cashierAddTens() {
    this.cashierTensCount++;
    this.updateCashierValueFromSticks();
    if (window.sound) window.sound.playWoodClick();
  }

  cashierAddUnits() {
    this.cashierUnitsCount++;
    this.updateCashierValueFromSticks();
    if (window.sound) window.sound.playWoodClick();
  }

  cashierClearSticks() {
    this.cashierTensCount = 0;
    this.cashierUnitsCount = 0;
    this.cashierInputValue = '';
    if (window.sound) window.sound.playWoodClick();
    this.renderCashierRegister();
  }

  updateCashierValueFromSticks() {
    const total = (this.cashierTensCount * 10) + this.cashierUnitsCount;
    this.cashierInputValue = total > 0 ? total.toString() : '';
    this.renderCashierRegister();
  }

  cashierKeypadPress(num) {
    if (this.cashierInputValue.length < 3) {
      this.cashierInputValue += num.toString();
      if (window.sound) window.sound.playCoin();
      this.renderCashierRegister();
    }
  }

  cashierKeypadBackspace() {
    if (this.cashierInputValue.length > 0) {
      this.cashierInputValue = this.cashierInputValue.slice(0, -1);
      if (window.sound) window.sound.playWoodClick();
      this.renderCashierRegister();
    }
  }

  // Submit Jawaban Kasir Cilik
  submitCashierOrder() {
    const cust = this.getCurrentCustomer();
    const entered = parseInt(this.cashierInputValue, 10);
    const feedbackBox = document.getElementById('cashier-feedback-box');
    if (!feedbackBox) return;

    if (entered === cust.result) {
      this.cashierScore += 10;
      this.starsEarned += 3;

      if (window.sound) {
        window.sound.playCashRegister();
        window.sound.playSuccess();
      }

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      feedbackBox.className = 'p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-bold block animate-bounce-once';
      feedbackBox.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">🔔</span>
          <span class="text-base font-black">KACHING! Pesanan ${cust.name} Benar!</span>
        </div>
        <p class="text-xs sm:text-sm font-medium">
          ${cust.name} berkata: "Terima kasih Kasir Cilik yang teliti! Total pesananku pas <strong>${cust.result} stik</strong>."
        </p>
        <div class="mt-3 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs font-black text-amber-800 bg-amber-200 px-3 py-1 rounded-xl">⭐ +3 Bintang Kasir Didapat!</span>
          <button id="btn-cashier-next-customer" class="btn-fun bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow">
            ${this.cashierCustomerIndex < this.cashierCustomers.length - 1 ? 'Layani Pembeli Berikutnya ➔' : 'Selamat! Kamu Kasir Bintang 5 🏆'}
          </button>
        </div>
      `;

      const nextCustBtn = document.getElementById('btn-cashier-next-customer');
      if (nextCustBtn) {
        nextCustBtn.onclick = () => {
          if (this.cashierCustomerIndex < this.cashierCustomers.length - 1) {
            this.cashierCustomerIndex++;
            this.cashierClearSticks();
            this.renderCashierCustomer();
            if (window.sound) window.sound.playCashRegister();
          } else {
            alert('Hore! Kamu telah sukses melayani semua pembeli di Koperasi Sekolah sebagai Kasir Bintang 5!');
          }
        };
      }

      if (window.appUpdateGlobalStars) window.appUpdateGlobalStars();
    } else {
      if (window.sound) window.sound.playOops();
      feedbackBox.className = 'p-4 rounded-2xl bg-rose-100 border-2 border-rose-400 text-rose-900 font-bold block';
      feedbackBox.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">🤔</span>
          <span class="text-base font-black">Ups, Hitungan Belum Sesuai</span>
        </div>
        <p class="text-xs sm:text-sm font-medium">
          ${cust.name} mengingatkan dengan ramah: "Coba cek lagi ya kasir cilik. ${cust.hint}"
        </p>
      `;
    }
  }

  // --- RENDER METHODS ---

  render() {
    const shopPanel = document.getElementById('game-panel-shopping');
    const cashierPanel = document.getElementById('game-panel-cashier');
    const tabBtnShop = document.getElementById('btn-game-mode-shop');
    const tabBtnCashier = document.getElementById('btn-game-mode-cashier');

    if (this.currentMode === 'shopping') {
      if (shopPanel) shopPanel.classList.remove('hidden');
      if (cashierPanel) cashierPanel.classList.add('hidden');
      if (tabBtnShop) {
        tabBtnShop.className = 'btn-fun px-5 py-2.5 rounded-2xl font-black text-sm bg-amber-500 text-white shadow-md border-2 border-amber-600';
      }
      if (tabBtnCashier) {
        tabBtnCashier.className = 'btn-fun px-5 py-2.5 rounded-2xl font-black text-sm bg-white text-gray-700 hover:bg-slate-100 border-2 border-slate-200';
      }
      this.renderShoppingMission();
    } else {
      if (shopPanel) shopPanel.classList.add('hidden');
      if (cashierPanel) cashierPanel.classList.remove('hidden');
      if (tabBtnShop) {
        tabBtnShop.className = 'btn-fun px-5 py-2.5 rounded-2xl font-black text-sm bg-white text-gray-700 hover:bg-slate-100 border-2 border-slate-200';
      }
      if (tabBtnCashier) {
        tabBtnCashier.className = 'btn-fun px-5 py-2.5 rounded-2xl font-black text-sm bg-indigo-600 text-white shadow-md border-2 border-indigo-700';
      }
      this.renderCashierCustomer();
      this.renderCashierRegister();
    }
  }

  renderShoppingMission() {
    const mission = this.shoppingMissions[this.currentLevel - 1];
    
    // Level Tabs
    const levelTabsContainer = document.getElementById('shop-level-tabs');
    if (levelTabsContainer) {
      levelTabsContainer.innerHTML = this.shoppingMissions.map(m => {
        const isActive = m.level === this.currentLevel;
        return `
          <button onclick="window.coopGame.selectShoppingLevel(${m.level})" 
            class="px-3 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
              isActive 
                ? 'bg-amber-500 text-white shadow-md border-2 border-amber-600' 
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }">
            <span>Level ${m.level}</span>
            <span>⭐</span>
          </button>
        `;
      }).join('');
    }

    // Texts
    const titleEl = document.getElementById('shop-mission-title');
    if (titleEl) titleEl.textContent = mission.title;

    const buyerEl = document.getElementById('shop-buyer-name');
    if (buyerEl) buyerEl.textContent = mission.buyer;

    const buyerAvatarEl = document.getElementById('shop-buyer-avatar');
    if (buyerAvatarEl) buyerAvatarEl.textContent = mission.buyerAvatar;

    const storyEl = document.getElementById('shop-mission-story');
    if (storyEl) storyEl.textContent = mission.story;

    // Reset feedback
    const feedbackEl = document.getElementById('shop-feedback-box');
    if (feedbackEl) {
      feedbackEl.className = 'hidden';
      feedbackEl.innerHTML = '';
    }

    // Options
    const optionsContainer = document.getElementById('shop-quiz-options');
    if (optionsContainer) {
      optionsContainer.innerHTML = mission.options.map(opt => `
        <button onclick="window.coopGame.checkShoppingAnswer(${opt})" 
          class="btn-fun bg-white hover:bg-amber-50 text-gray-800 hover:text-amber-950 font-black text-lg sm:text-xl py-3 px-4 rounded-2xl border-2 border-amber-300 hover:border-amber-500 shadow-sm transition transform hover:-translate-y-1">
          ${opt} Stik
        </button>
      `).join('');
    }

    this.updateCartUI();
  }

  updateCartUI() {
    const countBundle = document.getElementById('cart-count-bundle10');
    if (countBundle) countBundle.textContent = this.cart.bundle10;

    const countStick = document.getElementById('cart-count-stick1');
    if (countStick) countStick.textContent = this.cart.stick1;

    const countGlue = document.getElementById('cart-count-glue');
    if (countGlue) countGlue.textContent = this.cart.glue;

    const countPaint = document.getElementById('cart-count-paint');
    if (countPaint) countPaint.textContent = this.cart.paint;

    const totalSticksEl = document.getElementById('cart-total-sticks-display');
    if (totalSticksEl) {
      const total = this.getTotalSticksInCart();
      const tens = this.cart.bundle10;
      const units = this.cart.stick1;
      totalSticksEl.innerHTML = `
        <strong>${total}</strong> Stik 
        <span class="text-xs font-normal text-amber-800">(${tens} Puluhan + ${units} Satuan)</span>
      `;
    }

    // Visual Display of sticks in Cart
    const sticksDisplay = document.getElementById('cart-visual-sticks-container');
    if (sticksDisplay) {
      let html = '';
      for (let i = 0; i < this.cart.bundle10; i++) {
        html += `
          <div class="inline-flex flex-col items-center bg-amber-100 border-2 border-red-500 px-2 py-1.5 rounded-lg shadow-xs m-1" title="1 Ikat = 10 Stik">
            <div class="flex gap-0.5">
              ${'<span class="w-1.5 h-7 bg-amber-600 rounded-full inline-block"></span>'.repeat(5)}
            </div>
            <span class="text-[10px] font-black text-red-600 mt-0.5 bg-red-100 px-1 rounded">10</span>
          </div>
        `;
      }
      for (let j = 0; j < this.cart.stick1; j++) {
        html += `
          <div class="inline-flex flex-col items-center bg-white border border-amber-400 p-1 rounded-md shadow-xs m-0.5" title="1 Stik Satuan">
            <span class="w-1.5 h-7 bg-amber-500 rounded-full inline-block"></span>
            <span class="text-[9px] font-bold text-amber-800">1</span>
          </div>
        `;
      }
      sticksDisplay.innerHTML = html || '<span class="text-xs text-gray-400 font-medium">Keranjang masih kosong. Klik tombol (+) di etalase toko!</span>';
    }
  }

  // --- KASIR CILIK RENDER ---

  renderCashierCustomer() {
    const cust = this.getCurrentCustomer();
    const custNameEl = document.getElementById('cashier-customer-name');
    if (custNameEl) custNameEl.textContent = cust.name;

    const custTagEl = document.getElementById('cashier-customer-tag');
    if (custTagEl) custTagEl.textContent = cust.tagline;

    const custAvatarEl = document.getElementById('cashier-customer-avatar');
    if (custAvatarEl) custAvatarEl.textContent = cust.avatar;

    const custBubbleEl = document.getElementById('cashier-customer-bubble');
    if (custBubbleEl) custBubbleEl.textContent = cust.bubble;

    const custQueueBadge = document.getElementById('cashier-queue-badge');
    if (custQueueBadge) {
      custQueueBadge.textContent = `Pembeli ${this.cashierCustomerIndex + 1} dari ${this.cashierCustomers.length}`;
    }

    const feedbackBox = document.getElementById('cashier-feedback-box');
    if (feedbackBox) {
      feedbackBox.className = 'hidden';
      feedbackBox.innerHTML = '';
    }
  }

  renderCashierRegister() {
    // LCD Display
    const lcdEl = document.getElementById('cashier-lcd-display');
    if (lcdEl) {
      lcdEl.textContent = this.cashierInputValue || '0';
    }

    // Kasir Sticks Manipulative Visual
    const tensEl = document.getElementById('cashier-tens-display');
    if (tensEl) tensEl.textContent = this.cashierTensCount;

    const unitsEl = document.getElementById('cashier-units-display');
    if (unitsEl) unitsEl.textContent = this.cashierUnitsCount;

    const workbenchVisual = document.getElementById('cashier-workbench-sticks');
    if (workbenchVisual) {
      let html = '';
      for (let i = 0; i < this.cashierTensCount; i++) {
        html += `
          <div class="inline-flex flex-col items-center bg-amber-100 border-2 border-red-500 px-2 py-1.5 rounded-xl shadow-xs m-1 animate-scale-in" title="1 Ikat Puluhan (10 Stik)">
            <div class="flex gap-0.5">
              ${'<span class="w-1.5 h-8 bg-amber-700 rounded-full inline-block"></span>'.repeat(5)}
            </div>
            <span class="text-[10px] font-black text-red-600 mt-0.5 bg-red-100 px-1.5 rounded-full">10</span>
          </div>
        `;
      }
      for (let j = 0; j < this.cashierUnitsCount; j++) {
        html += `
          <div class="inline-flex flex-col items-center bg-white border border-amber-400 p-1.5 rounded-lg shadow-xs m-0.5 animate-scale-in" title="1 Stik Satuan">
            <span class="w-1.5 h-8 bg-amber-500 rounded-full inline-block"></span>
            <span class="text-[9px] font-bold text-amber-800">1</span>
          </div>
        `;
      }
      workbenchVisual.innerHTML = html || '<span class="text-xs text-slate-400 font-medium">Gunakan tombol +10 Stik Puluhan atau +1 Stik Satuan di bawah untuk menyusun pesanan!</span>';
    }
  }

  // Bantu Baca Suara Kasir
  readCustomerSpeech() {
    const cust = this.getCurrentCustomer();
    if (window.sound) {
      window.sound.speak(cust.speech);
    }
  }

  // Bantu Baca Suara Belanja
  readShoppingMission() {
    const mission = this.shoppingMissions[this.currentLevel - 1];
    if (window.sound) {
      window.sound.speak(mission.story);
    }
  }
}

// Inisialisasi Global Game Engine
window.CooperativeGameEngine = CooperativeGameEngine;
