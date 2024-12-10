import os
import sys
import time


def parse(data: list[str]) -> tuple[list[str], int, int]:
    for row, line in enumerate(data):
        col = line.find("^")
        if col != -1:
            break

    return data, row, col


def neighbor(data: list, row: int, col: int, direction: str) -> tuple:
    row += -1 if direction in "^" else 1 if direction in "v" else 0
    col += -1 if direction in "<" else 1 if direction in ">" else 0
    return (
        (data[row][col], row, col)
        if 0 <= row < len(data) and 0 <= col < len(data[0])
        else (None, None, None)
    )


def turn_right(dir: str) -> str:
    dirs = "^>v<"
    return dirs[(dirs.find(dir) + 1) % 4]


def solve1(data: tuple[list[str], int, int]) -> set:
    map, row, col = data
    dir = "^"

    visited = set([(row, col)])
    while True:
        value, new_row, new_col = neighbor(map, row, col, dir)
        if value is None:
            return visited
        elif value == "#":
            dir = turn_right(dir)
        else:
            row, col = new_row, new_col
            visited.add((row, col))


def solve2(data: tuple[list[str], int, int], path: set) -> int:
    map, start_row, start_col = data

    result = 0

    for r, c in path:
        if r == start_row and c == start_col:
            continue

        row, col = start_row, start_col
        dir = "^"
        cache = set([(row, col, dir)])

        while True:
            value, new_row, new_col = neighbor(map, row, col, dir)
            if value is None:
                break
            elif value == "#" or (new_row == r and new_col == c):
                dir = turn_right(dir)

                # Only cache and check when hit obstacle
                cache_item = new_row, new_col, dir
                if cache_item in cache:
                    result += 1
                    break

                cache.add(cache_item)
            else:
                row, col = new_row, new_col

    return result


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)
    path = solve1(data)
    result1 = len(path)
    result2 = solve2(data, path)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 4903)
    print(f"{DAY} Part 2", result2, result2 == 1911)
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
