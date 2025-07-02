// Sprite Animation Plugin for Wick Editor
(function() {
    // Sprite animation function
    window.WickSpriteAnimation = function(config) {
        var clip = config.clip; // Wick Editor Clip object
        var spriteSheetName = config.spriteSheetName; // Asset name (e.g., 'spritesheet_png')
        var frameWidth = config.frameWidth || 64; // Width of each frame
        var frameHeight = config.frameHeight || 64; // Height of each frame
        var columns = config.columns || 4; // Number of columns
        var rows = config.rows || 2; // Number of rows
        var fps = config.fps || 12; // Frames per second

        var totalFrames = columns * rows;
        var frameTime = 1000 / fps;
        var currentFrame = 0;
        var lastUpdate = Date.now();

        // Initialize Clip
        clip.width = frameWidth;
        clip.height = frameHeight;

        // Animation loop
        clip.onEvent('update', function() {
            var now = Date.now();
            if (now - lastUpdate >= frameTime) {
                currentFrame = (currentFrame + 1) % totalFrames;
                var col = currentFrame % columns;
                var row = Math.floor(currentFrame / columns);

                var spriteSheet = clip.getChildByName(spriteSheetName);
                if (spriteSheet) {
                    spriteSheet.x = -col * frameWidth;
                    spriteSheet.y = -row * frameHeight;
                }

                lastUpdate = now;
            }
        });

        // Optional: Start/stop methods
        clip.startAnimation = function() {
            currentFrame = 0;
            lastUpdate = Date.now();
        };
        clip.stopAnimation = function() {
            clip.removeEvent('update');
        };
    };
})();
