export function getJeansSvgDataUri(colorHex: string, label: string): string {
  const safeColor = colorHex || '#334155';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
      <rect width="400" height="480" fill="#F1F5F9"/>
      <ellipse cx="200" cy="438" rx="95" ry="12" fill="#E2E8F0"/>
      <g transform="translate(88, 48)">
        <path d="M36 16 H188 L206 372 H134 L112 152 L90 372 H18 L36 16 Z"
              fill="${safeColor}" stroke="#0F172A" stroke-opacity="0.14" stroke-width="4" stroke-linejoin="round"/>
        <rect x="35" y="16" width="154" height="24" rx="4" fill="#000000" fill-opacity="0.12"/>
        <circle cx="112" cy="28" r="5" fill="#CBD5E1"/>
        <path d="M112 40 V120" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="3" stroke-dasharray="6 5"/>
        <path d="M40 52 C68 52 78 72 78 96" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="3" fill="none"/>
        <path d="M184 52 C156 52 146 72 146 96" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="3" fill="none"/>
        <path d="M32 356 H92 M132 356 H192" stroke="#FFFFFF" stroke-opacity="0.24" stroke-width="3" stroke-dasharray="5 5"/>
      </g>
      <text x="200" y="462" text-anchor="middle" fill="#64748B" font-family="sans-serif" font-size="13" font-weight="600">
        ${label.slice(0, 32)}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
