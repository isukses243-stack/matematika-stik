/**
 * KREASI STIK PINTAR - Modul Guru, Asesmen & Sertifikat Prestasi
 * RPP Pembelajaran Mendalam (Deep Learning), Modul Ajar Kurikulum Merdeka,
 * Lembar Kerja Peserta Didik (LKPD) Siap Cetak A4, Rubrik Asesmen KKA & STEAM,
 * serta Generator Sertifikat Prestasi Siswa Siap Cetak.
 */

const TEACHER_MODUL_DATA = {
  identitas: {
    sekolah: "SD / MI Fase A",
    mataPelajaran: "Tematik Terpadu (Matematika, Bahasa Indonesia, Seni Rupa, STEAM & KKA)",
    pendekatan: "Deep Learning (Pembelajaran Mendalam) & Project-Based Learning (PjBL)",
    faseKelas: "Fase A / Kelas II (Dua)",
    alokasiWaktu: "4 x 35 Menit (2 Pertemuan Proyek)",
    topik: "Petualangan Soal Cerita Penjumlahan, Belanja Koperasi Sekolah & Rekayasa Tempat Pensil Stik Es Krim",
    guruPengampu: "Ms. Indah, S.Pd.",
    mitraBelajar: "Koperasi Sekolah (Ms. Tammy - Toko Belanja Edukatif & Pembiasaan Karakter Kejujuran/Hemat)"
  },
  deepLearningDimensions: [
    {
      dimensi: "Mindful Learning (Belajar Berkesadaran)",
      deskripsi: "Siswa menyimak teks soal cerita dengan penuh konsentrasi, menemukan kata kunci (apa yang diketahui dan ditanyakan), serta menyadari pentingnya ketelitian dalam mengukur dan menghitung bahan prakarya."
    },
    {
      dimensi: "Meaningful Learning (Belajar Bermakna)",
      deskripsi: "Konsep penjumlahan (puluhan & satuan) dialami secara nyata bukan angka hafalan, melainkan kebutuhan konkret dalam merakit alas kokoh, mendirikan 4 dinding interlocking, dan memperindah wadah pensil."
    },
    {
      dimensi: "Joyful Learning (Belajar Menggembirakan)",
      deskripsi: "Siswa belajar sambil bereksplorasi ceria dengan avatar Siti & Beni, manipulatif meja kerja interaktif, animasi rakit 3D putar 360°, efek audio ketukan stik, dan apresiasi sertifikat bintang."
    }
  ],
  capaianPembelajaran: [
    {
      mapel: "Matematika",
      tp: "Peserta didik dapat menyelesaikan masalah operasional penjumlahan bilangan cacah (puluhan dan satuan) hingga 100 dengan bantuan media konkret manipulatif stik es krim."
    },
    {
      mapel: "Bahasa Indonesia",
      tp: "Peserta didik dapat menyimak dan memahami teks narasi soal cerita, menemukan informasi pokok (diketahui dan ditanya), serta memahami teks petunjuk prosedur kerja."
    },
    {
      mapel: "STEAM / Seni Rupa & Rekayasa",
      tp: "Peserta didik mampu merancang dan merakit konstruksi fungsional (tempat pensil) dengan memadukan kekokohan sambungan lem, keseimbangan 4 sisi, dan keselarasan warna (Art)."
    },
    {
      mapel: "Koding & AI (KKA)",
      tp: "Peserta didik mampu menyusun urutan instruksi sekuensial (algoritma pembuatan) dan menguji kebenaran langkah kerja (debugging sederhana)."
    }
  ],
  rubrikAsesmen: [
    {
      aspek: "Pemahaman Bacaan & Kata Kunci (B. Indonesia)",
      kriteriaSangatBaik: "Mampu menemukan informasi yang diketahui dan ditanyakan dalam soal cerita secara mandiri dan tepat.",
      kriteriaCukup: "Mampu menemukan informasi dengan sedikit arahan atau petunjuk suara.",
      kriteriaPerluBimbingan: "Kesulitan membedakan antara angka yang diketahui dan pertanyaan yang dicari."
    },
    {
      aspek: "Penjumlahan Konseptual (Matematika)",
      kriteriaSangatBaik: "Mampu menyusun kalimat matematika (A + B = C) dan menghitung penjumlahan puluhan/satuan dengan tepat.",
      kriteriaCukup: "Mampu menghitung dengan bantuan visual manipulatif stik di meja hitung.",
      kriteriaPerluBimbingan: "Memerlukan pendampingan intensif guru saat menjumlahkan bilangan di atas 20."
    },
    {
      aspek: "Rekayasa Struktur & Kerapian (STEAM)",
      kriteriaSangatBaik: "Tempat pensil berdiri tegak kokoh, palang alas terkunci rapat, sambungan lem rapi, dan warna estetik.",
      kriteriaCukup: "Wadah berdiri cukup kuat namun penataan lem atau warna stik kurang teratur.",
      kriteriaPerluBimbingan: "Struktur miring, alas renggang, atau stik mudah lepas."
    },
    {
      aspek: "Sikap & Gotong Royong (Karakter)",
      kriteriaSangatBaik: "Aktif bekerja sama, berbagi alat bahan dengan sabar, dan menunjukkan rasa ingin tahu tinggi.",
      kriteriaCukup: "Bekerja sama dengan baik namun sesekali masih perlu diingatkan untuk berbagi.",
      kriteriaPerluBimbingan: "Cenderung bekerja sendiri dan enggan berbagi tugas dengan teman."
    }
  ]
};

// Render Modul Ajar Guru ke Elemen HTML
function renderTeacherModul(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header Modul -->
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md p-1.5 border-2 border-white/40 flex-shrink-0 shadow-md">
              <img src="assets/img/ms-indah.svg" alt="Ms. Indah, S.Pd." class="w-full h-full object-contain">
            </div>
            <div>
              <span class="bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
                Kurikulum Merdeka • Modul Ajar Deep Learning Fase A
              </span>
              <h2 class="text-2xl sm:text-3xl font-black mt-1 font-heading">${TEACHER_MODUL_DATA.identitas.topik}</h2>
              <p class="text-blue-100 text-sm mt-1 max-w-2xl">${TEACHER_MODUL_DATA.identitas.pendekatan} • Guru Pengampu: <strong>${TEACHER_MODUL_DATA.identitas.guruPengampu}</strong> • Alokasi: ${TEACHER_MODUL_DATA.identitas.alokasiWaktu}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="btn-fun bg-white hover:bg-slate-50 text-indigo-700 font-black px-5 py-3 rounded-2xl shadow-md transition flex items-center gap-2">
              🖨️ Cetak Seluruh Dokumen
            </button>
          </div>
        </div>
      </div>

      <!-- Tiga Pilar Pembelajaran Mendalam -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${TEACHER_MODUL_DATA.deepLearningDimensions.map((d, idx) => {
          const colors = [
            { bg: 'bg-amber-50', border: 'border-amber-300', icon: '🧠', tag: 'MINDFUL' },
            { bg: 'bg-emerald-50', border: 'border-emerald-300', icon: '🌱', tag: 'MEANINGFUL' },
            { bg: 'bg-pink-50', border: 'border-pink-300', icon: '🎉', tag: 'JOYFUL' }
          ][idx];
          return `
            <div class="${colors.bg} p-5 rounded-3xl border-2 ${colors.border} shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-2xl">${colors.icon}</span>
                <span class="text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full bg-white shadow-xs text-gray-700 uppercase">${colors.tag}</span>
              </div>
              <h3 class="font-extrabold text-gray-800 text-base font-heading">${d.dimensi}</h3>
              <p class="text-xs text-gray-600 leading-relaxed font-medium">${d.deskripsi}</p>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Capaian & Tujuan Pembelajaran -->
      <div class="card-kid p-6 bg-white space-y-4">
        <h3 class="font-extrabold text-lg text-gray-800 font-heading flex items-center gap-2">
          <span>🎯</span> Capaian & Tujuan Pembelajaran Terpadu
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${TEACHER_MODUL_DATA.capaianPembelajaran.map(cp => `
            <div class="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <span class="text-xs font-black uppercase text-indigo-700 tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">${cp.mapel}</span>
              <p class="text-xs sm:text-sm text-gray-700 mt-2 font-semibold leading-relaxed">${cp.tp}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Sintaks Pembelajaran Terpadu 5 Langkah -->
      <div class="card-kid p-6 bg-white space-y-4">
        <h3 class="font-extrabold text-lg text-gray-800 font-heading flex items-center gap-2">
          <span>📋</span> Langkah-Langkah Pembelajaran Berbasis Proyek (PjBL)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div class="p-3 bg-blue-50 rounded-2xl border border-blue-200">
            <span class="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-1">1</span>
            <p class="text-xs font-bold text-blue-900">Apersepsi Menantang</p>
            <p class="text-[11px] text-gray-600 mt-1">Siswa mengamati Studio 3D dan meja berantakan.</p>
          </div>
          <div class="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span class="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center mb-1">2</span>
            <p class="text-xs font-bold text-amber-900">Literasi Soal Cerita</p>
            <p class="text-[11px] text-gray-600 mt-1">Menemukan kata kunci Diketahui & Ditanyakan.</p>
          </div>
          <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-1">3</span>
            <p class="text-xs font-bold text-emerald-900">Manipulatif Stik</p>
            <p class="text-[11px] text-gray-600 mt-1">Menggabungkan bundel puluhan dan satuan.</p>
          </div>
          <div class="p-3 bg-purple-50 rounded-2xl border border-purple-200">
            <span class="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mb-1">4</span>
            <p class="text-xs font-bold text-purple-900">Koding Prosedur</p>
            <p class="text-[11px] text-gray-600 mt-1">Menyusun 5 algoritma urutan perakitan.</p>
          </div>
          <div class="p-3 bg-rose-50 rounded-2xl border border-rose-200">
            <span class="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center mb-1">5</span>
            <p class="text-xs font-bold text-rose-900">Pameran & Refleksi</p>
            <p class="text-[11px] text-gray-600 mt-1">Uji kekokohan tempat pensil dan cetak sertifikat.</p>
          </div>
        </div>
      </div>

      <!-- Rubrik Asesmen 4 Dimensi -->
      <div class="card-kid p-6 bg-white space-y-4 overflow-x-auto">
        <h3 class="font-extrabold text-lg text-gray-800 font-heading flex items-center gap-2">
          <span>📊</span> Rubrik Asesmen Otentik 4 Dimensi
        </h3>
        <table class="w-full text-left text-xs sm:text-sm text-gray-700 border-collapse">
          <thead>
            <tr class="bg-slate-100 text-gray-800 font-black border-b border-gray-300">
              <th class="p-3 rounded-l-xl">Aspek Penilaian</th>
              <th class="p-3">Sangat Baik (Skor 4)</th>
              <th class="p-3">Cukup (Skor 3)</th>
              <th class="p-3 rounded-r-xl">Perlu Bimbingan (Skor 1-2)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${TEACHER_MODUL_DATA.rubrikAsesmen.map(r => `
              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-gray-900">${r.aspek}</td>
                <td class="p-3 text-xs text-green-800 bg-green-50/60 font-medium">${r.kriteriaSangatBaik}</td>
                <td class="p-3 text-xs text-blue-800 bg-blue-50/60 font-medium">${r.kriteriaCukup}</td>
                <td class="p-3 text-xs text-amber-800 bg-amber-50/60 font-medium">${r.kriteriaPerluBimbingan}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Render Lembar Kerja Peserta Didik (LKPD) Siap Cetak A4
function renderLkpdSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-sm print-page text-gray-800">
      <!-- Kop LKPD Resmi -->
      <div class="border-b-4 border-double border-gray-800 pb-4 mb-6 text-center">
        <h2 class="text-xl sm:text-2xl font-black uppercase tracking-wider text-gray-900 font-heading">
          LEMBAR KERJA PESERTA DIDIK (LKPD) TERPADU
        </h2>
        <p class="text-sm font-extrabold text-indigo-800 mt-1">Matematika (Soal Cerita Penjumlahan) • Bahasa Indonesia • Proyek STEAM Tempat Pensil</p>
        <p class="text-xs text-gray-600 mt-0.5">Kurikulum Merdeka • Fase A • Kelas II (Dua) SD / MI</p>
      </div>

      <!-- Identitas Siswa & Guru -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-300">
        <div>
          <span class="font-extrabold text-gray-700">Nama Peserta Didik:</span>
          <div class="border-b-2 border-dotted border-gray-400 h-6 mt-1"></div>
        </div>
        <div>
          <span class="font-extrabold text-gray-700">Nomor Absen / Kelompok:</span>
          <div class="border-b-2 border-dotted border-gray-400 h-6 mt-1"></div>
        </div>
        <div>
          <span class="font-extrabold text-gray-700">Guru Kelas:</span>
          <p class="font-black text-indigo-800 mt-1">Ms. Indah, S.Pd.</p>
        </div>
      </div>

      <!-- Bagian 1: Soal Cerita Penjumlahan Bertingkat (Matematika & Bahasa Indonesia) -->
      <div class="mb-6 space-y-4">
        <div class="flex items-center gap-2 pb-2 border-b border-gray-200">
          <span class="bg-blue-600 text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-black">A</span>
          <h4 class="font-extrabold text-base text-gray-900 font-heading">
            Membaca & Menyelesaikan Soal Cerita Penjumlahan
          </h4>
        </div>
        <p class="text-xs text-gray-600 italic">Bacalah cerita dengan teliti, tuliskan informasi apa yang Diketahui, Ditanyakan, dan Kalimat Matematikanya:</p>

        <!-- Kasus 1 -->
        <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs sm:text-sm space-y-2">
          <p class="font-bold text-blue-900 leading-relaxed">
            1. Siti membeli 10 stik es krim dari Ms. Tammy di Koperasi Sekolah. Beni membeli 10 stik es krim lagi dari koperasi untuk digabungkan. Berapa jumlah seluruh stik es krim yang dibeli dari koperasi?
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div class="bg-white p-2 rounded-lg border border-blue-100">
              <span class="font-bold text-amber-700">Diketahui:</span>
              <p class="text-gray-500">Stik Siti = 10, Stik Beni = 10</p>
            </div>
            <div class="bg-white p-2 rounded-lg border border-blue-100">
              <span class="font-bold text-sky-700">Ditanyakan:</span>
              <p class="text-gray-500">Jumlah seluruh stik</p>
            </div>
            <div class="bg-white p-2 rounded-lg border border-blue-100">
              <span class="font-bold text-emerald-700">Kalimat Matematika:</span>
              <p class="font-bold text-gray-800">10 + 10 = ........ stik</p>
            </div>
          </div>
        </div>

        <!-- Kasus 2 -->
        <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs sm:text-sm space-y-2">
          <p class="font-bold text-blue-900 leading-relaxed">
            2. Untuk merakit alas tempat pensil, Beni menata 10 stik mendatar. Agar lantainya kokoh, Siti menambahkan 4 stik penyangga melintang di bawahnya. Berapa banyak stik yang dipakai?
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div class="bg-white p-2 rounded-lg border border-blue-100">
              <span class="font-bold text-amber-700">Diketahui:</span>
              <div class="border-b border-dotted border-gray-400 h-5"></div>
            </div>
            <div class="bg-white p-2 rounded-lg border border-blue-100">
              <span class="font-bold text-sky-700">Ditanyakan:</span>
              <div class="border-b border-dotted border-gray-400 h-5"></div>
            </div>
            <div class="bg-white p-2 rounded-lg border border-blue-100">
              <span class="font-bold text-emerald-700">Kalimat Matematika:</span>
              <p class="font-bold text-gray-800">10 + 4 = ........ stik</p>
            </div>
          </div>
        </div>

        <!-- Kasus 3 -->
        <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs sm:text-sm space-y-2">
          <p class="font-bold text-blue-900 leading-relaxed">
            3. Dinding depan dan belakang butuh 20 stik. Dinding samping kanan dan kiri butuh 20 stik lagi. Berapa total stik untuk 4 dinding tempat pensil?
          </p>
          <div class="p-2 bg-white rounded-lg border border-blue-100 text-xs flex items-center justify-between">
            <span class="font-bold text-gray-700">Kalimat Matematika: 20 + 20 =</span>
            <span class="font-black text-indigo-700 text-sm">........ stik (........ Puluhan)</span>
          </div>
        </div>
      </div>

      <!-- Bagian 2: Bahasa Indonesia & KKA (Teks Petunjuk Prosedur) -->
      <div class="mb-6 space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-gray-200">
          <span class="bg-emerald-600 text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-black">B</span>
          <h4 class="font-extrabold text-base text-gray-900 font-heading">
            Teks Petunjuk Kerja (Algoritma Membuat Tempat Pensil)
          </h4>
        </div>
        <p class="text-xs text-gray-600">Urutkan langkah membuat tempat pensil dengan memberi angka 1, 2, 3, 4, atau 5 di dalam kotak lingkaran:</p>

        <div class="grid grid-cols-1 gap-2 text-xs sm:text-sm">
          <div class="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span class="w-8 h-8 rounded-full border-2 border-gray-400 bg-white inline-flex items-center justify-center font-black text-gray-800">[ &nbsp; ]</span>
            <span>Rakit 4 dinding tempat pensil dengan menumpuk stik secara interlocking (selang-seling).</span>
          </div>
          <div class="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span class="w-8 h-8 rounded-full border-2 border-gray-400 bg-white inline-flex items-center justify-center font-black text-gray-800">[ &nbsp; ]</span>
            <span>Siapkan seluruh bahan: stik es krim, lem kayu, dan pewarna ramah anak.</span>
          </div>
          <div class="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span class="w-8 h-8 rounded-full border-2 border-gray-400 bg-white inline-flex items-center justify-center font-black text-gray-800">[ &nbsp; ]</span>
            <span>Warnai stik sesuai pola pilihan dan isi tempat pensil dengan alat tulis rapi.</span>
          </div>
          <div class="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span class="w-8 h-8 rounded-full border-2 border-gray-400 bg-white inline-flex items-center justify-center font-black text-gray-800">[ &nbsp; ]</span>
            <span>Susun 10 stik es krim mendatar lalu pasang palang melintang untuk membuat alas bawah.</span>
          </div>
          <div class="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span class="w-8 h-8 rounded-full border-2 border-gray-400 bg-white inline-flex items-center justify-center font-black text-gray-800">[ &nbsp; ]</span>
            <span>Tempelkan kerangka dinding di atas alas stik dengan lem kayu hingga merekat kuat.</span>
          </div>
        </div>
      </div>

      <!-- Bagian 3: Seni Sketsa STEAM & Refleksi Karakter -->
      <div class="mb-6 space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-gray-200">
          <span class="bg-purple-600 text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-black">C</span>
          <h4 class="font-extrabold text-base text-gray-900 font-heading">
            Desain Seni Warna (Art STEAM) & Refleksi Karakter
          </h4>
        </div>
        <p class="text-xs text-gray-600">Gambarlah desain pola warna stik tempat pensilmu dan jawab pertanyaan refleksi:</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="h-32 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center text-gray-400 text-xs text-center p-3">
            (Area Menggambar Sketsa Motif & Warna Tempat Pensil)
          </div>
          <div class="p-3 bg-purple-50/50 rounded-2xl border border-purple-200 text-xs space-y-2">
            <span class="font-bold text-purple-900">Refleksi Sikap Karakter:</span>
            <p class="text-gray-700">Apa yang kamu lakukan jika teman sekelompokmu kesulitan mengelem stik?</p>
            <div class="border-b border-dotted border-gray-400 h-6"></div>
            <div class="border-b border-dotted border-gray-400 h-6"></div>
          </div>
        </div>
      </div>

      <!-- Lembar Tanda Tangan & Nilai -->
      <div class="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-300 text-center text-xs">
        <div>
          <p class="font-bold text-gray-700">Paraf Orang Tua</p>
          <div class="h-16"></div>
          <p>( .................................... )</p>
        </div>
        <div>
          <p class="font-bold text-gray-700">Nilai & Catatan Guru</p>
          <div class="h-16 flex items-center justify-center">
            <span class="text-2xl font-black text-amber-500">★★★★★</span>
          </div>
          <p class="text-[10px] text-gray-500">Sangat Baik / Cukup / Perlu Bimbingan</p>
        </div>
        <div>
          <p class="font-bold text-gray-700">Guru Pengampu</p>
          <div class="h-16 flex items-center justify-center">
            <img src="assets/img/ms-indah.svg" alt="Ms. Indah, S.Pd." class="w-12 h-12 object-contain">
          </div>
          <p class="font-extrabold text-gray-800">( Ms. Indah, S.Pd. )</p>
        </div>
      </div>
    </div>
  `;
}

// Render Generator Sertifikat Digital Siap Cetak
function renderCertificateSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="card-kid p-6 bg-white space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span class="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase border border-amber-300">
            Apresiasi Siswa Hebat
          </span>
          <h3 class="text-xl sm:text-2xl font-black text-gray-800 font-heading mt-2">
            🏆 Pembuat Sertifikat Bintang Prestasi
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 font-medium">
            Ketik nama siswa dan cetak sertifikat penghargaan resmi untuk memotivasi pembelajaran mendalam!
          </p>
        </div>
        <button id="btn-print-cert" class="btn-fun btn-primary px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-2">
          🖨️ Cetak Sertifikat Siswa
        </button>
      </div>

      <!-- Form Pengisian Sertifikat -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
        <div>
          <label class="font-bold text-gray-700 block mb-1">Nama Siswa:</label>
          <input type="text" id="cert-input-name" value="Siti Alawiyah" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-400 outline-none">
        </div>
        <div>
          <label class="font-bold text-gray-700 block mb-1">Nama Sekolah / Kelas:</label>
          <input type="text" id="cert-input-school" value="SD Negeri Cerdas Ceria • Kelas 2" class="w-full px-3 py-2 rounded-xl border border-gray-300 font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none">
        </div>
        <div>
          <label class="font-bold text-gray-700 block mb-1">Nama Guru Pembimbing:</label>
          <input type="text" id="cert-input-teacher" value="Ms. Indah, S.Pd." class="w-full px-3 py-2 rounded-xl border border-gray-300 font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none">
        </div>
      </div>

      <!-- PREVIEW SERTIFIKAT PRINTABLE -->
      <div id="certificate-printable-card" class="relative p-8 sm:p-12 rounded-3xl border-8 border-amber-400 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-md text-center text-gray-800 space-y-4 overflow-hidden">
        <!-- Sudut Hiasan Emas -->
        <div class="absolute top-2 left-2 text-2xl">✨</div>
        <div class="absolute top-2 right-2 text-2xl">✨</div>
        <div class="absolute bottom-2 left-2 text-2xl">🎨</div>
        <div class="absolute bottom-2 right-2 text-2xl">📐</div>

        <div>
          <span class="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-200/70 px-4 py-1 rounded-full border border-amber-300">
            PENGHARGAAN PEMBELAJARAN MENDALAM
          </span>
          <h2 class="text-2xl sm:text-4xl font-black text-amber-900 mt-3 font-heading tracking-tight">
            SERTIFIKAT BINTANG PRESTASI
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 font-semibold mt-1">Diberikan dengan bangga kepada:</p>
        </div>

        <!-- Nama Siswa yang Membanggakan -->
        <div class="py-2">
          <p id="cert-display-name" class="text-3xl sm:text-5xl font-black text-indigo-700 underline decoration-amber-400 decoration-wavy font-heading">
            Siti Alawiyah
          </p>
          <p id="cert-display-school" class="text-sm font-bold text-gray-600 mt-2">
            SD Negeri Cerdas Ceria • Kelas 2
          </p>
        </div>

        <p class="text-xs sm:text-sm text-gray-700 max-w-xl mx-auto font-medium leading-relaxed">
          Telah berhasil dengan sangat baik menyelesaikan <strong>5 Babak Petualangan Soal Cerita Penjumlahan</strong>, memahami teks petunjuk prosedur, dan merakit <strong>Tempat Pensil Stik Es Krim Kokoh (STEAM)</strong> dengan penuh ketelitian, kreativitas, dan semangat gotong royong!
        </p>

        <!-- Cap Medali Emas -->
        <div class="flex items-center justify-center py-2">
          <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-lg flex items-center justify-center text-3xl">
            🎖️
          </div>
        </div>

        <!-- Tanda Tangan Guru & Tanggal -->
        <div class="grid grid-cols-2 gap-8 pt-4 border-t-2 border-amber-200 text-xs max-w-lg mx-auto">
          <div>
            <p class="text-gray-500 font-semibold">Diberikan Tanggal:</p>
            <p class="font-bold text-gray-800 mt-1" id="cert-display-date">Hari Ini</p>
          </div>
          <div class="flex items-center justify-center gap-2">
            <div class="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-300 p-0.5 flex-shrink-0 shadow-xs">
              <img src="assets/img/ms-indah.svg" alt="Ms. Indah" class="w-full h-full object-contain">
            </div>
            <div class="text-left">
              <p class="text-[11px] text-gray-500 font-semibold">Guru Pembimbing:</p>
              <p class="font-extrabold text-indigo-900 leading-tight text-sm" id="cert-display-teacher">Ms. Indah, S.Pd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listener untuk input live update
  const inputName = document.getElementById('cert-input-name');
  const inputSchool = document.getElementById('cert-input-school');
  const inputTeacher = document.getElementById('cert-input-teacher');
  const displayName = document.getElementById('cert-display-name');
  const displaySchool = document.getElementById('cert-display-school');
  const displayTeacher = document.getElementById('cert-display-teacher');
  const displayDate = document.getElementById('cert-display-date');
  const btnPrintCert = document.getElementById('btn-print-cert');

  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  if (displayDate) displayDate.textContent = today;

  if (inputName && displayName) {
    inputName.addEventListener('input', () => {
      displayName.textContent = inputName.value.trim() || 'Nama Peserta Didik';
    });
  }

  if (inputSchool && displaySchool) {
    inputSchool.addEventListener('input', () => {
      displaySchool.textContent = inputSchool.value.trim() || 'Nama Sekolah';
    });
  }

  if (inputTeacher && displayTeacher) {
    inputTeacher.addEventListener('input', () => {
      displayTeacher.textContent = inputTeacher.value.trim() || 'Guru Pembimbing';
    });
  }

  if (btnPrintCert) {
    btnPrintCert.addEventListener('click', () => {
      window.print();
    });
  }
}

window.renderTeacherModul = renderTeacherModul;
window.renderLkpdSection = renderLkpdSection;
window.renderCertificateSection = renderCertificateSection;
