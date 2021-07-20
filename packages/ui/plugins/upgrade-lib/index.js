module.exports = {
  onPreBuild: async ({ utils: { run }}) => {
    console.log('Upgrading @strawberrylemonade/goodhub-lib to the latest version');
    await run.command('npm i @strawberrylemonade/goodhub-lib@latest');
    await run.command('npm i @strawberrylemonade/kyan@latest');
  },
}