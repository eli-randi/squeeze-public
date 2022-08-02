

export function prettifySnakeCase(str) {
    return str
        .split('_')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


export function openCredentialWindow(url) {
    return window.open(url, "MsgWindow", "width=500,height=500")
}