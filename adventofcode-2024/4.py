import os
import sys
import time
from itertools import product


def parse(lines: list[str]) -> list[str]:
    return lines


def word(
    data: list[str], row: int, col: int, coords: list[tuple[int, int]]
) -> str | None:
    new_coords = [(row + r, col + c) for r, c in coords]
    if any(
        r < 0 or r >= len(data) or c < 0 or c >= len(data[r]) for r, c in new_coords
    ):
        return None
    return "".join(data[r][c] for r, c in new_coords)


def solve1(data: list[str]) -> int:
    coords = [
        [(0, n) for n in range(4)],
        [(n, 0) for n in range(4)],
        [(n, n) for n in range(4)],
        [(n, -n) for n in range(4)],
    ]
    return sum(
        1
        for r, c, d in product(range(len(data)), range(len(data[0])), coords)
        if word(data, r, c, d) in ["XMAS", "SAMX"]
    )


def solve2(data: list[str]) -> int:
    coords = [(0, 0), (1, 1), (2, 2), (0, 2), (2, 0)]
    return sum(
        1
        for r, c in product(range(len(data) - 2), range(len(data[0]) - 2))
        if word(data, r, c, coords) in ["MASMS", "MASSM", "SAMMS", "SAMSM"]
    )


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)

    result1 = solve1(data)
    result2 = solve2(data)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 2464)
    print(f"{DAY} Part 2", result2, result2 == 1982)
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
