
require('colors');

function printErr(err, cmd) {
  console.log(('Cannot execute ' + cmd + '!').red.bold);
  if (err.code === 4) {
    console.log(err.info);
  } else {
    console.log(err);
  }
}

function printError(error) {
  console.log('  [#' + error.line + '] ' + error.description +
      ' (Error ' + error.code + ')');
}


function printFail(fail) {
  console.log((fail.file).bold);
  fail.errors.forEach(function(error) {
    printError(error);
  });
}

/**
 *
 * @param {Object} err
 * @param {String} result
 */
exports.reportGJSLint = function(err, result) {
  if (err) {
    if (err.code === 2) {
      console.log('gjslint linting failed!'.red.bold);
      err.info.fails.forEach(function(fail) {
        printFail(fail);
      });

      console.log('\nFound ' + err.info.total + ' errors, ' +
          'including ' + err.info.newErrors + ' new errors, ' +
          'in ' + err.info.filesCount + '  files ' +
          '(' + err.info.filesOK + ' files OK).'
      );
    } else {
      printErr(err, 'gjslint');
    }
  } else {
    console.log('gjslint free'.green.bold);
    console.log(result.filesCount + ' files passed');
  }
};

/**
 *
 * @param {Object} err
 */
exports.reportFixStyle = function(err) {
  if (err) {
    printErr(err, 'fixjsstyle');
  } else {
    console.log('fixjsstyle done'.green.bold);
  }
};
