import os
import csv

candidates = []
count = 0
vote_counts = []

csv_name = os.path.join("..", "Resources", "election_data.csv")
csv_path = os.path.join('raw_data',csv_name)

with open(csv_path, newline="") as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=",")

    line = next(csv_reader,None)

    for line in csv_reader:

        count = count + 1

        candidate = line[2]

    
        if candidate in candidates:
            candidate_index = candidates.index(candidate)
            vote_counts[candidate_index] = vote_counts[candidate_index] + 1
        
        else:
            candidates.append(candidate)
            vote_counts.append(1)

percentages = []
max_votes = vote_counts[0]
max_index = 0


for countcandidates in range(len(candidates)):
    vote_percentage = vote_counts[countcandidates]/(count*100)
    percentages.append(vote_percentage)

    if vote_counts[countcandidates] > max_votes:
        max_votes = vote_counts[countcandidates]
        print(max_votes)
        max_index = countcandidates
winner = candidates[max_index]


print(f"Total Votes: {count}")
for countcandidates in range(len(candidates)):
    print(f"{candidates[countcandidates]}: {percentages[countcandidates]}% ({vote_counts[countcandidates]})")
print("---------------------------")
print(f"Winner: {winner}")
print("---------------------------")
write_file = f"pypoll_Result.txt"
filewriter = open(write_file, mode = 'w')
filewriter.write("Election Results\n")
filewriter.write(f"Total Votes: {count}\n")
for countcandidates in range(len(candidates)):
    filewriter.write(f"{candidates[countcandidates]}: {percentages[countcandidates]}% ({vote_counts[countcandidates]})\n")

filewriter.close()