import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="/add" element={<UserList/>}/>
        <Route path="/" element={<UserList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
