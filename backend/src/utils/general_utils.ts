export function getDateXDays(x: number) {
    let d = new Date();
    d.setDate(d.getDate() + x);
    return new Date(d);
}