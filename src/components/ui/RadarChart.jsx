export default function RadarChart({ data, size = 300 }) {
  const center = size / 2;
  const radius = center - 40;
  
  // Ensure we have 3 data points
  const points = data.length === 3 ? data : [
    { label: 'Vocab', value: 0 },
    { label: 'Grammar', value: 0 },
    { label: 'Reading', value: 0 }
  ];

  // Calculate coordinates for a triangle
  const getCoordinates = (value, index) => {
    // 3 axes, 120 degrees apart (-90, 30, 150 degrees)
    const angle = (index * 120 - 90) * (Math.PI / 180);
    // Values are 0-100, calculate distance from center
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const chartPoints = points.map((p, i) => {
    const coords = getCoordinates(p.value, i);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Full radar boundaries (100%)
  const bgPoints = [0, 1, 2].map(i => {
    const coords = getCoordinates(100, i);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Inner boundaries (50%)
  const midPoints = [0, 1, 2].map(i => {
    const coords = getCoordinates(50, i);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background grids */}
        <polygon points={bgPoints} fill="none" stroke="var(--sakura-200)" strokeWidth="2" />
        <polygon points={midPoints} fill="none" stroke="var(--sakura-100)" strokeWidth="2" />
        
        {/* Axes lines */}
        {[0, 1, 2].map(i => {
          const end = getCoordinates(100, i);
          return (
            <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="var(--sakura-200)" strokeWidth="2" />
          );
        })}

        {/* Data polygon */}
        <polygon points={chartPoints} fill="rgba(212, 84, 122, 0.3)" stroke="var(--sakura-700)" strokeWidth="3" />
        
        {/* Data points dots */}
        {points.map((p, i) => {
          const coords = getCoordinates(p.value, i);
          return (
            <circle key={i} cx={coords.x} cy={coords.y} r="5" fill="var(--sakura-900)" />
          );
        })}

        {/* Labels */}
        {points.map((p, i) => {
          const coords = getCoordinates(115, i); // Slightly further out for labels
          return (
            <text 
              key={i} 
              x={coords.x} 
              y={coords.y} 
              textAnchor="middle" 
              alignmentBaseline="middle"
              fontSize="12px"
              fontWeight="bold"
              fill="var(--ink)"
            >
              {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
