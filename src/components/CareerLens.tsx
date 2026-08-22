import type { CareerLens } from "../config/site";
import { siteConfig } from "../config/site";

type CareerLensProps = {
  careerLens: CareerLens;
  setCareerLens: (lens: CareerLens) => void;
};

const options: { id: CareerLens; label: string }[] = [
  { id: "software", label: "Software Engineering" },
  { id: "data", label: "Data Engineering" },
];

export function CareerLens({ careerLens, setCareerLens }: CareerLensProps) {
  return (
    <div className="career-lens" aria-label="Career lens selector">
      <div
        className="segmented-control"
        role="group"
        aria-label="Choose portfolio emphasis"
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={option.id === careerLens ? "is-selected" : ""}
            aria-pressed={option.id === careerLens}
            onClick={() => setCareerLens(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p data-testid="lens-copy">{siteConfig.lensCopy[careerLens]}</p>
    </div>
  );
}
