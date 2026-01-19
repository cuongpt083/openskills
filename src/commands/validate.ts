import fs from 'fs';
import chalk from 'chalk';
import { findSkill } from '../utils/skills.js';
import { normalizeSkillNames } from '../utils/skill-names.js';

const INCOMPATIBLE_TOOLS = [
    { name: 'Bash', replacement: 'run_command' },
    { name: 'ReadFile', replacement: 'view_file' },
    { name: 'WriteFile', replacement: 'write_to_file' },
    { name: 'LS', replacement: 'list_dir' },
];

export function validateSkill(skillNames: string[] | string): void {
    const names = normalizeSkillNames(skillNames);

    if (names.length === 0) {
        console.error(chalk.red('Error: No skill names provided'));
        process.exit(1);
    }

    for (const name of names) {
        const skill = findSkill(name);
        if (!skill) {
            console.error(chalk.red(`Error: Skill "${name}" not found.`));
            continue;
        }

        console.log(chalk.bold(`\nValidating skill: ${name}`));
        const content = fs.readFileSync(skill.path, 'utf-8');
        let issues = 0;

        for (const tool of INCOMPATIBLE_TOOLS) {
            if (content.includes(`${tool.name}(`) || content.includes(`\`${tool.name}\``)) {
                console.warn(chalk.yellow(`⚠️  Found reference to "${tool.name}". In Antigravity, use "${tool.replacement}" instead.`));
                issues++;
            }
        }

        if (issues === 0) {
            console.log(chalk.green('✅ No compatibility issues found.'));
        } else {
            console.log(chalk.cyan(`\nFound ${issues} suggestion(s) to improve Antigravity compatibility.`));
        }
    }
}
