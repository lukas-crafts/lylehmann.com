#!/usr/bin/env python3
"""
Normalize Azulverdoso image filenames to lowercase and update imports.
Run from repo root: python3 scripts/normalize_azul_images.py
"""

import os
import re
import shutil
import shlex
import subprocess
from pathlib import Path

REPO_ROOT = Path.cwd()
SRC_IMG = REPO_ROOT / "src" / "assets" / "images"
PUBLIC_IMG = REPO_ROOT / "public" / "assets" / "images"
BACKUP_DIR = Path("/tmp/azul_backup_python")
TEXT_EXTS = (".mdx", ".md", ".astro", ".js", ".ts", ".jsx", ".tsx")


def run(cmd, check=True):
    if isinstance(cmd, str):
        cmd = shlex.split(cmd)
    return subprocess.run(cmd, shell=False, check=check, capture_output=True, text=True)


def ensure_backup_dir():
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)


def find_variants():
    variants = []
    for d in (SRC_IMG, PUBLIC_IMG):
        if not d.exists():
            continue
        for p in d.iterdir():
            nm = p.name
            if re.search(r"(?i)azulverdoso", nm):
                variants.append(p)
    return variants


def safe_move(src: Path, dst: Path):
    dst_parent = dst.parent
    dst_parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_suffix(dst.suffix + ".tmp")
    if src.exists():
        shutil.copy2(src, tmp)
        if dst.exists():
            dst.unlink()
        tmp.rename(dst)


def normalize_files():
    canonical = {
        r"(?i)Azulverdoso-blog-hero.*": "azulverdoso-blog-hero.png",
        r"(?i)Azulverdoso-home-hero.*": "azulverdoso-home-hero.png",
        r"(?i)Azulverdoso-colors.*": "azulverdoso-colors.jpg",
    }

    for d in (SRC_IMG, PUBLIC_IMG):
        if not d.exists():
            continue
        for p in list(d.iterdir()):
            nm = p.name
            for pat, target in canonical.items():
                if re.fullmatch(pat, nm):
                    dst = d / target
                    shutil.copy2(p, BACKUP_DIR / p.name)
                    safe_move(p, dst)
                    break


def update_imports():
    tracked = run("git ls-files", check=True).stdout.splitlines()
    tracked_text = [Path(x) for x in tracked if x.endswith(TEXT_EXTS)]
    replacements = {
        "Azulverdoso-blog-hero.png": "azulverdoso-blog-hero.png",
        "Azulverdoso-home-hero.png": "azulverdoso-home-hero.png",
        "Azulverdoso-colors": "azulverdoso-colors",
    }
    for fp in tracked_text:
        try:
            text = fp.read_text(encoding="utf-8")
        except Exception:
            continue
        new = text
        for old, newname in replacements.items():
            new = re.sub(re.escape(old), newname, new)
        if new != text:
            fp.write_text(new, encoding="utf-8")


def git_stage_commit_push():
    run("git config core.ignorecase false", check=False)
    run("git add -A", check=False)
    diff = run("git diff --staged --quiet", check=False)
    if diff.returncode != 0:
        print("Staged changes detected. Please commit and push them manually.")
    else:
        print("No staged changes to commit.")
    run("git config --unset core.ignorecase", check=False)


def main():
    print("Backing up matching files to", BACKUP_DIR)
    ensure_backup_dir()
    variants = find_variants()
    print("Found variants:", [str(p) for p in variants])
    normalize_files()
    print("Updated filenames to canonical lowercase where applicable.")
    update_imports()
    print("Updated textual imports in tracked files.")
    git_stage_commit_push()
    print("Done. Trigger a Vercel redeploy (or 'Redeploy with cleared cache' in the dashboard).")


if __name__ == "__main__":
    main()
