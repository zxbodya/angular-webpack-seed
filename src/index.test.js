'use strict';

let testsContext = require.context('.', true, /\.test$/);
testsContext.keys().forEach(testsContext);
