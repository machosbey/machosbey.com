export default function ValueVisual({ index }: { index: number }) {
  return <div className="valueVisual valueVisual--clear" aria-hidden="true">
    <svg viewBox="0 0 240 200" fill="none" focusable="false">
      {index === 0 ? <>
        <path className="valueGuide" d="M120 12v176M32 100h176" />
        <circle cx="120" cy="100" r="70" className="valueOutline" />
        <circle cx="120" cy="100" r="41" className="valueOutline" />
        <circle cx="120" cy="100" r="13" className="valueCore" />
        <path className="valueAccent" d="M120 30a70 70 0 0 1 70 70" />
        <circle cx="190" cy="100" r="5" className="valueCore" />
      </> : index === 1 ? <>
        <path className="valueGuide" d="M18 100h204M120 18v164" />
        <path className="valueOutline" d="m120 28 72 72-72 72-72-72Z" />
        <path className="valueAccent" d="m120 28 72 72-36 36" />
        <rect x="102" y="82" width="36" height="36" rx="3" className="valueCore" />
        <circle cx="48" cy="100" r="5" className="valueCore" />
      </> : <>
        <circle cx="72" cy="100" r="46" className="valueOutline" />
        <circle cx="120" cy="100" r="46" className="valueOutline" />
        <circle cx="168" cy="100" r="46" className="valueOutline" />
        <path className="valueAccent" d="M120 61a46 46 0 0 1 0 78 46 46 0 0 1 0-78Z" />
        <circle cx="120" cy="100" r="9" className="valueCore" />
      </>}
    </svg>
  </div>;
}
