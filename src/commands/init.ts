import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

interface InitOptions {
    antigravity?: boolean;
}

export function initSkill(name: string, options: InitOptions): void {
    const skillDir = path.join(process.cwd(), name);

    if (fs.existsSync(skillDir)) {
        console.error(chalk.red(`Error: Directory "${name}" already exists.`));
        process.exit(1);
    }

    try {
        fs.mkdirSync(skillDir, { recursive: true });

        // Create subdirectories
        fs.mkdirSync(path.join(skillDir, 'scripts'), { recursive: true });
        fs.mkdirSync(path.join(skillDir, 'references'), { recursive: true });

        let skillContent = '';

        if (options.antigravity) {
            skillContent = `---
name: ${name}
description: Optimized skill for Antigravity Agent
---

# ${name} Skill (Antigravity Optimized)

Detailed instructions for Antigravity Agent to perform ${name}.

## Capabilities
- Use \`run_command\` for shell execution
- Use \`view_file\` and \`replace_file_content\` for file manipulations
- Use \`search_web\` for external research

## Usage
When the user asks for "${name}", follow these steps:
1. Reference files in \`references/\`
2. Execute scripts in \`scripts/\` using \`run_command\`
`;
        } else {
            skillContent = `---
name: ${name}
description: Description of the ${name} skill
---

# ${name} Skill

Instructions for the AI agent on how to use this skill.

## How to use
1. Use the tools provided to achieve the goal.
2. Refer to documents in the \`references/\` folder.
`;
        }

        fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

        console.log(chalk.green(`\n✨ Skill "${name}" initialized successfully!`));
        console.log(chalk.cyan(`Path: ${skillDir}`));
        console.log(`Next steps:`);
        console.log(`1. Edit ${name}/SKILL.md to define instructions`);
        console.log(`2. Run: openskills install ./${name}`);
    } catch (error) {
        console.error(chalk.red(`Error: Failed to initialize skill: ${error instanceof Error ? error.message : error}`));
        process.exit(1);
    }
}
