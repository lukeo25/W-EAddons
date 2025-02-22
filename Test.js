function createOverlayInterface() {
  // Prevent duplicate overlays
  if (document.getElementById("wickOverlay")) {
    console.log("Overlay already exists.");
    return;
  }
  
  // Create the overlay container
  var overlay = document.createElement("div");
  overlay.id = "wickOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // semi-transparent background
  overlay.style.zIndex = "9999"; // make sure it's on top
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  
  // Create the inner container for your interface content
  var container = document.createElement("div");
  container.style.backgroundColor = "#fff";
  container.style.padding = "20px";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  
  // Create a header or title element
  var header = document.createElement("h3");
  header.innerText = "Custom Editor Interface";
  
  // Create a button that performs an editor action
  var actionBtn = document.createElement("button");
  actionBtn.innerText = "Trigger Editor Action";
  actionBtn.style.marginRight = "10px";
  actionBtn.addEventListener("click", function() {
    console.log("Editor action triggered");
    // Replace the following with any editor-specific function call
    // For example: WickEditor.changeSelectedColor("red");
  });
  
  // Create a button to close the overlay
  var closeBtn = document.createElement("button");
  closeBtn.innerText = "Close";
  closeBtn.addEventListener("click", function() {
    document.body.removeChild(overlay);
  });
  
  // Append the elements to the container
  container.appendChild(header);
  container.appendChild(actionBtn);
  container.appendChild(closeBtn);
  
  // Append the container to the overlay, then the overlay to the document
  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

// To create the interface at runtime, call the function:
createOverlayInterface();
