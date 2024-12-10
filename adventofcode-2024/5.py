import os
import sys
import time
from functools import cmp_to_key


def parse(data: list[str]) -> tuple[list[str], list[list[int]]]:
    split_index = data.index("")
    page_order = data[:split_index]
    page_update_str = data[split_index + 1 :]
    page_update = [list(map(int, line.split(","))) for line in page_update_str]

    return page_order, page_update


def solve(data: tuple[list[str], list[list[int]]], part: int) -> int:
    page_order, page_update = data

    update_to_process = []
    for u in page_update:
        if all(f"{u[i]}|{u[i + 1]}" in page_order for i in range(len(u) - 1)):
            if part == 1:
                update_to_process.append(u)
        elif part == 2:
            update_to_process.append(
                sorted(
                    u,
                    key=cmp_to_key(lambda a, b: -1 if f"{a}|{b}" in page_order else 0),
                )
            )

    return sum(u[len(u) // 2] for u in update_to_process)


def solve1(data: tuple[list[str], list[list[int]]]) -> int:
    return solve(data, part=1)


def solve2(data: tuple[list[str], list[list[int]]]) -> int:
    return solve(data, part=2)


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)

    result1 = solve1(data)
    result2 = solve2(data)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 3608)
    print(f"{DAY} Part 2", result2, result2 == 4922)
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
