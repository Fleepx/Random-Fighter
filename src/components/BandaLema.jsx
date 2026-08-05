import { useReveal } from "../hooks/useReveal";
import "./BandaLema.css";

const LEMA = ["Entrena", "Compite", "Supérate"];

export default function BandaLema() {
  const ref = useReveal({ threshold: 0.3 });

  return (
    <div className="banda rf-reveal" ref={ref}>
      <p className="banda__lema">
        {LEMA.map((palabra, i) => (
          <span key={palabra}>
            {i > 0 && <span className="banda__punto" aria-hidden="true" />}
            {palabra}
          </span>
        ))}
      </p>
    </div>
  );
}
