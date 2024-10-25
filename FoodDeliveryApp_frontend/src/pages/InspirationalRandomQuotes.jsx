// export const fetchRandomQuote = async () => {
//   const apiUrl = process.env.REACT_APP_QOTD_API_URL; // Inside the function for better modularity
  
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) throw new Error("Failed to fetch quote");

//     const data = await response.json();
//     return {
     
//       text: data.text,
//       author: data.author,
      
//     };
   
//   } catch (error) {
//     console.error("Error fetching the quote:", error);
//     return {
//       text: "Oops! Could not load a quote. Please try again later.",
//       author: "",
//     };
//   }
// };


export const fetchRandomQuote = async () => {
  const apiUrl = process.env.REACT_APP_QOTD_API_URL; 
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();
    
    return { 
      text: data.quote.body, 
      author: data.quote.author, 
    };
   
  } catch (error) {
    console.error("Error fetching the quote:", error);
    return {
      text: "Oops! Could not load a quote. Please try again later.",
      author: "",
    };
  }
};