import React, { useState } from "react";
import styled from "@emotion/styled";
import Form from "../components/Form";
import Note from "../components/Note";
import { UpdateNote } from "../services/notes";
import { Colors, getColorName } from "../utils";

const ContentRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Notes = ({ notes, setNotes }) => {
  async function handleUpdateNote(oldNote, newNote) {
    const { data, error } = await UpdateNote({
      id: oldNote.id,
      content: newNote,
    });
    if (!error) {
      const clone = [...notes];
      const oldNoteIndex = clone.findIndex((el) => el.id === oldNote.id);
      clone[oldNoteIndex] = data;
      setNotes(clone);
    }
  }

  const handleChangeColor = ({ note, newColorCode }) => {
    handleUpdateNote(note, { color: getColorName(newColorCode) });
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
        <Form onAddedNote={(note) => setNotes([note, ...notes])} />
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
