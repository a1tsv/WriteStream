const jestConfig = {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'node_modules/variables/.+\\.(j|t)s?$': 'ts-jest',
		'\\.svg$': 'jest-transform-stub'
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$'
	],
	moduleNameMapper: {
		'^@public/(.*)': '<rootDir>/public/$1',
		'^@app/(.*)': '<rootDir>/src/app/$1',
		'^@pages/(.*)': '<rootDir>/src/pages/$1',
		'^@features/(.*)': '<rootDir>/src/features/$1',
		'^@widgets/(.*)': '<rootDir>/src/widgets/$1',
		'^@shared/(.*)': '<rootDir>/src/shared/$1',
		'^@entities/(.*)': '<rootDir>/src/entities/$1',
		'\\.module.(scss|sass|css|svg)$': 'identity-obj-proxy'
	}
}

export default jestConfig
