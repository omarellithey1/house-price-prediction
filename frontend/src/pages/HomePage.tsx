import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="page-wrapper">
        <div className="brand-eyebrow">Property Valuation Tool</div>
        <PredictionForm />
      </div>
    </div>
  );
}