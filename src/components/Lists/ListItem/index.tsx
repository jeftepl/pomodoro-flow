import { IList } from "@interfaces/IList";
import styles from "./ListItem.module.css";
import useHandleSelectedList from "@state/hooks/useHandleSelectedList";
import Button from "@components/Button";
import useDeleteList from "@state/hooks/useDeleteList";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import useEditList from "@state/hooks/useEditList";

interface ListItemProps {
  list: IList;
}

export default function ListItem({ list }: ListItemProps) {
  const handleSelectedList = useHandleSelectedList();
  const deleteList = useDeleteList();
  const editList = useEditList();

  const [edit, setEdit] = useRecoilState(editState);

  function handleEditList() {
    editList(list.id, listName);
    setEdit(null);
  }

  const [listName, setListName] = useState(list.name);

  return (
    <li className={styles.listItem}>
      {
        (!edit || (edit !== list.id)) && <div className={styles.listItem__read}>
        <p
          className={`${styles.listItem__text} ${
            list.selected ? styles["listItem__text--selected"] : ""
          }`}
          onClick={() => handleSelectedList(list.id)}
        >
          {list.name}
        </p>
        <div className={styles.listItem__options}>
          <Button onClick={() => setEdit(list.id)}>Edit</Button>
          <Button onClick={() => deleteList(list.id)}>-</Button>
        </div>
      </div>
      }
      {
        edit && edit === list.id && <div className={styles.listItem__edit}>
        <input
          type="text"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
        />
        <Button onClick={handleEditList}>Ok</Button>
      </div>
      }
    </li>
  );
}
