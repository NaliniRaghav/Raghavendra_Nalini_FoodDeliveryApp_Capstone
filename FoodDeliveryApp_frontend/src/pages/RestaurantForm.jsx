import { useState, useEffect } from 'react';

const RestaurantForm = ({ restaurantId, onFormSubmit }) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    cuisine: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (restaurantId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/restaurants/${restaurantId}`);
          const data = await response.json();
          
          if (!response.ok) throw new Error('Failed to fetch restaurant details.');

          setRestaurant(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(restaurantId ? `/api/restaurants/${restaurantId}` : '/api/restaurants', {
        method: restaurantId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant),
      });

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();
      onFormSubmit(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{restaurantId ? 'Update Restaurant' : 'Add New Restaurant'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={restaurant.address}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Cuisine:</label>
          <input
            type="text"
            name="cuisine"
            value={restaurant.cuisine}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={restaurant.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : restaurantId ? 'Update' : 'Add Restaurant'}
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;