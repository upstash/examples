from flask import Flask
from upstash_ratelimit import RateLimit
from upstash_ratelimit.schema.response import RateLimitResponse
from openai_request import complete_story
from upstash_redis import Redis

redis = Redis.from_env()

r = RateLimit().fixed_window(
    max_number_of_requests=2,
    window=10,
    unit='s'
)

redis.set("story", "Once upon a time")
app = Flask(__name__)

@app.route('/')
def index():

    return "Ratelimit OpenAI requests!", 200, {"Content-type": "text/plain"}

@app.route('/openai')
def openai_request():
    ratelimit_response: RateLimitResponse = r.limit("openai")

    if not ratelimit_response["is_allowed"]:
        print("Rate limit exceeded")

        return "Rate limit exceeded", 429, {"Content-type": "text/plain"}

    story = complete_story()

    return story, 200, {"Content-type": "text/plain"}














