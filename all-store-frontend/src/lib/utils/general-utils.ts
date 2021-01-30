export function humanReadableSize(value: number, isMemory = true, showDec = false): string {
    let replacelist = ''
    if (isMemory) {
        replacelist = '\u200bKMGTPEZY';
    } else {
        replacelist = '\u200bKMBTQ';
    }
    const delta = 1000
    if (value <= 0) { return "0"; }
    var e = Math.floor(Math.log(value) / Math.log(delta));
    if (showDec) {
        return (value / Math.pow(delta, e)).toFixed(2) + ' ' + replacelist.charAt(e);
    } else {
        return Math.round(value / Math.pow(delta, e)) + ' ' + replacelist.charAt(e);
    }
}

export function roundWithHalfPrecision(val: number) {
    let roundedVal = Math.round(val);
    if (roundedVal > val) {
        let mid = roundedVal - 1 + 0.5;
        let leftDist = val - mid;
        let rightDist = roundedVal - val;
        if (leftDist > rightDist) {
            return roundedVal;
        } else {
            return mid;
        }
    } else {
        let mid = roundedVal + 0.5;
        let leftDist = val - roundedVal;
        let rightDist = mid - val;
        if (leftDist > rightDist) {
            return mid;
        } else {
            return roundedVal;
        }
    }
}
