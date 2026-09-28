/**
 * KREASI STIK PINTAR - Three.js 3D Model Engine
 * Menghadirkan tempat pensil stik es krim 3D interaktif 360°,
 * simulasi rakit puluhan (10 stik per sisi), explode view, & ganti tema warna.
 */

class PencilHolder3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.currentStep = 0; // 0 to 6
    this.totalSticks = 0;
    this.colorTheme = 'rainbow'; // 'rainbow', 'natural', 'pastel', 'ocean'
    this.isAutoRotate = true;
    this.isExploded = false;
    
    // Kelompok Objek 3D
    this.mainGroup = null;
    this.groups = {
      base: null,      // 10 stik alas (step 1)
      wallFront: null, // 10 stik depan (step 2)
      wallRight: null, // 10 stik kanan (step 3)
      wallBack: null,  // 10 stik belakang (step 4)
      wallLeft: null,  // 10 stik kiri (step 5)
      accessories: null// pensil warna & penggaris (step 6)
    };

    this.stickMaterials = {};
    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xF4F9FD);

    // 2. Camera
    const width = this.container.clientWidth || 700;
    const height = this.container.clientHeight || 480;
    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(6, 6, 8);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.style.touchAction = 'none';
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxDistance = 20;
      this.controls.minDistance = 3;
      this.controls.autoRotate = this.isAutoRotate;
      this.controls.autoRotateSpeed = 1.5;
    }

    // 5. Pencahayaan (Lighting)
    this.setupLighting();

    // 6. Siapkan Material
    this.setupMaterials();

    // 7. Bangun Model 3D Tempat Pensil
    this.buildModel();

    // 8. Event Listener Resize
    window.addEventListener('resize', () => this.onWindowResize());

    // 9. Loop Animasi
    this.animate();

    // Default mulai di langkah 0 atau langkah penuh
    this.setStep(5); // Tampilkan utuh di awal
  }

  setupLighting() {
    // Cahaya Lembut Ambien
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    // Cahaya Matahari / Utama
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.bias = -0.001;
    this.scene.add(dirLight);

    // Cahaya Pengisi Aksen Biru Ceria
    const fillLight = new THREE.DirectionalLight(0xE0F2FE, 0.4);
    fillLight.position.set(-6, 4, -6);
    this.scene.add(fillLight);

    // Bayangan Bawah (Shadow Plane)
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.1;
    shadowPlane.receiveShadow = true;
    this.scene.add(shadowPlane);
  }

  // Buat tekstur urat kayu prosedural dengan Canvas HTML5 (0 dependency CORS/File error)
  generateWoodTexture(colorHex, grainOpacity = 0.15) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = colorHex;
    ctx.fillRect(0, 0, 256, 256);

    // Garis serat kayu
    ctx.strokeStyle = `rgba(0,0,0,${grainOpacity})`;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 256; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.bezierCurveTo(i + 8, 80, i - 8, 160, i + 4, 256);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  setupMaterials() {
    // Palet Warna Stik
    this.palettes = {
      rainbow: [
        '#FF5E57', '#FF7F50', '#FFA801', '#FFD32A', '#0BE881',
        '#05C46B', '#00D8D6', '#0FB9B1', '#4BCFFA', '#575FCC'
      ],
      natural: [
        '#E6C280', '#DDB574', '#D2A662', '#C99955', '#DDB574',
        '#E6C280', '#D2A662', '#C99955', '#E6C280', '#DDB574'
      ],
      pastel: [
        '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA',
        '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'
      ],
      ocean: [
        '#00B4D8', '#48CAE4', '#90E0EF', '#ADE8F4', '#0077B6',
        '#023E8A', '#03045E', '#0096C7', '#48CAE4', '#90E0EF'
      ]
    };
  }

  // Buat geometri 1 stik es krim dengan ujung melengkung realistis
  createPopsicleStickMesh(colorHex) {
    const length = 3.2;
    const width = 0.32;
    const thickness = 0.07;
    const radius = width / 2;

    // Bentuk 2D Stik Es Krim dengan Ujung Membulat
    const shape = new THREE.Shape();
    const halfL = (length - width) / 2;

    shape.moveTo(-radius, -halfL);
    shape.lineTo(-radius, halfL);
    shape.absarc(0, halfL, radius, Math.PI, 0, true);
    shape.lineTo(radius, -halfL);
    shape.absarc(0, -halfL, radius, 0, Math.PI, true);

    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    const texture = this.generateWoodTexture(colorHex, 0.12);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      map: texture,
      roughness: 0.65,
      metalness: 0.05
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  buildModel() {
    if (this.mainGroup) {
      this.scene.remove(this.mainGroup);
    }

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    const activeColors = this.palettes[this.colorTheme] || this.palettes.rainbow;
    const stickSpacing = 0.33;
    const halfBox = (10 * stickSpacing) / 2; // ~1.65
    const stickLength = 3.2;
    const halfH = stickLength / 2;

    // --- 1. ALAS BAWAH (10 STIK HORIZONTAL) ---
    this.groups.base = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const stick = this.createPopsicleStickMesh(activeColors[i % activeColors.length]);
      stick.rotation.x = Math.PI / 2; // rebah mendatar
      stick.position.set(0, 0, (i - 4.5) * stickSpacing);
      this.groups.base.add(stick);
    }
    // Tambahkan 2 stik palang penguat di bawah alas (Sains Rekayasa!)
    const crossBar1 = this.createPopsicleStickMesh('#B87333');
    crossBar1.rotation.x = Math.PI / 2;
    crossBar1.rotation.z = Math.PI / 2;
    crossBar1.position.set(-1.1, -0.08, 0);
    this.groups.base.add(crossBar1);

    const crossBar2 = this.createPopsicleStickMesh('#B87333');
    crossBar2.rotation.x = Math.PI / 2;
    crossBar2.rotation.z = Math.PI / 2;
    crossBar2.position.set(1.1, -0.08, 0);
    this.groups.base.add(crossBar2);

    this.mainGroup.add(this.groups.base);

    // --- 2. DINDING DEPAN (10 STIK VERTIKAL) ---
    this.groups.wallFront = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const stick = this.createPopsicleStickMesh(activeColors[(i + 1) % activeColors.length]);
      stick.position.set((i - 4.5) * stickSpacing, halfH, halfBox);
      this.groups.wallFront.add(stick);
    }
    // Palang horizontal pengikat dinding
    const tieFront = this.createPopsicleStickMesh('#C0392B');
    tieFront.rotation.z = Math.PI / 2;
    tieFront.position.set(0, halfH * 0.5, halfBox + 0.08);
    this.groups.wallFront.add(tieFront);
    this.mainGroup.add(this.groups.wallFront);

    // --- 3. DINDING KANAN (10 STIK VERTIKAL) ---
    this.groups.wallRight = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const stick = this.createPopsicleStickMesh(activeColors[(i + 3) % activeColors.length]);
      stick.rotation.y = Math.PI / 2;
      stick.position.set(halfBox, halfH, (i - 4.5) * stickSpacing);
      this.groups.wallRight.add(stick);
    }
    const tieRight = this.createPopsicleStickMesh('#E67E22');
    tieRight.rotation.z = Math.PI / 2;
    tieRight.rotation.y = Math.PI / 2;
    tieRight.position.set(halfBox + 0.08, halfH * 0.5, 0);
    this.groups.wallRight.add(tieRight);
    this.mainGroup.add(this.groups.wallRight);

    // --- 4. DINDING BELAKANG (10 STIK VERTIKAL) ---
    this.groups.wallBack = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const stick = this.createPopsicleStickMesh(activeColors[(i + 5) % activeColors.length]);
      stick.position.set((i - 4.5) * stickSpacing, halfH, -halfBox);
      this.groups.wallBack.add(stick);
    }
    const tieBack = this.createPopsicleStickMesh('#27AE60');
    tieBack.rotation.z = Math.PI / 2;
    tieBack.position.set(0, halfH * 0.5, -halfBox - 0.08);
    this.groups.wallBack.add(tieBack);
    this.mainGroup.add(this.groups.wallBack);

    // --- 5. DINDING KIRI (10 STIK VERTIKAL) ---
    this.groups.wallLeft = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const stick = this.createPopsicleStickMesh(activeColors[(i + 7) % activeColors.length]);
      stick.rotation.y = Math.PI / 2;
      stick.position.set(-halfBox, halfH, (i - 4.5) * stickSpacing);
      this.groups.wallLeft.add(stick);
    }
    const tieLeft = this.createPopsicleStickMesh('#2980B9');
    tieLeft.rotation.z = Math.PI / 2;
    tieLeft.rotation.y = Math.PI / 2;
    tieLeft.position.set(-halfBox - 0.08, halfH * 0.5, 0);
    this.groups.wallLeft.add(tieLeft);
    this.mainGroup.add(this.groups.wallLeft);

    // --- 6. PENSIL WARNA-WARNI & AKSESORIS ---
    this.groups.accessories = new THREE.Group();
    this.createStationeryInside();
    this.mainGroup.add(this.groups.accessories);

    // Pusatkan seluruh kelompok
    this.mainGroup.position.y = 0.1;
  }

  createStationeryInside() {
    // Pensil 1 (Merah)
    const pencil1 = this.createPencil(0.12, 3.8, '#E74C3C', '#F5B041');
    pencil1.position.set(-0.5, 1.8, -0.4);
    pencil1.rotation.z = 0.15;
    pencil1.rotation.x = -0.1;
    this.groups.accessories.add(pencil1);

    // Pensil 2 (Biru)
    const pencil2 = this.createPencil(0.12, 3.6, '#3498DB', '#F5B041');
    pencil2.position.set(0.6, 1.7, 0.3);
    pencil2.rotation.z = -0.18;
    pencil2.rotation.y = 0.4;
    this.groups.accessories.add(pencil2);

    // Spidol Kuning
    const marker = this.createMarker(0.2, 3.4, '#F1C40F');
    marker.position.set(0.2, 1.6, -0.5);
    marker.rotation.z = 0.12;
    marker.rotation.x = 0.15;
    this.groups.accessories.add(marker);

    // Penggaris Kayu Mini
    const rulerGeo = new THREE.BoxGeometry(0.5, 4.2, 0.06);
    const rulerMat = new THREE.MeshStandardMaterial({ color: '#E59866', roughness: 0.7 });
    const ruler = new THREE.Mesh(rulerGeo, rulerMat);
    ruler.position.set(-0.3, 1.9, 0.5);
    ruler.rotation.z = -0.12;
    ruler.rotation.y = 0.3;
    ruler.castShadow = true;
    this.groups.accessories.add(ruler);
  }

  createPencil(radius, height, bodyColor, tipColor) {
    const group = new THREE.Group();

    // Batang Pensil (Hexagonal Cylinder)
    const bodyGeo = new THREE.CylinderGeometry(radius, radius, height * 0.8, 6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = (height * 0.8) / 2;
    body.castShadow = true;
    group.add(body);

    // Ujung Kayu Pensil (Kerucut)
    const tipWoodGeo = new THREE.ConeGeometry(radius, height * 0.16, 6);
    const tipWoodMat = new THREE.MeshStandardMaterial({ color: '#F8C471', roughness: 0.8 });
    const tipWood = new THREE.Mesh(tipWoodGeo, tipWoodMat);
    tipWood.position.y = height * 0.8 + (height * 0.16) / 2;
    tipWood.castShadow = true;
    group.add(tipWood);

    // Mata Pensil (Grafit berwarna)
    const leadGeo = new THREE.ConeGeometry(radius * 0.4, height * 0.05, 6);
    const leadMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.3 });
    const lead = new THREE.Mesh(leadGeo, leadMat);
    lead.position.y = height * 0.8 + height * 0.16;
    group.add(lead);

    return group;
  }

  createMarker(radius, height, capColor) {
    const group = new THREE.Group();
    const bodyGeo = new THREE.CylinderGeometry(radius, radius, height * 0.7, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = (height * 0.7) / 2;
    body.castShadow = true;
    group.add(body);

    const capGeo = new THREE.CylinderGeometry(radius * 1.05, radius * 1.05, height * 0.3, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: capColor, roughness: 0.3 });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = height * 0.7 + (height * 0.3) / 2;
    cap.castShadow = true;
    group.add(cap);

    return group;
  }

  // --- KONTROL TAHAPAN RAKIT BERHITUNG (PULUHAN) ---
  // Step 1: 10 stik (Alas) -> Total 10
  // Step 2: +10 stik (Dinding Depan) -> 10 + 10 = 20
  // Step 3: +10 stik (Dinding Kanan) -> 20 + 10 = 30
  // Step 4: +10 stik (Dinding Belakang) -> 30 + 10 = 40
  // Step 5: +10 stik (Dinding Kiri) -> 40 + 10 = 50 (Wadah Utuh!)
  // Step 6: Tambah Pensil & Aksesoris Hiasan!
  setStep(step) {
    this.currentStep = Math.max(0, Math.min(6, step));
    
    // Tampilkan / Sembunyikan bagian sesuai step
    if (this.groups.base) this.groups.base.visible = (this.currentStep >= 1);
    if (this.groups.wallFront) this.groups.wallFront.visible = (this.currentStep >= 2);
    if (this.groups.wallRight) this.groups.wallRight.visible = (this.currentStep >= 3);
    if (this.groups.wallBack) this.groups.wallBack.visible = (this.currentStep >= 4);
    if (this.groups.wallLeft) this.groups.wallLeft.visible = (this.currentStep >= 5);
    if (this.groups.accessories) this.groups.accessories.visible = (this.currentStep >= 6);

    // Hitung total stik
    const stickCounts = [0, 10, 20, 30, 40, 50, 50];
    this.totalSticks = stickCounts[this.currentStep];

    // Bunyikan ketukan stik kayu
    if (window.sound) {
      window.sound.playWoodClick();
      if (this.currentStep === 5 || this.currentStep === 6) {
        window.sound.playSuccess();
      }
    }

    return {
      step: this.currentStep,
      totalSticks: this.totalSticks,
      stepTitle: this.getStepTitle(this.currentStep),
      mathFormula: this.getMathFormula(this.currentStep)
    };
  }

  getStepTitle(step) {
    switch (step) {
      case 0: return "Tempat Pensil Belum Dirakit (0 Stik)";
      case 1: return "Tahap 1: Memasang Alas Bawah (10 Stik)";
      case 2: return "Tahap 2: Memasang Dinding Depan (+10 Stik)";
      case 3: return "Tahap 3: Memasang Dinding Kanan (+10 Stik)";
      case 4: return "Tahap 4: Memasang Dinding Belakang (+10 Stik)";
      case 5: return "Tahap 5: Memasang Dinding Kiri (+10 Stik - Selesai!)";
      case 6: return "Tahap 6: Mengisi Pensil Warna & Hiasan Kreasi!";
      default: return "";
    }
  }

  getMathFormula(step) {
    switch (step) {
      case 0: return "0 stik";
      case 1: return "10 stik = 1 puluhan (10)";
      case 2: return "10 + 10 = 20 stik (2 puluhan)";
      case 3: return "20 + 10 = 30 stik (3 puluhan)";
      case 4: return "30 + 10 = 40 stik (4 puluhan)";
      case 5: return "40 + 10 = 50 stik (5 puluhan)!";
      case 6: return "Total: 50 stik es krim + 4 alat tulis";
      default: return "";
    }
  }

  nextStep() {
    if (this.currentStep < 6) {
      return this.setStep(this.currentStep + 1);
    }
    return this.setStep(6);
  }

  prevStep() {
    if (this.currentStep > 0) {
      return this.setStep(this.currentStep - 1);
    }
    return this.setStep(0);
  }

  // Ganti Palet Warna Stik
  setColorTheme(themeName) {
    if (this.palettes[themeName]) {
      this.colorTheme = themeName;
      this.buildModel();
      this.setStep(this.currentStep);
    }
  }

  // Toggle Exploded View (Melihat sambungan stik secara transparan/terbuka)
  toggleExplode() {
    this.isExploded = !this.isExploded;
    const distance = this.isExploded ? 1.2 : 0;

    if (this.groups.wallFront) this.groups.wallFront.position.z = distance;
    if (this.groups.wallBack) this.groups.wallBack.position.z = -distance;
    if (this.groups.wallRight) this.groups.wallRight.position.x = distance;
    if (this.groups.wallLeft) this.groups.wallLeft.position.x = -distance;
    if (this.groups.base) this.groups.base.position.y = -distance * 0.7;

    return this.isExploded;
  }

  // Toggle Putar Otomatis 360°
  toggleAutoRotate() {
    this.isAutoRotate = !this.isAutoRotate;
    if (this.controls) {
      this.controls.autoRotate = this.isAutoRotate;
    }
    return this.isAutoRotate;
  }

  // Reset Sudut Kamera
  resetCamera() {
    this.camera.position.set(6, 6, 8);
    if (this.controls) {
      this.controls.target.set(0, 1.5, 0);
      this.controls.update();
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width > 0 && height > 0) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

window.PencilHolder3D = PencilHolder3D;
