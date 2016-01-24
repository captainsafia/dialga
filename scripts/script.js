// Vertex shader
var VSHADER_SOURCE =
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

// Global variables
var floatsPerVertex = 7;
var cylinderVertices, sphereVertices;

function makeCylinder() {
    var color = new Float32Array([1.0, 1.0, 1.0]);
    var topVertices = 16;
    var bottomRadius = 1.6;

    cylinderVertices = new Float32Array(((topVertices * 6) - 2) * floatsPerVertex);

    // Create the top cap of the cylinder
    for (v = 1, j = 0; v < 2 * topVertices; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            cylinderVertices[j] = 0.0;
            cylinderVertices[j + 1] = 0.0;
            cylinderVertices[j + 2] = 1.0;
            cylinderVertices[j + 3] = 1.0;
            cylinderVertices[j + 4] = color[0];
            cylinderVertices[j + 5] = color[1];
            cylinderVertices[j + 6] = color[2];
        } else {
            cylinderVertices[j] = Math.cos(Math.PI * (v - 1) / topVertices);
            cylinderVertices[j + 1] = Math.sin(Math.PI * (v - 1) / topVertices);
            cylinderVertices[j + 2] = 1.0;
            cylinderVertices[j + 3] = 1.0;
            cylinderVertices[j + 4] = color[0];
            cylinderVertices[j + 5] = color[1];
            cylinderVertices[j + 6] = color[2];
        }
    }

    // Create the wall of the cylinder
    for(v = 0; v < 2 * topVertices; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            cylinderVertices[j] = Math.cos(Math.PI * (v) / topVertices);
            cylinderVertices[j + 1] = Math.sin(Math.PI * (v) / topVertices);
            cylinderVertices[j + 2] = 1.0;
            cylinderVertices[j + 3] = 1.0;
            cylinderVertices[j + 4]= color[0];
            cylinderVertices[j + 5]= color[1];
            cylinderVertices[j + 6]= color[2];
        }
        else {
            cylinderVertices[j] = bottomRadius * Math.cos(Math.PI * (v - 1) / topVertices);
            cylinderVertices[j + 1] = bottomRadius * Math.sin(Math.PI * (v - 1) / topVertices);
            cylinderVertices[j + 2] =- 1.0;
            cylinderVertices[j + 3] = 1.0;
            cylinderVertices[j + 4] = color[0];
            cylinderVertices[j + 5] = color[1];
            cylinderVertices[j + 6] = color[2];
        }
    }

    // Create the bottom cap of the cylinder
    for(v = 0; v < (2 * topVertices - 1); v++, j += floatsPerVertex) {
        if(v%2==0) {
            cylinderVertices[j] = bottomRadius * Math.cos(Math.PI * (v) / topVertices);
            cylinderVertices[j + 1] = bottomRadius * Math.sin(Math.PI * (v) / topVertices);
            cylinderVertices[j + 2] =- 1.0;
            cylinderVertices[j + 3] = 1.0;
            cylinderVertices[j + 4] = color[0];
            cylinderVertices[j + 5] = color[1];
            cylinderVertices[j + 6] = color[2];
        }
        else {
            cylinderVertices[j] = 0.0;
            cylinderVertices[j + 1] = 0.0;
            cylinderVertices[j + 2] =- 1.0;
            cylinderVertices[j + 3] = 1.0;
            cylinderVertices[j + 4] = color[0];
            cylinderVertices[j + 5] = color[1];
            cylinderVertices[j + 6] = color[2];
        }
    }
}

function makeSphere() {
    var slices = 13;
    var sliceVertices = 27;
    var sliceAngle = Math.PI / slices;

    var color = new Float32Array([0.8, 0.3, 0.01, 1]);

    sphereVertices = new Float32Array(((slices * 2 * sliceVertices) - 2) * floatsPerVertex);

    var cos0 = 0.0;
    var sin0 = 0.0;
    var cos1 = 0.0;
    var sin1 = 0.0;

    var j = 0;
    var isLast = 0;
    var isFirst = 1;

    for(s = 0; s < slices; s++) {
        if(s == 0) {
            isFirst = 1;
            cos0 = 1.0;
            sin0 = 0.0;
        }
        else {
            isFirst = 0;
            cos0 = cos1;
            sin0 = sin1;
        }
        cos1 = Math.cos((s + 1) * sliceAngle);
        sin1 = Math.sin((s + 1) * sliceAngle);

        if(s == slices-1) isLast = 1;

        for(v = isFirst; v < 2 * sliceVertices - isLast; v++, j += floatsPerVertex) {
            if(v % 2 == 0) {
                sphereVertices[j] = sin0 * Math.cos(Math.PI * (v) /sliceVertices);
                sphereVertices[j + 1] = sin0 * Math.sin(Math.PI * (v) / sliceVertices);
                sphereVertices[j + 2] = cos0;
                sphereVertices[j + 3] = 1.0;
            }
            else {
                sphereVertices[j] = sin1 * Math.cos(Math.PI * (v - 1) / sliceVertices);
                sphereVertices[j + 1] = sin1 * Math.sin(Math.PI * (v - 1) / sliceVertices);
                sphereVertices[j + 2] = cos1;
                sphereVertices[j + 3] = 1.0;
            }
            if(s == 0) {
                sphereVertices[j + 4] = color[0];
                sphereVertices[j + 5] = color[1];
                sphereVertices[j + 6] = color[2];
            }
            else if (s == slices - 1) {
                sphereVertices[j + 4] = color[0];
                sphereVertices[j + 5] = color[1];
                sphereVertices[j + 6] = color[2];
            }
            else {
                sphereVertices[j + 4] = Math.random();
                sphereVertices[j + 5] = Math.random();
                sphereVertices[j + 6] = Math.random();
            }
        }
    }
}

function initVertexBuffer(rendering) {
    makeCylinder();
    makeSphere();

    var totalSize = cylinderVertices.length + sphereVertices.length;
    var totalVertices = totalSize / floatsPerVertex;
    var colorShapes = new Float32Array(totalSize);

    for(i = 0, j = 0; j < cylinderVertices.length; i++, j++) {
        colorShapes[i] = cylinderVertices[j];
    }

    for(j = 0; j < sphereVertices.length; i++, j++) {
        colorShapes[i] = sphereVertices[j];
    }

    var shapeBufferHandle = rendering.createBuffer();
    if (!shapeBufferHandle) {
        console.log('Failed to create the shape buffer object!');
        return false;
    }

    rendering.bindBuffer(rendering.ARRAY_BUFFER, shapeBufferHandle);
    rendering.bufferData(rendering.ARRAY_BUFFER, colorShapes, rendering.STATIC_DRAW);

    //Get graphics system's handle for our Vertex Shader's position-input variable:
    var a_Position = rendering.getAttribLocation(rendering.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position!');
        return -1;
    }

    var FSIZE = colorShapes.BYTES_PER_ELEMENT; // how many bytes per stored value?

    // Use handle to specify how to retrieve **POSITION** data from our VBO:
    rendering.vertexAttribPointer(
        a_Position,
        4,
        rendering.FLOAT,
        false,
        FSIZE * floatsPerVertex,
        0);
    rendering.enableVertexAttribArray(a_Position);

    // Get graphics system's handle for our Vertex Shader's color-input variable;
    var a_Color = rendering.getAttribLocation(rendering.program, 'a_Color');
    if(a_Color < 0) {
        console.log('Failed to get the storage location of a_Color!');
        return -1;
    }
    // Use handle to specify how to retrieve **COLOR** data from our VBO:
    rendering.vertexAttribPointer(
        a_Color,
        3,
        rendering.FLOAT,
        false,
        FSIZE * 7,
        FSIZE * 4);

    rendering.enableVertexAttribArray(a_Color);
    rendering.bindBuffer(rendering.ARRAY_BUFFER, null);

    return totalVertices;
}

$(document).ready(function() {
    // Set up a full-sized canvas
    var canvas = $('#game').get(0);
    $(canvas).css('width', $(document).width());
    $(canvas).css('height', $(document).height());

    // Configure WebGL on the canvas
    var rendering = getWebGLContext(canvas);
    if (!rendering) {
        throw new Error('Failed to get rendering context');
    }

    // Initialize buffers and shaders
    if (!initShaders(rendering, VSHADER_SOURCE, FSHADER_SOURCE)) {
        throw new Error('Failed to get rendering context');
    }

    // Draw the shapes on screen
    var vertices = initVertexBuffer(rendering);
    if (vertices < 0) {
        throw new Error('Failed to set the vertex information');
    }

    // Set canvas background
    rendering.clearColor(0.0, 0.0, 0.0, 1.0);
    rendering.enable(rendering.DEPTH_TEST);
    rendering.clear(rendering.COLOR_BUFFER_BIT);

    // Set up variables for matrix movements
    var u_ModelMatrix = rendering.getUniformLocation(rendering.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        throw new Error('Failed to get the storage location of u_ModelMatrix');
    }
});
