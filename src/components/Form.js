/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useState } from "react";

import Editable from "./Editable";

import colorPickerIcon from "../images/icons/color-picker.svg";

const Container = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 5px 5px 15px rgba(153, 155, 158, 0.85);
  border-radius: 8px;
  color: #000000;
  width: 600px;
  height: 200px;
  padding: 20px;
`;

const Main = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;

const Button = ({ onClick, children }) => {
  const btn = css`
    cursor: pointer;
    background: transparent;
    box-shadow: none;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
  `;

  return (
    <button css={btn} onClick={onClick}>
      {children}
    </button>
  );
};

const Form = () => {
  const [editTitle, setEditTitle] = useState(false);
  const [editBody, setEditBody] = useState(false);

  const handleChangeColor = () => {};

  const handlePostNote = () => {};

  return (
    <Container>
      <Main>
        <Editable
          placeholder="The title for my new note"
          edit={editTitle}
          setEdit={setEditTitle}
          style={css`
            width: 100%;
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
          `}
        />
        <Editable
          placeholder="Type something great!"
          edit={editBody}
          setEdit={setEditBody}
          style={css`
            width: 100%;
            font-family: inherit;
            height: 50px;
            font-size: 18px;
            line-height: 24px;
            margin-top: 0.8rem;
          `}
          multiline={true}
        />
      </Main>
      <Footer>
        <Button onClick={handleChangeColor}>
          <img src={colorPickerIcon} alt="color" />
        </Button>
        <Button onClick={handlePostNote}>Keep it!</Button>
      </Footer>
    </Container>
  );
};

export default Form;
