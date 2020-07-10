import { useState, useRef, useEffect } from "react";
/** @jsx jsx */
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

const WriteContent = ({ text, setText, edit, setEdit, style, multiline }) => {
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setEdit(!edit);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEdit(!edit);
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

const Editable = ({ placeholder, edit, setEdit, style, multiline }) => {
  const [text, setText] = useState("");

  if (edit) {
    return (
      <WriteContent
        text={text}
        setText={setText}
        edit={edit}
        setEdit={setEdit}
        style={style}
        multiline={multiline}
      />
    );
  }

  return (
    <ReadContent
      text={text ? text : placeholder}
      onClick={() => setEdit(!edit)}
      style={style}
    />
  );
};

export default Editable;
