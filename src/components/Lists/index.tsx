import "./Lists.scss";
import useLists from "@state/hooks/useLists";
import ListsItem from "./ListsItem";
import ListsForm from "./ListsForm";
import { IList } from "@interfaces/IList";

export default function Lists() {
  const lists:IList[] = useLists();

  return (
    <div className="lists">
      <h2 className="lists__title">Lists</h2>
      <ListsForm textAction="Add" />
      <ul>
        {lists.map((list) => (
          <ListsItem key={list.id} list={list} />
        ))}
      </ul>
    </div>
  );
}
