/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useReducer } from "react";
import { AddNote } from "../services/notes";
import { getColorName } from "../utils";
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

const initialState = {
  title: "",
  body: "",
  editTitle: false,
  editBody: false,
  color: "#FFFFFF",
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleEditTitle":
      return { ...state, editTitle: !state.editTitle };
    case "toggleEditBody":
      return { ...state, editBody: !state.editBody };
    case "updateTitle":
      return { ...state, title: action.title };
    case "updateBody":
      return { ...state, body: action.body };
    case "updateColor":
      return { ...state, color: action.color };
    case "resetForm":
      return { ...state, title: "", body: "", color: "#FFFFFF" };
    default:
      throw new Error();
  }
}

const Form = ({ onAddedNote }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePostNote = (e) => {
    e.preventDefault();

    if (state.title.length <= 3) {
      alert("Title must have more than 3 characters");
      return false;
    }

    async function Create() {
      const { data, error } = await AddNote({
        content: {
          title: state.title,
          body: state.body,
          color: getColorName(state.color),
        },
      });

      if (!error) {
        onAddedNote(data);
        dispatch({ type: "resetForm" });
      }
    }

    Create();
  };

  return (
    <Container style={{ backgroundColor: state.color }}>
      <Main>
        <Editable
          placeholder="The title for my new note"
          text={state.title}
          setText={(title) => dispatch({ type: "updateTitle", title })}
          edit={state.editTitle}
          toggleEdit={() => dispatch({ type: "toggleEditTitle" })}
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
          text={state.body}
          setText={(body) => dispatch({ type: "updateBody", body })}
          edit={state.editBody}
          toggleEdit={() => dispatch({ type: "toggleEditBody" })}
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
        <ColorPicker
          setColor={(color) => dispatch({ type: "updateColor", color })}
        />
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
