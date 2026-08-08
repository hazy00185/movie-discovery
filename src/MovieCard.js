import React, { useState } from "react";
import { IMAGE_BASE_URL } from "./api";
import { getMovieInsight } from "./gemini";

function MovieCard({ movie, onFavourite, isFavourite }) {
  const [insight, setInsight] = useState("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  const handleAIInsight = async () => {
    if (showInsight) {
      setShowInsight(false);
      return;
    }

    setLoadingInsight(true);
    setShowInsight(true);

    try {
      const text = await getMovieInsight(
        movie.title,
        movie.overview
      );

      setInsight(text);
    } catch (error) {
      console.error(error);
      setInsight("❌ Failed to generate AI Insight.");
    } finally {
      setLoadingInsight(false);
    }
  };

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <div style={styles.card}>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          style={styles.poster}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          style={styles.noPoster}
          role="img"
          aria-label={`No poster available for ${movie.title}`}
        >
          <span style={styles.noPosterIcon}>🎬</span>
          <span>No Poster Available</span>
        </div>
      )}

      <div style={styles.info}>
        <h3 style={styles.title}>{movie.title}</h3>

        <p style={styles.rating}>
          ⭐ {movie.vote_average?.toFixed(1)}
        </p>

        <p style={styles.year}>
          {movie.release_date?.substring(0, 4) || "Year unavailable"}
        </p>

        <button
          onClick={() => onFavourite(movie)}
          aria-label={
            isFavourite
              ? `Remove ${movie.title} from favourites`
              : `Add ${movie.title} to favourites`
          }
          style={{
            ...styles.btn,
            background: isFavourite ? "#e74c3c" : "#3498db",
            marginBottom: "8px",
          }}
        >
          {isFavourite ? "❤️ Remove" : "🤍 Favourite"}
        </button>

        <button
          onClick={handleAIInsight}
          disabled={loadingInsight}
          aria-label={`Generate AI insight for ${movie.title}`}
          style={{
            ...styles.btn,
            background: "#8e44ad",
            opacity: loadingInsight ? 0.6 : 1,
            cursor: loadingInsight ? "not-allowed" : "pointer",
          }}
        >
          {loadingInsight
            ? "⏳ Generating..."
            : showInsight
            ? "✕ Hide"
            : "🤖 AI Insight"}
        </button>

        {showInsight && (
          <div
            style={styles.insight}
            role="status"
            aria-live="polite"
          >
            {loadingInsight
              ? "Generating AI insight..."
              : insight}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e1e2e",
    borderRadius: "12px",
    overflow: "hidden",
    width: "200px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },

  poster: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    display: "block",
  },

  noPoster: {
    width: "100%",
    height: "300px",
    background: "#2d2d44",
    color: "#aaa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    textAlign: "center",
    fontSize: "14px",
  },

  noPosterIcon: {
    fontSize: "40px",
  },

  info: {
    padding: "10px",
  },

  title: {
    color: "#fff",
    fontSize: "18px",
    marginBottom: "8px",
  },

  rating: {
    color: "#FFD700",
    margin: "4px 0",
  },

  year: {
    color: "#bbb",
    marginBottom: "10px",
  },

  btn: {
    width: "100%",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    marginBottom: "8px",
    fontWeight: "bold",
  },

  insight: {
    marginTop: "10px",
    background: "#2d2d44",
    padding: "10px",
    borderRadius: "8px",
    color: "#ddd",
    fontSize: "13px",
    lineHeight: "1.5",
    textAlign: "left",
  },
};

export default MovieCard;