# Take historical/synthetic training dataset
# and teach machine-learning models
# how to classify projects into:
# LOW, MEDIUM, HIGH


import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report

from xgboost import XGBClassifier


# ============================================
# 1. Load dataset
# ============================================

df = pd.read_csv(
    "data/raw/devpilot_project_risk_synthetic.csv"
)


# ============================================
# 2. Check dataset
# ============================================

print("\nDataset shape:")
print(df.shape)

print("\nFirst rows:")
print(df.head())

print("\nColumns:")
print(df.columns.tolist())

print("\nData types:")
print(df.dtypes)

print("\nMissing values:")
print(df.isnull().sum())

print("\nDuplicate rows:")
print(df.duplicated().sum())

print("\nRisk levels:")
print(df["risk_level"].value_counts())

print("\nRisk level percentage:")
print(
    df["risk_level"].value_counts(normalize=True) * 100
)

print("\nDataset statistics:")
print(df.describe())


# ============================================
# 3. Select features
# ============================================

features = [
    "project_progress",
    "task_completion_rate",
    "blocked_task_ratio",
    "overdue_task_ratio",
    "requirement_completion_rate",
    "milestone_completion_rate",
    "open_issue_count",
    "critical_issue_count",
    "api_test_failure_rate",
    "avg_api_response_time_ms",
    "technical_review_score",
    "days_remaining",
    "development_velocity"
]


# X = information given to the model
X = df[features]

# y = risk level we want to predict
y = df["risk_level"]


# ============================================
# 4. Split data into training and testing
# ============================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining data:")
print(X_train.shape)

print("\nTesting data:")
print(X_test.shape)


# ============================================
# 5. Train Logistic Regression
# ============================================

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(
    X_train
)

X_test_scaled = scaler.transform(
    X_test
)


lr_model = LogisticRegression(
    max_iter=1000
)

lr_model.fit(
    X_train_scaled,
    y_train
)

lr_pred = lr_model.predict(
    X_test_scaled
)


print("\n================================")
print("Logistic Regression")
print("================================")

print(
    "Accuracy:",
    accuracy_score(
        y_test,
        lr_pred
    )
)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        lr_pred
    )
)


# ============================================
# 6. Train Random Forest
# ============================================

rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

rf_model.fit(
    X_train,
    y_train
)

rf_pred = rf_model.predict(
    X_test
)


print("\n================================")
print("Random Forest")
print("================================")

print(
    "Accuracy:",
    accuracy_score(
        y_test,
        rf_pred
    )
)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        rf_pred
    )
)


# ============================================
# 7. Train XGBoost
# ============================================

# XGBoost needs numeric labels
label_encoder = LabelEncoder()

y_train_encoded = label_encoder.fit_transform(
    y_train
)


xgb_model = XGBClassifier(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1,
    random_state=42,
    eval_metric="mlogloss"
)

xgb_model.fit(
    X_train,
    y_train_encoded
)

xgb_pred_encoded = xgb_model.predict(
    X_test
)


# Convert numbers back to
# LOW / MEDIUM / HIGH
xgb_pred = label_encoder.inverse_transform(
    xgb_pred_encoded.astype(int)
)


print("\n================================")
print("XGBoost")
print("================================")

print(
    "Accuracy:",
    accuracy_score(
        y_test,
        xgb_pred
    )
)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        xgb_pred
    )
)


# ============================================
# 8. Save Random Forest model
# ============================================

model_dir = Path(
    "data/models"
)

model_dir.mkdir(
    parents=True,
    exist_ok=True
)


# Save trained Random Forest model
joblib.dump(
    rf_model,
    model_dir / "risk_model.joblib"
)


# Save feature list
joblib.dump(
    features,
    model_dir / "features.joblib"
)


# Save class order
joblib.dump(
    list(rf_model.classes_),
    model_dir / "risk_classes.joblib"
)


# ============================================
# 9. Training complete
# ============================================

print("\n================================")
print("Training completed successfully")
print("================================")

print("\nSaved model:")
print(
    model_dir / "risk_model.joblib"
)

print("\nSaved features:")
print(
    model_dir / "features.joblib"
)

print("\nSaved classes:")
print(
    model_dir / "risk_classes.joblib"
)


# ============================================
# 10. Show model classes
# ============================================

print("\nModel classes:")

print(
    list(rf_model.classes_)
)


# ============================================
# 11. Show feature order
# ============================================

print("\nFeature order:")

for number, feature in enumerate(
    features,
    start=1
):

    print(
        number,
        ".",
        feature
    )