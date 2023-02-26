import { useEffect, useState } from "react";
import players from "../src/players.json";
import { Player } from "./types/Player";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function App() {
  useEffect(() => {
    setAllPlayers(players);
    setFilteredPlayers(players);
  }, []);
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  function arraysEqual(a: string[], b: string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  function compareValues(a: string, b: string) {
    const aSplit = a.split(" ");
    const bSplit = b.split(" ");
    const aType = aSplit[1];
    const bType = bSplit[1];
    let aMultiplier;
    let bMultiplier;
    aType === "mil." ? (aMultiplier = 1000000) : (aMultiplier = 1000);
    bType === "mil." ? (bMultiplier = 1000000) : (bMultiplier = 1000);
    const aPrice = parseFloat(aSplit[0]) * aMultiplier;
    const bPrice = parseFloat(bSplit[0]) * bMultiplier;

    if (aPrice === bPrice) return "equal";
    else if (aPrice > bPrice) return "high";
    else return "low";
  }
  const [filter, setFilter] = useState("0 mil. €");
  const [difficulty, setDifficulty] = useState(true);
  const [playerToGuess, setPlayerToGuess] = useState<Player>();
  const [allPlayers, setAllPlayers] = useState<Array<Player>>();
  const [search, setSearch] = useState<Player | null>();
  const [displaySearch, setDisplaySearch] = useState<Player[]>([]);
  const [temp, setTemp] = useState<Player | undefined>(undefined);
  const [filteredPlayers, setFilteredPlayers] = useState<Array<Player>>();
  const [gameOver, setGameOver] = useState(false);
  const handleSearch = (event: any, value: Player | null) => {
    setSearch(value);
    const newSearches: Player[] | undefined = [...displaySearch!];
    newSearches.push(value!);
    setDisplaySearch(newSearches);
    if (value == playerToGuess) setGameOver(true);

    //TODO: MAKE A LIST AND APPEND
  };
  /*   function handleSearch() {
    const newPlayers = allPlayers?.filter((player) => {
      player.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredPlayers(newPlayers);
  } */
  return (
    <div className="App w-full h-full">
      <div className="py-6 bg-gray-500 gap-7 flex flex-col items-center justify-center w-full h-full">
        {difficulty ? (
          <div className="flex gap-96 h-[650px] justify-center items-center">
            <div>
              <div className="gap-5 flex flex-col difficulty">
                <button
                  onClick={() => {
                    setFilter("6.99 mil. €");
                    setDifficulty(false);
                    const newFilter = players!.filter((player) => {
                      return compareValues(player.pd, "6.99 mil. €") === "high";
                    });
                    setFilteredPlayers(newFilter);
                    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
                  }}
                  className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm easy"
                >
                  Easy
                </button>
                <button
                  onClick={() => {
                    setFilter("2.99 mil. €");
                    setDifficulty(false);
                    const newFilter = players!.filter((player) => {
                      return compareValues(player.pd, "2.99 mil. €") === "high";
                    });
                    setFilteredPlayers(newFilter);
                    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
                  }}
                  className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm medium"
                >
                  Medium
                </button>
                <button
                  onClick={() => {
                    setFilter("0.99 mil. €");
                    setDifficulty(false);
                    const newFilter = players!.filter((player) => {
                      return compareValues(player.pd, "0.99 mil. €") === "high";
                    });
                    setFilteredPlayers(newFilter);
                    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
                  }}
                  className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm hard"
                >
                  Hard
                </button>
              </div>
              <h3>Easy: Value = 7+ mil. €</h3>
              <h3>Medium: Value = 3+ mil. €</h3>
              <h3>Hard: Value = 1+ mil. €</h3>
            </div>
            <div className="how-to-play">
              <h1 className="w-[212px] font-bold text-lg text-center">Guide</h1>
              <div className="intro">
                <div className="row-info gap-5 flex mb-4">
                  <p className="text-center w-24">Age guessed</p>
                  <p className="text-center w-24">Age real</p>
                </div>
                <div className="row-box gap-5 flex mb-4">
                  <div className="bg-blue-900 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    25
                  </div>
                  <div className="bg-gray-400 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    20
                  </div>
                </div>
                <div className="row-box gap-5 flex mb-4">
                  <div className="bg-red-900 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    18
                  </div>
                  <div className="bg-gray-400 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    20
                  </div>
                </div>
                <div className="row-info gap-5 flex mb-4">
                  <p className="text-center w-24">Guessed Nation</p>
                  <p className="text-center w-24">Real Nation</p>
                </div>
                <div className="row-box gap-5 flex mb-4">
                  <div className="bg-orange-700 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    <p>Türkiye</p>
                  </div>
                  <div className="bg-gray-400 flex-col font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    <p>Türkiye</p>
                    <p>İsviçre</p>
                  </div>
                </div>
                <div className="row-box gap-5 flex mb-4">
                  <div className="bg-red-900 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    <p>İtalya</p>
                  </div>
                  <div className="bg-gray-400 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                    <p>Türkiye</p>
                  </div>
                </div>
                <div className="positions-div">
                  <p className="w-[242px]">
                    Available positions: Kaleci, Stoper, Sol Bek, Sağ Bek,
                    Önlibero, Merkez Orta Saha, Sol Kanat, Sağ Kanat, On Numara,
                    Forvet Arkası, Santrafor
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/*         <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch();
          }}
          autoComplete="off"
          type="text"
        /> */}
            <Autocomplete
              disabled={gameOver}
              disablePortal
              id="combo-box-demo"
              options={filteredPlayers!}
              disableClearable={true}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Players" />
              )}
              onChange={handleSearch}
              blurOnSelect={true}
              isOptionEqualToValue={(option, value) => true}
              value={temp}
            />
            <div className="categories w-[800px] flex gap-6 justify-around">
              <p className="w-40 text-center">Number</p>
              <p className=" w-40 text-center">Player Name</p>
              <p className=" w-40 text-center">Position</p>
              <p className="w-40  text-center">Age</p>
              <p className="w-40 text-center">Nationality</p>
              <p className="w-40 text-center">Team</p>
              <p className="w-40 text-center">Value</p>
            </div>
            <div className="players w-[800px] flex flex-col gap-6">
              {displaySearch.map((search) => {
                return (
                  <>
                    <div className="player w-full flex gap-6 justify-around items-center">
                      <div
                        className={`${
                          parseInt(search.number) <
                          parseInt(playerToGuess!.number)
                            ? "bg-red-900"
                            : parseInt(search.number) ===
                              parseInt(playerToGuess!.number)
                            ? "bg-green-900"
                            : "bg-blue-900"
                        } font-semibold border w-24 h-20 flex justify-center items-center`}
                      >
                        {search?.number}
                      </div>
                      <div
                        className={`${
                          search.name !== playerToGuess!.name
                            ? "bg-red-900"
                            : "bg-green-900"
                        } font-semibold border w-24 h-20 flex justify-center items-center`}
                      >
                        <p className="max-w-min text-center">{search?.name}</p>
                      </div>
                      <div
                        className={`${
                          search.position !== playerToGuess!.position
                            ? "bg-red-900"
                            : "bg-green-900"
                        } font-semibold border w-24 h-20 flex justify-center items-center text-center`}
                      >
                        {search?.position}
                      </div>
                      <div
                        className={`${
                          parseInt(search.age) < parseInt(playerToGuess!.age)
                            ? "bg-red-900"
                            : parseInt(search.age) ===
                              parseInt(playerToGuess!.age)
                            ? "bg-green-900"
                            : "bg-blue-900"
                        } font-semibold border w-24 h-20 flex justify-center items-center `}
                      >
                        {search?.age}
                      </div>
                      <div
                        className={`${
                          arraysEqual(search.nations, playerToGuess!.nations)
                            ? "bg-green-900"
                            : search.nations.every((val) =>
                                playerToGuess!.nations.includes(val)
                              ) ||
                              playerToGuess!.nations.every((val) =>
                                search!.nations.includes(val)
                              )
                            ? "bg-orange-700"
                            : "bg-red-900"
                        } font-semibold border w-24 h-20 flex flex-col justify-center items-center nations`}
                      >
                        {search?.nations.map((nation) => {
                          return <p>{nation}</p>;
                        })}
                      </div>
                      <div
                        className={`${
                          search.team !== playerToGuess!.team
                            ? "bg-red-900"
                            : "bg-green-900"
                        } font-semibold border w-24 h-20 flex justify-center items-center text-center`}
                      >
                        {search?.team}
                      </div>
                      <div
                        className={`${
                          compareValues(search.pd, playerToGuess!.pd) === "high"
                            ? "bg-blue-800"
                            : compareValues(search.pd, playerToGuess!.pd) ===
                              "equal"
                            ? "bg-green-900"
                            : "bg-red-900"
                        } font-semibold border w-24 h-20 flex justify-center items-center`}
                      >
                        {search?.pd}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
