#!/bin/bash
pwd=$(basename "$(pwd)")
year=$(echo "$pwd" | grep -oE '[0-9]+')

result="[Advent of Code 2015](https://adventofcode.com/2015)
---"

os_name=$(uname -s)
if [ "$os_name" == "Darwin" ]; then
  os_name=$(sw_vers -productName)
  os_version=$(sw_vers -productVersion)
  os_friendly_name=$(awk '/SOFTWARE LICENSE AGREEMENT FOR macOS/' '/System/Library/CoreServices/Setup Assistant.app/Contents/Resources/en.lproj/OSXSoftwareLicense.rtf' | awk -F 'macOS ' '{print $NF}' | awk '{print substr($0, 0, length($0)-1)}')
  cpu_model=$(sysctl -n machdep.cpu.brand_string)
  cpu_cores=$(sysctl -n hw.ncpu)
  total_ram=$(sysctl -n hw.memsize)
  total_ram="$((total_ram / (1024 * 1024 * 1024))) GB"
  node_version=$(node --version)

  result+="
Environment
- $cpu_model $cpu_cores Cores $total_ram Memory
- $os_name $os_friendly_name $os_version
- Node $node_version"
fi

result+="

| Day | Source | Input | LoC | Time | Part 1 | Part 2 |
|-|-|-|-:|-:|:-:|:-:|"

for file in $(ls -1 *.js | sort -n); do
  day="${file%%.*}"
  url="https://adventofcode.com/$year/day/$day"
  name=`curl -s $url | grep -o '<h2>[^<]*</h2>' | grep -o '\-\-\-.*\-\-\-' | sed 's/^--- //; s/ ---$//'`
  output=$(node $file)

  echo "$output" >&2

  loc=$(wc -l < $day.js | awk '{print $1}')
  part1=$(echo "$output" | grep -o 'Part 1 .* .*' | awk '{print $4}' | head -1)
  part2=$(echo "$output" | grep -o 'Part 2 .* .*' | awk '{print $4}' | head -1)
  time=$(echo "$output" | grep -o ':.*' | awk '{print $2}')

  if [ "$part1" = true ]; then
    part1="&#10003;"
  else
    part1="&#10007;"
  fi
  
  if [ "$part2" = true ]; then
    part2="&#10003;"
  elif [ "$part2" = false ]; then
    part2="&#10007;"
  fi

  time=$(echo "$time" | sed 's/\([0-9.]\)\([a-zA-Z]\)/\1 \2/g')

  line="[$name]($url) | [$day.js]($day.js) | [$day.txt]($day.txt) | $loc | $time | $part1 | $part2 |"
  result+="
$line"
done

echo "$result"

