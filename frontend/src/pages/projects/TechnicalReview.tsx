import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type {PracticeKey, ProjectPractice, TechnicalReview as TechnicalReviewType} from "../../types/practice";
import TechnicalReviewView from "../Views/projectViews/TechnicalReviewView";
import { getPractices, getTechnicalReview, savePractice } from "../../services/projects/practiceService";

const PRACTICE_KEYS: PracticeKey[] = [
    "AUTHENTICATION",
    "INPUT_VALIDATION",
    "ERROR_HANDLING",
    "RATE_LIMITING",
    "API_DOCUMENTATION",
    "INTEGRATION_TESTING",
    "SECURITY_HEADERS",
    "LOGGING",
];

function TechnicalReview() {
    const { projectId } = useParams();

    const [practices, setPractices] =
        useState<ProjectPractice[]>([]);

    const [review, setReview] =
        useState<TechnicalReviewType | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    // Load technical review
    useEffect(() => {
        const loadReview = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid project ID");
                    return;
                }

                const [
                    practiceData,
                    reviewData,
                ] = await Promise.all([
                    getPractices(id),
                    getTechnicalReview(id),
                ]);

                setPractices(practiceData);
                setReview(reviewData);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load technical review"
                    );
                } else {
                    setError(
                        "Failed to load technical review"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        loadReview();
    }, [projectId]);

    const getPractice = (key: PracticeKey) => {
        return practices.find(
            (practice) => practice.key === key
        );
    };

    const handleToggle = async (
        key: PracticeKey
    ) => {
        try {
            setSaving(true);
            setError("");

            const id = Number(projectId);

            if (!Number.isInteger(id) || id <= 0) {
                setError("Invalid project ID");
                return;
            }

            const current = getPractice(key);

            await savePractice(
                id,
                {
                    key,
                    implemented: !(
                        current?.implemented ?? false
                    ),
                    notes: current?.notes || "",
                }
            );

            // Reload practices and review
            // so score, missing practices,
            // and recommendations are updated.
            const [
                practiceData,
                reviewData,
            ] = await Promise.all([
                getPractices(id),
                getTechnicalReview(id),
            ]);

            setPractices(practiceData);
            setReview(reviewData);
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to update practice"
                );
            } else {
                setError(
                    "Failed to update practice"
                );
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <TechnicalReviewView
            projectId={projectId}
            practices={practices}
            review={review}
            loading={loading}
            saving={saving}
            error={error}
            practiceKeys={PRACTICE_KEYS}
            onToggle={handleToggle}
        />
    );
}

export default TechnicalReview;