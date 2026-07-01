const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')
const path = require('path')

async function seed() {
  try {
    console.log('🌱 Seeding database...\n')

    // Clear existing data (in order due to foreign key constraints)
    await prisma.card.deleteMany()
    await prisma.board.deleteMany()

    // Load boards from JSON file
    const boardsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/boards.json'), 'utf8')
    )

    // Seed boards and store them for reference
    const createdBoards = []
    for (const board of boardsData.boards) {
      const created = await prisma.board.create({
        data: {
          title: board.title,
          category: board.category,
          author: board.author,
          imageUrl: board.image_url
        }
      })
      createdBoards.push(created)
      console.log(`✅ Created board: ${board.title}`)
    }

    // Load cards from JSON file
    const cardsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/cards.json'), 'utf8')
    )

    // Seed cards
    let createdCardsCount = 0
    for (const cardData of cardsData.cards) {
      // Find board by matching JSON board_id to created boards index
      const board = createdBoards[cardData.board_id - 1]

      if (board) {
        await prisma.card.create({
          data: {
            message: cardData.message,
            gifUrl: cardData.gif_url,
            author: cardData.author,
            upvotes: cardData.upvotes,
            boardId: board.id
          }
        })
        createdCardsCount++
        console.log(`✅ Created card by ${cardData.author} on board: ${board.title}`)
      }
    }

    console.log(`\n🎉 Seeding complete! Added ${createdBoards.length} boards and ${createdCardsCount} cards.`)
  } catch (err) {
    console.error('❌ Error seeding:', err)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
