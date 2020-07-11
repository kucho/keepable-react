import React from "react";
import styled from "@emotion/styled";
import Form from "../components/Form";
import Note from "../components/Note";
import { UpdateNote } from "../services/notes";
import { getColorName } from "../utils";

const ContentRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const PlaceHolder = () => {
  const Container = styled.div`
    width: 320px;
    position: relative;
    font-weight: bold;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    margin: 4rem;

    &:before {
      position: absolute;
      content: "{";
      left: 0;
      top: 10%;
      font-size: 50px;
      transform: scale(2, 3);
    }

    &:after {
      position: absolute;
      content: "}";
      right: 0;
      top: 10%;
      font-size: 50px;
      transform: scale(2, 3);
    }
  `;

  return (
    <Container>
      <p>Notes you add appear here</p>
    </Container>
  );
};

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
              notes={notes}
              setNotes={setNotes}
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
        {notes.length === 0 ? <PlaceHolder /> : <RegularNotes />}
      </ContentRow>
    </>
  );
};

export default Notes;
