export const info = text => {
    const OPTIONS = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    const time = Intl.DateTimeFormat(undefined, OPTIONS).format(new Date())
    console.log(`[${time}] ${text}`)
}
