const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function main() {
  const brainDir = '/Users/nickhnatovskyi/.gemini/antigravity-ide/brain';
  const skillsDir = '/Users/nickhnatovskyi/Projects/wepmcp/.agents/skills';
  const skillStats = {};

  // Initialize all known skills to 0
  if (fs.existsSync(skillsDir)) {
    const allSkills = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const skill of allSkills) {
      skillStats[skill] = 0;
    }
  }
  
  // Initialize global plugins if we care (e.g., modern-web-guidance)
  skillStats['modern-web-guidance'] = 0;
  skillStats['chrome-extensions'] = 0;

  if (!fs.existsSync(brainDir)) {
    console.error('Brain directory not found:', brainDir);
    return;
  }

  const conversationDirs = fs.readdirSync(brainDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'scratch')
    .map(dirent => dirent.name);

  for (const convId of conversationDirs) {
    const transcriptPath = path.join(brainDir, convId, '.system_generated', 'logs', 'transcript.jsonl');
    
    if (fs.existsSync(transcriptPath)) {
      const fileStream = fs.createReadStream(transcriptPath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of rl) {
        try {
          const step = JSON.parse(line);
          if (step.tool_calls && step.tool_calls.length > 0) {
            for (const tool of step.tool_calls) {
              if (tool.name === 'default_api:view_file' || tool.name === 'view_file') {
                const absolutePath = tool.arguments?.AbsolutePath || tool.args?.AbsolutePath || '';
                const match = absolutePath.match(/\/skills\/([^\/]+)\/SKILL\.md/);
                if (match) {
                  const skillName = match[1];
                  skillStats[skillName] = (skillStats[skillName] || 0) + 1;
                }
              }
            }
          }
        } catch (e) {
          // ignore parsing errors on individual lines
        }
      }
    }
  }

  console.log('--- HR STATS REPORT ---');
  // Sort by count descending
  const sortedStats = Object.entries(skillStats).sort((a, b) => b[1] - a[1]);
  for (const [skill, count] of sortedStats) {
    console.log(`- ${skill}: ${count} invocation(s)`);
  }
}

main().catch(console.error);
