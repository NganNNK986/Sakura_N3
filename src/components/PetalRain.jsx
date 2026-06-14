export default function PetalRain() {
  return (
    <div className="petal-rain" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="petal" />
      ))}
    </div>
  );
}
