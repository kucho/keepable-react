import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "../components/Form";
import Note from "../components/Note";
import { UpdateNote } from "../services/notes";
import { Colors } from "../utils";

const ContentRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Notes = ({ notes, setNotes }) => {
  async function handleUpdateNote(oldNote, newNote) {
    const { data, errors } = await UpdateNote({
      id: oldNote.id,
      content: newNote,
    });
    if (!errors) {
      const clone = [...notes];
      const oldNoteIndex = clone.findIndex((el) => el.id === oldNote.id);
      clone[oldNoteIndex] = data;
      setNotes(clone);
    }
  }

  const handleChangeColor = ({ note, newColorCode }) => {
    const colorObj = Object.entries(Colors).find(
      ([_, value]) => value.code === newColorCode
    );
    const colorName = Object.values(colorObj)[0];

    handleUpdateNote(note, { color: colorName });
  };

  const RegularNotes = () => {
    return (
      <>
        {notes
          .filter((note) => !note.deleted_at)
          .sort((a, b) => b.created_at.localeCompare(a.created_at))
          .map((note) => (
            <Note
              key={note.id}
              {...note}
              changeColor={(newColorCode) =>
                handleChangeColor({ note, newColorCode })
              }
            />
          ))}
      </>
    );
  };

  return (
    <>
      <ContentRow>
        <Form />
      </ContentRow>
      <ContentRow
        style={{
          flexWrap: "wrap",
        }}
      >
        <RegularNotes />
      </ContentRow>
    </>
  );
};

export default Notes;
