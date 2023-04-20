import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const authorResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  //pollInterval: 2000; alterntive solution to update the cache, however not ideal as causes unnecessary web traficking

  if (authorResult.loading | booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        authors={authorResult.data.allAuthors}
        show={page === "authors"}
      />

      <Books books={booksResult.data.allBooks} show={page === "books"} />

      <NewBook
        ALL_BOOKS={ALL_BOOKS}
        ALL_AUTHORS={ALL_AUTHORS}
        show={page === "add"}
      />
    </div>
  );
};

export default App;
