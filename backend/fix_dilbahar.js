const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('./node_modules/mongoose');

const MONGODB_URI = 'mongodb+srv://harshitash2202:harshitash2202@cluster0.fg5j0zm.mongodb.net/portfolio';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB Atlas');

  const db = mongoose.connection.db;
  const project = await db.collection('projects').findOne({ slug: 'dilbahars' });

  if (!project) {
    console.log('Project dilbahars not found');
    process.exit(0);
  }

  const rawImages = project.images || [];
  const cleanImages = [];

  for (let i = 0; i < rawImages.length; i++) {
    const curr = (rawImages[i] || '').trim();
    if (!curr) continue;

    if (curr.startsWith('http://') || curr.startsWith('https://')) {
      cleanImages.push(curr);
    } else if (curr.startsWith('data:image/')) {
      if (curr.includes(',')) {
        cleanImages.push(curr);
      } else if (i + 1 < rawImages.length) {
        cleanImages.push(curr + ',' + rawImages[i + 1].trim());
        i++;
      }
    } else if (curr.length > 50 && !curr.startsWith('data:image/')) {
      cleanImages.push('data:image/jpeg;base64,' + curr);
    }
  }

  const mainCover = cleanImages[0] || project.image;

  await db.collection('projects').updateOne(
    { slug: 'dilbahars' },
    { $set: { image: mainCover, images: cleanImages } }
  );

  console.log('SUCCESS! Restored dilbahars images count:', cleanImages.length);
  cleanImages.forEach((img, idx) => {
    console.log(`Image ${idx + 1}: length=${img.length}, validDataUrl=${img.startsWith('data:image/') || img.startsWith('http')}`);
  });

  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
