import joblib
from app.core.config import settings

_model = None


def load_model():
    global _model
    _model = joblib.load(settings.model_path)
    return _model


def get_model():
    if _model is None:
        raise RuntimeError("Model not loaded yet")
    return _model


def predict_price(df) -> float:
    model = get_model()
    prediction = model.predict(df)
    return float(prediction[0])