"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Tabs, Tab } from "@heroui/tabs";
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { useState } from "react";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function MePage() {
  const [selected, setSelected] = useState("profile");

  const skills = [
    { name: "React", level: 90 },
    { name: "Vue", level: 95 },
    { name: "Next.js", level: 85 },
    { name: "Flutter", level: 80 },
    { name: "Django", level: 85 },
    { name: "Spring-boot", level: 75 },
    { name: "Go-Gin", level: 80 },
    { name: "Kubernetes", level: 95 },
    { name: "AWS", level: 90 },
  ];

  const certifications = [
    {
      name: "AWS Certified DevOps Engineer – Professional",
      org: "Amazon Web Services",
      date: "2024년 11월",
    },
    {
      name: "AWS Certified SysOps Administrator – Associate",
      org: "Amazon Web Services",
      date: "2024년 8월",
    },
    {
      name: "LFCS (Linux Foundation Certified System Administrator)",
      org: "The Linux Foundation",
      date: "2024년 3월",
    },
    {
      name: "CKA (Certified Kubernetes Administrator)",
      org: "The Linux Foundation",
      date: "2024년 1월",
    },
    {
      name: "정보처리기사",
      org: "한국산업인력공단",
      date: "2019년",
    },
  ];

  const experiences = [
    {
      company: "대웅 (Idstrust)",
      position: "Senior Engineer",
      period: "2024년 6월 – 현재 (성과평가: 2025년 1월-5월)",
      description:
        "Frontend, 인프라, 데이터 플랫폼 업무를 담당하며 고객관리 플랫폼을 성공적으로 운영 중입니다. AWS와 Kubernetes 환경에서 안정적인 시스템 구축에 주력하고 있습니다.",
      achievements: [
        "인프라/Gateway: 12대 서버에 모니터링 수집기 설치 및 Grafana 연동 완료",
        "Connect 인증 서버 연동 성공 및 전체 트래픽에 RBAC 적용",
        "Platform 포함 5개 BO 서비스 연동 및 IP 제한 설정 완료",
        "데이터(Airflow 등): 메일, Kafka, Health check 배치 통합을 위한 DAG 개발 및 적용",
        "Glue(Spark)와 Athena(Hive)를 활용해 7일 로그 확인에서 10년 로그 조회로 기능 확장",
        "Scouter의 Java17 이상 미지원 문제로 Scouter-React(OTEL-Kafka-React) POC 수행",
        "고객관리 플랫폼: 신규 CICD 환경(AWS, E2E Test)을 OnPremise Jenkins에 성공적으로 구축",
        "서비스 트래픽 모니터링 후 스케일 다운 실행, 예상 비용 대비 50% 절감",
        "APISIX (Gateway): POC로 Kafka와 Airflow 연동 성공",
        "사내 DB(Maria, PG) Health 모니터링 및 알림 기능 도입으로 장애 식별 시간 1분 이내 가능",
        "Airflow용 Redis Sentinel 3개 서버 구성으로 고가용성 달성, 장애 복구 시간 50% 단축",
        "직거래 영업사원 관리자 어플리케이션 1차 개발 완료, 사용자 만족도 85% 이상 달성",
        "신 어드민 오류 감지 시간을 평균 18시간에서 10분 이내로 단축",
      ],
    },
    {
      company: "애버커스 (Abacus)",
      position: "Senior Researcher",
      period: "2023년 4월 – 2024년 5월",
      description:
        "SI 회사, 주 협력사인 LG, SK와 K8S, EC2, On-Premise 등 개발환경에 맞추어 소프트웨어를 제공했으며 주로 Front End Project Leader 로서 기획 – 설계 – 개발 프로세스에서 Cross Functional Team 들간 커뮤니케이션, 주요 이슈 해결을 도맡았습니다.",
      achievements: [
        "11개 Debian 서버 구성 완료 후 각 담당자 인계, 프로젝트 진행 bottleneck을 최소화",
        "문서화를 통한 운영 매뉴얼 정비로 업무 의존성 감소 및 시스템 안정성 향상",
        "크로스플랫폼 App 내부 테스트 환경 출시, 영업사원 대상 사용성 테스트 결과를 반영해 직거래 활성화 비율 50% 증가",
        "안드로이드(내부 개발자), 웹(AWS ECS-ALB)를 통해 성공적인 인프라 작업 수행",
        "4주차에 걸쳐 체계적이고 연속적인 배포 업무 수행하여 로컬 테스트 환경 개선",
      ],
    },
    {
      company: "InoutBox",
      position: "Researcher",
      period: "2022년 6월 – 2023년 3월 (10개월)",
      description:
        "개발의 모든 분야(인프라 to 프론트)를 담당하여 안정적인 서비스를 구축하는 것을 목적으로 진행했던 개인 사업, 결과적으로 의류 도매 플랫폼 웹/앱, 캠핑 모바일 앱 제작등 다양한 경험을 쌓았습니다.",
      achievements: [
        "셀러 및 어드민 서비스 운영 이슈 80% 신속 해결, 서비스 가동률 99.9% 유지",
        "실시간 모니터링 시스템 도입 완료, 비정상 유저 식별 정확도 30% 향상",
        "주요 기능 90% 구현 완료, 개발 일정 10% 단축",
        "Spring 프레임워크를 활용한 백엔드 개발과 TypeScript를 사용한 프론트엔드 작업 성공적으로 완료",
      ],
    },
    {
      company: "Intellisys",
      position: "Full Stack Engineer",
      period: "2020년 1월 – 2022년 6월 (2년 6개월)",
      description:
        "추천 솔루션 회사로 AI 모델 개발자를 서포트하여 Kubernetes 환경에서의 API서버(python), Web서버(Vue/React), 다양한 workflows(Argo, RabbitMQ/dramatiq) 서비스를 구축/유지보수, 데이터 분석 등 다양한 업무를 담당하였습니다.",
      achievements: [
        "On premise DB와 VM 분리 운영 환경 구축, 시스템 장애 발생률 25% 감소",
        "5개의 배치 작업을 오류 없이 수행하여 POC 성공",
        "주요 이슈 협의 내용을 관련 담당자들과 공유하여, 단축된 Frontend 작업 시간을 타 프로젝트 진행에 활용",
        "AWS 서버리스 지식을 활용해 내결함성과 고가용성을 갖춘 인프라 환경 구축",
      ],
    },
  ];

  const portfolioLinks = [
    { name: "Github", url: "https://github.com/seongpil0948" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/choi-seongpil-9910a0203/",
    },
    {
      name: "CodingGame",
      url: "https://www.codingame.com/profile/f98c28095b66d60aa9adc3f62e04210e6669263",
    },
    { name: "All-ad", url: "http://all-ad.in", disabled: true },
    {
      name: "3D Projects",
      url: "https://www.peachhub.love/ko/project",
      disabled: true,
    },
    {
      name: "Game",
      url: "https://www.peachhub.love/ko/game/world",
      disabled: true,
    },
    {
      name: "Stock service",
      url: "https://stock.peachhub.love/",
      disabled: true,
    },
  ];

  return (
    <div className="w-full max-w-full flex flex-col gap-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center text-center">
        <h1 className={title({ size: "sm" })}>
          Seongpil Choi{" "}
          <span className={title({ color: "yellow", size: "sm" })}>
            (최성필)
          </span>
        </h1>
        {/* <p className={subtitle({ className: "mt-2" })}>
          상상을 코드로 구현하고, 문제를 소통의 기회로 생각합니다.
        </p> */}
      </div>

      {/* 탭 내비게이션 */}
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
        <Tab key="profile" title="프로필">
          <Card>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 왼쪽: 기본 정보 */}
                <div className="md:col-span-1">
                  <h2 className="text-xl font-bold mb-4">연락처 정보</h2>
                  <div className="space-y-2">
                    <p>📱 010-7184-0948</p>
                    <p>📧 seongpil0948@gmail.com</p>
                    <Link isExternal href="https://idstrust.com">
                      🌐 Daewoong {">"} IDS
                    </Link>
                    <p>📍 경기도 광명시 가림일로 101, 도덕파크타운 202-301호</p>
                  </div>

                  <Divider className="my-4" />

                  <h2 className="text-xl font-bold mb-4">학력</h2>
                  <div>
                    <p className="font-semibold">부천대학교</p>
                    <p>학사, 정보통신공학</p>
                    <p>2015년 3월 - 2019년 3월</p>
                  </div>

                  <Divider className="my-4" />

                  <h2 className="text-xl font-bold mb-4">포트폴리오 링크</h2>
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
                  <h2 className="text-xl font-bold mb-4">자기소개</h2>
                  <p className="mb-6">
                    저는 협업과 소통을 무엇보다도 중요하게 생각하는
                    개발자입니다. 팀원들 간의 원활한 소통이 없이는 프로젝트의
                    성과를 이루는 것이 어렵다고 믿습니다. 따라서 저는 항상 열린
                    자세로 다른 부서와 소통하며, 상호간의 의견을 존중하고
                    조율합니다. 특히, 기획자나 디자이너와의 협업에서는 서로의
                    역할과 목표를 명확하게 정의하고, 그에 따른 일정을 철저히
                    준수합니다. 또한, 세심한 성격을 바탕으로 업무를 계획하고
                    실행함으로써 팀원들에게 신뢰를 줍니다. 이를 통해 팀 전체가
                    함께 성장하고 발전할 수 있도록 노력하고 있습니다.
                  </p>

                  <h2 className="text-xl font-bold mb-4">기술 스택</h2>
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

                  <h2 className="text-xl font-bold mb-4">팀워크 스킬</h2>
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

        <Tab key="experience" title="경력">
          <Card className="mt-6">
            <CardBody>
              <h2 className="text-2xl font-bold mb-6">경력 사항</h2>
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
                    <h4 className="font-semibold mb-2">주요 성과:</h4>
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

        <Tab key="certifications" title="자격증">
          <Card className="mt-6">
            <CardBody>
              <h2 className="text-2xl font-bold mb-6">자격증 및 인증</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-bold">
                        취득일: {cert.date}
                      </p>
                      <h4 className="font-bold text-lg">{cert.name}</h4>
                      <small className="text-default-500">{cert.org}</small>
                    </CardHeader>
                    <CardFooter className="text-small justify-end">
                      <Chip color="success" variant="flat">
                        인증됨
                      </Chip>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="projects" title="프로젝트">
          <Card className="mt-6">
            <CardBody>
              <h2 className="text-2xl font-bold mb-6">주요 프로젝트</h2>

              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="인프라/데이터 플랫폼 구축"
                  title="인프라/데이터 플랫폼 구축 (대웅/Idstrust)"
                >
                  <div className="space-y-4 px-2">
                    <p>
                      2024년 6월부터 진행했던 프로젝트로, 인프라 및 데이터
                      플랫폼 구축을 담당했습니다. 주요 기술로는 AWS, Kubernetes,
                      Airflow, APISIX 등을 활용했습니다.
                    </p>
                    <h3 className="font-semibold">주요 성과:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        12대 서버에 모니터링 수집기 설치 및 Grafana 연동 완료
                      </li>
                      <li>
                        Connect 인증 서버 연동 성공 및 전체 트래픽에 RBAC 적용
                      </li>
                      <li>
                        Glue(Spark)와 Athena(Hive)를 활용해 7일 로그 확인에서
                        10년 로그 조회로 기능 확장
                      </li>
                      <li>
                        Airflow용 Redis Sentinel 3개 서버 구성으로 고가용성
                        달성, 장애 복구 시간 50% 단축
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
                    <h3 className="font-semibold">주요 성과:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        신규 CICD 환경(AWS, E2E Test)을 OnPremise Jenkins에
                        성공적으로 구축
                      </li>
                      <li>
                        서비스 트래픽 모니터링 후 스케일 다운 실행, 예상 비용
                        대비 50% 절감
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
                    <h3 className="font-semibold">주요 성과:</h3>
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
                    <h3 className="font-semibold">주요 성과:</h3>
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
                    <h3 className="font-semibold">주요 성과:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        On premise DB와 VM 분리 운영 환경 구축, 시스템 장애
                        발생률 25% 감소
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

        <Tab key="reviews" title="최근 성과">
          <Card className="mt-6">
            <CardBody>
              <h2 className="text-2xl font-bold mb-6">
                2025년 주요 기술 성과 및 기여도
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    🚀 인프라 안정성 및 비용 최적화
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm">
                      <CardBody>
                        <h4 className="font-semibold mb-2">
                          모니터링 시스템 구축
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
                        <h4 className="font-semibold mb-2">비용 최적화</h4>
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
                    🔧 고가용성 아키텍처 구현
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm">
                      <CardBody>
                        <h4 className="font-semibold mb-2">
                          Redis Sentinel HA 구성
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
                          데이터베이스 헬스체크
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
                    📊 데이터 플랫폼 혁신
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm">
                      <CardBody>
                        <h4 className="font-semibold mb-2">
                          로그 분석 시스템 확장
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
                          워크플로우 자동화
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
                    🛠️ 개발 생산성 향상
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm">
                      <CardBody>
                        <h4 className="font-semibold mb-2">
                          CI/CD 파이프라인 구축
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
                          보안 및 접근 제어
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
                    🎯 핵심 프로젝트: 직거래 영업사원 관리 시스템
                  </h4>
                  <p className="text-sm mb-2">
                    trader.dwoong.com - 웹/모바일 통합 플랫폼 개발 완료
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Chip color="primary" size="sm" variant="flat">
                      Flutter 크로스플랫폼
                    </Chip>
                    <Chip color="primary" size="sm" variant="flat">
                      React 웹 어드민
                    </Chip>
                    <Chip color="primary" size="sm" variant="flat">
                      실시간 데이터 동기화
                    </Chip>
                    <Chip color="primary" size="sm" variant="flat">
                      사용자 만족도 85%
                    </Chip>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      <div className="flex justify-center gap-4 mt-8 mb-16">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="https://github.com/seongpil0948"
        >
          <GithubIcon size={20} />
          Github 방문하기
        </Link>
        <Link
          isExternal
          className={buttonStyles({
            color: "secondary",
            radius: "full",
            variant: "shadow",
          })}
          href="http://all-ad.in"
        >
          포트폴리오 사이트 방문하기
        </Link>
      </div>
    </div>
  );
}
