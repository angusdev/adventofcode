import os
import time
import sys


def parse(lines: list[str]) -> list[list[int]]:
    return [list(map(int, line.strip().split())) for line in lines]


def is_safe(line: list[int], part: int) -> bool:
    def _order(i: int) -> int:
        return 1 if line[i] > line[i - 1] else -1 if line[i] < line[i - 1] else 0

    def _remove(i: int) -> list[int]:
        return line[:i] + line[i + 1 :]

    first_order = _order(1)
    for i in range(1, len(line)):
        order = _order(i)
        if order == 0 or order != first_order or abs(line[i] - line[i - 1]) > 3:
            if part == 1:
                return False
            # Part 2
            if i == len(line) - 1:
                return True
            # Only need to remove i, i-1 or i-2
            return (
                is_safe(_remove(i), part=1)
                or is_safe(_remove(i - 1), part=1)
                or is_safe(_remove(i - 2), part=1)
            )
    return True


def solve1(data: list[list[int]]) -> int:
    return sum(is_safe(line, part=1) for line in data)


def solve2(data: list[list[int]]) -> int:
    return sum(is_safe(line, part=2) for line in data)


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)

    result1 = solve1(data)
    result2 = solve2(data)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 564)
    print(f"{DAY} Part 2", result2, result2 == 604)
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
