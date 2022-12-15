import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>([]);

  const supabaseUrl = "https://rxzjlqecssszauuymxfv.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4empscWVjc3NzemF1dXlteGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxMjQ0MDAsImV4cCI6MTk4NTcwMDQwMH0.mTDKw_tArNG39Wso7okeXq0TbUiwmdYtaNc9kwu__zE";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    console.log(search);
    const { data: notes, error } = supabase
      .from("Note")
      .select()
      .textSearch("title", search, {
        type: "websearch",
      })
      .then((response) => {
        console.log(response);
        setResults(response.data);
      });
  }, [search]);

  return (
    <>
      <form className="flex w-full md:ml-0" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {search ? (
        <div className=" border-gray block rounded-md border bg-white shadow-md">
          {results.map((result: any) => (
            <div>{result.title}</div>
          ))}
        </div>
      ) : null}
    </>
  );
}
