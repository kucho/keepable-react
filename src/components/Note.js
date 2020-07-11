/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useState } from "react";
import { Colors } from "../utils";
import ColorPicker from "./ColorPicker";

const TrashIcon = ({ fill = "#999B9E" }) => {
  const Container = styled.div`
    display: flex;
    position: relative;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: none;
  `;

  return (
    <Container>
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4583 1V0H5.20833V1H0V3H1.04167V16C1.04167 17.1 1.97917 18 3.125 18H13.5417C14.6875 18 15.625 17.1 15.625 16V3H16.6667V1H11.4583ZM13.5417 16H3.125V3H13.5417V16Z"
          fill={fill}
        />
        <path
          d="M5.20837 5H7.29171V14H5.20837V5ZM9.37504 5H11.4584V14H9.37504V5Z"
          fill={fill}
        />
      </svg>
    </Container>
  );
};

const Footer = ({ deleted, setDeleted, setColor }) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;

    > * {
      margin-right: 1rem;
    }
  `;

  if (deleted) {
    return <Container></Container>;
  }

  return (
    <Container>
      <ColorPicker setColor={setColor} />
      <TrashIcon />
    </Container>
  );
};

const Note = ({ title, body, color, changeColor }) => {
  const [deleted, setDeleted] = useState(false);

  const Container = styled.div`
    width: 260px;
    padding: 20px;
    color: black;
    height: 260px;
    background: #ffffff;
    box-shadow: 5px 5px 15px rgba(153, 155, 158, 0.85);
    border-radius: 8px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    margin-right: 2rem;
    margin-top: 2rem;
  `;

  const Main = styled.div``;

  return (
    <Container
      css={css`
        background-color: ${Colors[color]?.code};
      `}
    >
      <Main>
        <p
          css={css`
            width: 100%;
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            word-break: break-all;
            background: inherit;
          `}
        >
          {title}
        </p>
        <p
          css={css`
            width: 100%;
            font-family: inherit;
            height: 50px;
            font-size: 18px;
            line-height: 24px;
            margin-top: 0.8rem;
            word-break: break-all;
            background: inherit;
          `}
        >
          {body}
        </p>
      </Main>
      <Footer
        deleted={deleted}
        setDelete={setDeleted}
        setColor={changeColor}
      ></Footer>
    </Container>
  );
};

export default Note;
