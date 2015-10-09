build: component.json
	@component install --dev

watch:
	@component build --dev -w

clean:
	rm -fr build components

test-karma:
	node_modules/.bin/karma start --single-run

test:
	@webpack-dev-server 'mocha!./test/test_index.js' --hot --inline --output-filename test.js
	@open http://localhost:8080/test

.PHONY: clean test watch
