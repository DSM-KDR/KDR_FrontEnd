export const paraphraseText = (
  productDescription: string
): (string | JSX.Element)[] => {
  return productDescription.split(/(?:\[|\])+/).map((v, i) => {
    if (v.startsWith("http://") || v.startsWith("https://"))
      return (
        <figure key={`detail${i}`}>
          <img src={v} alt="" loading="lazy" />
        </figure>
      );
    else if (v.length > 0) return <p key={`detail${i}`}>{v}</p>;
    else return v;
  });
};
