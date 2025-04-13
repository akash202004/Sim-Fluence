# src/user_generator.py

import pandas as pd
import numpy as np
import random
import os # Added import for os.path and os.makedirs

# Define potential interests/topics - EXPANDED LIST
POSSIBLE_INTERESTS = [
    # Technology & Programming
    'technology', 'ai', 'machine learning', 'data science', 'programming',
    'python', 'javascript', 'java', 'c++', 'web development', 'app development',
    'cloud computing', 'aws', 'azure', 'gcp', 'cybersecurity', 'blockchain',
    'networking', 'devops', 'open source', 'linux', 'database', 'sql', 'nosql',
    'iot', 'robotics', 'vr', 'ar',

    # Business & Finance
    'business', 'finance', 'investing', 'stocks', 'cryptocurrency', 'startups',
    'entrepreneurship', 'marketing', 'digital marketing', 'social media marketing',
    'seo', 'content marketing', 'sales', 'management', 'leadership', 'economics',
    'real estate', 'e-commerce', 'retail', 'hr', 'human resources', 'logistics',

    # Creative & Arts
    'art', 'design', 'graphic design', 'ui/ux', 'photography', 'videography',
    'music', 'music production', 'writing', 'blogging', 'copywriting', 'journalism',
    'film', 'animation', 'fashion', 'illustration', 'architecture',

    # Lifestyle & Hobbies
    'travel', 'food', 'cooking', 'baking', 'health', 'wellness', 'fitness',
    'yoga', 'meditation', 'mental health', 'gaming', 'esports', 'board games',
    'diy', 'crafts', 'gardening', 'pets', 'cars', 'movies', 'tv shows', 'books',
    'reading', 'sustainability', 'environment', 'volunteering', 'parenting',

    # Science & Education
    'science', 'physics', 'chemistry', 'biology', 'astronomy', 'mathematics',
    'education', 'learning', 'teaching', 'history', 'philosophy', 'psychology',
    'sociology',

    # News & Politics
    'news', 'politics', 'world news', 'current events',

    # Sports
    'sports', 'football', 'soccer', 'basketball', 'cricket', 'tennis', 'running',
    'hiking'
]

# Define activity levels (remains the same)
ACTIVITY_LEVELS = ['high', 'medium', 'low']

def generate_users(num_users=10000, max_interests_per_user=7): # Slightly increased max interests
    """Generates a DataFrame of synthetic users with expanded interests."""
    users = []
    print(f"Generating {num_users} users...") # Add progress indicator
    for i in range(num_users):
        user_id = f"user_{i+1}"
        # Assign a random number of interests
        # Ensure we don't request more interests than available if num_users is small
        max_possible = min(max_interests_per_user, len(POSSIBLE_INTERESTS))
        num_interests = random.randint(1, max_possible)
        interests = random.sample(POSSIBLE_INTERESTS, num_interests)
        # Assign a random activity level
        activity = random.choice(ACTIVITY_LEVELS)
        users.append({
            'user_id': user_id,
            'interests': interests, # Store as a list
            'activity_level': activity
            # Add more features if needed
        })
        # Optional: print progress periodically
        if (i + 1) % 1000 == 0:
            print(f"...generated {i+1}/{num_users} users")

    df = pd.DataFrame(users)
    print("User generation complete.")
    return df

if __name__ == "__main__":
    # Define the output path (relative to the script location)
    output_dir = '../data'
    output_filename = 'synthetic_users.csv'
    output_path = os.path.join(output_dir, output_filename)

    # Generate 10,000 users with the expanded interest list
    user_data = generate_users(10000)

    # Ensure the data directory exists
    if not os.path.exists(output_dir):
        print(f"Creating directory: {output_dir}")
        os.makedirs(output_dir)

    # Save to CSV
    print(f"Saving user data to {output_path}...")
    user_data.to_csv(output_path, index=False)
    print(f"Generated {len(user_data)} synthetic users and saved successfully.")
    print("\nSample data:")
    print(user_data.head())