export function humanReadableSize(value: number, showDec = false): string {
    const delta = 1000
    if (value <= 0) { return "0"; }
    var e = Math.floor(Math.log(value) / Math.log(delta));
    if (showDec) {
        return (value / Math.pow(delta, e)).toFixed(2) + ' ' + '\u200bKMGTPEZY'.charAt(e);
    } else {
        return Math.round(value / Math.pow(delta, e)) + ' ' + '\u200bKMGTPEZY'.charAt(e);
    }
}