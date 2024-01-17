import { IList } from "@interfaces/IList";
import styles from "./ListItem.module.css";
import useHandleSelectedList from "@state/hooks/useHandleSelectedList";
import Button from "@components/Button";
import useDeleteList from "@state/hooks/useDeleteList";

interface ListItemProps {
  list: IList;
}

export default function ListItem({ list }: ListItemProps) {
  const handleSelectedList = useHandleSelectedList();
  const deleteList = useDeleteList();

  return (
    <li className={styles.listItem}>
      <p
        className={`${styles.listItem__text} ${
          list.selected ? styles["listItem__text--selected"] : ""
        }`}
        onClick={() => handleSelectedList(list.id)}
      >
        {list.name}
      </p>
      <div className={styles.listItem__options}>
        <Button>Edit</Button>
        <Button onClick={() => deleteList(list.id)}>-</Button>
      </div>
    </li>
  );
}
