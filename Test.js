// Function to add a new clip to the WE timeline
function addClipToTimeline() {
  // Ensure that the project data and timeline are accessible
  if (!window.project || !project.timeline) {
    console.error("WE project timeline data not found.");
    return;
  }

  // Create a new clip object.
  // Adjust properties as necessary to match WE's internal structure.
  var newClip = {
    id: "clip_" + Date.now(), // Unique identifier
    name: "New Clip",         // Display name
    startFrame: 0,            // Starting frame (adjust as needed)
    endFrame: 24,             // Ending frame (e.g., a 1-second clip at 24fps)
    frames: []                // Array to hold frame data (initially empty)
  };

  // Add the new clip to the project's timeline array.
  project.timeline.push(newClip);
  console.log("Added new clip to timeline:", newClip);

  // Refresh the timeline view, if a refresh function is available.
  if (typeof refreshTimeline === "function") {
    refreshTimeline();
  } else {
    console.warn("No timeline refresh function found. The timeline may not update automatically.");
  }
}

// Function to create an overlay interface on top of WE
function createOverlayInterface() {
  // Prevent duplicate overlays by checking for an existing element
  if (document.getElementById("weOverlay")) {
    console.log("Overlay already exists.");
    return;
  }
  
  // Create the overlay container that covers the entire viewport
  var overlay = document.createElement("div");
  overlay.id = "weOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Semi-transparent background
  overlay.style.zIndex = "9999"; // Ensure it sits on top of everything
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  
  // Create an inner container for the interface content
  var container = document.createElement("div");
  container.style.backgroundColor = "#fff";
  container.style.padding = "20px";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  
  // Create a header for the interface
  var header = document.createElement("h3");
  header.innerText = "WE Editor Control Panel";
  
  // Create a button to add a new clip to the timeline
  var addClipButton = document.createElement("button");
  addClipButton.innerText = "Add Clip";
  addClipButton.style.marginRight = "10px";
  addClipButton.addEventListener("click", function() {
    addClipToTimeline();
  });
  
  // Create a button to close the overlay
  var closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", function() {
    document.body.removeChild(overlay);
  });
  
  // Append the header and buttons to the container
  container.appendChild(header);
  container.appendChild(addClipButton);
  container.appendChild(closeButton);
  
  // Append the container to the overlay, then the overlay to the document body
  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

// Example: Call this function at runtime to show the overlay interface.
createOverlayInterface();
