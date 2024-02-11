import { IList } from "@interfaces/IList";
import styles from "./ListsItem.module.css";
import useHandleSelectedList from "@state/hooks/useHandleSelectedList";
import Button from "@components/Button";
import useDeleteList from "@state/hooks/useDeleteList";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import ListsForm from "../ListsForm";

interface ListsItemProps {
  list: IList;
}

export default function ListsItem({ list }: ListsItemProps) {
  const handleSelectedList = useHandleSelectedList();
  const deleteList = useDeleteList();

  const [edit, setEdit] = useRecoilState<string | null>(editState);

  return (
    <li className={styles.listItem}>
      {(!edit || edit !== list.id) && (
        <div className={styles.listItem__read}>
          <p
            className={`${styles.listItem__text} ${
              list.selected ? styles["listItem__text--selected"] : ""
            }`}
            onClick={() => handleSelectedList(list.id)}
            aria-label={`Select list: ${list.name}`}
            tabIndex={0}
          >
            {list.name}
          </p>
          <div className={styles.listItem__options}>
            <Button onClick={() => setEdit(list.id)}>Edit</Button>
            <Button onClick={() => deleteList(list.id)}>-</Button>
          </div>
        </div>
      )}
      {edit && edit === list.id && (
        <ListsForm textAction="Edit" list={list} />
      )}
    </li>
  );
}
