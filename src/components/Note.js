/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { DeleteNote, UpdateNote } from "../services/notes";
import { Colors } from "../utils";
import ColorPicker from "./ColorPicker";

const TrashIcon = ({ fill = "#999B9E", onClick }) => {
  const Container = styled.div`
    display: flex;
    position: relative;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: none;
    background: #ffffff;
  `;

  return (
    <Container onClick={onClick}>
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4583 1V0H5.20833V1H0V3H1.04167V16C1.04167 17.1 1.97917 18 3.125 18H13.5417C14.6875 18 15.625 17.1 15.625 16V3H16.6667V1H11.4583ZM13.5417 16H3.125V3H13.5417V16Z"
          fill={fill}
        />
        <path
          d="M5.20837 5H7.29171V14H5.20837V5ZM9.37504 5H11.4584V14H9.37504V5Z"
          fill={fill}
        />
      </svg>
    </Container>
  );
};
const RestoreIcon = ({ fill = "#999B9E", restoreNote }) => {
  const Container = styled.div`
    display: flex;
    position: relative;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: none;
    background: #ffffff;
  `;

  return (
    <Container onClick={restoreNote}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0233 4.20712L7.36829 0.269512C7.03484 -0.0895737 6.46562 -0.090101 6.13171 0.269512L2.47634 4.20712C1.97691 4.74501 2.35765 5.625 3.09463 5.625H5.34375V15.1875H2.39147C2.33607 15.1875 2.28121 15.1984 2.23003 15.2196C2.17884 15.2408 2.13234 15.2719 2.09317 15.3111L0.12442 17.2798C-0.141361 17.5456 0.0468655 18 0.422721 18H7.3125C7.7785 18 8.15625 17.6222 8.15625 17.1562V5.625H10.4051C11.139 5.625 11.5248 4.74719 11.0233 4.20712Z"
          fill={fill}
        />
      </svg>
    </Container>
  );
};

const Footer = ({ deleted, softDelete, hardDelete, restoreNote, setColor }) => {
  const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;

    > * {
      margin-right: 1rem;
    }
  `;

  if (deleted) {
    return (
      <Container>
        <TrashIcon onClick={hardDelete} />
        <RestoreIcon restoreNote={restoreNote} />
      </Container>
    );
  }

  return (
    <Container>
      <ColorPicker setColor={setColor} />
      <TrashIcon onClick={softDelete} />
    </Container>
  );
};

const Note = ({
  id,
  title,
  body,
  color,
  deleted_at,
  changeColor,
  notes,
  setNotes,
}) => {
  async function HandleSoftDelete() {
    const { error } = await DeleteNote({ id });
    if (!error) {
      const clone = [...notes];
      const targetIndex = clone.findIndex((note) => note.id === id);
      const targetNote = { ...clone[targetIndex], deleted_at: Date.now() };
      clone[targetIndex] = targetNote;
      setNotes(clone);
    }
  }

  async function HandleHardDelete() {
    const { error } = await DeleteNote({ id });
    if (!error) {
      const clone = [...notes];
      const targetIndex = clone.findIndex((note) => note.id === id);
      clone.splice(targetIndex, 1);
      setNotes(clone);
    }
  }

  async function handleUpdateNote(id, newNote) {
    const { data, error } = await UpdateNote({
      id,
      content: newNote,
    });
    if (!error) {
      const clone = [...notes];
      const oldNoteIndex = clone.findIndex((el) => el.id === id);
      clone[oldNoteIndex] = data;
      setNotes(clone);
    }
  }

  const HandleRestoreNote = () => {
    handleUpdateNote(id, { deleted_at: "" });
  };

  const Container = styled.div`
    width: 260px;
    padding: 20px;
    color: black;
    height: 260px;
    background: #ffffff;
    box-shadow: 5px 5px 15px rgba(153, 155, 158, 0.85);
    border-radius: 8px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    margin-right: 2rem;
    margin-top: 2rem;
  `;

  const Main = styled.div``;

  return (
    <Container
      css={css`
        background-color: ${Colors[color]?.code};
      `}
    >
      <Main>
        <p
          css={css`
            width: 100%;
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            word-break: break-all;
            background: inherit;
          `}
        >
          {title}
        </p>
        <p
          css={css`
            width: 100%;
            font-family: inherit;
            height: 50px;
            font-size: 18px;
            line-height: 24px;
            margin-top: 0.8rem;
            word-break: break-all;
            background: inherit;
          `}
        >
          {body}
        </p>
      </Main>
      <Footer
        deleted={deleted_at}
        softDelete={HandleSoftDelete}
        hardDelete={HandleHardDelete}
        restoreNote={HandleRestoreNote}
        setColor={changeColor}
      ></Footer>
    </Container>
  );
};

export default Note;
