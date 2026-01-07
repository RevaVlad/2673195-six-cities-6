export function OfferImage({imageUrl}: { imageUrl: string }) {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={imageUrl} alt="Photo studio"/>
    </div>);
}

export function OfferImages({imageUrls}: { imageUrls: string[] }) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {imageUrls.map((imageUrl) => <OfferImage imageUrl={imageUrl} key={imageUrl}/>)}
      </div>
    </div>);
}
