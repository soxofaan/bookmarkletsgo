

JSSOURCES = $(shell find js/ -name "*.src.js")
JSMINIFIED = $(JSSOURCES:.src.js=.min.js)

.PHONY: minifyall
minifyall: $(JSMINIFIED)

%.min.js: %.src.js
	uglifyjs -o $@ $< --compress --mangle


.PHONY: clean
clean:
	rm -f js/*.min.js
