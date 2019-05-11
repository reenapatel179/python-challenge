import os
import pandas as pd
import csv


Date = []
MonthTotal = []
Diff = []

MonthCount = 0
total = 0
current_diff = 0
counter = 0
sumchange = 0
MaxChange = 0
MinChange = 0
MaxDate = ""
MinDate = ""


csvpath = os.path.join('.', 'Resources', 'budget_data.csv')

with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')

    # Read the header row first (skip this step if there is now header)
    csv_header = next(csvreader)

    for row in csvreader:

        Date.append(row[0])

        MonthTotal.append(float(row[1]))

        total = total + float(row[1])

    MonthCount = len(Date)      

    for diff in MonthTotal:
        if counter <= 0:
            counter = int(counter) +1

        else:
            current_diff = float(MonthTotal[counter]) - float(MonthTotal[counter-1])
            Diff.append(current_diff)

            sumchange = sumchange + current_diff
            counter = counter + 1

        if MaxChange < current_diff:
            MaxChange = current_diff
            MaxDate = Date[counter - 1]

        
        elif MinChange > current_diff:
             MinChange = current_diff
             MinDate = Date[counter - 1]


    
    # print(Date)
    # print(MonthTotal)
    print(f'{total}')
    print(f'{MonthCount}')
    # print(Diff)
    print(sumchange/85)
    print(MaxChange)
    print(MinChange)
    print(MaxDate)
    print(MinDate)

    with open("Output.txt", "w") as text_file:
        text_file.write("Total Months: " + str(MonthCount))
        text_file.write("Total : " + str(total))
        text_file.write("Average Change: " + str((sumchange/85)))
        text_file.write("Greatest Increase in Profits: " + (MaxDate)  + " " + str(MaxChange) )
        text_file.write("Greatest decrease in Profits: " + (MinDate)  + " " + str(MinChange) )

    text_file.close()









    
    

    
    
    # for row  in csvreader:
        
    #     test = {"Date":row[0],"Profit":row[1]}

    # print(sum(test["Profit"]))

       





# # Test your function with the following:
# print(averages([1, 5, 9]))
# print(averages(range(11)))


# output_path = os.path.join("..", "output", "new.csv")

# # Open the file using "write" mode. Specify the variable to hold the contents
# with open(output_path, 'w', newline='') as csvfile:
    