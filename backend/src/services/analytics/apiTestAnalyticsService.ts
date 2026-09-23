// This service calculates API test-related project analytics.
interface ApiTestForAnalytics {
    passed: boolean;
    responseTime: number;
}

// Calculate API test analytics
export const calculateApiTestAnalytics = (
  apiTests: ApiTestForAnalytics[]
) => {

  // Total number of API tests
  const totalApiTests = apiTests.length;

  // Count failed API tests
  const failedApiTests = apiTests.filter(
    (test) => !test.passed
  ).length;

  // API test failure rate
  const apiTestFailureRate =
    totalApiTests === 0
      ? 0
      : failedApiTests / totalApiTests;

  // Calculate average API response time
  const averageApiResponseTime =
    totalApiTests === 0
      ? 0
      : apiTests.reduce(
          (total, test) =>
            total + test.responseTime,
          0
        ) / totalApiTests;

  return {
    totalApiTests,
    failedApiTests,
    apiTestFailureRate,
    averageApiResponseTime,
  };
};