export interface ApiTest {
    id: number;
    projectId: number;
    endpoint: string;
    method: string;
    statusCode: number;
    passed: boolean;
    responseTime: number;
    testedAt: string;
}

export interface CreateApiTestData {
    endpoint: string;
    method: string;
    statusCode: number;
    passed: boolean;
    responseTime: number;
    testedAt?: string;
}