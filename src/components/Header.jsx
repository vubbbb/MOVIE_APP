const Header = () => {
  return (
    <div>
    <div className="p-4 flex justify-between  fixed top-0 left-0 w-full z-[9999]  bg-black">
        <div className="flex items-center space-x-4">
            <h1 className="text-[40px] text-red-700 uppercase font-bold">PHIM HEO</h1>
            <nav className="flex items-center space-x-4">
                <a href="" className="text-white">Home</a>
                <a href="" className="text-white">About</a>
                <a href="" className="text-white">Contact</a>
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search" className="p-2 rounded-md text-black" />
            <button className="bg-red-700 text-white px-4 py-2 rounded-md">Search</button>
        </div>
        
    </div>
    </div>  );
};

export default Header;