import css from "./NotFoundPage.module.css";
import { GoAlert } from "react-icons/go";
function NotFoundPage() {
  return (
    <div className={css.errorContainer}>
      <h1>404</h1>
      <GoAlert size={50} color="white" />
      <h3>Oops! Something went wrong. Please refresh the page!</h3>
    </div>
  );
}

export default NotFoundPage;
