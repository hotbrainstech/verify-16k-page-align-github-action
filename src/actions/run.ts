import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as path from 'path';
import * as fs from 'fs';

async function run(): Promise<void> {
  try {
    const fileInput = core.getInput('file', { required: true }).trim();
    const includeX86 = (core.getInput('include_x86') || 'false').trim().toLowerCase() === 'true';

    if (!fileInput) {
      core.setFailed("Input 'file' is required");
      return;
    }

    const apkPath = path.resolve(process.cwd(), fileInput);
    if (!fs.existsSync(apkPath)) {
      core.setFailed(`File not found: ${apkPath}`);
      return;
    }

    const args: string[] = ['--yes', 'verify-16k-page-align', apkPath];
    if (includeX86) {
      args.push('x86');
    }

    core.startGroup('verify-16k-page-align output');
    const exitCode = await exec.exec('npx', args);
    core.endGroup();

    if (exitCode !== 0) {
      core.setFailed(`verify-16k-page-align reported unaligned libraries (exit code ${exitCode}).`);
      return;
    }

    core.info('All required libraries are 16KB page-aligned.');
  } catch (err: any) {
    core.setFailed(`hotbrainstech/verify-16k-page-align-github-action failed with: ${err?.message || err}`);
  }
}

if (require.main === module) {
  run();
}
