export const validateForm = (object: any[]): boolean => {
  object.forEach((v) => {
    if (v === "") {
      alert("입력되지 않은  않았습니다!");
      return false;
    }
  });
  return true;
};
