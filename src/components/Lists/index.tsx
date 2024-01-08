import Button from "@components/Button";
import styles from "./Lists.module.css";
import { useState } from "react";
import useAddList from "@state/hooks/useAddList";

export default function Lists() {
  const [list, setList] = useState("");
  const addList = useAddList();
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addList(list);
    setList("");
  }

  return (
    <div className={styles.lists}>
      <h2 className={styles.lists__title}>Lists</h2>
      <form className={styles.lists__form} onSubmit={onSubmit}>
        <label htmlFor="list">Add a new list</label>
        <input
          type="text"
          id="list"
          value={list}
          onChange={(event) => setList(event.target.value)}
          placeholder="Type a list"
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}
