import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}

    if (label === 'kusto') {
			return './kusto.worker.bundle.js';
		}

		return './editor.worker.bundle.js';
  },
};

const editor = monaco.editor.create(document.getElementById("container"), {
  value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
  language: "javascript",
});

import('monaco.contribution').then(async (contribution) => {
  const model = monaco && monaco.editor.createModel("", 'kusto');
  editor.setModel(model);
  const workerAccessor = await monaco.languages.kusto.getKustoWorker();
  const worker = await workerAccessor(model.uri);
});