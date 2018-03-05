.PHONY: build

deps:
	yarn install

update-deps:
	yarn upgrade
	cp node_modules/phaser-ce/build/phaser.js demo/lib
	cp node_modules/easystarjs/bin/easystar-0.4.3.js demo/lib/easystarjs.js

lint:
	./node_modules/.bin/tslint -c tslint.json 'src/**/*.ts'

build: build-ts build-rollup

build-ts:
	./node_modules/.bin/tsc

build-rollup:
	./node_modules/.bin/rollup -c rollup.config.js
