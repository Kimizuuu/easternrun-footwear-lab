const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'zappos_takumi.html'), 'utf8');

// Search for window.__INITIAL_STATE__
const match = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});\s*<\/script>/s);
if (match) {
  try {
    const state = JSON.parse(match[1]);
    console.log('Keys in state:', Object.keys(state));
    if (state.product) {
      console.log('Keys in state.product:', Object.keys(state.product));
      if (state.product.detail) {
        console.log('Keys in state.product.detail:', Object.keys(state.product.detail));
        console.log('Product Name:', state.product.detail.productName);
        console.log('Brand Name:', state.product.detail.brandName);
        console.log('Default Image URL:', state.product.detail.defaultImageUrl);
        console.log('Styles:', state.product.detail.styles ? state.product.detail.styles.length : 0);
        if (state.product.detail.styles && state.product.detail.styles.length > 0) {
          const style = state.product.detail.styles[0];
          console.log('Style 0 images:', style.images);
        }
      }
    }
  } catch (e) {
    console.log('JSON parse error:', e.message);
  }
} else {
  console.log('__INITIAL_STATE__ not found directly, searching regex for product detail JSON...');
  // Let's find "productName" or "styles" in the HTML string
  const prodMatch = html.match(/"productName":"([^"]+)"/);
  if (prodMatch) console.log('Found productName:', prodMatch[1]);
  
  const styleImgsMatch = html.match(/"images":(\[\{[^\]]+\}\])/);
  if (styleImgsMatch) console.log('Found images JSON:', styleImgsMatch[1].substring(0, 300));
}
