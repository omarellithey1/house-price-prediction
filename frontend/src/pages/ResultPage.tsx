import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const predictedPrice = location.state?.predictedPrice as number | undefined;

  if (predictedPrice === undefined) {
    return (
      <div className="result-page">
        <p>No prediction found. Please fill the form first.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  function formatPrice(price: number): string {
    if (price >= 1e7) {
      return `₹ ${(price / 1e7).toFixed(2)} Cr`;
    }
    if (price >= 1e5) {
      return `₹ ${(price / 1e5).toFixed(2)} Lac`;
    }
    return `₹ ${price.toFixed(0)}`;
  }

  return (
    <div className="result-page">
      <h2>Predicted Price</h2>
      <p className="predicted-price">{formatPrice(predictedPrice)}</p>
      <button onClick={() => navigate("/")}>Predict Another</button>
    </div>
  );
}