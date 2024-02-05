import { useState } from "react";
import styles from "./ListsForm.module.css";
import Button from "@components/Button";
import useAddList from "@state/hooks/useAddList";
import useEditList from "@state/hooks/useEditList";
import { IList } from "@interfaces/IList";
import { useSetRecoilState } from "recoil";
import { editState } from "@state/atom";

interface ListsFormProps {
  textAction: string,
  list?: IList
}

export default function ListsForm({ textAction, list }: ListsFormProps) {
  let initialListName = "";

  if(list) {
    initialListName = list.name;
  }

  const [newListName, setNewListName] = useState(initialListName);

  const addList = useAddList();
  const editList = useEditList();
  const setEdit = useSetRecoilState<string | null>(editState);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(list) {
      editList(list.id, newListName);
      setEdit(null);
    } else {
      addList(newListName);
    }

    setNewListName("");
  }

  return (
    <form className={styles.listsForm} onSubmit={onSubmit}>
      <label htmlFor="list">{textAction} a list</label>
      <input
        type="text"
        id="list"
        value={newListName}
        onChange={(event) => setNewListName(event.target.value)}
        required
        placeholder="Type a list"
      />
      <Button type="submit">{textAction}</Button>
    </form>
  );
}
