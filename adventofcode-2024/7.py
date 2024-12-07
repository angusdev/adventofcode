import os
import sys
import time


def parse(data: list[str]) -> list[tuple[int, list[int]]]:
    return [
        (
            int(line.split(":")[0]),
            list(map(int, line.split(":")[1].split())),
        )
        for line in data
    ]


def solve(target: int, nums: list[int], part: int) -> bool:
    queue = [nums[0]]
    for num in nums[1:]:
        new_queue = []
        for new_num in queue:
            if new_num <= target:
                new_queue.append(new_num + num)
                new_queue.append(new_num * num)
                if part == 2:
                    new_queue.append(int(f"{new_num}{num}"))

        if len(new_queue) == 0:
            return False
        queue = new_queue

    return target in queue


def solve_optimzied(target: int, nums: list[int], part: int) -> bool:
    # Check in reverse order so can skip early for impossible cases
    target_queue = [target]
    for num in nums[:0:-1]:
        new_queue = []
        for new_target in target_queue:
            if num < new_target:
                new_queue.append(new_target - num)
            if new_target % num == 0:
                new_queue.append(new_target // num)
            if part == 2:
                # Remove suffix. If target = 45612, num is 12, new_target = 456
                # If suffix is not num, then it is impossible and stop here
                str_num = str(num)
                str_new_target = str(new_target)
                if (
                    len(str_new_target) > len(str_num)
                    and str_new_target[-len(str_num) :] == str_num
                ):
                    new_queue.append(int(str_new_target[0 : -len(str_num)]))
        if len(new_queue) == 0:
            return False
        target_queue = new_queue

    return nums[0] in target_queue


def solve1(data: list[tuple[int, list[int]]]) -> int:
    return sum(target for target, nums in data if solve(target, nums, part=1))


def solve2(data: list[tuple[int, list[int]]]) -> int:
    return sum(target for target, nums in data if solve(target, nums, part=2))


def main(lines: list[str]) -> None:
    start_time = time.time()

    data = parse(lines)
    result1 = solve1(data)
    result2 = solve2(data)

    end_time = time.time()

    print(f"{DAY} Part 1", result1, result1 == 882304362421)
    print(f"{DAY} Part 2", result2, result2 == 145149066755184)
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
