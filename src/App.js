// import logo from "./logo.svg";
import "./App.styles.scss";

import Categories from "./components/categories/categories.component";
function App() {
  const categories = [
    {
      id: 1,
      title: "HATS",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "JACKETS",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "SNEAKERS",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "WOMEN",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "MEN",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];
  return <Categories categories={categories} />;
}

export default App;
