module.exports = {
	rootDir: './',
	coverageDirectory: '<rootDir>/coverage',
	coverageReporters: ['json', 'lcov', 'text', 'html'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	modulePaths: ['<rootDir>/']
};
