import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: "cijmx044",
  dataset: "production",
  useCdn: true,
  apiVersion: '2025-01-13',
  token: "sk0RTxKjqIoqMzpQmP3sVT7AS5EzIT2axt3cDPr7Gj36BH7RgkG6QSYUZ8NV2rv3z1aIEu0kKZMGw6WBd5v98o6I6V0TnnOO8QwL6bzKMHB0eQyMkG1lC1ysp9Ph2h6gtg93DjLx1HrWs5A1akY3jcccifzCpDkOqv5a9vP4b7GRDbuejpyO",
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function uploadProduct(product) {
  try {
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: 'products',
        name: product.name,
        description: product.description,
        price: product.price,
        image: {
          _type: 'image',
          asset: {
            _ref: imageId,
          },
        },
        category: product.category,
        discountPercent: product.discountPercent,
        isNew: product.isNew,
        colors: product.colors,
        sizes: product.sizes,
      };

      const createdProduct = await client.create(document);
      console.log(`Product ${product.name} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product ${product.name} skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', error);
  }
}

async function importProducts() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://template6-six.vercel.app/api/products');

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      await uploadProduct(product);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

importProducts();
