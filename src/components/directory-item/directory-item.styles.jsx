import styled from "styled-components";

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 4s cubic-bezier(0.12, 0.72, 0.2, 0.87);
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const Info = styled.div`
  aspect-ratio: 1/1;
  width: 12rem;
  height: 12rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0);
  h2 {
    font-weight: bold;
    margin: 0 0.6rem 0;
    font-size: 2.2rem;
  }
  p {
    font-weight: lighter;
    font-size: 1.6rem;
  }
`;

export const DirectoryItemContainer = styled.div`
  aspect-ratio: 1/1;
  min-width: 30%;
  height: 24rem;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.75rem 1.5rem;
  overflow: hidden;
  position: relative;
  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.2);
    }
    & ${Info} {
      opacity: 0.9;
    }
  }
  &.large {
    height: 38rem;
  }
  &:first-child {
    margin-right: 0.75rem;
  }
  &:last-child {
    margin-left: 0.75rem;
  }
`;

// .directory-container {
// background-color: green;
// aspect-ratio: 1/1;
// min-width: 30%;
// height: 24rem;
// flex: 1 1 auto;
// align-items: center;
// justify-content: center;
// border: 1px solid black;
// margin: 0 0.75rem 1.5rem;
// overflow: hidden;
// position: relative;
// &:hover {
//   cursor: pointer;

//   & .directory-container__image {
//     transform: scale(1.2);
//   }
//   & .directory-container__info {
//     opacity: 0.9;
//   }
// }
// &.large {
//   height: 38rem;
// }
// &:first-child {
//   margin-right: 0.75rem;
// }
// &:last-child {
//   margin-left: 0.75rem;
// }
// &__image {
//   width: 100%;
//   height: 100%;
//   background-size: cover;
//   background-position: center;
//   transform: scale(1);
//   transition: transform 4s cubic-bezier(0.12, 0.72, 0.2, 0.87);
// }
// &__info {
//   aspect-ratio: 1/1;
//   width: 12rem;
//   height: 12rem;
//   padding: 0.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid black;
//   background-color: white;
//   opacity: 0.7;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%) rotate(0);

// font-size: 2rem;
// background-color: blue;
// h2 {
//   font-weight: bold;
//   margin: 0 0.6rem 0;
//   font-size: 2.2rem;
// }
// p {
//   font-weight: lighter;
//   font-size: 1.6rem;
// }
//   }
// }
