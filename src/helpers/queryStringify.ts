export default function queryStringify (data: object): string {
    return Object.entries(data).map((arr) => arr.join('=')).join('&')
}
