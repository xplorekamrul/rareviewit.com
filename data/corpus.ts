import { Users, Target, Award, Zap, Clock, Video, Phone, MapPin, Mail, MessageCircle, FileText, Book, } from "lucide-react"

// src/data/corpus.ts
import type { ComponentType, SVGProps } from "react"

export const FALLBACK_IMAGE = "/placeholder.svg"
type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>

export const corpus = {
  //----------------------------------------------about page corpus------------------------------------------------------------
  about: {
    meta: {
      title: "About Us - Digital Innovation Team",
      description:
        "Learn about our mission, values, and the talented team behind our digital transformation services.",
      path: "/about",
      ogImage: FALLBACK_IMAGE,
    },
    hero: {
      badge: "About Us",
      title: "Insights & Resources",
      description:
        "For over 15 years, we've been helping businesses transform their digital presence and achieve remarkable growth through creative solutions and strategic thinking.",
    },
    mission: {
      title: "Our Mission",
      descriptionOne:
        "We believe every business deserves a powerful digital presence that drives real results. Our mission is to democratize access to world-class digital services, making them accessible to companies of all sizes.",
      descriptionTwo:
        "Through innovation, collaboration, and unwavering commitment to excellence, we help our clients navigate the digital landscape and achieve sustainable growth.",
      image: "/placeholder.svg",
      alt: "Team collaboration",
    },
    valuesBlock: {
      title: "Our Values",
      description: "The principles that guide everything we do",
    },
    values: [
      {
        icon: Target as LucideIcon,
        title: "Client-Focused",
        description:
          "Your success is our priority. We tailor every solution to meet your unique business goals.",
      },
      {
        icon: Zap as LucideIcon,
        title: "Innovation",
        description:
          "We stay ahead of trends and leverage cutting-edge technology to deliver exceptional results.",
      },
      {
        icon: Award as LucideIcon,
        title: "Excellence",
        description:
          "Quality is non-negotiable. We maintain the highest standards in everything we create.",
      },
      {
        icon: Users as LucideIcon,
        title: "Collaboration",
        description:
          "We work as an extension of your team, fostering transparent communication and partnership.",
      },
    ] as { icon: LucideIcon; title: string; description: string }[],
    teamBlock: {
      title: "Meet Our Team",
      description: "Talented professionals dedicated to your success",
    },
    team: [
      {
        name: "Alex Thompson",
        role: "Founder & CEO",
        image: "/placeholder.svg",
        bio: "15+ years leading digital transformation",
      },
      {
        name: "Sarah Martinez",
        role: "Creative Director",
        image: "/placeholder.svg",
        bio: "Award-winning designer with global experience",
      },
      {
        name: "David Kim",
        role: "Head of Development",
        image: "/placeholder.svg",
        bio: "Full-stack expert and tech innovator",
      },
      {
        name: "Jessica Brown",
        role: "Marketing Strategist",
        image: "/placeholder.svg",
        bio: "Data-driven marketer with proven ROI",
      },
    ],
    cta: {
      title: "Ready to Work Together?",
      description:
        "Let's discuss how we can help transform your business with our digital expertise.",
      btnText: "Get in Touch",
      btnUrl: "/contact",
    },
  },
  //----------------------------------------------blog page corpus----------------------------------------------------------------
  blog: {
    meta: {
      title: "Blog - Insights & Resources",
      description:
        "Expert advice, industry trends, and practical tips to help you succeed in the digital world.",
      path: "/blog",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "Blog",
      title: "Insights & Resources",
      description:
        "Expert advice, industry trends, and practical tips to help you succeed in the digital world.",
    },

    featured: {
      badge: "Featured",
      title: "The Future of Web Design: Trends to Watch in 2025",
      excerpt:
        "Discover the emerging design trends that will shape the digital landscape in 2025, from AI-powered interfaces to immersive 3D experiences.",
      image: FALLBACK_IMAGE,
      category: "Design",
      date: "Jan 15, 2025",
      readTime: "8 min read",
      author: "Sarah Martinez",
      btnText: "Read Articles",
      btnUrl: "/blog/future-of-web-design",
    },

    // Grid header + load-more button text
    postList: {
      title: "Latest Articles",
      btnText: "Load More Articles",
    },

    posts: [
      {
        title: "10 SEO Strategies That Actually Work in 2025",
        excerpt:
          "Cut through the noise with proven SEO tactics that deliver real results for your business.",
        image: FALLBACK_IMAGE,
        category: "Marketing",
        date: "Jan 12, 2025",
        readTime: "6 min read",
      },
      {
        title: "Building Scalable React Applications",
        excerpt:
          "Best practices for architecting React apps that grow with your business needs.",
        image: FALLBACK_IMAGE,
        category: "Development",
        date: "Jan 10, 2025",
        readTime: "10 min read",
      },
      {
        title: "The ROI of Good UX Design",
        excerpt:
          "How investing in user experience design directly impacts your bottom line.",
        image: FALLBACK_IMAGE,
        category: "Design",
        date: "Jan 8, 2025",
        readTime: "5 min read",
      },
      {
        title: "Mobile-First Development: A Complete Guide",
        excerpt:
          "Why mobile-first approach is essential and how to implement it effectively.",
        image: FALLBACK_IMAGE,
        category: "Development",
        date: "Jan 5, 2025",
        readTime: "7 min read",
      },
      {
        title: "Content Marketing Strategies for SaaS",
        excerpt:
          "Proven content strategies that drive signups and reduce churn for SaaS companies.",
        image: FALLBACK_IMAGE,
        category: "Marketing",
        date: "Jan 3, 2025",
        readTime: "9 min read",
      },
      {
        title: "Accessibility in Modern Web Design",
        excerpt:
          "Making your website accessible to everyone isn't just good practice—it's essential.",
        image: FALLBACK_IMAGE,
        category: "Design",
        date: "Dec 30, 2024",
        readTime: "6 min read",
      },
    ],

    cta: {
      title: "Stay Updated",
      description:
        "Get the latest insights and tips delivered directly to your inbox.",
      btnText: "Load More Articles",
      btnUrl: "/contact",
    },
  },
  //-------------------------------------------booking page corpus---------------------------------------------------------------
  booking: {
    meta: {
      title: "Book a Consultation",
      description: "Pick a time that works for you — no back and forth.",
      path: "/booking",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "Book a Consultation",
      title: "Schedule a Free Consultation",
      description: "Pick a time that works for you — no back and forth.",
      btnText: "Book Now",
      btnUrl: "#calendar",
    },

    meetingTypesSection: {
      title: "Choose Your Meeting Type",
      subtitle: "Select the consultation that best fits your needs",
    },

    meetingTypes: [
      {
        icon: Clock as LucideIcon,
        title: "15-Min Discovery Call",
        duration: "15 minutes",
        description:
          "Quick chat to understand your needs and see if we're a good fit.",
        features: ["No commitment", "Friendly expert", "Quick turnaround"],
      },
      {
        icon: Video as LucideIcon,
        title: "Strategy Session",
        duration: "30 minutes",
        description:
          "Deep dive into your project goals and discuss potential solutions.",
        features: ["Video call", "Detailed discussion", "Action plan"],
      },
      {
        icon: Phone as LucideIcon,
        title: "Project Planning",
        duration: "60 minutes",
        description:
          "Comprehensive planning session for complex projects.",
        features: ["Full consultation", "Technical review", "Custom proposal"],
      },
    ] as {
      icon: LucideIcon
      title: string
      duration: string
      description: string
      features: string[]
    }[],

    calendarSection: {
      title: "Pick Your Time",
      subtitle: "Select a date and time that works best for you",
      embedNoteTitle: "📅",
      embedNoteLine1: "Calendar Integration (Calendly/TidyCal)",
      embedNoteLine2: "Embed your booking calendar here",
    },

    expectationsSection: {
      title: "What to Expect",
    },
    expectations: [
      "Friendly expert (not a sales rep)",
      "Video call or phone",
      "No commitment required",
      "Follow-up summary included",
    ],

    faqSection: {
      title: "Booking FAQ",
    },
    faqs: [
      {
        question: "What if I need to reschedule?",
        answer:
          "You can reschedule anytime up to 24 hours before your meeting through the confirmation email.",
      },
      {
        question: "Do you offer video or phone calls?",
        answer:
          "We offer both! You can choose your preferred method when booking.",
      },
      {
        question: "Will I be charged for this meeting?",
        answer:
          "No, all consultation calls are completely free with no obligation.",
      },
      {
        question: "Can I book from outside my time zone?",
        answer:
          "Yes! Our calendar automatically detects and adjusts to your local time zone.",
      },
    ],

    cta: {
      title: "Let's Make Your Project Happen",
      description:
        "Book your free consultation now and take the first step toward your digital transformation",
      btnText: "Book My Session Now",
      btnUrl: "#calendar",
    },
  },
  //----------------------------------------------careers page corpus-------------------------------------------------------------
  careers: {
    meta: {
      title: "Careers - Join Our Creative Team",
      description:
        "Build your career with a team that values innovation, creativity, and personal growth.",
      path: "/careers",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "Careers",
      title: "Join Our Creative Team",
      description:
        "Build your career with a team that values innovation, creativity, and personal growth. We're always looking for talented individuals to join our mission.",
    },

    whySection: {
      title: "Why Work With Us?",
      subtitle:
        "We offer more than just a job - we offer a career where you can grow and make an impact",
    },

    benefits: [
      { title: "Competitive Salary", description: "Industry-leading compensation packages with performance bonuses" },
      { title: "Health & Wellness", description: "Comprehensive health insurance and wellness programs" },
      { title: "Flexible Work", description: "Remote-friendly with flexible hours and work-life balance" },
      { title: "Professional Growth", description: "Continuous learning opportunities and career development" },
      { title: "Creative Environment", description: "Collaborative culture that values innovation and creativity" },
      { title: "Latest Technology", description: "Work with cutting-edge tools and technologies" }
    ],

    valuesSection: { title: "Our Values" },
    values: [
      { title: "Innovation First", description: "We embrace new ideas and technologies to stay ahead of the curve." },
      { title: "Client Success", description: "Our clients' success is our success. We go above and beyond every time." },
      { title: "Team Collaboration", description: "We believe in the power of teamwork and open communication." },
      { title: "Continuous Learning", description: "We invest in our team's growth and encourage ongoing education." }
    ],

    openingsSection: {
      title: "Open Positions",
      subtitle: "Explore our current job openings and find your perfect role",
    },
    openings: [
      {
        title: "Senior Web Designer",
        slug: "senior-web-designer",
        department: "Design",
        location: "San Francisco, CA / Remote",
        type: "Full-time",
        description:
          "We're looking for a talented web designer to create beautiful, user-friendly websites for our clients."
      },
      {
        title: "Digital Marketing Manager",
        slug: "digital-marketing-manager",
        department: "Marketing",
        location: "San Francisco, CA / Remote",
        type: "Full-time",
        description:
          "Lead digital marketing campaigns and strategies for diverse clients across multiple industries."
      },
      {
        title: "Full-Stack Developer",
        slug: "full-stack-developer",
        department: "Development",
        location: "Remote",
        type: "Full-time",
        description:
          "Build scalable web applications using modern technologies like React, Node.js, and Next.js."
      },
      {
        title: "SEO Specialist",
        slug: "seo-specialist",
        department: "Marketing",
        location: "San Francisco, CA / Remote",
        type: "Full-time",
        description:
          "Drive organic growth for clients through strategic SEO planning and implementation."
      },
      {
        title: "Mobile App Developer",
        slug: "mobile-app-developer",
        department: "Development",
        location: "Remote",
        type: "Full-time",
        description:
          "Create native and cross-platform mobile applications for iOS and Android."
      },
      {
        title: "Content Strategist",
        slug: "content-strategist",
        department: "Marketing",
        location: "San Francisco, CA / Remote",
        type: "Full-time",
        description:
          "Develop content strategies that engage audiences and drive business results."
      }
    ],

    cta: {
      title: "Don't See the Right Role?",
      description:
        "We're always interested in hearing from talented individuals. Send us your resume and let's talk about future opportunities.",
      btnText: "Get in Touch",
      btnUrl: "/contact",
    },
  },
  //----------------------------------------------contact page corpus-------------------------------------------------------------
  contact: {
    meta: {
      title: "Contact Us",
      description:
        "Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing together.",
      path: "/contact",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "Contact Us",
      title: "Let's Start a Conversation",
      description:
        "Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing together.",
    },

    formSection: {
      title: "Send Us a Message",
      fields: {
        firstName: { label: "First Name", placeholder: "John", required: true },
        lastName: { label: "Last Name", placeholder: "Doe", required: true },
        email: { label: "Email", placeholder: "john@example.com", required: true },
        company: { label: "Company (Optional)", placeholder: "Your Company" },
        service: {
          label: "Service Interested In",
          placeholder: "Select a service",
          options: [
            { value: "", label: "Select a service" },
            { value: "web-design", label: "Web Design" },
            { value: "digital-marketing", label: "Digital Marketing" },
            { value: "seo", label: "SEO Services" },
            { value: "app-development", label: "App Development" },
            { value: "other", label: "Other" }
          ],
        },
        message: {
          label: "Message",
          placeholder: "Tell us about your project...",
          rows: 6,
          required: true,
        },
      },
      submit: { label: "Send Message" },
    },

    infoSection: {
      title: "Get in Touch",
      description:
        "We're here to answer your questions and discuss how we can help bring your vision to life. Reach out through any of these channels.",
      items: [
        {
          icon: Mail as LucideIcon,
          title: "Email",
          details: "hello@creative.agency",
          link: "mailto:hello@creative.agency",
        },
        {
          icon: Phone as LucideIcon,
          title: "Phone",
          details: "+1 (555) 123-4567",
          link: "tel:+15551234567",
        },
        {
          icon: MapPin as LucideIcon,
          title: "Office",
          details: "123 Creative Street, San Francisco, CA 94102",
          link: "#",
        },
        {
          icon: Clock as LucideIcon,
          title: "Hours",
          details: "Mon-Fri: 9AM - 6PM PST",
          link: "#",
        }
      ],
      quickNote: {
        title: "Quick Response Guarantee",
        description: "We typically respond to all inquiries within 24 hours during business days.",
      }
    },

    mapSection: {
      // purely presentational placeholder copy
      placeholderTitle: "Map Location",
      placeholderIcon: "MapPin"
    }
  },
  //----------------------------------------------events page corpus-------------------------------------------------------------
  events: {
    meta: {
      title: "Events & Webinars",
      description: "Workshops, webinars, and live events to help your business grow.",
      path: "/events",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "Events & Webinars",
      title: "Workshops, Webinars & Live Events",
      description: "Join our community for expert-led sessions designed to help your business grow.",
      ctaText: "View Upcoming Events",
      ctaHref: "#upcoming",
    },

    upcomingSection: {
      title: "Upcoming Events",
      subtitle: "Register now to secure your spot",
    },

    upcomingEvents: [
      {
        title: "Modern Web Design Trends 2025",
        date: "Feb 15, 2025",
        time: "2:00 PM PST",
        format: "Online",
        platform: "Zoom",
        spotsLeft: 12,
        description:
          "Discover the latest design trends and techniques shaping the web in 2025.",
        speaker: "Sarah Martinez, Creative Director",
      },
      {
        title: "SEO Masterclass: From Zero to Hero",
        date: "Feb 22, 2025",
        time: "1:00 PM PST",
        format: "Online",
        platform: "YouTube Live",
        spotsLeft: 45,
        description:
          "Learn proven SEO strategies to boost your website's visibility and traffic.",
        speaker: "Michael Chen, SEO Specialist",
      },
      {
        title: "Building Scalable React Applications",
        date: "Mar 5, 2025",
        time: "3:00 PM PST",
        format: "In-Person",
        platform: "San Francisco Office",
        spotsLeft: 8,
        description:
          "Hands-on workshop covering React best practices and architecture patterns.",
        speaker: "David Kim, Lead Developer",
      },
    ],

    pastSection: {
      title: "Past Events & Replays",
      subtitle: "Catch up on sessions you missed",
      btnText: "View All Replays",
    },

    pastEvents: [
      {
        title: "Digital Marketing in 2024: What Worked",
        date: "Jan 10, 2025",
        views: "1.2K",
        thumbnail: "/event-marketing.jpg",
        duration: "45 min",
      },
      {
        title: "Introduction to Next.js 15",
        date: "Dec 15, 2024",
        views: "2.5K",
        thumbnail: "/event-nextjs.jpg",
        duration: "60 min",
      },
      {
        title: "E-commerce Best Practices",
        date: "Nov 20, 2024",
        views: "980",
        thumbnail: "/event-ecommerce.jpg",
        duration: "50 min",
      },
      {
        title: "Mobile-First Design Workshop",
        date: "Oct 30, 2024",
        views: "1.8K",
        thumbnail: "/event-mobile.jpg",
        duration: "55 min",
      },
    ],

    newsletter: {
      title: "Don't Miss Our Next Live Session",
      description: "Get notified about upcoming events and exclusive content",
      placeholder: "Enter your email",
      btnText: "Notify Me",
    },
  },
  //----------------------------------------------faq page corpus-------------------------------------------------------------
  faq: {
    meta: {
      title: "FAQ",
      description:
        "Got a question about our services, process, or pricing? We've answered the most frequent ones below.",
      path: "/faq",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "FAQ",
      title: "Answers to Your Most Common Questions",
      description:
        "Got a question about our services, process, or pricing? We've answered the most frequent ones below.",
      ctaText: "Still Need Help? Chat With Us",
      ctaHref: "/contact",
    },

    categories: [
      "General",
      "Web Design",
      "SEO",
      "App Development",
      "eCommerce",
      "Pricing & Payment",
    ],

    faqsByCategory: {
      General: [
        {
          question: "How do I start a project?",
          answer:
            "Simply contact us through our website, schedule a consultation, or give us a call. We'll discuss your needs and provide a custom proposal.",
        },
        {
          question: "What is your typical turnaround time?",
          answer:
            "Project timelines vary based on scope. A basic website takes 2-4 weeks, while complex applications can take 2-3 months. We'll provide a detailed timeline in your proposal.",
        },
        {
          question: "Do you work with clients remotely?",
          answer:
            "Yes! We work with clients worldwide. We use video calls, project management tools, and regular updates to ensure smooth collaboration.",
        },
      ],
      "Web Design": [
        {
          question: "Will my website work on phones?",
          answer:
            "All our websites are fully responsive and optimized for mobile, tablet, and desktop devices.",
        },
        {
          question: "Do you use WordPress, Webflow, or custom code?",
          answer:
            "We work with various platforms based on your needs. We specialize in custom Next.js applications, but also work with WordPress, Webflow, and other CMS platforms.",
        },
        {
          question: "Can I update the website myself after launch?",
          answer:
            "Yes! We provide training and documentation so you can make content updates. We also offer ongoing maintenance packages if you prefer us to handle updates.",
        },
      ],
      SEO: [
        {
          question: "How long until I see SEO results?",
          answer:
            "SEO is a long-term strategy. You may start seeing improvements in 3-6 months, with significant results typically appearing after 6-12 months of consistent optimization.",
        },
        {
          question: "Do you guarantee rankings?",
          answer:
            "We don't guarantee specific rankings as search algorithms constantly change. However, we guarantee our best efforts using proven strategies and transparent reporting.",
        },
        {
          question: "What's included in your SEO service?",
          answer:
            "Our SEO service includes keyword research, on-page optimization, technical SEO, content strategy, link building, and monthly performance reports.",
        },
      ],
      "App Development": [
        {
          question: "Do you build both iOS and Android?",
          answer:
            "Yes! We develop native apps for both platforms, as well as cross-platform solutions using React Native for cost-effective development.",
        },
        {
          question: "Will I own the source code?",
          answer:
            "Yes, upon final payment, you receive full ownership of the source code and all project files.",
        },
        {
          question: "Do you provide app store submission?",
          answer:
            "Yes, we handle the entire app store submission process for both Apple App Store and Google Play Store, including all required assets and descriptions.",
        },
      ],
      eCommerce: [
        {
          question: "Can I manage my store after launch?",
          answer:
            "We provide comprehensive training on managing products, orders, inventory, and customers through your e-commerce platform.",
        },
        {
          question: "Do you help with payment setup and shipping?",
          answer:
            "Yes, we integrate payment gateways (Stripe, PayPal, etc.) and configure shipping options based on your business needs.",
        },
        {
          question: "What e-commerce platforms do you use?",
          answer:
            "We work with Shopify, WooCommerce, custom Next.js solutions, and headless commerce platforms depending on your requirements.",
        },
      ],
      "Pricing & Payment": [
        {
          question: "Do you offer refunds?",
          answer:
            "Refunds are only issued if work hasn't begun. Partial refunds are evaluated case-by-case based on work completed.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept credit cards, bank transfers, PayPal, and for larger projects, we can arrange payment plans.",
        },
        {
          question: "How many design revisions are included?",
          answer:
            "Most packages include 2 major and 2 minor revisions. Additional revisions can be purchased if needed.",
        },
        {
          question: "Do you require a deposit?",
          answer:
            "Yes, we typically require a 50% deposit to begin work, with the balance due upon completion or according to agreed milestones.",
        },
      ],
    } as Record<
      string,
      { question: string; answer: string }[]
    >,

    cta: {
      title: "Didn't Find What You're Looking For?",
      description:
        "Our team is here to help answer any questions you have about our services.",
      primary: { text: "Send Us a Message", href: "/contact" },
      secondary: { text: "Schedule a Call", href: "/booking" },
    },
  },
  //----------------------------------------------help page corpus-------------------------------------------------------------
  help: {
    meta: {
      title: "Help Center",
      description:
        "Find answers to your questions, browse our knowledge base, and get support for all our services.",
      keywords: ["help center", "support", "FAQ", "customer service", "documentation"],
      path: "/help",
      ogImage: FALLBACK_IMAGE,
    },

    hero: {
      badge: "Help Center",
      title: "How Can We Help You?",
      description:
        "Search our knowledge base or browse categories to find answers to your questions",
      searchPlaceholder: "Search for help articles...",
    },

    categoriesSection: {
      title: "Browse by Category",
      subtitle: "Find the information you need organized by topic",
    },

    // CHANGED: icon is now a string key
    categories: [
      { icon: "Book",        title: "Getting Started",    description: "Learn the basics and get up to speed quickly", articles: 12, link: "/help/getting-started" },
      { icon: "FileText",    title: "Services & Pricing", description: "Understand our services, packages, and pricing", articles: 8,  link: "/help/services" },
      { icon: "MessageCircle", title: "Project Management", description: "How we manage projects and communicate with clients", articles: 15, link: "/help/projects" },
      { icon: "Video",       title: "Video Tutorials",    description: "Step-by-step video guides for common tasks", articles: 6,  link: "/help/tutorials" },
    ] as const,

    popularSection: {
      title: "Popular Articles",
      subtitle: "Most viewed help articles this month",
    },

    popularArticles: [
      { title: "How do I get started with a new project?", category: "Getting Started", views: "2.5K" },
      { title: "What's included in your web design packages?", category: "Services", views: "1.8K" },
      { title: "How long does a typical project take?", category: "Project Management", views: "1.6K" },
      { title: "What payment methods do you accept?", category: "Billing", views: "1.4K" },
      { title: "Can I request revisions after project completion?", category: "Project Management", views: "1.2K" },
      { title: "Do you offer ongoing support and maintenance?", category: "Services", views: "1.1K" },
    ] as const,

    contactSection: {
      title: "Still Need Help?",
      subtitle: "Our support team is here to assist you",
      // CHANGED: icon is now a string key
      options: [
        { icon: "MessageCircle", title: "Live Chat",    description: "Chat with our support team", action: "Start Chat", available: "Mon-Fri, 9AM-6PM PST" },
        { icon: "Mail",          title: "Email Support", description: "Get help via email",         action: "Send Email", available: "Response within 24 hours" },
        { icon: "Phone",         title: "Phone Support", description: "Speak with an expert",       action: "Call Us",    available: "+1 (555) 123-4567" },
      ] as const,
    },

    quickLinksSection: {
      title: "Explore More Resources",
      primary:   { text: "View FAQ",   href: "/faq" },
      secondary: { text: "Contact Us", href: "/contact" },
      tertiary:  { text: "Book a Call", href: "/booking" },
    },
  },

} as const


// Convenience named exports 
export const { about, blog, booking, careers, contact, events, faq, help } = corpus








//----------------------------------------------about page corpus-------------------------------------------------------------

//----------------------------------------------about page corpus-------------------------------------------------------------

//----------------------------------------------about page corpus-------------------------------------------------------------

//----------------------------------------------about page corpus-------------------------------------------------------------

//----------------------------------------------about page corpus-------------------------------------------------------------

//----------------------------------------------about page corpus-------------------------------------------------------------

