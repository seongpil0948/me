import { Link } from "@heroui/link";

import { Dictionary, PortfolioLink } from "@/types/portfolio";

interface AboutContentProps {
  dict: Dictionary;
  portfolioLinks: PortfolioLink[];
}

export default function AboutContent({
  dict,
  portfolioLinks,
}: AboutContentProps) {
  return (
    <div className="pb-2 pt-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Contact Info */}
      <div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#262626" }}>
          {dict.profile.contactInfo}
        </h2>
        <div className="space-y-3" style={{ color: "#525250" }}>
          <p>📱 010-7184-0948</p>
          <p>📧 seongpil0948@gmail.com</p>
          <Link
            isExternal
            href="https://idstrust.com"
            style={{ color: "#DC6B4A" }}
          >
            🌐 {dict.companies.daewoong} → {dict.companies.idstrust}
          </Link>
          <p>📍 경기도 광명시</p>
        </div>

        <h2
          className="text-2xl font-bold mt-12 mb-6"
          style={{ color: "#262626" }}
        >
          {dict.profile.education}
        </h2>
        <div style={{ color: "#525250" }}>
          <p className="font-semibold">{dict.companies.bucheonUniversity}</p>
          <p>{dict.profile.degree}</p>
          <p>{dict.profile.major}</p>
          <p className="text-sm" style={{ color: "#787872" }}>
            2015.3 - 2019.3
          </p>
        </div>

        <h2
          className="text-2xl font-bold mt-12 mb-6"
          style={{ color: "#262626" }}
        >
          {dict.profile.portfolioLinks}
        </h2>
        <div className="space-y-2">
          {portfolioLinks
            .filter((link) => !link.disabled)
            .map((link, idx) => (
              <Link
                key={idx}
                isExternal
                className="block hover:translate-x-1 transition-transform"
                href={link.url}
                style={{ color: "#DC6B4A" }}
              >
                {link.name} →
              </Link>
            ))}
        </div>
      </div>

      {/* About Me */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#262626" }}>
          {dict.profile.aboutMe}
        </h2>
        <div
          className="prose prose-lg"
          style={{ color: "#525250", lineHeight: "1.8" }}
        >
          <p className="mb-6">
            저는 협업과 소통을 핵심 가치로 삼는 소프트웨어 개발자입니다.
          </p>
          <p className="mb-6">
            20살부터 다양한 조직과 팀에서 활동하며, 성향이나 배경이 다른
            사람들과도 조율하고 함께 프로젝트를 완수해온 경험이 제 가장 큰
            강점입니다. 어떤 팀이든, 어떤 스타일의 동료든 함께 목표를 향해
            나아가는 힘은 결국 &apos;잘 듣고, 정확히 말하며, 끝까지 책임지는
            태도&apos;라고 믿고 실천해왔습니다.
          </p>
          <p className="mb-6">
            첫 직장에서는 백엔드 개발자로 입사해 데이터 마이닝과 API 서버 구축
            업무를 맡았습니다. 기술적 기초와 함께 데이터 흐름과 시스템 설계를
            실무 중심으로 익힐 수 있었고, 이후 프론트엔드로 전환하여 LG, SK 등
            다양한 클라이언트와 협업 프로젝트를 선임 개발자로서 이끌며 UI/UX
            구현과 팀 내 코드 품질 관리까지 폭넓은 책임을 수행했습니다.
          </p>
          <p>
            현재는 인프라, 데이터 플랫폼 업무를 담당하며 TheShop 고도화 및 운영
            중입니다. AWS - OnPremise 환경에서 안정적인 시스템 구축에 주력하고
            있습니다. 최근 AI 시대의 도래와 함께 Claude Code와 같은 AI 도구를
            적극적으로 활용하여 여러 프로젝트를 동시에 작업하며 더 완성도 높은
            코드를 작성하는 것을 즐기고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
