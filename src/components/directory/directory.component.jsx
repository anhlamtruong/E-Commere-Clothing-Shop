import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component.jsx";
const categories = [
  {
    id: 1,
    title: "HATS",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    route: "shop/hats",
  },
  {
    id: 2,
    title: "JACKETS",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "shop/jackets",
  },
  {
    id: 3,
    title: "SNEAKERS",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    route: "shop/sneakers",
  },
  {
    id: 4,
    title: "WOMEN",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    route: "shop/womens",
  },
  {
    id: 5,
    title: "MEN",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    route: "shop/mens",
  },
];

function Directory() {
  return (
    <div className="categories-container">
      {categories.map((cat) => (
        <DirectoryItem key={cat.id} category={cat} />
      ))}
    </div>
  );
}

export default Directory;
