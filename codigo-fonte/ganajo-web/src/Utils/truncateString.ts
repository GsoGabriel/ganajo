function truncateString(str: string, max : number) {
    return str.length > max ? str.substring(0, max) + "..." : str
}

export default truncateString;
