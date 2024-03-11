import "./App.scss";
import { RecoilRoot } from "recoil";
import Container from "@components/Container";
import Timer from "@components/Timer";
import DebugObserver from "@components/DebugObserver";
import Widgets from "@components/Widgets";

function App() {
  return (
    <RecoilRoot>
      <DebugObserver />
      <Container>
        <Timer />
        <Widgets />
      </Container>
    </RecoilRoot>
  );
}

export default App;
