import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-[-2]"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
      <Header />
      <main className="min-h-screen flex flex-col justify-center items-center gap-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
