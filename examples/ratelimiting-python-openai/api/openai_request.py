import os
import openai
from upstash_redis import Redis

redis = Redis.from_env()


def complete_story():
    story = redis.get("story")

    print("Current story:" + story)

    response = openai.ChatCompletion.create(
        api_key=os.environ["OPENAI_API_KEY"],
        model = "gpt-3.5-turbo",
        messages =[{"role":"user", "content":f"""You are the Story Generator 
        3000, a machine designed to 
        find words to advance stories. You have the ability to return 
        just a single word 
        that fits to the given story. Your task is returning single word. 
        Remember, you can only response with one word in a single line. The 
        story: {story}"""}]

    )

    new_word = response.choices[0].message.content
    print("New word:" + new_word)

    advanced_story = story +" "+ new_word
    print("Advanced story:" + advanced_story)

    redis.set("story", advanced_story)

    return advanced_story

