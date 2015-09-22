BIN = ./node_modules/.bin
ELECTRON = $(BIN)/electron
DUO = $(BIN)/duo
CHOKIDAR = $(BIN)/chokidar
SERVER = $(BIN)/http-server

all: node_modules mkdir

run: build
	@$(BIN)/electron ./

mkdir:
	@mkdir -p build

node_modules:
	npm install

server:
	@$(SERVER)

lint:
	@$(BIN)/standard lib/**/*.js

build: node_modules
	node build.js
	# @$(BIN)/electron-packager . Game --ignore=node_modules/electron-prebuilt components lib -prune

clean:
	@rm -rf build components node_modules

css:
	@$(BIN)/duo --use ./duo-plugins.js lib/index.css
	@$(BIN)/suitcss build/lib/index.css build/lib/index.css

tests:
	@mkdir -p build
	@$(BIN)/duo --stdout test/tests.js > build/tests.js --development

test-app: tests
	@$(BIN)/electron-prebuilt ./test/electron.js

test: tests
	@$(BIN)/duo-test \
		-c 'make tests' \
		--build build/tests.js \
		--reporter spec \
		browser

watch: build
	$(CHOKIDAR) './lib/**/*.js' -c 'make build'& $(CHOKIDAR) './lib/**/*.css' -c 'make css'

watch-test: build
	$(CHOKIDAR) './lib/**/*.js' './lib/**/*.css' -c 'make test-app'

.PHONY: clean test build all
