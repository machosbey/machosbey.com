type Kind = 'technology' | 'management' | 'trust' | 'vision' | 'mission' | 'values' | 'agile' | 'integration' | 'growth' | 'team' | 'projects';

/** Brand-blue technical illustrations. Decorative: the adjacent heading conveys their meaning. */
export default function FeatureArtwork({ kind }: { kind: Kind }) {
  return <div className={`featureArtwork featureArtwork--${kind}`} aria-hidden="true">
    <svg viewBox="0 0 320 220" fill="none" focusable="false">
      <g className="artGrid"><path d="M20 50h280M20 90h280M20 130h280M20 170h280M60 25v170M110 25v170M160 25v170M210 25v170M260 25v170" /></g>
      <ellipse className="artOrbit" cx="160" cy="116" rx="128" ry="78" />
      <g className="artDrawing" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'technology' && <>
        <path className="artWire" d="M106 83H70V55H37m69 55H42m64 27H70v38H39m175-92h37V55h31m-68 55h64m-64 27h37v38h31M139 56V30m42 26V30m-42 135v27m42-27v27" />
        <rect className="artSurface" x="105" y="56" width="110" height="110" rx="17" />
        <rect className="artBlue" x="123" y="74" width="74" height="74" rx="9" />
        <path className="artBright" d="m149 96-15 15 15 15m23-30 15 15-15 15m-8-33-8 36" />
        <g className="artNode"><circle cx="37" cy="55" r="5"/><circle cx="42" cy="110" r="5"/><circle cx="39" cy="175" r="5"/><circle cx="282" cy="55" r="5"/><circle cx="278" cy="110" r="5"/><circle cx="282" cy="175" r="5"/></g>
      </>}
      {(kind === 'management' || kind === 'agile') && <>
        <rect className="artSurface" x="56" y="39" width="208" height="150" rx="13" />
        <path className="artWire" d="M56 70h208M126 87v81m69-81v81" />
        <circle className="artNode" cx="73" cy="55" r="3"/><circle className="artNode" cx="86" cy="55" r="3"/>
        <rect className="artBlue" x="72" y="88" width="39" height="27" rx="5"/><rect className="artMuted" x="72" y="126" width="39" height="27" rx="5"/>
        <rect className="artBlue" x="140" y="88" width="39" height="51" rx="5"/><rect className="artMuted" x="208" y="88" width="39" height="26" rx="5"/>
        <path className="artBright" d="m213 139 10 10 19-23" />
        <path className="artAccent" d="M107 185c34 24 81 20 108-5m-4 16 5-17-17 2" />
      </>}
      {(kind === 'trust' || kind === 'values') && <>
        <path className="artSurface" d="m160 32 70 26v54c0 40-30 66-70 85-40-19-70-45-70-85V58Z" />
        <path className="artBlue" d="m160 51 51 19v41c0 29-22 52-51 67-29-15-51-38-51-67V70Z" />
        <path className="artBright" d="m134 107 18 19 37-41" />
        <path className="artWire" d="M76 85H48m28 54H39m205-54h28m-28 54h37" />
        <circle className="artNode" cx="43" cy="85" r="5"/><circle className="artNode" cx="277" cy="139" r="5"/>
      </>}
      {kind === 'vision' && <>
        <path className="artSurface" d="M35 111c34-49 75-73 125-73s91 24 125 73c-34 49-75 73-125 73S69 160 35 111Z" />
        <circle className="artBlue" cx="160" cy="111" r="47"/>
        <circle className="artBright" cx="160" cy="111" r="24"/>
        <circle className="artNode" cx="160" cy="111" r="9"/>
        <path className="artAccent" d="M160 17v15m0 158v15M64 41l13 13m166 114 13 13m0-140-13 13M77 168l-13 13" />
      </>}
      {kind === 'mission' && <>
        <circle className="artSurface" cx="146" cy="123" r="76"/><circle className="artBlue" cx="146" cy="123" r="53"/>
        <circle className="artBright" cx="146" cy="123" r="29"/><circle className="artNode" cx="146" cy="123" r="8"/>
        <path className="artBright" d="m148 121 91-88"/><path className="artBlue" d="m217 52 2-27 19 7 9 19-29 3"/>
        <path className="artWire" d="M49 158H27m48-103L59 39m150 146 14 14"/>
      </>}
      {kind === 'integration' && <>
        <path className="artWire" d="M160 86V51H68m92 0h91M127 117H68v57m125-57h58v57m-91-25v46" />
        <rect className="artBlue" x="126" y="84" width="68" height="66" rx="12"/>
        <path className="artBright" d="m143 117 11 11 24-25"/>
        <rect className="artSurface" x="37" y="32" width="61" height="42" rx="7"/><path className="artAccent" d="M47 45h40M47 55h19"/>
        <rect className="artSurface" x="229" y="24" width="40" height="60" rx="7"/><path className="artAccent" d="M241 71h16"/>
        <rect className="artSurface" x="39" y="160" width="58" height="34" rx="7"/><path className="artAccent" d="M49 170h38m-38 12h24"/>
        <rect className="artSurface" x="226" y="160" width="58" height="34" rx="7"/><circle className="artNode" cx="160" cy="181" r="6"/>
      </>}
      {kind === 'growth' && <>
        <path className="artWire" d="M55 36v150h218"/>
        <rect className="artMuted" x="78" y="134" width="36" height="51" rx="4"/>
        <rect className="artBlue" x="131" y="101" width="36" height="84" rx="4"/>
        <rect className="artBlue" x="184" y="66" width="36" height="119" rx="4"/>
        <path className="artBright" d="m76 109 61-41 39 7 65-47m-29 0h29v28"/>
        <circle className="artNode" cx="137" cy="68" r="5"/>
      </>}
      {kind === 'team' && <>
        <path className="artWire" d="M71 151h178M104 73l56-32 56 32"/>
        <circle className="artSurface" cx="79" cy="92" r="22"/><circle className="artSurface" cx="241" cy="92" r="22"/>
        <path className="artSurface" d="M43 167v-22c0-35 72-35 72 0v22Zm162 0v-22c0-35 72-35 72 0v22Z"/>
        <circle className="artBlue" cx="160" cy="82" r="29"/>
        <path className="artBlue" d="M113 181v-26c0-48 94-48 94 0v26Z"/>
        <path className="artBright" d="m146 152 10 10 19-23"/>
      </>}
      {kind === 'projects' && <>
        <rect className="artMuted" x="99" y="29" width="176" height="117" rx="10"/>
        <rect className="artSurface" x="69" y="51" width="176" height="117" rx="10"/>
        <rect className="artBlue" x="39" y="74" width="176" height="117" rx="10"/>
        <path className="artBright" d="M56 98h140m-140 17h39m-39 13h26"/>
        <rect className="artSurface" x="124" y="114" width="73" height="58" rx="5"/>
        <path className="artAccent" d="m135 158 15-17 12 9 22-24"/>
        <circle className="artNode" cx="62" cy="164" r="5"/>
      </>}
      </g>
      <g className="artTicks"><path d="M24 39V25h14m244 0h14v14M24 181v14h14m244 0h14v-14"/></g>
    </svg>
  </div>;
}
