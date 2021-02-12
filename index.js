import * as monaco from "monaco-editor";
import 'monaco.contribution';

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
//   getWorker: function (moduleId, label) {
// 	if (label === 'json')
// 		return new Worker('./workers/json.worker.js');
// 	if (label === 'css')
// 		return new Worker('./workers/css.worker.js');
// 	if (label === 'html')
// 		return new Worker('./workers/html.worker.js');
// 	if (label === 'typescript' || label === 'javascript')
// 		return new Worker('./workers/ts.worker.js');

// 	return new Worker('./workers/editor.worker.js');
// 	}
};

// const editor = monaco.editor.create(document.getElementById("container"), {
//   value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
//   language: "javascript",
// });

// import('monaco.contribution').then(async (contribution) => {
//   const model = monaco && monaco.editor.createModel("", 'kusto');
//   editor.setModel(model);
//   const workerAccessor = await monaco.languages.kusto.getKustoWorker();
//   const worker = await workerAccessor(model.uri);
// });

// import('monaco.contribution').then(async (contribution) => {
//     var editor = monaco.editor.create(document.getElementById('container'), {
// 		value: ['StormEvents | project StartTime , State | where toupper(State) == "Texas" | count'].join(
// 			'\n'
// 		),
// 		language: 'kusto',
// 		selectionHighlight: false,
// 		theme: 'kusto-light',
// 		folding: true,
// 	});
// })

// monaco.editor.create(document.getElementById('container'), {
// 	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
// 	language: 'kusto'
// });

var editor = monaco.editor.create(document.getElementById('container'), {
	value: ['StormEvents | project StartTime , State | where toupper(State) == "Texas" | count'].join(
		'\n'
	),
	language: 'kusto',
	selectionHighlight: false,
	theme: 'kusto-light',
	folding: true,
});

// var editor = monaco.editor.create(document.getElementById('container'), {
// 	value: ['StormEvents | project StartTime , State | where toupper(State) == "Texas" | count'].join(
// 		'\n'
// 	),
// 	language: 'kusto',
// 	selectionHighlight: false,
// 	theme: 'kusto-light',
// 	folding: true,
// });

const schema = {
	Plugins: [
		{
			Name: 'pivot',
		},
	],
	Databases: {
		Samples: {
			Name: 'Samples',
			Tables: {
				StormEvents: {
					Name: 'StormEvents',
					DocString:
						'A dummy description to test that docstring shows as expected when hovering over a table',
					OrderedColumns: [
						{
							Name: 'StartTime',
							Type: 'System.DateTime',
							CslType: 'datetime',
							DocString: 'The start time',
						},
						{
							Name: 'EndTime',
							Type: 'System.DateTime',
							CslType: 'datetime',
							DocString: 'The end time',
						},
						{
							Name: 'EpisodeId',
							Type: 'System.Int32',
							CslType: 'int',
						},
						{
							Name: 'EventId',
							Type: 'System.Int32',
							CslType: 'int',
						},
						{
							Name: 'State',
							Type: 'System.String',
							CslType: 'string',
						},
					],
				},
				ForecastExample: {
					Name: 'ForecastExample',
					OrderedColumns: [
						{
							Name: 'Timestamp',
							Type: 'System.DateTime',
							CslType: 'datetime',
						},
						{
							Name: 'RequestCount',
							Type: 'System.Int64',
							CslType: 'long',
						},
					],
				},
				MaterializedViewExamples: {
					Name: 'MaterializedViewExamples',
					EntityType: 'MaterializedViewTable',
					OrderedColumns: [
						{
							Name: 'MVTimestamp',
							Type: 'System.DateTime',
							CslType: 'datetime',
						},
						{
							Name: 'MVRequestCount',
							Type: 'System.Int64',
							CslType: 'long',
						},
					],
				}
			},
			Functions: {
				MyFunction1: {
					Name: 'MyFunction1',
					InputParameters: [],
					Body: '{     StormEvents     | limit 100 }  ',
					Folder: 'Demo',
					DocString: 'Simple demo function',
					FunctionKind: 'Unknown',
					OutputColumns: [],
				},
				MyFunction2: {
					Name: 'MyFunction2',
					InputParameters: [
						{
							Name: 'myLimit',
							Type: 'System.Int64',
							CslType: 'long',
							DocString: 'Demo for a parameter',
							CslDefaultValue: "6"
						},
					],
					Body: '{     StormEvents     | limit myLimit }  ',
					Folder: 'Demo',
					DocString: 'Demo function with parameter',
					FunctionKind: 'Unknown',
					OutputColumns: [],
				},
			},
		},
	},
};


// import('monaco.contribution').then(async (contribution) => {
//     const model = monaco && monaco.editor.createModel("", 'kusto');
//     editor.setModel(model);
//     const workerAccessor = await monaco.languages.kusto.getKustoWorker();
//     const worker = await workerAccessor(model.uri);
// })

monaco.languages.kusto.getKustoWorker().then((workerAccessor) => {
	const model = editor.getModel();
	workerAccessor(model.uri).then((worker) => {
		worker.setSchemaFromShowSchema(schema, 'https://help.kusto.windows.net', 'Samples');
	});
});

// monaco.languages.kusto.getKustoWorker().then((workerAccessor) => {
// 	const model = editor.getModel();
// 	workerAccessor(model.uri).then((worker) => {
// 		worker.setSchemaFromShowSchema(schema, 'https://help.kusto.windows.net', 'Samples');
// 	});
// });
