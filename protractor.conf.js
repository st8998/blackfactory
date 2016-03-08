exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['build/vendoir.js', 'build/e2e.js'],
}
