const fileSystem = require('./node_modules/graceful-fs/graceful-fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");
const Shadow = require("./lib/shadow");

class Svg {
    constructor() {
        this.textComponent = '';
        this.shapeComponent = '';
        this.shadowComponent = '';
    }
    render() {
        return `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <defs>
        <filter id="dropShadow">
            ${this.shadowComponent}
        </filter>
    </defs>
    ${this.shapeComponent}
    ${this.textComponent}
</svg>`;
    }
    setTextElement(text, color) {
        this.textComponent = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }
    setShapeElement(shape) {
        this.shapeComponent = shape.render().replace('<', '<g filter="url(#dropShadow)">').concat('</g>');
    }
    setShadowElement(shadow) {
        this.shadowComponent = shadow.render();
    }
}

const query = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to (3) Characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
    {
        type: "confirm",
        name: "shadow",
        message: "Do you want a shadow?",
        default: false
    }
];

function writeToFile(fileName, data) {
    console.log("Writing [" + data + "] to file [" + fileName + "]");
    fileSystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function init() {
    console.log("Starting init");
    var svgString = "";
    var svg_file = "logo.svg";

    const answers = await inquirer.prompt(query);

    var user_text = "";
    if (answers.text.length > 0 && answers.text.length < 4) {
        user_text = answers.text;
    } else {
        console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
    }
    console.log("User text: [" + user_text + "]");
    user_font_color = answers["text-color"];
    console.log("User font color: [" + user_font_color + "]");
    user_shape_color = answers.shape;
    console.log("User shape color: [" + user_shape_color + "]");
    user_shape_type = answers["pixel-image"];
    console.log("User entered shape = [" + user_shape_type + "]");

    let user_shape;
    if (user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square();
        console.log("User selected Square shape");
    }
    else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle();
        console.log("User selected Circle shape");
    }
    else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Triangle();
        console.log("User selected Triangle shape");
    }
    else {
        console.log("Invalid shape!");
    }
    user_shape.setColor(user_shape_color);

    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);

    if (answers.shadow) {
        const shadow = new Shadow();
        svg.setShadowElement(shadow);
    }

    svgString = svg.render();

    console.log("Displaying shape:\n\n" + svgString);
    console.log("Shape generation complete!");
    console.log("Writing shape to file...");
    writeToFile(svg_file, svgString);
}

init();
