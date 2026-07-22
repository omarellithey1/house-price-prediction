import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

export default function PredictionForm() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<PredictionRequest>({
    location: "",
    carpet_area_sqft: 0,
    floor_num: 0,
    bathroom: 1,
    balcony: 0,
    furnishing: "Unfurnished",
    transaction: "Resale",
    ownership: "Freehold",
    facing: "East",
  });

  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch(() => setError("Could not load locations list"));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.location) {
      setError("Please select a location");
      return;
    }
    if (formData.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0");
      return;
    }

    setLoading(true);
    try {
      const result = await predictPrice(formData);
      navigate("/result", { state: { predictedPrice: result.predicted_price } });
    } catch (err) {
      setError("Something went wrong while predicting the price. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <h2>House Price Prediction</h2>

      <label>
        Location
        <select name="location" value={formData.location} onChange={handleChange}>
          <option value="">-- Select a location --</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </label>

      <label>
        Carpet Area (sqft)
        <input
          type="number"
          lang="en"
          name="carpet_area_sqft"
          value={formData.carpet_area_sqft}
          onChange={handleChange}
          min={1}
        />
      </label>

      <label>
        Floor
        <input
          type="number"
          lang="en"
          name="floor_num"
          value={formData.floor_num}
          onChange={handleChange}
        />
      </label>

      <label>
        Bathrooms
        <input
          type="number"
          lang="en"
          name="bathroom"
          value={formData.bathroom}
          onChange={handleChange}
          min={0}
        />
      </label>

      <label>
        Balconies
        <input
          type="number"
          lang="en"
          name="balcony"
          value={formData.balcony}
          onChange={handleChange}
          min={0}
        />
      </label>

      <label>
        Furnishing
        <select name="furnishing" value={formData.furnishing} onChange={handleChange}>
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </label>

      <label>
        Transaction
        <select name="transaction" value={formData.transaction} onChange={handleChange}>
          <option value="New Property">New Property</option>
          <option value="Resale">Resale</option>
        </select>
      </label>

      <label>
        Ownership
        <select name="ownership" value={formData.ownership} onChange={handleChange}>
          <option value="Freehold">Freehold</option>
          <option value="Co-operative Society">Co-operative Society</option>
          <option value="Power of Attorney">Power of Attorney</option>
          <option value="Leasehold">Leasehold</option>
        </select>
      </label>

      <label>
        Facing
        <select name="facing" value={formData.facing} onChange={handleChange}>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>
      </label>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </form>
  );
}