import React from "react";
import bleach from "../images/bleach.jpg";

const styles = {
  movieCard: {
    borderTop: "2px solid #000",
    paddingTop: 16,
    textAlign: "center",
  },
  poster: {
    width: 120,
    height: 160,
    margin: "8px auto",
    border: "1px solid #333",
    objectFit: "cover",
  },
  posterPlaceholder: {
    width: 120,
    height: 160,
    margin: "8px auto",
    border: "1px solid #333",
    background:
      "repeating-linear-gradient(45deg, #867f7f, #867f7f 10px, #fff 10px, #fff 20px)",
  },
  castList: {
    margin: "0 0 12px 0",
    paddingLeft: 20,
  },
  castListPlain: {
    listStyle: "none",
    paddingLeft: 0,
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
    backgroundColor: "#d9333f",
  },
  clearButtonButton: {
    padding: "8px 20px",
    border: "none",
    borderRadius: 4,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#2f6fd9",
  },
};

function Output({ movies, onDelete, onEdit }) {
  return (
    <>
      {movies.map((movie, index) => (
        <div style={styles.movieCard} key={index}>
          <h3>MOVIE NUMBER: {index + 1}</h3>

        {movie.poster ? (
        <img
            src={movie.poster}
            alt="Poster"
            style={styles.poster}
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = bleach;
            }}
        />
        ) : (
        <img src={bleach} alt="Poster" style={styles.poster} />
        )}

          <p>
            <strong>Movie Name:<br></br></strong> {movie.name}
          </p>
          <p>
            <strong>Year Release:<br></br></strong> {movie.year}
          </p>
          <p>
            <strong>Rate:<br></br></strong> {movie.rating} -{" "}
            {movie.rating < 5 ? "Not Recommended" : "Highly Recommended"}
          </p>
          <p>
            <strong>Movie Cast:</strong>
          </p>
          <ul style={{ ...styles.castList, ...styles.castListPlain }}>
            {movie.cast.map((actor, i) => (
              <li key={i}>
                {i + 1}. {actor}
              </li>
            ))}
          </ul>
          <p>
            <strong>Sypnosis:</strong>
          </p>
          <p>{movie.synopsis}</p>
          <div style={styles.buttonRow}>
            <button style={styles.addButton} onClick={() => onDelete(index)}>
              Delete
            </button>
            <button
              style={styles.clearButtonButton}
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Output;