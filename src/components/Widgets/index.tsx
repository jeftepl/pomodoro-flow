import Tasks from "@components/Tasks";
import "./Widgets.scss";
import Search from "@components/Search";
import Lists from "@components/Lists";

export default function Widgets() {
  return (
    <div className="widgets">
      <Search />
      <Lists />
      <Tasks />
    </div>
  )
}