import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

const SKILLS_WORKFLOW_PATH = '.agent/workflows/skills.md';

const WORKFLOW_CONTENT = `---
description: how to use installed skills
---

When the user asks you to perform a task that relates to an available skill (listed in AGENTS.md), you should:

1. Use \`npx openskills read <skill-name>\` to load the skill instructions.
2. Follow the instructions provided in the output.
3. Use the base directory provided in the output to resolve any relative paths to scripts or assets.

// turbo
To see what skills are currently available, you can run:
\`\`\`bash
npx openskills list
\`\`\`
`;

/**
 * Ensure Antigravity workflows are set up for skills
 */
export function syncAgentRules(): void {
    const workflowDir = join(process.cwd(), '.agent/workflows');
    const fullPath = join(process.cwd(), SKILLS_WORKFLOW_PATH);

    try {
        if (!existsSync(workflowDir)) {
            mkdirSync(workflowDir, { recursive: true });
        }

        writeFileSync(fullPath, WORKFLOW_CONTENT, 'utf-8');
        console.log(chalk.dim(`Updated ${SKILLS_WORKFLOW_PATH}`));
    } catch (error) {
        console.error(chalk.yellow(`Warning: Could not sync agent rules: ${error instanceof Error ? error.message : error}`));
    }
}
