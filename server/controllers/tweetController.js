const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
// content

// id Int @id @default(autoincrement())
//   content String
//   imageUrl String
//   replyRestrictions String
//   createdAt DateTime @default(now())
//   like Int
//   retweets Int
//   saved Int
//   author User @relation(fields:[authorid],references:[id])
//   authorid Int
//   comments Comment[]

const createMessage = async (req, res) => {
  const { content, imageUrl, replyRestrictions, authorId } = req.body;

  console.log(req.body);
  try {
    const message = await prisma.tweet.create({
      data: {
        content: content,
        imageUrl: imageUrl,
        replyRestrictions: replyRestrictions,
        like: 0,
        retweets: 0,
        saved: 0,
        author: { connect: { id: parseInt(authorId) } },
      },
    });
    // io.emit('new-tweet', message);
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { createMessage };
