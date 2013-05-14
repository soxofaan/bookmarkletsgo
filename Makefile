

.PHONY: default
default: index.html

JSSOURCES = $(shell find js/ -name "*.src.js")
JSMINIFIED = $(JSSOURCES:.src.js=.min.js)

.PHONY: minifyall
minifyall: $(JSMINIFIED)


%.min.js: %.src.js
	uglifyjs -o $@ $< --compress --mangle


index.html: index.php minifyall
	php -f index.php > $@

.PHONY: clean
clean:
	rm -f js/*.min.js
