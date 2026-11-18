import { 
  TemplateDefinition, 
  ActivityModule, 
  MaterialItem, 
  FieldMonitoringLog, 
  AnomalyEvaluation 
} from '../types/dashboard';

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  {
    id: 'survey-census',
    name: 'Operasional Sensus & Survei Lapangan',
    badge: 'Statistik & Riset',
    subtitle: 'Pemantauan cacah jiwa, survei sosial ekonomi, & audit validitas kuesioner',
    description: 'Cocok untuk lembaga statistik, lembaga riset opini, kementerian, atau enumerasi lapangan skala massal dengan deteksi anomali wawancara kilat dan outliers pengeluaran.',
    targetIndustry: 'Badan Statistik, Riset Pasar, Sensus Wilayah, NGO',
    recommendedFor: 'Organisasi dengan tim enumerator/pencacah banyak dan butuh verifikasi data ketat.',
    accentColor: 'indigo',
    highlights: [
      'Deteksi outlier Z-Score durasi wawancara & angka konsumsi',
      'Manajemen buku pedoman & kuesioner digital CAPI',
      'Monitoring per blok sensus / rukun tetangga',
      'Verifikasi kepatuhan koordinat GPS responden'
    ],
    defaultActivitiesCount: 3
  },
  {
    id: 'construction-infra',
    name: 'Pengawasan Proyek & Konstruksi Lapangan',
    badge: 'Teknik & Infrastruktur',
    subtitle: 'Monitoring fisik mingguan, kepatuhan K3, & deteksi deviasi material',
    description: 'Didesain untuk manajemen proyek konstruksi, inspeksi lapangan sipil/mekanikal, dan pemantauan deviasi jadwal kurva-S serta anomali uji mutu beton.',
    targetIndustry: 'Kontraktor, Konsultan Pengawas, Dinas PU, Pengembang Properti',
    recommendedFor: 'Proyek dengan banyak titik pekerjaan fisik yang butuh audit mutu dan kepatuhan SOP K3.',
    accentColor: 'amber',
    highlights: [
      'Deteksi lonjakan deviasi volume material & uji kuat tekan',
      'Penyimpanan DED, Shop Drawing & SOP K3',
      'Monitoring harian cuaca dan progres fisik pekerja',
      'Audit ketidaksesuaian spesifikasi teknik lapangan'
    ],
    defaultActivitiesCount: 3
  },
  {
    id: 'community-training',
    name: 'Pemberdayaan Komunitas & Pelatihan Vokasi',
    badge: 'CSR & Pelatihan',
    subtitle: 'Tracking peserta binaan, modul pembelajaran, & evaluasi capaian pre-post test',
    description: 'Dirancang untuk program pelatihan tenaga kerja, pendampingan petani/UMKM binaan, dan pemberdayaan masyarakat dengan deteksi outlier ketidakhadiran dan disparitas nilai.',
    targetIndustry: 'Yayasan CSR, Balai Latihan Kerja (BLK), Dinas Koperasi & UMKM',
    recommendedFor: 'Pengelola program edukasi dan pemberdayaan dengan materi ajar bertingkat.',
    accentColor: 'emerald',
    highlights: [
      'Pusat modul presentasi, kurikulum, & lembar kerja peserta',
      'Monitoring log kunjungan fasilitator/mentor lapangan',
      'Deteksi anomali kehadiran drop drastis & manipulasi post-test',
      'Evaluasi distribusi bantuan sarana produksi'
    ],
    defaultActivitiesCount: 3
  },
  {
    id: 'quality-compliance',
    name: 'Audit Mutu & Kepatuhan Cabang Operasional',
    badge: 'Quality & Audit',
    subtitle: 'Inspeksi berkala outlet, kepatuhan SOP, & deteksi anomali selisih kas/skor',
    description: 'Dioptimalkan untuk jaringan ritel, perbankan, restoran waralaba, atau klinik dengan audit berkala terhadap ratusan cabang dan deteksi anomali skor mendadak turun.',
    targetIndustry: 'Retail Chain, F&B Network, Perbankan/Microfinance, Jaringan Klinik',
    recommendedFor: 'Bisnis multi-cabang yang butuh standarisasi SOP dan pencegahan fraud operasional.',
    accentColor: 'cyan',
    highlights: [
      'Matriks checklist audit standar higienitas & SOP keuangan',
      'Monitoring inspeksi mendadak (mystery shopper) dan berkala',
      'Deteksi lonjakan selisih kas fisik vs mutasi kasir',
      'Audit log investigasi cabang zona berisiko'
    ],
    defaultActivitiesCount: 3
  }
];

// --- TEMPLATE 1 DATA: SENSUS & SURVEI LAPANGAN ---
export const SURVEY_ACTIVITIES: ActivityModule[] = [
  {
    id: 'act-susenas',
    code: 'SUSENAS-26',
    title: 'Survei Sosial Ekonomi Nasional (SUSENAS)',
    description: 'Pengumpulan data pengeluaran rumah tangga, kesehatan, pendidikan, dan kondisi ketenagakerjaan di 12 kabupaten binaan.',
    category: 'Survei Sosial Ekonomi',
    icon: 'BarChart3',
    pic: {
      name: 'Dr. Hendra Gunawan, M.Si',
      role: 'Koordinator Statistik Kesejahteraan',
      phone: '+62 812-4421-9981',
      email: 'hendra.gunawan@ops-statistik.id'
    },
    targetGoal: 2400,
    targetUnit: 'Rumah Tangga',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 1
  },
  {
    id: 'act-tani',
    code: 'SENSUS-TANI',
    title: 'Pendataan Usaha Pertanian & Ketahanan Pangan',
    description: 'Registrasi geospasial petak lahan tani, produktivitas gabah per hektar, dan kepemilikan alat mesin pertanian (alsintan).',
    category: 'Sensus Sektoral',
    icon: 'MapPin',
    pic: {
      name: 'Ratih Purwasih, S.P',
      role: 'Lead Field Supervisor Wilayah II',
      phone: '+62 813-8871-3320',
      email: 'ratih.purwasih@ops-pertanian.id'
    },
    targetGoal: 1850,
    targetUnit: 'Petani & Poktan',
    startDate: '2026-09-15',
    endDate: '2026-12-15',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 2
  },
  {
    id: 'act-desa',
    code: 'GEO-DESA',
    title: 'Pemetaan Fasilitas Dasar Desa & Sanitasi',
    description: 'Verifikasi fisik titik koordinat puskesmas pembantu, sumber air bersih, dan akses jalan poros desa di 48 kelurahan.',
    category: 'Pemetaan Infrastruktur',
    icon: 'Layers',
    pic: {
      name: 'Bagus Wicaksono, S.T',
      role: 'GIS & Field Verification Specialist',
      phone: '+62 856-7721-0043',
      email: 'bagus.wicaksono@ops-pemetaan.id'
    },
    targetGoal: 650,
    targetUnit: 'Fasilitas Publik',
    startDate: '2026-10-10',
    endDate: '2026-11-25',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 3
  }
];

export const SURVEY_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-s1',
    activityId: 'act-susenas',
    title: 'Buku Pedoman Pencacahan Rumah Tangga SUSENAS 2026',
    category: 'Pedoman Lapangan',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    version: 'v2.4',
    updatedAt: '2026-10-05',
    uploader: 'Tim Metodologi Pusat',
    downloadsCount: 342,
    description: 'Panduan teknis langkah wawancara mendalam, definisi operasional konsumsi komoditas makanan dan non-makanan, serta klasifikasi pekerjaan.',
    summaryContent: 'Pedoman standar memuat 7 bab utama: Bab 1 Konsep Rumah Tangga; Bab 2 Tata Cara Pencacahan & Etika Responden; Bab 3 Modul Konsumsi Makanan 210 Rincian; Bab 4 Modul Pengeluaran Non-Makanan; Bab 5 Validasi Silang Tabungan & Kredit; Bab 6 Batasan Durasi Wawancara Ideal (45-90 menit); Bab 7 Prosedur Resurvei Lapangan.',
    tags: ['Pedoman', 'SUSENAS', 'Wawancara', 'Responden']
  },
  {
    id: 'mat-s2',
    activityId: 'act-susenas',
    title: 'Kuesioner Inti Model K-01 & Lembar Validasi Pengeluaran',
    category: 'Kuesioner / Formulir',
    fileType: 'xlsx',
    fileSize: '1.2 MB',
    version: 'v1.8',
    updatedAt: '2026-10-12',
    uploader: 'Divisi Instrumen Digital',
    downloadsCount: 512,
    description: 'Template formulir digital CAPI dengan formula validasi otomatis rentang konsumsi, logika usia nikah, dan pengeluaran minimum beras.',
    summaryContent: 'Spreadsheet terstruktur berisi formula validasi otomatis (IF, IQR range limits, Z-Score flag) untuk mencegah pencacah memasukkan data nol pada beras pokok atau durasi < 20 menit.',
    tags: ['Formulir', 'CAPI', 'Validasi', 'Excel']
  },
  {
    id: 'mat-s3',
    activityId: 'act-susenas',
    title: 'SOP Penanganan Responden Menolak & Protokol Resurvei',
    category: 'SOP & Regulasi',
    fileType: 'pdf',
    fileSize: '1.5 MB',
    version: 'v1.1',
    updatedAt: '2026-09-28',
    uploader: 'Biro Hukum & Tata Laksana',
    downloadsCount: 189,
    description: 'Prosedur hukum dan persuasif pendekatan ketua RT/RW setempat ketika responden utama menolak didata atau sulit ditemui lebih dari 3 kali.',
    summaryContent: 'Tata laksana resmi: (1) Form berita acara non-respon (Form NR-01); (2) Eskalasi ke Pengawas Lapangan (PML); (3) Pendampingan oleh perangkat desa setempat; (4) Penggantian sampel cadangan terverifikasi.',
    tags: ['SOP', 'Regulasi', 'Non-Respon', 'Legal']
  },
  {
    id: 'mat-s4',
    activityId: 'act-tani',
    title: 'Panduan Identifikasi Lahan Sawah & Pengukuran Poligon GPS',
    category: 'Pedoman Lapangan',
    fileType: 'pdf',
    fileSize: '8.4 MB',
    version: 'v3.0',
    updatedAt: '2026-09-18',
    uploader: 'Unit Geospasial Wilayah',
    downloadsCount: 275,
    description: 'Petunjuk kalibrasi sensor GPS smartphone, batas akurasi satelit minimal 5 meter, dan teknik penitikan poligon petak pematang sawah.',
    summaryContent: 'Berisi langkah kalibrasi GPS pada aplikasi CAPI, ambang batas akurasi (HDOP < 2.0), pengambilan minimal 6 waypoint per petak, dan perhitungan luas otomatis secara geodesi.',
    tags: ['GPS', 'Geospasial', 'Sawah', 'Alsintan']
  },
  {
    id: 'mat-s5',
    activityId: 'act-desa',
    title: 'Katalog Standar Simbol Infrastruktur Desa & Master Data Fasilitas',
    category: 'Data Referensi',
    fileType: 'xlsx',
    fileSize: '3.1 MB',
    version: 'v2.0',
    updatedAt: '2026-10-15',
    uploader: 'Bagus Wicaksono',
    downloadsCount: 140,
    description: 'Daftar kodefikasi 120 jenis sarana umum (Poskesdes, Jembatan Gantung, Titik Sumur Resapan, Embung) sesuai standar nasional.',
    summaryContent: 'Tabel referensi kode fasilitas desa, atribut minimal yang wajib difoto (tampak depan, papan nama, akses jalan), dan format penamaan geotagging file foto.',
    tags: ['Katalog', 'Infrastruktur', 'Master Data']
  }
];

export const SURVEY_FIELD_LOGS: FieldMonitoringLog[] = [
  {
    id: 'log-s01',
    activityId: 'act-susenas',
    submissionDate: '2026-11-01',
    surveyorName: 'Andi Rahmat Hidayat',
    surveyorId: 'PCL-014',
    region: 'Kab. Sleman - Blok Sensus 014B',
    targetCompletedToday: 6,
    targetAssignedToday: 6,
    unit: 'Keluarga',
    durationMinutes: 52,
    metricValue: 52,
    metricLabel: 'Rata-rata Waktu Kuesioner (menit)',
    verificationStatus: 'verified',
    coordinates: '-7.7123, 110.3644',
    notes: 'Responden ramah, data konsumsi beras dan token listrik sesuai struk riil.'
  },
  {
    id: 'log-s02',
    activityId: 'act-susenas',
    submissionDate: '2026-11-01',
    surveyorName: 'Dimas Kurniawan',
    surveyorId: 'PCL-088',
    region: 'Kota Yogyakarta - Blok Sensus 003A',
    targetCompletedToday: 11,
    targetAssignedToday: 6,
    unit: 'Keluarga',
    durationMinutes: 9,
    metricValue: 9,
    metricLabel: 'Rata-rata Waktu Kuesioner (menit)',
    verificationStatus: 'flagged',
    coordinates: '-7.7956, 110.3695',
    notes: 'Input selesai kilat 9 menit per kuesioner 110 pertanyaan. Sangat mencurigakan.'
  },
  {
    id: 'log-s03',
    activityId: 'act-susenas',
    submissionDate: '2026-10-31',
    surveyorName: 'Siti Nurhaliza',
    surveyorId: 'PCL-032',
    region: 'Kab. Bantul - Blok Sensus 021C',
    targetCompletedToday: 5,
    targetAssignedToday: 5,
    unit: 'Keluarga',
    durationMinutes: 65,
    metricValue: 65,
    metricLabel: 'Rata-rata Waktu Kuesioner (menit)',
    verificationStatus: 'verified',
    coordinates: '-7.8890, 110.3291',
    notes: 'Keluarga pedagang pasar, verifikasi omzet dilakukan bertahap.'
  },
  {
    id: 'log-s04',
    activityId: 'act-susenas',
    submissionDate: '2026-10-31',
    surveyorName: 'Budi Santoso',
    surveyorId: 'PCL-059',
    region: 'Kab. Kulon Progo - Blok Sensus 009B',
    targetCompletedToday: 4,
    targetAssignedToday: 5,
    unit: 'Keluarga',
    durationMinutes: 70,
    metricValue: 48500000,
    metricLabel: 'Nilai Pengeluaran RT Bulanan (Rp)',
    verificationStatus: 'flagged',
    coordinates: '-7.8541, 110.1583',
    notes: 'Keluarga buruh tani tercatat pengeluaran sebulan Rp48.500.000 (disparitas ekstrem).'
  },
  {
    id: 'log-s05',
    activityId: 'act-tani',
    submissionDate: '2026-11-01',
    surveyorName: 'Eko Prasetyo',
    surveyorId: 'TANI-008',
    region: 'Kab. Sleman - Kalasan',
    targetCompletedToday: 8,
    targetAssignedToday: 8,
    unit: 'Petani & Poktan',
    durationMinutes: 40,
    metricValue: 6.2,
    metricLabel: 'Produktivitas Panen (Ton/Ha)',
    verificationStatus: 'verified',
    coordinates: '-7.7681, 110.4690',
    notes: 'Varietas Inpari 32, pengairan teknis lancar.'
  },
  {
    id: 'log-s06',
    activityId: 'act-tani',
    submissionDate: '2026-10-31',
    surveyorName: 'Farhan Maulana',
    surveyorId: 'TANI-024',
    region: 'Kab. Bantul - Imogiri',
    targetCompletedToday: 9,
    targetAssignedToday: 8,
    unit: 'Petani & Poktan',
    durationMinutes: 35,
    metricValue: 24.5,
    metricLabel: 'Produktivitas Panen (Ton/Ha)',
    verificationStatus: 'flagged',
    coordinates: '-7.9211, 110.4201',
    notes: 'Klaim panen padi 24.5 ton/ha (melebihi batas biologis padi nasional max 11 ton/ha).'
  },
  {
    id: 'log-s07',
    activityId: 'act-desa',
    submissionDate: '2026-11-01',
    surveyorName: 'Dian Permatasari',
    surveyorId: 'GEO-012',
    region: 'Kab. Kulon Progo - Kokap',
    targetCompletedToday: 7,
    targetAssignedToday: 7,
    unit: 'Fasilitas Publik',
    durationMinutes: 45,
    metricValue: 3.2,
    metricLabel: 'Akurasi GPS (meter)',
    verificationStatus: 'verified',
    coordinates: '-7.8201, 110.1102',
    notes: 'Poskesdes dan MCK komunal berhasil difoto beserta waypoint presisi.'
  },
  {
    id: 'log-s08',
    activityId: 'act-desa',
    submissionDate: '2026-10-30',
    surveyorName: 'Rian Pratama',
    surveyorId: 'GEO-031',
    region: 'Kab. Gunungkidul - Tepus',
    targetCompletedToday: 5,
    targetAssignedToday: 6,
    unit: 'Fasilitas Publik',
    durationMinutes: 30,
    metricValue: 14200,
    metricLabel: 'Jarak Deviasi Titik Peta (meter)',
    verificationStatus: 'flagged',
    coordinates: '-8.1250, 110.6500',
    notes: 'Koordinat yang diunggah tercatat 14.2 km di tengah laut selatan (anomali geolokasi).'
  }
];

export const SURVEY_ANOMALIES: AnomalyEvaluation[] = [
  {
    id: 'anom-s01',
    activityId: 'act-susenas',
    logId: 'log-s02',
    title: 'Durasi Wawancara Ekstrem Cepat (Speeding Interview)',
    dateDetected: '2026-11-01',
    metricName: 'Durasi Wawancara per Kuesioner',
    observedValue: 9,
    expectedMin: 45,
    expectedMax: 90,
    unit: 'menit',
    zScore: -3.8,
    severity: 'critical',
    category: 'Durasi Janggal',
    entityName: 'Petugas Dimas Kurniawan (PCL-088)',
    description: 'Pencacah menyelesaikan 11 kuesioner dengan rata-rata 9 menit per responden. Modul SUSENAS berisi 120 pertanyaan terperinci yang secara metodologis memerlukan minimal 45 menit.',
    auditRecommendation: 'Lakukan penolakan batch, tarik petugas untuk pembinaan, dan instruksikan Pengawas PML untuk melakukan wawancara ulang 100% sampel bersangkutan.',
    resolutionStatus: 'open'
  },
  {
    id: 'anom-s02',
    activityId: 'act-susenas',
    logId: 'log-s04',
    title: 'Outlier Pengeluaran Bulanan di Luar Ambang IQR 3x',
    dateDetected: '2026-10-31',
    metricName: 'Total Pengeluaran Rumah Tangga',
    observedValue: 48500000,
    expectedMin: 2100000,
    expectedMax: 14500000,
    unit: 'Rupiah',
    zScore: 4.6,
    severity: 'high',
    category: 'Ekstrem Nilai/Skor',
    entityName: 'KK Bapak Sugiman (Blok 009B)',
    description: 'Tercatat pengeluaran sebulan Rp48.500.000 pada profil buruh tani harian. Terindikasi kesalahan salah input desimal atau memasukkan biaya pembelian aset tanah/motor ke konsumsi bulanan.',
    auditRecommendation: 'Hubungi petugas PCL-059 untuk verifikasi struk belanja dan koreksi variabel pengeluaran bukan-konsumsi pada aplikasi CAPI.',
    resolutionStatus: 'investigating',
    resolvedBy: 'Hendra Gunawan',
    resolutionNotes: 'Sedang dikonfirmasi ke pencacah lapangan, kemungkinan ada typo angka nol berlebih.'
  },
  {
    id: 'anom-s03',
    activityId: 'act-tani',
    logId: 'log-s06',
    title: 'Klaim Produktivitas Gabah Melebihi Batas Biologis (Outlier 24.5 Ton/Ha)',
    dateDetected: '2026-10-31',
    metricName: 'Produktivitas Padi Sawah',
    observedValue: 24.5,
    expectedMin: 4.5,
    expectedMax: 9.8,
    unit: 'Ton/Ha',
    zScore: 4.1,
    severity: 'critical',
    category: 'Inkonsistensi Logika',
    entityName: 'Poktan Sumber Makmur (Imogiri)',
    description: 'Angka 24.5 Ton/Ha melebihi kapasitas genetika padi sawah tertinggi di Indonesia (~10.5 Ton/Ha). Kemungkinan pencacah salah menghitung ubinan 2.5m x 2.5m atau konversi satuan kuintal ke kilogram.',
    auditRecommendation: 'Kirim pengawas agronomis untuk hitung ulang hasil ubinan riil dan periksa luas petak pematang sawah responden.',
    resolutionStatus: 'open'
  },
  {
    id: 'anom-s04',
    activityId: 'act-desa',
    logId: 'log-s08',
    title: 'Anomali Koordinat GPS Terlempar 14.2 Km di Lepas Pantai',
    dateDetected: '2026-10-30',
    metricName: 'Radius Deviasi Titik terhadap Batas Kelurahan',
    observedValue: 14200,
    expectedMin: 0,
    expectedMax: 200,
    unit: 'meter',
    zScore: 5.2,
    severity: 'critical',
    category: 'Disparitas Geospasial',
    entityName: 'Fasilitas Poskesdes Dusun IV (Tepus)',
    description: 'Sensor GPS smartphone mencatat latitude -8.1250 yang berada di samudera lepas. Ini sering terjadi jika GPS disinkronkan saat sinyal lemah atau menggunakan mock location emulator.',
    auditRecommendation: 'Tolak entry data titik GPS, verifikasi apakah petugas benar-benar hadir ke lokasi dengan memeriksa metadata EXIF foto asli kamera.',
    resolutionStatus: 'rejected_resurvey',
    resolvedBy: 'Bagus Wicaksono',
    resolutionNotes: 'Sudah diperintahkan resurvei wajib dengan aplikasi CAPI versi terbaru yang mengunci mock GPS.'
  }
];

// --- TEMPLATE 2 DATA: PENGAWASAN PROYEK & KONSTRUKSI ---
export const CONSTRUCTION_ACTIVITIES: ActivityModule[] = [
  {
    id: 'act-c-gardu',
    code: 'GARDU-150KV',
    title: 'Pembangunan Gardu Induk & Jaringan Transmisi',
    description: 'Pekerjaan sipil pondasi trafo 60 MVA, pemasangan struktur gantry baja, dan instalasi switchyard 150 kV.',
    category: 'Konstruksi Ketenagalistrikan',
    icon: 'Zap',
    pic: {
      name: 'Ir. Dwi Kurniawan, IPM',
      role: 'Project Manager Site Gardu',
      phone: '+62 811-2993-1022',
      email: 'dwi.k@ops-konstruksi.id'
    },
    targetGoal: 100,
    targetUnit: '% Progres Fisik',
    startDate: '2026-06-01',
    endDate: '2026-12-30',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 1
  },
  {
    id: 'act-c-jalan',
    code: 'REHAB-JALAN',
    title: 'Rekonstruksi Drainase & Perkerasan Rigid Jalan Arteri',
    description: 'Pengecoran beton semen fc 30 MPa sepanjang 8.4 km beserta box culvert drainase perkotaan.',
    category: 'Infrastruktur Jalan & Jembatan',
    icon: 'HardHat',
    pic: {
      name: 'Rian Hidayat, S.T',
      role: 'Site Engineer Lapangan',
      phone: '+62 812-7744-9021',
      email: 'rian.h@ops-konstruksi.id'
    },
    targetGoal: 8400,
    targetUnit: 'Meter Panjang',
    startDate: '2026-07-15',
    endDate: '2026-11-20',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 2
  },
  {
    id: 'act-c-k3',
    code: 'AUDIT-K3',
    title: 'Inspeksi K3 Mutu, Lingkungan & Alat Berat',
    description: 'Pemeriksaan harian Surat Izin Laik Operasi (SILO) crane/excavator, APD pekerja, dan toolbox meeting pagi.',
    category: 'Keselamatan & K3 Konstruksi',
    icon: 'ShieldCheck',
    pic: {
      name: 'Agus Santosa, SKM',
      role: 'HSE Safety Officer Ahli K3',
      phone: '+62 878-5521-3990',
      email: 'agus.k3@ops-konstruksi.id'
    },
    targetGoal: 180,
    targetUnit: 'Sesi Inspeksi & Toolbox',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 3
  }
];

export const CONSTRUCTION_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-c1',
    activityId: 'act-c-gardu',
    title: 'Detail Engineering Design (DED) Fondasi Trafo Revisi-04',
    category: 'Data Referensi',
    fileType: 'pdf',
    fileSize: '14.2 MB',
    version: 'v4.1',
    updatedAt: '2026-10-10',
    uploader: 'Konsultan Perencana Enjiniring',
    downloadsCount: 168,
    description: 'Gambar kerja pembesian, spesifikasi tulangan D25 ulir, dan detail angkur trafo daya 60 MVA anti-gempa.',
    summaryContent: 'Dokumen DED memuat kalkulasi momen guling, gambar penulangan pile cap 4x4 meter, kedalaman tiang pancang 18 meter, serta spesifikasi mutu beton K-350 / fc 29 MPa.',
    tags: ['DED', 'Gambar Kerja', 'Fondasi', 'Trafo']
  },
  {
    id: 'mat-c2',
    activityId: 'act-c-jalan',
    title: 'Spesifikasi Khusus Perkerasan Rigid Pavement & Slump Test',
    category: 'Pedoman Lapangan',
    fileType: 'pdf',
    fileSize: '3.6 MB',
    version: 'v2.0',
    updatedAt: '2026-08-20',
    uploader: 'Dinas Bina Marga',
    downloadsCount: 220,
    description: 'Standar toleransi ketebalan tebal perkerasan (25 cm), uji slump kerucut abrams (5-10 cm), dan waktu cutting joint beton.',
    summaryContent: 'Berisi klausul pengujian material: Job Mix Formula (JMF), batas agregat pipih < 10%, uji kuat lentur balok beton (flexural strength minimal 4.5 MPa), dan proteksi curing compound.',
    tags: ['Spesifikasi', 'Beton', 'Rigid', 'Bina Marga']
  },
  {
    id: 'mat-c3',
    activityId: 'act-c-k3',
    title: 'SOP Bekerja di Ketinggian & Form Izin Kerja Berisiko (Permit to Work)',
    category: 'SOP & Regulasi',
    fileType: 'docx',
    fileSize: '1.8 MB',
    version: 'v3.2',
    updatedAt: '2026-09-01',
    uploader: 'Agus Santosa (HSE)',
    downloadsCount: 410,
    description: 'Prosedur pemakaian full body harness double lanyard, sertifikasi scaffolding, dan izin kerja lifting crane.',
    summaryContent: 'Formulir checklist wajib sebelum pekerjaan elevasi > 1.8 meter dimulai: inspeksi tali lifelines, penahan jatuh (fall arrester), kondisi angin (< 25 knot), dan verifikasi tanda tangan pengawas.',
    tags: ['K3', 'HSE', 'Permit to Work', 'Safety']
  }
];

export const CONSTRUCTION_FIELD_LOGS: FieldMonitoringLog[] = [
  {
    id: 'log-c01',
    activityId: 'act-c-gardu',
    submissionDate: '2026-11-01',
    surveyorName: 'Ferry Ardiansyah',
    surveyorId: 'INSP-09',
    region: 'Site Gardu Induk - Zona Switchyard',
    targetCompletedToday: 3,
    targetAssignedToday: 3,
    unit: 'Item Inspeksi',
    durationMinutes: 90,
    metricValue: 32.4,
    metricLabel: 'Kuat Tekan Silinder Beton 28 Hari (MPa)',
    verificationStatus: 'verified',
    coordinates: '-6.2301, 106.8402',
    notes: 'Kuat tekan beton memenuhi target spesifikasi minimal 29 MPa.'
  },
  {
    id: 'log-c02',
    activityId: 'act-c-jalan',
    submissionDate: '2026-11-01',
    surveyorName: 'Wahyu Nugroho',
    surveyorId: 'QC-11',
    region: 'STA 04+200 s/d 04+450',
    targetCompletedToday: 250,
    targetAssignedToday: 250,
    unit: 'Meter Panjang',
    durationMinutes: 180,
    metricValue: 19.5,
    metricLabel: 'Kuat Tekan Beton Silinder 28 Hari (MPa)',
    verificationStatus: 'flagged',
    coordinates: '-6.2891, 106.7901',
    notes: 'Hasil lab silinder beton umur 28 hari hanya mencapai 19.5 MPa (syarat spek: min 30 MPa).'
  },
  {
    id: 'log-c03',
    activityId: 'act-c-jalan',
    submissionDate: '2026-10-31',
    surveyorName: 'Wahyu Nugroho',
    surveyorId: 'QC-11',
    region: 'Batching Plant Vendor PT Cipta Semen',
    targetCompletedToday: 60,
    targetAssignedToday: 60,
    unit: 'M3 Beton Terkirim',
    durationMinutes: 120,
    metricValue: 465,
    metricLabel: 'Pemakaian Semen Portland per M3 (Kg)',
    verificationStatus: 'flagged',
    coordinates: '-6.3012, 106.7500',
    notes: 'Spike pemakaian semen 465 kg/m3 (ambang JMF normal: 360-390 kg/m3). Potensi pemborosan material.'
  },
  {
    id: 'log-c04',
    activityId: 'act-c-k3',
    submissionDate: '2026-11-01',
    surveyorName: 'Rudi Hermawan',
    surveyorId: 'SAFETY-03',
    region: 'Area Gantry Steel Erection',
    targetCompletedToday: 1,
    targetAssignedToday: 1,
    unit: 'Toolbox Session',
    durationMinutes: 30,
    metricValue: 0,
    metricLabel: 'Insiden Kecelakaan Kerja (LTI)',
    verificationStatus: 'verified',
    coordinates: '-6.2305, 106.8410',
    notes: 'Toolbox pagi dihadiri 42 pekerja, seluruh APD harness diperiksa dalam kondisi prima.'
  }
];

export const CONSTRUCTION_ANOMALIES: AnomalyEvaluation[] = [
  {
    id: 'anom-c01',
    activityId: 'act-c-jalan',
    logId: 'log-c02',
    title: 'Kuat Tekan Silinder Beton Uji 28 Hari Gagal Memenuhi Spesifikasi Teknis',
    dateDetected: '2026-11-01',
    metricName: 'Kuat Tekan Beton (fc)',
    observedValue: 19.5,
    expectedMin: 30.0,
    expectedMax: 42.0,
    unit: 'MPa',
    zScore: -3.4,
    severity: 'critical',
    category: 'Ekstrem Nilai/Skor',
    entityName: 'STA 04+200 s/d 04+450 (Batch Truck 12)',
    description: 'Sampel uji tekan beton umur 28 hari dari STA 04+200 hanya mencapai 19.5 MPa, defisit 35% di bawah batas mutu fc 30 MPa. Berisiko retak struktur dan gagal menerima beban sumbu kendaraan berat.',
    auditRecommendation: 'Lakukan uji non-destruktif hammer test dan uji inti bor (core drill) 3 titik. Jika hasil tetap di bawah 85% spek, kontraktor wajib membongkar segmen rigid sepanjang 250m atas biaya sendiri.',
    resolutionStatus: 'open'
  },
  {
    id: 'anom-c02',
    activityId: 'act-c-jalan',
    logId: 'log-c03',
    title: 'Lonjakan Konsumsi Semen Melebihi Toleransi JMF (+24% Spike)',
    dateDetected: '2026-10-31',
    metricName: 'Konsumsi Semen per M3',
    observedValue: 465,
    expectedMin: 360,
    expectedMax: 395,
    unit: 'Kg/m3',
    zScore: 3.9,
    severity: 'high',
    category: 'Deviasi Anggaran',
    entityName: 'Batching Plant Vendor PT Cipta Semen',
    description: 'Catatan batching menunjukkan penggunaan 465 kg semen per m3 beton, melampaui Job Mix Formula yang disepakati (380 kg/m3). Deviasi ini meningkatkan risiko retak termal hidrasi dan pembengkakan biaya.',
    auditRecommendation: 'Kalibrasi ulang timbangan load-cell silo semen pada batching plant dan tinjau ulang water-cement ratio.',
    resolutionStatus: 'investigating',
    resolvedBy: 'Rian Hidayat, S.T',
    resolutionNotes: 'Teknisi vendor sedang melakukan kalibrasi ulang load-cell batching plant hari ini.'
  }
];

// --- TEMPLATE 3 DATA: PELATIHAN & PEMBERDAYAAN KOMUNITAS ---
export const COMMUNITY_ACTIVITIES: ActivityModule[] = [
  {
    id: 'act-comm-umkm',
    code: 'UMKM-DIGITAL',
    title: 'Akselerasi Digital & Literasi Keuangan UMKM',
    description: 'Pelatihan pembuatan laporan laba rugi, adopsi QRIS, dan strategi penjualan di marketplace digital bagi 800 pelaku usaha mikro binaan.',
    category: 'Pengembangan Ekonomi Mikro',
    icon: 'Store',
    pic: {
      name: 'Dewi Anggraini, S.E, M.M',
      role: 'Program Director Kewirausahaan',
      phone: '+62 821-3344-5501',
      email: 'dewi.a@ops-komunitas.org'
    },
    targetGoal: 800,
    targetUnit: 'Pelaku Usaha Mikro',
    startDate: '2026-09-01',
    endDate: '2026-12-10',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 1
  },
  {
    id: 'act-comm-tani',
    code: 'TANI-ORGANIK',
    title: 'Sekolah Lapang Petani Ramah Lingkungan',
    description: 'Praktek pembuatan pupuk hayati mandiri, penanganan hama terpadu, dan sertifikasi beras organik kelompok tani binaan.',
    category: 'Pertanian Berkelanjutan',
    icon: 'Sprout',
    pic: {
      name: 'Surya Wirawan, S.P',
      role: 'Koordinator Fasilitator Lapangan',
      phone: '+62 852-9911-4477',
      email: 'surya.w@ops-komunitas.org'
    },
    targetGoal: 450,
    targetUnit: 'Anggota Petani',
    startDate: '2026-08-15',
    endDate: '2026-11-30',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 2
  }
];

export const COMMUNITY_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-comm1',
    activityId: 'act-comm-umkm',
    title: 'Buku Saku Pembukuan Kas Sederhana & Perpajakan UMKM',
    category: 'Materi Presentasi',
    fileType: 'pdf',
    fileSize: '5.2 MB',
    version: 'v2.1',
    updatedAt: '2026-09-10',
    uploader: 'Dewi Anggraini',
    downloadsCount: 520,
    description: 'Panduan step-by-step memisahkan rekening pribadi dan usaha, menghitung HPP produk kuliner, dan pencatatan arus kas bulanan.',
    summaryContent: 'Berisi 6 modul materi interaktif: (1) Mengapa pembukuan penting; (2) Cara mencatat buku kas harian; (3) Rumus HPP; (4) Simulasi laporan laba rugi sederhana; (5) Cara daftar QRIS; (6) Lembar latihan mandiri.',
    tags: ['UMKM', 'Keuangan', 'Kas', 'HPP']
  },
  {
    id: 'mat-comm2',
    activityId: 'act-comm-tani',
    title: 'Resep Formula Fermentasi Pupuk Organik Cair & Mikroorganisme Lokal',
    category: 'Pedoman Lapangan',
    fileType: 'pdf',
    fileSize: '3.9 MB',
    version: 'v1.4',
    updatedAt: '2026-08-25',
    uploader: 'Surya Wirawan',
    downloadsCount: 310,
    description: 'Komposisi bahan alam (air cucian beras, molase, rebung bambu) untuk pembuatan MOL penstimulasi akar dan pupuk daun.',
    summaryContent: 'Berisi formulasi bahan, waktu fermentasi anaerob 14 hari, indikator bau fermentasi berhasil (aroma tape), dan dosis aplikasi semprot per tangki 14 liter.',
    tags: ['Pupuk Organik', 'MOL', 'Tani', 'Panduan']
  }
];

export const COMMUNITY_FIELD_LOGS: FieldMonitoringLog[] = [
  {
    id: 'log-cm01',
    activityId: 'act-comm-umkm',
    submissionDate: '2026-11-01',
    surveyorName: 'Nadia Safitri',
    surveyorId: 'FAS-04',
    region: 'Kecamatan Gondomanan - Angkatan IV',
    targetCompletedToday: 35,
    targetAssignedToday: 40,
    unit: 'Peserta Hadir',
    durationMinutes: 180,
    metricValue: 87.5,
    metricLabel: 'Tingkat Kehadiran Kelas (%)',
    verificationStatus: 'verified',
    coordinates: '-7.8012, 110.3700',
    notes: 'Peserta sangat antusias saat simulasi membuat QRIS statis.'
  },
  {
    id: 'log-cm02',
    activityId: 'act-comm-umkm',
    submissionDate: '2026-10-31',
    surveyorName: 'Rifki Pratama',
    surveyorId: 'FAS-12',
    region: 'Kecamatan Danurejan - Angkatan II',
    targetCompletedToday: 8,
    targetAssignedToday: 40,
    unit: 'Peserta Hadir',
    durationMinutes: 180,
    metricValue: 20.0,
    metricLabel: 'Tingkat Kehadiran Kelas (%)',
    verificationStatus: 'flagged',
    coordinates: '-7.7920, 110.3750',
    notes: 'Hanya 8 dari 40 peserta yang hadir (drop drastis ke 20%).'
  },
  {
    id: 'log-cm03',
    activityId: 'act-comm-tani',
    submissionDate: '2026-10-30',
    surveyorName: 'Agus Subekti',
    surveyorId: 'FAS-09',
    region: 'Kelompok Tani Rejo Mulyo',
    targetCompletedToday: 30,
    targetAssignedToday: 30,
    unit: 'Peserta Ujian',
    durationMinutes: 45,
    metricValue: 99.2,
    metricLabel: 'Rata-rata Skor Post-Test (Nilai 0-100)',
    verificationStatus: 'flagged',
    coordinates: '-7.8400, 110.4100',
    notes: 'Skor post-test melonjak serempak menjadi 99.2 dari pre-test rata-rata 38. Indikasi jawaban dibocorkan fasilitator.'
  }
];

export const COMMUNITY_ANOMALIES: AnomalyEvaluation[] = [
  {
    id: 'anom-cm01',
    activityId: 'act-comm-umkm',
    logId: 'log-cm02',
    title: 'Drop Tingkat Kehadiran Peserta Ekstrem (Hanya 20% Kehadiran)',
    dateDetected: '2026-10-31',
    metricName: 'Persentase Kehadiran Kelas',
    observedValue: 20.0,
    expectedMin: 75.0,
    expectedMax: 100.0,
    unit: '%',
    zScore: -3.5,
    severity: 'high',
    category: 'Ekstrem Nilai/Skor',
    entityName: 'Angkatan II Kecamatan Danurejan',
    description: 'Kehadiran anjlok menjadi 20% (8 dari 40 peserta). Laporan investigasi awal mengindikasikan jadwal kelas bertabrakan dengan hari pasaran wage di pasar induk setempat.',
    auditRecommendation: 'Evaluasi jadwal pelatihan bersama koordinator paguyuban dan sediakan kelas pengganti pada akhir pekan.',
    resolutionStatus: 'investigating',
    resolvedBy: 'Dewi Anggraini',
    resolutionNotes: 'Sudah dijadwalkan ulang ke hari Sabtu pagi sesuai aspirasi perwakilan pedagang.'
  },
  {
    id: 'anom-cm02',
    activityId: 'act-comm-tani',
    logId: 'log-cm03',
    title: 'Anomali Lonjakan Nilai Post-Test Serempak 99.2 (Pre-Test vs Post-Test Gap +61.2)',
    dateDetected: '2026-10-30',
    metricName: 'Rata-rata Skor Post-Test',
    observedValue: 99.2,
    expectedMin: 65.0,
    expectedMax: 85.0,
    unit: 'Poin',
    zScore: 3.7,
    severity: 'critical',
    category: 'Inkonsistensi Logika',
    entityName: 'Kelompok Tani Rejo Mulyo',
    description: 'Rata-rata nilai post-test 99.2 dengan varians jawaban nyaris nol. Pola ini mengindikasikan fasilitator mengisi atau membagikan kunci lembar soal langsung sebelum ujian.',
    auditRecommendation: 'Batalkan sertifikasi angkatan terkait, lakukan uji ulang secara acak oleh pengawas independen.',
    resolutionStatus: 'open'
  }
];

// --- TEMPLATE 4 DATA: AUDIT MUTU & KEPATUHAN CABANG ---
export const COMPLIANCE_ACTIVITIES: ActivityModule[] = [
  {
    id: 'act-audit-ops',
    code: 'AUDIT-SOP',
    title: 'Audit Kepatuhan Operasional & Kas Cabang',
    description: 'Verifikasi berkala limit saldo brankas kasir, otorisasi transaksi ganda, dan kepatuhan administrasi pembukuan di 45 gerai.',
    category: 'Internal Audit & Risk',
    icon: 'ClipboardCheck',
    pic: {
      name: 'Iwan Prasetya, CIA, CFE',
      role: 'Head of Internal Audit',
      phone: '+62 811-9870-1122',
      email: 'iwan.p@ops-audit.id'
    },
    targetGoal: 45,
    targetUnit: 'Cabang / Outlet',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 1
  },
  {
    id: 'act-audit-higiene',
    code: 'INSP-SANASI',
    title: 'Inspeksi Sanitasi & Standar Keamanan Pangan',
    description: 'Pemeriksaan suhu chiller daging (< 4°C), kebersihan area dapur, dan kelayakan sertifikat higienis staf.',
    category: 'Quality Assurance & Food Safety',
    icon: 'ShieldAlert',
    pic: {
      name: 'drh. Maya Indrawati',
      role: 'QA Food Safety Specialist',
      phone: '+62 813-2211-7788',
      email: 'maya.i@ops-audit.id'
    },
    targetGoal: 60,
    targetUnit: 'Gerai Restoran',
    startDate: '2026-10-05',
    endDate: '2026-12-15',
    status: 'active',
    enabledFeatures: {
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    },
    order: 2
  }
];

export const COMPLIANCE_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-comp1',
    activityId: 'act-audit-ops',
    title: 'Matriks Standar Penilaian Audit Kepatuhan Cabang 2026',
    category: 'Kuesioner / Formulir',
    fileType: 'xlsx',
    fileSize: '2.5 MB',
    version: 'v3.0',
    updatedAt: '2026-10-01',
    uploader: 'Iwan Prasetya',
    downloadsCount: 145,
    description: '140 poin parameter audit meliputi verifikasi kasir, kunci brankas dua pihak, retur barang, dan log CCTV.',
    summaryContent: 'Kuesioner audit dengan pembobotan: Kas & Keuangan (35%), Pelayanan Pelanggan (25%), Keamanan Fisik & Aset (20%), Administrasi & SDM (20%). Skor kelulusan minimal 85 poin.',
    tags: ['Audit', 'Matriks', 'Kepatuhan', 'SOP']
  },
  {
    id: 'mat-comp2',
    activityId: 'act-audit-higiene',
    title: 'Protokol HACCP & Batas Kritis Suhu Penyimpanan Dingin',
    category: 'SOP & Regulasi',
    fileType: 'pdf',
    fileSize: '4.1 MB',
    version: 'v2.2',
    updatedAt: '2026-09-15',
    uploader: 'Maya Indrawati',
    downloadsCount: 230,
    description: 'Standar internasional HACCP untuk mencegah kontaminasi silang bakteri Salmonella dan batas toleransi suhu refrigerator.',
    summaryContent: 'Berisi log harian kalibrasi termometer digital, tabel suhu kritis daging mentah (-18°C s/d -22°C), bahan olahan siap saji (1°C s/d 4°C), dan tindakan darurat bila kompresor rusak.',
    tags: ['HACCP', 'Sanitasi', 'Food Safety', 'Suhu']
  }
];

export const COMPLIANCE_FIELD_LOGS: FieldMonitoringLog[] = [
  {
    id: 'log-cp01',
    activityId: 'act-audit-ops',
    submissionDate: '2026-11-01',
    surveyorName: 'Bayu Wicaksono',
    surveyorId: 'AUD-02',
    region: 'Cabang Utama Sudirman',
    targetCompletedToday: 1,
    targetAssignedToday: 1,
    unit: 'Audit Cabang',
    durationMinutes: 240,
    metricValue: 94.5,
    metricLabel: 'Skor Kepatuhan Audit (0-100)',
    verificationStatus: 'verified',
    coordinates: '-6.2146, 106.8214',
    notes: 'Kepatuhan kas sangat baik, berita acara selisih kas nol rupiah.'
  },
  {
    id: 'log-cp02',
    activityId: 'act-audit-ops',
    submissionDate: '2026-10-31',
    surveyorName: 'Bayu Wicaksono',
    surveyorId: 'AUD-02',
    region: 'Cabang Mal Artha Gading',
    targetCompletedToday: 1,
    targetAssignedToday: 1,
    unit: 'Audit Cabang',
    durationMinutes: 210,
    metricValue: 48.0,
    metricLabel: 'Skor Kepatuhan Audit (0-100)',
    verificationStatus: 'flagged',
    coordinates: '-6.1450, 106.8900',
    notes: 'Ditemukan selisih kas brankas minus Rp14.800.000 dan rekaman CCTV mati selama 5 hari.'
  },
  {
    id: 'log-cp03',
    activityId: 'act-audit-higiene',
    submissionDate: '2026-11-01',
    surveyorName: 'Siti Rahmawati',
    surveyorId: 'QA-05',
    region: 'Outlet Food Court Blok M',
    targetCompletedToday: 1,
    targetAssignedToday: 1,
    unit: 'Gerai Restoran',
    durationMinutes: 90,
    metricValue: 12.8,
    metricLabel: 'Suhu Chiller Penyimpanan Daging (°C)',
    verificationStatus: 'flagged',
    coordinates: '-6.2440, 106.8000',
    notes: 'Suhu chiller terukur 12.8°C (ambang kritis maksimal 4.0°C). Produk daging berisiko basi.'
  }
];

export const COMPLIANCE_ANOMALIES: AnomalyEvaluation[] = [
  {
    id: 'anom-cp01',
    activityId: 'act-audit-ops',
    logId: 'log-cp02',
    title: 'Penurunan Skor Kepatuhan Drastis & Selisih Kas Brankas Minus Rp14.8 Juta',
    dateDetected: '2026-10-31',
    metricName: 'Skor Kepatuhan Audit',
    observedValue: 48.0,
    expectedMin: 85.0,
    expectedMax: 100.0,
    unit: 'Poin',
    zScore: -4.2,
    severity: 'critical',
    category: 'Deviasi Anggaran',
    entityName: 'Cabang Mal Artha Gading',
    description: 'Skor kepatuhan terjun bebas dari 92 poin bulan lalu menjadi 48 poin. Terdapat selisih kas fisik brankas tidak dapat dipertanggungjawabkan serta pemadaman CCTV disengaja.',
    auditRecommendation: 'Kirim tim Audit Investigasi Khusus hari ini juga, amankan backup log transaksi POS dan ganti kunci brankas seketika.',
    resolutionStatus: 'open'
  },
  {
    id: 'anom-cp02',
    activityId: 'act-audit-higiene',
    logId: 'log-cp03',
    title: 'Pelanggaran Suhu Chiller Kritis 12.8°C (Potensi Toksin Bakteri)',
    dateDetected: '2026-11-01',
    metricName: 'Suhu Chiller Penyimpanan',
    observedValue: 12.8,
    expectedMin: 0.0,
    expectedMax: 4.0,
    unit: '°C',
    zScore: 4.5,
    severity: 'critical',
    category: 'Ekstrem Nilai/Skor',
    entityName: 'Outlet Food Court Blok M',
    description: 'Suhu chiller 12.8°C berada pada Danger Zone bakteri (5°C - 60°C). Seluruh stok daging olahan 28 kg berisiko terkontaminasi dan membahayakan konsumen.',
    auditRecommendation: 'Perintahkan pemusnahan daging olahan bersangkutan (discard), buat berita acara pemusnahan barang, dan panggil teknisi pendingin segera.',
    resolutionStatus: 'investigating',
    resolvedBy: 'drh. Maya Indrawati',
    resolutionNotes: 'Stok daging sudah disita dan diberi tanda karantina oleh tim QA.'
  }
];

export function getTemplateData(id: string) {
  switch (id) {
    case 'construction-infra':
      return {
        activities: CONSTRUCTION_ACTIVITIES,
        materials: CONSTRUCTION_MATERIALS,
        fieldLogs: CONSTRUCTION_FIELD_LOGS,
        anomalies: CONSTRUCTION_ANOMALIES
      };
    case 'community-training':
      return {
        activities: COMMUNITY_ACTIVITIES,
        materials: COMMUNITY_MATERIALS,
        fieldLogs: COMMUNITY_FIELD_LOGS,
        anomalies: COMMUNITY_ANOMALIES
      };
    case 'quality-compliance':
      return {
        activities: COMPLIANCE_ACTIVITIES,
        materials: COMPLIANCE_MATERIALS,
        fieldLogs: COMPLIANCE_FIELD_LOGS,
        anomalies: COMPLIANCE_ANOMALIES
      };
    case 'survey-census':
    default:
      return {
        activities: SURVEY_ACTIVITIES,
        materials: SURVEY_MATERIALS,
        fieldLogs: SURVEY_FIELD_LOGS,
        anomalies: SURVEY_ANOMALIES
      };
  }
}
