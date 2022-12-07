export default function formatDate (date: Date) {
    const setZero = (v: number) => v < 10 ? `0${v}` : v
    return `${setZero(date.getDate())}.${setZero(date.getMonth() + 1)}.${setZero(date.getFullYear() % 100)} ${setZero(date.getHours())}:${setZero(date.getMinutes())}`
}
