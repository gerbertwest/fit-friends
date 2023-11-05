import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.training.upsert({
    where: { trainingId: 1 },
    update: {},
      create:
       {
         title: "Тренировка",
         backgroundImage: "image2.jpg",
         level: "любитель",
         trainingType: "кроссфит",
         trainingTime: "50-80 мин",
         price: 300,
         caloriesCount: 1200,
         description: "описание 1",
         sex: "для мужчин",
         video: "example.avi",
         trainerId: "2",
         special: false,
       },

  });

  await prisma.order.upsert({
    where: { orderId: 1 },
    update: {},
    create: {
      type: 'абонемент',
      training: {
        create:
          {
            title: "Тренировка 2",
            backgroundImage: "image.jpg",
            level: "новичок",
            trainingType: "стрейчинг",
            trainingTime: "50-80 мин",
            price: 400,
            caloriesCount: 1200,
            description: "описание 1",
            sex: "для женщин",
            video: "example.avi",
            trainerId: "2",
            special: true,
            reviews: {
              create: [
                {
                  message: 'отзыв 1',
                  userId: '6537ed54daf7a45404e304bd',
                  raiting: 3
                },
                {
                  message: 'отзыв 2',
                  userId: '6537ed54daf7a45404e304bd',
                  raiting: 2
                },
                {
                  message: 'отзыв 3',
                  userId: '6537ed54daf7a45404e304bd',
                  raiting: 5
                }
              ]
            }
          }
        },
        count: 1,
        paymentMethod: 'visa',
        price: 100,
        orderPrice: 100,
        userId: '6537ed54daf7a45404e304bd'
      }
    })

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
