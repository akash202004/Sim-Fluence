from pydantic import BaseModel

class SimulationRequest(BaseModel):
    post_content: str
    platform: str
    followers: int
    num_agents: int = 100
    steps: int = 10

class SimulationResponse(BaseModel):
    reactions: int
    estimated_likes: int
    estimated_comments: int
    suggestions: list[str]
