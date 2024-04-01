module.exports = {
    reporter: 'node_modules/mochawesome',
    'reporter-option': [
        'json=true', 'reportDir=report',
        'reportFilename=api-test', 'autoOpen=false', /* para abrir o relatório do mochawesome altere para 'true' */
        'reportPageTitle=TESTCLASS', 'reportTitle=TestClass',
        'charts=true'
    ],
    ui: 'bdd',
    timeouts: 90000,
    parallel: true,
    slow: 700,
    colors: true,
    diff: true,
    retries: 2,
    exit: true,
    'inline-diffs': true
}