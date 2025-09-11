import Nav from "../Nav";

function Header() {
  return (
    <div className="bg-purple-100 fixed z-10 top-0 left-0 right-0 p-5">
      <header className="container mx-auto">
        <Nav />
      </header>
    </div>
  );
}

export default Header;
