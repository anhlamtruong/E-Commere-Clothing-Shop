import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component.jsx";
function Directory({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((cat) => (
        <DirectoryItem key={cat.id} category={cat} />
      ))}
    </div>
  );
}

export default Directory;
