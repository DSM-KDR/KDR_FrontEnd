export const readFile = (
  refObj: React.MutableRefObject<HTMLInputElement>,
  setValue: (value: string | number, labelIndex?: number) => void
): string | ArrayBuffer => {
  const fReader = new FileReader();
  if (refObj.current && refObj.current.files)
    try {
      fReader.readAsDataURL(refObj.current.files[0]);
    } catch {
      return;
    }
  fReader.onloadend = (event: ProgressEvent<FileReader>) => {
    if (event && event.target && event.target.result) {
      setValue(event.target.result as string);
    }
  };
};
