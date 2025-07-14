import { PrismaClient, UserRole, BookingStatus, ListingType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const musicProfessions = [
  'Guitar Instructor', 'Vocal Coach', 'Piano Teacher', 'Music Producer',
  'Drummer', 'Violinist', 'Sound Engineer', 'Lyricist', 'Bass Guitarist',
  'DJ', 'Composer', 'Music Therapist', 'Audio Engineer', 'Saxophonist',
  'Trumpet Player', 'Cellist', 'Flutist', 'Keyboardist', 'Percussionist'
];

const businessTypes = [
  'Music School', 'Recording Studio', 'Rehearsal Space', 'Artist Management',
  'Record Label', 'Music Store', 'Concert Venue', 'Jampad', 'Audio Equipment Rental'
];

const equipmentCategories = [
  'Guitars', 'Keyboards & Pianos', 'Drums & Percussion', 'Audio Equipment',
  'Amplifiers', 'String Instruments', 'Wind Instruments', 'DJ Equipment',
  'Studio Equipment', 'Microphones'
];

const productTitles = {
  'Guitars': ['Gibson Les Paul Studio', 'Fender Stratocaster', 'Martin D-28 Acoustic', 'Taylor 814ce'],
  'Keyboards & Pianos': ['Yamaha P-125 Digital Piano', 'Roland FP-30X', 'Korg Minilogue XD', 'Nord Stage 3'],
  'Drums & Percussion': ['Pearl Export Series', 'DW Collectors Series', 'Roland TD-17KVX', 'Zildjian A Custom Cymbals'],
  'Audio Equipment': ['Shure SM58 Microphone', 'Audio-Technica AT2020', 'Focusrite Scarlett 2i2', 'KRK Rokit 5'],
  'Amplifiers': ['Marshall DSL40CR', 'Fender Hot Rod Deluxe', 'Orange Crush 35RT', 'Vox AC15C1'],
  'String Instruments': ['Yamaha YVN3 Violin', 'Stentor Student II Cello', 'Fender Player Jazz Bass', 'Ibanez SR300E'],
};

async function main() {
  console.log('Starting admin dashboard data seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@soundinkube.com' },
    update: {},
    create: {
      email: 'admin@soundinkube.com',
      passwordHash: hashedPassword,
      role: UserRole.ADMIN,
      isVerified: true,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          bio: 'SoundInkube Platform Administrator',
          specialties: ['Platform Management'],
        },
      },
    },
  });

  console.log('Admin user created:', adminUser.email);

  // Create clients (1500 users)
  const clients = [];
  for (let i = 0; i < 100; i++) { // Reduced for demonstration
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    
    const client = await prisma.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash('password123', 10),
        role: UserRole.CLIENT,
        isVerified: faker.datatype.boolean(),
        createdAt: faker.date.past({ years: 1 }),
        profile: {
          create: {
            firstName,
            lastName,
            bio: faker.lorem.sentence(),
            city: faker.location.city(),
            phone: faker.phone.number(),
          },
        },
      },
    });
    
    clients.push(client);
    if (i % 20 === 0) console.log(`Created ${i + 1} clients...`);
  }

  // Create music professionals (800 users)
  const professionals = [];
  for (let i = 0; i < 50; i++) { // Reduced for demonstration
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const profession = faker.helpers.arrayElement(musicProfessions);
    
    const professional = await prisma.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash('password123', 10),
        role: UserRole.MUSIC_PROFESSIONAL,
        isVerified: faker.datatype.boolean(),
        createdAt: faker.date.past({ years: 1 }),
        profile: {
          create: {
            firstName,
            lastName,
            bio: `Professional ${profession.toLowerCase()} with years of experience`,
            specialties: [profession],
            yearsExperience: faker.number.int({ min: 1, max: 20 }),
            hourlyRate: faker.number.float({ min: 25, max: 150, fractionDigits: 2 }),
            city: faker.location.city(),
            phone: faker.phone.number(),
            isProfessional: true,
          },
        },
      },
    });
    
    professionals.push(professional);
    if (i % 10 === 0) console.log(`Created ${i + 1} professionals...`);
  }

  // Create businesses (151 users)
  const businesses = [];
  for (let i = 0; i < 20; i++) { // Reduced for demonstration
    const businessName = faker.company.name();
    const email = `${businessName.toLowerCase().replace(/\s+/g, '')}@example.com`;
    const businessType = faker.helpers.arrayElement(businessTypes);
    
    const business = await prisma.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash('password123', 10),
        role: UserRole.BUSINESS_JAMPAD,
        isVerified: faker.datatype.boolean(),
        createdAt: faker.date.past({ years: 1 }),
        profile: {
          create: {
            firstName: businessName,
            lastName: 'Business',
            bio: `${businessType} providing quality music services`,
            specialties: [businessType],
            city: faker.location.city(),
            phone: faker.phone.number(),
            website: faker.internet.url(),
          },
        },
      },
    });
    
    businesses.push(business);
    if (i % 5 === 0) console.log(`Created ${i + 1} businesses...`);
  }

  // Create marketplace products (1234 items)
  const products = [];
  for (let i = 0; i < 100; i++) { // Reduced for demonstration
    const category = faker.helpers.arrayElement(equipmentCategories);
    const titles = productTitles[category] || ['Generic Music Equipment'];
    const title = faker.helpers.arrayElement(titles);
    const seller = faker.helpers.arrayElement([...clients, ...professionals, ...businesses]);
    
    const product = await prisma.marketplaceListing.create({
      data: {
        title: `${title} ${faker.commerce.productAdjective()}`,
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
        listingType: faker.helpers.arrayElement(Object.values(ListingType)),
        condition: faker.helpers.arrayElement(['new', 'like_new', 'good', 'fair', 'poor']),
        images: [faker.image.url()],
        sellerId: seller.id,
        isAvailable: faker.datatype.boolean({ probability: 0.9 }),
        createdAt: faker.date.past({ years: 1 }),
      },
    });
    
    products.push(product);
    if (i % 20 === 0) console.log(`Created ${i + 1} products...`);
  }

  // Create bookings (573 bookings)
  for (let i = 0; i < 50; i++) { // Reduced for demonstration
    const client = faker.helpers.arrayElement(clients);
    const professional = faker.helpers.arrayElement(professionals);
    const amount = faker.number.float({ min: 50, max: 500, fractionDigits: 2 });
    
    await prisma.booking.create({
      data: {
        userId: client.id,
        professionalId: professional.id,
        title: faker.helpers.arrayElement(['Guitar Lesson', 'Vocal Coaching', 'Music Production', 'Piano Session']),
        description: faker.lorem.sentence(),
        startTime: faker.date.future(),
        endTime: new Date(faker.date.future().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
        totalPrice: amount,
        status: faker.helpers.arrayElement(Object.values(BookingStatus)),
        createdAt: faker.date.past({ years: 1 }),
      },
    });
    
    if (i % 10 === 0) console.log(`Created ${i + 1} bookings...`);
  }

  console.log('Seeding completed!');
  console.log(`Created:`);
  console.log(`- ${clients.length} clients`);
  console.log(`- ${professionals.length} music professionals`);
  console.log(`- ${businesses.length} businesses`);
  console.log(`- ${products.length} marketplace products`);
  console.log(`- 50 bookings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });