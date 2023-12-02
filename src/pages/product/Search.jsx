import { useState } from "react";
import "./search.scss";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
        if (keyword) {
            const cleanedKeyword = keyword.replace(/\s+/g, ''); // Remove spaces
            navigate(`/products/${cleanedKeyword}`);
          } else {
            navigate(`/products`);
          }
          
	};

	const handleInputChange = (e) => {
		const newValue = e.target.value
		setKeyword(newValue);
	};

	return (
		<div className='search-box mr-top' id='search'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={keyword} // Bind the input value to the keyword state
					onChange={handleInputChange} // Add an onChange handler to update the state
				placeholder="Enter a product name"
				/>
				<button type='submit'><i className="fa-solid fa-magnifying-glass"></i> Search </button>
			</form>
		</div>
	);
};

export default Search;
