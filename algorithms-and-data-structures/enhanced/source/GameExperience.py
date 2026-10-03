import numpy as np


class GameExperience(object):

    # model = neural network model
    # target_model = target network used to calculate future Q-values
    # max_memory = number of episodes to keep in memory
    # discount = discount factor for future rewards

    def __init__(self, model, target_model, max_memory=100, discount=0.95):
        self.model = model
        self.target_model = target_model
        self.max_memory = max_memory
        self.discount = discount
        self.memory = list()
        self.num_actions = model.output_shape[-1]

    # Stores episodes in memory.
    def remember(self, episode):
        # episode = [envstate, action, reward, envstate_next, game_status]
        self.memory.append(episode)

        if len(self.memory) > self.max_memory:
            del self.memory[0]

    # Predicts Q-values using the primary network.
    def predict(self, envstate):
        return self.model.predict(envstate, verbose=0)[0]

    # Predicts future Q-values using the target network.
    def predict_target(self, envstate):
        return self.target_model.predict(envstate, verbose=0)[0]

    # Returns training inputs and targets from replay memory.
    def get_data(self, data_size=10):
        env_size = self.memory[0][0].shape[1]
        mem_size = len(self.memory)
        data_size = min(mem_size, data_size)

        inputs = np.zeros((data_size, env_size))
        targets = np.zeros((data_size, self.num_actions))

        samples = np.random.choice(
            range(mem_size),
            data_size,
            replace=False
        )

        for i, j in enumerate(samples):
            envstate, action, reward, envstate_next, game_status = self.memory[j]

            inputs[i] = envstate

            # Start with the primary network's current Q-values.
            targets[i] = self.predict(envstate)

            # Use the target network for the future-state estimate.
            q_sa = np.max(self.predict_target(envstate_next))

            if game_status != 'not_over':
                targets[i, action] = reward
            else:
                targets[i, action] = reward + self.discount * q_sa

        return inputs, targets