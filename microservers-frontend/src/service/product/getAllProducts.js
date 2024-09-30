export const getAllProducts = async(token) => {
    const response = await fetch('http://localhost:9000/api/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    if(!response.ok) throw new Error('Failed to get product')
    const result = await response.json();
    return result
}