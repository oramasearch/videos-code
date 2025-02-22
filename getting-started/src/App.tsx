import { useEffect, useState } from "react";
import { Results } from "./components/Results";
import { Input } from "./components/ui/input";
import { Game } from "./lib/types";
import { FAKE_GAMES } from "./lib/constants";

import { OramaClient } from "@oramacloud/client";

const client = new OramaClient({
  endpoint: "https://cloud.orama.run/v1/indexes/ps1games-txegfr",
  api_key: "sSmxk74DhVkBNYah9fQA604DDVhoMY7v",
});

export default function App() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<{ document: Game }[]>([]);

  const searchGames = async () => {
    const results = await client.search({
      term: query,
      limit: 10,
      tolerance: 1,
    });
    setGames(results?.hits || []);
  };

  useEffect(() => {
    searchGames();
  }, [query]);

  return (
    <div className="min-w-screen min-h-screen p-0 m-0 bg-background">
      <div className="container mx-auto pt-12 flex flex-col gap-8">
        <Input
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search for a PS1 Game"
        />
        <Results games={games} />
      </div>
    </div>
  );
}
