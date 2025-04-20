from mesa import Agent

class SocialMediaAgent(Agent):
    def __init__(self, unique_id, model, influence):
        super().__init__(unique_id, model)
        self.influence = influence
        self.reacted = False

    def step(self):
        if not self.reacted:
            if self.random.random() < self.influence:
                self.reacted = True
                self.model.reactions += 1
