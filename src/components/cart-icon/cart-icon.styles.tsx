import styled from "styled-components";
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const CartIconContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShoppingIconCount = styled.span`
  position: absolute;
  font-size: 1rem;
  font-weight: bold;
  bottom: 1.2rem;
`;
// .shopping-icon-container {
//   width: 4.5rem;
//   height: 4.5rem;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

// .shopping-icon {
//   width: 2.4rem;
//   height: 2.4rem;
// }

//   .shopping-item-count {
//     position: absolute;
//     font-size: 1rem;
//     font-weight: bold;
//     bottom: 1.2rem;
//   }
// }
