import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 7rem;
  padding: 2.5rem;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-size: 1.4rem;
  &:visited,
  &:link {
    text-decoration: none;
    text-transform: uppercase;
  }
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;
// .nav {

//   &__logo {
//     height: 100%;
//     width: 7rem;
//     padding: 2.5rem;
//   }

//   &__links-container {
//     width: 50%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;

//     .nav__link {
//       padding: 1rem 1.5rem;
//       cursor: pointer;
//       font-size: 1.4rem;
//       &:visited,
//       &:link {
//         text-decoration: none;
//         text-transform: uppercase;
//       }
//       &:hover,
//       &:active {
//         text-decoration: underline;
//       }
//     }
//   }
// }
