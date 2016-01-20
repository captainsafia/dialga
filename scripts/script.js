$(document).ready(function() {
    // Set up a full-sized canvas
    var canvas = $('#game').get(0);
    $(canvas).css('width', $(document).width());
    $(canvas).css('height', $(document).width());

    // Configure WebGL on the canvas
    var rendering = getWebGLContext(canvas);
    if (!rendering) throw new Error('Failed to get rendering context');

    // Set canvas background
    rendering.clearColor(0, 0, 0, 1);    
    rendering.clear(rendering.COLOR_BUFFER_BIT);
});
