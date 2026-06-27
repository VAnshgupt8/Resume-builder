const SearchBar =
({
 search,
 setSearch
}) => {

 return (

 <input

  type="text"

  value={search}

  onChange={(e)=>
   setSearch(
    e.target.value
   )
  }

  placeholder=
  "Search Resume"

  className="
  border
  rounded-lg
  px-4
  py-3
  w-full"

 />

 );

};

export default SearchBar;