/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useState } from "react";

import Editable from "./Editable";
import ColorPicker from "./ColorPicker";

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

const Form = () => {
  const [editTitle, setEditTitle] = useState(false);
  const [editBody, setEditBody] = useState(false);
  const [color, setColor] = useState("white");

  const handlePostNote = () => {};

  return (
    <Container style={{ backgroundColor: color }}>
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
            background: inherit;
            word-break: break-all;
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
            background: inherit;
            word-break: break-all;
          `}
          multiline={true}
        />
      </Main>
      <Footer>
        <ColorPicker setColor={setColor} />
        <button
          css={css`
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
            background: transparent;
            box-shadow: none;
            cursor: pointer;
          `}
          onClick={handlePostNote}
        >
          Keep it!
        </button>
      </Footer>
    </Container>
  );
};

export default Form;
