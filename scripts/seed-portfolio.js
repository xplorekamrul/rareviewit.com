import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { Pool } from "pg";

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  errorFormat: "pretty",
});

const portfolioData = [
  {
    id: "01",
    title: "School Management Web App",
    description:
      "A comprehensive full-cycle educational platform featuring virtual classrooms, automated student promotion, and a built-in chatbot, while managing complex roles for students, parents, and teachers with integrated payment systems.",
    technologies:
      "Next.js, Socket.io, Livekit, Prisma, PostgreSQL, TypeScript",
    liveLink: "https://birbd.org/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(1)-C3M8HkLp.jpeg",
  },
  {
    id: "02",
    title: "HR Management System",
    description:
      "An enterprise-grade solution focused on employee lifecycle management, featuring hardware-integrated attendance tracking, shift calculation, and automated report generation for PDF and Excel formats using specialized libraries.",
    technologies: "Next.js, Prisma ORM, MySQL, TypeScript, Next-Auth, Server-action",
    liveLink: "https://hris.museafoods.com/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(2)-C3M8HkLp.jpeg",
  },
  {
    id: "03",
    title: "Obokash.com Travel Agency",
    description:
      "A specialized travel management platform handling complex data for tours, visas, and flights across multiple countries, featuring administrative IP blocking and section-based data feeding for optimized user experiences.",
    technologies: "Next.js, Prisma ORM, MySQL, TypeScript, Next-Auth, Zod",
    liveLink: "https://work.obokash.com/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(3)-C3M8HkLp.jpeg",
  },
  {
    id: "04",
    title: "Dynamic School Website",
    description:
      "A multi-tenant architecture designed to support the creation and management of multiple school websites simultaneously, utilizing domain-dependent data fetching and institute-specific administrative controls from a single project.",
    technologies: "Next.js, Prisma ORM, PostgreSql, TypeScript, Next-Auth, Zod",
    liveLink: "https://www.daulatpurmuhsingirls.edu.bd/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(4)-C3M8HkLp.jpeg",
  },
  {
    id: "05",
    title: "Courier Management System",
    description:
      "A real-time logistics dashboard providing live tracking via Google Maps, route optimization, and automated invoicing with jsPDF, successfully resolving complex state conflicts and notification synchronization for dispatch teams.",
    technologies: "Next.js, TypeScript, Web Socket, Google Maps, Zod, MongoDb",
    liveLink: "https://courier-pro-self.vercel.app/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(5)-C3M8HkLp.jpeg",
  },
  {
    id: "06",
    title: "Matrimonial Site - ighotok.com",
    description:
      "A full-stack matchmaking application featuring customizable search filters, a proposal exchange system between users, and unique matching percentage algorithms backed by a secure Supabase and PostgreSQL database architecture.",
    technologies:
      "Next.js, TypeScript, Shadcn, Prisma, PostgreSQL, Supabase, Zustand",
    liveLink: "https://www.ighotok.com",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(6)-C3M8HkLp.jpeg",
  },
  {
    id: "07",
    title: "RareviewIt.com",
    description:
      "Rareviewit.com delivers full-stack web development, strategic SEO, and UI/UX design, leveraging modern tech to build scalable platforms that enhance brand visibility and drive growth.",
    technologies: "Next.js, Prisma ORM, PostgreSql, TypeScript, Next-Auth, Server-action",
    liveLink: "https://www.rareviewit.com/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(7)-C3M8HkLp.jpeg",
  },
  {
    id: "09",
    title: "BIRL E-commerce Platform",
    description:
      "Creating a scalable e-commerce platform with product catalogs, cart, checkout, and secure payment gateway integration.",
    technologies: "Next.js, Tailwind CSS, ShadCn, MongoDb, Zustand, etc.",
    liveLink: "https://birlecom.vercel.app/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(8)-C3M8HkLp.jpeg",
  },
  {
    id: "10",
    title: "Rich Text Editor",
    description:
      "Building a customizable text editor with formatting, media embedding, and live content preview features.",
    technologies: "Next.js, Tailwind CSS, ShadCn, Tiptap, Zustand, etc.",
    liveLink: "https://editorbyxplorekamrul.vercel.app/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(1)-C3M8HkLp.jpeg",
  },
  {
    id: "11",
    title: "Web Video Player",
    description:
      "Designing an advanced web-based video player with custom controls, playlists, and responsive streaming.",
    technologies: "Next.js, Tailwind CSS, ShadCn, Zod, Zustand, etc.",
    liveLink: "https://video-player-gold.vercel.app/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(2)-C3M8HkLp.jpeg",
  },
  {
    id: "12",
    title: "BAY Institute",
    description:
      "Creating an educational institute website with course listings, contact forms, and animated interactions.",
    technologies:
      "Next.js, Tailwind CSS, ShadCn, Google APIs, Framer Motion, EmailJS, etc.",
    liveLink: "https://birbd.vercel.app/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(3)-C3M8HkLp.jpeg",
  },
  {
    id: "13",
    title: "Mosque Beauty Website",
    description:
      "Developing a static showcase website for a mosque with events, gallery, and donation information.",
    technologies: "HTML5, CSS3, JavaScript, etc.",
    liveLink: "https://xplorekamrul.github.io/mosque-beauty/?#",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(4)-C3M8HkLp.jpeg",
  },
  {
    id: "14",
    title: "Portfolio Project",
    description:
      "Developing a personal portfolio website to showcase skills, projects,cript, Tailwind CSS, ShadCn",
    liveLink: "https://innovate-home-ten--green.vercel.app/",
    image: "https://infomdkamruzzaman.vercel.app/assets/portfolio-showcase%20(8)-C3M8HkLp.jpeg",
  },
];

// Fixed category ID
const CATEGORY_ID = "cmmonrr5b00026sul1g2eki56";

async function main() {
  try {
    console.log("🌱 Starting portfolio seed...");

    // Verify category exists
    const category = await prisma.portfolioCategory.findUnique({
      where: { id: CATEGORY_ID },
    });

    if (!category) {
      console.error(
        `❌ Category with ID ${CATEGORY_ID} not found. Please create it first.`
      );
      process.exit(1);
    }

    console.log(`✅ Category found: ${category.name}`);

    // Delete existing portfolios (optional - comment out if you want to keep them)
    // await prisma.portfolio.deleteMany({});
    // console.log("🗑️  Cleared existing portfolios");

    // Seed portfolios
    let successCount = 0;
    let skipCount = 0;

    for (const project of portfolioData) {
      try {
        // Check if portfolio already exists
        const existing = await prisma.portfolio.findFirst({
          where: { title: project.title },
        });

        if (existing) {
          console.log(`⏭️  Skipping "${project.title}" (already exists)`);
          skipCount++;
          continue;
        }

        const portfolio = await prisma.portfolio.create({
          data: {
            title: project.title,
            description: project.description,
            categoryId: CATEGORY_ID,
            image: project.image,
            url: project.liveLink,
            tags: project.technologies.split(",").map((tag) => tag.trim()),
            featured: false,
            status: "PUBLISHED",
            order: parseInt(project.id),
          },
        });

        console.log(`✅ Created: ${portfolio.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error creating "${project.title}":`, error);
      }
    }

    console.log("\n📊 Seed Summary:");
    console.log(`✅ Created: ${successCount} portfolios`);
    console.log(`⏭️  Skipped: ${skipCount} portfolios`);
    console.log(`📈 Total: ${successCount + skipCount} portfolios processed`);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
