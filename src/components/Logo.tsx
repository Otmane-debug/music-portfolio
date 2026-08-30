export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="12" y1="32" x2="12" y2="32" />
        <line x1="22" y1="20" x2="22" y2="44" />
        <line x1="32" y1="10" x2="32" y2="54" />
        <line x1="42" y1="20" x2="42" y2="44" />
        <line x1="52" y1="32" x2="52" y2="32" />
      </g>
    </svg>
  );
}
