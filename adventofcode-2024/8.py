import os
import sys
import time


def parse(data: list[str]) -> tuple:
    antennas: dict[str, list[tuple[int, int]]] = {}
    for r, row in enumerate(data):
        for c, char in enumerate(row):
            if char != ".":
                if char not in antennas:
                    antennas[char] = []
                antennas[char].append((r, c))

    return data, antennas


def solve(data: tuple, part: int) -> int:
    map, antennas = data

    height = len(map)
    width = len(map[0])

    antinodes = set()

    for _, locations in antennas.items():
        for antenna_1 in locations:
            for antenna_2 in locations:
                if antenna_1 == antenna_2:
                    continue

                if part == 2:
                    antinodes.add(antenna_1)
                    antinodes.add(antenna_2)

                r1, c1 = antenna_1
                r2, c2 = antenna_2

                while True:
                    r = 2 * r1 - r2
                    c = 2 * c1 - c2
                    if 0 <= r < height and 0 <= c < width:
                        antinodes.add((r, c))
                        r1, c1, r2, c2 = r, c, r1, c1
                    else:
                        break
                    if part == 1:
                        break

    return len(antinodes)


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)
    result1 = solve(data, part=1)
    result2 = solve(data, part=2)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 341)
    print(f"{DAY} Part 2", result2, result2 == 1134)
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
