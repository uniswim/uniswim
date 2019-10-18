const { useBabelRc, override, useEslintRc } = require('customize-cra')
const enableWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  enableWorkspaces()
);