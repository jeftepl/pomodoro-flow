import "./App.css";
import { RecoilRoot } from "recoil";
import List from "@components/List";
import Container from "@components/Container";
import Timer from "@components/Timer";
import DebugObserver from "@components/DebugObserver";

function App() {
  return (
    <RecoilRoot>
      <DebugObserver />
      <Container>
        <Timer />
        <List />
      </Container>
    </RecoilRoot>
  );
}

export default App;
