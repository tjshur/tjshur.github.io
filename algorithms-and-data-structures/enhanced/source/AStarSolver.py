import heapq
import time


class AStarSolver:
    """
    Finds a shortest path through the treasure maze using the A* search algorithm.

    The maze is represented as a NumPy array where 1 represents a navigable
    cell and 0 represents a blocked cell.
    """

    def __init__(self, maze):
        self.maze = maze
        self.rows, self.cols = maze.shape

    def heuristic(self, cell, goal):
        """
        Manhattan distance heuristic.

        Movement in the treasure maze is limited to up, down, left, and right,
        so Manhattan distance estimates the remaining distance without
        overestimating the cost.
        """
        row, col = cell
        goal_row, goal_col = goal

        return abs(row - goal_row) + abs(col - goal_col)

    def is_walkable(self, cell):
        """
        Returns True when a cell is inside the maze and is not blocked.
        """
        row, col = cell

        return (
            0 <= row < self.rows
            and 0 <= col < self.cols
            and self.maze[row, col] != 0
        )

    def get_neighbors(self, cell):
        """
        Returns valid neighboring cells in the four movement directions.
        """
        row, col = cell

        possible_neighbors = [
            (row - 1, col),  # Up
            (row + 1, col),  # Down
            (row, col - 1),  # Left
            (row, col + 1),  # Right
        ]

        return [
            neighbor
            for neighbor in possible_neighbors
            if self.is_walkable(neighbor)
        ]

    def reconstruct_path(self, came_from, current):
        """
        Reconstructs the completed path by following predecessor links
        backward from the treasure to the starting cell.
        """
        path = [current]

        while current in came_from:
            current = came_from[current]
            path.append(current)

        path.reverse()

        return path

    def solve(self, start, goal=None):
        """
        Runs A* search from start to goal.

        Returns:
            success:
                Whether a path to the treasure was found.

            path:
                Ordered list of maze cells from the start to the treasure.

            path_length:
                Number of moves in the completed path.

            nodes_expanded:
                Number of maze states removed from the priority queue and
                evaluated during the search.

            search_time:
                Time spent performing the search in seconds.
        """

        if goal is None:
            goal = (self.rows - 1, self.cols - 1)

        start = tuple(start)
        goal = tuple(goal)

        search_start = time.perf_counter()

        if not self.is_walkable(start) or not self.is_walkable(goal):
            return {
                "success": False,
                "path": [],
                "path_length": 0,
                "nodes_expanded": 0,
                "search_time": time.perf_counter() - search_start,
            }

        # Priority queue entries:
        # (estimated total cost, known path cost, cell)
        open_set = []

        start_cost = 0
        start_priority = start_cost + self.heuristic(start, goal)

        heapq.heappush(
            open_set,
            (start_priority, start_cost, start),
        )

        # Stores the best predecessor for each discovered cell.
        came_from = {}

        # Stores the lowest known cost from the start to each cell.
        g_score = {
            start: 0
        }

        nodes_expanded = 0

        while open_set:
            _, current_cost, current = heapq.heappop(open_set)

            # Ignore an older queue entry if a better route to this cell
            # has already been discovered.
            if current_cost != g_score.get(current):
                continue

            nodes_expanded += 1

            if current == goal:
                path = self.reconstruct_path(came_from, current)

                return {
                    "success": True,
                    "path": path,
                    "path_length": len(path) - 1,
                    "nodes_expanded": nodes_expanded,
                    "search_time": time.perf_counter() - search_start,
                }

            for neighbor in self.get_neighbors(current):
                tentative_cost = current_cost + 1

                if tentative_cost < g_score.get(neighbor, float("inf")):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_cost

                    estimated_total_cost = (
                        tentative_cost
                        + self.heuristic(neighbor, goal)
                    )

                    heapq.heappush(
                        open_set,
                        (
                            estimated_total_cost,
                            tentative_cost,
                            neighbor,
                        ),
                    )

        return {
            "success": False,
            "path": [],
            "path_length": 0,
            "nodes_expanded": nodes_expanded,
            "search_time": time.perf_counter() - search_start,
        }