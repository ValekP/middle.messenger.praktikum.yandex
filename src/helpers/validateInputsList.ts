export default function validateInputsList(inputs: Record<string, any>) {
    let data = {} as Record<string, unknown>
    let check = true

    for (const [key, value] of Object.entries(inputs)) {
        const input = value.inputValidate()
        if (input || input === null) {
            data[key] = input
        } else {
            check = false
        }
    }
    return check ? data : check
}
