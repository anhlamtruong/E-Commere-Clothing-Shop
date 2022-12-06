import "./category-item.styles.scss";

function CategoryItem({ category }) {
  const { title, id, imageUrl } = category;
  return (
    <div key={id} className="category-container">
      <div
        className="category-container__image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-container__info">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default CategoryItem;
