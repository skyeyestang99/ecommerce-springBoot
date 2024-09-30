export const createProduct = async(token, productData) => {
    const response = await fetch('http://localhost:9000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
    if(!response.ok) throw new Error('Failed to create product')
    const result = await response.text();
    return result
}