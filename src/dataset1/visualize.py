import pandas as pd
import matplotlib.pyplot as plt
import os


def plot_timing_data(csv_file, output_dir='graph'):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)

    # Assuming the CSV file has only one row, we extract it
    data = df.iloc[0]

    # Extract attributes (column names) and their values
    attributes = data.index
    values = data.values

    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Plotting the data
    plt.figure(figsize=(10, 6))
    plt.plot(attributes, values, marker='o', linestyle='-', color='b')

    # Adding labels and title
    plt.xlabel('Attributes')
    plt.ylabel('Values')
    plt.title('Timing Data Visualization')
    plt.grid(True)

    # Save the plot as a PNG file
    output_path = os.path.join(output_dir, 'timing_plot.png')
    plt.savefig(output_path)

    print(f"Plot saved as {output_path}")
