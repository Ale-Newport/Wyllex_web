/** Original scene adapted to the editorial-flat language of the owner's Law Animation Kit.
 * The illustration shows an offer being communicated, without implying acceptance. */
export function OfferScene({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`offer-scene ${compact ? 'compact' : ''}`}
      viewBox="0 0 320 286"
      fill="none"
      aria-hidden="true"
    >
      <rect x="12" y="50" width="120" height="190" rx="14" fill="#e8e0d2" />
      <rect x="182" y="50" width="126" height="190" rx="14" fill="#dbe7df" />
      <path d="M26 241h92m77 0h98" stroke="#beb6a6" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M80 83C119 0 222 3 251 88"
        stroke="#367363"
        strokeWidth="1.7"
        strokeDasharray="3 5"
      />
      <g
        className="offer-person person-offeror"
        stroke="#303c36"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <path d="m65 173-3 62h13l6-57 4 57h13l-3-63" fill="#253e37" />
        <path d="M60 234h16v6H54c-1-4 3-6 6-6Zm24 0h15l6 6H84v-6Z" fill="#28352e" />
        <path d="M61 117q16-9 30 0l7 58q-20 9-38-1l1-57Z" fill="#698f82" />
        <path d="m89 119 11 36 20-4 3 7-30 8-13-29" fill="#698f82" />
        <path d="m66 119-15 34 12 27 7-4-8-24 14-25" fill="#698f82" />
        <path d="m68 174 6 6-5 7-6-7Zm51-24 8-1 3 5-8 5" fill="#bf8969" />
        <path d="M70 106v12q7 8 14-1v-13" fill="#bf8969" />
        <ellipse cx="77" cy="90" rx="19" ry="24" fill="#ce9875" />
        <path d="M59 91q-9-28 16-29 24-1 22 28l-8-13q-13 6-24 1l-6 13Z" fill="#423b30" />
        <path d="M68 91h1m15 0h1" strokeWidth="3" strokeLinecap="round" />
        <path d="m77 94-2 6h4m-7 6q5 3 9-1" strokeWidth="1.2" />
      </g>
      <g
        className="offer-person person-offeree"
        stroke="#303c36"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <path d="m224 175-4 59h12l9-58 5 59h12l-7-61" fill="#4c424c" />
        <path d="M219 234h14v6h-21q-2-4 7-6Zm26 0h13l8 6h-22l1-6Z" fill="#303331" />
        <path d="M219 113q21-10 35 1l4 60q-25 10-41 0l2-61Z" fill="#9b7f92" />
        <path d="m221 117-11 29-18-6-3 7 28 13 16-32" fill="#9b7f92" />
        <path d="m250 119 13 31-13 28-8-4 11-26-13-20" fill="#9b7f92" />
        <path d="m193 140-9-5-4 5 10 8Zm50 33-5 5 6 6 6-7" fill="#e1b695" />
        <path d="M231 104v13q6 8 14-1v-14" fill="#d2a785" />
        <path d="M217 95q-9-33 18-34 28-1 26 34l-6 22h-34l-4-22Z" fill="#b68c60" />
        <ellipse cx="238" cy="90" rx="18" ry="24" fill="#edc7a5" />
        <path d="M220 85q2-24 19-23 20 0 20 25l-10-15q-15 12-29 13Z" fill="#b68c60" />
        <path d="M230 92h1m15 0h1" strokeWidth="3" strokeLinecap="round" />
        <path d="m238 95-2 6h4m-6 5q5 3 9-1" strokeWidth="1.2" />
      </g>
      <g className="travelling-offer">
        <rect
          x="128"
          y="85"
          width="70"
          height="49"
          rx="4"
          fill="#fffdf7"
          stroke="#52695d"
          strokeWidth="1.5"
        />
        <path d="m130 89 33 23 33-23m-66 42 22-20m44 20-22-20" stroke="#809587" strokeWidth="1.2" />
        <circle cx="163" cy="111" r="7" fill="#17604c" />
        <path d="m160 111 2 2 4-4" stroke="#fffdf7" strokeWidth="1.2" />
      </g>
      <g fontFamily="Arial, sans-serif" fontSize="9" fill="#304c3f" textAnchor="middle">
        <text x="77" y="260">
          THE OFFEROR
        </text>
        <text x="242" y="260">
          THE OFFEREE
        </text>
      </g>
      <g className="offer-receipt">
        <rect x="201" y="28" width="86" height="20" rx="10" fill="#fffdf7" stroke="#9cb8a8" />
        <circle cx="214" cy="38" r="3" fill="#38785e" />
        <text x="223" y="41" fontFamily="Arial, sans-serif" fontSize="8" fill="#285340">
          Offer received
        </text>
      </g>
    </svg>
  );
}
