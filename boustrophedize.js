const paragraphs = document.getElementsByTagName('p');

// TODO: loading spinner?
// TODO: break up ems, bs, as into multiple tags
// TODO: listen for screen size change, then reload
// TODO: more space between paragraphs

const spanifyWords = words => (
    words
        .split(/\s/)
        .map(word => {
            // handles a hyphenated word like "daisy-chain" that straddles two lines
            if (word.includes("-")) {
                const split = word.split("-");
                return split.map((subword, i) => `<span class="boustro-word">${subword}${i + 1 === split.length ? "" : "-"}</span>`).join("");
            } else {
                return `<span class="boustro-word">${word}</span>`;
            }
        })
        .join(' ')
);

const normalizeWhitespace = text => text.trim().replace(/\s+/g, ' ');

for (let p of paragraphs) {
    const wordSpans = [];
  
    for (let node of p.childNodes) {
        if (node.nodeName === "#text") {
            wordSpans.push(spanifyWords(normalizeWhitespace(node.textContent)));
        } else {
            wordSpans.push(`<span class="boustro-word">${node.outerHTML}</span>`);
        }
    }
  
    p.innerHTML = wordSpans.join(" ");

    const spans = p.getElementsByClassName('boustro-word');
    const lines = [];
    let line = [];
    let lineOffset;

    let prevWordHyphenated = false;
    for (let s of spans) {
        const currentOffset = s.offsetTop;
        if (lineOffset === undefined) {
            lineOffset = currentOffset;
        }
        if (currentOffset !== lineOffset) {
            lines.push(line.join(" "));
            line = [];
            lineOffset = currentOffset;
            prevWordHyphenated = false;
        }
      
        // handling the hyphenated word case
        if (prevWordHyphenated) {
            line[line.length - 1] = line[line.length - 1] + s.innerHTML;
        } else {
            line.push(s.innerHTML);
        }
      
        prevWordHyphenated = s.innerHTML.endsWith("-");
    }
    if (line.length) {
        lines.push(line.join(" "));
    }

    p.innerHTML = lines
        .map((line, i) => `<span class='boustro-line ${i % 2 ? "flip" : ""}'>${line}</span>`)
        .join(" ");
}
