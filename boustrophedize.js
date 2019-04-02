const paragraphs = document.getElementsByTagName('p');

const spanifyWords = words => (
    words
        .split(/\s/)
        .map(word => {
            // handles a hyphenated word like "daisy-chain" that straddles two lines
            if (word.includes("-")) {
                const split = word.split("-");
                return split.map((subword, i) => `<span class="boustro-word">${subword}${i + 1 === split.length ? "" : "-"}</span>`).join("");
            } else {
                return `<span class="boustro-word">${word.split("-").join("-")}</span>`;
            }
        })
        .join(' ')
);

for (let p of paragraphs) {
    const wordSpans = [];
  
    for (let node of p.childNodes) {
        if (node.nodeName === "#text") {
            wordSpans.push(spanifyWords(node.textContent));
        } else {
            wordSpans.push(`<span class="boustro-word">${node}</span>`);
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
