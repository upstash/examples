const Queue = require("bull");

const settings = {
  // lockDuration: 30000, // Key expiration time for job locks.
  // lockRenewTime: 15000, // Interval on which to acquire the job lock
  // maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
  // retryProcessDelay: 5000, // delay before processing next job in case of internal error.
  // backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
  stalledInterval: 300000, // How often check for stalled jobs (use 0 for never checking).
  guardInterval: 300000, // Poll interval for delayed jobs and added jobs.
  drainDelay: 300, // A timeout for when the queue is in drained state (empty waiting for jobs).
};
const videoQueue = new Queue("video transcoding", "YOUR_REDIS_URL", { settings: settings });

videoQueue
  .process(function (job, done) {
    console.log(job.data);
    done();
  })
  .catch((err) => {
    console.log(err);
  });

videoQueue.add({ video: "http://example.com/video111.mov" });
videoQueue.add({ video: "http://example.com/video222.mov" });
videoQueue.add({ video: "http://example.com/video333.mov" });
