import { useRef, useEffect } from "react";
/** @jsx jsx */
// eslint-disable-next-line
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

const ReadContent = ({ text, onClick, style }) => {
  return (
    <p onClick={onClick} css={style}>
      {text}
    </p>
  );
};

const Input = styled.input``;

const WriteContent = ({ text, setText, toggleEdit, style, multiline }) => {
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      toggleEdit();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toggleEdit();
    }
  };

  return (
    <Input
      type="text"
      name="editable"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      ref={myRef}
      autoFocus
      css={style}
      as={multiline && "textarea"}
    />
  );
};

const Editable = ({
  placeholder,
  edit,
  toggleEdit,
  style,
  multiline,
  text,
  setText,
}) => {
  if (edit) {
    return (
      <WriteContent
        text={text}
        setText={setText}
        edit={edit}
        toggleEdit={toggleEdit}
        style={style}
        multiline={multiline}
      />
    );
  }

  return (
    <ReadContent
      text={text ? text : placeholder}
      onClick={() => toggleEdit()}
      style={style}
    />
  );
};

export default Editable;
