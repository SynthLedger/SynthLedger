export default function Logo({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 200 150" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4361ee" />
          <stop offset="50%" stopColor="#3a86ff" />
          <stop offset="100%" stopColor="#4895ef" />
        </linearGradient>
      </defs>

      {/* Document */}
      <rect x="60" y="20" width="80" height="100" rx="10" fill="none" stroke="url(#logoGradient)" strokeWidth="4" />

      {/* Document lines */}
      <line x1="80" y1="45" x2="120" y2="45" stroke="url(#logoGradient)" strokeWidth="3" />
      <line x1="80" y1="65" x2="120" y2="65" stroke="url(#logoGradient)" strokeWidth="3" />
      <line x1="80" y1="85" x2="120" y2="85" stroke="url(#logoGradient)" strokeWidth="3" />

      {/* Wave line */}
      <path
        d="M20,100 Q40,80 60,100 T100,100 T140,100 T180,100"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Circle endpoints */}
      <circle cx="20" cy="100" r="6" fill="url(#logoGradient)" />
      <circle cx="100" cy="100" r="6" fill="url(#logoGradient)" />
      <circle cx="180" cy="100" r="6" fill="url(#logoGradient)" />
    </svg>
  )
}

