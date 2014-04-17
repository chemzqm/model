
SRC = $(wildcard lib/*.js)

build: components $(SRC)
	@component build --dev

components: component.json
	@component install --dev

watch:
	@component build --dev -w

clean:
	rm -fr build components template.js

node_modules: package.json
	@npm install

server: node_modules
	@node test/server

test: build
	@serve
	@open http://localhost:3000

.PHONY: clean test watch
