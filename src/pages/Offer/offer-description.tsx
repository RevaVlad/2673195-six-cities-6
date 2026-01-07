export function OfferDescription({description}: { description: string }) {
  const paragraphs = description.split('\n\n');
  return (
    <div className="offer__description">
      {paragraphs.map((paragraph) =>
        (
          <p className="offer__text" key={paragraph}>
            {paragraph}
          </p>))}
    </div>);
}
