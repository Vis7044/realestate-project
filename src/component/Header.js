import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h1>RealEstate</h1>
      <form>
        <input className="" type="text" placeholder="search" />
      </form>
      <div className={classes.headerLink}>
        <p>Home</p>
        <p>About</p>
        <p>Signin</p>
      </div>
    </div>
  );
};

export default Header;
