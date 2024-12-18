/*
 *  You can import this module by using:
 *     import EasyDl from "easydl";
 *                 or
 *    const EasyDl = require('easydl');
 */
import EasyDl from "../dist";

const dl = new EasyDl("https://proof.ovh.net/files/100Mb.dat", "/tmp/100MB", {
  connections: 10,
  httpOptions: {
    headers: {
      "User-Agent": "EasyDL",
    },
  },
  maxRetry: 10,
  existBehavior: "overwrite",
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
