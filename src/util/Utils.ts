export const prettifySnakeCase = (str: string) => {
  return str
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const openCredentialWindow = (url: string) => {
  return window.open(url, "MsgWindow", "width=500,height=500")
}

export const formatTime = (time: string) => {
  return time.replace('Z', '').replace('T', ' ');
}