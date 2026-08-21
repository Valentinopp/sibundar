import React, { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Article {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  category: string;
  badgeColor: string;
  coverImage?: string;
  keyTakeaways?: string[];
  sections?: Array<{
    heading: string;
    content: string;
  }>;
}

interface ReportsViewProps {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  articleCategory: string;
  setArticleCategory: (category: string) => void;
  TACTICAL_ARTICLES: Article[];
  handleArticleClick: (article: Article) => void;
}

const ARTICLES_API = 'https://sibundar-api.vercel.app/articles_html';

const prepareApiHtml = (rawHtml: string): string => {
  if (!rawHtml) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  // Keep the API page intact: CSS, JS, cards, pagination, interactions, etc.
  // Only remove the API's own shell because the frontend already provides
  // the navbar and footer.
  doc.querySelectorAll('header, nav, footer').forEach((el) => el.remove());

  // Keep the API's scripts running so pagination ("Prev / 1 / 2 / Next"),
  // filters and any other interactions continue to work exactly as on the API.
  //
  // Remove only dangerous embedded elements / inline event attributes.
  doc.querySelectorAll('iframe, object, embed').forEach((el) => el.remove());

  doc.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.toLowerCase().startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    });
  });

  const head = doc.head;
  const base = doc.createElement('base');
  base.href = 'https://sibundar-api.vercel.app/';
  head.prepend(base);

  const resetStyle = doc.createElement('style');
  resetStyle.textContent = `
    html,
    body {
      min-height: 0 !important;
      height: auto !important;
      margin: 0 !important;
      padding-bottom: 0 !important;
    }

    body > * {
      min-height: 0 !important;
      height: auto !important;
      margin-bottom: 0 !important;
    }
  `;
  doc.head.appendChild(resetStyle);

  const bridge = doc.createElement('script');
  bridge.textContent = `
    (function () {
      function sendHeight() {
        try {
          document.documentElement.style.minHeight = '0';
          document.documentElement.style.height = 'auto';
          document.body.style.minHeight = '0';
          document.body.style.height = 'auto';

          var children = Array.prototype.slice.call(
            document.body ? document.body.children : []
          );

          var bottom = 0;

          children.forEach(function (node) {
            var style = window.getComputedStyle(node);
            if (
              style.position === 'fixed' ||
              style.position === 'absolute'
            ) {
              return;
            }

            node.style.minHeight = '0';
            node.style.height = 'auto';

            var rect = node.getBoundingClientRect();
            var nodeBottom = rect.bottom + window.scrollY;

            if (nodeBottom > bottom) {
              bottom = nodeBottom;
            }
          });

          // Use only the real content bottom. Do not use scrollHeight as a
          // fallback because API wrappers may force a min-height / viewport.
          var height = Math.max(
            Math.ceil(bottom),
            document.body ? Math.ceil(document.body.scrollHeight) : 0
          );

          // Trim small trailing whitespace only.
          height = Math.max(height - 12, 300);

          window.parent.postMessage(
            { type: 'sibundar-api-height', height: height },
            '*'
          );
        } catch (e) {}
      }

      window.addEventListener('load', function () {
        sendHeight();
        setTimeout(sendHeight, 50);
        setTimeout(sendHeight, 150);
        setTimeout(sendHeight, 400);
        setTimeout(sendHeight, 900);
        setTimeout(sendHeight, 1500);
      });

      if (window.ResizeObserver) {
        new ResizeObserver(sendHeight).observe(document.documentElement);
        if (document.body) {
          new ResizeObserver(sendHeight).observe(document.body);
        }
      } else {
        setInterval(sendHeight, 500);
      }
    })();
  `;
  doc.body.appendChild(bridge);

  return '<!doctype html>\n' + doc.documentElement.outerHTML;
};

export default function ReportsView({
  // Props tetap diterima agar App.tsx lama tidak perlu diubah.
  selectedArticle,
  setSelectedArticle,
  articleCategory,
  setArticleCategory,
  TACTICAL_ARTICLES,
  handleArticleClick,
}: ReportsViewProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [iframeHeight, setIframeHeight] = useState(1200);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticlesHtml = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${ARTICLES_API}?_t=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          Accept: 'text/html, application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Gagal mengambil HTML laporan taktis`);
      }

      const contentType = response.headers.get('content-type') || '';
      const rawText = await response.text();

      // Bila API mengembalikan JSON berisi field html/content,
      // tetap dukung format tersebut.
      let html = rawText;

      if (
        contentType.includes('application/json') ||
        rawText.trim().startsWith('{') ||
        rawText.trim().startsWith('[')
      ) {
        try {
          const json = JSON.parse(rawText);

          if (typeof json === 'string') {
            html = json;
          } else if (json && typeof json === 'object') {
            const source = json as Record<string, unknown>;

            if (typeof source.html === 'string') {
              html = source.html;
            } else if (typeof source.content_html === 'string') {
              html = source.content_html;
            } else if (typeof source.article_html === 'string') {
              html = source.article_html;
            } else if (typeof source.content === 'string') {
              html = source.content;
            } else if (Array.isArray(source.articles)) {
              // Jika API memberikan daftar artikel JSON,
              // gabungkan seluruh HTML artikel agar tampil sekaligus.
              html = source.articles
                .map((item: any) =>
                  item.html || item.content_html || item.article_html || item.content || ''
                )
                .filter(Boolean)
                .join('\n');
            }
          }
        } catch {
          // Bukan JSON valid -> gunakan raw HTML.
        }
      }

      setHtmlContent(prepareApiHtml(html));
    } catch (err) {
      console.error('articles_html error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memuat laporan taktis.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleApiMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'sibundar-api-height') return;

      const height = Number(event.data.height);
      if (!Number.isFinite(height) || height < 200) return;

      setIframeHeight(Math.min(Math.max(height + 8, 500), 20000));
    };

    window.addEventListener('message', handleApiMessage);
    return () => window.removeEventListener('message', handleApiMessage);
  }, []);

  useEffect(() => {
    fetchArticlesHtml();
  }, []);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full animate-pop" aria-label="Memuat laporan taktis">
          <div className="space-y-5">
            {/* Header skeleton — mengikuti header repository API */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-white/[0.08]">
              <div className="space-y-3 min-w-0">
                {/* Badge "Repository Laporan Taktis" */}
                <div className="h-8 w-56 sm:w-64 rounded-full bg-white/[0.06] animate-pulse" />

                {/* Judul halaman */}
                <div className="h-8 sm:h-9 w-[280px] sm:w-[470px] max-w-full rounded-xl bg-white/[0.08] animate-pulse" />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {[
                  'w-20',
                  'w-28',
                  'w-28',
                  'w-20',
                  'w-24',
                  'w-28',
                ].map((width, index) => (
                  <div
                    key={index}
                    className={`${width} h-9 rounded-xl bg-white/[0.06] animate-pulse`}
                  />
                ))}
              </div>
            </div>

            {/* Article cards skeleton — 3 kolom seperti konten asli */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="p-5 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-xl space-y-4"
                >
                  {/* Thumbnail / cover */}
                  <div className="rounded-2xl overflow-hidden aspect-video border border-white/5 bg-white/[0.06] animate-pulse" />

                  {/* Meta row */}
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-20 rounded-md bg-white/[0.06] animate-pulse" />
                    <div className="h-3 w-2 rounded bg-white/[0.04] animate-pulse" />
                    <div className="h-3 w-16 rounded-md bg-white/[0.06] animate-pulse" />
                  </div>

                  {/* Title — 2 lines */}
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded-md bg-white/[0.08] animate-pulse" />
                    <div className="h-4 w-4/5 rounded-md bg-white/[0.08] animate-pulse" />
                  </div>

                  {/* Summary — 2/3 lines */}
                  <div className="space-y-2">
                    <div className="h-3.5 w-full rounded-md bg-white/[0.05] animate-pulse" />
                    <div className="h-3.5 w-11/12 rounded-md bg-white/[0.05] animate-pulse" />
                    <div className="h-3.5 w-2/3 rounded-md bg-white/[0.05] animate-pulse" />
                  </div>

                  {/* Footer row */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="h-3.5 w-16 rounded-md bg-white/[0.05] animate-pulse" />
                    <div className="h-3.5 w-28 rounded-md bg-white/[0.07] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isLoading && error && (
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="max-w-lg w-full rounded-3xl bg-[#111827] border border-red-500/20 p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>

            <h2 className="text-base font-bold text-white">
              Gagal memuat Laporan Taktis
            </h2>

            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {error}
            </p>

            <button
              onClick={fetchArticlesHtml}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-slate-950 font-bold text-xs hover:bg-orange-400 transition-colors active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {!isLoading && !error && htmlContent && (
        <div className="w-full overflow-hidden leading-none">
          <iframe
            title="Sibundar Tactical Reports"
            srcDoc={htmlContent}
            className="block w-full border-0"
            style={{
              height: `${iframeHeight}px`,
              background: 'transparent',
            }}
            scrolling="no"
          />
        </div>
      )}
    </div>
  );
}