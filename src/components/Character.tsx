export function Character({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="pointer-events-none"
      style={{ width: 260 * scale, height: 400 * scale, animation: 'character-idle 3s ease-in-out infinite' }}
    >
      <svg width="100%" height="100%" viewBox="0 0 320 480" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.7))' }}>

        {/* Ground shadow */}
        <ellipse cx="160" cy="450" rx="70" ry="12" fill="#000" opacity="0.4" />

        {/* --- LEGS & PANTS --- */}
        <path d="M 140 370 L 140 430 L 157 430 L 157 370 Z" fill="#1c1a2e" />
        <path d="M 163 370 L 163 430 L 180 430 L 180 370 Z" fill="#1c1a2e" />
        {/* Shoes */}
        <path d="M 140 430 Q 128 433 133 437 L 160 437 L 157 430 Z" fill="#0b0a12" />
        <path d="M 163 430 Q 158 433 160 437 L 186 437 L 180 430 Z" fill="#0b0a12" />

        {/* --- COAT TAILS --- */}
        <path d="M 110 310 L 210 310 L 222 368 L 185 382 L 160 362 L 135 382 L 98 368 Z" fill="#2b2847" />
        <path d="M 160 310 L 185 382 L 160 362 Z" fill="#23203a" opacity="0.5" />

        {/* --- MAIN TORSO / JACKET (narrower) --- */}
        <path d="M 103 220 C 103 202, 217 202, 217 220 L 212 320 L 108 320 Z" fill="#343254" />
        {/* Coat seams */}
        <path d="M 130 270 Q 143 290 143 320" stroke="#25233c" strokeWidth="2.5" fill="none" />
        <path d="M 190 270 Q 177 290 177 320" stroke="#25233c" strokeWidth="2.5" fill="none" />

        {/* Popped collar */}
        <path d="M 116 196 Q 106 167 130 176 L 160 232 Z" fill="#2b2847" />
        <path d="M 204 196 Q 214 167 190 176 L 160 232 Z" fill="#2b2847" />

        {/* Teal V-neck undershirt */}
        <path d="M 136 192 L 160 232 L 184 192 Z" fill="#317282" />

        {/* --- ARMS (slimmer, tucked in) --- */}
        <path d="M 103 218 Q 86 262 98 308 L 114 304 Q 104 260 118 218 Z" fill="#2b2847" />
        <circle cx="101" cy="316" r="11" fill="#e5b491" />

        <path d="M 217 218 Q 234 262 222 308 L 206 304 Q 216 260 202 218 Z" fill="#2b2847" />
        <circle cx="219" cy="316" r="11" fill="#e5b491" />

        {/* --- SHOULDER STRAP --- */}
        <path d="M 106 224 L 212 298 L 206 308 L 100 234 Z" fill="#6e4e37" />

        {/* Fountain pen on strap */}
        <g transform="rotate(-38, 118, 258)">
          <rect x="115" y="242" width="7" height="32" rx="3.5" fill="#C8902A" />
          <polygon points="115,274 122,274 118.5,283" fill="#E8B830" />
          <rect x="116" y="252" width="5" height="4" rx="1" fill="#E8B830" />
          <rect x="122" y="244" width="2" height="22" rx="1" fill="#A06818" />
        </g>

        {/* Pouch / bag */}
        <rect x="196" y="290" width="38" height="33" rx="4" fill="#543825" />
        <rect x="196" y="290" width="38" height="10" rx="4" fill="#3E2618" />
        <circle cx="224" cy="311" r="4" fill="#d99938" />

        {/* --- HOLOGRAPHIC TABLET (right side, floating) --- */}
        <g opacity="0.9">
          <rect x="248" y="218" width="52" height="65" rx="6" fill="#1E2A44" opacity="0.9" />
          <rect x="248" y="218" width="52" height="65" rx="6" fill="#317282" opacity="0.12" />
          <rect x="248" y="218" width="52" height="65" rx="6" stroke="#4bc4db" strokeWidth="1.5" strokeDasharray="2 1" />
          <path d="M 255 230 L 268 230 L 268 243 L 282 243" stroke="#4bc4db" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="282" cy="243" r="2.5" fill="#4bc4db" />
          <path d="M 255 257 L 278 257" stroke="#4bc4db" strokeWidth="1" strokeLinecap="round" />
          <path d="M 255 265 L 290 265" stroke="#4bc4db" strokeWidth="1" strokeLinecap="round" />
          <rect x="277" y="226" width="14" height="11" rx="1.5" stroke="#4bc4db" strokeWidth="1" fill="none" />
          <rect x="248" y="218" width="52" height="65" rx="6" fill="none" stroke="#4bc4db" strokeWidth="4" opacity="0.1" />
        </g>

        {/* --- NECK --- */}
        <rect x="145" y="172" width="30" height="30" fill="#e5b491" />
        <path d="M 145 185 L 160 198 L 175 185 L 175 204 L 145 204 Z" fill="#cd9b78" />

        {/* --- HEAD (oval/slim, not dumpling) --- */}
        <ellipse cx="160" cy="138" rx="42" ry="48" fill="#e5b491" />

        {/* --- EARS --- */}
        <circle cx="118" cy="143" r="8" fill="#e5b491" />
        <circle cx="202" cy="143" r="8" fill="#e5b491" />

        {/* --- FACE --- */}
        {/* Almond eyes */}
        <path d="M 136 136 Q 145 129 153 136 Q 145 141 136 136 Z" fill="#ffffff" />
        <circle cx="145" cy="135" r="5" fill="#422a1d" />
        <circle cx="146" cy="134" r="1.8" fill="#ffffff" />

        <path d="M 184 136 Q 175 129 167 136 Q 175 141 184 136 Z" fill="#ffffff" />
        <circle cx="175" cy="135" r="5" fill="#422a1d" />
        <circle cx="174" cy="134" r="1.8" fill="#ffffff" />

        {/* Eyebrows */}
        <path d="M 132 127 Q 144 122 154 128" stroke="#1c1613" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 188 127 Q 176 122 166 128" stroke="#1c1613" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <path d="M 156 134 L 160 152 L 155 156" stroke="#cd9b78" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Mouth */}
        <path d="M 147 169 Q 160 174 173 169" stroke="#bc8160" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Mustache */}
        <path d="M 144 163 Q 160 158 176 163 Q 160 168 144 163 Z" fill="#1c1613" />

        {/* Soul patch */}
        <path d="M 157 174 L 163 174 L 162 181 L 158 181 Z" fill="#1c1613" />

        {/* Chin goatee */}
        <path d="M 146 185 Q 160 196 174 185 Q 160 190 146 185 Z" fill="#1c1613" />

        {/* --- HAIR --- */}
        <g fill="#1c1613">
          {/* Outer volume spikes */}
          <path d="M 115 112 L 105 87 L 125 98 L 120 73 L 140 88 L 145 62 L 162 83 L 175 62 L 180 88 L 200 73 L 195 98 L 215 87 L 205 112 Z" />
          {/* Mid volume */}
          <path d="M 110 117 Q 120 97 135 102 Q 150 82 165 102 Q 180 82 190 107 Q 205 102 210 122 Z" />
          <circle cx="120" cy="108" r="16" />
          <circle cx="140" cy="95" r="19" />
          <circle cx="165" cy="92" r="19" />
          <circle cx="185" cy="100" r="17" />
          <circle cx="200" cy="113" r="15" />
          {/* Forehead fringe — zigzag spikes hanging over brows */}
          <path d="M 112 118 L 122 136 L 130 120 L 138 142 L 146 120 L 154 144 L 162 122 L 172 142 L 178 120 L 188 136 L 194 120 L 202 132 L 208 118 Z" />
          {/* Hair texture highlights */}
          <path d="M 135 83 Q 145 73 152 86" stroke="#2a2035" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 165 80 Q 175 73 180 86" stroke="#2a2035" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 142 108 Q 150 123 152 130" stroke="#2a2035" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 172 108 Q 168 123 166 130" stroke="#2a2035" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  )
}
