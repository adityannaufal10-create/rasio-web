const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = path.resolve(__dirname, '..');
const components = ['MoranTrajectoryChart', 'SpilloverChart', 'ForecastingModule'];
let seriesChecks = 0;

// Probe the actual series props while rendering each real component under both motion preferences.
for (const reduced of [false, true]) {
  for (const name of components) {
    const captured = [];
    const charts = new Proxy({}, { get: (_, component) => props => {
      if (['Line', 'Area', 'Bar'].includes(component)) captured.push(props);
      return React.createElement('div', null, props.children);
    }});
    const source = fs.readFileSync(path.join(root, 'src/components/dashboard', name + '.tsx'), 'utf8');
    const output = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    }}).outputText;
    const module = { exports: {} };
    const load = id => {
      if (id === 'recharts') return charts;
      if (id === '@/landing/motion') return { useReducedMotion: () => reduced };
      if (id.endsWith('/ui/card')) return new Proxy({}, { get: () => props => React.createElement('div', null, props.children) });
      return require(id);
    };
    vm.runInNewContext(output, { module, exports: module.exports, require: load });
    renderToStaticMarkup(React.createElement(module.exports[name], { data: [], historicalData: [], projectionData: [] }));
    assert.ok(captured.length > 0, name + ': no series rendered');
    for (const props of captured) {
      assert.equal(props.isAnimationActive, !reduced, name + ': reduced motion was ignored');
      seriesChecks++;
    }
  }
}

let figureAssets = 0;
for (const name of ['ClusteringPage', 'SpatialEconometricsPage', 'ForecastingPage']) {
  const filename = path.join(root, 'src/pages', name + '.tsx');
  const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = node => {
    if (ts.isPropertyAssignment(node) && ['darkSrc', 'lightSrc'].includes(node.name.getText(source)) && ts.isStringLiteral(node.initializer)) {
      assert.ok(fs.existsSync(path.join(root, 'public', node.initializer.text)), 'Missing figure: ' + node.initializer.text);
      figureAssets++;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}
assert.ok(figureAssets > 0);
console.log(seriesChecks + ' chart motion assertions and ' + figureAssets + ' figure asset checks passed.');
