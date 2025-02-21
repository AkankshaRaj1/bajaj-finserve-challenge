'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(["Alphabets"]);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);

      const parsedData = JSON.parse(input);
      const res = await fetch("/api/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedData.data }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleFilterChange = (value: string) => {
    setFilter((prevFilter) =>
      prevFilter.includes(value)
        ? prevFilter.filter((item) => item !== value)
        : [...prevFilter, value]
    );
  };

  const filteredResponse = {
    numbers: filter.includes("Numbers") ? response?.numbers : [],
    alphabets: filter.includes("Alphabets") ? response?.alphabets : [],
    highest_lowercase_alphabet: filter.includes("Highest lowercase alphabet") ? response?.highest_lowercase_alphabet : [],
  };

  return (
    <div className="bg-white w-full min-h-screen text-black p-20">
      <h1 className="mb-4 text-3xl font-bold">{response?.roll_number || "Submit Your JSON Data"}</h1>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON data'
        rows={4}
        className="mb-10"
      />
      <Button onClick={handleSubmit}>Submit</Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <div className="my-10 flex flex-row flex-wrap gap-8 uppercase font-semibold">
            <label className="w-auto flex flex-row gap-2 items-center justify-center">
              <input
                type="checkbox"
                value="Alphabets"
                checked={filter.includes("Alphabets")}
                onChange={(e: any) => handleFilterChange(e.target.value)}
                className="w-4 h-4"
              />
              Alphabets
            </label>
            <label className="w-auto flex flex-row gap-2 items-center justify-center">
              <input
                type="checkbox"
                value="Numbers"
                checked={filter.includes("Numbers")}
                onChange={(e: any) => handleFilterChange(e.target.value)}
                className="w-4 h-4"
              />
              Numbers
            </label>
            <label className="w-auto flex flex-row gap-2 items-center justify-center">
              <input
                type="checkbox"
                value="Highest lowercase alphabet"
                checked={filter.includes("Highest lowercase alphabet")}
                onChange={(e: any) => handleFilterChange(e.target.value)}
                className="w-4 h-4"
              />
              Highest lowercase alphabet
            </label>
          </div>

          <h3 className="mb-4 text-3xl font-bold">Filtered Response</h3>
          <div className="flex flex-col gap-1 text-lg font-medium">
            <p>Numbers: {JSON.stringify(filteredResponse.numbers)}</p>
            <p>Alphabets: {JSON.stringify(filteredResponse.alphabets)}</p>
            <p>Highest Lowercase Alphabet: {JSON.stringify(filteredResponse.highest_lowercase_alphabet)}</p>
          </div>
        </>
      )}
    </div>
  );
}