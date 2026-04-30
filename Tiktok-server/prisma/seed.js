const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  console.log("Seeding started...");

  const password = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      username: "testuser1",
      email: "test@gmail.com",
      password
    }
  });

  console.log("User created:", user);

  const video = await prisma.video.create({
    data: {
      caption: "Test Video",
      videoUrl: "https://example.com/video.mp4",
      userId: user.id
    }
  });

  console.log("Video created:", video);
}

main()
  .then(() => {
    console.log("Seeding completed");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });