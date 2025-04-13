import pandas as pd

def load_users(filepath='../data/synthetic_users.csv'):
    
    try:
        df = pd.read_csv(filepath)
       
        if 'interests' in df.columns and isinstance(df['interests'].iloc[0], str):
             # Use literal_eval for safe evaluation of string lists
             from ast import literal_eval
             df['interests'] = df['interests'].apply(literal_eval)
        return df
    except FileNotFoundError:
        print(f"Error: User data file not found at {filepath}")
        return None
    except Exception as e:
        print(f"Error loading user data: {e}")
        return None

def extract_hashtags(post_text_or_url_content):
    
    words = post_text_or_url_content.split()
    hashtags = {word.lower().strip('#,.!?;:') for word in words if word.startswith('#')}
    cleaned_hashtags = {tag for tag in hashtags if len(tag) > 0} 
    return cleaned_hashtags 