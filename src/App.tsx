import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center bg-gray-100">
      <div className="flex flex-col h-screen w-93.75 bg-white overflow-clip">
        <Outlet />
      </div>
      <ToastContainer position="top-right"/>
    </div>
  );
}

export default App;
