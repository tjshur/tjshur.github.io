# Algorithms and Data Structures

## Treasure Hunt Game

The Treasure Hunt Game is an artificial intelligence project I originally developed in CS 370: Current and Emerging Trends in Computer Science. The original project uses deep Q-learning to train an intelligent agent to navigate a maze and reach a treasure while avoiding obstacles.

### Original Artifact

The original artifact represents the Treasure Hunt project before the CS 499 capstone enhancement.

[Download the Original Artifact](original/CS499_TreasureHunt_Original_Artifact.zip)

### Enhancement

For the Algorithms and Data Structures category of CS 499, I enhanced the project by adding an A* pathfinding algorithm and comparing its performance with the existing deep Q-learning approach.

The enhancement includes:

- A separate A* solver implementation
- Heuristic-based pathfinding through the existing maze environment
- Tracking of path length, nodes explored, execution time, and successful runs
- Repeatable testing across multiple maze runs
- Comparison between a deterministic search algorithm and the existing learning-based approach
- Additional documentation explaining the enhancement and testing process

A* successfully completed all 50 test runs. The average solution path was 15.64 steps, with an average of 33.76 nodes explored per run and an average execution time of approximately 0.000048 seconds.

The enhancement provides a direct comparison between two very different approaches to the same problem. The deep Q-learning agent learns through repeated interaction with the environment, while A* uses the known maze structure and a heuristic to calculate a path to the goal.

[Download the Enhanced Artifact](enhanced/CS499_TreasureHunt_Enhanced_Artifact.zip)

[View the Enhancement Narrative](CS499_TreasureHunt_Enhancement_Narrative.docx)

[View the Enhanced README](enhanced/source/README.md)

### Current Status

The Algorithms and Data Structures enhancement was completed and submitted for Milestone Three of CS 499. The completed artifact, source files, test results, and narrative are preserved on this branch in preparation for final ePortfolio publication.
