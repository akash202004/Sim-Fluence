import argparse
from src.user_generator import generate_users, POSSIBLE_INTERESTS
from src.utils import load_users, extract_hashtags
from src.simulation import simulate_reach
import os


DEFAULT_USER_FILE = 'data/synthetic_users.csv'

def run_simulation(user_data_path, post_content):

    print(f"Loading user data from: {user_data_path}")
    user_df = load_users(user_data_path)
    if user_df is None:
        print("Could not load user data. Exiting.")
        return

    print(f"\nAnalyzing post content...")
    
    post_hashtags = extract_hashtags(post_content)
    if not post_hashtags:
        print("No hashtags found in the provided content.")
       
        estimated_reach = 0
        potential_viewers = set()
    else:
        print(f"Found hashtags: {post_hashtags}")
        print("\nRunning simulation...")
        estimated_reach, potential_viewers = simulate_reach(user_df, post_hashtags)

    total_users = len(user_df)
    reach_percentage = (estimated_reach / total_users) * 100 if total_users > 0 else 0

    print("\n--- Simulation Results ---")
    print(f"Total Simulated Users: {total_users}")
    print(f"Post Hashtags: {post_hashtags}")
    print(f"Estimated Reach (Users with matching interests): {estimated_reach}")
    print(f"Estimated Reach Percentage: {reach_percentage:.2f}%")
    
    print("\n--- Basic Suggestions ---")
    if not post_hashtags:
        print("- Add relevant hashtags to increase potential visibility.")
    else:
        print(f"- Used {len(post_hashtags)} hashtags.")
       
        common_interests_found = post_hashtags.intersection({i.lower() for i in POSSIBLE_INTERESTS})
        if common_interests_found:
             print(f"- Hashtags align with common simulated interests like: {common_interests_found}")
        else:
             print("- Consider broadening hashtags to match popular user interests.")
        print("- Analyze hashtag popularity (requires external tools/data).")
        print("- Ensure content quality is high to encourage engagement beyond initial view.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Simulate Social Media Post Reach")
    parser.add_argument("--generate", action="store_true", help="Generate new synthetic user data.")
    parser.add_argument("--users", type=str, default=DEFAULT_USER_FILE, help="Path to the synthetic user CSV file.")
    parser.add_argument("--post", type=str, required=False, help="Text content of the post (including #hashtags).")

    args = parser.parse_args()

    user_file_path = args.users

    if args.generate:
        print("Generating new user data...")
        # Ensure the data directory exists
        data_dir = os.path.dirname(user_file_path)
        if data_dir and not os.path.exists(data_dir):
            os.makedirs(data_dir)
        generate_users(10000).to_csv(user_file_path, index=False)
        print(f"User data generated and saved to {user_file_path}")
      
        if not args.post:
             exit() 

    if not os.path.exists(user_file_path) and not args.generate:
         print(f"Error: User file '{user_file_path}' not found. Use --generate to create it.")
    elif args.post:
        run_simulation(user_data_path=user_file_path, post_content=args.post)
    elif not args.generate:
         print("Please provide post content using the --post argument to run a simulation.")