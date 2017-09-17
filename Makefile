.PHONY: typings build

deps:
	yarn install

update-deps:
	yarn upgrade

lint:
	./node_modules/.bin/tslint -c tslint.json 'src/**/*.ts'

typings:
	rm -rf typings
	./node_modules/.bin/typings install file:node_modules/phaser-ce/typescript/typings.json -GD
	./node_modules/.bin/typings install file:node_modules/easystarjs/index.d.ts -D

build: build-ts build-rollup

build-ts:
	./node_modules/.bin/tsc

build-rollup:
	./node_modules/.bin/rollup -c rollup.config.js
	./node_modules/.bin/rollup -c rollup.config.min.js
