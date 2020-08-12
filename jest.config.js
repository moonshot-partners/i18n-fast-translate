module.exports = {
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: ['./src/**/*.js', './index.js'],
	globalSetup: './jest.setup.js',
	coverageDirectory: './coverage'
};
