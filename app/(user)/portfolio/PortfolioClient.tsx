"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  url?: string;
  order: number;
  categoryName?: string;
}

interface PortfolioCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  portfolios: Portfolio[];
}

interface PortfolioClientProps {
  data: {
    hero: any;
    categories: PortfolioCategory[];
    cta: any;
  };
}

export default function PortfolioClient({ data }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique categories and flatten portfolios
  const allPortfolios = data.categories.flatMap(cat =>
    cat.portfolios.map(p => ({ ...p, categoryName: cat.name }))
  ).sort((a, b) => a.order - b.order);

  const displayedCategories = selectedCategory
    ? data.categories.filter(cat => cat.id === selectedCategory)
    : data.categories;

  const filteredPortfolios = selectedCategory
    ? (data.categories
      .find(cat => cat.id === selectedCategory)
      ?.portfolios || []).sort((a, b) => a.order - b.order)
    : allPortfolios;

  const handleCardClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-5 md:py-10 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {data.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {data.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="container px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              All Projects
            </button>
            {data.categories.sort((a, b) => a.order - b.order).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 ">
        <div className="container px-4">
          {filteredPortfolios.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No portfolios found in this category
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPortfolios.map((portfolio, index) => (
                <div key={portfolio.id} className="flex flex-col">
                  {/* Serial Number */}
                  {/* <div className="text-sm font-semibold text-muted-foreground mb-2">
                    #{index + 1}
                  </div> */}

                  <Card
                    onClick={() => handleCardClick(portfolio.url)}
                    className={`overflow-hidden hover:shadow-lg transition-all flex-1 ${portfolio.url ? "cursor-pointer hover:scale-105" : ""
                      }`}
                  >
                    <div className="relative h-48 w-full bg-muted">
                      <Image
                        src={portfolio.image}
                        alt={portfolio.title}
                        fill
                        className="object-cover"
                      />
                      {portfolio.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {portfolio.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {portfolio.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{portfolio.categoryName}</Badge>
                        <div className="flex gap-1">
                          {portfolio.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 md:py-10 bg-primary/5">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.cta.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {data.cta.description}
          </p>
          {data.cta.button && (
            <a
              href={data.cta.button.href}
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {data.cta.button.text}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
