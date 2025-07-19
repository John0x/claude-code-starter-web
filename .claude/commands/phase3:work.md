---
description: Implements the planned feature with systematic validation and E2E testing
---

# Work Phase - Implementation with Validation

**THIS IS THE ONLY PHASE WHERE CODE IMPLEMENTATION HAPPENS.** You are now in the work phase. Your goal is to implement the user's web app feature. This phase focuses on building, testing, and validating the planned functionality.

## Pre Setup
- !`rm -f .agent/phase/summary.md`


## Your Role
- Act as a senior developer who implements features systematically
- Use TodoWrite to track implementation progress
- Test thoroughly and follow the validation flow strictly
- Explain what you're doing in simple terms
- Validate that the implementation matches the plan

## Implementation Flow
1. **Setup**: If the planning phase was run in previous chat messages, use that context. Otherwise, read from @.agent/phase/plan.md to understand requirements, then create implementation todos
2. **Build**: Implement features step by step
3. **Validate**: After each completed task, run validation sequence
4. **Test**: Write E2E tests for new interactive functionality
5. **Verify**: Confirm the feature works as planned

## Implementation Guidelines
- Always use TodoWrite to track what you're building
- Implement one feature at a time
- After each completed task, run the validation sequence
- Use Playwright MCP sparingly - only when problems cannot be solved otherwise
- Write E2E tests that simulate real user interactions, not trivial assertions
- **Check .agent/docs for relevant documentation** before starting implementation:
  - Read @.agent/docs/index.md for an overview of available documentation
  - Check for topic-specific docs (e.g., polar.md for payments, supabase.md for backend)
  - Follow documented patterns and best practices for the relevant technology
  - Use documented setup procedures and environment configurations
- **Use parallel subagents extensively for research and analysis**:
  - Analyze existing codebase patterns before implementing new features
  - Research implementation approaches and best practices
  - Investigate documentation for libraries/frameworks being used
  - Look up solutions for errors or technical challenges
  - Analyze existing similar features to understand patterns

## Validation Sequence (After Each Task)
**MUST BE FOLLOWED IN ORDER - DO NOT CONTINUE IF ANY STEP FAILS:**

1. **Lint**: Run lint command
   - If fails: Fix all issues before continuing
   - If passes: Continue to next step

2. **Typecheck**: Run typecheck command
   - If fails: Fix all type errors before continuing
   - If passes: Continue to next step

3. **Build**: Run build command
   - If fails: Fix all build errors before continuing
   - If passes: Continue to next step

4. **E2E Tests**: Write and run E2E tests for new interactive functionality
   - **ONLY use E2E tests - no unit tests or other test types**
   - Tests should simulate real user stories
   - Run only tests related to changed functionality
   - Tests should focus on user interactions, not trivial assertions

## E2E Testing Guidelines
- **ONLY write E2E tests - no unit tests, integration tests, or other test types**
- Write tests that tell a story: "User logs in, creates a post, shares it"
- Avoid trivial tests like checking page titles or element visibility
- Test real user workflows and interactions
- Focus on the functionality you just implemented
- Run specific tests, not the entire test suite
- Use playwright for all testing needs

## Playwright MCP Usage
- **Use sparingly** - high context window cost
- Only use when problems cannot be solved otherwise
- Prefer writing proper E2E tests over MCP debugging
- When used, focus on specific issues not general testing

## Communication
- Explain what you're building in simple terms
- Show progress through TodoWrite updates
- Ask for feedback during implementation
- Confirm each major piece works before moving on

## End of Phase
When implementation is complete and all validations pass, **write a completion summary to `.agent/phase/summary.md`** including:

**Feature Overview:**
- Original problem solved and user needs addressed
- What was built and how it works
- Key user flows implemented

**Technical Implementation:**
- Key files and components created/modified
- Architecture decisions and patterns used
- Dependencies added or modified

**Testing and Validation:**
- E2E tests written and their coverage
- Validation steps completed successfully
- User scenarios tested

**Usage and Next Steps:**
- How to use the new feature
- Any setup or configuration required
- Known limitations or future improvements
- Suggestions for next features to build

This comprehensive summary captures the full journey from idea to implementation and provides context for future development cycles. Use `/phase:resume` to load this summary when starting a new feature that builds on this work.

Then summarize what was built and how to use it. The user can then start a new phase for additional features.

**REMEMBER:** This is the only phase where code implementation happens. Follow the validation sequence strictly after each task. Focus on functionality, testing, and user experience validation.

**STOP**: PRESENT THE USER WITH THE IMPLEMENTATION PLAN AND ASK FOR CONFIRMATION.