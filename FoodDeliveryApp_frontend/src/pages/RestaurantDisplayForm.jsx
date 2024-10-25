// import { useEffect, useState } from 'react';
// import './RestaurantDisplayForm1.css'
// import { fetchRandomQuote } from '../services/QuoteService';


// const RestaurantDisplayForm = ({ setCurrentForm }) => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedCity, setSelectedCity] = useState('All Cities');
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOption, setSortOption] = useState('');

//   // Fetch restaurants on component mount
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/restaurants'); 
//         if (!response.ok) {
//           throw new Error('Failed to fetch restaurants');
//         }
//         const data = await response.json();
//         setRestaurants(data);
//         setFilteredRestaurants(data); // Initialize with all restaurants
//       } catch (err) {
//         setError(err.message || 'Failed to load restaurants');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   // Handle city filtering
//   const handleCityChange = (e) => {
//     const city = e.target.value;
//     setSelectedCity(city);
//     filterAndSortRestaurants(searchQuery, city, sortOption);
//   };

//   // Handle sorting by rating or popularity
//   const handleSortChange = (e) => {
//     const option = e.target.value;
//     setSortOption(option);
//     filterAndSortRestaurants(searchQuery, selectedCity, option);
//   };

//   // Handle search by name or cuisine
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     filterAndSortRestaurants(query, selectedCity, sortOption);
//   };

//   // Filter and sort restaurants based on search, city, and sort options
//   const filterAndSortRestaurants = (query, city, sortOption) => {
//     let filtered = restaurants;

//     if (city !== 'All Cities') {
//       filtered = filtered.filter((restaurant) => restaurant.city === city);
//     }

//     if (query) {
//       filtered = filtered.filter(
//         (restaurant) =>
//           restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
//           restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     if (sortOption === 'rating') {
//       filtered.sort((a, b) => b.rating - a.rating);
//     } else if (sortOption === 'popularity') {
//       filtered.sort((a, b) => b.popularity - a.popularity);
//     }

//     setFilteredRestaurants(filtered);
//   };

//   const handleLogout = () => {
//     setCurrentForm('login'); // Redirect to login
//   };

//   const handleProfile = () => {
//     // Handle profile navigation or logic
//     alert('Navigating to Profile Page');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//        <h1> Food on the Fly </h1>
//       <div className="menu">
//         <button onClick={() => setCurrentForm('login')}>Back to Home</button>
//         <select value={selectedCity} onChange={handleCityChange}>
//           <option value="All Cities">All Cities</option>
//           <option value="Bangalore">Bangalore</option>
//           <option value="Gurgaon">Gurgaon</option>
//           <option value="Hyderabad">Hyderabad</option>
//           <option value="Delhi">Delhi</option>
//           <option value="Mumbai">Mumbai</option>
//           <option value="Pune">Pune</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search by name or cuisine"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <select value={sortOption} onChange={handleSortChange}>
//           <option value="">Sort By</option>
//           <option value="rating">Rating</option>
//           <option value="popularity">Popularity</option>
//         </select>
//         <button onClick={handleProfile}>Profile</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       {/* Restaurant List */}
//       <h3>Available Restaurants</h3>
//       <div className="restaurant-list">
//         {/* <h1>Available Restaurants</h1> */}
//         {filteredRestaurants.length === 0 ? (
//           <p>No restaurants available.</p>
//         ) : (
//           filteredRestaurants.map((restaurant) => (
//             <div className="restaurant-card" key={restaurant._id}>
//               {/* Placeholder for restaurant image */}
//               <img
//                 src={`https://via.placeholder.com/150?text=${restaurant.name}`}
//                 alt={restaurant.name}
//                 className="restaurant-image"
//               />
//               <h3>{restaurant.name}</h3>
//               <p>Rating: {restaurant.rating || 'Not rated yet'}</p>
//               <p>Address: {restaurant.address}</p>
//               <p>Cuisine: {restaurant.cuisine}</p>
//               <p>Phone: {restaurant.phone}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="footer-content">
//           <h2>Swiggy</h2>
//           <p>© 2024 Swiggy Limited</p>
//           <div className="footer-links">
//             <p><strong>Company:</strong></p>
//             <p>About Us | Swiggy Corporate | Careers | Team</p>
//             <p>Swiggy One | Swiggy Instamart | Swiggy Dineout</p>
//             <p>Help & Support | Partner with us | Ride with us</p>
//           </div>
//           <div className="footer-legal">
//             <p><strong>Legal:</strong></p>
//             <p>Terms & Conditions | Privacy Policy</p>
//             <p>Available in: Bangalore, Gurgaon, Hyderabad, Delhi, Mumbai, Pune</p>
//             <p><strong>Explore with Swiggy:</strong> Swiggy News | Snackables</p>
//             <p><strong>Social Links:</strong> LinkedIn | Facebook</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default RestaurantDisplayForm;
import { useEffect, useState } from 'react';
import './RestaurantDisplayForm1.css';
import { fetchRandomQuote } from './InspirationalRandomQuotes';

const RestaurantDisplayForm = ({ setCurrentForm }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [quote, setQuote] = useState({ text: '', author: '' });  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurants'); 
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
        setFilteredRestaurants(data);  
      } catch (err) {
        setError(err.message || 'Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

   
  useEffect(() => {

    const loadQuote = async () => {
  
      const fetchedQuote = await fetchRandomQuote();
  
      setQuote(fetchedQuote);
  
    };
  
    loadQuote();
  
  }, []);

   
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    filterAndSortRestaurants(searchQuery, city, sortOption);
  };

   
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    filterAndSortRestaurants(searchQuery, selectedCity, option);
  };

   
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterAndSortRestaurants(query, selectedCity, sortOption);
  };

   
  const filterAndSortRestaurants = (query, city, sortOption) => {
    let filtered = restaurants;

    if (city !== 'All Cities') {
      filtered = filtered.filter((restaurant) => restaurant.city === city);
    }

    if (query) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredRestaurants(filtered);
  };

  const handleLogout = () => {
    setCurrentForm('login');  
  };

  const handleProfile = () => {
     
    alert('Navigating to Profile Page');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
       <h1> Food on the Fly </h1>
        

       
      <div className="quote-of-the-day">
        <blockquote>"{quote.text}"</blockquote>
        <blockquote>"Krishna"</blockquote>
        <cite>- {quote.author}</cite>
      </div>

      <div className="menu">
        <button onClick={() => setCurrentForm('login')}>Back to Home</button>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="All Cities">All Cities</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Gurgaon">Gurgaon</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or cuisine"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="popularity">Popularity</option>
        </select>
        <button onClick={handleProfile}>Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

  
      <h3>Available Restaurants</h3>
      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants available.</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant._id}>
           
              <img
                src={`https://via.placeholder.com/150?text=${restaurant.name}`}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <h3>{restaurant.name}</h3>
              <p>Rating: {restaurant.rating || 'Not rated yet'}</p>
              <p>Address: {restaurant.address}</p>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Phone: {restaurant.phone}</p>
            </div>
          ))
        )}
      </div>

      
      <footer className="footer">
        <div className="footer-content">
          <h2>Swiggy</h2>
          <p>© 2024 Swiggy Limited</p>
          <div className="footer-links">
            <p><strong>Company:</strong></p>
            <p>About Us | Swiggy Corporate | Careers | Team</p>
            <p>Swiggy One | Swiggy Instamart | Swiggy Dineout</p>
            <p>Help & Support | Partner with us | Ride with us</p>
          </div>
          <div className="footer-legal">
            <p><strong>Legal:</strong></p>
            <p>Terms & Conditions | Privacy Policy</p>
            <p>Available in: Bangalore, Gurgaon, Hyderabad, Delhi, Mumbai, Pune</p>
            <p><strong>Explore with Swiggy:</strong> Swiggy News | Snackables</p>
            <p><strong>Social Links:</strong> LinkedIn | Facebook</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDisplayForm;
