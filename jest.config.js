module.exports = {
    // Use the default configuration from react-scripts
    ...require("react-scripts/config/jest/babelTransform"),

    // Collect coverage from source files
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/index.tsx",
        "!src/reportWebVitals.ts",
        "!src/react-app-env.d.ts",
        "!src/**/*.d.ts"
    ],

    // Coverage thresholds (optional - can be adjusted)
    coverageThresholds: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },

    // Test match patterns
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{ts,tsx}"
    ],

    // Setup files
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

    // Module name mapper for assets
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },

    // Test environment
    testEnvironment: "jsdom",

    // Transform files
    transform: {
        "^.+\\.(ts|tsx)$": [
            "babel-jest",
            {
                presets: [
                    ["react-app", { runtime: "automatic" }]
                ]
            }
        ]
    }
};
