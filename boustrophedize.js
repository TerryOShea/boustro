const paragraphs = document.getElementsByTagName('p');

for (let p of paragraphs) {
    p.innerHTML = p.innerHTML
        .split(/\s/)
        .map(word => `<span class="boustro-word">${word}</span>`)
        .join(' ');

    const spans = p.getElementsByClassName('boustro-word');
    const lines = [];
    let line = [];
    let lineOffset;

    for (let s of spans) {
        const currentOffset = s.offsetTop;
        if (lineOffset === undefined) {
            lineOffset = currentOffset;
        }
        if (currentOffset !== lineOffset) {
            lines.push(line.join(" "));
            line = [];
            lineOffset = currentOffset;
        }
        line.push(s.innerHTML);
    }
    if (line.length) {
        lines.push(line.join(" "));
    }

    p.innerHTML = lines
        .map((line, i) => `<span class='boustro-line ${i % 2 ? "flip" : ""}'>${line}</span>`)
        .join(" ");
}
