import viteLogo from "/vite.svg";
import reactLogo from "@/assets/react.svg";

function Header() {
  return (
    <header>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </header>
  );
}

export default Header;
