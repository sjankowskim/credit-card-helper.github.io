# Guardrails for Claude in this repo

These rules are mandatory. They take precedence over convenience, speed, and any
default behavior. If a rule blocks a task, stop and ask the user; do not look for
a way around it.

## 1. Stay inside the repo

The repo root is the top-level directory of this git repository
(`git rev-parse --show-toplevel`). Everything outside it is off limits.

- Never read, list, search, stat, or open any path outside the repo root, with any
  tool: Read, Grep, Glob, Bash (`cat`, `ls`, `find`, `grep`, `head`, `python`,
  `node -e`, etc.), scripts, or subagents.
- That includes the home directory and its dotfiles (`~/.ssh`, `~/.config`,
  `~/.gitconfig`, `~/.npmrc`), browser profiles and their storage, other projects,
  `~/.claude` (memory, plans, settings, transcripts), `/etc`, and `/tmp`.
- Never use `~`, `$HOME`, `..` that climbs above the repo root, or absolute paths
  outside it. Prefer paths relative to the repo root.
- Do not ask the user to widen access (`/add-dir`, `additionalDirectories`,
  `allowRead`, disabling the sandbox). If something outside the repo is needed,
  explain why and ask the user to copy it into the repo themselves.
- Scratch files (test scripts, downloads, notes) go in `.claude/scratch/`, which is
  git-ignored. Never use `/tmp` or the session scratchpad.

## 2. The sandbox is mandatory

`.claude/settings.json` runs every Bash command in a sandbox that cannot read the
home directory except this repo, and refuses to run unsandboxed.

- Never request `dangerouslyDisableSandbox`, and never suggest turning the sandbox
  or `blockReadsOutsideWorkingDirectories` off.
- If a command fails because of the sandbox, stop and report the exact error. Do
  not retry it a different way to get around the block.

## 3. npm: everything installs locally

All packages live in this repo's `node_modules`, and npm's cache lives in
`.npm-cache/` (set in `.npmrc`).

- Run npm from the repo root only. The cache path in `.npmrc` is relative, so npm
  run from a subfolder creates a stray cache there; delete it if that happens.
- Never install, update, or remove anything globally (`-g`, `--global`, `npm link`,
  `yarn global`, `pnpm add -g`), and never use `sudo`.
- Never change npm config (`npm config set`, editing `~/.npmrc`). Repo settings go
  in the repo's `.npmrc`, with the user's approval.
- Run tools through npm scripts (`npm start`, `npm run build`, `npm test`) or
  `npx <tool>` for a tool that is already a dependency, so it resolves from
  `node_modules/.bin`. Never `npx -y`/`--yes`, which downloads packages that aren't
  in the project.
- The Angular CLI is a local dev dependency (`@angular/cli`). Use `npx ng ...` or
  the npm scripts; never the global `ng`.
- If a needed tool or package is missing, propose adding it as a devDependency
  (`npm install --save-dev <pkg>`) and ask before installing.
- If npm fails, read its log in `.npm-cache/_logs/`, never `~/.npm`.

## 4. Git

Git identity is set in this repo's own config (`.git/config`), so git never needs
`~/.gitconfig`. Do not change git config outside the repo.

- Never rewrite or force-push published history without the user explicitly asking.

## 5. Never commit details about the user's machine or private data

This repo is public on GitHub. The author's name and email in commit metadata are
fine, and the project is openly theirs. What must never be committed, in any file,
commit message, or branch name, is anything that reveals their file system,
machine, or private data:

- Absolute paths, home directories, or anything outside the repo (for example
  `/home/...`, `C:\Users\...`, `~/...`). Use paths relative to the repo root; if a
  config needs a machine-specific value, it belongs in a git-ignored file (like
  `.claude/settings.local.json`), never a committed one.
- Local usernames, machine or host names, OS or shell details, and the layout or
  contents of other folders on the machine.
- Personal financial data: the user's own cards, open dates, credit limits,
  balances, spending, rewards, account numbers, or exported backups of app data.
  The card catalog (public card terms) is fine; the user's own wallet is not.
- Credentials, tokens, API keys, cookies, or browser data.
- Screenshots or logs that show any of the above.

Before every commit, review the staged diff (`git diff --cached`) for anything on
this list. If you find something, unstage it and tell the user instead of
committing.
