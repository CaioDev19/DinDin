import styled from "styled-components"

export const ScrollBar = styled.div`
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &::-webkit-scrollbar {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 10px;
    height: 10px;
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.44, rgb(122, 153, 217)),
      color-stop(0.72, rgb(73, 125, 189)),
      color-stop(0.86, rgb(28, 58, 148))
    );
  }
`
