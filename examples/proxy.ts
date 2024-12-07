/*
 *  You can import this module by using:
 *     import EasyDl from "easydl";
 *                 or
 *    const EasyDl = require('easydl');
 */
import EasyDl from "../dist";

const dl = new EasyDl("https://ipinfo.io/json", ".tmp/proxy_result.json", {
  connections: 1,
  httpOptions: {
    headers: {
      "User-Agent": "EasyDL",
    },
  },
  maxRetry: 10,
  existBehavior: "overwrite",
  proxyURL: "YOUR_PROXY_URL",
})
  .on("metadata", (meta) => {
    console.log("download has been started");
    console.log("[metadata]", meta);
  })
  .on("progress", ({ total }) => {
    console.log("Progress:", total.percentage);
  })
  .on("retry", (retry) => {
    console.log(
      "an error occured when downloading chunk",
      retry.chunkId,
      ":",
      retry.error.message
    );
    console.log("[retry] retry attempt #", retry.attempt);
  })
  .on("build", (progress) => {
    console.log("merging files ...", progress.percentage, "%");
  })
  .on("end", () => {
    console.log("Download completed!");
  })
  .on("close", () => {
    console.log("easydl is closed and being destroyed.");
  })
  .start();
