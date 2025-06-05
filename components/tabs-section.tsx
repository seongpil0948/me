"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Tabs, Tab } from "@heroui/tabs";
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Link } from "@heroui/link";
import { useState } from "react";

interface TabsSectionProps {
  dict: any;
  skills: Array<{ name: string; level: number }>;
  certifications: Array<{
    name: string;
    org: string;
    date: string;
  }>;
  experiences: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    achievements: string[];
  }>;
  portfolioLinks: Array<{
    name: string;
    url: string;
    disabled?: boolean;
  }>;
}

export default function TabsSection({
  dict,
  skills,
  certifications,
  experiences,
  portfolioLinks,
}: TabsSectionProps) {
  const [selected, setSelected] = useState("profile");

  return (
    <Tabs
      aria-label="Portfolio sections"
      className="w-full"
      classNames={{
        tab: "px-6",
        tabList: "gap-2 md:gap-6",
        cursor: "w-full bg-primary",
      }}
      selectedKey={selected}
      onSelectionChange={(key) => setSelected(key as string)}
    >
      <Tab key="profile" title={dict.tabs.profile}>
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 왼쪽: 기본 정보 */}
              <div className="md:col-span-1">
                <h2 className="text-xl font-bold mb-4">
                  {dict.profile.contactInfo}
                </h2>
                <div className="space-y-2">
                  <p>📱 010-7184-0948</p>
                  <p>📧 seongpil0948@gmail.com</p>
                  <Link isExternal href="https://idstrust.com">
                    🌐 Daewoong {">"} IDS
                  </Link>
                  <p>📍 경기도 광명시 가림일로 101, 도덕파크타운 202-301호</p>
                </div>

                <Divider className="my-4" />

                <h2 className="text-xl font-bold mb-4">
                  {dict.profile.education}
                </h2>
                <div>
                  <p className="font-semibold">
                    {dict.companies.bucheonUniversity}
                  </p>
                  <p>
                    {dict.profile.degree}, {dict.profile.major}
                  </p>
                  <p>
                    2015{dict.dates.year} 3{dict.dates.month} - 2019
                    {dict.dates.year} 3{dict.dates.month}
                  </p>
                </div>

                <Divider className="my-4" />

                <h2 className="text-xl font-bold mb-4">
                  {dict.profile.portfolioLinks}
                </h2>
                <div className="flex flex-col space-y-2">
                  {portfolioLinks.map((link, index) => (
                    <Link
                      key={index}
                      isExternal
                      showAnchorIcon
                      color="primary"
                      href={link.url}
                      isDisabled={link.disabled}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 자기소개 및 기술 스택 */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">
                  {dict.profile.aboutMe}
                </h2>
                <p className="mb-6">
                  저는 협업과 소통을 핵심 가치로 삼는 소프트웨어 개발자입니다.
                  20살부터 다양한 조직과 팀에서 활동하며, 성향이나 배경이 다른
                  사람들과도 조율하고 함께 프로젝트를 완수해온 경험이 제 가장 큰
                  강점입니다. 어떤 팀이든, 어떤 스타일의 동료든 함께 목표를 향해
                  나아가는 힘은 결국 &apos;잘 듣고, 정확히 말하며, 끝까지
                  책임지는 태도&apos;라고 믿고 실천해왔습니다. 첫 직장에서는
                  백엔드 개발자로 입사해 데이터 마이닝과 API 서버 구축 업무를
                  맡았습니다. 기술적 기초와 함께 데이터 흐름과 시스템 설계를
                  실무 중심으로 익힐 수 있었고, 이후 프론트엔드로 전환하여 LG,
                  SK 등 다양한 클라이언트와 협업 프로젝트를 선임 개발자로서
                  이끌며 UI/UX 구현과 팀 내 코드 품질 관리까지 폭넓은 책임을
                  수행했습니다. 오픈소스 분석에 관심이 많아 꾸준히 기술 스택을
                  확장하고 있으며, 특히 관측 가능성(Observability) 분야에서
                  OpenTelemetry를 활용한 모니터링 구성에 흥미를 갖고 실습과
                  적용을 이어가고 있습니다. Airflow와 Argo Workflows를 이용한
                  배치 처리 자동화에도 익숙하며, 네트워크와 AI 관련 기술은
                  꾸준한 학습과 실험을 통해 실무 활용 가능성을 넓히고 있습니다.
                  인프라 측면에서도 Kubernetes 기반의 마이크로서비스 운영,
                  온프레미스 환경에서의 직접적인 시스템 구축, AWS와 GCP 같은
                  클라우드 환경에서의 배포까지 두루 경험했습니다. 개발자이자
                  운영자로서 서비스의 전 과정을 이해하고 대응할 수 있는 역량을
                  갖추고자 노력하고 있습니다. 기술은 빠르게 변하지만, 팀워크와
                  실행력은 꾸준함에서 나옵니다. 저는 기술적 깊이와 팀 내 협업력,
                  두 축을 함께 성장시키며 함께 일하기 좋은 개발자, 그리고 함께
                  성과를 내는 개발자가 되기 위해 오늘도 한 걸음씩 나아가고
                  있습니다.
                </p>

                <h2 className="text-xl font-bold mb-4">
                  {dict.profile.skills}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress
                        className="mb-2"
                        color={
                          skill.level > 90
                            ? "success"
                            : skill.level > 80
                              ? "primary"
                              : "default"
                        }
                        size="md"
                        value={skill.level}
                      />
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-bold mb-4">
                  {dict.profile.teamworkSkills}
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Chip color="primary" variant="flat">
                    Jira / Confluence
                  </Chip>
                  <Chip color="primary" variant="flat">
                    Git with Conflict resolution
                  </Chip>
                  <Chip color="primary" variant="flat">
                    부사관 경험 기반의 리더쉽
                  </Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Tab>

      <Tab key="experience" title={dict.tabs.experience}>
        <Card className="mt-6">
          <CardBody>
            <h2 className="text-2xl font-bold mb-6">
              {dict.experience.careerHistory}
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary pl-4 pb-6"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold">
                      {exp.position} - {exp.company}
                    </h3>
                    <Badge color="primary" variant="flat">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="mb-4">{exp.description}</p>
                  <h4 className="font-semibold mb-2">
                    {dict.experience.keyAchievements}:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Tab>

      <Tab key="certifications" title={dict.tabs.certifications}>
        <Card className="mt-6">
          <CardBody>
            <h2 className="text-2xl font-bold mb-6">
              {dict.certifications.certAndCredentials}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="shadow-sm">
                  <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {dict.certifications.issueDate}: {cert.date}
                    </p>
                    <h4 className="font-bold text-lg">{cert.name}</h4>
                    <small className="text-default-500">{cert.org}</small>
                  </CardHeader>
                  <CardFooter className="text-small justify-end">
                    <Chip color="success" variant="flat">
                      {dict.certifications.certified}
                    </Chip>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </Tab>

      <Tab key="projects" title={dict.tabs.projects}>
        <Card className="mt-6">
          <CardBody>
            <h2 className="text-2xl font-bold mb-6">
              {dict.projects.majorProjects}
            </h2>

            <Accordion>
              <AccordionItem
                key="1"
                aria-label="인프라/데이터 플랫폼 구축"
                title="인프라/데이터 플랫폼 구축 (대웅/Idstrust)"
              >
                <div className="space-y-4 px-2">
                  <p>
                    2024년 6월부터 진행했던 프로젝트로, 인프라 및 데이터 플랫폼
                    구축을 담당했습니다. 주요 기술로는 AWS, Kubernetes, Airflow,
                    APISIX 등을 활용했습니다.
                  </p>
                  <h3 className="font-semibold">
                    {dict.projects.keyAchievements}:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      12대 서버에 모니터링 수집기 설치 및 Grafana 연동 완료
                    </li>
                    <li>
                      Connect 인증 서버 연동 성공 및 전체 트래픽에 RBAC 적용
                    </li>
                    <li>
                      Glue(Spark)와 Athena(Hive)를 활용해 7일 로그 확인에서 10년
                      로그 조회로 기능 확장
                    </li>
                    <li>
                      Airflow용 Redis Sentinel 3개 서버 구성으로 고가용성 달성,
                      장애 복구 시간 50% 단축
                    </li>
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="고객관리 플랫폼 개발"
                title="고객관리 플랫폼 개발 (대웅/Idstrust)"
              >
                <div className="space-y-4 px-2">
                  <p>
                    직거래 영업사원을 위한 관리자 어플리케이션 개발
                    프로젝트입니다. 크로스 플랫폼(웹, 안드로이드) 환경에서
                    구축했으며, CI/CD 파이프라인 구성도 함께 진행했습니다.
                  </p>
                  <h3 className="font-semibold">
                    {dict.projects.keyAchievements}:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      신규 CICD 환경(AWS, E2E Test)을 OnPremise Jenkins에
                      성공적으로 구축
                    </li>
                    <li>
                      서비스 트래픽 모니터링 후 스케일 다운 실행, 예상 비용 대비
                      50% 절감
                    </li>
                    <li>
                      직거래 영업사원 관리자 어플리케이션 개발 완료
                      (trader.dwoong.com), 주요 기능 90% 구현 완료
                    </li>
                    <li>사용자 테스트에서 만족도 85% 이상 달성</li>
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem
                key="3"
                aria-label="크로스플랫폼 앱 개발"
                title="크로스플랫폼 앱 개발 (애버커스)"
              >
                <div className="space-y-4 px-2">
                  <p>
                    Flutter를 활용한 크로스플랫폼 앱 개발 프로젝트로,
                    안드로이드와 iOS 환경 모두 지원하는 앱을 구현했습니다.
                    백엔드는 AWS ECS와 ALB를 활용하여 구축했습니다.
                  </p>
                  <h3 className="font-semibold">
                    {dict.projects.keyAchievements}:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      크로스플랫폼 App 내부 테스트 환경 출시, 영업사원 대상
                      사용성 테스트 진행
                    </li>
                    <li>테스트 결과를 반영해 직거래 활성화 비율 50% 증가</li>
                    <li>
                      안드로이드(내부 개발자), 웹(AWS ECS-ALB)를 통해 성공적인
                      인프라 작업 수행
                    </li>
                    <li>
                      4주차에 걸쳐 체계적이고 연속적인 배포 업무 수행하여 로컬
                      테스트 환경 개선
                    </li>
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem
                key="4"
                aria-label="의류 도매 플랫폼 개발"
                title="의류 도매 플랫폼 개발 (InoutBox)"
              >
                <div className="space-y-4 px-2">
                  <p>
                    개인 사업으로 진행한 의류 도매 플랫폼 웹/앱 개발
                    프로젝트입니다. 인프라부터 프론트까지 전체 개발 스택을
                    담당했습니다.
                  </p>
                  <h3 className="font-semibold">
                    {dict.projects.keyAchievements}:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      셀러 및 어드민 서비스 운영 이슈 80% 신속 해결, 서비스
                      가동률 99.9% 유지
                    </li>
                    <li>
                      실시간 모니터링 시스템 도입으로 비정상 유저 식별 정확도
                      30% 향상
                    </li>
                    <li>
                      Spring 프레임워크를 활용한 백엔드 개발과 TypeScript를
                      사용한 프론트엔드 작업 완료
                    </li>
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem
                key="5"
                aria-label="AI 추천 시스템 인프라 구축"
                title="AI 추천 시스템 인프라 구축 (Intellisys)"
              >
                <div className="space-y-4 px-2">
                  <p>
                    AI 모델 개발자를 서포트하여 추천 시스템의 인프라를 구축한
                    프로젝트입니다. Kubernetes 환경에서 API 서버와 워크플로우
                    서비스를 설계 및 구현했습니다.
                  </p>
                  <h3 className="font-semibold">
                    {dict.projects.keyAchievements}:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      On premise DB와 VM 분리 운영 환경 구축, 시스템 장애 발생률
                      25% 감소
                    </li>
                    <li>5개의 배치 작업을 오류 없이 수행하여 POC 성공</li>
                    <li>
                      AWS 서버리스 지식을 활용해 내결함성과 고가용성을 갖춘
                      인프라 환경 구축
                    </li>
                  </ul>
                </div>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      </Tab>

      <Tab key="reviews" title={dict.tabs.reviews}>
        <Card className="mt-6">
          <CardBody>
            <h2 className="text-2xl font-bold mb-6">
              {dict.reviews.yearlyPerformance}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">
                  🚀 {dict.reviews.sections.infrastructure}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.monitoring}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          12대 서버 통합 모니터링 체계 구축 (Grafana 연동)
                        </li>
                        <li>실시간 장애 감지로 다운타임 95% 감소</li>
                        <li>오류 감지 시간: 18시간 → 10분 이내</li>
                      </ul>
                    </CardBody>
                  </Card>
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.costOptimization}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>서비스 트래픽 분석 기반 리소스 최적화</li>
                        <li>AWS 인프라 비용 50% 절감 달성</li>
                        <li>자동 스케일링 정책 수립 및 적용</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-success">
                  🔧 {dict.reviews.sections.highAvailability}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.redisHA}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>3-node Redis Sentinel 클러스터 구축</li>
                        <li>장애 복구 시간 50% 단축 (20분 → 10분)</li>
                        <li>Airflow 작업 실행 안정성 99.9% 달성</li>
                      </ul>
                    </CardBody>
                  </Card>
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.dbHealthCheck}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>MariaDB, PostgreSQL 실시간 모니터링</li>
                        <li>자동 알림 시스템으로 장애 예방</li>
                        <li>데이터베이스 가용성 99.95% 유지</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-secondary">
                  📊 {dict.reviews.sections.dataPlatform}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.logAnalysis}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>AWS Glue(Spark) + Athena(Hive) 통합</li>
                        <li>로그 조회 기간: 7일 → 10년으로 확장</li>
                        <li>쿼리 성능 300% 향상</li>
                      </ul>
                    </CardBody>
                  </Card>
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.workflowAutomation}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Airflow DAG로 배치 작업 통합</li>
                        <li>메일, Kafka, Health check 자동화</li>
                        <li>수동 작업 80% 감소</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-warning">
                  🛠️ {dict.reviews.sections.productivity}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.cicdPipeline}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>AWS + Jenkins 통합 환경 구축</li>
                        <li>E2E 테스트 자동화로 품질 향상</li>
                        <li>배포 시간 70% 단축</li>
                      </ul>
                    </CardBody>
                  </Card>
                  <Card className="shadow-sm">
                    <CardBody>
                      <h4 className="font-semibold mb-2">
                        {dict.reviews.items.securityAccess}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Connect 인증 서버 전체 트래픽 적용</li>
                        <li>RBAC 기반 세밀한 권한 관리</li>
                        <li>5개 BO 서비스 IP 제한 설정</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <h4 className="font-bold mb-2">
                  🎯 {dict.reviews.coreProject.title}
                </h4>
                <p className="text-sm mb-2">
                  trader.dwoong.com - {dict.reviews.coreProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip color="primary" size="sm" variant="flat">
                    Flutter {dict.achievements.crossPlatform}
                  </Chip>
                  <Chip color="primary" size="sm" variant="flat">
                    React {dict.achievements.webAdmin}
                  </Chip>
                  <Chip color="primary" size="sm" variant="flat">
                    {dict.achievements.realtimeDataSync}
                  </Chip>
                  <Chip color="primary" size="sm" variant="flat">
                    {dict.achievements.userSatisfaction} 85%
                  </Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
