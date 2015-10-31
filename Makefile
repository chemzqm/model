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
	@webpack-dev-server 'mocha!./test/test.js' --inline --hot --devtool eval

test-coveralls:
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@node_modules/.bin/karma start --single-run && \
		cat ./coverage/lcov/lcov.info | ./node_modules/coveralls/bin/coveralls.js)

.PHONY: clean test watch
