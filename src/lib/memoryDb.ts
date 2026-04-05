// In-memory data store for the template.
export let itemsDb: any[] = [
  {
    id: '1',
    sellerId: 'system-user',
    createdAt: new Date().toISOString(),
    title: 'Vintage Leather Jacket',
    description: 'A beautiful, lightly used leather jacket.',
    price: 150.00,
    condition: 'Used - Good', 
    images: ['https://via.placeholder.com/600x400?text=Jacket'],
  },
  {
    id: '2',
    sellerId: 'system-user',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    title: 'Sony Alpha Camera',
    description: 'Mirrorless camera body in excellent condition.',
    price: 999.99,
    condition: 'Like New', 
    images: ['https://via.placeholder.com/600x400?text=Camera'],
  }
];
