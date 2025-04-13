import pandas as pd
from .utils import load_users 

def simulate_reach(user_df, post_hashtags):
   
    if user_df is None or post_hashtags is None or not post_hashtags:
        return 0, set() # Return 0 null 

    potential_viewers = set()
    post_hashtags_lower = {tag.lower().strip('#') for tag in post_hashtags} # Clean input hashtags

    for index, user in user_df.iterrows():
        user_interests_lower = {interest.lower() for interest in user['interests']}
        
        if not post_hashtags_lower.isdisjoint(user_interests_lower):
            potential_viewers.add(user['user_id'])
            

    estimated_reach = len(potential_viewers)
    return estimated_reach, potential_viewers

