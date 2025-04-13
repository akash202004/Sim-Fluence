import pandas as pd
import numpy as np
import random

# Define potential interests/topics
POSSIBLE_INTERESTS = [
    'technology', 'ai', 'machine learning', 'data science', 'programming',
    'marketing', 'social media', 'finance', 'investing', 'startups',
    'business', 'art', 'design', 'photography', 'travel', 'food', 'health',
    'fitness', 'python', 'javascript', 'web development'
]

# Define activity levels
ACTIVITY_LEVELS = ['high', 'medium', 'low']

def generate_users(num_users=10000, max_interests_per_user=5):
    """Generates a DataFrame of synthetic users."""
    users = []
    for i in range(num_users):
        user_id = f"user_{i+1}"
        # Assign a random number of interests (between 1 and max_interests_per_user)
        num_interests = random.randint(1, max_interests_per_user)
        interests = random.sample(POSSIBLE_INTERESTS, num_interests)
        # Assign a random activity level
        activity = random.choice(ACTIVITY_LEVELS)
        users.append({
            'user_id': user_id,
            'interests': interests, # Store as a list
            'activity_level': activity
            # Add more features if needed (e.g., simulated network size)
        })
    df = pd.DataFrame(users)
    return df

if __name__ == "__main__":
  
    user_data = generate_users(10000) #10000 user making zod level user

    import os
    if not os.path.exists('../data'):
        os.makedirs('../data')

    # Save to CSV
    output_path = '../data/synthetic_users.csv'
    user_data.to_csv(output_path, index=False)
    print(f"Generated {len(user_data)} synthetic users and saved to {output_path}")
    print("\nSample data:")
    print(user_data.head())