export const ApiURL = "http://localhost:3000";

export const ListNotes = async () => {
  try {
    const response = await fetch(ApiURL + "/notes");
    const data = await response.json();

    if (response.ok) {
      return { data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: "Network error" };
  }
};

export const UpdateNote = async ({ id, content }) => {
  try {
    const response = await fetch(ApiURL + `/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(content),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return { data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: "Network error" };
  }
};

export const AddNote = async ({ content }) => {
  try {
    const response = await fetch(ApiURL + `/notes`, {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return { data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: "Network error" };
  }
};

export const DeleteNote = async ({ id }) => {
  try {
    const response = await fetch(ApiURL + `/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      return { error: null };
    }
  } catch (error) {
    return { error: "Network error" };
  }
};
