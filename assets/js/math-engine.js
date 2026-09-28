/**
 * KREASI STIK PINTAR - Math Engine (Matematika Kelas 2 SD)
 * Penjumlahan Puluhan, Konsep Bundel 10 Stik, Papan Nilai Tempat,
 * Penjumlahan Menyimpan & Tanpa Menyimpan, serta Kuis Interaktif.
 */

class MathEngine {
  constructor() {
    this.totalSticks = 0;
    this.quizScore = 0;
    this.quizStreak = 0;
    this.currentQuizIndex = 0;
    this.filterMode = 'all'; // 'all', 'pure-tens', 'mixed', 'regrouping'

    this.allQuestions = [
      // Kategori 1: Puluhan Utuh (Kelipatan 10)
      {
        id: 1,
        type: 'pure-tens',
        question: "Dinding depan tempat pensil membutuhkan 10 stik. Dinding belakang juga membutuhkan 10 stik. Berapa jumlah stik keduanya?",
        tensA: 10,
        tensB: 10,
        correct: 20,
        options: [15, 20, 30],
        clue: "1 puluhan + 1 puluhan = 2 puluhan (20)!"
      },
      {
        id: 2,
        type: 'pure-tens',
        question: "Beni sudah merakit 20 stik untuk alas dan dinding. Lalu Beni menambahkan 20 stik lagi untuk dinding atas. Berapa jumlah seluruh stik Beni?",
        tensA: 20,
        tensB: 20,
        correct: 40,
        options: [30, 40, 50],
        clue: "2 puluhan + 2 puluhan = 4 puluhan (40)!"
      },
      {
        id: 3,
        type: 'pure-tens',
        question: "Untuk membuat 1 tempat pensil utuh dibutuhkan 40 stik dinding dan 10 stik alas. Berapa total stik es krim yang dibutuhkan?",
        tensA: 40,
        tensB: 10,
        correct: 50,
        options: [45, 50, 60],
        clue: "40 ditambah 10 sama dengan 50!"
      },
      {
        id: 4,
        type: 'pure-tens',
        question: "Siti memiliki 30 stik es krim warna merah dan 30 stik es krim warna kuning. Berapa banyak stik Siti semuanya?",
        tensA: 30,
        tensB: 30,
        correct: 60,
        options: [50, 60, 70],
        clue: "3 puluhan + 3 puluhan = 6 puluhan (60)!"
      },
      {
        id: 5,
        type: 'pure-tens',
        question: "Dua kelompok siswa masing-masing membuat 1 tempat pensil yang menghabiskan 50 stik. Berapa total stik kedua kelompok? (50 + 50)",
        tensA: 50,
        tensB: 50,
        correct: 100,
        options: [80, 90, 100],
        clue: "5 puluhan + 5 puluhan = 10 puluhan = 1 Ratusan (100)!"
      },

      // Kategori 2: Puluhan & Satuan (Tanpa Menyimpan)
      {
        id: 6,
        type: 'mixed',
        question: "Beni menyusun 10 stik untuk lantai alas, lalu Siti menambahkan 4 stik penyangga pengunci. Berapa jumlah seluruh stik alas?",
        tensA: 10,
        tensB: 4,
        correct: 14,
        options: [12, 14, 16],
        clue: "1 puluhan (10) + 4 satuan (4) = 14 stik!"
      },
      {
        id: 7,
        type: 'mixed',
        question: "Lani memiliki 22 stik es krim hijau dan Edo membawa 15 stik es krim jingga. Berapa banyak stik keduanya jika digabung? (22 + 15)",
        tensA: 22,
        tensB: 15,
        correct: 37,
        options: [35, 37, 40],
        clue: "Satuan: 2 + 5 = 7. Puluhan: 2 + 1 = 3. Jadi totalnya 37 stik!"
      },
      {
        id: 8,
        type: 'mixed',
        question: "Dayu menempelkan 31 stik untuk kerangka wadah. Lalu Udin menempelkan 14 stik tambahan. Berapa jumlah stik sekarang? (31 + 14)",
        tensA: 31,
        tensB: 14,
        correct: 45,
        options: [43, 45, 48],
        clue: "Satuan: 1 + 4 = 5. Puluhan: 3 + 1 = 4. Jadi 45 stik!"
      },

      // Kategori 3: Penjumlahan dengan Teknik Menyimpan
      {
        id: 9,
        type: 'regrouping',
        question: "Siti menyiapkan 24 stik es krim kuning dan Beni menyiapkan 16 stik es krim biru untuk hiasan pola. Berapa jumlah stik mereka? (24 + 16)",
        tensA: 24,
        tensB: 16,
        correct: 40,
        options: [38, 40, 42],
        clue: "Satuan 4 + 6 = 10 (simpan 1 puluhan). Puluhan 1 + 2 + 1 = 4 puluhan = 40 stik!"
      },
      {
        id: 10,
        type: 'regrouping',
        question: "Beni mengecat 28 stik warna ungu dan Siti mengecat 15 stik warna merah muda. Berapa jumlah seluruh stik yang dicat? (28 + 15)",
        tensA: 28,
        tensB: 15,
        correct: 43,
        options: [41, 43, 45],
        clue: "Satuan 8 + 5 = 13 (simpan 1 ke puluhan). Puluhan 1 + 2 + 1 = 4. Hasilnya 43 stik!"
      }
    ];

    this.quizQuestions = [...this.allQuestions];
  }

  setFilterMode(mode) {
    this.filterMode = mode;
    if (mode === 'all') {
      this.quizQuestions = [...this.allQuestions];
    } else {
      this.quizQuestions = this.allQuestions.filter(q => q.type === mode);
    }
    this.currentQuizIndex = 0;
  }

  // Tambah stik ke simulator nilai tempat
  addSticks(count) {
    this.totalSticks = Math.max(0, Math.min(100, this.totalSticks + count));
    if (window.sound) window.sound.playWoodClick();
    return this.getValuePlaceData();
  }

  resetSticks() {
    this.totalSticks = 0;
    if (window.sound) window.sound.playWoodClick();
    return this.getValuePlaceData();
  }

  // Hitung berapa puluhan dan satuan
  getValuePlaceData() {
    const tens = Math.floor(this.totalSticks / 10);
    const ones = this.totalSticks % 10;
    return {
      total: this.totalSticks,
      tens: tens,
      ones: ones,
      tensValue: tens * 10,
      textExplanation: `${this.totalSticks} = ${tens} Puluhan (${tens * 10}) + ${ones} Satuan (${ones})`
    };
  }

  // Dapatkan soal kuis saat ini
  getCurrentQuiz() {
    if (this.quizQuestions.length === 0) return null;
    return this.quizQuestions[this.currentQuizIndex % this.quizQuestions.length];
  }

  // Validasi jawaban kuis
  answerQuiz(selectedAnswer) {
    const quiz = this.getCurrentQuiz();
    if (!quiz) return { isCorrect: false };

    const isCorrect = (parseInt(selectedAnswer, 10) === quiz.correct);

    if (isCorrect) {
      this.quizScore += 20;
      this.quizStreak += 1;
      if (window.sound) window.sound.playSuccess();
    } else {
      this.quizStreak = 0;
      if (window.sound) window.sound.playOops();
    }

    return {
      isCorrect: isCorrect,
      correctAnswer: quiz.correct,
      clue: quiz.clue,
      score: this.quizScore,
      streak: this.quizStreak
    };
  }

  nextQuiz() {
    this.currentQuizIndex++;
    return this.getCurrentQuiz();
  }

  resetQuiz() {
    this.quizScore = 0;
    this.quizStreak = 0;
    this.currentQuizIndex = 0;
    return this.getCurrentQuiz();
  }
}

window.MathEngine = MathEngine;
