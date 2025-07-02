// Sprite Animation Plugin for Wick Editor
(function() {
    window.WickSpriteAnimation = function(config) {
        var clip = config.clip;
        var spriteSheetName = config.spriteSheetName;
        var frameWidth = config.frameWidth || 64;
        var frameHeight = config.frameHeight || 64;
        var columns = config.columns || 4;
        var rows = config.rows || 2;
        var fps = config.fps || 12;

        var totalFrames = columns * rows;
        var frameTime = 1000 / fps;
        var currentFrame = 0;
        var lastUpdate = Date.now();

        // Set Clip size
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

        // Control methods
        clip.startAnimation = function() {
            currentFrame = 0;
            lastUpdate = Date.now();
        };
        clip.stopAnimation = function() {
            clip.removeEvent('update');
        };
    };
})();
