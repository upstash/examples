from http.server import BaseHTTPRequestHandler

from upstash_ratelimit.limiter import RateLimit
from upstash_ratelimit.schema.response import RateLimitResponse


rate_limit = RateLimit()
fixed_window = rate_limit.fixed_window(
    max_number_of_requests=5,
    window=5,
    unit="s"
)

class handler(BaseHTTPRequestHandler):
 
    async def do_GET(self):

        limited: RateLimitResponse = await fixed_window.limit("global")
        self.send_header('Content-type','text/plain')
        self.send_header('X-Ratelimit-Limit', limited["limit"])
        self.send_header('X-Ratelimit-Remaining', limited["remaining"])
        self.send_header('X-Ratelimit-Reset', limited["reset"])

        self.end_headers()
        if not request_result["is_allowed"]:
            self.send_response(429)
            self.wfile.write('Come back later!'.encode('utf-8'))
        else:
            self.send_response(200)
            self.wfile.write('Hello!'.encode('utf-8'))

        
        return