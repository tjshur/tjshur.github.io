# CS370-SNHU

This project was originally completed for CS 370 at SNHU and was later enhanced for CS 499: Computer Science Capstone.

## Original CS 370 Project

For this project, I worked on a pirate intelligent agent that had to learn how to move through a maze and reach the treasure. Some of the project files were already provided, including the maze environment, the experience replay class, the neural network model setup, and the general structure of the notebook. Those pieces gave the agent a world to move through, a way to store past experiences, and a model that could learn from training.

The main code I created was the deep Q-learning training logic. I completed the algorithm that allowed the pirate to choose actions, balance exploration and exploitation, store experiences, train from those experiences, and improve over time. The goal was not to manually tell the pirate every move to make. The goal was to let it learn a successful path by receiving rewards and penalties from the environment. By the end, the agent was able to reach a 100 percent win rate and pass the completion check.

Computer scientists solve problems by designing systems that can process information, make decisions, and produce useful results. That matters because software is now part of almost every industry, from construction and manufacturing to healthcare, finance, defense, transportation, and entertainment. A good computer scientist is not just writing code to make something run. They are also thinking about whether the solution is reliable, maintainable, secure, and useful for the people who will actually use it.

This course helped me see that artificial intelligence is not just one broad idea. Different AI methods fit different types of problems. Neural networks can help identify patterns. Reinforcement learning can help an agent improve through feedback. In this project, the problem was not just "find the path." The real challenge was creating a system where the agent could learn from experience and make better decisions over time.

When I approach a problem as a computer scientist, I try to break it down into smaller pieces first. For this project, that meant understanding the maze, the possible actions, the reward system, the training process, and how the model was being evaluated. Once the problem is broken down, it becomes easier to test one part at a time and figure out what is actually going wrong. That kind of approach matters because guessing at code usually creates more problems than it solves.

My ethical responsibilities are to both the end user and the organization. For the end user, the system should be understandable, fair, and safe to use. If an AI system gives a result, the user should have some idea of what the system is doing and where its limits are. In a real-world setting, that would mean being careful about overreliance, bad recommendations, biased training data, or unclear results.

For the organization, my responsibility is to build software that is dependable and does not create unnecessary risk. That includes protecting data, testing the system, documenting the work, and being honest about what the system can and cannot do. AI can be useful, but it should not be treated like magic. It still depends on the quality of the data, the design of the model, the reward structure, and the judgment of the people using it.

## CS 499 Algorithms and Data Structures Enhancement

For CS 499, I expanded the original Treasure Hunt artifact by implementing A* search as a deterministic pathfinding alternative to the existing deep Q-learning solution. The purpose of the enhancement was to apply a different algorithmic approach to the same maze navigation problem and evaluate the tradeoffs between the two methods.

The A* implementation is contained in `AStarSolver.py`. It uses a priority queue to determine which maze state should be evaluated next, cumulative path cost to track the distance already traveled, Manhattan distance as the heuristic estimate to the treasure, and predecessor tracking to reconstruct the final path after the target is reached.

The enhanced notebook evaluates A* using the same maze and valid starting-position criteria used by the original deep Q-learning completion check. A* was tested from all 50 valid starting positions and successfully reached the treasure from every position.

### A* Test Results

- Starting positions: 50
- Successful paths: 50
- Success rate: 100 percent
- Average path length: 15.64 moves
- Average nodes expanded: 33.76
- Average search time: approximately 0.000048 seconds

The original deep Q-learning solution and A* use very different approaches. Deep Q-learning requires a training process where the agent learns from repeated interaction with the environment before using the trained model to make navigation decisions. A* does not require training. Instead, it performs a new search each time a starting position is supplied.

Not every performance measurement could be compared directly because the original CS 370 artifact did not record average path length, inference time, or the number of navigation decisions made by the trained model. The enhanced artifact therefore uses the preserved deep Q-learning results together with the additional measurements collected from the A* implementation rather than estimating measurements that were not recorded.

## Enhanced Project Files

- `Shurilla_Tyler_TreasureHuntGame_Enhanced.ipynb` - Original Treasure Hunt notebook with the CS 499 A* enhancement and algorithm comparison
- `AStarSolver.py` - A* pathfinding implementation
- `TreasureMaze.py` - Maze environment used by the project
- `GameExperience.py` - Experience replay support used by the deep Q-learning implementation
- `requirements.txt` - Python dependencies for the enhanced project

The enhanced artifact was tested using Python 3.11 and the package versions listed in `requirements.txt`.