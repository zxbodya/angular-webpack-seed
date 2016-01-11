// load all js sources
let testsContext = require.context('./demo', true, /\.js$/);
testsContext.keys().forEach(testsContext);
