import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Shield,
  Users,
  Layers,
  FileText,
  Star,
  Settings,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Flame,
  Play,
  Zap,
  Activity,
  MapPin,
  Award,
  Clock,
  Eye,
  Video,
  Sliders,
  ArrowUpRight,
  Plus,
  Download,
  X,
  Menu,
  Languages,
  UserCheck,
  Crosshair,
  TrendingUp,
  CheckCircle2,
  Share2,
  ExternalLink,
  Filter,
  RefreshCw,
  ArrowLeft,
  BookOpen,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Check,
  Mail,
  Phone,
  Globe,
  Send,
} from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TRANSLATIONS = {
  id: {
    nav: {
      dashboard: 'Dasbor',
      matches: 'Pertandingan',
      statistics: 'Statistik',
      teams: 'Tim',
      players: 'Pemain',
      services: 'Layanan',
      reports: 'Laporan Taktis',
      settings: 'Pengaturan',
    },
    header: {
      searchPlaceholder: 'Cari tim, pemain, xG...',
      league: 'BRI Liga 1',
    },
    hero: {
      badge: 'Pusat Intelijen Taktis Liga 1 Indonesia',
      titleStart: 'Selamat Datang di ',
      titleEnd: ' Analisis Sepak Bola',
      subtitle: 'Statistik sepak bola profesional, telemetri video taktis, dan rincian expected goals (xG) untuk setiap laga BRI Liga 1 Indonesia.',
      exploreMatches: 'Jelajahi Histori Laga',
      requestAnalysis: 'Minta Analisis Kustom',
    },
    stats: {
      totalMatches: 'Total Laga Dianalisis',
      thisSeason: 'Musim Ini',
      activeClubs: 'Klub Liga 1 Aktif',
      fullCoverage: 'Cakupan Penuh',
      playersTracked: 'Pemain Terdata',
      scoutingDatabase: 'Basis Data Scouting',
      analysisRequests: 'Permintaan Analisis',
      funAndClubs: 'Fun Football & Klub',
    },
    featuredMatch: {
      badge: 'Pertandingan Pilihan • LANGSUNG 68\'',
      stadium: 'Stadion Gelora Bandung Lautan Api',
      homeRank: 'Kandang • Peringkat ke-1',
      awayRank: 'Tandang • Peringkat ke-3',
      liveTelemetry: 'Telemetri Laga Langsung',
      possession: 'Penguasaan Bola',
      shotsOnTarget: 'Tembakan Akurat (Total)',
      passAccuracy: 'Akurasi Umpan',
      corners: 'Tendangan Sudut',
      yellowCards: 'Kartu Kuning',
      openDashboard: 'Buka Dasbor Laga Lengkap & Telemetri Video',
    },
    upcoming: {
      title: 'Jadwal Pertandingan Mendatang',
      subtitle: 'Jadwal Pekan ke-19 BRI Liga 1',
      viewAll: 'Lihat Semua Jadwal',
      derby: 'DERBY',
      viewStats: 'Lihat Statistik',
    },
    standings: {
      title: 'Tabel Klasemen Liga 1',
      subtitle: 'Klasemen lengkap 34 pekan & panduan performa',
      matchday: '34 PEKAN',
      pos: 'Pos',
      club: 'Klub',
      mp: 'M',
      w: 'M',
      d: 'S',
      l: 'K',
      gf: 'GM',
      ga: 'GK',
      gd: 'SG',
      pts: 'Poin',
      last5: '5 Laga Terakhir',
      relegation: 'Degradasi',
    },
    topPlayers: {
      title: 'Sorotan Pemain Terbaik',
      subtitle: 'Pemain terbaik Liga 1 berdasarkan rating xG',
      goals: 'Gol',
      assists: 'Assist',
    },
    recentAnalysis: {
      title: 'Artikel Taktis Terkini',
      subtitle: 'Ulasan taktis & analisis artikel mendalam',
      readArticle: 'Baca Artikel',
    },
    services: {
      heading: 'Paket Laporan Pertandingan (Match Report)',
      subheading: 'Pilih paket analisis taktis sesuai kebutuhan tim atau komunitas Anda',
      pkg1Title: 'Basic Report',
      pkg1Price: 'Rp 50.000',
      pkg1Features: [
        'Statistik Dasar (Penguasaan, Tembakan, Umpan)',
        'Formasi & Susunan Pemain',
        'Skor Akhir & Ringkasan Laga Singkat'
      ],
      pkg2Title: 'Pro Tactical',
      pkg2Price: 'Rp 200.000',
      pkg2Features: [
        'Semua fitur Basic Report',
        'Data Expected Goals (xG)',
        'Heatmap Pergerakan Pemain',
        'Rating Individu Pemain',
        'Peta Jaringan Umpan (Pass Network)'
      ],
      pkg3Title: 'Elite Scouting',
      pkg3Price: 'Rp 500.000',
      pkg3Features: [
        'Semua fitur Pro Tactical',
        'Full Video Telemetry & Klip Sorotan',
        'Analisis PPDA & Zona Pressing',
        'Ekspor Raw Data (Excel/CSV)',
        'Sesi Konsultasi Analis'
      ],
      btnText: 'Pesan Paket Ini'
    },
    quickActions: {
      title: 'Aksi Taktis Cepat',
      subtitle: 'Percepat alur kerja scouting dan pemantauan Anda',
      newAnalysis: 'Analisis Baru',
      compareTeams: 'Bandingkan Tim',
    },
    footer: {
      aboutTitle: 'Tentang Sibundar',
      aboutText: 'Platform intelijen taktis & analitik data sepak bola nomor #1 di Indonesia. Menyajikan telemetri xG mendalam, peta pergerakan, serta laporan performa profesional untuk klub, pelatih, dan komunitas.',
      officeTitle: 'Kantor Pusat Surabaya',
      addressLine1: 'Gedung Sibundar Intelligence Tower, Lt. 8',
      addressLine2: 'Jl. Mayjen Sungkono No. 178, Sawahan',
      addressCity: 'Kota Surabaya, Jawa Timur 60225',
      contactTitle: 'Hubungi Kami',
      phone: '+62 (031) 8901-2345',
      whatsapp: '+62 812-3456-7890',
      email: 'scouting@sibundar.id',
      quickLinks: 'Navigasi Cepat',
      servicesTitle: 'Layanan & Paket',
      socialTitle: 'Koneksi Media Sosial',
      copyright: '© 2026 Sibundar Football Analytics. Hak Cipta Dilindungi.',
      developedIn: 'Dikembangkan di Surabaya dengan semangat untuk kemajuan sepak bola Indonesia.'
    },
    modalAnalysis: {
      title: 'Ajukan Pembuatan Match Report',
      subtitle: 'Layanan Analisis Pertandingan Kustom Sibundar',
      serviceType: 'Pilih Paket Layanan',
      option1: 'Basic Report (Rp 50.000)',
      option2: 'Pro Tactical (Rp 200.000)',
      option3: 'Elite Scouting (Rp 500.000)',
      matchName: 'Nama Pertandingan atau Klub',
      matchNamePlaceholder: 'Contoh: Persib Bandung vs Persebaya atau Komunitas FC Jakarta',
      focus: 'Catatan Tambahan / Fokus Spesifik (Opsional)',
      focusPlaceholder: 'Tentukan kebutuhan: Pemicu pressing, analisis bola mati (set-piece), dll...',
      cancel: 'Batal',
      submit: 'Kirim Permintaan',
      successMsg: 'Permintaan report berhasil dikirim! Tim taktis kami akan menghubungi Anda segera.',
    },
    modalCompare: {
      title: 'Telemetri Laga & Perbandingan Tim',
      subtitle: 'Rincian Head-to-Head & Expected Goals (xG)',
      tabStats: 'Statistik Telemetri',
      tabTimeline: 'Linimasa xG & Acara',
      tabLineup: 'Susunan Pemain & Rating',
      xg: 'Expected Goals (xG)',
      fieldTilt: 'Field Tilt (Penguasaan Sepertiga Akhir)',
      ppda: 'PPDA (Umpan per Aksi Bertahan)',
      counterAttacks: 'Serangan Balik',
      boxEntries: 'Penetrasi Kotak Penalti',
      close: 'Tutup Telemetri',
    },
    h2hModal: {
      title: 'Hasil Head to Head (H2H)',
      subtitle: 'Rekam jejak pertemuan terdahulu & statistik hasil laga',
      wins: 'Menang',
      draws: 'Seri',
      recentEncounters: '5 Pertemuan Terakhir',
      close: 'Tutup Statistik',
    }
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      matches: 'Matches',
      statistics: 'Statistics',
      teams: 'Teams',
      players: 'Players',
      services: 'Services',
      reports: 'Tactical Reports',
      settings: 'Settings',
    },
    header: {
      searchPlaceholder: 'Search teams, players, xG...',
      league: 'BRI Liga 1',
    },
    hero: {
      badge: 'Liga 1 Indonesia Tactical Intelligence Center',
      titleStart: 'Welcome to ',
      titleEnd: ' Football Analytics',
      subtitle: 'Professional football statistics, tactical video telemetry, and expected goals (xG) breakdowns for every BRI Liga 1 Indonesia match.',
      exploreMatches: 'Explore Match History',
      requestAnalysis: 'Request Custom Analysis',
    },
    stats: {
      totalMatches: 'Total Analyzed Matches',
      thisSeason: 'This Season',
      activeClubs: 'Active Liga 1 Clubs',
      fullCoverage: 'Full Coverage',
      playersTracked: 'Tracked Players',
      scoutingDatabase: 'Scouting Database',
      analysisRequests: 'Analysis Requests',
      funAndClubs: 'Fun Football & Clubs',
    },
    featuredMatch: {
      badge: 'Featured Match • LIVE 68\'',
      stadium: 'Gelora Bandung Lautan Api Stadium',
      homeRank: 'Home • 1st Place',
      awayRank: 'Away • 3rd Place',
      liveTelemetry: 'Live Match Telemetry',
      possession: 'Possession',
      shotsOnTarget: 'Shots on Target (Total)',
      passAccuracy: 'Pass Accuracy',
      corners: 'Corner Kicks',
      yellowCards: 'Yellow Cards',
      openDashboard: 'Open Full Match Dashboard & Video Telemetry',
    },
    upcoming: {
      title: 'Upcoming Matches',
      subtitle: 'BRI Liga 1 Matchday 19 Schedule',
      viewAll: 'View Full Schedule',
      derby: 'DERBY',
      viewStats: 'View Statistics',
    },
    standings: {
      title: 'Liga 1 Standings Table',
      subtitle: 'Full 34-matchday standings & performance form guide',
      matchday: '34 MATCHDAYS',
      pos: 'Pos',
      club: 'Club',
      mp: 'MP',
      w: 'W',
      d: 'D',
      l: 'L',
      gf: 'GF',
      ga: 'GA',
      gd: 'GD',
      pts: 'Pts',
      last5: 'Last 5 Matches',
      relegation: 'Relegation',
    },
    topPlayers: {
      title: 'Top Player Spotlight',
      subtitle: 'Best Liga 1 players ranked by xG rating',
      goals: 'Goals',
      assists: 'Assists',
    },
    recentAnalysis: {
      title: 'Latest Tactical Articles',
      subtitle: 'In-depth tactical breakdowns & articles',
      readArticle: 'Read Article',
    },
    services: {
      heading: 'Match Report Packages',
      subheading: 'Choose the tactical analysis package that fits your team or community needs',
      pkg1Title: 'Basic Report',
      pkg1Price: 'Rp 50,000',
      pkg1Features: [
        'Basic Stats (Possession, Shots, Pass Accuracy)',
        'Formations & Lineups',
        'Final Score & Short Match Summary'
      ],
      pkg2Title: 'Pro Tactical',
      pkg2Price: 'Rp 200,000',
      pkg2Features: [
        'All Basic Report features',
        'Expected Goals (xG) Data',
        'Player Movement Heatmaps',
        'Individual Player Ratings',
        'Pass Network Maps'
      ],
      pkg3Title: 'Elite Scouting',
      pkg3Price: 'Rp 500,000',
      pkg3Features: [
        'All Pro Tactical features',
        'Full Video Telemetry & Highlight Clips',
        'PPDA & Pressing Zone Analysis',
        'Raw Data Export (Excel/CSV)',
        'Analyst Consultation Session'
      ],
      btnText: 'Order This Package'
    },
    quickActions: {
      title: 'Quick Tactical Actions',
      subtitle: 'Accelerate your scouting and match monitoring workflow',
      newAnalysis: 'New Analysis',
      compareTeams: 'Compare Teams',
    },
    footer: {
      aboutTitle: 'About Sibundar',
      aboutText: '#1 Football tactical intelligence & data analytics platform in Indonesia. Providing in-depth xG telemetry, movement heatmaps, and professional match reports for clubs and coaches.',
      officeTitle: 'Surabaya Headquarters',
      addressLine1: 'Sibundar Intelligence Tower, 8th Floor',
      addressLine2: 'Jl. Mayjen Sungkono No. 178, Sawahan',
      addressCity: 'Surabaya City, East Java 60225, Indonesia',
      contactTitle: 'Contact Us',
      phone: '+62 (031) 8901-2345',
      whatsapp: '+62 812-3456-7890',
      email: 'scouting@sibundar.id',
      quickLinks: 'Quick Links',
      servicesTitle: 'Services & Packages',
      socialTitle: 'Connect With Us',
      copyright: '© 2026 Sibundar Football Analytics. All Rights Reserved.',
      developedIn: 'Engineered in Surabaya with passion for Indonesian Football.'
    },
    modalAnalysis: {
      title: 'Submit Match Report Request',
      subtitle: 'Sibundar Custom Match Analysis Services',
      serviceType: 'Select Service Package',
      option1: 'Basic Report (Rp 50k)',
      option2: 'Pro Tactical (Rp 200k)',
      option3: 'Elite Scouting (Rp 500k)',
      matchName: 'Match Name or Club',
      matchNamePlaceholder: 'Example: Persib Bandung vs Persebaya or Community FC Jakarta',
      focus: 'Additional Notes / Specific Focus (Optional)',
      focusPlaceholder: 'Specify needs: Pressing triggers, set-piece analysis, etc...',
      cancel: 'Cancel',
      submit: 'Submit Request',
      successMsg: 'Report request sent successfully! Our tactical team will contact you shortly.',
    },
    modalCompare: {
      title: 'Match Telemetry & Team Comparison',
      subtitle: 'Head-to-Head Breakdown & Expected Goals (xG)',
      tabStats: 'Telemetry Stats',
      tabTimeline: 'xG Timeline & Events',
      tabLineup: 'Lineup & Player Ratings',
      xg: 'Expected Goals (xG)',
      fieldTilt: 'Field Tilt (Final Third Possession)',
      ppda: 'PPDA (Passes Per Defensive Action)',
      counterAttacks: 'Counter Attacks',
      boxEntries: 'Penalty Box Entries',
      close: 'Close Telemetry',
    },
    h2hModal: {
      title: 'Head-to-Head (H2H) Results',
      subtitle: 'Past encounter match history & score breakdown',
      wins: 'Wins',
      draws: 'Draws',
      recentEncounters: 'Last 5 Encounters',
      close: 'Close Statistics',
    }
  }
};

const TEAM_INFO = {
  'Persib Bandung': { logo: '/logos/persib.svg', bg: 'from-blue-600 to-blue-900', text: 'PERSIB', border: 'border-blue-400/30', city: 'Bandung', stadium: 'Gelora Bandung Lautan Api', coach: 'Bojan Hodak' },
  'Borneo FC': { logo: '/logos/borneo.svg', bg: 'from-amber-500 to-orange-700', text: 'BORNEO', border: 'border-amber-400/30', city: 'Samarinda', stadium: 'Segiri', coach: 'Pieter Huistra' },
  'Persija Jakarta': { logo: '/logos/persija.svg', bg: 'from-orange-600 to-red-700', text: 'PERSIJA', border: 'border-orange-400/30', city: 'Jakarta', stadium: 'GBK / JIS', coach: 'Carlos Peña' },
  'Persebaya Surabaya': { logo: '/logos/persebaya.svg', bg: 'from-emerald-600 to-green-800', text: 'PERSEBAYA', border: 'border-emerald-400/30', city: 'Surabaya', stadium: 'Gelora Bung Tomo', coach: 'Paul Munster' },
  'PSM Makassar': { logo: '/logos/psm.svg', bg: 'from-red-600 to-red-900', text: 'PSM', border: 'border-red-400/30', city: 'Makassar', stadium: 'Gelora B.J. Habibie', coach: 'Bernardo Tavares' },
  'Bhayangkara FC': { logo: '/logos/bhayangkara.svg', bg: 'from-amber-600 to-yellow-800', text: 'BHAYANGKARA', border: 'border-amber-400/30', city: 'Jakarta', stadium: 'STIK Stadium', coach: 'Gomes de Oliveira' },
  'Malut United': { logo: '/logos/malut.svg', bg: 'from-red-700 to-blue-900', text: 'MALUT', border: 'border-red-400/30', city: 'Ternate', stadium: 'Gelora Kie Raha', coach: 'Imran Nahumarury' },
  'Dewa United': { logo: '/logos/dewa.svg', bg: 'from-amber-500 to-yellow-700', text: 'DEWA', border: 'border-amber-400/30', city: 'Tangerang', stadium: 'Indomilk Arena', coach: 'Jan Olde Riekerink' },
  'Bali United': { logo: '/logos/bali_united.svg', bg: 'from-red-600 to-slate-900', text: 'BALI', border: 'border-red-400/30', city: 'Gianyar', stadium: 'Kapten I Wayan Dipta', coach: 'Stefano Cugurra' },
  'Arema FC': { logo: '/logos/arema.svg', bg: 'from-blue-700 to-indigo-950', text: 'AREMA', border: 'border-blue-400/30', city: 'Malang', stadium: 'Kanjuruhan', coach: 'Joel Cornelli' },
  'Persik Kediri': { logo: '/logos/persik.svg', bg: 'from-purple-800 to-fuchsia-950', text: 'PERSIK', border: 'border-purple-400/30', city: 'Kediri', stadium: 'Brawijaya', coach: 'Marcelo Rospide' },
  'Persita Tangerang': { logo: '/logos/persita.svg', bg: 'from-purple-700 to-indigo-900', text: 'PERSITA', border: 'border-purple-400/30', city: 'Tangerang', stadium: 'Indomilk Arena', coach: 'Fabio Lefundes' },
  'Persis Solo': { logo: '/logos/persis.svg', bg: 'from-red-600 to-rose-900', text: 'PERSIS', border: 'border-red-400/30', city: 'Surakarta', stadium: 'Manahan', coach: 'Milomir Seslija' },
  'Barito Putera': { logo: '/logos/barito.svg', bg: 'from-yellow-500 to-blue-800', text: 'BARITO', border: 'border-yellow-400/30', city: 'Banjarmasin', stadium: 'Demang Lehman', coach: 'Rahmad Darmawan' },
  'PSIS Semarang': { logo: '/logos/psis.svg', bg: 'from-blue-600 to-indigo-900', text: 'PSIS', border: 'border-blue-400/30', city: 'Semarang', stadium: 'Jatidiri', coach: 'Gilbert Agius' },
  'Madura United': { logo: '/logos/madura.svg', bg: 'from-red-600 to-slate-900', text: 'MADURA', border: 'border-red-400/30', city: 'Pamekasan', stadium: 'Gelora Ratu Sungkeman', coach: 'Paulo Menezes' },
  'PSS Sleman': { logo: '/logos/pss.svg', bg: 'from-emerald-700 to-teal-950', text: 'PSS', border: 'border-emerald-400/30', city: 'Sleman', stadium: 'Maguwoharjo', coach: 'Mazola Junior' },
  'Semen Padang': { logo: '/logos/semen.svg', bg: 'from-red-700 to-slate-900', text: 'SEMEN', border: 'border-red-400/30', city: 'Padang', stadium: 'Haji Agus Salim', coach: 'Eduardo Almeida' },
};

const H2H_DATA = {
  m1: {
    homeWins: 3,
    draws: 1,
    awayWins: 1,
    history: [
      { date: '27 Mar 2024', homeScore: 1, awayScore: 0, competition: 'BRI Liga 1' },
      { date: '23 Sep 2023', homeScore: 3, awayScore: 1, competition: 'BRI Liga 1' },
      { date: '11 Apr 2023', homeScore: 1, awayScore: 0, competition: 'BRI Liga 1' },
      { date: '01 Okt 2022', homeScore: 3, awayScore: 2, competition: 'BRI Liga 1' },
      { date: '23 Feb 2022', homeScore: 1, awayScore: 0, competition: 'BRI Liga 1' },
    ]
  },
  m2: {
    homeWins: 3,
    draws: 1,
    awayWins: 1,
    history: [
      { date: '30 Mei 2024', homeScore: 4, awayScore: 2, competition: 'BRI Liga 1 Championship' },
      { date: '25 Mei 2024', homeScore: 0, awayScore: 0, competition: 'BRI Liga 1 Championship' },
      { date: '12 Nov 2023', homeScore: 2, awayScore: 1, competition: 'BRI Liga 1' },
      { date: '08 Jul 2023', homeScore: 3, awayScore: 1, competition: 'BRI Liga 1' },
      { date: '03 Apr 2023', homeScore: 5, awayScore: 1, competition: 'BRI Liga 1' },
    ]
  },
  m3: {
    homeWins: 2,
    draws: 1,
    awayWins: 2,
    history: [
      { date: '12 Nov 2024', homeScore: 1, awayScore: 1, competition: 'BRI Liga 1' },
      { date: '12 Nov 2023', homeScore: 2, awayScore: 1, competition: 'BRI Liga 1' },
      { date: '08 Jul 2023', homeScore: 2, awayScore: 1, competition: 'BRI Liga 1' },
      { date: '01 Mar 2023', homeScore: 0, awayScore: 2, competition: 'BRI Liga 1' },
      { date: '15 Sep 2022', homeScore: 1, awayScore: 1, competition: 'BRI Liga 1' },
    ]
  }
};

const TACTICAL_ARTICLES = [
  { 
    id: 'art-1', 
    title: 'Bedah Taktis Mendalam: Skema High-Pressing 4-3-3 Bojan Hodak & Rest Defense Persib Bandung', 
    summary: 'Studi komprehensif bagaimana transisi kilat Persib memanfaatkan celah di belakang bek sayap lawan melalui rotasi dinamis Ciro Alves & David da Silva, didukung struktur rest defense kokoh Marc Klok.', 
    date: '31 Juli 2026', 
    readTime: '12 mnt baca', 
    author: 'Budi Santoso', 
    role: 'Lead Data & Tactical Analyst', 
    category: 'Analisis Tim', 
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'High-Block Pressing Trigger: Penyerang sayap memotong sudut operan ke fullback, memaksa bek tengah lawan mengoper ke jebakan lini tengah.',
      'Eksploitasi Half-Space: Pergerakan tanpa bola dari lini kedua menghasilkan rerata angka expected goals (xG) hingga 2.14 per laga.',
      'Struktur Rest Defense 2+1: Kombinasi Marc Klok, Dedi Kusnandar, dan Nick Kuipers mengunci zona transisi negatif dalam 5 detik pertama pasca kehilangan bola.',
      'Efisiensi Final Third Recoveries: Persib mencatatkan 14.2 pemulihan bola per laga di sepertiga lapangan akhir lawan.'
    ],
    sections: [
      {
        heading: '1. Struktur Formasi & Pendekatan High-Block Dinamis',
        content: `Dalam beberapa pertandingan terakhir BRI Liga 1, Persib Bandung di bawah asuhan pelatih Bojan Hodak menunjukkan kematangan taktis tingkat tinggi. Menggunakan fondasi dasar 4-3-3 yang fleksibel, Persib tidak pasif menunggu di area pertahanan sendiri, melainkan menerapkan garis pertahanan tinggi (high-block) yang terstruktur dan agresif.\n\nSaat lawan mencoba melakukan build-up dari lini belakang, trio penyerang Persib yang diisi David da Silva, Ciro Alves, dan winger pendamping menutup ruang tengah (center-channel). Mereka membentuk sudut presing yang mengarahkan operan bek tengah lawan ke area sisi lapangan (sideline trap). Begitu bola bergerak ke bek sayap lawan, bek sayap Persib bersama gelandang tengah terdekat langsung menekan dengan intensitas tinggi, menutup semua opsi passing pendek.`
      },
      {
        heading: '2. Peran Vital Rest Defense (2+1) dalam Meredam Counter-Attack',
        content: `Kunci keberhasilan high-pressing Persib terletak pada konsep 'Rest Defense'—organisasi pertahanan saat tim sedang melancarkan serangan. Dua bek tengah bersama satu gelandang bertahan membentuk benteng segitiga pertahanan 2+1.\n\nDengan menjaga jarak maksimal 15 meter di belakang lini serang, Marc Klok atau Dedi Kusnandar bertindak sebagai 'filter' pertama untuk memotong umpan lambung lawan. Struktur ini menggagalkan 78% potensi serangan balik cepat lawan sebelum memasuki area bahaya, sekaligus memberi kebebasan bagi para wing-back untuk melakukan overlap hingga garis akhir (byline).`
      },
      {
        heading: '3. Rotasi Set-Piece & Efisiensi Konversi Peluang',
        content: `Selain permainan terbuka (open play), skema bola mati Persib menyumbang rata-rata 0.65 xG per pertandingan. Memanfaatkan postur tinggi Nick Kuipers dan kejelian antisipasi bola kedua (second ball) oleh lini tengah, Persib secara rutin menciptakan situasi keunggulan kuantitatif di dalam kotak penalti 16 meter.`
      }
    ]
  },
  { 
    id: 'art-2', 
    title: 'Mengapa PPDA Borneo FC Menjadi yang Terendah & Paling Efektif di Liga 1?', 
    summary: 'Studi data Passes Per Defensive Action menunjukkan dominasi counter-pressing tim Pesut Etam di zona pertahanan lawan melalui strategi sideline traps dan peran Stefano Lilipaly.', 
    date: '30 Juli 2026', 
    readTime: '10 mnt baca', 
    author: 'Tim Scouting Sibundar', 
    role: 'Football Data Intelligence', 
    category: 'Metrik & Data', 
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'PPDA rerata 8.2 menjadikan Borneo FC tim paling intens merebut bola di seluruh BRI Liga 1.',
      'Efisiensi konversi tembakan dari skema turnover tinggi mencapai angka fantastis 18.4%.',
      'Stefano Lilipaly mencatatkan rekor Expected Assists (xA) tertinggi liga sebesar 0.42 per 90 menit.',
      'Rerata 22.8 aksi bertahan di sepertiga lapangan akhir (Final Third Defensive Actions) per laga.'
    ],
    sections: [
      {
        heading: '1. Membedah Metrik PPDA (Passes Per Defensive Action)',
        content: `Passes Per Defensive Action (PPDA) adalah metrik analitik modern untuk mengukur tingkat intensitas pressing sebuah tim. Semakin rendah angka PPDA, semakin sedikit umpan yang diizinkan kepada lawan sebelum tim melakukan tindakan bertahan (tackle, interception, foul, atau challenge).\n\nBorneo FC mencatatkan rekor impresif dengan rata-rata PPDA sebesar 8.2 sepanjang musim ini. Artinya, skuat Pesut Etam hanya membiarkan lawan mengoper bola 8 kali sebelum melancarkan tekel atau pemotongan umpan. Angka ini adalah yang terendah di BRI Liga 1, mengungguli tim-tim papan atas lainnya.`
      },
      {
        heading: '2. Peran Visi Taktis Stefano Lilipaly & Sideline Traps',
        content: `Counter-pressing Borneo FC bukan sekadar berlari tanpa arah. Di bawah instruksi taktis Pieter Huistra, gerakan presing dipicu oleh pemicu spesifik (pressing triggers): umpan lambung yang lambat, kontrol bola yang tidak sempurna dari bek lawan, atau saat bola dialirkan ke area garis tepi (touchline).\n\nStefano Lilipaly bertindak sebagai konduktor presing di lapangan depan. Dengan kecerdasan posisi (positional awareness) yang matang, Lilipaly tidak hanya menutup jalur umpan lawan tetapi juga secara cepat mengalirkan bola hasil turnover langsung ke zona berbahaya (danger zone) lawan.`
      },
      {
        heading: '3. Konversi High Turnover Menjadi Peluang Gol Bersih',
        content: `Merebut bola di area tinggi saja tidak cukup jika tidak diimbangi dengan keputusan cepat di sepertiga akhir. Borneo FC mencatatkan 14 gol yang lahir murni dari situasi High Turnover (perebutan bola kurang dari 40 meter dari gawang lawan). Waktu rata-rata yang dibutuhkan Borneo FC dari merebut bola hingga melepaskan tembakan adalah 6.4 detik, menunjukkan vertikalitas serangan yang sangat mematikan.`
      },
      {
        heading: '4. Kesimpulan & Cara Membongkar High-Press Borneo FC',
        content: `Bagi tim yang ingin meredam dominasi Borneo FC, kunci utamanya adalah melepaskan umpan diagonal panjang langsung melompati lini presing (over the top passing), atau menggunakan kiper yang mahir melakukan build-up bawah dengan ketenangan tinggi untuk memancing presing Borneo hingga menciptakan celah besar di lini tengah.`
      }
    ]
  },
  { 
    id: 'art-3', 
    title: 'Analisis Transisi Positif & Direct Football Persebaya Surabaya di Bawah Paul Munster', 
    summary: 'Ulasan mendalam gaya bermain vertikal Bajul Ijo yang mengandalkan kecepatan wing-front dan serangan balik terukur untuk menghasilkan peluang xG berkualitas tinggi.', 
    date: '28 Juli 2026', 
    readTime: '9 mnt baca', 
    author: 'Rahmat Hidayat', 
    role: 'Senior Tactical Analyst', 
    category: 'Formasi Taktis', 
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    coverImage: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'Transisi Positif Tercepat: Rata-rata serangan balik Persebaya menghasilkan peluang tembakan dalam 8.1 detik.',
      'Eksploitasi Celah Half-Space: Kombinasi Flavio Silva dan winger aktif menciptakan 3.4 peluang emas per laga.',
      'Efisiensi Umpan Terobosan (Through-Balls): Tingkat keberhasilan umpan vertikal membelah pertahanan mencapai 68%.'
    ],
    sections: [
      {
        heading: '1. Filosofi Vertikalitas & Direct Transition',
        content: `Persebaya Surabaya di bawah asuhan Paul Munster menekankan pada efisiensi penguasaan bola. Dibandingkan melakukan ball circulation pasif di pertahanan sendiri, Persebaya lebih menyukai skema umpan langsung (direct passing) yang langsung membelah garis pertahanan pertama lawan.`
      },
      {
        heading: '2. Peran Pergerakan Tanpa Bola Flavio Silva',
        content: `Flavio Silva berperan sebagai penyerang muara (target man & runner). Dengan kekuatan fisik dan kecepatan akselerasi, ia sering melakukan decoy runs yang menarik bek tengah lawan keluar dari posisinya, membuka ruang tembak bagi gelandang serang dari lini kedua.`
      }
    ]
  }
];

const LIGA1_TEAMS = [
  { id: 1, name: 'Persib Bandung', nickname: 'Maung Bandung', played: 34, w: 24, d: 7, l: 3, gf: 59, ga: 22, gd: 37, points: 79, form: ['W', 'W', 'W', 'W', 'D'], isRelegation: false, squadSize: 28, avgXg: 1.92 },
  { id: 2, name: 'Borneo FC', nickname: 'Pesut Etam', played: 34, w: 25, d: 4, l: 5, gf: 74, ga: 31, gd: 43, points: 79, form: ['W', 'W', 'W', 'D', 'W'], isRelegation: false, squadSize: 26, avgXg: 2.05 },
  { id: 3, name: 'Persija Jakarta', nickname: 'Macan Kemayoran', played: 34, w: 22, d: 5, l: 7, gf: 65, ga: 29, gd: 36, points: 71, form: ['W', 'W', 'L', 'W', 'W'], isRelegation: false, squadSize: 29, avgXg: 1.81 },
  { id: 4, name: 'Persebaya Surabaya', nickname: 'Bajul Ijo', played: 34, w: 16, d: 10, l: 8, gf: 61, ga: 35, gd: 26, points: 58, form: ['W', 'W', 'D', 'W', 'W'], isRelegation: false, squadSize: 27, avgXg: 1.68 },
  { id: 5, name: 'PSM Makassar', nickname: 'Juku Eja', played: 34, w: 16, d: 8, l: 10, gf: 54, ga: 38, gd: 16, points: 56, form: ['W', 'D', 'W', 'L', 'W'], isRelegation: false, squadSize: 26, avgXg: 1.55 },
  { id: 6, name: 'Bhayangkara FC', nickname: 'The Guardian', played: 34, w: 16, d: 5, l: 13, gf: 53, ga: 45, gd: 8, points: 53, form: ['L', 'L', 'W', 'L', 'W'], isRelegation: false, squadSize: 28, avgXg: 1.48 },
  { id: 7, name: 'Malut United', nickname: 'Laskar Kie Raha', played: 34, w: 15, d: 8, l: 11, gf: 68, ga: 53, gd: 15, points: 53, form: ['W', 'W', 'L', 'D', 'L'], isRelegation: false, squadSize: 25, avgXg: 1.62 },
  { id: 8, name: 'Dewa United', nickname: 'Tangsel Warriors', played: 34, w: 16, d: 5, l: 13, gf: 44, ga: 37, gd: 7, points: 53, form: ['W', 'W', 'W', 'L', 'L'], isRelegation: false, squadSize: 27, avgXg: 1.42 },
  { id: 9, name: 'Bali United', nickname: 'Serdadu Tridatu', played: 34, w: 14, d: 9, l: 11, gf: 57, ga: 48, gd: 9, points: 51, form: ['W', 'L', 'L', 'W', 'W'], isRelegation: false, squadSize: 30, avgXg: 1.51 },
  { id: 10, name: 'Arema FC', nickname: 'Singo Edan', played: 34, w: 13, d: 9, l: 12, gf: 53, ga: 47, gd: 6, points: 48, form: ['L', 'L', 'W', 'W', 'W'], isRelegation: false, squadSize: 28, avgXg: 1.39 },
  { id: 11, name: 'Persik Kediri', nickname: 'Macan Putih', played: 34, w: 13, d: 8, l: 13, gf: 48, ga: 46, gd: 2, points: 47, form: ['D', 'W', 'L', 'W', 'D'], isRelegation: false, squadSize: 26, avgXg: 1.35 },
  { id: 12, name: 'Persita Tangerang', nickname: 'Pendekar Cisadane', played: 34, w: 13, d: 6, l: 15, gf: 38, ga: 37, gd: 1, points: 45, form: ['W', 'L', 'L', 'D', 'L'], isRelegation: false, squadSize: 27, avgXg: 1.24 },
  { id: 13, name: 'Persis Solo', nickname: 'Laskar Sambernyawa', played: 34, w: 12, d: 8, l: 14, gf: 50, ga: 52, gd: -2, points: 44, form: ['L', 'W', 'D', 'W', 'L'], isRelegation: false, squadSize: 29, avgXg: 1.38 },
  { id: 14, name: 'Barito Putera', nickname: 'Laskar Antasari', played: 34, w: 11, d: 8, l: 15, gf: 43, ga: 51, gd: -8, points: 41, form: ['D', 'L', 'W', 'L', 'D'], isRelegation: false, squadSize: 26, avgXg: 1.21 },
  { id: 15, name: 'PSIS Semarang', nickname: 'Laskar Mahesa Jenar', played: 34, w: 10, d: 8, l: 16, gf: 39, ga: 53, gd: -14, points: 38, form: ['L', 'L', 'D', 'W', 'L'], isRelegation: false, squadSize: 27, avgXg: 1.15 },
  { id: 16, name: 'Madura United', nickname: 'Laskar Sapeh Kerrab', played: 34, w: 9, d: 9, l: 16, gf: 41, ga: 62, gd: -21, points: 36, form: ['L', 'D', 'L', 'L', 'W'], isRelegation: true, squadSize: 28, avgXg: 1.18 },
  { id: 17, name: 'PSS Sleman', nickname: 'Super Elja', played: 34, w: 8, d: 10, l: 16, gf: 36, ga: 56, gd: -20, points: 34, form: ['L', 'L', 'D', 'D', 'L'], isRelegation: true, squadSize: 26, avgXg: 1.10 },
  { id: 18, name: 'Semen Padang', nickname: 'Kabau Sirah', played: 34, w: 7, d: 10, l: 17, gf: 33, ga: 58, gd: -25, points: 31, form: ['L', 'D', 'L', 'L', 'L'], isRelegation: true, squadSize: 25, avgXg: 1.02 },
];

const PAST_MATCHES_HISTORY = [
  { id: 'hist-1', matchday: 'Pekan 18', date: '28 Juli 2026', home: 'Persib Bandung', away: 'Persebaya Surabaya', homeScore: 3, awayScore: 1, htHome: 1, htAway: 0, homeXg: 2.34, awayXg: 1.12, stadium: 'Gelora Bandung Lautan Api', motm: 'David da Silva (8.9)', possession: '58% - 42%' },
  { id: 'hist-2', matchday: 'Pekan 18', date: '27 Juli 2026', home: 'Persija Jakarta', away: 'Borneo FC', homeScore: 2, awayScore: 2, htHome: 0, htAway: 1, homeXg: 1.85, awayXg: 1.94, stadium: 'Gelora Bung Karno', motm: 'Stefano Lilipaly (8.6)', possession: '51% - 49%' },
  { id: 'hist-3', matchday: 'Pekan 18', date: '26 Juli 2026', home: 'PSM Makassar', away: 'Bali United', homeScore: 1, awayScore: 0, htHome: 0, htAway: 0, homeXg: 1.22, awayXg: 0.88, stadium: 'Gelora B.J. Habibie', motm: 'Yuran Fernandes (8.2)', possession: '44% - 56%' },
  { id: 'hist-4', matchday: 'Pekan 17', date: '21 Juli 2026', home: 'Arema FC', away: 'Persib Bandung', homeScore: 0, awayScore: 2, htHome: 0, htAway: 1, homeXg: 0.76, awayXg: 2.10, stadium: 'Kanjuruhan', motm: 'Ciro Alves (8.7)', possession: '40% - 60%' },
  { id: 'hist-5', matchday: 'Pekan 17', date: '20 Juli 2026', home: 'Borneo FC', away: 'Dewa United', homeScore: 4, awayScore: 1, htHome: 2, htAway: 0, homeXg: 3.15, awayXg: 0.95, stadium: 'Segiri Samarinda', motm: 'Terens Puhiri (9.1)', possession: '62% - 38%' },
  { id: 'hist-6', matchday: 'Pekan 17', date: '19 Juli 2026', home: 'Persebaya Surabaya', away: 'Persis Solo', homeScore: 2, awayScore: 0, htHome: 1, htAway: 0, homeXg: 1.90, awayXg: 0.65, stadium: 'Gelora Bung Tomo', motm: 'Flavio Silva (8.4)', possession: '55% - 45%' },
  { id: 'hist-7', matchday: 'Pekan 16', date: '14 Juli 2026', home: 'Malut United', away: 'Persija Jakarta', homeScore: 1, awayScore: 3, htHome: 1, htAway: 1, homeXg: 1.10, awayXg: 2.45, stadium: 'Gelora Kie Raha', motm: 'Marko Simic (8.8)', possession: '46% - 54%' },
  { id: 'hist-8', matchday: 'Pekan 16', date: '13 Juli 2026', home: 'Persik Kediri', away: 'PSM Makassar', homeScore: 1, awayScore: 1, htHome: 0, htAway: 1, homeXg: 1.15, awayXg: 1.30, stadium: 'Brawijaya Kediri', motm: 'Ramiro Fergonzi (7.9)', possession: '50% - 50%' },
];

const TOP_PLAYERS = [
  { id: 'p1', name: 'David da Silva', team: 'Persib Bandung', position: 'ST', goals: 26, assists: 7, rating: 8.2, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'p2', name: 'Stefano Lilipaly', team: 'Borneo FC', position: 'RW', goals: 18, assists: 14, rating: 8.0, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'p3', name: 'Marko Simic', team: 'Persija Jakarta', position: 'ST', goals: 17, assists: 4, rating: 7.7, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 'p4', name: 'Flavio Silva', team: 'Persebaya Surabaya', position: 'CF', goals: 15, assists: 5, rating: 7.5, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
];

const AnimatedCounter = ({ value, duration = 1600 }) => {
  const [count, setCount] = useState(0);
  const targetNum = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const hasPlus = String(value).includes('+');

  useEffect(() => {
    let startTimestamp = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Animasi transisi smooth ease-out
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * targetNum));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetNum, duration]);

  return (
    <span>
      {count}
      {hasPlus && '+'}
    </span>
  );
};

const Sparkline = ({ data = [10, 20, 15, 30, 25, 40], color = '#F97316' }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 28;
  const width = 64;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="w-16 h-7 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const TeamBadge = ({ name, size = 'md' }) => {
  const [imgError, setImgError] = useState(false);
  const info = TEAM_INFO[name] || {
    logo: `/logos/${name ? name.toLowerCase().replace(/\s+/g, '-') : 'default'}.svg`,
    bg: 'from-slate-700 to-slate-900',
    text: name ? name.substring(0, 3).toUpperCase() : 'FC',
    border: 'border-slate-600'
  };

  const logoPath = info.logo || `/logos/${name ? name.toLowerCase().replace(/\s+/g, '-') : 'default'}.svg`;
  const sizeClasses = { sm: 'w-6 h-6 text-[8px]', md: 'w-8 h-8 text-[10px]', lg: 'w-12 h-12 text-xs', xl: 'w-16 h-16 text-sm' };
  const imgSizeClasses = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-8 h-8', xl: 'w-11 h-11' };

  return (
    <div className={`${sizeClasses[size] || sizeClasses.md} rounded-xl bg-[#111827] ${info.border} border flex items-center justify-center font-extrabold text-white shadow-md select-none shrink-0 p-1 relative overflow-hidden group`}>
      {!imgError ? (
        <img
          src={logoPath}
          alt={`Logo ${name}`}
          className={`${imgSizeClasses[size] || imgSizeClasses.md} object-contain transition-transform duration-200 group-hover:scale-110`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`w-full h-full rounded-lg bg-gradient-to-br ${info.bg} flex items-center justify-center text-white font-black`}>
          <span>{info.text ? info.text.substring(0, 3) : 'FC'}</span>
        </div>
      )}
    </div>
  );
};

const formatMatchDate = (dateStr, timeStr) => {
  if (!dateStr && !timeStr) return '';
  if (!dateStr) return timeStr ? `${timeStr} WIB` : '';
  
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      const day = parsed.getDate();
      const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      const month = monthsId[parsed.getMonth()];
      const year = parsed.getFullYear();
      const time = timeStr || (parsed.getHours() !== 0 ? `${String(parsed.getHours()).padStart(2, '0')}:${String(parsed.getMinutes()).padStart(2, '0')}` : '');
      return `${day} ${month} ${year}${time ? ` • ${time} WIB` : ''}`;
    }
  } catch (e) {}

  if (typeof dateStr === 'string' && dateStr.includes('-')) {
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      return `${day} ${monthsId[monthIdx] || parts[1]} ${year}${timeStr ? ` • ${timeStr} WIB` : ''}`;
    }
  }
  return `${dateStr}${timeStr ? ` • ${timeStr} WIB` : ''}`;
};

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [language, setLanguage] = useState('id');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [activeCompareTab, setActiveCompareTab] = useState('telemetry');
  const [selectedH2HMatch, setSelectedH2HMatch] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleCategory, setArticleCategory] = useState('Semua');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [requestServiceType, setRequestServiceType] = useState('basic');
  const [requestMatchName, setRequestMatchName] = useState('');
  const [requestFocus, setRequestFocus] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Live API State for Upcoming Matches
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchUpcomingMatches = async () => {
    try {
      setIsLoadingMatches(true);
      setApiError(null);
      const res = await fetch(`https://sibundar-api.vercel.app/upcoming_matches?_t=${Date.now()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Cache-Control': 'no-cache' },
        cache: 'no-store'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: Gagal memuat data`);
      const data = await res.json();
      let matchesList = [];
      
      if (Array.isArray(data)) {
        matchesList = data;
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.matches)) matchesList = data.matches;
        else if (Array.isArray(data.data)) matchesList = data.data;
        else if (Array.isArray(data.upcoming)) matchesList = data.upcoming;
        else if (Array.isArray(data.result)) matchesList = data.result;
        else {
          const possibleArray = Object.values(data).find(val => Array.isArray(val));
          if (possibleArray) matchesList = possibleArray;
        }
      }

      setUpcomingMatches(matchesList);
    } catch (err) {
      console.warn('Gagal memuat API upcoming matches:', err);
      setApiError(err.message || 'Gagal terhubung ke API');
    } finally {
      setIsLoadingMatches(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMatches();
  }, []);

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    if (navId === 'reports') {
      setSelectedArticle(null);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setActiveNav('reports');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setIsAnalysisModalOpen(false);
      setRequestMatchName('');
      setRequestFocus('');
    }, 2000);
  };

  const openServiceModal = (serviceType) => {
    setRequestServiceType(serviceType);
    setIsAnalysisModalOpen(true);
  };

  const t = TRANSLATIONS[language];

  const NAV_ITEMS = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'matches', label: t.nav.matches, icon: Calendar },
    { id: 'statistics', label: t.nav.statistics, icon: BarChart3 },
    { id: 'teams', label: t.nav.teams, icon: Shield },
    { id: 'players', label: t.nav.players, icon: Users },
    { id: 'services', label: t.nav.services, icon: Layers },
    { id: 'reports', label: t.nav.reports, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 font-sans antialiased flex flex-col selection:bg-orange-500 selection:text-black relative overflow-x-hidden">
      
      {/* Custom Embedded CSS Animation Keyframes */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-float { animation: float-slow 6s ease-in-out infinite; }
        .animate-glow { animation: glow-pulse 4s ease-in-out infinite; }
        .animate-pop { animation: pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: translateX(-100%);
        }
        .group:hover .shimmer-effect::after {
          animation: shimmer 1.2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Background Pitch Visuals & Animated Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] border border-white rounded-[300px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white rounded-full" />
      </div>

      <div className="fixed -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-glow z-0" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-glow z-0" />

      <header className="sticky top-0 z-40 bg-[#0B1220]/90 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer group" onClick={() => handleNavClick('dashboard')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">Sibundar</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">Analisis Sepak Bola Liga 1</p>
            </div>
          </div>

          {/* Inline Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#111827]/80 p-1 rounded-2xl border border-white/[0.06] overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-300 shrink-0 transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/20 font-black scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'} transition-transform duration-300 group-hover:scale-110`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="hidden lg:flex max-w-[200px] xl:max-w-[220px] relative group">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#111827] border border-white/[0.08] px-2 sm:px-2.5 py-1.5 rounded-xl text-xs text-slate-200 font-medium hover:border-white/20 transition-colors">
              <Languages className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-[11px] sm:text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="id" className="bg-[#111827] text-white">🇮🇩 ID</option>
                <option value="en" className="bg-[#111827] text-white">🇬🇧 EN</option>
              </select>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#111827] border border-white/[0.08] text-slate-300 hover:text-white active:scale-95 transition-transform"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-white/[0.08] bg-[#0B1220]/98 backdrop-blur-2xl p-4 space-y-3 shadow-2xl animate-pop">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white placeholder-slate-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-200 ${
                      isActive 
                        ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20' 
                        : 'text-slate-300 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-orange-400'} shrink-0`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-5 md:p-8 space-y-5 md:space-y-6 max-w-[1700px] w-full mx-auto relative z-10">
        
        {activeNav === 'dashboard' && (
          <>
            {/* Hero Banner Section */}
            <section className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-950 border border-white/[0.08] p-5 sm:p-7 md:p-8 overflow-hidden shadow-2xl animate-pop">
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[150%] pointer-events-none opacity-20 transform rotate-12 translate-x-8 animate-float">
                <svg viewBox="0 0 400 260" className="w-full h-full stroke-orange-400 fill-none" strokeWidth="1.5">
                  <rect x="10" y="10" width="380" height="240" rx="6" />
                  <line x1="200" y1="10" x2="200" y2="250" />
                  <circle cx="200" cy="130" r="48" />
                  <circle cx="200" cy="130" r="3" fill="#F97316" />
                  <rect x="10" y="60" width="60" height="140" />
                  <rect x="10" y="95" width="20" height="70" />
                  <path d="M 70 105 A 35 35 0 0 1 70 155" />
                  <rect x="330" y="60" width="60" height="140" />
                  <rect x="370" y="95" width="20" height="70" />
                  <path d="M 330 105 A 35 35 0 0 2 330 155" />
                </svg>
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3 hover:bg-orange-500/20 transition-colors">
                  <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce shrink-0" />
                  <span>{t.hero.badge}</span>
                </div>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {t.hero.titleStart}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Sibundar</span>{t.hero.titleEnd}
                </h1>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
                  {t.hero.subtitle}
                </p>

                <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button 
                    onClick={() => handleNavClick('matches')}
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center gap-2 group cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{t.hero.exploreMatches}</span>
                  </button>
                  <button 
                    onClick={() => openServiceModal('basic')}
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white border border-white/10 font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0 group-hover:rotate-12 transition-transform" />
                    <span>{t.hero.requestAnalysis}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { title: t.stats.totalMatches, value: '289', change: '+12.4%', sub: t.stats.thisSeason, color: '#F97316', icon: Activity, spark: [30, 45, 55, 60, 75, 80, 95] },
                { title: t.stats.activeClubs, value: '18', change: '100%', sub: t.stats.fullCoverage, color: '#3B82F6', icon: Shield, spark: [18, 18, 18, 18, 18, 18, 18] },
                { title: t.stats.playersTracked, value: '520+', change: '+8.1%', sub: t.stats.scoutingDatabase, color: '#F59E0B', icon: Users, spark: [20, 35, 50, 65, 80, 88, 92] },
                { title: t.stats.analysisRequests, value: '142', change: '+24.5%', sub: t.stats.funAndClubs, color: '#EA580C', icon: FileText, spark: [10, 20, 30, 45, 70, 90, 110] },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="p-3.5 sm:p-5 rounded-2xl bg-[#111827]/90 border border-white/[0.07] backdrop-blur-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 group shadow-lg cursor-default relative overflow-hidden shimmer-effect">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate pr-1">{card.title}</span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 group-hover:border-orange-500/30 transition-all duration-300">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    <div className="flex items-end justify-between gap-1">
                      <div>
                        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                          <AnimatedCounter value={card.value} />
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                          <span className="text-[9px] sm:text-[11px] font-bold text-orange-400 bg-orange-500/10 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded border border-orange-500/20">
                            {card.change}
                          </span>
                        </div>
                      </div>
                      <Sparkline color={card.color} data={card.spark} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
              
              {/* Left 2 Columns */}
              <div className="lg:col-span-2 space-y-5 lg:space-y-6">
                
                {/* Featured Live Match Telemetry */}
                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#111827] to-slate-900 border border-white/[0.08] p-4 sm:p-6 relative overflow-hidden shadow-2xl hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span className="text-[10px] sm:text-xs font-extrabold tracking-wider text-red-400 uppercase">{t.featuredMatch.badge}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">{t.featuredMatch.stadium}</div>
                  </div>

                  {/* Scoreboard */}
                  <div className="grid grid-cols-3 items-center py-2 sm:py-4">
                    <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 group-hover:scale-105 transition-transform duration-300">
                      <TeamBadge name="Persib Bandung" size="lg" />
                      <div>
                        <h3 className="font-bold text-white text-xs sm:text-base">Persib Bandung</h3>
                        <p className="text-[10px] sm:text-xs text-slate-400">{t.featuredMatch.homeRank}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-5xl font-black text-white tracking-tight">2</span>
                        <span className="text-lg sm:text-2xl font-bold text-slate-600 animate-pulse">:</span>
                        <span className="text-2xl sm:text-5xl font-black text-white tracking-tight">1</span>
                      </div>
                      <div className="mt-1.5 sm:mt-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] sm:text-xs font-semibold border border-orange-500/20 shadow-inner">
                        xG: 2.14 - 1.08
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 group-hover:scale-105 transition-transform duration-300">
                      <TeamBadge name="Persija Jakarta" size="lg" />
                      <div>
                        <h3 className="font-bold text-white text-xs sm:text-base">Persija Jakarta</h3>
                        <p className="text-[10px] sm:text-xs text-slate-400">{t.featuredMatch.awayRank}</p>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Stats Bar */}
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-white/[0.06] space-y-3">
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.featuredMatch.liveTelemetry}</div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                        <span>56%</span>
                        <span className="text-slate-400 text-[10px] sm:text-[11px]">{t.featuredMatch.possession}</span>
                        <span>44%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700 ease-out" style={{ width: '56%' }} />
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700 ease-out" style={{ width: '44%' }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors">
                        <div className="text-slate-400 text-[9px] sm:text-[10px]">{t.featuredMatch.passAccuracy}</div>
                        <div className="font-extrabold text-white text-xs sm:text-sm mt-0.5">84% vs 79%</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors">
                        <div className="text-slate-400 text-[9px] sm:text-[10px]">{t.featuredMatch.corners}</div>
                        <div className="font-extrabold text-white text-xs sm:text-sm mt-0.5">6 vs 3</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors">
                        <div className="text-slate-400 text-[9px] sm:text-[10px]">{t.featuredMatch.yellowCards}</div>
                        <div className="font-extrabold text-amber-400 text-xs sm:text-sm mt-0.5">2 vs 4</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <button 
                      onClick={() => setIsCompareModalOpen(true)}
                      className="w-full py-2.5 sm:py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-extrabold text-xs transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer hover:shadow-orange-500/30"
                    >
                      <BarChart3 className="w-4 h-4 text-slate-950" />
                      <span>{t.featuredMatch.openDashboard}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>

                {/* Upcoming Matches Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{t.upcoming.title}</h2>
                      <p className="text-[10px] sm:text-xs text-slate-400">{t.upcoming.subtitle}</p>
                    </div>
                  </div>

                  {isLoadingMatches ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="p-4 rounded-2xl bg-[#111827]/90 border border-white/[0.07] animate-pulse space-y-3">
                          <div className="h-3 bg-slate-800/80 rounded w-1/2"></div>
                          <div className="h-4 bg-slate-800/80 rounded w-3/4"></div>
                          <div className="h-4 bg-slate-800/80 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : apiError && upcomingMatches.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center space-y-2">
                      <p className="text-xs text-red-400 font-semibold">Gagal memuat jadwal dari API ({apiError})</p>
                      <button 
                        onClick={fetchUpcomingMatches}
                        className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs cursor-pointer active:scale-95 transition-all"
                      >
                        Coba Muat Ulang API
                      </button>
                    </div>
                  ) : upcomingMatches.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center text-xs text-slate-400">
                      Tidak ada data pertandingan mendatang yang diterima dari API saat ini.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {upcomingMatches.map((match, idx) => {
                        const homeTeam = match.home_team || match.homeTeam || match.home || match.klub_tuan_rumah || match.team1 || match.host || match.tuan_rumah || 'Tim Home';
                        const awayTeam = match.away_team || match.awayTeam || match.away || match.klub_tamu || match.team2 || match.guest || match.tamu || 'Tim Away';
                        const stadiumName = match.stadium || match.venue || match.stadium_name || match.stadion || match.location || 'Stadion Pertandingan';
                        const matchDate = match.match_date || match.matchDate || match.date || match.tanggal || match.datetime || '';
                        const matchTime = match.match_time || match.matchTime || match.time || match.jam || match.waktu || '';
                        const matchTimeDisplay = formatMatchDate(matchDate, matchTime);
                        const matchCompetition = match.competition || match.league || match.kompetisi || match.liga || t.upcoming.derby;

                        return (
                          <div key={match._id || match.id || idx} className="p-3.5 sm:p-4 rounded-2xl bg-[#111827]/90 border border-white/[0.07] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg group">
                            <div>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2.5">
                                <span className="font-medium text-slate-300 truncate max-w-[130px]">{matchTimeDisplay || 'Jadwal API'}</span>
                                <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30 group-hover:scale-105 transition-transform">{matchCompetition}</span>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <TeamBadge name={homeTeam} size="sm" />
                                  <span className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition-colors">{homeTeam}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TeamBadge name={awayTeam} size="sm" />
                                  <span className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition-colors">{awayTeam}</span>
                                </div>
                              </div>

                              <div className="mt-2.5 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-slate-400">
                                <div className="flex items-center gap-1 truncate">
                                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                                  <span className="truncate">{stadiumName}</span>
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={() => setSelectedH2HMatch({
                                id: match._id || match.id || `m${idx + 1}`,
                                home: homeTeam,
                                away: awayTeam,
                                stadium: stadiumName,
                                time: matchTimeDisplay
                              })}
                              className="mt-3 w-full py-2 rounded-lg bg-white/[0.05] hover:bg-orange-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-white/[0.08] transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                            >
                              <span>{t.upcoming.viewStats}</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Liga 1 Standings Table */}
                <div className="rounded-2xl sm:rounded-3xl bg-[#111827]/90 border border-white/[0.07] p-4 sm:p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{t.standings.title}</h2>
                      <p className="text-[10px] sm:text-xs text-slate-400">{t.standings.subtitle}</p>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {t.standings.matchday}
                    </span>
                  </div>

                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
                    <table className="w-full text-left text-xs min-w-[620px]">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-slate-400 font-semibold uppercase text-[9px] sm:text-[10px] tracking-wider">
                          <th className="pb-2.5 pl-2">{t.standings.pos}</th>
                          <th className="pb-2.5">{t.standings.club}</th>
                          <th className="pb-2.5 text-center">{t.standings.mp}</th>
                          <th className="pb-2.5 text-center">{t.standings.w}</th>
                          <th className="pb-2.5 text-center">{t.standings.d}</th>
                          <th className="pb-2.5 text-center">{t.standings.l}</th>
                          <th className="pb-2.5 text-center">{t.standings.gf}</th>
                          <th className="pb-2.5 text-center">{t.standings.ga}</th>
                          <th className="pb-2.5 text-center">{t.standings.gd}</th>
                          <th className="pb-2.5 text-center">{t.standings.pts}</th>
                          <th className="pb-2.5 text-right pr-2">{t.standings.last5}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {LIGA1_TEAMS.map((team, idx) => (
                          <tr key={team.id} className={`hover:bg-white/[0.05] transition-colors duration-200 group ${team.isRelegation ? 'bg-red-500/[0.02]' : ''}`}>
                            <td className="py-2.5 pl-2 font-mono font-bold text-slate-400">
                              <div className="flex items-center gap-1">
                                <span>{idx + 1}</span>
                                {team.isRelegation && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-ping" />}
                              </div>
                            </td>
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <TeamBadge name={team.name} size="sm" />
                                <span className="font-bold text-white block truncate group-hover:text-orange-400 transition-colors">{team.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 text-center text-slate-300">{team.played}</td>
                            <td className="py-2.5 text-center text-slate-300">{team.w}</td>
                            <td className="py-2.5 text-center text-slate-300">{team.d}</td>
                            <td className="py-2.5 text-center text-slate-300">{team.l}</td>
                            <td className="py-2.5 text-center font-mono text-slate-400">{team.gf}</td>
                            <td className="py-2.5 text-center font-mono text-slate-400">{team.ga}</td>
                            <td className="py-2.5 text-center font-mono font-bold text-slate-200">{team.gd}</td>
                            <td className="py-2.5 text-center font-mono font-black text-orange-400">{team.points}</td>
                            <td className="py-2.5 text-right pr-2">
                              <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                                {team.form.map((res, fIdx) => (
                                  <span key={fIdx} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded text-[8px] font-bold flex items-center justify-center transition-transform hover:scale-125 ${
                                    res === 'W' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                    res === 'D' ? 'bg-slate-500/20 text-slate-400 border border-slate-500/30' :
                                    'bg-red-500/20 text-red-400 border border-red-500/30'
                                  }`}>
                                    {res}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-5 lg:space-y-6">
                
                {/* Top Players Spotlight */}
                <div className="rounded-2xl sm:rounded-3xl bg-[#111827]/90 border border-white/[0.07] p-4 sm:p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">{t.topPlayers.title}</h2>
                      <p className="text-[10px] sm:text-xs text-slate-400">{t.topPlayers.subtitle}</p>
                    </div>
                    <Award className="w-4 h-4 text-orange-400 shrink-0 animate-bounce" />
                  </div>

                  <div className="space-y-2.5">
                    {TOP_PLAYERS.map((player) => (
                      <div key={player.id} className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group">
                        <div className="flex items-center gap-2.5">
                          <img src={player.avatar} alt={player.name} className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0 group-hover:border-orange-400 transition-colors" />
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">{player.name}</div>
                            <div className="text-[10px] text-slate-400">{player.team} • {player.position}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-extrabold text-orange-400">{player.goals} {t.topPlayers.goals}</div>
                          <div className="text-[10px] text-slate-400">{player.assists} {t.topPlayers.assists} • <span className="text-amber-400 font-bold">{player.rating} ★</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tactical Articles Section on Dashboard */}
                <div className="rounded-2xl sm:rounded-3xl bg-[#111827]/90 border border-white/[0.07] p-4 sm:p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">{t.recentAnalysis.title}</h2>
                      <p className="text-[10px] sm:text-xs text-slate-400">{t.recentAnalysis.subtitle}</p>
                    </div>
                    <button 
                      onClick={() => handleNavClick('reports')}
                      className="text-[10px] sm:text-xs font-semibold text-orange-400 hover:underline flex items-center gap-0.5 cursor-pointer group"
                    >
                      <span>Lihat Semua</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {TACTICAL_ARTICLES.slice(0, 3).map((article) => (
                      <div 
                        key={article.id} 
                        onClick={() => handleArticleClick(article)}
                        className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${article.badgeColor}`}>
                            {article.category}
                          </span>
                          <span className="text-[9px] text-slate-400 font-medium">{article.readTime}</span>
                        </div>

                        <h3 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>

                        <div className="pt-1.5 border-t border-white/[0.04] flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 font-medium">{article.author} • {article.date}</span>
                          <span className="text-orange-400 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            Baca Artikel <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </>
        )}

        {/* Matches Tab View */}
        {activeNav === 'matches' && (
          <div className="space-y-6 animate-pop">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
                  <Calendar className="w-3.5 h-3.5 animate-pulse" />
                  <span>Histori Laga Terdaftar</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Rekam Hasil & Telemetri Pertandingan Pekan Lalu
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Hasil skor lengkap, perolehan expected goals (xG), penguasaan bola, serta statistik Man of the Match BRI Liga 1.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Filter Pekan:</span>
                <select className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer hover:border-white/20 transition-colors">
                  <option value="all">Semua Pekan (1-18)</option>
                  <option value="18">Pekan 18</option>
                  <option value="17">Pekan 17</option>
                  <option value="16">Pekan 16</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAST_MATCHES_HISTORY.map((match) => (
                <div key={match.id} className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">
                    <span className="font-bold text-orange-400">{match.matchday} • {match.date}</span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[180px]">{match.stadium}</span>
                  </div>

                  <div className="grid grid-cols-3 items-center text-center">
                    <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                      <TeamBadge name={match.home} size="md" />
                      <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">{match.home}</span>
                      <span className="text-[10px] text-orange-400 font-mono font-semibold">xG: {match.homeXg}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-black text-white tracking-tight">
                        {match.homeScore} - {match.awayScore}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">HT: {match.htHome} - {match.htAway}</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                      <TeamBadge name={match.away} size="md" />
                      <span className="text-xs font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">{match.away}</span>
                      <span className="text-[10px] text-blue-400 font-mono font-semibold">xG: {match.awayXg}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block">Penguasaan</span>
                      <span className="font-mono font-bold text-slate-300">{match.possession}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block">Man of the Match</span>
                      <span className="font-bold text-amber-400">{match.motm}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsCompareModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-orange-500 hover:text-slate-950 text-slate-200 text-xs font-extrabold border border-white/10 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Lihat Rincian Telemetri Laga</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Tab View */}
        {activeNav === 'statistics' && (
          <div className="space-y-6 animate-pop">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
                <BarChart3 className="w-3.5 h-3.5 animate-pulse" />
                <span>Pusat Data Taktis</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Statistik Tingkat Lanjut & Metrik Performa Liga 1
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Agregasi data expected goals (xG), intensitas pressing (PPDA), serta penguasaan bola sepertiga akhir (Field Tilt) seluruh tim.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* xG Leaders */}
              <div className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] space-y-4 shadow-xl hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <h3 className="font-extrabold text-white text-sm">Tim Teratas Expected Goals (xG)</h3>
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, team: 'Borneo FC', xG: '2.05 /laga', total: '69.7 Total xG' },
                    { rank: 2, team: 'Persib Bandung', xG: '1.92 /laga', total: '65.2 Total xG' },
                    { rank: 3, team: 'Persija Jakarta', xG: '1.81 /laga', total: '61.5 Total xG' },
                    { rank: 4, team: 'Persebaya Surabaya', xG: '1.68 /laga', total: '57.1 Total xG' },
                    { rank: 5, team: 'Malut United', xG: '1.62 /laga', total: '55.0 Total xG' },
                  ].map((t) => (
                    <div key={t.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-orange-500/20 hover:scale-[1.02] transition-all duration-200 cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-mono font-bold text-xs flex items-center justify-center">{t.rank}</span>
                        <span className="font-bold text-xs text-white">{t.team}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-extrabold text-xs text-orange-400">{t.xG}</div>
                        <div className="text-[10px] text-slate-500">{t.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PPDA (Pressing Intensity) */}
              <div className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] space-y-4 shadow-xl hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <h3 className="font-extrabold text-white text-sm">Intensitas Pressing (PPDA Terbaik)</h3>
                  <Activity className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, team: 'Borneo FC', ppda: '8.2', status: 'Sangat Agresif' },
                    { rank: 2, team: 'Persib Bandung', ppda: '8.4', status: 'Agresif' },
                    { rank: 3, team: 'Persebaya Surabaya', ppda: '9.1', status: 'Tinggi' },
                    { rank: 4, team: 'PSM Makassar', ppda: '9.5', status: 'Tinggi' },
                    { rank: 5, team: 'Persija Jakarta', ppda: '10.2', status: 'Moderat' },
                  ].map((t) => (
                    <div key={t.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-amber-500/20 hover:scale-[1.02] transition-all duration-200 cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">{t.rank}</span>
                        <span className="font-bold text-xs text-white">{t.team}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-extrabold text-xs text-amber-400">{t.ppda} PPDA</div>
                        <div className="text-[10px] text-slate-500">{t.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clean Sheets */}
              <div className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] space-y-4 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <h3 className="font-extrabold text-white text-sm">Peringkat Nirbobol (Clean Sheets)</h3>
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, team: 'Persib Bandung', cs: '16 Laga', ratio: '47% Laga' },
                    { rank: 2, team: 'Persija Jakarta', cs: '14 Laga', ratio: '41% Laga' },
                    { rank: 3, team: 'Borneo FC', cs: '13 Laga', ratio: '38% Laga' },
                    { rank: 4, team: 'Persebaya Surabaya', cs: '12 Laga', ratio: '35% Laga' },
                    { rank: 5, team: 'Persita Tangerang', cs: '11 Laga', ratio: '32% Laga' },
                  ].map((t) => (
                    <div key={t.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-200 cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">{t.rank}</span>
                        <span className="font-bold text-xs text-white">{t.team}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-extrabold text-xs text-emerald-400">{t.cs}</div>
                        <div className="text-[10px] text-slate-500">{t.ratio}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teams Tab View - 18 Teams Grid */}
        {activeNav === 'teams' && (
          <div className="space-y-6 animate-pop">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>18 Klub BRI Liga 1</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Direktori Klub Lengkap Musim Ini
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Profil resmi, nama pelatih kepala, stadion kandang, jumlah skuad, dan performa rata-rata xG seluruh 18 klub peserta.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {LIGA1_TEAMS.map((team, idx) => {
                const info = TEAM_INFO[team.name] || {};
                return (
                  <div key={team.id} className="p-5 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <TeamBadge name={team.name} size="md" />
                          <div>
                            <h3 className="font-black text-white text-sm group-hover:text-orange-400 transition-colors">{team.name}</h3>
                            <span className="text-[10px] text-slate-400 font-medium">{team.nickname}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 group-hover:scale-110 transition-transform">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/[0.05]">
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-[11px]">Pelatih:</span>
                          <span className="font-semibold text-white">{info.coach || 'Head Coach'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-[11px]">Stadion:</span>
                          <span className="font-semibold text-slate-300 truncate max-w-[160px]">{info.stadium || 'Stadion Klub'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-[11px]">Kota Asal:</span>
                          <span className="font-semibold text-slate-300">{info.city || 'Indonesia'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Poin / Laga</span>
                        <span className="font-mono font-extrabold text-white">{team.points} Pts ({team.played} Laga)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Rerata xG</span>
                        <span className="font-mono font-extrabold text-orange-400">{team.avgXg || '1.45'} xG</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Players Tab View */}
        {activeNav === 'players' && (
          <div className="space-y-4 animate-pop">
            <h2 className="text-xl font-bold text-white">Database Pemain & Rating xG</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {TOP_PLAYERS.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-[#111827] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 text-center space-y-2 group shadow-xl">
                  <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-orange-500 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20" />
                  <h3 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">{p.name}</h3>
                  <p className="text-xs text-slate-400">{p.team} ({p.position})</p>
                  <div className="flex justify-center gap-3 text-xs pt-2 border-t border-white/10">
                    <span className="text-orange-400 font-bold">{p.goals} Gol</span>
                    <span className="text-blue-400 font-bold">{p.assists} Assist</span>
                    <span className="text-amber-400 font-bold">{p.rating} Rating</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab View */}
        {activeNav === 'services' && (
          <section className="pt-2 space-y-6 animate-pop">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">{t.services.heading}</h2>
              <p className="text-xs sm:text-sm text-slate-400">{t.services.subheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
              {/* Basic Package */}
              <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-slate-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shadow-xl">
                <div className="mb-4">
                  <FileText className="w-8 h-8 text-slate-400 mb-3" />
                  <h3 className="text-lg font-bold text-white">{t.services.pkg1Title}</h3>
                  <div className="mt-2 text-2xl font-black text-white">{t.services.pkg1Price}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Per Pertandingan</div>
                </div>
                
                <div className="flex-1 space-y-3 my-6">
                  {t.services.pkg1Features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => openServiceModal('basic')} className="mt-auto w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 active:scale-95 text-white font-bold text-xs transition-all duration-200 cursor-pointer">
                  {t.services.btnText}
                </button>
              </div>

              {/* Pro Tactical Package */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-[#111827] border-2 border-orange-500/60 shadow-2xl shadow-orange-500/20 flex flex-col h-full relative transform md:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg animate-pulse">
                  Paling Populer
                </div>
                <div className="mb-4 pt-2">
                  <Activity className="w-8 h-8 text-orange-400 mb-3" />
                  <h3 className="text-lg font-bold text-white">{t.services.pkg2Title}</h3>
                  <div className="mt-2 text-2xl font-black text-orange-400">{t.services.pkg2Price}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Per Pertandingan</div>
                </div>
                
                <div className="flex-1 space-y-3 my-6">
                  {t.services.pkg2Features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => openServiceModal('pro')} className="mt-auto w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-slate-950 font-extrabold text-xs transition-all duration-200 shadow-lg shadow-orange-500/20 cursor-pointer">
                  {t.services.btnText}
                </button>
              </div>

              {/* Elite Scouting Package */}
              <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.08] hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shadow-xl">
                <div className="mb-4">
                  <Sparkles className="w-8 h-8 text-amber-400 mb-3 animate-pulse" />
                  <h3 className="text-lg font-bold text-white">{t.services.pkg3Title}</h3>
                  <div className="mt-2 text-2xl font-black text-white">{t.services.pkg3Price}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Per Pertandingan</div>
                </div>
                
                <div className="flex-1 space-y-3 my-6">
                  {t.services.pkg3Features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => openServiceModal('elite')} className="mt-auto w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 active:scale-95 text-white font-bold text-xs transition-all duration-200 cursor-pointer">
                  {t.services.btnText}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tactical Reports Tab View */}
        {activeNav === 'reports' && (
          <div className="space-y-6">
            {selectedArticle ? (
              <article className="max-w-4xl mx-auto space-y-6 animate-pop">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-bold text-slate-200 border border-white/10 transition-all active:scale-95 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-orange-400" />
                    <span>Kembali ke Laporan Taktis</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-95" title="Simpan Artikel">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-95" title="Bagikan Artikel">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <header className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedArticle.badgeColor}`}>
                      {selectedArticle.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {selectedArticle.readTime}
                    </span>
                    <span className="text-xs text-slate-500">• {selectedArticle.date}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    {selectedArticle.title}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {selectedArticle.summary}
                  </p>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111827] border border-white/[0.08] my-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-orange-400 font-black text-sm">
                          {selectedArticle.author.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{selectedArticle.author}</div>
                        <div className="text-[11px] text-slate-400">{selectedArticle.role}</div>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                      Sibundar Verified Analyst
                    </span>
                  </div>
                </header>

                {selectedArticle.coverImage && (
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[21/9] group">
                    <img 
                      src={selectedArticle.coverImage} 
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-80" />
                  </div>
                )}

                {selectedArticle.keyTakeaways && (
                  <div className="p-5 rounded-2xl bg-orange-500/[0.06] border border-orange-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-orange-400 font-extrabold text-xs uppercase tracking-wider">
                      <Zap className="w-4 h-4 fill-orange-400 animate-pulse" />
                      <span>Poin Taktis Utama (Key Takeaways)</span>
                    </div>
                    <ul className="space-y-2">
                      {selectedArticle.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Render Article Detailed Content Sections */}
                {selectedArticle.sections && selectedArticle.sections.length > 0 && (
                  <div className="space-y-6 pt-4 text-slate-200 text-sm leading-relaxed">
                    {selectedArticle.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-3 bg-[#111827]/60 p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-white/10 transition-colors">
                        <h2 className="text-base sm:text-lg font-bold text-orange-400 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-orange-500" />
                          <span>{sec.heading}</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ) : (
              <div className="space-y-6 animate-pop">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
                      <BookOpen className="w-3.5 h-3.5 animate-pulse" />
                      <span>Repository Laporan Taktis</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Pusat Artikel & Analisis Sepak Bola Liga 1
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    {['Semua', 'Analisis Tim', 'Metrik & Data', 'Formasi Taktis'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setArticleCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                          articleCategory === cat
                            ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                            : 'bg-white/[0.05] text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TACTICAL_ARTICLES
                    .filter(a => articleCategory === 'Semua' || a.category === articleCategory)
                    .map((article) => (
                      <div 
                        key={article.id}
                        onClick={() => handleArticleClick(article)}
                        className="p-5 rounded-3xl bg-[#111827]/90 border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl"
                      >
                        <div className="space-y-3">
                          {article.coverImage && (
                            <div className="rounded-2xl overflow-hidden aspect-video border border-white/5 relative">
                              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <span className={`absolute top-2 left-2 text-[9px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${article.badgeColor}`}>
                                {article.category}
                              </span>
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>

                            <h3 className="text-sm font-extrabold text-white group-hover:text-orange-400 transition-colors leading-snug">
                              {article.title}
                            </h3>

                            <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                              {article.summary}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400 font-medium">{article.author}</span>
                          <span className="text-orange-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Baca Selengkapnya</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      <footer className="mt-12 bg-[#070C15] border-t border-white/[0.08] text-slate-300 relative z-10">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            
            {/* Col 1 & 2: Brand Info & Surabaya Office */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('dashboard')}>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex items-center justify-center">
                    <Activity className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">Sibundar</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse">PRO</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Football Tactical Intelligence</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pr-2">
                {t.footer.aboutText}
              </p>

              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-orange-400">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{t.footer.officeTitle}</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 pl-5 border-l-2 border-orange-500/30">
                  <p className="font-semibold text-white">{t.footer.addressLine1}</p>
                  <p>{t.footer.addressLine2}</p>
                  <p className="text-slate-400">{t.footer.addressCity}</p>
                </div>
              </div>
            </div>

            {/* Col 3: Contact Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/[0.08] pb-2">
                {t.footer.contactTitle}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="tel:+623189012345" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{t.footer.phone}</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                    <Send className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>WhatsApp: {t.footer.whatsapp}</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:scouting@sibundar.id" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{t.footer.email}</span>
                  </a>
                </li>
                <li>
                  <a href="https://sibundar.id" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                    <Globe className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>www.sibundar.id</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Navigation */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/[0.08] pb-2">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2 text-xs">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => handleNavClick(item.id)}
                      className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer group"
                    >
                      <ChevronRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Social Media Connections */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/[0.08] pb-2">
                {t.footer.socialTitle}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dapatkan update statistik xG harian, analisis taktis, dan info telemetri langsung di medsos kami.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { name: 'Instagram', icon: InstagramIcon, color: 'hover:bg-pink-600 hover:text-white', url: '#' },
                  { name: 'YouTube', icon: YoutubeIcon, color: 'hover:bg-red-600 hover:text-white', url: '#' },
                  { name: 'Twitter / X', icon: TwitterIcon, color: 'hover:bg-sky-500 hover:text-white', url: '#' },
                  { name: 'Facebook', icon: FacebookIcon, color: 'hover:bg-blue-600 hover:text-white', url: '#' },
                  { name: 'LinkedIn', icon: LinkedinIcon, color: 'hover:bg-blue-700 hover:text-white', url: '#' },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className={`w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-300 ${s.color} hover:scale-110 hover:shadow-lg active:scale-95`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => openServiceModal('pro')}
                  className="w-full py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold text-xs border border-orange-500/20 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Minta Analisis Tim</span>
                </button>
              </div>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>{t.footer.copyright}</span>
            </div>
            <div className="text-[11px] text-slate-400 text-center sm:text-right font-medium">
              {t.footer.developedIn}
            </div>
          </div>
        </div>
      </footer>

      {/* Analysis Request Modal */}
      {isAnalysisModalOpen && (
        <div onClick={() => setIsAnalysisModalOpen(false)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-pop">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-[#111827] border border-orange-500/30 p-6 shadow-2xl relative animate-pop">
            <button onClick={() => setIsAnalysisModalOpen(false)} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 transition-all cursor-pointer active:scale-95">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{t.modalAnalysis.title}</h3>
                <p className="text-xs text-slate-400">{t.modalAnalysis.subtitle}</p>
              </div>
            </div>

            {requestSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 animate-pop">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <p className="text-sm font-bold text-emerald-400">{t.modalAnalysis.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.modalAnalysis.serviceType}</label>
                  <select 
                    value={requestServiceType}
                    onChange={(e) => setRequestServiceType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="basic">{t.modalAnalysis.option1}</option>
                    <option value="pro">{t.modalAnalysis.option2}</option>
                    <option value="elite">{t.modalAnalysis.option3}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.modalAnalysis.matchName}</label>
                  <input 
                    type="text"
                    required
                    placeholder={t.modalAnalysis.matchNamePlaceholder}
                    value={requestMatchName}
                    onChange={(e) => setRequestMatchName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t.modalAnalysis.focus}</label>
                  <textarea 
                    rows="3"
                    placeholder={t.modalAnalysis.focusPlaceholder}
                    value={requestFocus}
                    onChange={(e) => setRequestFocus(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setIsAnalysisModalOpen(false)} className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs cursor-pointer active:scale-95 transition-all">
                    {t.modalAnalysis.cancel}
                  </button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-extrabold text-xs cursor-pointer active:scale-95 transition-all shadow-lg shadow-orange-500/20">
                    {t.modalAnalysis.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Match Telemetry & Compare Modal */}
      {isCompareModalOpen && (
        <div onClick={() => setIsCompareModalOpen(false)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-pop">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-3xl bg-[#111827] border border-orange-500/30 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsCompareModalOpen(false)} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 cursor-pointer active:scale-95 transition-all">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <BarChart3 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{t.modalCompare.title}</h3>
                <p className="text-xs text-slate-400">{t.modalCompare.subtitle}</p>
              </div>
            </div>

            <div className="flex border-b border-white/10 mb-4">
              {[
                { id: 'telemetry', label: t.modalCompare.tabStats },
                { id: 'timeline', label: t.modalCompare.tabTimeline },
                { id: 'lineup', label: t.modalCompare.tabLineup },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCompareTab(tab.id)}
                  className={`py-2 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    activeCompareTab === tab.id
                      ? 'border-orange-500 text-orange-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeCompareTab === 'telemetry' && (
              <div className="space-y-3 py-2 animate-pop">
                {[
                  { label: t.modalCompare.xg, home: '2.14', away: '1.08', homeWidth: '66%', awayWidth: '34%' },
                  { label: t.modalCompare.fieldTilt, home: '61%', away: '39%', homeWidth: '61%', awayWidth: '39%' },
                  { label: t.modalCompare.ppda, home: '8.4', away: '12.1', homeWidth: '55%', awayWidth: '45%' },
                  { label: t.modalCompare.counterAttacks, home: '7', away: '4', homeWidth: '63%', awayWidth: '37%' },
                  { label: t.modalCompare.boxEntries, home: '28', away: '15', homeWidth: '65%', awayWidth: '35%' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-orange-400">{stat.home}</span>
                      <span className="text-slate-400 text-[11px]">{stat.label}</span>
                      <span className="text-blue-400">{stat.away}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-700 ease-out" style={{ width: stat.homeWidth }} />
                      <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-700 ease-out" style={{ width: stat.awayWidth }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCompareTab === 'timeline' && (
              <div className="space-y-3 py-2 text-xs animate-pop">
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between hover:scale-[1.01] transition-transform">
                  <span className="font-bold text-orange-400">14' GOL! - David da Silva</span>
                  <span className="text-slate-400">(Persib Bandung) • xG 0.68</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between hover:scale-[1.01] transition-transform">
                  <span className="font-bold text-blue-400">38' GOL! - Marko Simic</span>
                  <span className="text-slate-400">(Persija Jakarta) • xG 0.45</span>
                </div>
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between hover:scale-[1.01] transition-transform">
                  <span className="font-bold text-orange-400">62' GOL! - Ciro Alves</span>
                  <span className="text-slate-400">(Persib Bandung) • xG 0.81</span>
                </div>
              </div>
            )}

            {activeCompareTab === 'lineup' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center text-xs space-y-2 animate-pop">
                <div className="text-orange-400 font-bold">Persib Bandung (4-3-3)</div>
                <p className="text-slate-400">Mendoza; Henhen, Kuipers, Rodriguez, Rezaldi; Klok, Beltrame, Dedi; Ciro, Silva, Febri</p>
                <div className="text-blue-400 font-bold pt-2">Persija Jakarta (3-4-2-1)</div>
                <p className="text-slate-400">Andritany; Ferrari, Kudela, Hansamu; Rio, Gajos, Resky, Firza; Ryo, Maciej; Simic</p>
              </div>
            )}

            <button onClick={() => setIsCompareModalOpen(false)} className="mt-4 w-full py-2.5 rounded-xl bg-orange-500 text-slate-950 font-bold text-xs cursor-pointer active:scale-95 transition-all shadow-lg shadow-orange-500/20">
              {t.modalCompare.close}
            </button>
          </div>
        </div>
      )}

      {/* Head to Head (H2H) Modal */}
      {selectedH2HMatch && (
        <div onClick={() => setSelectedH2HMatch(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-pop">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl rounded-3xl bg-[#111827] border border-orange-500/30 p-6 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedH2HMatch(null)} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 cursor-pointer active:scale-95 transition-all">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <BarChart3 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{t.h2hModal.title}</h3>
                <p className="text-xs text-slate-400">{t.h2hModal.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
              <div className="flex flex-col items-center gap-1">
                <TeamBadge name={selectedH2HMatch.home} size="md" />
                <span className="text-xs font-bold text-white truncate max-w-[90px]">{selectedH2HMatch.home}</span>
              </div>
              <div>
                <span className="text-xs font-black uppercase text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                  VS
                </span>
                <p className="text-[10px] text-slate-400 mt-1.5 truncate">{selectedH2HMatch.stadium}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TeamBadge name={selectedH2HMatch.away} size="md" />
                <span className="text-xs font-bold text-white truncate max-w-[90px]">{selectedH2HMatch.away}</span>
              </div>
            </div>

            {(() => {
              const h2h = H2H_DATA[selectedH2HMatch.id] || { homeWins: 2, draws: 1, awayWins: 1, history: [
                { date: '27 Mar 2024', homeScore: 2, awayScore: 1, competition: 'BRI Liga 1' },
                { date: '23 Sep 2023', homeScore: 1, awayScore: 1, competition: 'BRI Liga 1' },
                { date: '11 Apr 2023', homeScore: 3, awayScore: 0, competition: 'BRI Liga 1' }
              ]};

              return (
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-orange-400">{h2h.homeWins} {t.h2hModal.wins}</span>
                    <span className="text-slate-400">{h2h.draws} {t.h2hModal.draws}</span>
                    <span className="text-blue-400">{h2h.awayWins} {t.h2hModal.wins}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">{t.h2hModal.recentEncounters}</h4>
                    {h2h.history.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                        <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300 font-bold">{selectedH2HMatch.home.split(' ')[0]}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 font-mono font-black text-white">
                            {item.homeScore} - {item.awayScore}
                          </span>
                          <span className="text-slate-300 font-bold">{selectedH2HMatch.away.split(' ')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <button onClick={() => setSelectedH2HMatch(null)} className="w-full py-2.5 rounded-xl bg-orange-500 text-slate-950 font-extrabold text-xs cursor-pointer active:scale-95 transition-all shadow-lg shadow-orange-500/20">
              {t.h2hModal.close}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}