export const postOrder = async(token, orderData) => {
    const response = await fetch('http://localhost:9000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.text();
      return result;
}