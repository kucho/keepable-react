import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "../components/Form";

const UpperSide = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const MiddleSide = styled.div``;

const LowerSide = styled.div``;

const Notes = () => {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <UpperSide>
        <Form />
      </UpperSide>
      <MiddleSide></MiddleSide>
      <LowerSide></LowerSide>
    </div>
  );
};

export default Notes;
