import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={'container-fluid '+classes.header}>
      <h1>RealEstate</h1>
      <form className={classes.forminput}>
        <input className="" type="text" placeholder="search" />
      </form>
      <ul className={classes.list}>
        <li>Home</li>
        <li>About</li>
        <li>SignIn</li>
      </ul>
    </div>
  );
};

export default Header;
