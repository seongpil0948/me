import type { InterviewQuestion } from "@/types/portfolio";

export const generalQuestions: InterviewQuestion[] = [
  // Self Introduction & Career
  {
    id: 3,
    category1: "General",
    category2: "Self Introduction",
    question: "Please introduce yourself briefly.",
    answer:
      "Hello, I'm Seongpil Choi, a 6-year Platform Lead Engineer specializing in infrastructure and DevOps. I'm currently responsible for the infrastructure of an e-commerce platform with ₩500B annual revenue, and I focus on **proving Developer Experience (DevEx) with data**.\n\nMy biggest achievement is **reducing MTTI from 18 hours to 10 minutes (99% reduction)** by introducing OpenTelemetry. I also built a data platform that links 20TB of monthly observability data with business metrics, visualizing key indicators like retention and conversion rates.\n\nI hold certifications in Kubernetes (CKA), AWS (DevOps Pro), and Linux (LFCS), and operate Kafka clusters processing 20-50 million messages daily and over 200 Airflow DAGs.",
  },
  {
    id: 4,
    category1: "General",
    category2: "Career Change",
    question: "Why did you decide to change jobs?",
    answer:
      "While I've achieved significant results at my current company, I want to expand my capabilities in larger-scale systems and global environments. Particularly, I'm interested in contributing to [company's specific technology/project] and experiencing higher-level technical challenges.",
  },
  {
    id: 5,
    category1: "General",
    category2: "Company Interest",
    question: "Why did you apply to our company?",
    answer:
      "1. **Technical Challenge**: Interest in [company's specific tech stack/project]\n2. **Scale**: Opportunity to work in [large-scale traffic/user count] environments\n3. **Vision**: Alignment with [company's mission/vision]\n4. **Growth**: Personal growth opportunities through [company's culture/programs]",
  },
  {
    id: 6,
    category1: "General",
    category2: "Salary",
    question: "What is your current salary?",
    answer:
      "My current salary is **confidential according to company policy**. However, I'm willing to negotiate at a reasonable level considering my experience, capabilities, and market standards.",
  },
  {
    id: 7,
    category1: "General",
    category2: "Salary",
    question: "What matters to you besides salary?",
    answer:
      "1. **Technical Challenge**: Large-scale systems, latest tech stack experience\n2. **Growth Environment**: Learning support, conference attendance, certification support\n3. **Team Culture**: Transparency, data-driven decisions, technical discussions\n4. **Work-Life Balance**: Flexible work, remote work availability\n5. **Impact**: Environment where my contributions can make real business impact",
  },
  {
    id: 8,
    category1: "General",
    category2: "Start Date",
    question: "When can you start?",
    answer:
      "I prioritize **smooth handover with my current company**.\n- **Minimum Period**: About **1 month** after offer\n- **Negotiable**: Can adjust based on project situation\n- **Goal**: Start after completing stable handover and documentation of current systems",
  },

  // Problem Solving
  {
    id: 24,
    category1: "General",
    category2: "Problem Solving",
    question:
      "What was your most difficult technical problem and how did you solve it?",
    answer:
      "**(STAR Method)**\n\n**(Situation)** When joining idstrust, faced dual challenges:\n1. Legacy system (Oracle/Tomcat) modernization to Next.js/Spring\n2. Observability impossible for 100+ containers, failure detection took **18 hours**\n\n**(Task)** \n1. Design core architecture for new system and manage data migration\n2. Achieve complete observability and reduce failure detection time\n\n**(Action)**\n1. **Legacy Migration Lead**: Designed core modules, scaffold, and application architecture for Next.js/Spring\n2. **Airflow 5-server Cluster**: Built data migration pipeline handling statistical data, Data Lake, and near-realtime CDC\n3. **OpenTelemetry adoption**: Developed custom Exporter in Go, built Collectors on 12 servers\n4. **Data-driven persuasion**: Quantified costs and ROI to convince leadership\n\n**(Result)**\n- Successfully led legacy migration architecture design\n- Airflow cluster automated 200+ DAGs including data migration, CDC, and batch jobs\n- MTTI **reduced 99.5%** (18 hours → 10 minutes)\n- Data Lake enabling 10-year data retention (142x expansion)\n- OpenTelemetry open-source contributions",
  },
  {
    id: 25,
    category1: "General",
    category2: "Data-Driven",
    question: "Do you have experience with data-driven decision making?",
    answer:
      "Yes, I use data in all major decisions.\n\n**Case 1: Infrastructure Cost Optimization**\n- Analyzed S3 usage patterns with CloudWatch + EMF\n- Established data-driven Lifecycle policies\n- Result: 50% monthly cost reduction ($5K → $2.5K)\n\n**Case 2: OpenTelemetry Adoption**\n- Quantified 18-hour MTTI in actual engineering costs\n- Proved ROI with data\n- Result: Successfully convinced leadership\n\n**Case 3: Data Lake Construction**\n- Surveyed planning team's business metrics requirements\n- Measured and optimized Athena query performance with partitioning\n- Result: Visualized key metrics like retention and conversion rates",
  },
  {
    id: 26,
    category1: "General",
    category2: "Failure",
    question: "What was a failure experience and what did you learn?",
    answer:
      "During Inoutbox startup, initially **obsessed with technical perfection**, delaying launch.\n\n**Lessons Learned:**\n1. **MVP First**: Fast validation over perfect product\n2. **Business Value Focus**: Technology is a means, not the goal\n3. **Priority Management**: Maximum effect with limited resources\n\nAfter this experience, changed approach to **Fast POC → Validation → Incremental Improvement**, achieving better results in subsequent projects.",
  },

  // Collaboration & Communication
  {
    id: 27,
    category1: "General",
    category2: "Cross Functional",
    question: "What is your cross-functional team collaboration experience?",
    answer:
      '**Abacus - Frontend Project Leader:**\n- **Client (LG)**: Technical requirements coordination and weekly reports\n- **Internal Backend Team**: API spec negotiation and integration testing\n- **Frontend Team**: Technical guidance and code reviews\n- **Result**: Recognized as LG\'s sole technical partner, 300% revenue increase\n\n**idstrust - Data Platform Construction:**\n- **Planning Team**: Business metrics requirements interviews\n- **Marketing Team**: Acquisition, Conversion, Retention analysis environment\n- **Infrastructure Team**: S3, Glue, Athena architecture discussions\n- **Result**: Planning/Marketing teams can directly query and analyze data\n\n**Collaboration Philosophy:** "Transparency, ownership, shared success" - Clear goal setting and continuous communication',
  },
  {
    id: 28,
    category1: "General",
    category2: "Remote Work",
    question:
      "What is your remote work and asynchronous communication experience?",
    answer:
      "**Asynchronous Communication Tools:**\n- **Jira**: All work ticketed with detailed context\n- **Confluence**: Architecture design, decision documentation\n- **Slack**: Real-time collaboration, thread-based discussions\n- **GitHub**: Code reviews and technical discussions via PRs\n\n**Document-Centric Collaboration:**\n- Share **design docs + anticipated Q&A** before verbal explanations\n- Allow time for colleagues in different time zones to review and comment\n- Can read English technical documents without translation tools",
  },
  {
    id: 29,
    category1: "General",
    category2: "Conflict Resolution",
    question: "How do you resolve conflicts within a team?",
    answer:
      '**Case: OpenTelemetry Adoption Opposition**\n\n**(Situation)** Some opposed: "Installing agents on running services is risky", "Urgent business features need development"\n\n**(Action)**\n1. **Data-driven persuasion**: Converted last month\'s incident response time to cost\n2. **Risk minimization plan**: Detailed canary deployment and rollback plan\n3. **Quick Win presentation**: Validate effectiveness by applying to specific service within 1 week\n\n**(Result)** Convinced leadership, completed OTel adoption, 5-minute MTTI reduction secured team resources\n\n**Lesson:** Focus on **data and logic** rather than emotions, and **understand and address others\' concerns**',
  },

  // Leadership
  {
    id: 30,
    category1: "General",
    category2: "Leadership",
    question: "What is your leadership experience and style?",
    answer:
      "**Leadership Philosophy:**\n- **Pioneer Role**: Complete POC quickly alone or with small team, then invite team members\n- **End-to-End Interest**: Take interest in all roles to be helpful\n- **Root Problem Solving**: Prioritize solving core issues over patches\n- **Data-Driven Coordination**: Persuade and coordinate with stakeholders using data\n\n**Specific Cases:**\n- **Abacus**: Coordinated LG client-internal team-development team as Frontend Project Leader\n- **idstrust**: Led DX improvement by building developer sandbox environment\n- **Inoutbox**: End-to-End ownership experience as solo founder\n\n**Mentoring Philosophy:**\n- Confirm working with official docs, thorough research, and references\n- Emphasize fundamentals most important in AI era",
  },
  {
    id: 31,
    category1: "General",
    category2: "Disagreement",
    question: "How do you handle disagreements with team members?",
    answer:
      '1. **Listen**: Fully understand others\' opinions and concerns\n2. **Data-Based Discussion**: Discuss with objective metrics, not emotions\n3. **Experiment**: Try both approaches on small scale, then compare results\n4. **Document Decisions**: Record what decisions were made and why\n\n**Key:** Focus on "what\'s best for the business" rather than "who\'s right"',
  },

  // Additional General Questions
  {
    id: 42,
    category1: "General",
    category2: "Self Introduction",
    question: "What are your greatest strengths as an engineer?",
    answer:
      "**1. Data-Driven Problem Solving:**\nI excel at quantifying problems and proving solutions with metrics. For example, I reduced MTTI from 18 hours to 10 minutes (99% reduction) by implementing OpenTelemetry, and convinced leadership using cost analysis.\n\n**2. End-to-End Platform Ownership:**\nFrom Inoutbox solo platform development to leading TheShop infrastructure operations, I take complete responsibility for projects from conception to production.\n\n**3. Cross-Functional Collaboration:**\nSuccessfully coordinated with LG clients, planning teams, marketing teams, and development teams across multiple companies, delivering measurable business results.\n\n**4. Continuous Learning:**\nCKA, AWS DevOps Pro, LFCS certifications demonstrate my commitment to deep technical expertise. Contributing to OpenTelemetry open-source project validates practical application.",
  },
  {
    id: 43,
    category1: "General",
    category2: "Self Introduction",
    question: "What are your biggest weaknesses?",
    answer:
      "**1. Perfectionism (Managed):**\nEarly in my career at Inoutbox, I delayed launches pursuing technical perfection. I've learned to balance quality with delivery speed through MVP approach and iterative improvement.\n\n**2. Impatience with Inefficiency:**\nWhen I see inefficient processes, I want to fix them immediately. I'm learning to prioritize improvements based on ROI and team capacity rather than tackling everything at once.\n\n**3. Over-Engineering Tendency:**\nI sometimes design solutions for scale beyond immediate needs. I now actively practice YAGNI (You Aren't Gonna Need It) principle and focus on solving today's problems first.\n\n**How I Address These:**\n- Set clear timelines and MVP scopes before starting projects\n- Use data to justify optimization efforts\n- Regular code reviews and architecture discussions with team\n- Focus on incremental improvements rather than big rewrites",
  },
  {
    id: 51,
    category1: "General",
    category2: "Problem Solving",
    question:
      "Tell me about a time you had to learn something completely new quickly.",
    answer:
      "**Situation: LG IXI Studio - SSE (Server-Sent Events)**\n\nJoined project with tight deadline requiring real-time AI response streaming. Had never implemented SSE protocol before.\n\n**Challenge:**\n- 2 weeks to deliver working POC\n- Complex integration with AI models\n- Frontend and backend both needed SSE\n- Quality standards couldn't be compromised\n\n**Learning Approach:**\n1. **Official Documentation First** (1 day):\n   - MDN Web Docs for SSE specification\n   - Backend framework (Node.js) SSE libraries\n   - Vue.js SSE client implementations\n\n2. **Hands-on Experimentation** (2 days):\n   - Built simple SSE prototype\n   - Tested connection handling, reconnection, error scenarios\n   - Identified gotchas and edge cases\n\n3. **Reference Implementation Study** (1 day):\n   - Analyzed open-source projects using SSE\n   - Studied production patterns and best practices\n\n4. **Implementation** (1 week):\n   - Applied learnings to actual project\n   - Iterative testing and refinement\n   - Documentation for team\n\n**Result:**\n- Delivered on time with working SSE implementation\n- Achieved stable real-time streaming\n- Expanded technical spectrum with new protocol expertise\n- Shared knowledge with team through tech session\n\n**Key Lesson:**\n**Official docs + Hands-on practice + Reference code** = Fastest path to production-ready knowledge",
  },
  {
    id: 52,
    category1: "General",
    category2: "Problem Solving",
    question: "How do you approach debugging a complex production issue?",
    answer:
      "**Systematic Debugging Process:**\n\n**1. Gather Information (10 minutes):**\n- When did it start? (Correlation with deployments)\n- What's the impact? (Affected users, services)\n- What changed recently? (Code, config, infrastructure)\n- Check monitoring: logs, metrics, traces\n\n**2. Form Hypothesis (5 minutes):**\n- List possible causes based on symptoms\n- Prioritize by probability and impact\n- Consider recent changes first\n\n**3. Test Hypothesis (Iterative):**\n- Start with least invasive checks\n- Use distributed tracing to follow request path\n- Check external dependencies (DB, cache, APIs)\n- Reproduce in non-production if possible\n\n**4. Implement Fix:**\n- Quick mitigation first (rollback, circuit breaker)\n- Proper fix with testing afterward\n- Monitor closely after deployment\n\n**5. Post-Mortem:**\n- Document timeline and root cause\n- Identify prevention measures\n- Update runbooks and alerts\n\n**Real Example - TheShop:**\nIntermittent 500 errors on checkout:\n1. **Traced** with OpenTelemetry: Timeout in payment service\n2. **Found** DB connection pool exhaustion\n3. **Mitigated** Increased pool size temporarily\n4. **Root Cause** N+1 query in new feature\n5. **Fixed** Optimized query, added monitoring\n6. **Prevented** Added query performance testing to CI/CD",
  },
  {
    id: 53,
    category1: "General",
    category2: "Communication",
    question:
      "How do you explain technical concepts to non-technical stakeholders?",
    answer:
      '**Communication Strategy:**\n\n**1. Start with Business Impact:**\n❌ "We need to implement distributed tracing with OpenTelemetry"\n✅ "We can reduce bug fix time from 18 hours to 10 minutes, saving 8 engineering hours per incident"\n\n**2. Use Analogies:**\n- **Distributed Tracing**: Like GPS tracking for a package, we can see exactly where requests go wrong\n- **Caching**: Like keeping frequently used documents on your desk instead of filing cabinet\n- **Load Balancing**: Like multiple checkout lanes at a store instead of one long line\n\n**3. Visual Aids:**\n- Architecture diagrams with clear flows\n- Before/after metrics comparisons\n- Cost analysis charts\n- Timeline visualizations\n\n**4. Focus on Outcomes, Not Technology:**\n- "Faster feature delivery" not "CI/CD pipeline"\n- "99.9% uptime" not "Kubernetes HA cluster"\n- "50% cost reduction" not "EC2 right-sizing"\n\n**5. Anticipate Questions:**\n- Prepare cost/benefit analysis\n- Have risk mitigation plan\n- Show similar success cases\n- Provide realistic timeline\n\n**Real Example - Data Lake Presentation:**\nTo planning team: "Currently we can only see last 7 days of data. With data lake, you\'ll have 10 years of history to analyze trends, seasonality, and customer behavior for better business decisions. Cost: $2K/month. Value: Better forecasting and strategy."',
  },
  {
    id: 54,
    category1: "General",
    category2: "Communication",
    question:
      "Describe a situation where you had to give difficult feedback to a colleague.",
    answer:
      '**Situation:**\nJunior engineer repeatedly submitting PRs without proper testing, causing production bugs and requiring multiple review cycles.\n\n**Approach:**\n\n**1. Prepared Specific Examples:**\n- Collected 3-4 recent PRs with issues\n- Noted impact: rollbacks, customer complaints, wasted review time\n- Gathered metrics: average PR revision count, bug rate\n\n**2. Private 1-on-1 Conversation:**\n- Started with positive: acknowledged hard work and quick delivery\n- Presented data objectively, not emotionally\n- Focused on behavior, not personality\n- Asked open-ended question: "What\'s preventing thorough testing?"\n\n**3. Understood Root Cause:**\n- Discovered: Felt pressure to deliver fast\n- Lacked understanding of testing best practices\n- Unsure how to write effective tests\n\n**4. Collaborative Solution:**\n- Set clear expectation: All PRs need tests and local verification\n- Offered help: Paired on writing first few test cases\n- Shared resources: Testing guides, examples from codebase\n- Established checklist for PR self-review\n\n**5. Follow-up:**\n- Weekly check-ins for first month\n- Celebrated improvements publicly\n- Adjusted expectations based on progress\n\n**Result:**\n- PR quality improved significantly\n- Bug rate decreased 70% within 2 months\n- Engineer gained confidence in testing\n- Relationship strengthened through honest communication\n\n**Key Lesson:**\n**Data + Empathy + Support** = Effective feedback that drives improvement',
  },
  {
    id: 55,
    category1: "General",
    category2: "Learning",
    question: "What technical book or resource has influenced you the most?",
    answer:
      '**Most Influential Resources:**\n\n**1. "Designing Data-Intensive Applications" by Martin Kleppmann:**\n- Changed how I think about distributed systems\n- Deepened understanding of trade-offs in system design\n- Applied concepts in Kafka, data lake, and cache architectures\n- Go-to reference for distributed system decisions\n\n**2. "Site Reliability Engineering" by Google:**\n- Shaped my SRE philosophy and practices\n- SLI/SLO concepts applied to TheShop operations\n- Error budgets influence deployment strategies\n- On-call best practices implementation\n\n**3. Kubernetes Official Documentation:**\n- Foundation for CKA certification preparation\n- Continuously reference for production operations\n- Taught me value of high-quality documentation\n\n**4. AWS Well-Architected Framework:**\n- Guides cloud architecture decisions\n- Influenced cost optimization strategies\n- Shaped security and reliability practices\n\n**5. OpenTelemetry Documentation + Community:**\n- Learning observability best practices\n- Active participation shaped my understanding\n- Contributing back deepens knowledge\n\n**Learning Philosophy:**\n- **Official docs first** for authoritative knowledge\n- **Books for fundamentals** that don\'t change\n- **Blogs/talks for patterns** and real-world application\n- **Open source code** for implementation details\n- **Hands-on practice** to solidify understanding',
  },
  {
    id: 56,
    category1: "General",
    category2: "Career Goals",
    question: "Where do you see yourself in 10 years?",
    answer:
      "**10-Year Vision:**\n\n**Technical Path (Primary):**\n- **Staff/Principal Engineer** or **Distinguished Engineer** role\n- Recognized expert in **platform engineering and observability**\n- Regular speaker at major conferences (KubeCon, AWS re:Invent)\n- Significant open-source contributions with maintainer roles\n- Published technical articles reaching thousands of engineers\n\n**Impact I Want to Make:**\n1. **Industry Influence:**\n   - Shape best practices in cloud-native observability\n   - Contribute to standards and specifications\n   - Mentor next generation of platform engineers\n\n2. **Technical Excellence:**\n   - Architect systems handling millions of users\n   - Solve previously unsolved infrastructure challenges\n   - Pioneer new approaches to developer experience\n\n3. **Knowledge Sharing:**\n   - Write technical book on platform engineering\n   - Create educational content (blog, videos, courses)\n   - Build tools that benefit wider community\n\n**Alternative Paths (Open):**\n- **Technical Leadership**: VP of Engineering or CTO if right opportunity\n- **Consulting**: Independent consultant for high-growth companies\n- **Entrepreneurship**: Technical co-founder of infrastructure startup\n\n**Non-Negotiables:**\n- Stay hands-on technical (writing code, solving problems)\n- Work on meaningful problems at scale\n- Continuous learning and growth\n- Healthy work-life balance\n\n**What I'm Building Toward:**\nReputation as go-to expert when companies need to scale infrastructure from thousands to millions of users.",
  },
  {
    id: 57,
    category1: "General",
    category2: "Self Introduction",
    question: "What makes you different from other candidates?",
    answer:
      "**Unique Combination:**\n\n**1. Breadth AND Depth:**\nMost engineers specialize in one area. I have:\n- **Infrastructure**: Kubernetes, AWS, monitoring, data pipelines\n- **Backend**: Go, Python, Django, Spring Boot\n- **Frontend**: React, Vue, Flutter\n- **Data**: Data lakes, analytics, observability\n\nThis enables **end-to-end platform ownership** and **cross-functional collaboration**.\n\n**2. Startup to Enterprise Experience:**\n- Solo platform development at Inoutbox (0→1)\n- Small team at Intellisys/Abacus (1→10)\n- Enterprise scale at idstrust (₩500B revenue, 100K users)\n\nI understand challenges at every stage and can operate in any environment.\n\n**3. Data-Driven Everything:**\nEvery major decision backed by metrics:\n- 99% MTTI reduction (18h → 10min)\n- 50% cost savings ($5K → $2.5K/month)\n- 90% deployment speedup (2h → 12min)\n- 142x log retention (7 days → 10 years)\n\n**4. Proven Leadership Without Title:**\n- Led OpenTelemetry adoption despite initial resistance\n- Project leader for LG client engagements\n- Built systems now used by 100K+ daily users\n\n**5. Rapid Skill Acquisition:**\n- CKA, AWS DevOps Pro, LFCS in 6 months\n- Learned SSE protocol in 2 weeks for production\n- Contributing to OpenTelemetry within months of adoption\n\n**6. Business Impact Focus:**\nNot just building technology—driving business outcomes:\n- Infrastructure supporting ₩500B revenue\n- Enabling faster feature delivery\n- Reducing operational costs\n- Improving developer productivity\n\n**Bottom Line:**\nI bring **technical depth, business acumen, and proven execution** at scale.",
  },
];
