// Validate that book creation requests are valid
const isBookValid = (book) => {
    const required = [
      "ISBN",
      "title",
      "Author",
      "description",
      "genre",
      "price",
      "quantity",
    ];
    for (const key of required) {
      if (!book[key]) return false;
    }
  
    if (typeof book.price !== "number") return false; // book price should be a number
  
    if (book.price < 0) return false; // book price should not be negative
  
    const isTwoDecimals =
      Number.isFinite(book.price) && Number(book.price.toFixed(2)) === book.price; // book price should have two decimals
    return isTwoDecimals;
  };
  
  // Validate that customer creation requests are valid
  const isValidCustomer = (customer) => {
    const required = [
      "userId",
      "name",
      "phone",
      "address",
      "city",
      "state",
      "zipcode",
    ];
    // check for required fields
    for (const key of required) {
      if (!customer[key]) return false;
    }
  
    if (!/^[A-Z]{2}$/.test(customer.state)) return false; // Regex to test if state is exactly two characters
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Email Regex
    if (!emailRegex.test(customer.userId)) {
      // Check if email is valid
      return false;
    }
  
    return true;
  };
  
  // check if email is valid
  function isEmailValid(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
  
  export { isBookValid, isValidCustomer, isEmailValid };
  