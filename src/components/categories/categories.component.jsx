import "./categories.styles.scss";
import CategoryItem from "../category-item/category-item.component.jsx";
function Categories({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((cat) => (
        <CategoryItem key={cat.id} category={cat} />
      ))}
    </div>
  );
}

export default Categories;
