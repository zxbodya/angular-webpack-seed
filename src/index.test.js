// load all js sources
const testsContext = require.context('./demo', true, /\.js$/);
testsContext.keys().forEach(testsContext);
