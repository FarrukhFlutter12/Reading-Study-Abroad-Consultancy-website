import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { Breadcrumbs, CTABand } from "@/components/Blocks";
import { PostCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { type Block, postBySlug, posts, sortedPosts } from "@/data/posts";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  if (!p) return {};

  return pageMeta({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = postBySlug(params.slug);
  if (!post) notFound();

  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* --------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-navy-gradient">
        <span
          aria-hidden
          className="absolute inset-0 bg-dot-grid bg-dot-16 opacity-40"
        />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            onDark
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.category, href: "/blog" },
            ]}
          />

          <p className="mt-8 inline-flex rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-light">
            {post.category}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75">
            {post.excerpt}
          </p>
          <p className="mt-6 text-xs text-white/55">
            {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- body */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-14">
          <article className="min-w-0">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-9">
              {post.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}

              <div className="mt-10 rounded-xl bg-cream p-5 text-sm leading-relaxed text-ink/70">
                <p>
                  <strong className="text-navy">A note on specifics:</strong>{" "}
                  entry requirements, financial thresholds and processing times
                  change every intake, so this guide deliberately avoids quoting
                  them. For the current figures that apply to your case,{" "}
                  <Link
                    href="/free-assessment"
                    className="font-semibold text-gold-dark underline-offset-2 hover:underline"
                  >
                    book a free counselling session
                  </Link>
                  .
                </p>
              </div>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                Free counselling
              </p>
              <h2 className="mb-4 text-xl">Ask a counsellor</h2>
              <LeadForm variant="compact" source={`Blog — ${post.title}`} />
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------------ related */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-posts"
          className="bg-white py-14 lg:py-16"
        >
          <div className="container-page">
            <SectionHeading
              id="related-posts"
              align="left"
              eyebrow="Keep reading"
              title="More guides"
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard
                    slug={p.slug}
                    title={p.title}
                    excerpt={p.excerpt}
                    category={p.category}
                    dateLabel={formatDate(p.date)}
                    readingMinutes={p.readingMinutes}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
          }),
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------ renderer */

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 text-2xl first:mt-0 sm:text-[1.65rem]">
          {block.text}
        </h2>
      );

    case "h3":
      return <h3 className="mt-7 text-lg sm:text-xl">{block.text}</h3>;

    case "p":
      return (
        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
          {block.text}
        </p>
      );

    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((it) => (
            <li
              key={it}
              className="flex gap-3 text-[15px] leading-relaxed text-ink/80"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              />
              {it}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((it, i) => (
            <li
              key={it}
              className="flex gap-3 text-[15px] leading-relaxed text-ink/80"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy font-display text-[11px] font-bold text-gold">
                {i + 1}
              </span>
              {it}
            </li>
          ))}
        </ol>
      );

    case "callout":
      return (
        <aside className="mt-7 rounded-xl border-l-4 border-gold bg-gold/10 p-5">
          <p className="flex items-center gap-2 font-display text-sm font-semibold text-navy">
            <Info className="h-4 w-4 text-gold-dark" aria-hidden />
            {block.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {block.text}
          </p>
        </aside>
      );
  }
}
