export const base64ToBlob = (str: string) => {
  const pos = str.indexOf(";base64,"),
    type = str.substring(5, pos),
    b64 = str.substr(pos + 8);

  const imageContent = atob(b64);

  const buffer = new ArrayBuffer(imageContent.length);
  let view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  return new Blob([buffer], { type: type });
};
