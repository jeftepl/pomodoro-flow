import Button from "@components/Button";
import styles from "./Lists.module.css";
import { useState } from "react";
import useAddList from "@state/hooks/useAddList";
import useLists from "@state/hooks/useLists";
import ListItem from "./ListItem";

export default function Lists() {
  const [newList, setNewList] = useState("");
  const addList = useAddList();
  const lists = useLists();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addList(newList);
    setNewList("");
  }

  return (
    <div className={styles.lists}>
      <h2 className={styles.lists__title}>Lists</h2>
      <form className={styles.lists__form} onSubmit={onSubmit}>
        <label htmlFor="list">Add a new list</label>
        <input
          type="text"
          id="list"
          value={newList}
          onChange={(event) => setNewList(event.target.value)}
          required
          placeholder="Type a list"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul>
        {lists.map((list) => (
          <ListItem key={list.id} list={list} />
        ))}
      </ul>
    </div>
  );
}
