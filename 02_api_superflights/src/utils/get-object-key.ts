export function getObjectKey(obj: object, value: number) {
    return Object.keys(obj).find( k => obj[k] === value);
}