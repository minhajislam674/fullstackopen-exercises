import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";
import { ALL_AUTHORS } from "../queries";
import ErrorMessage from "./ErrorMessage";

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [error, setError] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],

    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors;
      const messages = Object.values(errors)
        .map((e) => e.message)
        .join("\n");
      setError(messages);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name, born: Number(born) },
    });

    console.log("Author has been updated");

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <ErrorMessage error={error} />
      <form onSubmit={submit}>
        <label>
          name
          <select
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            <option value="">-- select an author --</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>
        <button disabled={!name | !born} type="submit">
          update
        </button>
      </form>
    </div>
  );
};

export default SetBirthyear;
