module.exports = {
    // Collect coverage from source files
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/index.tsx",
        "!src/reportWebVitals.ts",
        "!src/react-app-env.d.ts",
        "!src/**/*.d.ts"
    ],

    // Coverage thresholds (optional - can be adjusted as needed)
    coverageThresholds: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },

    // Setup files
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

    // Test environment
    testEnvironment: "jsdom"
};
