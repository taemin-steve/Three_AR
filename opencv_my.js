function openCvReady() {
        cv["onRuntimeInitialized"] = () => {
          console.log('OpenCV.js version:',  cv.getBuildInformation());
        };
      }