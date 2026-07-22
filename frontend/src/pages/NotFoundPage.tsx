import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h2>404 - Page Not Found</h2>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}