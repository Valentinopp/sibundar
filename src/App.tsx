import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Shield,
  Users,
  Layers,
  FileText,
  Search,
  X,
  Menu,
  Languages,
  Zap,
  CheckCircle2,
  MapPin,
  Phone,
  Send,
  Mail,
  Globe,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import DashboardView from './components/DashboardView';
import MatchesView from './components/MatchesView';
import StatisticsView from './components/StatisticsView';
import TeamsView from './components/TeamsView';
import PlayersView from './components/PlayersView';
import ServicesView from './components/ServicesView';

const FacebookIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-4 h-4"}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TRANSLATIONS: Record<string, any> = {
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
      searchPlaceholder: 'Cari tim, pemain, statistik...',
      league: 'Sepak Bola Indonesia',
    },
    hero: {
      badge: 'Pusat Analisis Sepak Bola Indonesia',
      titleStart: 'Selamat Datang di ',
      titleEnd: ' Analisis Sepak Bola',
      subtitle: 'Statistik pertandingan, analisis taktik, dan informasi performa tim serta pemain di sepak bola Indonesia.',
      exploreMatches: 'Lihat Riwayat Pertandingan',
      requestAnalysis: 'Minta Analisis Pertandingan',
    },
    stats: {
      totalMatches: 'Total Pertandingan Dianalisis',
      thisSeason: 'Musim Ini',
      activeClubs: 'Klub Sepak Bola Indonesia',
      fullCoverage: 'Cakupan Penuh',
      playersTracked: 'Pemain Terdaftar',
      scoutingDatabase: 'Data Pemain & Tim',
      analysisRequests: 'Permintaan Analisis',
      funAndClubs: 'Komunitas & Klub',
    },
    upcoming: {
      title: 'Jadwal Pertandingan Mendatang',
      subtitle: 'Jadwal Pertandingan Sepak Bola Indonesia',
      viewAll: 'Lihat Semua Jadwal',
      derby: 'DERBY',
      viewStats: 'Lihat Statistik',
    },
    standings: {
      title: 'Tabel Klasemen Sepak Bola Indonesia',
      subtitle: 'Klasemen lengkap dan performa tim sepanjang musim',
      matchday: '',
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
      title: 'Pemain Terbaik',
      subtitle: 'Pemain dengan performa terbaik di sepak bola Indonesia',
      goals: 'Gol',
      assists: 'Assist',
    },
    recentAnalysis: {
      title: 'Artikel Taktis Terkini',
      subtitle: 'Ulasan pertandingan dan pembahasan taktik secara mendalam',
      readArticle: 'Baca Artikel',
    },
    services: {
      heading: 'Paket Laporan Pertandingan',
      subheading: 'Pilih paket laporan sesuai kebutuhan tim atau komunitas Anda',
      pkg1Title: 'Laporan Dasar',
      pkg1Price: 'Coming Soon',
      pkg1Features: [
        'Statistik Dasar (Penguasaan, Tembakan, Umpan)',
        'Formasi & Susunan Pemain',
        'Skor Akhir & Ringkasan Laga Singkat'
      ],
      pkg2Title: 'Analisis Taktis',
      pkg2Price: 'Coming Soon',
      pkg2Features: [
        'Semua fitur Laporan Dasar',
        'Statistik Serangan & Peluang',
        'Peta Pergerakan Pemain',
        'Penilaian Performa Pemain',
        'Peta Aliran Umpan'
      ],
      pkg3Title: 'Scouting Lengkap',
      pkg3Price: 'Coming Soon',
      pkg3Features: [
        'Semua fitur Analisis Taktis',
        'Analisis Video & Klip Sorotan',
        'Analisis PPDA & Area Pressing',
        'Ekspor Data (Excel/CSV)',
        'Sesi Konsultasi dengan Analis'
      ],
      btnText: 'Pilih Paket Ini'
    },
    quickActions: {
      title: 'Aksi Cepat',
      subtitle: 'Pantau pertandingan dan lakukan analisis dengan lebih cepat',
      newAnalysis: 'Analisis Baru',
      compareTeams: 'Bandingkan Tim',
    },
    footer: {
      aboutTitle: 'Tentang Sibundar',
      aboutText: 'Platform analisis sepak bola yang membantu Anda memahami pertandingan melalui data, statistik, dan pembahasan taktik untuk klub, pelatih, pemain, dan komunitas.',
      officeTitle: 'Kantor Pusat Surabaya',
      addressLine1: 'Jl. Puri Sukolilo Selatan III No. 18 Surabaya',
      addressLine2: '',
      addressCity: 'Kota Surabaya, Jawa Timur, 60119',
      contactTitle: 'Hubungi Kami',
      phone: '+62 (085) 645-075-646',
      whatsapp: '+62 856-4507-5646',
      email: 'sibundarid@gmail.com',
      quickLinks: 'Tautan Cepat',
      servicesTitle: 'Layanan & Paket',
      socialTitle: 'Media Sosial',
      copyright: '© 2026 Sibundar Football Analytics. Hak Cipta Dilindungi.',
      developedIn: 'Dikembangkan di Surabaya untuk mendukung kemajuan sepak bola Indonesia.'
    },
    modalAnalysis: {
      title: 'Ajukan Laporan Pertandingan',
      subtitle: 'Layanan analisis pertandingan Sibundar',
      serviceType: 'Pilih Paket',
      option1: 'Laporan Dasar (Rp 50.000)',
      option2: 'Analisis Taktis (Rp 200.000)',
      option3: 'Scouting Lengkap (Rp 500.000)',
      matchName: 'Nama Pertandingan atau Tim',
      matchNamePlaceholder: 'Contoh: Persib Bandung vs Persebaya atau Komunitas FC Jakarta',
      focus: 'Catatan atau Fokus Analisis (Opsional)',
      focusPlaceholder: 'Contoh: pressing, bola mati, pertahanan, serangan balik, atau hal lain yang ingin dianalisis.',
      cancel: 'Batal',
      submit: 'Kirim Permintaan',
      successMsg: 'Permintaan berhasil dikirim! Tim kami akan menghubungi Anda segera.',
    },
    modalCompare: {
      title: 'Statistik Pertandingan & Perbandingan Tim',
      subtitle: 'Perbandingan statistik dan riwayat pertemuan kedua tim',
      tabStats: 'Statistik Pertandingan',
      tabTimeline: 'Jalannya Pertandingan',
      tabLineup: 'Susunan Pemain & Rating',
      xg: 'Tembakan',
      fieldTilt: 'Penguasaan Bola',
      ppda: 'Intensitas Pressing',
      counterAttacks: 'Serangan Balik',
      boxEntries: 'Penetrasi Kotak Penalti',
      close: 'Tutup',
    },
    h2hModal: {
      title: 'Riwayat Pertemuan',
      subtitle: 'Hasil dan catatan pertemuan kedua tim',
      wins: 'Menang',
      draws: 'Seri',
      recentEncounters: '5 Pertemuan Terakhir',
      close: 'Tutup',
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
      league: 'Sepak Bola Indonesia',
    },
    hero: {
      badge: 'Indonesian Football Tactical Intelligence Center',
      titleStart: 'Welcome to ',
      titleEnd: ' Football Analytics',
      subtitle: 'Professional football statistics, tactical video telemetry, and match peluang breakdowns across Indonesian football.',
      exploreMatches: 'Explore Match History',
      requestAnalysis: 'Request Custom Analysis',
    },
    stats: {
      totalMatches: 'Total Analyzed Matches',
      thisSeason: 'This Season',
      activeClubs: 'Active Indonesian Football Clubs',
      fullCoverage: 'Full Coverage',
      playersTracked: 'Tracked Players',
      scoutingDatabase: 'Scouting Database',
      analysisRequests: 'Analysis Requests',
      funAndClubs: 'Fun Football & Clubs',
    },
    upcoming: {
      title: 'Upcoming Matches',
      subtitle: 'Upcoming Indonesian Football Match Schedule',
      viewAll: 'View Full Schedule',
      derby: 'DERBY',
      viewStats: 'View Statistics',
    },
    standings: {
      title: 'Indonesian Football Standings',
      subtitle: 'Full standings & performance form guide',
      matchday: '',
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
      subtitle: 'Best Indonesian football players ranked by xG rating',
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
      pkg1Title: 'Laporan Dasar',
      pkg1Price: 'Rp 50,000',
      pkg1Features: [
        'Basic Stats (Possession, Shots, Pass Accuracy)',
        'Formations & Lineups',
        'Final Score & Short Match Summary'
      ],
      pkg2Title: 'Analisis Taktis',
      pkg2Price: 'Rp 200,000',
      pkg2Features: [
        'All Laporan Dasar features',
        'Tembakan Data',
        'Player Movement Heatmaps',
        'Individual Player Ratings',
        'Pass Network Maps'
      ],
      pkg3Title: 'Scouting Lengkap',
      pkg3Price: 'Rp 500,000',
      pkg3Features: [
        'All Analisis Taktis features',
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
      email: 'sibundarid@gmail.com',
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
      option1: 'Laporan Dasar (Rp 50k)',
      option2: 'Analisis Taktis (Rp 200k)',
      option3: 'Scouting Lengkap (Rp 500k)',
      matchName: 'Match Name or Club',
      matchNamePlaceholder: 'Example: Persib Bandung vs Persebaya or Community FC Jakarta',
      focus: 'Additional Notes / Specific Focus (Optional)',
      focusPlaceholder: 'Specify needs: Pressing triggers, bola mati analysis, etc...',
      cancel: 'Cancel',
      submit: 'Submit Request',
      successMsg: 'Report request sent successfully! Our tactical team will contact you shortly.',
    },
    modalCompare: {
      title: 'Match Telemetry & Team Comparison',
      subtitle: 'Head-to-Head Breakdown & Tembakan',
      tabStats: 'Telemetry Stats',
      tabTimeline: 'xG Timeline & Events',
      tabLineup: 'Lineup & Player Ratings',
      xg: 'Tembakan',
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

const TEAM_INFO: Record<string, any> = {
  'Persib Bandung': {
    logo: '/logos/persib.svg',
    bg: 'from-blue-600 to-blue-900',
    text: 'PERSIB',
    border: 'border-blue-400/30',
    city: 'Bandung',
    stadium: 'Gelora Bandung Lautan Api',
    coach: 'Bojan Hodak',
  },
  'Borneo FC': {
    logo: '/logos/borneo.svg',
    bg: 'from-amber-500 to-orange-700',
    text: 'BORNEO',
    border: 'border-amber-400/30',
    city: 'Samarinda',
    stadium: 'Segiri',
    coach: 'Pieter Huistra',
  },
  'Persija Jakarta': {
    logo: '/logos/persija.svg',
    bg: 'from-orange-600 to-red-700',
    text: 'PERSIJA',
    border: 'border-orange-400/30',
    city: 'Jakarta',
    stadium: 'GBK / JIS',
    coach: 'Carlos Peña',
  },
  'Persebaya Surabaya': {
    logo: '/logos/persebaya.svg',
    bg: 'from-emerald-600 to-green-800',
    text: 'PERSEBAYA',
    border: 'border-emerald-400/30',
    city: 'Surabaya',
    stadium: 'Gelora Bung Tomo',
    coach: 'Paul Munster',
  },
  'PSM Makassar': {
    logo: '/logos/psm.svg',
    bg: 'from-red-600 to-red-900',
    text: 'PSM',
    border: 'border-red-400/30',
    city: 'Makassar',
    stadium: 'Gelora B.J. Habibie',
    coach: 'Bernardo Tavares',
  },
  'Bhayangkara FC': {
    logo: '/logos/bhayangkara.svg',
    bg: 'from-amber-600 to-yellow-800',
    text: 'BHAYANGKARA',
    border: 'border-amber-400/30',
    city: 'Jakarta',
    stadium: 'STIK Stadium',
    coach: 'Gomes de Oliveira',
  },
  'Malut United': {
    logo: '/logos/malut.svg',
    bg: 'from-red-700 to-blue-900',
    text: 'MALUT',
    border: 'border-red-400/30',
    city: 'Ternate',
    stadium: 'Gelora Kie Raha',
    coach: 'Imran Nahumarury',
  },
  'Dewa United': {
    logo: '/logos/dewa.svg',
    bg: 'from-amber-500 to-yellow-700',
    text: 'DEWA',
    border: 'border-amber-400/30',
    city: 'Tangerang',
    stadium: 'Indomilk Arena',
    coach: 'Jan Olde Riekerink',
  },
  'Bali United': {
    logo: '/logos/bali_united.svg',
    bg: 'from-red-600 to-slate-900',
    text: 'BALI',
    border: 'border-red-400/30',
    city: 'Gianyar',
    stadium: 'Kapten I Wayan Dipta',
    coach: 'Stefano Cugurra',
  },
  'Arema FC': {
    logo: '/logos/arema.svg',
    bg: 'from-blue-700 to-indigo-950',
    text: 'AREMA',
    border: 'border-blue-400/30',
    city: 'Malang',
    stadium: 'Kanjuruhan',
    coach: 'Joel Cornelli',
  },
  'Persik Kediri': {
    logo: '/logos/persik.svg',
    bg: 'from-purple-800 to-fuchsia-950',
    text: 'PERSIK',
    border: 'border-purple-400/30',
    city: 'Kediri',
    stadium: 'Brawijaya',
    coach: 'Marcelo Rospide',
  },
  'Persita Tangerang': {
    logo: '/logos/persita.svg',
    bg: 'from-purple-700 to-indigo-900',
    text: 'PERSITA',
    border: 'border-purple-400/30',
    city: 'Tangerang',
    stadium: 'Indomilk Arena',
    coach: 'Fabio Lefundes',
  },
  'Persis Solo': {
    logo: '/logos/persis.svg',
    bg: 'from-red-600 to-rose-900',
    text: 'PERSIS',
    border: 'border-red-400/30',
    city: 'Surakarta',
    stadium: 'Manahan',
    coach: 'Milomir Seslija',
  },
  'Barito Putera': {
    logo: '',
    bg: 'from-yellow-500 to-blue-800',
    text: 'BARITO',
    border: 'border-yellow-400/30',
    city: 'Banjarmasin',
    stadium: 'Demang Lehman',
    coach: 'Rahmad Darmawan',
  },
  'PSIS Semarang': {
    logo: '',
    bg: 'from-blue-600 to-indigo-900',
    text: 'PSIS',
    border: 'border-blue-400/30',
    city: 'Semarang',
    stadium: 'Jatidiri',
    coach: 'Gilbert Agius',
  },
  'Madura United': {
    logo: '/logos/madura.svg',
    bg: 'from-red-600 to-slate-900',
    text: 'MADURA',
    border: 'border-red-400/30',
    city: 'Pamekasan',
    stadium: 'Gelora Ratu Sungkeman',
    coach: 'Paulo Menezes',
  },
  'PSS Sleman': {
    logo: '/logos/pssSleman.svg',
    bg: 'from-emerald-700 to-teal-950',
    text: 'PSS',
    border: 'border-emerald-400/30',
    city: 'Sleman',
    stadium: 'Maguwoharjo',
    coach: 'Mazola Junior',
  },

  'Java United FC': {
    logo: '/logos/java_united.svg',
    bg: 'from-slate-700 to-slate-950',
    text: 'JAV',
    border: 'border-slate-400/30',
    city: '',
    stadium: '',
    coach: '',
  },

  'Garudayaksa FC': {
    logo: '/logos/garudayaksa.svg',
    bg: 'from-red-700 to-slate-950',
    text: 'GAR',
    border: 'border-red-400/30',
    city: '',
    stadium: '',
    coach: '',
  },

  'Isenmulang Kalteng FC': {
    logo: '/logos/isenmulang.svg',
    bg: 'from-emerald-700 to-slate-950',
    text: 'ISE',
    border: 'border-emerald-400/30',
    city: '',
    stadium: '',
    coach: '',
  },
  'Semen Padang': {
    logo: '/logos/semen.svg',
    bg: 'from-red-700 to-slate-900',
    text: 'SEMEN',
    border: 'border-red-400/30',
    city: 'Padang',
    stadium: 'Haji Agus Salim',
    coach: 'Eduardo Almeida',
  },
  'Persijap Jepara': {
    logo: '/logos/persijap.svg',
    bg: 'from-blue-700 to-slate-900',
    text: 'PERSIJAP',
    border: 'border-blue-400/30',
    city: 'Jepara',
    stadium: 'Gelora Bumi Kartini',
    coach: '',
  },
  'PSIM Yogyakarta': {
    logo: '/logos/psim.svg',
    bg: 'from-blue-700 to-blue-950',
    text: 'PSIM',
    border: 'border-blue-400/30',
    city: 'Yogyakarta',
    stadium: '',
    coach: '',
  },
  'PSBS Biak': {
    logo: '/logos/psbs.svg',
    bg: 'from-orange-600 to-red-900',
    text: 'PSBS',
    border: 'border-orange-400/30',
    city: 'Biak',
    stadium: '',
    coach: '',
  },
};

const H2H_DATA: Record<string, any> = {
  m1: {
    homeWins: 3,
    draws: 1,
    awayWins: 1,
    history: [
      { date: '27 Mar 2024', homeScore: 1, awayScore: 0, competition: 'Sepak Bola Indonesia' },
      { date: '23 Sep 2023', homeScore: 3, awayScore: 1, competition: 'Sepak Bola Indonesia' },
      { date: '11 Apr 2023', homeScore: 1, awayScore: 0, competition: 'Sepak Bola Indonesia' },
      { date: '01 Okt 2022', homeScore: 3, awayScore: 2, competition: 'Sepak Bola Indonesia' },
      { date: '23 Feb 2022', homeScore: 1, awayScore: 0, competition: 'Sepak Bola Indonesia' },
    ]
  },
  m2: {
    homeWins: 3,
    draws: 1,
    awayWins: 1,
    history: [
      { date: '30 Mei 2024', homeScore: 4, awayScore: 2, competition: 'Sepak Bola Indonesia' },
      { date: '25 Mei 2024', homeScore: 0, awayScore: 0, competition: 'Sepak Bola Indonesia' },
      { date: '12 Nov 2023', homeScore: 2, awayScore: 1, competition: 'Sepak Bola Indonesia' },
      { date: '08 Jul 2023', homeScore: 3, awayScore: 1, competition: 'Sepak Bola Indonesia' },
      { date: '03 Apr 2023', homeScore: 5, awayScore: 1, competition: 'Sepak Bola Indonesia' },
    ]
  },
  m3: {
    homeWins: 2,
    draws: 1,
    awayWins: 2,
    history: [
      { date: '12 Nov 2024', homeScore: 1, awayScore: 1, competition: 'Sepak Bola Indonesia' },
      { date: '12 Nov 2023', homeScore: 2, awayScore: 1, competition: 'Sepak Bola Indonesia' },
      { date: '08 Jul 2023', homeScore: 2, awayScore: 1, competition: 'Sepak Bola Indonesia' },
      { date: '01 Mar 2023', homeScore: 0, awayScore: 2, competition: 'Sepak Bola Indonesia' },
      { date: '15 Sep 2022', homeScore: 1, awayScore: 1, competition: 'Sepak Bola Indonesia' },
    ]
  }
};

const LIGA1_TEAMS = [
  {
    id: 1,
    name: 'Arema FC',
    nickname: 'Singo Edan',
    played: 1,
    w: 1,
    d: 0,
    l: 0,
    gf: 4,
    ga: 0,
    gd: 4,
    points: 3,
    form: ['W', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 2,
    name: 'Persib Bandung',
    nickname: 'Maung Bandung',
    played: 1,
    w: 1,
    d: 0,
    l: 0,
    gf: 3,
    ga: 1,
    gd: 2,
    points: 3,
    form: ['W', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 3,
    name: 'Madura United FC',
    nickname: 'Laskar Sape Kerrab',
    played: 1,
    w: 1,
    d: 0,
    l: 0,
    gf: 2,
    ga: 0,
    gd: 2,
    points: 3,
    form: ['W', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 4,
    name: 'Bali United FC',
    nickname: 'Serdadu Tridatu',
    played: 1,
    w: 1,
    d: 0,
    l: 0,
    gf: 2,
    ga: 1,
    gd: 1,
    points: 3,
    form: ['W', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 5,
    name: 'Dewa United Banten FC',
    nickname: 'Tangsel Warriors',
    played: 1,
    w: 1,
    d: 0,
    l: 0,
    gf: 1,
    ga: 0,
    gd: 1,
    points: 3,
    form: ['W', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 6,
    name: 'Persija Jakarta',
    nickname: 'Macan Kemayoran',
    played: 1,
    w: 1,
    d: 0,
    l: 0,
    gf: 1,
    ga: 0,
    gd: 1,
    points: 3,
    form: ['W', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 7,
    name: 'Persita',
    nickname: 'Pendekar Cisadane',
    played: 1,
    w: 0,
    d: 1,
    l: 0,
    gf: 1,
    ga: 1,
    gd: 0,
    points: 1,
    form: ['D', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 8,
    name: 'Persebaya Surabaya',
    nickname: 'Bajul Ijo',
    played: 1,
    w: 0,
    d: 1,
    l: 0,
    gf: 1,
    ga: 1,
    gd: 0,
    points: 1,
    form: ['D', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 9,
    name: 'Bhayangkara Presisi Lampung FC',
    nickname: 'Bhayangkara',
    played: 1,
    w: 0,
    d: 1,
    l: 0,
    gf: 1,
    ga: 1,
    gd: 0,
    points: 1,
    form: ['D', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 10,
    name: 'PSIM Yogyakarta',
    nickname: 'PSIM',
    played: 1,
    w: 0,
    d: 1,
    l: 0,
    gf: 1,
    ga: 1,
    gd: 0,
    points: 1,
    form: ['D', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 11,
    name: 'Garudayaksa FC',
    nickname: 'Garudayaksa',
    played: 1,
    w: 0,
    d: 1,
    l: 0,
    gf: 1,
    ga: 1,
    gd: 0,
    points: 1,
    form: ['D', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 12,
    name: 'PSS Sleman',
    nickname: 'Super Elja',
    played: 1,
    w: 0,
    d: 0,
    l: 1,
    gf: 1,
    ga: 2,
    gd: -1,
    points: 0,
    form: ['L', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 13,
    name: 'Persik Kediri',
    nickname: 'Macan Putih',
    played: 1,
    w: 0,
    d: 0,
    l: 1,
    gf: 0,
    ga: 1,
    gd: -1,
    points: 0,
    form: ['L', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 14,
    name: 'Borneo FC Samarinda',
    nickname: 'Pesut Etam',
    played: 1,
    w: 0,
    d: 0,
    l: 1,
    gf: 0,
    ga: 1,
    gd: -1,
    points: 0,
    form: ['L', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 15,
    name: 'PSM Makassar',
    nickname: 'Juku Eja',
    played: 1,
    w: 0,
    d: 0,
    l: 1,
    gf: 1,
    ga: 3,
    gd: -2,
    points: 0,
    form: ['L', '-', '-', '-', '-'],
    isRelegation: false,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 16,
    name: 'Persijap Jepara',
    nickname: 'Persijap',
    played: 1,
    w: 0,
    d: 0,
    l: 1,
    gf: 0,
    ga: 2,
    gd: -2,
    points: 0,
    form: ['L', '-', '-', '-', '-'],
    isRelegation: true,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 17,
    name: 'Java United FC',
    nickname: 'Java United',
    played: 1,
    w: 0,
    d: 1,
    l: 0,
    gf: 1,
    ga: 1,
    gd: 0,
    points: -1,
    form: ['D', '-', '-', '-', '-'],
    isRelegation: true,
    squadSize: 0,
    avgXg: 0,
  },
  {
    id: 18,
    name: 'Isenmulang Kalteng FC',
    nickname: 'Isenmulang',
    played: 1,
    w: 0,
    d: 0,
    l: 1,
    gf: 0,
    ga: 4,
    gd: -4,
    points: -2,
    form: ['L', '-', '-', '-', '-'],
    isRelegation: true,
    squadSize: 0,
    avgXg: 0,
  },
];

const PAST_MATCHES_HISTORY = [
    { id: "m-1", pekan: 1, tanggal: "Jumat, 8 Agustus 2025", tim_home: "BORNEO FC SAMARINDA", tim_away: "BHAYANGKARA PRESISI LAMPUNG FC", skor: "1:0", stadion: "Segiri" },
    { id: "m-2", pekan: 1, tanggal: "Jumat, 8 Agustus 2025", tim_home: "PERSEBAYA SURABAYA", tim_away: "PSIM YOGYAKARTA", skor: "0:1", stadion: "Gelora Bung Tomo" },
    { id: "m-3", pekan: 1, tanggal: "Jumat, 8 Agustus 2025", tim_home: "PSM MAKASSAR", tim_away: "PERSIJAP JEPARA", skor: "1:1", stadion: "Gelora B. J. Habibie" },
    { id: "m-4", pekan: 1, tanggal: "Sabtu, 9 Agustus 2025", tim_home: "PERSIB BANDUNG", tim_away: "SEMEN PADANG FC", skor: "2:0", stadion: "Gelora Bandung Lautan Api" },
    { id: "m-5", pekan: 1, tanggal: "Sabtu, 9 Agustus 2025", tim_home: "DEWA UNITED BANTEN FC", tim_away: "MALUT UNITED FC", skor: "1:3", stadion: "Banten International Stadium" },
    { id: "m-6", pekan: 1, tanggal: "Sabtu, 9 Agustus 2025", tim_home: "MADURA UNITED FC", tim_away: "PERSIS SOLO", skor: "1:2", stadion: "Gelora Madura Ratu Pamelingan" },
    { id: "m-7", pekan: 1, tanggal: "Minggu, 10 Agustus 2025", tim_home: "BALI UNITED FC", tim_away: "PERSIK KEDIRI", skor: "1:1", stadion: "Kapten I Wayan Dipta" },
    { id: "m-8", pekan: 1, tanggal: "Minggu, 10 Agustus 2025", tim_home: "PERSIJA JAKARTA", tim_away: "PERSITA", skor: "4:0", stadion: "Jakarta International Stadium" },
    { id: "m-9", pekan: 1, tanggal: "Senin, 11 Agustus 2025", tim_home: "AREMA FC", tim_away: "PSBS BIAK", skor: "4:1", stadion: "Kanjuruhan" },
    { id: "m-306", pekan: 34, tanggal: "Sabtu, 23 Mei 2026", tim_home: "PERSEBAYA SURABAYA", tim_away: "PERSIK KEDIRI", skor: "5:0", stadion: "Gelora Bung Tomo" }
];

const TOP_PLAYERS = [
  { id: 'p1', name: 'David da Silva', team: 'Persib Bandung', position: 'ST', goals: 26, assists: 7, rating: 8.2, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'p2', name: 'Stefano Lilipaly', team: 'Borneo FC', position: 'RW', goals: 18, assists: 14, rating: 8.0, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'p3', name: 'Marko Simic', team: 'Persija Jakarta', position: 'ST', goals: 17, assists: 4, rating: 7.7, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 'p4', name: 'Flavio Silva', team: 'Persebaya Surabaya', position: 'CF', goals: 15, assists: 5, rating: 7.5, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
];

const AnimatedCounter = ({ value, duration = 1600 }: { value: string | number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const targetNum = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const hasPlus = String(value).includes('+');

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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

const Sparkline = ({ data = [10, 20, 15, 30, 25, 40], color = '#F97316' }: { data?: number[], color?: string }) => {
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

const normalizeTeamName = (fullName: string) => {
  if (!fullName) return '';

  const name = fullName.toUpperCase().trim();

  if (name.includes('AREMA')) return 'Arema FC';
  if (name.includes('BALI UNITED')) return 'Bali United';
  if (name.includes('BHAYANGKARA')) return 'Bhayangkara FC';
  if (name.includes('BORNEO')) return 'Borneo FC';
  if (name.includes('DEWA UNITED')) return 'Dewa United';
  if (name.includes('MADURA UNITED')) return 'Madura United';
  if (name.includes('MALUT UNITED')) return 'Malut United';
  if (name.includes('PERSEBAYA')) return 'Persebaya Surabaya';
  if (name.includes('PERSIB')) return 'Persib Bandung';
  if (name.includes('PERSIJAP')) return 'Persijap Jepara';
  if (name.includes('PERSIJA')) return 'Persija Jakarta';
  if (name.includes('PERSIK')) return 'Persik Kediri';
  if (name.includes('PERSIS')) return 'Persis Solo';
  if (name.includes('PERSITA')) return 'Persita Tangerang';
  if (name.includes('PSBS')) return 'PSBS Biak';
  if (name.includes('PSIM')) return 'PSIM Yogyakarta';
  if (name.includes('PSM')) return 'PSM Makassar';
  if (name.includes('PSS')) return 'PSS Sleman';
  if (name.includes('JAVA UNITED')) return 'Java United FC';
  if (name.includes('GARUDAYAKSA')) return 'Garudayaksa FC';
  if (name.includes('ISENMULANG')) return 'Isenmulang Kalteng FC';
  if (name.includes('SEMEN PADANG')) return 'Semen Padang';

  return fullName;
};

/**
 * SATU-SATUNYA sumber data logo klub.
 *
 * Semua komponen yang membutuhkan logo klub, termasuk
 * standing table, sebaiknya mengambil data melalui helper ini.
 */
const getTeamInfo = (teamName: string) => {
  const normalizedName = normalizeTeamName(teamName);

  return {
    normalizedName,
    info: TEAM_INFO[normalizedName] || null,
  };
};

const TeamBadge = ({
  name,
  size = 'md',
}: {
  name: string;
  size?: string;
}) => {
  const [imgError, setImgError] = useState(false);

  const { normalizedName, info } = getTeamInfo(name);

  const fallbackInfo = {
    logo: '',
    bg: 'from-slate-700 to-slate-900',
    text: normalizedName
      ? normalizedName.substring(0, 3).toUpperCase()
      : 'FC',
    border: 'border-slate-600',
  };

  const teamInfo = info || fallbackInfo;

  const sizeClasses: Record<string, string> = {
    sm: 'w-6 h-6 text-[8px]',
    md: 'w-8 h-8 text-[10px]',
    lg: 'w-12 h-12 text-xs',
    xl: 'w-16 h-16 text-sm',
  };

  const imgSizeClasses: Record<string, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-11 h-11',
  };

  return (
    <div
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        rounded-xl
        bg-[#111827]
        ${teamInfo.border}
        border
        flex
        items-center
        justify-center
        font-extrabold
        text-white
        shadow-md
        select-none
        shrink-0
        p-1
        relative
        overflow-hidden
        group
      `}
    >
      {!imgError && teamInfo.logo ? (
        <img
          src={teamInfo.logo}
          alt={`Logo ${normalizedName || name}`}
          className={`
            ${imgSizeClasses[size] || imgSizeClasses.md}
            object-contain
            transition-transform
            duration-200
            group-hover:scale-110
          `}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`
            w-full
            h-full
            rounded-lg
            bg-gradient-to-br
            ${teamInfo.bg}
            flex
            items-center
            justify-center
            text-white
            font-black
          `}
        >
          <span>{teamInfo.text?.substring(0, 3) || 'FC'}</span>
        </div>
      )}
    </div>
  );
};

const formatMatchDate = (dateStr?: string, timeStr?: string) => {
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
  const location = useLocation();
  const navigate = useNavigate();

  const [language, setLanguage] = useState('id');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [activeCompareTab, setActiveCompareTab] = useState('telemetry');
  const [selectedH2HMatch, setSelectedH2HMatch] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPekan, setSelectedPekan] = useState('1');

  // Otomatis menentukan pekan aktif hanya sekali setelah data jadwal tersedia.
  // Setelah user memilih pekan secara manual, pilihan tersebut tidak ditimpa.
  const hasInitializedCurrentWeek = useRef(false);

  // Form states
  const [requestServiceType, setRequestServiceType] = useState('basic');
  const [requestMatchName, setRequestMatchName] = useState('');
  const [requestFocus, setRequestFocus] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Live API State for Upcoming Matches
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchUpcomingMatches = async () => {
    try {
      setIsLoadingMatches(true);
      setApiError(null);
      const res = await fetch(`https://sibundar-api.vercel.app/usr/match/upcoming_matches?_t=${Date.now()}`, {
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
    } catch (err: any) {
      console.warn('Gagal memuat API upcoming matches:', err);
      setApiError(err.message || 'Gagal terhubung ke API');
    } finally {
      setIsLoadingMatches(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMatches();
  }, []);

  useEffect(() => {
    if (hasInitializedCurrentWeek.current || upcomingMatches.length === 0) {
      return;
    }

    const seasonMatches = upcomingMatches.filter(
      (match: any) => String(match.season || '2026-27') === '2026-27'
    );

    if (seasonMatches.length === 0) {
      // Tidak ada data musim aktif: tetap aman di Pekan 1.
      hasInitializedCurrentWeek.current = true;
      setSelectedPekan('1');
      return;
    }

    const getWeekNumber = (match: any): number | null => {
      const value = match.week ?? match.pekan;
      const week = Number(value);

      if (!Number.isFinite(week)) return null;
      if (week < 1 || week > 34) return null;

      return week;
    };

    // upcoming_matches berisi pertandingan yang sedang/akan dimainkan.
    // Pekan aktif = pekan terkecil yang masih memiliki pertandingan
    // belum selesai. Ini membuat sistem otomatis:
    // Pekan 1 -> Pekan 2 -> ... -> Pekan 34.
    const activeWeeks = seasonMatches
      .filter((match: any) => String(match.status || '').toLowerCase() !== 'finished')
      .map(getWeekNumber)
      .filter((week): week is number => week !== null);

    let currentWeek: number;

    if (activeWeeks.length > 0) {
      currentWeek = Math.min(...activeWeeks);
    } else {
      // Fallback jika seluruh pertandingan yang dikembalikan API sudah selesai.
      const allWeeks = seasonMatches
        .map(getWeekNumber)
        .filter((week): week is number => week !== null);

      currentWeek = allWeeks.length > 0 ? Math.max(...allWeeks) : 1;
    }

    hasInitializedCurrentWeek.current = true;
    setSelectedPekan(String(currentWeek));
  }, [upcomingMatches]);

  const handleNavClick = (_path: string) => {
    setIsMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);

    setTimeout(() => {
      setRequestSubmitted(false);
      setIsAnalysisModalOpen(false);
      setRequestMatchName('');
      setRequestFocus('');
    }, 2000);
  };

  const openServiceModal = (serviceType: string) => {
    setRequestServiceType(serviceType);
    setIsAnalysisModalOpen(true);
  };

  const t = TRANSLATIONS[language];

  const NAV_ITEMS = [
    { id: '/', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: '/matches', label: t.nav.matches, icon: Calendar },
    { id: '/statistics', label: t.nav.statistics, icon: BarChart3 },
    { id: '/teams', label: t.nav.teams, icon: Shield },
    { id: '/players', label: t.nav.players, icon: Users },
    { id: '/services', label: t.nav.services, icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 font-sans antialiased flex flex-col selection:bg-orange-500 selection:text-black relative overflow-x-hidden">
      
      {/* Styles */}
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
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] border border-white rounded-[300px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white rounded-full" />
      </div>

      <div className="fixed -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-glow z-0" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-glow z-0" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0B1220]/90 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
          
          <Link to="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer group" onClick={() => handleNavClick('/')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center translate-y-[2px]">
              <img 
                src="/favicon.png" 
                alt="Logo Sibundar" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">Sibundar</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">Analisis Sepak Bola Indonesia</p>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 bg-[#111827]/80 p-1 rounded-2xl border border-white/[0.06] overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-300 shrink-0 transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/20 font-black scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive
                        ? 'text-slate-950'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <a
              href="/report"
              className="flex items-center gap-2 py-1.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-300 shrink-0 transform active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.nav.reports}</span>
            </a>
          </nav>

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
                const isActive =
                  location.pathname === item.id;

                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                        : 'text-slate-300 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-slate-950'
                            : 'text-orange-400'
                        } shrink-0`}
                      />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}

              <a
                href="/report"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-200 ${
                  location.pathname === '/report'
                    ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                    : 'text-slate-300 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText
                    className={`w-4 h-4 ${
                      location.pathname === '/report'
                        ? 'text-slate-950'
                        : 'text-orange-400'
                    } shrink-0`}
                  />
                  <span>{t.nav.reports}</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Container Dynamic Views */}
      <main className="flex-1 p-3 sm:p-5 md:p-8 space-y-5 md:space-y-6 max-w-[1700px] w-full mx-auto relative z-10">
        <Routes>
          <Route path="/" element={
            <DashboardView
              t={t}
              handleNavClick={(navId: string) => navigate(navId === 'dashboard' ? '/' : `/${navId}`)}
              openServiceModal={openServiceModal}
              isLoadingMatches={isLoadingMatches}
              apiError={apiError}
              upcomingMatches={upcomingMatches}
              fetchUpcomingMatches={fetchUpcomingMatches}
              setSelectedH2HMatch={setSelectedH2HMatch}
              LIGA1_TEAMS={LIGA1_TEAMS}
              AnimatedCounter={AnimatedCounter}
              Sparkline={Sparkline}
              TeamBadge={TeamBadge}
              formatMatchDate={formatMatchDate}
            />
          } />

          <Route path="/matches" element={
            <MatchesView
              selectedPekan={selectedPekan}
              setSelectedPekan={setSelectedPekan}
              searchQuery={searchQuery}
              PAST_MATCHES_HISTORY={PAST_MATCHES_HISTORY}
              normalizeTeamName={normalizeTeamName}
              TeamBadge={TeamBadge}
            />
          } />

          <Route path="/statistics" element={<StatisticsView />} />

          <Route path="/teams" element={
            <TeamsView
              LIGA1_TEAMS={LIGA1_TEAMS}
              TEAM_INFO={TEAM_INFO}
              TeamBadge={TeamBadge}
            />
          } />

          <Route path="/players" element={<PlayersView TOP_PLAYERS={TOP_PLAYERS} />} />

          <Route path="/services" element={<ServicesView t={t} openServiceModal={openServiceModal} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#070C15] border-t border-white/[0.08] text-slate-300 relative z-10">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('/')}>
                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/favicon.png"
                    alt="Sibundar"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">Sibundar</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Football Tactical Intelligence</p>
                </div>
              </Link>

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
                  <a href="https://wa.me/6285645075646" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                    <Send className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>WhatsApp: {t.footer.whatsapp}</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:sibundarid@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
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

            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/[0.08] pb-2">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2 text-xs">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer group"
                    >
                      <ChevronRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}

                <li>
                  <a
                    href="/report"
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer group"
                  >
                    <ChevronRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    <span>{t.nav.reports}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/[0.08] pb-2">
                {t.footer.socialTitle}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dapatkan update statistik pertandingan harian, analisis taktis, dan info statistik langsung di medsos kami.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { name: 'Instagram', icon: InstagramIcon, color: 'hover:bg-pink-600 hover:text-white', url: 'https://www.instagram.com/sibundarid' },
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
                    rows={3}
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

      {/* Match Telemetry Modal */}
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
                  { label: t.modalCompare.xg, home: '14', away: '9', homeWidth: '61%', awayWidth: '39%' },
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
                  <span className="text-slate-400">(Persib Bandung)</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between hover:scale-[1.01] transition-transform">
                  <span className="font-bold text-blue-400">38' GOL! - Marko Simic</span>
                  <span className="text-slate-400">(Persija Jakarta)</span>
                </div>
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between hover:scale-[1.01] transition-transform">
                  <span className="font-bold text-orange-400">62' GOL! - Ciro Alves</span>
                  <span className="text-slate-400">(Persib Bandung)</span>
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

      {/* Head to Head Modal */}
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
                { date: '27 Mar 2024', homeScore: 2, awayScore: 1, competition: 'Sepak Bola Indonesia' },
                { date: '23 Sep 2023', homeScore: 1, awayScore: 1, competition: 'Sepak Bola Indonesia' },
                { date: '11 Apr 2023', homeScore: 3, awayScore: 0, competition: 'Sepak Bola Indonesia' }
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
                    {h2h.history.map((item: any, idx: number) => (
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