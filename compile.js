const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const destDir = `${os.homedir()}/gcloud-launcher`;
const path = require('path')

var data = [
  {
    name: "GCP",
    icon: "Google Cloud Platform",
    url: "https://console.cloud.google.com/"
  },
  {
    name: "Google Cloud Platform",
    icon: "Google Cloud Platform",
    url: "https://console.cloud.google.com/"
  },
  {
    name: "App Engine",
    icon: "App Engine",
    url: "https://console.cloud.google.com/appengine"
  },
  {
    name: "GAE",
    icon: "App Engine",
    url: "https://console.cloud.google.com/appengine"
  },
  {
    name: "Cloud Run",
    icon: "Cloud Run",
    url: "https://cloud.google.com/run/"
  },
  {
    name: "Cloud Functions",
    icon: "Cloud Functions",
    url: "https://cloud.google.com/functions"
  }, 
  {
    name: "Kubernetes Engine",
    icon: "Kubernetes Engine",
    url: "https://console.cloud.google.com/kubernetes"
  },
  {
    name: "GKE",
    icon: "Kubernetes Engine",
    url: "https://console.cloud.google.com/kubernetes"
  },
  {
    name: "Compute Engine",
    icon: "Compute Engine",
    url: "https://console.cloud.google.com/compute"
  },
  {
    name: "Container Registry",
    icon: "GCR",
    url: "https://console.cloud.google.com/gcr"
  },
  {
    name: "BigTable",
    icon: "BigTable",
    url: "https://console.cloud.google.com/bigtable"
  },
  {
    name: "BigQuery",
    icon: "BigQuery",
    url: "https://console.cloud.google.com/bigquery"
  },
  {
    name: "Logging",
    icon: "Logging",
    url: "https://console.cloud.google.com/logs"
  },
  {
    name: "Monitoring",
    icon: "Monitoring",
    url: "https://console.cloud.google.com/monitoring"
  },
  {
    name: "Debug",
    icon: "Debugging",
    url: "https://console.cloud.google.com/debug"
  },
  {
    name: "Trace",
    icon: "Tracing",
    url: "https://console.cloud.google.com/traces"
  },
  {
    name: "Profiler",
    icon: "Profiler",
    url: "https://console.cloud.google.com/profiler"
  }
]

// Create destination folder
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

data.forEach((file, index) => {
  console.log("name:", file.name)
  console.log("icon: ", file.icon)
  console.log("url:", file.url)

  s = path.join(destDir, `${file.name}.url`)
  escapedShortcutPath = s.replace(/ /g, "\\\ ")
  console.log("escapedShortcutPath", escapedShortcutPath)

  i = path.join("icons", `${file.icon}.png`)
  escapedIconPath = i.replace(/ /g, "\\\ ")
  console.log("escapedIconPath", escapedIconPath)
  console.log("\n")


  // console.log(`${destDir}/${file.name}.url`)
  fs.writeFileSync(`${destDir}/${file.name}.url`, `[InternetShortcut]\nURL=${file.url}`);
  exec(`fileicon set ${escapedShortcutPath} ${escapedIconPath}`, function (error, stdout, stderr) {
    console.log(error || stdout);
    if (!error) {
      exec(`SetFile -a E ${escapedShortcutPath}`, function (error, stdout, stderr) {
        if (!error) {
          exec(`open ${destDir}`);
        }
      });
    }
  });
})




// // Create shortcuts
// files = fs.readdirSync('icons');
// files.forEach((file, index) => {
//   file = file.replace(/\.[^/.]+$/, "");
//   console.log(`Compiling ${file}`);
//   // const namespace = namespacesFixing[file] || file.toLowerCase();
//   // const url = urlsFixing[file] || `https://console.cloud.google.com/${namespace}`;
//   // name = 

//   console.log(url)

//   fs.writeFileSync(`${destDir}/${file}.url`, `[InternetShortcut]\nURL=${url}`);
//   exec(`fileicon set ${destDir}/${file}.url icons/${file}.png`, function (error, stdout, stderr) {
//     console.log(error || stdout);
//     if (!error) {
//       exec(`SetFile -a E ${destDir}/${file}.url`, function (error, stdout, stderr) {
//         if (!error && index === files.length - 1) {
//           exec(`open ${destDir}`);
//         }
//       });
//     }
//   });
// })
