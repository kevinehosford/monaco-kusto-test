module.exports = function loader(source) {
  source = `require("@kusto/language-service-next/Kusto.Language.Bridge");
  require("@kusto/language-service/Kusto.JavaScript.Client.js");\n${source}`;

  return source.replace(/importScripts.*/g, "");
};
