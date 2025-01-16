import css from "./Loader.module.css";
import { Discuss } from "react-loader-spinner";

function Loader() {
  return (
    <div className={css.loader}>
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="discuss-loading"
        wrapperStyle={{}}
        wrapperClass="discuss-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div>
  );
}
export default Loader;
