export const resizeTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
};
