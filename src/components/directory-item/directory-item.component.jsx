import { useNavigate } from "react-router-dom";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Info,
} from "./directory-item.styles.jsx";

function DirectoryItem({ category }) {
  const { title, id, imageUrl, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler} key={id}>
      <BackgroundImage imageUrl={imageUrl} />
      <Info>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Info>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
