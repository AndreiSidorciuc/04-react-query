import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

// Типизация пропсов через interface согласно ТЗ
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  // Функция-экшен для обработки отправки формы через React 19 Action
  // Она автоматически принимает объект FormData в качестве параметра
  const handleFormAction = (formData: FormData) => {
    // Извлекаем значение инпута по его атрибуту 'name'
    const queryValue = formData.get("query") as string;

    // Валидация на пустую строку
    if (!queryValue || queryValue.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }

    // Передаем очищенное значение в родительский компонент App
    onSubmit(queryValue.trim());
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {/* ИСПОЛЬЗУЕМ АТРИБУТ action вместо onSubmit (preventDefault больше не нужен) */}
        <form className={css.form} action={handleFormAction}>
          <input
            className={css.input}
            type="text"
            name="query" // Обязательный атрибут для formData.get("query")
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
