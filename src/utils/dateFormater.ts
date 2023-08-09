export const formDate = (date:string):string => {
    const toFormatDate = new Date(date)
    return (toFormatDate.toLocaleDateString('en-EN', {year: 'numeric', month: 'long', day: 'numeric'}))
}