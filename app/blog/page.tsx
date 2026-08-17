import { CTABand, PageHero } from "@/components/Blocks";
import { PostCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { sortedPosts } from "@/data/posts";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = pageMeta({
  title: "Study Abroad Guides & Blog",
  description:
    "Practical guides for Pakistani students — student visa documents, choosing a country for your budget, avoiding visa refusals and picking the right English test.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Study Abroad Guides"
        subtitle="Practical, honest guides written for Pakistani students. No fee tables that go out of date, no promises — just the things that actually decide whether an application succeeds."
        crumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((p) => (
              <RevealItem key={p.slug}>
                <PostCard
                  slug={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  category={p.category}
                  dateLabel={formatDate(p.date)}
                  readingMinutes={p.readingMinutes}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTABand
        title="Have a Question the Guides Do Not Answer?"
        body="Ask a counsellor directly. The first session is free and carries no obligation."
      />

      <JsonLd data={breadcrumbJsonLd([{ label: "Blog", href: "/blog" }])} />
    </>
  );
}
