build: component.json
	@component install --dev

watch:
	@component build --dev -w

clean:
	rm -fr build components

test-karma:
	node_modules/.bin/karma start --single-run

test:
	@open http://localhost:8080/bundle
	@webpack-dev-server 'mocha!./test/test_index.js' --inline --hot --devtool eval

.PHONY: clean test watch
