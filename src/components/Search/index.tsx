import "./Search.scss";
import { useRecoilState } from "recoil";
import { searchState } from "@state/atom";
import Button from "@components/Button";

export default function Search() {
  const [search, setSearch] = useRecoilState<string>(searchState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim().length >  0) {
      setSearch(value);
    } else {
      setSearch('');
    }
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="search">
      <form className="search__form">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Enter your search"
        />
        {search && (
          <Button onClick={clearSearch}>
            Clear
          </Button>
        )}
      </form>
    </div>
  );
}
