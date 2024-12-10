import os
import time
import sys


def parse(lines: list[str]) -> tuple[list[int], list[int]]:
    return tuple(map(sorted, zip(*[map(int, line.split()) for line in lines])))  # type: ignore


def solve1(data: tuple[list, list]) -> int:
    return sum(abs(a - b) for a, b in zip(*data))


def solve2(data: tuple[list, list]) -> int:
    return sum(n * data[1].count(n) for n in data[0])


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)

    result1 = solve1(data)
    result2 = solve2(data)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 1765812)
    print(f"{DAY} Part 2", result2, result2 == 20520794)
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
