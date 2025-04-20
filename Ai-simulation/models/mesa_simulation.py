from mesa import Model
from mesa.time import RandomActivation
from .agent_model import SocialMediaAgent


class SocialMediaModel(Model):
    def __init__(self, num_agents):
        self.num_agents = num_agents
        self.schedule = RandomActivation(self)
        self.reactions = 0

        for i in range(self.num_agents):
            influence = self.random.random()
            agent = SocialMediaAgent(i, self, influence)
            self.schedule.add(agent)

    def step(self):
        self.schedule.step()
