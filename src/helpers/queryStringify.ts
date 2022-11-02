export default function queryStringify(data: any[]) {
    return data.map((arr) => arr.join('=')).join('&');
}