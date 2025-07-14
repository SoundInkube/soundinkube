import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.review.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.marketplaceListing.deleteMany({});
  await prisma.musicianProfile.deleteMany({});
  await prisma.venueProfile.deleteMany({});
  await prisma.jamPad.deleteMany({});
  await prisma.musicSchool.deleteMany({});
  await prisma.user.deleteMany({});

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@soundinkube.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create professional users
  const professionalPassword = await bcrypt.hash('password123', 10);

  // Create musician profiles
  const musician1 = await prisma.user.create({
    data: {
      email: 'guitarist@example.com',
      password: professionalPassword,
      name: 'Alex Johnson',
      role: 'PROFESSIONAL',
      musicianProfile: {
        create: {
          bio: 'Professional guitarist with 10+ years of experience in rock and jazz music.',
          instrument: 'Guitar',
          genre: 'Rock, Jazz',
          experience: '10+ years',
          hourlyRate: 50,
          availability: 'Weekdays evenings, weekends',
        },
      },
    },
  });

  const musician2 = await prisma.user.create({
    data: {
      email: 'drummer@example.com',
      password: professionalPassword,
      name: 'Sam Smith',
      role: 'PROFESSIONAL',
      musicianProfile: {
        create: {
          bio: 'Session drummer specializing in rock, pop, and electronic music.',
          instrument: 'Drums',
          genre: 'Rock, Pop, Electronic',
          experience: '8 years',
          hourlyRate: 45,
          availability: 'Weekends, Monday and Wednesday evenings',
        },
      },
    },
  });

  // Create venue profiles
  const venue1 = await prisma.user.create({
    data: {
      email: 'studio@example.com',
      password: professionalPassword,
      name: 'Soundwave Studios',
      role: 'PROFESSIONAL',
      venueProfile: {
        create: {
          description: 'Professional recording studio with state-of-the-art equipment.',
          location: '123 Music Ave, Nashville, TN',
          amenities: 'Recording equipment, sound isolation, mixing services',
          hourlyRate: 100,
          capacity: 10,
          availability: 'Daily 9AM-10PM',
        },
      },
    },
  });

  // Create regular client users
  const clientPassword = await bcrypt.hash('client123', 10);
  const client1 = await prisma.user.create({
    data: {
      email: 'client1@example.com',
      password: clientPassword,
      name: 'Taylor Wilson',
      role: 'CLIENT',
    },
  });

  const client2 = await prisma.user.create({
    data: {
      email: 'client2@example.com',
      password: clientPassword,
      name: 'Jordan Rivera',
      role: 'CLIENT',
    },
  });

  // Create jam pads
  const jamPad1 = await prisma.jamPad.create({
    data: {
      name: 'Downtown Jam Space',
      location: '456 Main St, Nashville, TN',
      description: 'Cozy jam space perfect for small bands and practice sessions.',
      hourlyRate: 35,
      amenities: 'Basic drum kit, PA system, 2 guitar amps',
      capacity: 6,
      availability: 'Weekdays 10AM-10PM, Weekends 12PM-12AM',
      ownerId: venue1.id,
    },
  });

  // Create music schools
  const musicSchool1 = await prisma.musicSchool.create({
    data: {
      name: 'Harmony Music Academy',
      location: '789 Education Lane, Nashville, TN',
      description: 'Comprehensive music education for all ages and skill levels.',
      coursesOffered: 'Piano, Guitar, Voice, Music Theory',
      instructors: 'John Davis, Maria Garcia, Tom Wilson',
      pricing: 'Starting at $40/hour for private lessons',
      contact: 'info@harmonyacademy.com',
      ownerId: venue1.id,
    },
  });

  // Create marketplace listings
  const listing1 = await prisma.marketplaceListing.create({
    data: {
      title: 'Vintage Guitar For Sale',
      description: 'Beautiful vintage Fender Stratocaster in excellent condition.',
      price: 1200,
      category: 'INSTRUMENT',
      condition: 'USED',
      images: 'vintage_guitar_1.jpg,vintage_guitar_2.jpg',
      sellerId: musician1.id,
    },
  });

  const listing2 = await prisma.marketplaceListing.create({
    data: {
      title: 'Professional Mixing Services',
      description: 'Get your tracks professionally mixed by an experienced audio engineer.',
      price: 200,
      category: 'SERVICE',
      images: 'mixing_service.jpg',
      sellerId: venue1.id,
    },
  });

  // Create bookings
  const booking1 = await prisma.booking.create({
    data: {
      serviceType: 'MUSICIAN',
      startTime: new Date('2025-07-20T18:00:00Z'),
      endTime: new Date('2025-07-20T21:00:00Z'),
      status: 'PENDING',
      price: 150,
      notes: 'Wedding ceremony and reception.',
      clientId: client1.id,
      providerId: musician1.id,
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      serviceType: 'VENUE',
      startTime: new Date('2025-07-25T14:00:00Z'),
      endTime: new Date('2025-07-25T17:00:00Z'),
      status: 'CONFIRMED',
      price: 300,
      notes: 'Recording session for three songs.',
      clientId: client2.id,
      providerId: venue1.id,
    },
  });

  // Create messages
  const message1 = await prisma.message.create({
    data: {
      content: "Hi, I'm interested in booking your studio next month.",
      senderId: client1.id,
      receiverId: venue1.id,
    },
  });

  const message2 = await prisma.message.create({
    data: {
      content: 'Sure, I have availability. What dates were you thinking?',
      senderId: venue1.id,
      receiverId: client1.id,
    },
  });

  // Create reviews
  const review1 = await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Alex is an amazing guitarist! Highly recommend.',
      reviewerId: client1.id,
      subjectId: musician1.id,
    },
  });

  const review2 = await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Great studio with professional equipment.',
      reviewerId: client2.id,
      subjectId: venue1.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
