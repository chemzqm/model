build: component.json
	@component install --dev

watch:
	@component build --dev -w

clean:
	rm -fr build components

test:
	@webpack-dev-server --hot --inline --output-filename test.js
	@open http://localhost:8080/test

.PHONY: clean test watch
