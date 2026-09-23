# It does not train a model.
# It loads the already-trained model.

import joblib
import pandas as pd
import shap


# ============================================
# 1. Load saved model
# ============================================

model = joblib.load(
    "data/models/risk_model.joblib"
)

print("Model loaded successfully!")


# ============================================
# 2. Load feature list
# ============================================

features = joblib.load(
    "data/models/features.joblib"
)

print("Features loaded successfully!")
print("\nFeatures:")
print(features)


# ============================================
# 3. Create test project
# ============================================

project = {
    "project_progress": 45,
    "task_completion_rate": 50,
    "blocked_task_ratio": 0.15,
    "overdue_task_ratio": 0.20,
    "requirement_completion_rate": 60,
    "milestone_completion_rate": 50,
    "open_issue_count": 5,
    "critical_issue_count": 1,
    "api_test_failure_rate": 0.20,
    "avg_api_response_time_ms": 450,
    "technical_review_score": 65,
    "days_remaining": 20,
    "development_velocity": 3.0
}


# ============================================
# 4. Convert project into DataFrame
# ============================================

input_data = pd.DataFrame(
    [project],
    columns=features
)

print("\nProject data:")
print(input_data)


# ============================================
# 5. Predict risk
# ============================================

prediction = model.predict(
    input_data
)

predicted_risk = prediction[0]

print("\nPredicted Risk Level:")
print(predicted_risk)


# ============================================
# 6. Get risk probabilities
# ============================================

probabilities = model.predict_proba(
    input_data
)[0]

classes = model.classes_

print("\nRisk Probabilities:")

for class_name, probability in zip(
    classes,
    probabilities
):

    print(
        class_name,
        ":",
        f"{probability * 100:.2f}%"
    )


# ============================================
# 7. Create SHAP explainer
# ============================================

explainer = shap.TreeExplainer(
    model
)

print("\nSHAP explainer created successfully!")


# ============================================
# 8. Calculate SHAP values
# ============================================

shap_values = explainer.shap_values(
    input_data
)

print("SHAP values calculated successfully!")


# ============================================
# 9. Get SHAP values for predicted class
# ============================================

predicted_class_index = list(
    classes
).index(
    predicted_risk
)


# Older SHAP format
if isinstance(shap_values, list):

    values = shap_values[
        predicted_class_index
    ][0]


# Newer SHAP format
elif len(shap_values.shape) == 3:

    values = shap_values[
        0,
        :,
        predicted_class_index
    ]


# Other SHAP format
else:

    values = shap_values[0]


# ============================================
# 10. Combine features and SHAP values
# ============================================

feature_impacts = []

for feature, impact in zip(
    features,
    values
):

    value = input_data.iloc[0][
        feature
    ]

    feature_impacts.append({
        "feature": feature,
        "value": float(value),
        "impact": float(impact)
    })


# ============================================
# 11. Sort by strongest impact
# ============================================

feature_impacts.sort(
    key=lambda item: abs(
        item["impact"]
    ),
    reverse=True
)


# ============================================
# 12. Display top ML risk factors
# ============================================

print("\n================================")
print("TOP ML RISK FACTORS")
print("================================")

for item in feature_impacts[:5]:

    print(
        item["feature"],
        ": value =",
        item["value"],
        ", impact =",
        f"{item['impact']:.4f}"
    )


# ============================================
# 13. Explain SHAP contribution
# ============================================

print("\n================================")
print("SHAP CONTRIBUTION")
print("================================")

for item in feature_impacts[:5]:

    if item["impact"] > 0:

        direction = (
            "toward predicted "
            + str(predicted_risk)
        )

    elif item["impact"] < 0:

        direction = (
            "away from predicted "
            + str(predicted_risk)
        )

    else:

        direction = (
            "little contribution"
        )

    print(
        item["feature"],
        "->",
        direction
    )


# ============================================
# 14. Final result
# ============================================

print("\n================================")
print("FINAL ML RESULT")
print("================================")

print(
    "Predicted Risk:",
    predicted_risk
)

print("\nTop ML Risk Factors:")

for item in feature_impacts[:5]:

    print(
        "-",
        item["feature"],
        "(impact:",
        f"{item['impact']:.4f})"
    )