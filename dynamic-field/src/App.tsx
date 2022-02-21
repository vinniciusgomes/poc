import { useState } from "react";
import { DynamicField } from "./components/DynamicField";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <DynamicField />
    </div>
  );
}

export default App;
