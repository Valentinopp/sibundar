import type { Dispatch, SetStateAction } from 'react';

interface ReportsViewProps {
  selectedArticle?: unknown;
  setSelectedArticle?: Dispatch<SetStateAction<unknown>>;
  articleCategory?: string;
  setArticleCategory?: Dispatch<SetStateAction<string>>;
  TACTICAL_ARTICLES?: unknown[];
  handleArticleClick?: (article: unknown) => void;
}

/**
 * Laporan Taktis sepenuhnya ditangani oleh backend.
 * React tidak lagi me-render halaman laporan ini.
 * Komponen dibiarkan minimal agar file lama tetap aman saat tsc
 * memeriksa seluruh source tree.
 */
export default function ReportsView(_props: ReportsViewProps) {
  return null;
}
