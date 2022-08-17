// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features

import { Socket, Server } from "net";

// needed in the renderer process.
const LED_COUNT = 100;
const LED_COUNT_TRIANGLE = 60;
// const LEDSTRIPS_COUNT= 4;
const BORDEROFFSET = 50;

// The port on which the server is listening.
const port = 8080;

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Server();
// Send a connection request to the server.

// The client can also receive data from the server by reading from its socket.
let applyToTriangleState = true;
let applyToMiddleState = true;
const drawTopLED = (stripIndex: number) => {
    const y = 0;
    for (let x = 0; x < LED_COUNT_TRIANGLE; x++) {
        const ledID = `${stripIndex}-${x}`;
        const panel = document.createElement("div");
        panel.style.width = "8px";
        panel.style.height = "8px";
        panel.style.backgroundColor = "green";
        panel.style.position = "absolute";
        panel.style.top = `${y + BORDEROFFSET}px`;
        panel.style.left = `${x * 10 + BORDEROFFSET + 200}px`;
        panel.id = ledID;
        document.getElementById("virtBody").append(panel);
    }
}

const drawLeftTriangleLED = (stripIndex: number) => {
    for (let x = 0; x < LED_COUNT_TRIANGLE; x++) {
        const ledID = `${stripIndex}-${x}`;
        const panel = document.createElement("div");
        panel.style.width = "8px";
        panel.style.height = "8px";
        panel.style.backgroundColor = "blue";
        panel.style.position = "absolute";
        panel.style.top = `${(x * 10 * 86 / 100) + BORDEROFFSET}px`;
        panel.style.left = `${(x * 10 * 50 / 100) + BORDEROFFSET + 200}px`;
        panel.id = ledID;
        document.getElementById("virtBody").append(panel);
    }
}

const drawRightTriangleLED = (stripIndex: number) => {
    for (let x = 0; x < LED_COUNT_TRIANGLE; x++) {
        const ledID = `${stripIndex}-${x}`;
        const panel = document.createElement("div");
        panel.style.width = "8px";
        panel.style.height = "8px";
        panel.style.backgroundColor = "red";
        panel.style.position = "absolute";
        panel.style.top = `${(x * 10 * 86 / 100) + BORDEROFFSET}px`;
        panel.style.left = `${800 - (x * 10 * 50 / 100) + BORDEROFFSET}px`;
        panel.id = ledID;
        document.getElementById("virtBody").append(panel);
    }
}

const drawMiddleLED = (stripIndex: number) => {
    const y = (300 * 86 / 100) - 40;
    for (let x = 0; x < LED_COUNT; x++) {
        const ledID = `${stripIndex}-${x}`;
        const panel = document.createElement("div");
        panel.style.width = "8px";
        panel.style.height = "8px";
        panel.style.backgroundColor = "purple";
        panel.style.position = "absolute";
        panel.style.top = `${y + BORDEROFFSET}px`;
        panel.style.left = `${x * 10 + BORDEROFFSET}px`;
        panel.id = ledID;
        document.getElementById("virtBody").append(panel);
        console.log(`Added ${ledID}`);
    }
}

const applyData = (stripIndex: number, data: Array<Array<number>>) => {
    for (let i = 0; i < data[0].length; i++) {
        const ledID = `${stripIndex}-${i}`;
        const panel = document.getElementById(ledID);
        if (panel) {
            panel.style.backgroundColor = `rgb(${data[0][i]}, ${data[1][i]}, ${data[2][i]})`;
        }
    }
}

const processData = (data: Array<Array<number>>) => {
    if (applyToMiddleState) {
        applyData(0, data);
    }
    if (applyToTriangleState) {
        const shortData = [];
        for (let i = 0; i < 3; i++) {
            shortData.push(data[i].slice(20, 80));
        }
        applyData(1, shortData);
        applyData(2, shortData);
        applyData(3, shortData);
    }

}

const initTCP = () => {
    // The server listens to a socket for a client to make a connection request.
    // Think of a socket as an end point.
    server.listen(port, function () {
        console.log(`Server listening for connection requests on socket localhost:${port}`);
    });

    // When a client requests a connection with the server, the server creates a new
    // socket dedicated to that client.
    server.on('connection', function (socket: Socket) {
        console.log('A new connection has been established.');
        // The server can also receive data from the client by reading from its socket.
        socket.on('data', function (chunk) {
            // console.log(`Data received from client: ${chunk.toString()}`);
            processData(JSON.parse(chunk.toString()));
        });

        // When the client requests to end the TCP connection with the server, the server
        // ends the connection.
        socket.on('end', function () {
            console.log('Closing connection with the client');
        });

        // Don't forget to catch error, for your own sake.
        socket.on('error', function (err) {
            console.log(`Error: ${err}`);
        });
    });
}

const clearStrip = (stripIndex: number) => {
    for (let i = 0; i < LED_COUNT; i++) {
        const ledID = `${stripIndex}-${i}`;
        const panel = document.getElementById(ledID);
        if (panel) {
            panel.style.backgroundColor = "black";
        }
    }
}

const initSettingsUI = () => {
    console.log("Start Settings UI")
    const applyToTriangleCheck = document.createElement("input");
    applyToTriangleCheck.type = "checkbox";
    applyToTriangleCheck.id = "applyToTriangle";
    applyToTriangleCheck.checked = applyToTriangleState;
    applyToTriangleCheck.style.display = "absolute"
    applyToTriangleCheck.style.top = "10px";
    applyToTriangleCheck.style.left = "20px";
    applyToTriangleCheck.name = "applyToTriangle";
    applyToTriangleCheck.onchange = () => {
        const box: any = document.getElementById('applyToTriangle')
        applyToTriangleState = box.checked;
        if (!applyToTriangleState) {
            clearStrip(1);
            clearStrip(2);
            clearStrip(3);
        }
        console.log(box.checked)
    }
    const applyToTriangleCheckLabel = document.createElement("label");
    applyToTriangleCheckLabel.htmlFor = "applyToTriangle";
    applyToTriangleCheckLabel.innerText = "Apply to Triangle";
    applyToTriangleCheckLabel.style.fontFamily = "sans-serif",
        applyToTriangleCheckLabel.style.color = "white";


    const appleToMiddleCheck = document.createElement("input");
    appleToMiddleCheck.type = "checkbox";
    appleToMiddleCheck.id = "applyToMiddle";
    appleToMiddleCheck.checked = applyToMiddleState;
    appleToMiddleCheck.style.display = "absolute"
    appleToMiddleCheck.style.top = "10px";
    appleToMiddleCheck.style.left = "20px";
    appleToMiddleCheck.name = "applyToMiddle";
    appleToMiddleCheck.onchange = () => {
        const box: any = document.getElementById('applyToMiddle')
        applyToMiddleState = box.checked;
        if (!applyToMiddleState) {
            clearStrip(0);
        }
        // console.log(box.checked)
    }
    const applyToMiddleCheckLabel = document.createElement("label");
    applyToMiddleCheckLabel.htmlFor = "applyToMiddle";
    applyToMiddleCheckLabel.innerText = "Apply to Middle";
    applyToMiddleCheckLabel.style.fontFamily = "sans-serif",
        applyToMiddleCheckLabel.style.color = "white";



    document.getElementById("virtBody").append(applyToTriangleCheck);
    document.getElementById("virtBody").append(applyToTriangleCheckLabel);
    document.getElementById("virtBody").append(appleToMiddleCheck);
    document.getElementById("virtBody").append(applyToMiddleCheckLabel);
}

const initUI = () => {
    console.log("Start UI")
    drawMiddleLED(0);
    drawTopLED(1);
    drawLeftTriangleLED(2);
    drawRightTriangleLED(3);
    initSettingsUI();
    initTCP();
}

document.addEventListener("DOMContentLoaded", function () {
    initUI();
})