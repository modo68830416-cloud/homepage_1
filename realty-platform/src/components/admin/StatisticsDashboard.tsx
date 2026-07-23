import { Eye, TrendingUp, Users } from "lucide-react";
import { popularRegions, topSearchedKeywords, topViewedProperties, visitorTrend } from "@/lib/properties/mock-data";
import { getAllInquiries } from "@/db/queries";
import { VisitorTrendChart } from "@/components/admin/VisitorTrendChart";
import { RankedBarList } from "@/components/admin/RankedBarList";

export async function StatisticsDashboard() {
  const inquiries = await getAllInquiries();

  const todayVisitors = visitorTrend[visitorTrend.length - 1].visitors;
  const totalVisitors = visitorTrend.reduce((sum, point) => sum + point.visitors, 0);
  const pageViews = Math.round(todayVisitors * 3.4);
  const conversionRate = ((inquiries.length / totalVisitors) * 100).toFixed(2);

  const regionItems = [...popularRegions]
    .sort((a, b) => b.listingCount - a.listingCount)
    .slice(0, 5)
    .map((region) => ({ label: `${region.city} ${region.name}`, value: region.listingCount }));

  const propertyItems = topViewedProperties.map((item) => ({ label: item.title, value: item.views }));
  const keywordItems = topSearchedKeywords.map((item) => ({ label: item.keyword, value: item.count }));

  return (
    <div>
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        통계
      </h1>
      <p className="mt-1.5 text-[var(--text-secondary)]">방문자, 인기 매물, 전환율을 확인하세요.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--color-primary-600)]">
            <Users size={16} />
          </span>
          <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{todayVisitors.toLocaleString()}</p>
          <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">오늘 방문자</p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--color-primary-600)]">
            <Eye size={16} />
          </span>
          <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{pageViews.toLocaleString()}</p>
          <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">오늘 페이지뷰</p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--color-primary-600)]">
            <TrendingUp size={16} />
          </span>
          <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{conversionRate}%</p>
          <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
            전환율 (방문 대비 문의 접수)
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
        <VisitorTrendChart />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <RankedBarList title="인기 지역 Top 5" items={regionItems} valueSuffix="건" />
        <RankedBarList title="인기 매물 Top 5" items={propertyItems} valueSuffix="회" />
        <RankedBarList title="인기 검색 키워드 Top 5" items={keywordItems} valueSuffix="회" />
      </div>
    </div>
  );
}
