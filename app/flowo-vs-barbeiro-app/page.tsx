import { CompetitorComparisonPage } from "@/components/marketing/competitor-comparison-page";
import { getCompetitorComparison } from "@/data/competitor-comparisons";
import { buildMetadata } from "@/lib/seo";

const comparison = getCompetitorComparison("barbeiro-app");

export const metadata = buildMetadata({
  title: comparison.seoTitle,
  description: comparison.seoDescription,
  path: comparison.path,
  type: "article",
  publishedTime: comparison.publishedAt,
  modifiedTime: "2026-07-31",
});

export default function FlowoVsBarbeiroAppPage() {
  return <CompetitorComparisonPage comparison={comparison} />;
}
