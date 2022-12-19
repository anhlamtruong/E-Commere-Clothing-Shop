import styled, { keyframes } from "styled-components";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles.jsx";

const fadein = keyframes`
  0%{opacity: 0;}
  100% {opacity: 1}
`;
const fadeout = keyframes`
  0%{opacity: 1;}
  100% {opacity: 0}
`;

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 24rem;
  height: 34rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  background-color: white;
  justify-content: center;
  align-items: center;
  top: 9rem;
  right: 4rem;
  z-index: 5;
  transition: all 0.3s ease-in-out;
  animation: ${fadein} 0.2s;
  animation-fill-mode: backwards;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 1.8rem;
  margin: 5rem auto;
`;

export const CartItems = styled.div`
  height: 24rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// .cart-dropdown {
// position: absolute;
// width: 24rem;
// height: 34rem;
// display: flex;
// flex-direction: column;
// padding: 2rem;
// border: 1px solid black;
// background-color: white;
// justify-content: center;
// align-items: center;
// top: 9rem;
// right: 4rem;
// z-index: 5;
// transition: all 0.3s ease-in-out;
// animation: fadein 0.2s;
// animation-fill-mode: backwards;

// .empty-message {
//   // font-size: 1.8rem;
//   // margin: 5rem auto;
// }

// &__items {
//   height: 24rem;
//   display: flex;
//   flex-direction: column;
//   overflow: scroll;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// }

//   button {
//     margin-top: auto;
//   }
// }

// @keyframes fadein {
//   from {
//     opacity: 0;
//   }

//   to {
//     transform: 1;
//   }
// }
// @keyframes fadeout {
//   from {
//     opacity: 1;
//   }

//   to {
//     transform: 0;
//   }
// }
