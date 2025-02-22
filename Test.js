// Function to create a new clip (from scratch) and add it to the specified layer's active frame in WE
window.createNewClipHere = function(ToLayer) {
  // Retrieve the active frame of the desired layer.
  // Adjust this if your WE project structure differs.
  let layers = project.timeline.getChildren('Layer');
  if (!layers || layers.length < ToLayer) {
    console.error("Layer " + ToLayer + " not found.");
    return;
  }
  let toFrame = layers[ToLayer - 1].activeFrame;
  
  // Create a new clip object with default properties.
  let newClip = {
    id: "clip_" + Date.now(),  // Unique identifier
    name: "New Clip",          // Clip display name
    _children: [],             // Array for any nested elements (paths, shapes, etc.)
    x: 0,                      // Default x position
    y: 0,                      // Default y position
    scaleX: 1,                 // Default horizontal scale
    scaleY: 1,                 // Default vertical scale
    rotation: 0,               // Default rotation (degrees)
    opacity: 1                 // Fully opaque
    // Add other properties as needed by WE
  };

  // Add the new clip to the active frame.
  toFrame.addChild(newClip);
  console.log("New clip created and added to the timeline:", newClip);
  
  // Optionally, if WE provides a function to refresh the timeline view, call it here:
  if (typeof refreshTimeline === "function") {
    refreshTimeline();
  }
  
  return newClip;
};

// Function to create an HTML overlay interface on top of WE
function createOverlayInterface() {
  // Prevent duplicate overlays by checking if one already exists
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
  overlay.style.zIndex = "9999"; // Ensure it sits above everything else
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  
  // Create an inner container for the interface content
  var container = document.createElement("div");
  container.style.backgroundColor = "#fff";
  container.style.padding = "20px";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  
  // Create a header/title for the interface
  var header = document.createElement("h3");
  header.innerText = "WE Editor Control Panel";
  
  // Create a button to add a new clip to the timeline
  var addClipButton = document.createElement("button");
  addClipButton.innerText = "Add New Clip";
  addClipButton.style.marginRight = "10px";
  addClipButton.addEventListener("click", function() {
    // For this example, add the new clip to layer 1.
    window.createNewClipHere(1);
  });
  
  // Create a button to close the overlay interface
  var closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", function() {
    document.body.removeChild(overlay);
  });
  
  // Assemble the interface elements
  container.appendChild(header);
  container.appendChild(addClipButton);
  container.appendChild(closeButton);
  
  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

// Call the function to display the overlay interface when needed.
createOverlayInterface();
