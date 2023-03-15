export const getBase64Type = (str: string) => {
  return str.substring(0, str.indexOf(";base64,")).replace("data:image/", "");
};
