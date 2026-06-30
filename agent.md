## Workflow Orchestration

## Superpowers First (Required)

- Use Superpowers skills whenever a relevant skill exists for the task.
- For Hostinger deployments in this repo, load the project skill first: `superpowers-agent use-skill hostinger-nodejs-deploy`.
- For any non-trivial request (3+ steps, architecture, debugging, refactors), explicitly run skills before implementation.
- Preferred command pattern:
  1.  `superpowers-agent use-skill superpowers:brainstorming`
  2.  `superpowers-agent use-skill superpowers:writing-plans`
  3.  `superpowers-agent use-skill superpowers:executing-plans`
  4.  `superpowers-agent use-skill superpowers:verification-before-completion`
- If the task is debugging-heavy, also run: `superpowers-agent use-skill superpowers:systematic-debugging`.
- If a skill is not applicable, state why and continue with the simplest valid workflow.

### 1. Plan Mode Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - do not keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy to keep main context window clean

- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - do not over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Do not ask for hand-holding
- Point at logs, errors, failing tests -> then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what is necessary. Avoid introducing bugs.

Use superpowers and skills to solve problems, not to create more work for yourself or others.
# AGENTS.md

<IMPORTANT>
USE DIRECT IDE INTEGRATION WHEN YOU CAN, DON'T JUST USE TERMINAL COMMANDS TO CAT HEREDOCS OR OTHER TERMINAL BASED FILE OPERATIONS.
</IMPORTANT>

## 🎯 CRITICAL: USING SKILLS (READ THIS FIRST)

**BEFORE STARTING ANY TASK, YOU MUST:**

1. **Check for relevant skills** by running: `.agents/skills/using-skills/find-skills [PATTERN]`
2. **If a relevant skill exists, READ IT** using the Read tool with the full path shown in the results
3. **Announce you're using it**: "I've read the [Skill Name] skill and I'm using it to [purpose]"
4. **Follow the skill exactly** - Don't rationalize or adapt away the discipline

**Location of Skills System:** `.agents/skills/using-skills/SKILL.md`

### Why This Matters

Skills document **proven techniques** that save time and prevent mistakes. Not using available skills means:
- ❌ Repeating already-solved problems
- ❌ Making known errors
- ❌ Skipping critical workflows (TDD, debugging, verification)
- ❌ Failing at your task

**If a skill for your task exists, you MUST use it or you will fail.**

### Common Rationalizations to REJECT

- ❌ "I remember this skill" - Skills evolve. Read the current version.
- ❌ "This doesn't count as a task" - It counts. Check for skills.
- ❌ "Workflow is overkill for this simple task" - Skipping process on "simple" tasks creates complex problems.
- ❌ "Instructions were specific so I can skip TDD/brainstorming" - Specific instructions mean clear requirements, which is when workflows matter MOST.

### Quick Start

```bash
# Find skills for your task
.agents/skills/using-skills/find-skills [PATTERN]

# Examples
.agents/skills/using-skills/find-skills test
.agents/skills/using-skills/find-skills debug
.agents/skills/using-skills/find-skills brainstorm
```

**Then use the Read tool** on the skill path shown in results (e.g., `.agents/skills/testing/test-driven-development/SKILL.md`)

### Skills with Checklists

If a skill has a checklist, you MUST create `manage_todo_list` todos for EACH item. Mental tracking = steps get skipped. Every time.

---

## Build/Lint/Test Commands
- **Test single file**: `pnpm test path/to/file.test.js`
- **Test all**: `pnpm test`
- **Test watch mode**: `pnpm test:watch`
- **Test coverage**: `pnpm test:coverage`
- **Lint**: `pnpm lint`
- **Auto-fix lint**: `pnpm lint:fix`

## Code Style Guidelines
- **Imports**: Use ES6 imports, group by external/internal, sort alphabetically
- **Formatting**: 2-space indentation, semicolons required, single quotes for strings
- **Naming**: kebab-case for files/directories, camelCase for variables/functions, PascalCase for classes
- **Error handling**: Use try/catch, throw descriptive Error objects, validate inputs
- **Types**: JSDoc comments for function parameters/returns, avoid any types
- **Blocks**: `blockname.js`, `blockname.test.js`, `_blockname.json`, `blockname.css`
- **Testing**: TDD required, 70%+ coverage, Jest with Airbnb ESLint rules
- **File ops**: Use `create_file`/`edit` tools only, never shell redirects

---

## UNIVERSAL AGENTS WORKFLOW REQUIREMENT (MANDATORY)

**CRITICAL: This workflow MUST be followed for ALL tasks—without skipping steps—before producing or revising any deliverable.**

Agents MUST execute the following workflow—without skipping steps—before producing or revising any requirements deliverable (including updates to this prompt):

1. **Read All Provided Context and Instructions** - Thoroughly review all context, attachments, and instructions before proceeding
2. **Make a Plan** - Create a clear, structured plan for how you will complete the task
3. **Make Tasks for your Plan that you will Execute** - Break down the plan into specific, actionable tasks
4. **Validate your Tasks and Plan** - Ensure tasks and plan are accurate to the context and instructions; revise Plan and Tasks if gaps or discrepancies exist, repeating Steps 2–4 until aligned
5. **Execute Tasks** - Work through your tasks systematically, one at a time
6. **Validate your work** - Review completed work against requirements and quality standards
7. **Make any final necessary corrections** - Address any issues discovered during validation

### Continuous Execution for Bulk Operations (CRITICAL)

**ABSOLUTE RULE: When the user says "proceed until complete," "continue until finished," "don't stop," or similar instructions, YOU MUST NOT pause between phases or after completing groups of files to ask for permission to proceed.**

This is a **HARD RULE** with no exceptions except for blocking errors or genuine ambiguity requiring user clarification.

**Required Behavior:**
1. **Announce execution mode at start:** "Executing all [N] phases/files continuously without pauses as requested."
2. **Execute ALL remaining phases/tasks without interruption** - no permission requests between phases
3. **Provide progress updates as informational messages ONLY** - never frame them as permission requests (e.g., "Completed Phase 3 of 7. Proceeding to Phase 4." NOT "Completed Phase 3. Should I continue?")
4. **ONLY pause for blocking errors** (syntax errors, missing files, API failures) that prevent forward progress
5. **ONLY pause for genuine ambiguity** that requires user clarification to proceed correctly
6. **Track completion internally** without interrupting to report progress

**Forbidden Behaviors (DO NOT):**
- ❌ Pausing after completing a subset of files (e.g., "I've done 5 of 20. Continue?")
- ❌ Pausing between phases in a multi-phase plan to ask permission
- ❌ Rationalizing pauses with "best practice," "making sure," or "want to verify"
- ❌ Framing progress updates as permission requests
- ❌ Creating arbitrary checkpoints to "check in" with the user

**When User Says "Proceed Until Complete," They Mean:**
- Execute ALL remaining work without stopping to ask permission
- Update progress internally, provide informational updates only
- Complete the entire task in ONE continuous flow
- ONLY interrupt if there's a blocking error or genuine ambiguity

**Training Skill Reference:** See `.agents/skills/collaboration/continuous-execution-for-bulk-operations/SKILL.md` for detailed guidance, practice scenarios, and anti-patterns.

### Plan Document Requirement for Complex Tasks

**IF** the task meets ANY of these criteria:
- Large scope (editing many files or large files)
- Complex (requires multiple iterations or significant analysis)
- Multi-step (involves coordinated changes across different areas)
- Non-trivial (requires research, planning, or architectural decisions)

**THEN** you MUST create a plan document:

- **Location:** `./.agents/plans/` directory
- **Naming:** Use a descriptive name relevant to the task (e.g., `update-playwright-references.md`, `refactor-build-prompt.md`)
- **Contents:** Include:
  - Original instructions and context
  - Detailed plan broken into tasks
  - Task status tracking (not-started, in-progress, completed)
  - Notes and decisions made during execution
  - References to related files and documentation

**Purpose of Plan Documents:**
- **Progress tracking:** Mark tasks complete as you go
- **Continuity:** Enable pauses in work and handoffs to other agents
- **Reusability:** Reference for future similar tasks
- **Transparency:** Help human reviewers understand your approach
- **Context preservation:** Maintain alignment with original requirements

**Plan Document Updates:**
- Update the plan document as you progress through tasks
- Mark tasks as completed with timestamps or notes
- Add discoveries or changes to the plan as needed
- Document any deviations from the original plan with rationale

---

# MCP SERVER RULES
- If MCP SERVERS ARE INSTALLED AGENTS ARE ALLOWED TO USE THEM AS RESOURCES TO ACHIEVE TASKS
- AGENTS can use **microsoft/playwright-mcp** MCP Server to access Playwright browser automation capabilities for:
  - **Testing and validation:** Run automated tests, validate code changes, verify UI/UX functionality
  - **Browser automation:** Navigate web pages, interact with elements (clicking, typing, form filling)
  - **Visual validation:** Capture screenshots, take accessibility snapshots, verify responsive design
  - **Quality assurance:** Monitor console logs, network requests, measure performance metrics
  - **Cross-browser testing:** Test across different browsers and viewport sizes
  - **User experience validation:** Simulate real user interactions to validate workflows
  - This applies to ALL aspects of the project including blocks, components, integrations, and full page workflows
- context7 can be utilized as a resource to pull in information from websites and documentation resources or API schemas.
  - Useful context7 libraries for usage:
    - websites/experienceleague_adobe_developer_commerce_storefront
    - commerce-docs/microsite-commerce-storefront
    - websites/experienceleague_adobe_en_commerce
    - adobedocs/commerce-marketplace
    - llmstxt/aem_live_llms_txt
    - websites/experienceleague_adobe_en_experience-manager-guides
    - adobedocs/commerce-services
- mcp-graphql - allows you to utilize introspection to see schema of project specific graphql servers for available queries, mutations, fields etc for reference and understanding.

## MCP RULES FOR AGENTS
IF CONFIGURED AGENTS MAY USE MCP SERVERS TO ASSIST WITH TASKS:
- mcp-graphql - for instrospection which will inform you of available Queries, Mutations and other schema properties of APIs on this project.
- upstash/context7 - for documentation or information related to key technologies used in the project

## Agent Workflow: Gather, Analyze, Document, Validate, Collaborate

**CRITICAL: Follow this workflow for requirements documentation to ensure quality and completeness**

### 0. Initiate Requirements Gathering
- **DO use the Requirements Gathering skill for complex requirements documentation**
- Reference `.agents/skills/documentation/requirements-gathering/SKILL.md` for the complete workflow
- The skill provides a structured approach: Clarify → Research → Gather → Document → Review → Collaborate
- Use for feature requirements, integration specifications, and architectural decisions
- **Skip for simple tasks**: minor requirement updates, clarifications, formatting
- **CRITICAL**: Check for this skill before starting requirements work: `.agents/skills/using-skills/find-skills requirements`

### 1. Gather and Clarify Requirements
- **DO ask clarifying questions** about business needs before documenting requirements
- Understand the "why" behind each requirement, not just the "what"
- Identify stakeholders, business value, and success criteria
- Document assumptions, constraints, and dependencies
- **For spec-kit tasks**: Review existing specification documents and project context

### 2. Research and Analyze
- **DO review similar requirements and existing system documentation**
- Research Adobe Commerce SaaS capabilities and limitations
- Review AEM Edge Delivery Services features and constraints
- Analyze current state vs. future state for gap identification
- Understand existing patterns from the Kai multi-store architecture

### 3. Create Documentation Plan
- **DO create a structured plan for documenting requirements** including sections and priorities
- **For spec-kit tasks**: Use `/plan` and `/tasks` for structured documentation planning
- Break down requirements into Business, Technical, and Functional categories
- Identify traceability between different requirement types
- Document the approach and any architectural considerations
- **Track progress**: Use spec-kit task tracking or manage_todo_list for complex documentation work

### 4. Document the Requirements
- **Follow Requirements Documentation Standards**: Structure requirements clearly and consistently
- Work through documentation systematically by category
- Maintain traceability between business needs and technical specifications
- Use established templates and follow best practices

### 5. Validate and Review Documentation
- **DO review your documentation** before declaring completion
- Validate requirements are testable and measurable
- Check for completeness, consistency, and clarity
- Ensure traceability from business objectives to functional requirements
- Verify alignment with project constraints and success criteria

### 6. Facilitate Stakeholder Collaboration
- **At the completion of requirements documentation**, facilitate review and approval
- Identify areas needing stakeholder input or clarification
- Document decisions and rationale for future reference
- Update Jira tickets and SharePoint documents as needed
- Present findings and recommendations to the project team

## Agent Principles: Expert Ownership & Excellence

**YOU ARE AN EXPERT.** As an AI agent working on this project, you are expected to:

### Extreme Ownership
- **Take full responsibility** for the quality, completeness, and correctness of your deliverables
- **Own the entire lifecycle** of your work from research to implementation to validation
- **Proactively identify and fix issues** - don't wait to be told something is wrong
- **Go beyond the minimum requirements** - deliver production-ready, maintainable code
- **Think like a senior engineer** - consider edge cases, performance, accessibility, and maintainability

### Expert-Level Execution
- **Research thoroughly** before implementing - understand the problem domain completely
- **Follow best practices** and established patterns in the codebase
- **Write clean, well-documented code** that other developers can understand and maintain
- **Test comprehensively** - your code should have thorough unit tests with high coverage
- **Validate your work** - run tests, linting, and manual validation before declaring completion
- **Never compromise on quality** - if something isn't right, fix it

### Deliverable Standards
Every deliverable you produce MUST:
1. ✅ **Work correctly** - meet all functional requirements without bugs
2. ✅ **Pass all tests** - achieve minimum coverage thresholds (70-80%+)
3. ✅ **Pass linting** - follow code style and quality standards
4. ✅ **Be accessible** - meet WCAG 2.1 AA standards
5. ✅ **Be performant** - not degrade user experience or page load times
6. ✅ **Be documented** - include clear comments and documentation where needed
7. ✅ **Be maintainable** - follow established patterns and be easy to modify

### Accountability
- **You are accountable** for the code you produce
- **Test your work** thoroughly before declaring it complete
- **Verify coverage reports** show your code is adequately tested
- **Run the full validation suite** (lint, test, coverage) before completion
- **If tests fail or coverage is low, FIX IT** - don't submit incomplete work

**Remember:** Your work reflects your expertise. Deliver code you would be proud to put your name on.

## Project Overview

This project documents requirements for the **Kai Adobe Commerce SaaS Upgrade (EDS Milestone)** - a proof-of-concept migration from Adobe Commerce PaaS Multi-Store (six storefronts) to Adobe Commerce SaaS with AEM Edge Delivery Services integration.

**Project Details:**
- **Client:** Kai USA, LTD
- **Duration:** Oct 1 – Dec 23, 2025
- **Budget:** $392,850
- **Purpose:** Deliver POC storefront to validate SaaS capabilities before full migration

**Current State:** Six Luma-based Adobe Commerce PaaS storefronts with high maintenance costs, poor mobile performance, and inflexible frontend architecture.

**Target State:** Modern, performant SaaS storefront with AEM Edge Delivery Services, Universal Editor, and shared cart strategy foundation.

## First Time Agent User Recommendations
- If the User is working on requirements documentation for the first time, ask if they want guidance on project structure and stakeholder identification
- Help Users understand the Kai project context and technical architecture constraints
- Users should familiarize themselves with Adobe Commerce SaaS capabilities and AEM Edge Delivery Services features
- Review the project stakeholder list and understand their roles in requirements approval

## Key Technologies
- Edge Delivery Services for AEM Sites (documentation at https://www.aem.live - search with `site:www.aem.live` to restrict web search results)
- Adobe Commerce Storefront (documentation at https://experienceleague.adobe.com/developer/commerce/storefront/)
- Adobe Commerce as a Cloud Service - provides unified API Mesh endpoint with Catalog Service, Live Search, and GraphQL endpoints
- Adobe I/O Events - for real-time data synchronization between Commerce and Edge Delivery Services
- Adobe Commerce App Builder - for developing custom admin SDK components to interface with Adobe Commerce as a Cloud Service
- **Adobe Commerce Storefront Dropins** - Pre-built commerce UI components with event-based architecture and OOTB error handling strategies
- See `./llms.txt` for Additional Context about Systems and Documentation for Systems

## Adobe Commerce Storefront Dropins - Key Architectural Guidance

**CRITICAL: All agents working with Adobe Commerce Storefront Dropins must understand these key architectural patterns:**

### Event-Based Data Flow (Not GraphQL)

Adobe Commerce Storefront Dropins use **event-based communication**, NOT GraphQL for component-to-component data flow:

- **Components emit events** for state changes (cart updates, product selections, checkout progress)
- **Frontend code subscribes to events** rather than polling APIs
- **GraphQL is used internally by Dropins** but not exposed as the integration pattern
- **Event documentation sources**:
  - Adobe Developer Documentation (API reference - check first)
  - Dropin source code inspection (when event data structure unclear)
  - Browser console at https://www.aemshop.net/ (inspect live event data with DevTools)
  - **Ask user for specific event examples** when documentation is insufficient

**When documenting requirements involving Dropins:**
- Focus on which events the component subscribes to and emits
- Request event examples from user when event payload structure is unclear
- Do NOT assume GraphQL queries for inter-component communication
- Reference `platform-constraints.md` > Adobe Commerce Storefront Dropins for complete event guidance

### Out-of-the-Box (OOTB) Strategies - Rely on Them

Adobe Commerce Storefront Dropins provide **production-tested OOTB strategies** for common concerns:

| Capability | OOTB Behavior | Requirements Approach |
|-----------|--------------|---------------------|
| API Failures | Built-in retry logic with exponential backoff | **Rely on OOTB** - Do not specify custom retry logic |
| Error Handling | User-friendly error messages, loading states | **Rely on OOTB** - Document brand-specific customizations only |
| Latency Management | Loading indicators, skeleton screens | **Rely on OOTB** - Verify UX meets brand standards |
| Timeouts | Configurable timeout values tuned for Commerce SaaS | **Rely on OOTB** - Use defaults unless performance testing reveals issues |

**When generating requirements for Dropins:**
- **Do NOT specify custom error handling, retry logic, or timeout configurations**
- **Do NOT ask about API response times** (controlled by Adobe Commerce SaaS, not project team)
- **DO test OOTB behavior first** before requesting custom implementations
- **DO document brand-specific UX adjustments** if Dropin loading states need visual customization
- Reference `platform-constraints.md` > Out-of-the-Box Strategies for complete guidance
- Reference `technical-standards.md` > Error Handling Standards for Dropin-specific exception guidance

### Performance Focus - Frontend Not APIs

**CRITICAL: When documenting requirements and asking clarifying questions, focus on FRONTEND PERFORMANCE, not API performance:**

✅ **DO focus on (Project Team Controls):**
- Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), First Input Delay (FID)
- Frontend rendering time, JavaScript bundle size, CSS bundle size
- Image optimization, lazy loading strategies
- Lighthouse scores, PageSpeed Insights scores

❌ **DO NOT focus on (Adobe Controls):**
- GraphQL API response times
- Catalog Service latency
- Live Search response times
- API Mesh gateway performance

**Rationale:** API response times are controlled by Adobe Commerce as a Cloud Service infrastructure. Project team cannot improve API latency. Focus requirements on what the team CAN control: component implementation, bundle optimization, rendering strategies.

**See:** `performance-targets.md` > Performance Focus Guidance for complete guidance and examples.

### Requirements Generation - Unlimited Clarifying Questions

**Previous restriction REMOVED:** Requirements generation is no longer limited to 3 clarifying questions per phase.

**Current policy:**
- Ask as many clarifying questions as needed to ensure complete, accurate requirements
- Quality and completeness take priority over question quantity
- Still required: Questions must be logged as Open Questions (OQ-##) with resolution status
- See `.agents/prompts/requirements/modular/00-foundation-workflow.md` > Clarifying Questions (Unrestricted) for complete workflow

**Rationale:** Artificial question limits resulted in incomplete requirements and costly rework. Comprehensive understanding upfront prevents iteration cycles.

## Project Knowledge Base

**CRITICAL: Agents MUST reference the Project Knowledge Base for established project standards and parameters.**

### Location and Purpose

The `.agents/project-knowledge/` directory contains the **centralized Project Knowledge Base** with established project standards, constraints, and preferences that agents reference during requirements generation and development tasks.

**Key Benefits:**
- **Reduces Duplicate Questions**: Check established knowledge before marking requirements as "Uncertain"
- **Maintains Consistency**: All requirements reference same standards (breakpoints, colors, performance targets, etc.)
- **Accelerates Development**: Fewer unknowns = faster requirements generation with fewer Open Questions
- **Quick Reference Values**: Access project parameters via `.agents/project-knowledge/data/project-parameters.yaml`

### Quick Access to Project Parameters

**For immediate access to standardized values, reference:**

```
.agents/project-knowledge/data/project-parameters.yaml
```

This YAML file contains machine-readable project data including:
- **Responsive Breakpoints**: Mobile (375px), Tablet (768px), Desktop (1280px), Wide (1920px)
- **Brand Colors**: Primary, secondary, hover states, and accent colors for all 6 Kai USA brands
- **Typography Standards**: Font families, sizes, and weights per brand
- **Spacing System**: Standardized padding, margin, and gap values (space-0 through space-8)
- **Button Variants**: Brand-specific button styles including slant-edge configurations
- **Performance Targets**: LCP, CLS, FID thresholds and API response time targets
- **Site URLs and Codes**: All 6 brand sites (kai, kershaw, zt, shun, kai-housewares, kasho)

**Example Usage:**
```yaml
# Quick reference for breakpoints
designStandards:
  breakpoints:
    mobile: { test: 375, minWidth: null }  # Mobile-first base
    tablet: { test: 768, minWidth: 768 }
    desktop: { test: 1280, minWidth: 1024 }
    wide: { test: 1920, minWidth: 1440 }

# Quick reference for brand colors
brands:
  kershaw:
    colors:
      primary: "#DE1219"
      hover: "#B1141A"
  shun:
    colors:
      primary: "#966900"
      hover: "#634500"
```

### Knowledge Base Structure

```
.agents/project-knowledge/
├── README.md                        # Complete usage guide (READ THIS FIRST)
├── CHANGELOG.md                     # Update history
│
├── performance-targets.md           # LCP, CLS, FID, API response times
├── design-standards.md              # Breakpoints, colors, typography, spacing
├── platform-constraints.md          # AEM, EDS, Commerce API limits
├── business-rules.md                # Brand requirements, compliance
├── technical-standards.md           # Accessibility, security, testing
├── stakeholder-preferences.md       # Authoring workflows, processes
│
└── data/
    ├── project-parameters.yaml      # Machine-readable structured data
    └── oq-resolutions.yaml          # Open Question resolution tracking
```

### When to Reference Knowledge Base

**MANDATORY: Reference knowledge base BEFORE starting any requirements or development task:**

1. **Before Requirements Generation**:
   - Read `performance-targets.md` for performance implications
   - Read `design-standards.md` for responsive layout, colors, typography
   - Read `platform-constraints.md` for OOTB component limitations
   - Read `business-rules.md` for brand-specific requirements
   - Read `technical-standards.md` for accessibility/security standards

2. **During Requirements Writing**:
   - Cite knowledge sources: "Per design-standards.md, using breakpoints: 375/768/1280/1920"
   - Reference standards: "Follows WCAG 2.1 AA per technical-standards.md"
   - Apply established patterns: "Button variants from design-standards.md"

3. **During Development**:
   - Quick parameter lookup in `project-parameters.yaml`
   - Verify compliance with established standards
   - Ensure consistency across all 6 brand sites

### Example Knowledge Base References

**In Requirements Documents:**
```markdown
## Design & Reference

**Responsive Breakpoints** (per design-standards.md):
- Mobile: 375px (test viewport)
- Tablet: 768px (min-width media query)
- Desktop: 1280px (test viewport)
- Wide: 1920px (test viewport)

**Brand Colors** (per project-parameters.yaml):
- Kershaw Primary: #DE1219
- Shun Primary: #966900
- ZT Primary: #125C7F

**Performance Targets** (per performance-targets.md):
- Target LCP: < 2.5s (mobile)
- API Response: < 500ms (p95)
```

### Important Notes

- **Always Read README First**: `.agents/project-knowledge/README.md` contains complete usage guidance
- **YAML for Quick Lookups**: Use `project-parameters.yaml` for fast parameter access
- **Markdown for Context**: Read full markdown files for detailed explanations and rationale
- **Cite Sources**: Always reference knowledge base files in requirements documents
- **Stay Synchronized**: Knowledge base files are maintained and updated by project managers

**See `.agents/project-knowledge/README.md` for complete documentation on:**
- When and how to reference knowledge
- Knowledge update workflows
- Synchronization rules
- Migration of Open Question resolutions to permanent knowledge


## Requirements Documentation Structure

### Repository Structure for Requirements
```
├── business-requirements/     # Business needs and objectives
├── technical-requirements/    # Technical constraints and specifications
├── functional-requirements/   # Feature specifications and user stories
├── templates/                 # Standard requirement document templates
├── stakeholder-docs/         # Stakeholder-specific documentation
└── integration-specs/        # API and system integration requirements
```

### Project Management Integration
- **Jira**: Link requirements to project tickets and track progress
- **SharePoint**: Store formal requirement documents and artifacts
- **GitHub**: Version control for requirement specifications and templates
- **Slack**: Real-time collaboration and stakeholder communication

### Requirements Validation Commands
- Use GitHub Issues to track requirement changes and approvals
- Link requirements to Jira epics and user stories
- Maintain traceability between business objectives and technical specifications

## Requirements Documentation Standards

### Business Requirements Documentation
- **Purpose**: Define business objectives, success criteria, and stakeholder needs
- **Format**: Use clear, measurable language with specific acceptance criteria
- **Content**: Include business context, value propositions, and ROI expectations
- **Traceability**: Link to project goals and technical specifications

### Technical Requirements Documentation
- **Architecture Constraints**: Document Adobe Commerce SaaS limitations and capabilities
- **Integration Specifications**: Detail API requirements, data flows, and system interfaces
- **Performance Requirements**: Define load times, scalability needs, and technical benchmarks
- **Security & Compliance**: Address PCI compliance, data protection, and security protocols

### Functional Requirements Documentation
- **User Stories**: Write clear, testable user stories with acceptance criteria
- **Feature Specifications**: Detail functionality for cart, checkout, product catalog, and user management
- **Workflow Documentation**: Map user journeys and business process flows
- **Edge Cases**: Document error handling, validation rules, and exception scenarios

## Requirements Writing Guidelines

### Requirements Quality Standards
- **Clear and Concise**: Use simple, unambiguous language that all stakeholders can understand
- **Testable and Measurable**: Each requirement should have clear acceptance criteria and success metrics
- **Traceable**: Link requirements to business objectives and technical specifications
- **Prioritized**: Classify requirements as Must Have, Should Have, Could Have, Won't Have (MoSCoW)

### Stakeholder Collaboration
- **Digital Solutions Consultants**: Focus on business process analysis and user experience requirements
- **Technical/Solutions Architects**: Document technical constraints, integration patterns, and system architecture
- **Tech Leads**: Specify implementation approaches, technical standards, and development guidelines
- **QA Analysts**: Define testing scenarios, acceptance criteria, and quality assurance protocols

### Documentation Standards
- Use consistent templates for all requirement types
- Include version control and change tracking
- Maintain requirements traceability matrices
- Follow Adobe Commerce SaaS best practices and constraints
- Document assumptions, dependencies, and risks

## Requirements Validation and Review

As an agent, you should validate requirements documentation throughout the creation process to ensure quality, completeness, and stakeholder alignment.

### When to Validate Requirements

Validate requirements documentation in the following scenarios:

1. **After Creating Business Requirements**: Verify alignment with project objectives and stakeholder needs
2. **Technical Constraints Documentation**: Validate against Adobe Commerce SaaS and AEM EDS capabilities
3. **Functional Specifications**: Ensure user stories are complete, testable, and trace to business needs
4. **Integration Requirements**: Verify API specifications and system interface definitions
5. **Acceptance Criteria**: Confirm requirements are measurable and have clear success criteria

## Key Concepts

### Content

CMS authored content is a key part of every AEM Website. The content of a page is broken into sections. Sections can have default content (text, headings, links, etc.) as well as content in blocks.

You can create static content for testing in a dedicated drafts folder. If you do this, be sure to specify the folder location when starting the development server by running `pnpm --package=@adobe/aem-cli dlx aem up --no-open --forward-browser-logs --html-folder drafts`
Background on content structure https://www.aem.live/developer/markup-sections-blocks
You can inspect the contents of any page with `curl http://localhost:3000/path/to/page` and `curl http://localhost:3000/path/to/page.md`

### Block Collection Resources

This project leverages the AEM Block Collection as a foundation. When creating new blocks:

1. **Check Existing Blocks First**: Before creating a new block, check if a similar block exists in:
   - The [AEM Block Collection](https://www.aem.live/developer/block-collection) - Comprehensive collection of pre-built blocks
   - [aem-block-collection-xwalk](https://github.com/adobe-rnd/aem-block-collection-xwalk/tree/main/blocks) - Universal Editor-ready blocks
   - [aem-boilerplate-xcom](https://github.com/adobe-rnd/aem-boilerplate-xcom/) - Commerce-specific blocks

2. **Reuse and Adapt**: If a suitable block exists:
   - Copy the block structure (JS, CSS, JSON) as a starting point
   - Ensure the JSON configuration is properly set up for Universal Editor
   - Adapt the styling and functionality to match project requirements
   - Maintain the same code patterns and practices

3. **Import Utilities**: Leverage shared utilities from the boilerplate:
   - Use `moveInstrumentation()` from `scripts.js` to preserve Universal Editor attributes
   - Use `createOptimizedPicture()` from `aem.js` for responsive images
   - Import helper functions rather than duplicating code

4. **Follow Established Patterns**: The block collection demonstrates best practices:
   - Simple, focused blocks that do one thing well
   - Semantic DOM transformations
   - Accessibility-first implementations
   - Mobile-first responsive design

### Blocks

Blocks are the re-usable building blocks of AEM. Blocks add styling and functionality to content. Each block has an initial content structure it expects, and transforms the html in the block using DOM APIs to render a final structure.

The initial content sturcture is important because it impacts how the author will create the content and how you will write your code to decorate it. In some sense, you can think of this structure as the contract for your block between the author and the developer. You should decide on this initial structure before writing any code, and be careful when making changes to code that makes assumptions about that structure as it could break existing pages.

The block javascript should export a default function which is called to perform the block decoration:

```javascript
/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // 1. Load dependencies (if needed)
  // 2. Extract configuration from block structure (if applicable)
  // 3. Transform DOM structure
  // 4. Add event listeners
  // 5. Block is automatically marked as loaded
}
```

**Critical: Preserving Universal Editor Instrumentation**

When transforming the DOM structure of a block, you MUST preserve Universal Editor instrumentation attributes. Always use the `moveInstrumentation()` helper function:

```javascript
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li); // REQUIRED: Preserves data-aue-* attributes
    // ... rest of your transformation
    ul.append(li);
  });
  block.append(ul);
}
```

**Common Patterns from Block Collection:**

1. **Image Optimization**: Use `createOptimizedPicture()` for responsive images:
```javascript
import { createOptimizedPicture } from '../../scripts/aem.js';

ul.querySelectorAll('picture > img').forEach((img) => {
  const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  moveInstrumentation(img, optimizedPic.querySelector('img'));
  img.closest('picture').replaceWith(optimizedPic);
});
```

2. **Configuration Extraction**: Use `readBlockConfig()` for key-value blocks:
```javascript
import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const config = readBlockConfig(block);
  // config contains key-value pairs from the block
}
```

3. **Fragment Loading**: For blocks that reference external content:
```javascript
import { loadFragment } from '../fragment/fragment.js';

const fragment = await loadFragment(path);
```

4. **Dynamic CSS/JS Loading**: For blocks with dynamic dependencies:
```javascript
import { loadCSS } from '../../scripts/aem.js';

await loadCSS(`${window.hlx.codeBasePath}/blocks/blockname/blockname.css`);
```

Use `curl` and `console.log` to inspect the HTML delivered by the backend and the DOM nodes to be decorated before making assumptions. Remember that authors may omit or add fields to a block, so your code must handle this gracefully.

### Auto-Blocking

Auto-blocking is the process of creating blocks that aren't explicitly authored into the page based on patterns in the content. See the `buildAutoBlocks` function in `scripts.js`.

### Three-Phase Page Loading

Pages are progressively loaded in three phases to maximize performance. This process begins when `loadPage` from scripts.js is called.

* Eager - load only what is required to get to LCP. This generally includes decorating the overall page content to create sections, blocks, buttons, etc. and loading the first section of the page.
* Lazy - load all other page content, including the header and footer.
* Delayed - load things that can be safely loaded later here and incur a performance penalty when loaded earlier

## Development Workflow

### Local Development
1. Run `pnpm --package=@adobe/aem-cli dlx aem up --no-open` to start the AEM Proxy server
2. Validate your work using Playwright for automated testing (preferred), or open `http://localhost:3000` in your browser if Playwright testing is not applicable
3. Make changes to files - they will auto-reload
4. Use Playwright to test responsive design across multiple viewports (375px, 768px, 1280px, 1920px) using mobile-first approach
5. Run validation scripts after each significant change to ensure functionality
6. Capture screenshots and console output to verify expected behavior

### Block Development

**CRITICAL: Test-Driven Development (TDD) is REQUIRED for all blocks**

When creating a new block, follow this strict workflow:

1. **Plan First** - Before writing any code:
   - Define the block's purpose and functionality
   - Determine the initial HTML structure (author contract)
   - Identify the final DOM structure after decoration
   - List all interactive features and edge cases
   - Document expected accessibility attributes

2. **Write Tests FIRST** - Create `blockname.test.js` before implementation:
   - Write failing tests that describe all expected behavior
   - Test DOM transformation (initial → final structure)
   - Test event listeners and user interactions
   - Test accessibility (ARIA attributes, keyboard navigation)
   - Test edge cases (empty blocks, missing config, invalid data)
   - Test responsive behavior (mobile/tablet/desktop)
   - Run tests to confirm they fail: `pnpm test blockname.test.js`

3. **Implement the Block** - Now write the actual code:
   - Create `blockname.js` with the `decorate()` function
   - Create `_blockname.json` for Universal Editor configuration
   - Create `blockname.css` for styling
   - Run tests frequently: `pnpm test:watch blockname.test.js`
   - Iterate until all tests pass

4. **Validate and Refine**:
   - Run coverage: `pnpm test --coverage blockname.test.js`
   - Ensure 85-100% coverage for the block
   - Run linting: `pnpm lint:fix`
   - Validate with Playwright (see section below)
   - Make final adjustments

**Block File Requirements:**
Each block in the `blocks/` directory MUST include ALL four files:
- `blockname.test.js` - **WRITE THIS FIRST** (Jest unit tests)
- `blockname.js` - Block JavaScript (written after tests)
- `_blockname.json` - Universal Editor configuration
- `blockname.css` - Block styles

**Naming Convention:**
- JavaScript: `blockname.js`
- Tests: `blockname.test.js`
- JSON Config: `_blockname.json` (note the underscore prefix)
- Styles: `blockname.css`

**Testing Requirements:**
- **REQUIRED: Write Jest tests FIRST** before any implementation code
- Minimum 70%+ statement coverage (aim for 85-100%)
- All tests must pass before the block is considered complete
- Tests must pass linting (same rules as production code)

**Playwright Validation** (after TDD cycle):
Once tests pass, validate each block with Playwright to ensure:
- Block renders correctly in the DOM
- Event listeners work as expected
- Responsive design works at all breakpoints (600px, 900px, 1200px)
- Accessibility attributes are properly set
- No console errors are thrown

**Additional Guidelines:**
- Blocks should be self-contained and re-useable
- Blocks should be responsive and accessible by default
- Follow established patterns from the AEM Block Collection
- Never commit a block without its test file

## Development Workflow

### Local Development
1. Run `pnpm --package=@adobe/aem-cli dlx aem up --no-open` to start the AEM Proxy server
2. Validate your work using Playwright for automated testing (preferred), or open `http://localhost:3000` in your browser if Playwright testing is not applicable
3. Make changes to files - they will auto-reload
4. Use Playwright to test responsive design across multiple viewports (375px, 768px, 1280px, 1920px) using mobile-first approach
5. Run validation scripts after each significant change to ensure functionality
6. Capture screenshots and console output to verify expected behavior

### Block Development

**CRITICAL: Test-Driven Development (TDD) is REQUIRED for all blocks**

When creating a new block, follow this strict workflow:

1. **Plan First** - Before writing any code:
   - Define the block's purpose and functionality
   - Determine the initial HTML structure (author contract)
   - Identify the final DOM structure after decoration
   - List all interactive features and edge cases
   - Document expected accessibility attributes

2. **Write Tests FIRST** - Create `blockname.test.js` before implementation:
   - Write failing tests that describe all expected behavior
   - Test DOM transformation (initial → final structure)
   - Test event listeners and user interactions
   - Test accessibility (ARIA attributes, keyboard navigation)
   - Test edge cases (empty blocks, missing config, invalid data)
   - Test responsive behavior (mobile/tablet/desktop)
   - Run tests to confirm they fail: `pnpm test blockname.test.js`

3. **Implement the Block** - Now write the actual code:
   - Create `blockname.js` with the `decorate()` function
   - Create `_blockname.json` for Universal Editor configuration
   - Create `blockname.css` for styling
   - Run tests frequently: `pnpm test:watch blockname.test.js`
   - Iterate until all tests pass

4. **Validate and Refine**:
   - Run coverage: `pnpm test --coverage blockname.test.js`
   - Ensure 85-100% coverage for the block
   - Run linting: `pnpm lint:fix`
   - Validate with Playwright (see section below)
   - Make final adjustments

**Block File Requirements:**
Each block in the `blocks/` directory MUST include ALL four files:
- `blockname.test.js` - **WRITE THIS FIRST** (Jest unit tests)
- `blockname.js` - Block JavaScript (written after tests)
- `_blockname.json` - Universal Editor configuration
- `blockname.css` - Block styles

**Naming Convention:**
- JavaScript: `blockname.js`
- Tests: `blockname.test.js`
- JSON Config: `_blockname.json` (note the underscore prefix)
- Styles: `blockname.css`

**Testing Requirements:**
- **REQUIRED: Write Jest tests FIRST** before any implementation code
- Minimum 70%+ statement coverage (aim for 85-100%)
- All tests must pass before the block is considered complete
- Tests must pass linting (same rules as production code)

**Playwright Validation** (after TDD cycle):
Once tests pass, validate each block with Playwright to ensure:
- Block renders correctly in the DOM
- Event listeners work as expected
- Responsive design works at all breakpoints (375px, 768px, 1280px, 1920px) using mobile-first approach
- Accessibility attributes are properly set
- No console errors are thrown

**Additional Guidelines:**
- Blocks should be self-contained and re-useable
- Blocks should be responsive and accessible by default
- Follow established patterns from the AEM Block Collection
- Never commit a block without its test file

#### Universal Editor Configuration (JSON)

Each block MUST include a JSON configuration file for Universal Editor support. The JSON file should be named with an underscore prefix (e.g., `_accordion.json`) and include:

1. **Definitions** - Define the block component(s) and their resource types
2. **Models** - Define the data model and editable fields for the block
3. **Filters** - (Optional) Define which components can be used within the block

**Basic Block JSON Structure:**

```json
{
  "definitions": [
    {
      "title": "Block Name",
      "id": "block-name",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Block Name",
              "model": "block-name"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "block-name",
      "fields": [
        {
          "component": "text",
          "valueType": "string",
          "name": "fieldName",
          "label": "Field Label",
          "value": ""
        }
      ]
    }
  ],
  "filters": []
}
```

**Common Field Types:**

- `text` - Single line text input
  ```json
  {
    "component": "text",
    "valueType": "string",
    "name": "title",
    "label": "Title",
    "value": ""
  }
  ```

- `richtext` - Rich text editor with formatting
  ```json
  {
    "component": "richtext",
    "name": "description",
    "value": "",
    "label": "Description",
    "valueType": "string"
  }
  ```

- `reference` - Image or asset reference
  ```json
  {
    "component": "reference",
    "valueType": "string",
    "name": "image",
    "label": "Image",
    "multi": false
  }
  ```

- `select` - Dropdown selection
  ```json
  {
    "component": "select",
    "name": "style",
    "label": "Style",
    "options": [
      { "name": "Default", "value": "" },
      { "name": "Primary", "value": "primary" }
    ]
  }
  ```

- `aem-content` - Link to content
  ```json
  {
    "component": "aem-content",
    "name": "link",
    "label": "Link"
  }
  ```

- `boolean` - Checkbox
  ```json
  {
    "component": "boolean",
    "name": "enabled",
    "label": "Enabled",
    "valueType": "boolean"
  }
  ```

**Multi-Item Blocks (like Cards, Columns):**

For blocks that contain repeating items, define both a container and item definition:

```json
{
  "definitions": [
    {
      "title": "Container Name",
      "id": "container-id",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Container Name",
              "filter": "container-filter"
            }
          }
        }
      }
    },
    {
      "title": "Item Name",
      "id": "item-id",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block/item",
            "template": {
              "name": "Item Name",
              "model": "item-model"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "item-model",
      "fields": [
        // Item fields here
      ]
    }
  ],
  "filters": [
    {
      "id": "container-filter",
      "components": ["item-id"]
    }
  ]
}
```

**Reusing Common Components:**

Leverage shared models from the `models/` directory:
- `_button.json` - Button component
- `_image.json` - Image component
- `_text.json` - Text component
- `_title.json` - Title component

Reference these in your filters to allow authors to add them to your block:

```json
{
  "filters": [
    {
      "id": "my-block",
      "components": ["text", "image", "button"]
    }
  ]
}
```

**Best Practices:**

1. Use descriptive `title` and `label` values for author clarity
2. Set appropriate `valueType` (string, number, boolean)
3. Provide sensible `value` defaults where applicable
4. Use filters to control which components can be added to multi-item blocks
5. Keep field names semantic and aligned with your JavaScript decoration logic
6. For columns/grid-based blocks, use the `core/franklin/components/columns/v1/columns` resourceType
7. Document your model structure in the block's README.md

### Styling
- Global styles go in `styles/styles.css`
- Font definitions in `styles/fonts.css`
- Lazy-loaded styles in `styles/lazy-styles.css`
- Block-specific styles in their respective directories

## Useful tools for Agent
- `pnpm` - Faster Node.js package manager
- `@adobe/aem-cli` - AEM Edge Delivery Services CLI tool for local development
- `playwright` - Browser automation for testing and validation (HIGHLY RECOMMENDED for agents - accessible via microsoft/playwright-mcp MCP Server)
- `lighthouse-ci` - Automated performance testing and monitoring
- `ripgrep` (`rg`) - Fast text search across codebase
- `jq` - JSON processor and transformer
- `gh` - GitHub CLI
- `curl` - Command-line HTTP requests
- `ast-grep` (`sg`) - Syntax-aware code search and transformation
- `httpie` - Human-friendly HTTP client
- `fzf` - Fuzzy finder for interactive file/command selection
- `fd` - Fast and user-friendly alternative to find
- `bat` - Syntax-highlighted cat replacement with Git integration

## File Creation and Editing Standards

**CRITICAL: Use proper tools for file operations, NOT shell redirects or heredocs**

### ✅ CORRECT: Use Appropriate Tools

1. **Creating New Files**: Use `create_file` tool
   ```
   create_file(filePath, content)
   ```

2. **Editing Existing Files**: Use `replace_string_in_file` tool
   ```
   replace_string_in_file(filePath, oldString, newString)
   ```

3. **Creating Directories**: Use `create_directory` tool
   ```
   create_directory(dirPath)
   ```

4. **Running Commands**: Use `run_in_terminal` for legitimate commands only
   ```
   run_in_terminal(command, explanation, isBackground)
   ```

### ❌ FORBIDDEN: Shell Redirects and Heredocs

**NEVER use these patterns:**

```bash
# ❌ WRONG: Heredoc patterns
cat > file.js << 'EOF'
content here
EOF

# ❌ WRONG: Heredoc with append
cat >> file.js << EOF
content here
EOF

# ❌ WRONG: Echo redirects
echo "content" > file.js

# ❌ WRONG: Multi-line echo redirects
echo "line1
line2
line3" > file.js

# ❌ WRONG: Printf redirects
printf '%s\n' "content" > file.js
```

**Why These Are Forbidden:**

1. **Breaks tool tracking**: File creation tools track changes for validation
2. **No syntax validation**: Shell redirects bypass linting and syntax checking
3. **Difficult to review**: Content in heredocs is hard to read and validate
4. **Version control issues**: Changes aren't properly tracked
5. **Escaping problems**: Shell escaping can corrupt code
6. **Not idiomatic for AI assistants**: Tools exist specifically for file operations

### ✅ CORRECT Examples

**Creating a new JavaScript file:**
```javascript
// Use create_file tool
create_file('/path/to/file.js', `
export function myFunction() {
  return 'Hello World';
}
`);
```

**Editing an existing file:**
```javascript
// Use replace_string_in_file tool
replace_string_in_file('/path/to/file.js',
  // oldString - include context
  `export function myFunction() {
  return 'Hello World';
}`,
  // newString - the replacement
  `export function myFunction() {
  return 'Hello, World!';
}
export function anotherFunction() {
  return 'Goodbye';
}`
);
```

**Creating configuration files:**
```javascript
// Use create_file with JSON content
create_file('/path/to/config.json', JSON.stringify({
  name: 'my-project',
  version: '1.0.0'
}, null, 2));
```

### Legitimate Terminal Commands

Use `run_in_terminal` ONLY for:

- ✅ Package management: `pnpm install`, `pnpm test`
- ✅ Git operations: `git status`, `git add`, `git commit`
- ✅ Build commands: `pnpm build`, `npm run dev`
- ✅ Testing: `pnpm test`, `jest --coverage`
- ✅ Linting: `pnpm lint`, `eslint .`
- ✅ File inspection: `ls`, `cat file.js`, `head`, `tail`
- ✅ Search operations: `grep`, `find`, `rg`
- ✅ Process management: Starting/stopping servers

Do NOT use `run_in_terminal` for:

- ❌ Creating files (use `create_file`)
- ❌ Editing files (use `replace_string_in_file`)
- ❌ Writing content with redirects or heredocs
- ❌ Complex shell scripts that should be proper files

## Testing & Quality Assurance

### Playwright Validation Workflow

When developing features, follow this validation workflow:

1. **Start the development server** (if not already running):
   ```bash
   pnpm --package=@adobe/aem-cli dlx aem up --no-open --forward-browser-logs
   ```

2. **Use Playwright via MCP Server** (if microsoft/playwright-mcp is configured) or **create a Playwright validation script** to test your changes:
   ```javascript
   const { chromium } = require('playwright');

   (async () => {
     const browser = await chromium.launch({ headless: false });
     const page = await browser.newPage();

     // Navigate to your test page
     await page.goto('http://localhost:3000/path/to/test-page');

     // Wait for your block to load
     await page.waitForSelector('.your-block.block');

     // Validate DOM structure
     const blockExists = await page.$('.your-block') !== null;
     console.log('Block exists:', blockExists);

     // Test interactions
     await page.click('.your-button');
     await page.waitForTimeout(500);

     // Validate changes after interaction
     const isExpanded = await page.$eval('.your-element',
       el => el.getAttribute('aria-expanded') === 'true'
     );
     console.log('Element expanded:', isExpanded);

     // Take screenshots for visual validation
     await page.screenshot({ path: 'test-result.png', fullPage: true });

     await browser.close();
   })();
   ```

3. **Run the validation script**:
   ```bash
   node your-validation-script.js
   ```

4. **Analyze results** and iterate on your code as needed

### Common Playwright Validation Patterns

**Testing Block Rendering:**
```javascript
// Check if block has loaded and been decorated
const blockLoaded = await page.waitForSelector('.block-name.block', {
  timeout: 5000
});
const hasLoadedClass = await page.locator('.block-name').evaluate(
  el => el.dataset.blockStatus === 'loaded'
);
```

**Validating Responsive Design:**
```javascript
// Test mobile viewport
await page.setViewport({ width: 375, height: 667 });
await page.screenshot({ path: 'mobile-view.png' });

// Test tablet viewport
await page.setViewport({ width: 768, height: 1024 });
await page.screenshot({ path: 'tablet-view.png' });

// Test desktop viewport
await page.setViewport({ width: 1920, height: 1080 });
await page.screenshot({ path: 'desktop-view.png' });
```

**Testing Accessibility:**
```javascript
// Check ARIA attributes
const ariaLabel = await page.$eval('button',
  el => el.getAttribute('aria-label')
);
console.log('Button aria-label:', ariaLabel);

// Test keyboard navigation
await page.keyboard.press('Tab');
const focusedElement = await page.evaluate(() =>
  document.activeElement.className
);
console.log('Focused element:', focusedElement);
```

**Measuring Performance:**
```javascript
// Measure LCP and other metrics
const metrics = await page.evaluate(() => {
  return new Promise(resolve => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries[entries.length - 1];
      resolve({
        lcp: lcpEntry.renderTime || lcpEntry.loadTime,
        url: lcpEntry.url
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  });
});
console.log('LCP:', metrics.lcp);
```

**Testing Interactive Features:**
```javascript
// Test form submission
await page.type('input[name="email"]', 'test@example.com');
await page.click('button[type="submit"]');
await page.waitForSelector('.success-message');

// Test accordion/dropdown behavior
await page.click('.accordion-button');
const isOpen = await page.$eval('.accordion-panel',
  el => !el.hidden
);
console.log('Panel is open:', isOpen);
```

### Best Practices for Playwright Validation

1. **Always validate after making changes**: Run Playwright tests before committing code
2. **Test multiple viewports**: Ensure responsive design works across all breakpoints
3. **Capture screenshots**: Visual evidence helps identify layout and styling issues
4. **Test user interactions**: Click, type, and navigate as a user would
5. **Check console errors**: Monitor browser console for JavaScript errors
6. **Validate accessibility**: Test keyboard navigation and screen reader attributes
7. **Measure performance**: Ensure changes don't negatively impact load times
8. **Clean up**: Always close the browser and clean up resources

### Playwright Installation

If Playwright is not already installed, add it to the project:
```bash
pnpm add -D playwright
```

Alternatively, use the **microsoft/playwright-mcp** MCP Server for browser automation without local installation (recommended). Configure the MCP server in `.vscode/mcp.json`:

```json
{
  "servers": {
    "microsoft/playwright-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### Cypress QA Automation Testing

This project uses Cypress for end-to-end QA automation testing. Cypress tests validate complete user workflows and integration across the entire application.

**When to Use Cypress:**
- Full user journey testing (e.g., product search → add to cart → checkout)
- Multi-page workflows and navigation testing
- Integration testing across blocks and components
- Commerce functionality testing (cart, checkout, account management)
- Cross-browser compatibility testing

**Running Cypress Tests:**
```bash
# Open Cypress interactive test runner
pnpm run cypress:open

# Run Cypress tests headlessly
pnpm run cypress:run
```

**Cypress Test Location:**
- Tests are located in the `cypress/` directory
- See `cypress/README.md` for detailed Cypress testing documentation

**Writing Cypress Tests:**
- Write user-centric tests that validate complete workflows
- Use data-testid attributes for reliable element selection
- Keep tests independent and idempotent (can run in any order)
- Use Cypress best practices for waiting and assertions

**Relationship to Jest/Playwright:**
- **Jest**: Unit tests for individual functions and blocks
- **Playwright**: Quick validation during development
- **Cypress**: Comprehensive end-to-end QA automation

### Integration with Development Workflow

As an agent, integrate validation into your standard workflow:

1. **Create/modify code** (JS, CSS, HTML)
2. **Run linting**: `pnpm lint:fix`
3. **Run targeted tests**: Test only the files you modified (not full test suite)
   ```bash
   pnpm test path/to/your-modified-file.test.js
   ```
4. **Validate with Playwright**: Run automated tests for your specific changes
5. **Review results**: Check screenshots, console output, and test results
6. **Verify you haven't broken anything**:
   - Run linting on affected files: `pnpm lint`
   - Run tests for related/dependent code
   - Quick smoke test in browser for major changes
   - **NOTE**: You don't need to run full builds or complete test suites every time
   - Focus on validating your specific changes and their immediate dependencies
7. **Iterate**: Fix any issues discovered
8. **Commit**: Once validation passes and linting is clean

This validation approach ensures high-quality, functional code that meets project standards without unnecessary overhead.

### Unit Testing with Jest

This project uses Jest for unit testing JavaScript code in blocks, scripts, and tools.

**Running Tests:**
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

**Test File Location:**
Test files should be named with the `.test.js` suffix and placed alongside the code they test:
- `blocks/*/blockname.test.js` - Tests for block JavaScript
- `scripts/*.test.js` - Tests for utility scripts
- `tools/**/*.test.js` - Tests for tooling scripts

**Writing Tests:**
```javascript
import {
  describe, it, expect, beforeEach,
} from '@jest/globals';

describe('Block Name', () => {
  let block;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="my-block block">
        <!-- Block HTML structure -->
      </div>
    `;
    block = document.querySelector('.my-block');
  });

  it('should transform DOM correctly', async () => {
    const { default: decorate } = await import('./my-block.js');
    await decorate(block);

    expect(block.querySelector('.expected-element')).toBeTruthy();
  });

  it('should handle user interactions', async () => {
    const { default: decorate } = await import('./my-block.js');
    await decorate(block);

    const button = block.querySelector('button');
    button.click();

    expect(button.getAttribute('aria-expanded')).toBe('true');
  });
});
```

**Best Practices for Testing:**
1. **Test Behavior**: Focus on what the code does, not how it does it
2. **Mock Dependencies**: Mock imports like `aem.js` and `scripts.js` utilities
3. **Test Accessibility**: Verify ARIA attributes, keyboard navigation, semantic HTML
4. **Test Responsive Behavior**: Mock matchMedia to test different viewport sizes
5. **Test Edge Cases**: Test both happy paths and error conditions
6. **One Assertion Per Test**: Keep tests focused and easy to debug
7. **Use Coverage Reports**: Run `pnpm test:coverage` to identify untested code

**When to Write Tests:**
- When creating new blocks with complex JavaScript logic
- When creating utility functions in `scripts/` or `tools/`
- When fixing bugs (write a failing test first, then fix the code)
- When adding interactive features (forms, accordions, carousels, etc.)
- When implementing accessibility features that need validation

**Lessons Learned: Unit Testing Best Practices for High Coverage**

Based on extensive test development for this project (achieving 54%+ coverage across 599 tests), the following lessons learned will help you write comprehensive, maintainable tests:

**1. Mock Browser APIs at Module Level**
- **Always mock browser APIs before importing the module under test**
- Common APIs requiring mocks: `IntersectionObserver`, `HTMLDialogElement.showModal()`, `matchMedia`, `fetch`, `btoa`
- Place mocks at the top of your test file, before any imports

```javascript
// Mock IntersectionObserver before imports
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Then import your module
import { default: decorate } from './video.js';
```

**2. Handle Dynamic Imports Carefully**
- Blocks using dynamic imports (e.g., `await import()`) require special mocking
- Mock the imported module at the module level, not inside tests
- Use `jest.unstable_mockModule()` for ES modules or traditional `jest.mock()` for CommonJS

```javascript
// Mock a dynamically imported module
jest.unstable_mockModule('@dropins/storefront-personalization/containers/TargetedBlock.js', () => ({
  default: jest.fn(),
}));
```

**3. Test DOM Transformations Thoroughly**
- Verify the block transforms the initial HTML structure into the expected final structure
- Check for created elements, moved content, preserved attributes
- Test that Universal Editor instrumentation attributes (`data-aue-*`) are preserved

```javascript
it('should transform DOM structure correctly', async () => {
  await decorate(block);

  const ul = block.querySelector('ul');
  expect(ul).toBeTruthy();
  expect(ul.querySelectorAll('li').length).toBe(3);
  expect(block.querySelector('.original-div')).toBeFalsy(); // Old structure removed
});
```

**4. Mock Utility Functions from aem.js and scripts.js**
- Always mock imported utility functions like `createOptimizedPicture`, `readBlockConfig`, `loadFragment`
- Mock at module level with return values matching expected structure
- This isolates your block's logic from external dependencies

```javascript
jest.mock('../../scripts/aem.js', () => ({
  createOptimizedPicture: jest.fn((src, alt) => {
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    picture.appendChild(img);
    return picture;
  }),
  readBlockConfig: jest.fn(() => ({ /* mock config */ })),
}));
```

**5. Test Event Listeners and User Interactions**
- Verify event listeners are attached to the correct elements
- Simulate user interactions (clicks, keyboard events, form submissions)
- Check that interactions produce the expected DOM changes and state updates

```javascript
it('should toggle accordion on click', async () => {
  await decorate(block);

  const button = block.querySelector('button');
  const panel = block.querySelector('.accordion-panel');

  button.click();
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(panel.style.maxHeight).not.toBe('0px');
});
```

**6. Test Accessibility Attributes**
- Verify ARIA attributes are correctly set: `aria-expanded`, `aria-label`, `aria-controls`, `role`
- Check that semantic HTML is used appropriately
- Test keyboard navigation when applicable (Tab, Enter, Escape, Arrow keys)

```javascript
it('should set correct ARIA attributes', async () => {
  await decorate(block);

  const button = block.querySelector('button');
  expect(button.getAttribute('aria-expanded')).toBe('false');
  expect(button.getAttribute('aria-controls')).toBeTruthy();
  expect(button.getAttribute('role')).toBe('button');
});
```

**7. Test Edge Cases and Error Conditions**
- Empty blocks (no children)
- Missing configuration values
- Invalid data types
- Null/undefined values
- Malformed HTML structures
- Network failures (for blocks making API calls)

```javascript
it('should handle empty block gracefully', async () => {
  block.innerHTML = '';
  await expect(decorate(block)).resolves.not.toThrow();
});

it('should handle missing configuration', async () => {
  readBlockConfig.mockReturnValueOnce({});
  await decorate(block);
  // Verify default behavior
});
```

**8. Test Responsive Behavior with matchMedia**
- Mock `window.matchMedia` to test different viewport sizes
- Test mobile-first logic and breakpoint-specific behavior

```javascript
it('should apply mobile layout on small screens', async () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === '(min-width: 601px)',  // Mobile-first: test tablet breakpoint
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  await decorate(block);
  expect(block.classList.contains('tablet')).toBe(true);
});
```

**9. Use Descriptive Test Names**
- Test names should clearly describe what is being tested
- Use the pattern: "should [expected behavior] when [condition]"
- Group related tests in `describe` blocks

```javascript
describe('Video Block', () => {
  describe('Autoplay Functionality', () => {
    it('should autoplay video when autoplay attribute is set', async () => {
      // test implementation
    });

    it('should not autoplay video when autoplay attribute is missing', async () => {
      // test implementation
    });
  });
});
```

**10. Clean Up After Each Test**
- Use `beforeEach` to set up fresh DOM for each test
- Use `afterEach` to clean up mocks and restore original state
- Reset mock call counts between tests

```javascript
beforeEach(() => {
  document.body.innerHTML = '<div class="my-block block">...</div>';
  block = document.querySelector('.my-block');
  jest.clearAllMocks();
});

afterEach(() => {
  document.body.innerHTML = '';
});
```

**11. Test Configuration Parsing**
- For blocks using `readBlockConfig()`, test various configuration scenarios
- Verify default values when config keys are missing
- Test case sensitivity and data type conversions

```javascript
it('should parse configuration correctly', async () => {
  readBlockConfig.mockReturnValueOnce({
    type: 'carousel',
    interval: '5000',
    autoplay: 'true',
  });

  await decorate(block);
  // Verify configuration was applied correctly
});
```

**12. Test Async Operations and Promises**
- Use `async/await` for asynchronous block decoration
- Test loading states and error handling for async operations
- Mock `fetch` responses for blocks making API calls

```javascript
it('should handle API errors gracefully', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('API Error')));

  await decorate(block);
  expect(block.querySelector('.error-message')).toBeTruthy();
});
```

**13. Achieve High Coverage Through Systematic Testing**
- Start with the main `decorate()` function
- Test each helper function individually
- Test all branches (if/else, switch cases, ternary operators)
- Test loop iterations (empty arrays, single item, multiple items)
- Aim for 85-100% coverage per block

**14. Mock External Dependencies Minimally**
- Only mock what you need to isolate the unit under test
- Use real implementations when possible to test integration points
- Document why each mock is necessary

**15. Test Data Encoding and Transformations**
- For blocks that encode/decode data (btoa, atob, JSON.parse), test the transformations
- Verify whitespace handling, special characters, and empty strings

```javascript
it('should encode customer segments with btoa', () => {
  const result = prepareIds('segment1, segment2');
  expect(result).toEqual([btoa('segment1'), btoa('segment2')]);
});
```

**Coverage Achievements from These Practices:**
Following these lessons learned, this project achieved:
- 8 blocks enhanced with 91.6% average coverage
- 3 blocks with 100% coverage (carousel, form, targeted-block)
- 599 total tests passing (100% pass rate)
- 54.45% overall project coverage (from 38.53% baseline)
- Zero test failures across all test suites

**Reference Blocks for Examples:**
- `blocks/carousel/carousel.test.js` - 100% coverage, comprehensive event testing
- `blocks/form/form.test.js` - 100% coverage, form validation and submission
- `blocks/targeted-block/targeted-block.test.js` - 100% coverage, data encoding and personalization
- `blocks/modal/modal.test.js` - 89.74% coverage, dialog API and accessibility
- `blocks/video/video.test.js` - 96.2% coverage, media player interactions

See `TESTING.md` for comprehensive testing documentation and examples.

### Required Jest Testing for Agents

**CRITICAL: As an agent, you MUST write and maintain Jest tests for the following directories:**

1. **`./blocks/` - ALL block JavaScript files**
   - Every block's `.js` file MUST have a corresponding `.test.js` file
   - Test files should be placed in the same directory: `blocks/blockname/blockname.test.js`
   - Cover DOM transformations, event handlers, accessibility, and user interactions
   - Minimum coverage expectation: 70%+ statement coverage

2. **`./scripts/baici/` - Custom utility scripts**
   - All JavaScript files in `scripts/baici/` MUST have corresponding `.test.js` files
   - Test all exported functions and utilities
   - Mock external dependencies (aem.js, commerce.js, etc.)
   - Focus on unit testing individual functions

3. **`./tools/baici/` - Custom tooling scripts**
   - All JavaScript files in `tools/baici/` MUST have corresponding `.test.js` files
   - Test tool functionality, data transformations, and build processes
   - Mock file system and external API calls as needed

**Agent Testing Workflow:**

When creating or modifying JavaScript files in the above directories, follow this workflow:

1. **Write the test FIRST** (Test-Driven Development):
   ```bash
   # Create the test file
   touch blocks/my-block/my-block.test.js
   # Write failing tests that describe expected behavior
   # Run tests to confirm they fail
   pnpm test blocks/my-block/my-block.test.js
   ```

2. **Implement the code** to make tests pass

3. **Run tests locally**:
   ```bash
   # Watch mode during development
   pnpm test:watch

   # Final validation with coverage
   pnpm test:coverage
   ```

4. **Verify coverage meets minimum thresholds**:
   - Blocks: 70%+ statement coverage
   - Scripts/Tools: 80%+ statement coverage

5. **Run linting on test files** (CRITICAL - test files must pass linting):
   ```bash
   # Fix linting issues automatically
   pnpm lint:fix

   # Verify all linting passes
   pnpm lint
   ```
   **NOTE:** Test files (.test.js) are subject to the same linting rules as production code. Even if your tests pass, they will fail in CI/CD if they have linting errors. ALWAYS run linting on test files before declaring completion.

6. **Commit tests WITH the code** - Never commit code without tests

**Coverage Exclusions:**
- Files outside `blocks/`, `scripts/baici/`, and `tools/baici/` are excluded from coverage
- `scripts/aem.js` is excluded (core AEM library, never modify)
- Third-party code in `scripts/__dropins__/` is excluded

**CI/CD Integration:**
- All tests run automatically on push and pull requests
- PRs receive automated coverage reports as comments
- Tests must pass before code can be merged
- Coverage reports help reviewers assess code quality

**Failure to Write Tests:**
If you submit code without corresponding tests for files in the required directories, your PR will be rejected. Testing is not optional for agent-generated code.

### Linting
- JavaScript: ESLint with Airbnb base configuration
- CSS: Stylelint with standard configuration
- Run `pnpm lint` before committing
- Use `pnpm lint:fix` to automatically fix issues

### Performance
- Follow AEM Edge Delivery performance best practices https://www.aem.live/developer/keeping-it-100
- Images uploaded by authors are automatically optimized, all images and assets committed to git must be optimized and checked for size
- Use lazy loading for non-critical resources (`lazy-styles.css` and `delayed.js`)
- Minimize JavaScript bundle size by avoiding dependencies, using automatic code splitting provided by `/blocks/`
- Optimize drop-in components performance by following Adobe Commerce Storefront best practices
- Implement Adobe Commerce API optimization strategies to reduce API call latency and improve response times
- Use lighthouse-ci for automated performance testing and monitoring

### Accessibility

**CRITICAL: WCAG 2.1 AA compliance is mandatory for all deliverables**

- Ensure proper heading hierarchy (h1, h2, h3 in logical order)
- Include alt text for all images (decorative images should have empty alt="")
- Test with screen readers (VoiceOver on macOS, NVDA on Windows)
- Follow WCAG 2.1 AA guidelines without exception:
  - **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
  - **Keyboard navigation**: All interactive elements must be keyboard accessible
  - **Focus indicators**: Visible focus states on all interactive elements
  - **ARIA attributes**: Proper use of aria-label, aria-expanded, aria-controls, etc.
  - **Semantic HTML**: Use appropriate HTML5 elements (button, nav, main, article, etc.)
- Validate accessibility with automated tools (axe, Lighthouse accessibility audit)
- Manual testing with keyboard-only navigation is required

## Deployment

### Environments

Edge Delivery Services provides you with three environments. Your local development server at `http://localhost:3000` serves code from your local working copy (even uncommitted code) and content that has been previewed by authors. You can access this at any time when the development server is running.

For all other environments, you need to know the GitHub owner and repository name (`gh repo view --json nameWithOwner` or `git remote -v`) and the current branch name `git branch`)

With this information, you can construct URLs for the preview environment (same content as `localhost:3000`) and the production environment (same content as the live website, approved by authors)

- **Production Preview**: `https://main--{repo}--{owner}.aem.page/`
- **Production Live**: `https://main--{repo}--{owner}.aem.live/`
- **Feature Preview**: `https://{branch}--{repo}--{owner}.aem.page/`

### Publishing Process
1. Push changes to a feature branch
2. AEM Code Sync automatically processes changes making them available on feature preview environment for that branch
3. Open a pull request to merge changes to `main`
   1. in the PR description, include a link to https://{branch}--{repo}--{owner}.aem.page/{path}` with a path to a file that illustrates the change you've made. This is the same path you have been testing with locally. WITHOUT THIS YOUR PR WILL BE REJECTED
   2. If an existing page to demonstrate your changes doesn't exist, create test content as a static html file and ask the user for help copying it to a content page you can link in the PR
4. use `gh checks` to verify the status of code synchronization, linting, and performance tests
5. A human reviewer will review the code, inspect the provided URL and merge the PR
6. AEM Code Sync updates the main branch for production

## Common Tasks

### Adding New Blocks

**Follow Test-Driven Development (TDD) - Tests FIRST, then implementation:**

1. **Plan the Block**:
   - Define purpose, functionality, and expected behavior
   - Determine initial HTML structure (author contract)
   - Sketch final DOM structure after decoration
   - List all features, interactions, and edge cases

2. **Create Block Directory**:
   ```bash
   mkdir blocks/blockname
   ```

3. **Write Tests FIRST** (`blockname.test.js`):
   ```bash
   touch blocks/blockname/blockname.test.js
   # Write comprehensive failing tests
   pnpm test blocks/blockname/blockname.test.js
   ```
   - Test DOM transformation
   - Test event listeners and interactions
   - Test accessibility attributes
   - Test edge cases and error conditions
   - Verify tests fail (no implementation yet)

4. **Implement Block Files** (make tests pass):
   - `blockname.js` - JavaScript decoration logic
   - `_blockname.json` - Universal Editor configuration
   - `blockname.css` - Block styles
   - Run `pnpm test:watch` and iterate until all tests pass

5. **Validate Coverage and Quality**:
   ```bash
   pnpm test --coverage blocks/blockname/blockname.test.js  # Ensure 85-100%
   pnpm lint:fix  # Fix any linting issues
   ```

6. **Validate with Playwright**:
   - Test in local development environment
   - Verify responsive design across viewports
   - Check accessibility with keyboard navigation
   - Capture screenshots for visual verification

7. **Update Documentation** (if needed):
   - Add block to project documentation
   - Document any special configuration or usage notes

**Remember: NO IMPLEMENTATION CODE until tests are written and failing!**

### Modifying Existing Blocks

**Follow Test-Driven Development (TDD) when modifying blocks:**

1. **Write Tests for New Behavior FIRST**:
   - Add failing tests to `blockname.test.js` that describe the new/changed behavior
   - Run tests to confirm they fail: `pnpm test blockname.test.js`
   - This ensures you understand what you're trying to achieve

2. **Make Changes to Block Files**:
   - Modify `blockname.js`, `blockname.css`, or `_blockname.json` as needed
   - Run tests in watch mode: `pnpm test:watch blockname.test.js`
   - Iterate until all tests (old and new) pass

3. **Verify Coverage**:
   ```bash
   pnpm test --coverage blocks/blockname/blockname.test.js
   ```
   - Ensure coverage remains 85-100%
   - Add tests for any uncovered code paths

4. **Test Locally**:
   - Start development server: `pnpm --package=@adobe/aem-cli dlx aem up --no-open`
   - Ensure responsive behavior across devices using mobile-first approach (375px, 768px, 1280px, 1920px)
   - Validate with Playwright if making significant changes

5. **Run Linting**:
   ```bash
   pnpm lint:fix  # Fix issues automatically
   pnpm lint      # Verify all linting passes
   ```

6. **Commit Changes**:
   - Commit tests WITH the implementation code
   - Never commit implementation changes without corresponding tests

### Global Style Changes
1. Modify files in the `styles/` directory
2. Test across different blocks and pages
3. Ensure changes don't break existing layouts
4. Consider impact on performance, especially CLS

## Troubleshooting

### Getting Help

**AEM Edge Delivery Services:**
- Check [AEM Edge Delivery documentation](https://www.aem.live/docs/)
- Review [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Universal Editor Tutorial](https://www.aem.live/developer/ue-tutorial)
- Consult [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
- Consider the rules in [David's Model](https://www.aem.live/docs/davidsmodel)
- Search the web with `site:www.aem.live`
- Search the full text of the documentation with `curl -s https://www.aem.live/docpages-index.json | jq -r '.data[] | select(.content | test("KEYWORD"; "i")) | "\(.path): \(.title)"'`

**Block Development:**
- [AEM Block Collection](https://www.aem.live/developer/block-collection) - Browse pre-built blocks
- [Creating Blocks](https://www.aem.live/developer/universal-editor-blocks) - Universal Editor block guide
- [Content Modelling](https://www.aem.live/developer/component-model-definitions) - JSON configuration guide
- [Markup, Sections, Blocks](https://www.aem.live/developer/markup-sections-blocks) - Content structure
- [Web Performance](https://www.aem.live/developer/keeping-it-100) - Performance best practices

**Block Collection Repositories:**
- [aem-block-collection-xwalk](https://github.com/adobe-rnd/aem-block-collection-xwalk/tree/main/blocks) - Universal Editor-ready blocks
- [aem-boilerplate-xcom](https://github.com/adobe-rnd/aem-boilerplate-xcom/) - Commerce-specific blocks

**Adobe Commerce:**
- [Multi-Store Setup Documentation](https://experienceleague.adobe.com/developer/commerce/storefront/setup/configuration/multistore-setup)
- [Drop-In Components Installation Guides](https://experienceleague.adobe.com/developer/commerce/storefront/dropins/all/installing/)
- [Adobe Commerce Storefront Drop-In Components Documentation](https://experienceleague.adobe.com/developer/commerce/storefront/dropins/all/introduction/)

## Security Considerations

- Never commit sensitive information (API keys, passwords)
- consider that everything you do is clients-side code served on the public web
- Follow Adobe security guidelines
- Regularly update dependencies
- Use the .hlxignore file to prevent filed from being served
- Implement Adobe Commerce API security best practices for all API integrations
- Configure CORS properly for drop-in components to ensure secure cross-origin requests
- Implement rate limiting considerations for API calls to prevent abuse and ensure system stability

## Technical Debt Management

**CRITICAL: Maintain a Technical Debt Tracker**

This project uses `TECH_DEBT.md` to track technical debt as a living checklist. All agents MUST maintain this file.

### TECH_DEBT.md Structure

The file should be organized with two MAJOR sections:

```markdown
# Technical Debt

## 🤖 AGENT Recommended

Technical debt identified by AI agents during development. These are optional improvements that could enhance code quality, performance, or maintainability.

### Performance Optimizations
- [ ] Lazy load images in hero block for faster LCP
- [ ] Implement service worker for offline support

### Code Quality
- [ ] Refactor carousel.js to reduce function complexity
- [ ] Extract common form validation logic into shared utility

### Accessibility
- [ ] Add skip navigation links for keyboard users
- [ ] Improve focus management in modal dialogs

## 👤 USER Requested

Technical debt explicitly requested by users to be tracked for future implementation.

### Feature Enhancements
- [ ] Add multi-language support
- [ ] Implement product comparison feature

### Bug Fixes
- [ ] Fix intermittent cart quantity update issue
- [ ] Address mobile menu animation glitch
```

### When to Add Technical Debt

**AGENT Recommended:**
- At the end of completing a user-requested task
- When you identify improvements but they're out of scope
- When you discover code smells or refactoring opportunities
- When you find performance optimization opportunities
- When accessibility could be enhanced beyond minimum requirements

**USER Requested:**
- When the user explicitly asks to track something for later
- When requirements are deferred to a future iteration
- When bugs are acknowledged but deprioritized

### Best Practices

1. **Be Specific**: Each item should be actionable and clearly defined
2. **Categorize**: Use MINOR subsections (Performance, Code Quality, Accessibility, etc.) as lists grow
3. **Prioritize**: More critical items should appear first in each section
4. **Update Regularly**: Check off completed items, remove irrelevant ones
5. **Recommend Wisely**: Only add items that provide real value, not trivial nitpicks
6. **Present to User**: After completing a task, show the user any new technical debt recommendations

### Example Recommendation Flow

After completing a task:
```
✅ Task completed: Implemented product carousel block

💡 Technical Debt Recommendations:

I've identified the following optional improvements that could be added to TECH_DEBT.md:

1. **Performance**: Implement intersection observer for lazy loading carousel images
2. **Accessibility**: Add keyboard shortcuts for carousel navigation (Home/End keys)
3. **Code Quality**: Extract carousel animation logic into reusable utility

Would you like me to add these to TECH_DEBT.md?
```

## Contributing

- Use the skills system before every task: run `.agents/skills/using-skills/find-skills [pattern]`, read applicable skills, announce usage, and follow them exactly.
- Follow the universal 7-step workflow and keep task plans/current work logs updated; create and maintain `.agents/plans/` documents for complex or multi-phase efforts.
- Consult the project knowledge base in `.agents/project-knowledge/` before requirements or implementation work and cite relevant standards in deliverables.
- Apply the GitHub Spec-Kit workflow (`/specify`, `/plan`, `/tasks`, `/implement`) for substantive features or infrastructure updates and link the resulting specs in pull requests.
- Follow established code style and testing practices: practice TDD with >=70% coverage, run `pnpm lint`, `pnpm test`, and `pnpm test:coverage`, and fix all issues locally before opening a PR.
- Run a PSI check on your branch and resolve performance regressions before requesting review.
- Update documentation for significant changes and capture recommended follow-ups in `TECH_DEBT.md`.
- **Use Proper Branch Naming**: `KAINI1-[number]` for features and `setup-[description]` for infrastructure/tooling branches.
