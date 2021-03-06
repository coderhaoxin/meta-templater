module.exports = function (parser) {
	return getTree.bind(null, parser);
};

function getTree(parser, input) {
	var tree = [],
		list = parser.process(input);

	list.forEach(function (item, i) {
		addText(list[i-1], item);
		addItem(item);
	});

	addText(list[list.length - 1], null)

	return tree;

	function addItem(item) {
		item.input = input.substring(item.start, item.end);
		tree.push(item);

		if(item.type === 'op') {
			item.children = getTree(parser, item.body);
		}
	}

	function addText(prev, next) {
		var start = prev ? prev.end : 0,
			end = next ? next.start : input.length,
			item;

		if(start !== end) {
			item = {
				type: 'text',
				start: start,
				end: end,
				input: input.substring(start, end)
			};
			tree.push(item);
		}
	}
};
