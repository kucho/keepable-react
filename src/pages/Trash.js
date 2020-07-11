import React from "react";
import styled from "@emotion/styled";
import Note from "../components/Note";
import { UpdateNote } from "../services/notes";

const Wrapper = styled.div`
  min-height: 100%;
`;

const ContentRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Trash = ({ notes, setNotes }) => {
  const TrashedNotes = () => {
    return (
      <>
        {notes
          .filter((note) => note.deleted_at)
          .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
          .map((note) => (
            <Note key={note.id} {...note} notes={notes} setNotes={setNotes} />
          ))}
      </>
    );
  };
  return (
    <Wrapper>
      <ContentRow
        style={{
          flexWrap: "wrap",
        }}
      >
        <TrashedNotes />
      </ContentRow>
    </Wrapper>
  );
};

export default Trash;
