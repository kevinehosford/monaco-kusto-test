module.exports = function loader(source) {
  source = `var Kusto = require("@kusto/language-service-next/Kusto.Language.Bridge.min");\n${source}`;

  return source.replace(/importScripts.*/g, "");
};
