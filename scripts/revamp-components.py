#!/usr/bin/env python3
"""Write Forge Ops UI revamp files. Usage: revamp-components.py [component-key|all]"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Import all file contents from embedded module
exec(open(ROOT / "scripts/revamp-files.py").read())

def write_component(key: str) -> bool:
    if key not in FILES:
        print(f"Unknown component: {key}")
        return False
    path = ROOT / FILES[key]["path"]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(FILES[key]["content"])
    return True

def main():
    if len(sys.argv) < 2 or sys.argv[1] == "all":
        for key in FILES:
            write_component(key)
        print(f"Wrote {len(FILES)} files")
    else:
        key = sys.argv[1]
        if write_component(key):
            print(f"Wrote {FILES[key]['path']}")

if __name__ == "__main__":
    main()
