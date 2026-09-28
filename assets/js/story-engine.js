/**
 * KREASI STIK PINTAR - Story Quest Engine
 * Pembelajaran Mendalam (Deep Learning) Berintegrasi:
 * 1. Bahasa Indonesia: Pemahaman Teks Cerita, Kata Kunci (Diketahui/Ditanya), Kosakata STEAM, Audio Narator.
 * 2. Matematika: Penjumlahan Konseptual (Puluhan & Satuan) dengan Manipulatif Digital.
 * 3. STEAM: Proyek Pembuatan Tempat Pensil Stik Es Krim Nyata.
 */

class StoryEngine {
  constructor() {
    this.currentChapterIndex = 0;
    this.currentSubStep = 1; // 1: Baca & Temukan Kata Kunci, 2: Meja Manipulatif Stik, 3: Hitung & Refleksi
    this.solvedChapters = new Set();
    this.totalStars = 0;
    this.highlightActive = false;

    // Meja kerja manipulatif state
    this.basketA = 0;
    this.basketB = 0;
    this.workbenchMerged = false;

    this.chapters = [
      {
        id: 1,
        title: "Babak 1: Misi ke Koperasi Sekolah (Membeli Stik)",
        theme: "Kolaborasi Koperasi & Persiapan Bahan",
        characterA: "Ms. Tammy",
        characterB: "Siti & Beni",
        avatarA: "🏪👩‍🏫",
        avatarB: "👧👦",
        dialogue: "Halo anak-anak hebat! Kata Ms. Indah guru kalian, kelas 2 sedang ada proyek STEAM membuat tempat pensil. Di Koperasi Sekolah, Ms. Tammy punya stik es krim yang bersih dan kuat. Mau ambil berapa stik?",
        storyText: "Siti membeli 10 stik es krim kayu dari Ms. Tammy di Koperasi Sekolah. Beni membeli 10 stik es krim warna-warni dari Ms. Tammy. Jika stik Siti dan Beni digabungkan ke dalam satu wadah kerja, berapa jumlah seluruh stik es krim yang dibeli dari koperasi sekarang?",
        knownText: "Siti membeli 10 stik dari koperasi, dan Beni membeli 10 stik dari koperasi.",
        askText: "Berapa jumlah seluruh stik es krim yang dibeli dari Koperasi Sekolah jika digabungkan?",
        valA: 10,
        valB: 10,
        result: 20,
        operation: "+",
        equation: "10 + 10 = 20",
        options: [15, 20, 25],
        tensExplanation: "1 Puluhan (10) + 1 Puluhan (10) = 2 Puluhan (20 stik)",
        steamInsight: {
          pillar: "S (Sains) & E (Rekayasa)",
          text: "Stik kayu es krim dari koperasi terbuat dari serat kayu alami yang ringan tetapi kokoh. Jika dikumpulkan dan direkatkan, kekuatannya menjadi berkali lipat!"
        },
        vocabulary: [
          { word: "Koperasi Sekolah", meaning: "Toko di lingkungan sekolah tempat warga sekolah membeli alat tulis dan perlengkapan belajar secara hemat dan jujur." },
          { word: "Daur Ulang", meaning: "Memanfaatkan kembali bahan atau stik menjadi barang baru yang berguna." },
          { word: "Digabungkan", meaning: "Disatukan menjadi satu kesatuan yang utuh (penjumlahan)." }
        ],
        reflectionQuestion: "Mengapa kita sebaiknya membeli dan memanfaatkan bahan koperasi sekolah secara bijak?",
        reflectionAnswer: "Karena melatih kita bergotong royong, hemat, jujur, dan mendukung kemajuan sekolah kita bersama!"
      },
      {
        id: 2,
        title: "Babak 2: Merakit Alas Kokoh (Saran Ms. Tammy)",
        theme: "Rekayasa Struktur Lantai Wadah & KKA",
        characterA: "Beni",
        characterB: "Ms. Tammy",
        avatarA: "👦",
        avatarB: "🏪👩‍🏫",
        dialogue: "Kata Ms. Tammy penjaga koperasi, alas tempat pensil harus diberi stik pengunci melintang agar tidak gampang jebol saat diisi pensil berat!",
        storyText: "Beni menyusun 10 stik es krim secara mendatar untuk membuat lantai alas. Agar alasnya tidak goyah dan semakin kuat, sesuai saran Ms. Tammy penjaga koperasi, Siti menambahkan 4 stik penyangga melintang di bagian bawahnya. Berapa banyak stik yang digunakan untuk membuat alas kokoh tersebut?",
        knownText: "Beni memasang 10 stik mendatar (lantai), dan Siti menambah 4 stik palang melintang pengunci.",
        askText: "Berapa banyak stik yang digunakan untuk membuat alas kokoh seluruhnya?",
        valA: 10,
        valB: 4,
        result: 14,
        operation: "+",
        equation: "10 + 4 = 14",
        options: [12, 14, 16],
        tensExplanation: "1 Puluhan (10) + 4 Satuan (4) = 14 stik",
        steamInsight: {
          pillar: "E (Rekayasa / Engineering)",
          text: "Palang melintang berfungsi sebagai kancingan pengunci mekanis. Ini mencegah stik lantai bergeser saat diberi beban pensil yang berat."
        },
        vocabulary: [
          { word: "Alas", meaning: "Bagian dasar paling bawah suatu benda sebagai tempat bertumpu." },
          { word: "Melintang", meaning: "Posisi memotong secara silang atau horizontal." },
          { word: "Kokoh", meaning: "Kuat, tegak, dan tidak mudah goyang atau roboh." }
        ],
        reflectionQuestion: "Apa yang terjadi jika alas tempat pensil dibuat tanpa stik pengunci melintang?",
        reflectionAnswer: "Alas akan mudah retak atau lepas saat mengangkat beban pensil yang banyak."
      },
      {
        id: 3,
        title: "Babak 3: Membangun 4 Dinding Persegi",
        theme: "Konstruksi Interlocking 4 Sisi",
        characterA: "Siti",
        characterB: "Beni",
        avatarA: "👧",
        avatarB: "👦",
        dialogue: "Ms. Tammy di koperasi tersenyum melihat alas kita. Sekarang kita tumpuk 4 dindingnya berselang-seling seperti menyusun bata rumah!",
        storyText: "Untuk membuat dinding bagian depan dan belakang tempat pensil, Siti menyiapkan 20 stik es krim. Lalu untuk dinding samping kanan dan samping kiri, Beni menyiapkan 20 stik es krim lagi. Berapa total stik es krim yang dibutuhkan untuk merakit seluruh keempat dinding tempat pensil?",
        knownText: "Dinding depan dan belakang butuh 20 stik. Dinding samping kanan dan kiri butuh 20 stik.",
        askText: "Berapa total stik es krim untuk keempat dinding tempat pensil?",
        valA: 20,
        valB: 20,
        result: 40,
        operation: "+",
        equation: "20 + 20 = 40",
        options: [30, 40, 50],
        tensExplanation: "2 Puluhan (20) + 2 Puluhan (20) = 4 Puluhan (40 stik)",
        steamInsight: {
          pillar: "T (Teknologi) & M (Matematika)",
          text: "Pola susun kancing silang (interlocking) memaksimalkan luas permukaan kontak lem. 4 dinding persegi sama sisi memberikan kestabilan rotasi terbaik."
        },
        vocabulary: [
          { word: "Interlocking", meaning: "Pola susunan yang saling mengunci satu sama lain agar tidak lepas." },
          { word: "Dinding", meaning: "Bagian penutup sisi samping wadah." },
          { word: "Sisi", meaning: "Garis batas atau bidang permukaan suatu bangun ruang." }
        ],
        reflectionQuestion: "Berapa dinding yang dimiliki oleh sebuah tempat pensil berbentuk prisma segi empat?",
        reflectionAnswer: "Ada 4 dinding tegak (depan, belakang, kanan, kiri) ditambah 1 alas bawah!"
      },
      {
        id: 4,
        title: "Babak 4: Seni Pewarnaan & Pola Cantik",
        theme: "Seni Estetika (Art STEAM) & Penjumlahan Menyimpan",
        characterA: "Ms. Tammy",
        characterB: "Siti",
        avatarA: "🏪👩‍🏫",
        avatarB: "👧",
        dialogue: "Ms. Tammy memberikan rekomendasi cat di koperasi: 'Warna kuning dan biru sangat serasi, anak-anak! Tempat pensil kalian akan tampak ceria dan memukau!'",
        storyText: "Siti mewarnai 24 stik es krim dengan warna kuning cerah dari koperasi. Beni mewarnai 16 stik es krim dengan warna biru samudra untuk pola selang-seling. Berapa jumlah stik berwarna yang mereka siapkan seluruhnya?",
        knownText: "Siti mewarnai 24 stik kuning, dan Beni mewarnai 16 stik biru.",
        askText: "Berapa jumlah seluruh stik berwarna yang disiapkan?",
        valA: 24,
        valB: 16,
        result: 40,
        operation: "+",
        equation: "24 + 16 = 40",
        options: [38, 40, 42],
        tensExplanation: "Satuan: 4 + 6 = 10 (tulis 0, simpan 1 ke puluhan). Puluhan: 1 (simpanan) + 2 + 1 = 4 puluhan. Total = 40 stik!",
        steamInsight: {
          pillar: "A (Art / Seni)",
          text: "Warna kuning dan biru merupakan kombinasi warna yang kontras dan harmonis. Penataan warna berirama melatih kepekaan visual dan kreativitas seni."
        },
        vocabulary: [
          { word: "Pola", meaning: "Bentuk atau susunan yang teratur dan berulang." },
          { word: "Estetika", meaning: "Keindahan susunan warna, bentuk, dan kerapian karya." },
          { word: "Menyimpan", meaning: "Teknik matematika saat jumlah satuan mencapai 10 sehingga menjadi 1 puluhan baru." }
        ],
        reflectionQuestion: "Mengapa kita perlu merencanakan warna stik sebelum menempelkannya?",
        reflectionAnswer: "Agar susunan warna terlihat rapi, serasi, dan membentuk pola yang indah!"
      },
      {
        id: 5,
        title: "Babak 5: Pameran Karya di Etalase Koperasi",
        theme: "Pameran Kelas & Penjumlahan Ratusan",
        characterA: "Ms. Indah & Ms. Tammy",
        characterB: "Siti & Beni",
        avatarA: "👩‍🏫🏪",
        avatarB: "👧👦",
        dialogue: "Ms. Indah dan Ms. Tammy sangat bangga melihat hasil kreasi kalian! 'Bagus sekali! Tempat pensil buatan Siti dan Beni akan kita pajang di etalase kaca depan Koperasi Sekolah!'",
        storyText: "Kelompok Siti menyelesaikan 1 tempat pensil indah menggunakan 50 stik es krim. Kelompok Beni juga menyelesaikan 1 tempat pensil menggunakan 50 stik es krim. Ms. Tammy memajang kedua karya tersebut di etalase Koperasi Sekolah. Berapa jumlah total stik es krim yang dipajang di etalase koperasi?",
        knownText: "Kelompok Siti memakai 50 stik, dan Kelompok Beni memakai 50 stik.",
        askText: "Berapa jumlah total stik es krim yang dipajang di etalase koperasi?",
        valA: 50,
        valB: 50,
        result: 100,
        operation: "+",
        equation: "50 + 50 = 100",
        options: [90, 100, 110],
        tensExplanation: "5 Puluhan (50) + 5 Puluhan (50) = 10 Puluhan = 1 Ratusan (100 stik)!",
        steamInsight: {
          pillar: "STEAM Holistik & Kewirausahaan",
          text: "Dari stik es krim sederhana di koperasi sekolah, perpaduan matematika, sains kayu, rekayasa sambungan, dan seni warna menghasilkan karya bernilai guna tinggi dan membanggakan."
        },
        vocabulary: [
          { word: "Etalase", meaning: "Lemari kaca tempat memajang barang atau karya kerajinan agar mudah dilihat orang." },
          { word: "Pameran", meaning: "Kegiatan memperlihatkan hasil karya kepada teman, guru, dan orang tua." },
          { word: "Ratusan", meaning: "Nilai bilangan kelipatan seratus yang terdiri dari 10 ikatan puluhan." }
        ],
        reflectionQuestion: "Sikap apa yang paling penting saat membuat prakarya bersama teman sekelompok?",
        reflectionAnswer: "Saling tolong-menolong, sabar berbagi tugas, dan teliti dalam menghitung dan mengelem!"
      }
    ];
  }

  getCurrentChapter() {
    return this.chapters[this.currentChapterIndex];
  }

  selectChapter(index) {
    if (index >= 0 && index < this.chapters.length) {
      this.currentChapterIndex = index;
      this.currentSubStep = 1;
      this.resetManipulatives();
      if (window.sound) window.sound.playWoodClick();
      return true;
    }
    return false;
  }

  resetManipulatives() {
    const ch = this.getCurrentChapter();
    this.basketA = ch.valA;
    this.basketB = ch.valB;
    this.workbenchMerged = false;
  }

  nextSubStep() {
    if (this.currentSubStep < 3) {
      this.currentSubStep++;
      if (window.sound) window.sound.playWoodClick();
      return true;
    }
    return false;
  }

  prevSubStep() {
    if (this.currentSubStep > 1) {
      this.currentSubStep--;
      if (window.sound) window.sound.playWoodClick();
      return true;
    }
    return false;
  }

  mergeWorkbenchSticks() {
    this.workbenchMerged = true;
    if (window.sound) window.sound.playSuccess();
  }

  submitAnswer(selectedAnswer) {
    const ch = this.getCurrentChapter();
    const isCorrect = (parseInt(selectedAnswer, 10) === ch.result);
    if (isCorrect) {
      this.solvedChapters.add(ch.id);
      this.totalStars += 3;
      if (window.sound) window.sound.playSuccess();
      return {
        success: true,
        message: `Luar Biasa! Jawabanmu Tepat: ${ch.equation} stik!`,
        starsAwarded: 3,
        explanation: ch.tensExplanation
      };
    } else {
      if (window.sound) window.sound.playOops();
      return {
        success: false,
        message: `Kurang tepat, ayo coba lagi! Ingat: ${ch.valA} + ${ch.valB}`,
        hint: `Coba gabungkan stik pada Meja Kerja (Langkah 2) untuk membuktikannya!`
      };
    }
  }

  toggleHighlight() {
    this.highlightActive = !this.highlightActive;
    return this.highlightActive;
  }
}

window.StoryEngine = StoryEngine;
