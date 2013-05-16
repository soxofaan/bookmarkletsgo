

.PHONY: default
default: index.html

# JavaScript minification rules
JSSOURCES = $(shell find js/ -name "*.src.js")
JSMINIFIED = $(JSSOURCES:.src.js=.min.js)

.PHONY: minifyall
minifyall: $(JSMINIFIED)

%.min.js: %.src.js
	uglifyjs -o $@ $< --compress --mangle

# Generate index page
index.html: index.php $(JSMINIFIED)
	php -f index.php > $@

# Clean up
.PHONY: clean
clean:
	rm -f js/*.min.js
