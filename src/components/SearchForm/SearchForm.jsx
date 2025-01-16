import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import css from "./SearchForm.module.css";

function SearchForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formValue = form.elements.search.value.trim();

    if (formValue === "") {
      return toast.error("No movies found for your search.", {
        position: "bottom-right",
      });
    }
    onSubmit(formValue);
    form.reset();
    form.elements.search.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.inputWrapper}>
        <button className={css.btn} type="submit">
          <FaSearch size="18px" />
        </button>
        <input className={css.input} type="text" name="search" />
      </div>
    </form>
  );
}

export default SearchForm;
