import "./directory-item.styles.scss";

function DirectoryItem({ category }) {
  const { title, id, imageUrl } = category;
  return (
    <div key={id} className="directory-container">
      <div
        className="directory-container__image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-container__info">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
