const SearchBox = () => {
  return (
    <div className="px-8 py-16">
      <div className="flex items-start justify-center">
        <div className="relative group flex-1 max-w-lg">
          {/* Glowing background effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-300 animate-tilt"></div>

          {/* Search input */}
          <div className="flex items-center justify-center">
            <input
              className="input rounded-full flex-1 max-w-lg z-10 px-6 py-3 "
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
