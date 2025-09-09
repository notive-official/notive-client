const DEFAULT_ATTRS = [
  "allowfullscreen",
  'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"',
  'loading="lazy"',
] as const;

const YT_HOSTS = [/^www\.youtube\.com$/i, /^www\.youtube-nocookie\.com$/i];

const escapeAttr = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const normalize = (src: string) =>
  src.startsWith("//") ? "https:" + src : src;

const pickSandbox = (src: string) => {
  try {
    const h = new URL(normalize(src)).hostname;
    const isYT = YT_HOSTS.some((re) => re.test(h));
    return isYT
      ? 'sandbox="allow-scripts allow-same-origin allow-presentation"'
      : 'sandbox="allow-scripts allow-presentation" referrerpolicy="no-referrer"';
  } catch {
    return 'sandbox="allow-scripts allow-presentation" referrerpolicy="no-referrer"';
  }
};

const customizeIframeHtml = (
  src: string,
  options: {
    width?: string;
    height?: string;
    style?: string;
  }
): string => {
  const { width, height, style } = options;
  // 커스텀 속성들 (필요에 따라 수정)
  const attrs = [
    `src="${escapeAttr(src)}"`,
    `width=${width ? width : "100%"}`,
    `height=${height ? height : "100%"}`,
    `style=${style ? style : "border: none; border-radius: 8px;"}`,
    ...DEFAULT_ATTRS,
    pickSandbox(src),
  ].join(" ");

  return `<iframe ${attrs}></iframe>`;
};

export const extractSrc = (html: string): string => {
  const re =
    /<iframe\b[^>]*\bsrc\s*=\s*(["']?)([^"' >]+)\1[^>]*>(?:<\/iframe>)?/gi;

  return html.replace(re, (_m, _q, rawSrc: string) => {
    const src = normalize(rawSrc.trim());

    if (/^(javascript:|data:|blob:|file:)/i.test(src)) return "";

    try {
      const u = new URL(src);
      if (u.protocol !== "https:") return "";
    } catch {
      return "";
    }

    return src;
  });
};

export default customizeIframeHtml;
