import React from "react";
import { useState } from "react";
import Output from "./Output";

const styles = {

  mainContainer: {
    maxWidth: 560,
    margin: "auto",
    padding: 20,
    maxHeight: "200%",
  },
  title: {
    textAlign: "center",
    fontSize: "7vh",
    paddingBottom: 9,
    fontStyle: "italic",
    color: "pink",
    width: "120%",
    marginLeft: "-10%",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    width: 150,
    fontWeight: "bold",
    height: 35,
  },
  inputField: {
    flex: 1,
    padding: "6px 8px",
    border: "1px solid #939191",
    borderRadius: 4,
    height: 25,
    marginLeft: 15,
  },
  inputMovie: {
    flex: 1,
    padding: "6px 8px",
    border: "1px solid #939191",
    borderRadius: 4,
    height: 25,
  },
  select: {
    flex: 1,
    padding: "6px 8px",
    border: "1px solid #939191",
    borderRadius: 3,
    height: 40, 
    marginLeft: 15,
  },
  slider: {
    flex: 1,
    height: 0.5,
    backgroundColor:"pink",
    marginLeft: 15,
  },
  castRow: {
    display: "flex",
    gap: 8,
    marginBottom: 8,
  },
  castList: {
    margin: "0 0 12px 0",
    paddingLeft: 20,
  },
  textarea: {
    width: "100%",
    height: 70,
    padding: 8,
    border: "1px solid #939191",
    borderRadius: 4,
    resize: "vertical",
    boxSizing: "border-box",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    margin: "16px 0",
  },
  addButton: {
    padding: "8px 20px",
    border: "none",
    borderRadius: 4,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#0fb70c",
    
  },
  clearButton: {
    padding: "8px 20px",
    border: "none",
    borderRadius: 4,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#c30b0b",
  },
};

function Movies() {
  const [movies, setMovies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    poster: "",
    year: "",
    rating: 1,
    castInput: "",
    cast: [],
    synopsis: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCast = () => {
    if (!form.castInput.trim()) return;
    setForm({
      ...form,
      cast: [...form.cast, form.castInput.trim()],
      castInput: "",
    });
  };

 const handleSubmit = () => {
  if (
    !form.name.trim() ||
    !form.poster.trim() ||
    !form.year ||
    !form.synopsis.trim()
  ) {
    alert("All fields are required.");
    return;
  }

  if (form.cast.length === 0) {
    alert("Movie cast must have at least one value.");
    return;
  }

  if (editIndex !== null) {
    const updated = [...movies];
    updated[editIndex] = form;
    setMovies(updated);
    setEditIndex(null);
  } else {
    setMovies([...movies, form]);
  }
  handleClear();
};

  const handleClear = () => {
    setForm({
      name: "",
      poster: "",
      year: "",
      rating: 1,
      castInput: "",
      cast: [],
      synopsis: "",
    });
  };

  const handleDelete = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setForm(movies[index]);
    setEditIndex(index);
  };

  return (
      <div style={styles.mainContainer}>
        <h1 style={styles.title}>MOVIE LISTS</h1>

        <div style={styles.formContainer}>
          <label style={styles.label}>Movie Name:</label>
          <input
            style={styles.inputField}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Movie Name"
            required
          />
        </div>

        <div style={styles.formContainer}>
          <label style={styles.label}>Movie Background:</label>
          <input
            style={styles.inputField}
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>

        <div style={styles.formContainer}>
            <label style={styles.label}>Year Release:</label>
            <select
              style={styles.select}
              name="year"
              value={form.year}
              onChange={handleChange}
            >
              <option value="" disabled>Select Year</option>
              {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

        <div style={styles.formContainer}>
          <label style={styles.label}>Movie Rating:</label>
          <input
            style={styles.slider}
            type="range"
            name="rating"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
          />
          <span style={{ marginLeft: 8 }}>{form.rating}</span>
        </div>

        <label style={styles.label}>Movie Cast:</label>
        <div style={styles.castRow}>
          <input
            style={styles.inputMovie}
            name="castInput"
            value={form.castInput}
            onChange={handleChange}
            placeholder="Actor name"
          />
          <button style={styles.addButton} type="button" onClick={handleAddCast}>Add Cast</button>
        </div>
        <ul style={styles.castList}>
          {form.cast.map((actor, i) => (
            <li key={i}>{actor}</li>
          ))}
        </ul>

        <label style={styles.label}>Synopsis:</label>
        <textarea
          style={styles.textarea}
          name="synopsis"
          value={form.synopsis}
          onChange={handleChange}
          placeholder="Synopsis about the movie"
        />

        <div style={styles.buttonRow}>
          <button style={styles.addButton} onClick={handleSubmit}>Submit</button>
          <button style={styles.clearButton} onClick={handleClear}>Clear</button>
        </div>

        <Output movies={movies} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
  );
}

export default Movies;