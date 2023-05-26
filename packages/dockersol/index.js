"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dockerode_1 = require("dockerode");
var docker = new dockerode_1["default"]();
// Function to fetch Docker images
function fetchImages() {
    return __awaiter(this, void 0, void 0, function () {
        var images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, docker.listImages()];
                case 1:
                    images = _a.sent();
                    return [2 /*return*/, images];
            }
        });
    });
}
// Function to create and run a Docker container from an image
function createAndRunContainer(imageName, containerName, command) {
    return __awaiter(this, void 0, void 0, function () {
        var container;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, docker.createContainer({
                        Image: imageName,
                        name: containerName,
                        Cmd: command,
                        Tty: true
                    })];
                case 1:
                    container = _a.sent();
                    return [4 /*yield*/, container.start()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, container];
            }
        });
    });
}
// Function to fetch logs from a container
function fetchContainerLogs(containerId) {
    return __awaiter(this, void 0, void 0, function () {
        var container, logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = docker.getContainer(containerId);
                    return [4 /*yield*/, container.logs({ stdout: true, stderr: true })];
                case 1:
                    logs = _a.sent();
                    return [2 /*return*/, logs.toString('utf-8')];
            }
        });
    });
}
// Function to stop a container
function stopContainer(containerId) {
    return __awaiter(this, void 0, void 0, function () {
        var container;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = docker.getContainer(containerId);
                    return [4 /*yield*/, container.stop()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to get the status of a container
function getContainerStatus(containerId) {
    return __awaiter(this, void 0, void 0, function () {
        var container, containerInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = docker.getContainer(containerId);
                    return [4 /*yield*/, container.inspect()];
                case 1:
                    containerInfo = _a.sent();
                    return [2 /*return*/, containerInfo.State.Status];
            }
        });
    });
}
// Usage example
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var images, imageName, containerName, command, container, logs, status_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fetchImages()];
                case 1:
                    images = _a.sent();
                    console.log('Available Docker images:');
                    console.log(images);
                    imageName = 'your-image-name';
                    containerName = 'your-container-name';
                    command = ['npm', 'start'];
                    return [4 /*yield*/, createAndRunContainer(imageName, containerName, command)];
                case 2:
                    container = _a.sent();
                    console.log("Container ".concat(container.id, " created and running."));
                    return [4 /*yield*/, fetchContainerLogs(container.id)];
                case 3:
                    logs = _a.sent();
                    console.log("Container logs:\n".concat(logs));
                    return [4 /*yield*/, stopContainer(container.id)];
                case 4:
                    _a.sent();
                    console.log("Container ".concat(container.id, " stopped."));
                    return [4 /*yield*/, getContainerStatus(container.id)];
                case 5:
                    status_1 = _a.sent();
                    console.log("Container ".concat(container.id, " status: ").concat(status_1));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('An error occurred:');
                    console.error(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
main();
