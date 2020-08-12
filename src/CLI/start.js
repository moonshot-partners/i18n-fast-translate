const { exec } = require('child_process');

module.exports = async function () {
  const FastTranslate = require('../FastTranslate');
  const { argv } = require('yargs');
  const decoder = require('../decoders/json');
  const base = argv.base;
  const target = argv.target;
  const format = argv.format || 'json';
  const commit = argv.commit;

  if (base && target) {
    FastTranslate({
      base: argv.base,
      target: argv.target,
      format: format
    }).then((data) => {
      console.log('data');
      console.log(JSON.stringify(data));
    });
  } else {
    const config = decoder('.fast-translate.json');
    const tasks = config.translates.map(async (translate) => {
      await FastTranslate({
        provider: config.provider,
        base: config.base,
        target: translate.target,
        format: config.format,
        to: translate.to
      });
    });

    await Promise.all(tasks);

    if (commit) {
      exec(`git add . && git commit -m "i18n-fast-translate update files"`, function (
        error,
        stdout,
        stderr
      ) {
        console.log(stdout);
      });
    }
  }
};
