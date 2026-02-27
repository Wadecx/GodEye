"use client";

import { useState } from "react";
import { SearchResults, BreachResult } from "@/components/SearchResults";
import ColorBends from "@/components/ui/ColorBends";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [results, setResults] = useState<BreachResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearchedQuery(query);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la recherche");
      }

      // Adapter selon la structure de réponse de l'API
      const breachResults =
        data.data?.results || data.results || data.data || [];
      setResults(
        Array.isArray(breachResults) ? breachResults : [breachResults],
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setHasSearched(false);
    setResults([]);
    setError(null);
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={50}
          speed={0.1}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}
          parallax={0.1}
          noise={0.1}
          transparent
          autoRotate={0}
          // color="#060010"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-58 pb-8">
        <h2 className="text-white text-3xl font-bold uppercase text-center px-4 mb-8">
          GodEye, une recherche <br /> des résultats.
        </h2>

        <form onSubmit={handleSearch} className="w-full max-w-2xl px-4">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-2xl blur-xl bg-gradient-to-r from-purple-600/30 via-blue-500/30 to-cyan-400/30 opacity-50" />

            {/* Border gradient */}
            <div
              className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 opacity-40"
              style={{
                backgroundSize: "200% 200%",
                animation: "liquid-border 3s ease infinite",
              }}
            />

            {/* Input container */}
            <div className="relative flex items-center bg-black/80 backdrop-blur-xl rounded-2xl">
              <div className="pl-5 pr-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une personne, un email etc..."
                autoComplete="off"
                className="w-full py-4 pr-5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_transparent_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />

              <button
                type="submit"
                className={`mr-2 px-6 py-2 rounded-xl font-medium text-white transition-all duration-300 ${
                  query.length > 0 && !loading
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400"
                    : "bg-white/10 opacity-50 cursor-not-allowed"
                }`}
                disabled={query.length === 0 || loading}
              >
                {loading ? "..." : "Rechercher"}
              </button>
            </div>
          </div>
        </form>

        {/* Résultats */}
        {hasSearched && (
          <SearchResults
            results={results}
            query={searchedQuery}
            loading={loading}
            error={error}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};
