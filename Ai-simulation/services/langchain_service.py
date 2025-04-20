from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate

def generate_suggestions(post_content: str) -> list[str]:
    prompt = PromptTemplate(
        input_variables=["content"],
        template="Given the post content: {content}, suggest 3 ways to improve engagement and reach. "
                 "Consider factors like timing, hashtags, and audience targeting."
    )
    llm = OpenAI(model="gpt-3.5-turbo", temperature=0.7)
    response = llm(prompt.format(content=post_content))
    return [suggestion.strip() for suggestion in response.split('\n') if suggestion.strip()]
