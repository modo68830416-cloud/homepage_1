import { requireSection } from "@/lib/admin/require-section";
import { products } from "@/lib/products/data";

/**
 * File library stub (TASK-008 §6 산출물). Lists asset references already
 * used by the product catalog; a real implementation adds upload, storage
 * (e.g. Vercel Blob), and reuse-search across content/products.
 */
export default async function AdminFilesPage() {
  const access = await requireSection("files");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  const files = Array.from(new Set(products.flatMap((product) => product.images)));

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">파일 라이브러리</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        상품/콘텐츠에서 참조 중인 이미지 자산 목록입니다. 업로드 기능은 이번 범위에 포함되지 않습니다.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {files.map((file) => (
          <div key={file} className="border border-[var(--border-default)] rounded p-3 text-xs break-all">
            {file}
          </div>
        ))}
      </div>
    </div>
  );
}
