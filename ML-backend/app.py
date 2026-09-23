# ============================================
# DevPilot ML API
# ============================================

from flask import Flask, request, jsonify

import joblib
import pandas as pd
import shap


# ============================================
# 1. Create Flask application
# ============================================

app = Flask(__name__)


# ============================================
# 2. Load trained model
# ============================================

model = joblib.load(
    "data/models/risk_model.joblib"
)

print("Model loaded successfully!")


# ============================================
# 3. Load feature list
# ============================================

features = joblib.load(
    "data/models/features.joblib"
)

print("Features loaded successfully!")

print("\nFeatures:")
print(features)


# ============================================
# 4. Create SHAP explainer
# ============================================

explainer = shap.TreeExplainer(
    model
)

print("\nSHAP explainer created successfully!")


# ============================================
# 5. Health check
# ============================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "message":
            "DevPilot ML Service is running",

        "model":
            "Random Forest",

        "features":
            len(features)

    })


# ============================================
# 6. Prediction endpoint
# ============================================

@app.route("/predict", methods=["POST"])
def predict():

    # Get JSON data
    data = request.get_json(
        silent=True
    )


    # ========================================
    # Check request data
    # ========================================

    if not isinstance(data, dict):

        return jsonify({

            "error":
                "Request body must be a JSON object"

        }), 400


    # ========================================
    # Check missing features
    # ========================================

    missing_features = [

        feature

        for feature in features

        if feature not in data

    ]


    if missing_features:

        return jsonify({

            "error":
                "Missing features",

            "missing":
                missing_features

        }), 400


    # ========================================
    # Convert features to numbers
    # ========================================

    try:

        project_data = {}

        for feature in features:

            project_data[feature] = float(
                data[feature]
            )

    except (TypeError, ValueError):

        return jsonify({

            "error":
                "All features must contain numeric values"

        }), 400


    # ========================================
    # Convert project data to DataFrame
    # ========================================

    input_data = pd.DataFrame(

        [project_data],

        columns=features

    )


    # ========================================
    # Predict risk
    # ========================================

    prediction = model.predict(
        input_data
    )[0]

    predicted_risk = str(
        prediction
    )

    print(
        "\nPredicted Risk:",
        predicted_risk
    )


    # ========================================
    # Get risk probabilities
    # ========================================

    probabilities = model.predict_proba(
        input_data
    )[0]

    classes = model.classes_


    probability_result = {}


    for class_name, probability in zip(
        classes,
        probabilities
    ):

        probability_result[
            str(class_name)
        ] = round(
            float(probability) * 100,
            2
        )


    # Make sure all three risk levels exist
    for risk_level in [
        "LOW",
        "MEDIUM",
        "HIGH"
    ]:

        if risk_level not in probability_result:

            probability_result[
                risk_level
            ] = 0.0


    # ========================================
    # Calculate SHAP values
    # ========================================

    shap_values = explainer.shap_values(
        input_data
    )


    # ========================================
    # Find predicted class
    # ========================================

    predicted_class_index = list(
        classes
    ).index(
        prediction
    )


    # ========================================
    # Get SHAP values
    # ========================================

    # Older SHAP format
    if isinstance(
        shap_values,
        list
    ):

        values = shap_values[
            predicted_class_index
        ][0]


    # Newer SHAP format
    elif len(
        shap_values.shape
    ) == 3:

        values = shap_values[
            0,
            :,
            predicted_class_index
        ]


    # Other SHAP format
    else:

        values = shap_values[0]


    # ========================================
    # Create risk factors
    # ========================================

    risk_factors = []


    for feature, impact in zip(
        features,
        values
    ):

        value = input_data.iloc[0][
            feature
        ]

        risk_factors.append({

            "feature":
                feature,

            "value":
                float(value),

            "impact":
                round(
                    float(impact),
                    4
                )

        })


    # ========================================
    # Sort by strongest SHAP impact
    # ========================================

    risk_factors.sort(

        key=lambda item:
            abs(item["impact"]),

        reverse=True

    )


    # ========================================
    # Return result
    # ========================================

    return jsonify({

        "risk_level":
            predicted_risk,

        "probabilities": {

            "LOW":
                probability_result["LOW"],

            "MEDIUM":
                probability_result["MEDIUM"],

            "HIGH":
                probability_result["HIGH"]

        },

        "risk_factors":
            risk_factors[:5]

    })


# ============================================
# 7. Start server
# ============================================

if __name__ == "__main__":

    app.run(

        host="127.0.0.1",

        port=8000,

        debug=True

    )