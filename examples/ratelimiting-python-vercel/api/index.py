from http.server import BaseHTTPRequestHandler
from upstash_ratelimit.schema.response import RateLimitResponse
from upstash_ratelimit import RateLimit



r = RateLimit().fixed_window(
    max_number_of_requests=5,
    window=5,
    unit="s"
)

class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):

        ratelimit_response: RateLimitResponse = r.limit("global")
        if not ratelimit_response["is_allowed"]:
            self.send_response(429)
            self.send_header('Content-type','text/plain')
            self.end_headers()
            self.wfile.write('Rate limit exceeded'.encode('utf-8'))
            return
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write('Hello, world!'.encode('utf-8'))
        return
