import os
import re
import time
import sys


def parse(lines: list[str]) -> str:
    return "".join(lines)


def solve1(data: str) -> int:
    pattern = r"mul\((\d+)\s*,\s*(\d+)\)"
    matches = re.findall(pattern, data)
    return sum(int(a) * int(b) for a, b in matches)


def solve2(data: str) -> int:
    data = re.sub(r"don't\(\).*?do\(\)", "", data + "do()")
    return solve1(data)


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)

    result1 = solve1(data)
    result2 = solve2(data)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 170068701)
    print(f"{DAY} Part 2", result2, result2 == 78683433)
    runtime_ms = (end_time - start_time) * 1000
    print(f"{DAY}: {runtime_ms:.2f} ms")


if __name__ == "__main__":
    DAYNUM = os.path.basename(__file__).split(".")[0]
    DAY = f"Day {DAYNUM}"
    filename = sys.argv[1] if len(sys.argv) > 1 else f"{DAYNUM}.txt"
    try:
        with open(filename, "r") as file:
            data = file.read().splitlines()
            main(data)
    except FileNotFoundError:
        print(f"Error: The file {filename} does not exist.")
