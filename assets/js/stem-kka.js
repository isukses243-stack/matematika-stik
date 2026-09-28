/**
 * KREASI STIK PINTAR - STEAM & KKA Engine
 * Integrasi Bahasa Indonesia (Teks Petunjuk Prosedur),
 * KKA (Koding Blok Algoritma Terurut & Pemecahan Masalah),
 * serta Eksperimen Sains & Rekayasa Sederhana untuk Kelas 2 SD.
 */

class StemKkaEngine {
  constructor() {
    // 5 Langkah Baku Algoritma Teks Petunjuk Pembuatan Tempat Pensil
    this.correctAlgorithm = [
      {
        id: 1,
        code: "BELI_DI_KOPERASI()",
        stepText: "1. Beli stik es krim, lem kayu, dan hiasan di Koperasi Sekolah bersama Ms. Tammy.",
        short: "Beli Bahan di Koperasi",
        category: "Koperasi"
      },
      {
        id: 2,
        code: "BUAT_ALAS(10_STIK)",
        stepText: "2. Susun 10 stik es krim secara mendatar dan rekatkan dengan lem sebagai alas.",
        short: "Susun 10 Stik Alas",
        category: "Alas"
      },
      {
        id: 3,
        code: "BANGUN_DINDING(4x10_STIK)",
        stepText: "3. Rakit 4 dinding tempat pensil, masing-masing menggunakan 10 stik es krim.",
        short: "Rakit 4 Sisi Dinding",
        category: "Rangka"
      },
      {
        id: 4,
        code: "GABUNGKAN_KOTAK()",
        stepText: "4. Rekatkan keempat dinding di atas alas hingga membentuk wadah kotak yang kokoh.",
        short: "Satukan Wadah Kotak",
        category: "Perakitan"
      },
      {
        id: 5,
        code: "HIAS_DAN_ISI()",
        stepText: "5. Hias tempat pensil dengan warna ceria dan masukkan alat tulis ke dalamnya.",
        short: "Beri Warna & Hiasan",
        category: "Finishing"
      }
    ];

    // Status urutan saat ini dalam editor blok koding siswa
    this.currentSlots = [null, null, null, null, null];
    
    // Eksperimen Sains Rekayasa
    this.engineeringTests = [
      {
        id: 'glue_test',
        title: 'Uji Daya Rekat Lem (Sains Bahan)',
        description: 'Bandingkan lem kayu vs lem kertas untuk stik es krim!',
        options: [
          { name: 'Lem Kertas Biasa', result: 'Stik mudah lepas saat diisi pensil karena daya rekatnya lemah untuk serat kayu!', isOptimal: false },
          { name: 'Lem Kayu / Fox Putih', result: 'Sempurna! Lem kayu meresap ke pori-pori stik es krim sehingga tempat pensil sangat kokoh!', isOptimal: true }
        ]
      },
      {
        id: 'structure_test',
        title: 'Uji Palang Penyangga (Rekayasa / Engineering)',
        description: 'Bagaimana agar 10 stik alas tidak mudah terlepas?',
        options: [
          { name: 'Tanpa Palang Tambahan', result: 'Alas mudah patah saat terkena beban pensil yang berat!', isOptimal: false },
          { name: 'Beri 2 Stik Palang Melintang di Bawah', result: 'Hebat! Prinsip rekayasa palang pengunci membuat alas tahan beban hingga puluhan pensil!', isOptimal: true }
        ]
      }
    ];
  }

  // Acak blok algoritma untuk tantangan siswa
  getShuffledBlocks() {
    const shuffled = [...this.correctAlgorithm];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Pasang blok ke slot tertentu
  assignBlockToSlot(blockId, slotIndex) {
    const block = this.correctAlgorithm.find(b => b.id === parseInt(blockId, 10));
    if (!block || slotIndex < 0 || slotIndex >= 5) return false;

    // Bersihkan jika blok sudah ada di slot lain
    const existingIndex = this.currentSlots.findIndex(b => b && b.id === block.id);
    if (existingIndex !== -1) {
      this.currentSlots[existingIndex] = null;
    }

    this.currentSlots[slotIndex] = block;
    if (window.sound) window.sound.playWoodClick();
    return true;
  }

  // Kosongkan slot tertentu
  removeBlockFromSlot(slotIndex) {
    if (slotIndex >= 0 && slotIndex < 5) {
      this.currentSlots[slotIndex] = null;
    }
  }

  resetSlots() {
    this.currentSlots = [null, null, null, null, null];
  }

  // Verifikasi Koding Algoritma (Run Code)
  runAlgorithm() {
    // Periksa apakah semua 5 slot sudah terisi
    const unfilled = this.currentSlots.some(slot => slot === null);
    if (unfilled) {
      return {
        success: false,
        message: "Algoritma belum lengkap! Masih ada slot langkah yang kosong.",
        debugHint: "Tarik atau klik semua 5 kartu petunjuk ke dalam kotak slot langkah ya!"
      };
    }

    // Periksa urutan
    let isCorrectOrder = true;
    for (let i = 0; i < 5; i++) {
      if (this.currentSlots[i].id !== this.correctAlgorithm[i].id) {
        isCorrectOrder = false;
        break;
      }
    }

    if (isCorrectOrder) {
      if (window.sound) {
        window.sound.playSuccess();
        window.sound.playFanfare();
      }
      return {
        success: true,
        message: "Luar Biasa! Algoritma Teks Petunjuk Kamu 100% Benar!",
        debugHint: "Robot perakit sekarang dapat membuat tempat pensil stik es krim dengan sempurna!"
      };
    } else {
      if (window.sound) window.sound.playOops();
      return {
        success: false,
        message: "Oops! Ada langkah yang tertukar posisinya (Bug Algoritma).",
        debugHint: "Ingat urutannya: Siapkan bahan dulu, buat alas, lalu dinding, satukan kotak, dan terakhir menghias!"
      };
    }
  }
}

window.StemKkaEngine = StemKkaEngine;
