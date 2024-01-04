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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
function fetchItem(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, { response: response, data: data }];
            }
        });
    });
}
function awaitStatus(response, expectedStatus, errorMessage) {
    if (response.status === expectedStatus) {
        return messageReturn(errorMessage, "error-control");
    }
}
function messageReturn(message, type) {
    var messageItem = document.getElementById("message-container");
    if (messageItem && messageItem instanceof HTMLDivElement) {
        messageItem.innerHTML = "\n            <div class=\"".concat(type, " message-control\"><p>").concat(message, "</p></div>\n        ");
        var messagediv_1 = document.querySelector(".message-control");
        if (messagediv_1 && messagediv_1 instanceof HTMLDivElement) {
            setTimeout(function () {
                messagediv_1.remove();
            }, 6000);
        }
    }
}
function fetchApi(user) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, response, data, userFound, _b, mdResponse, mdData, decodeMDIn64Base, readmeFound, _c, rResponse, rData, reposFound, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, , 8]);
                    messageReturn("Buscando por ".concat(user, "..."), "await-control");
                    return [4 /*yield*/, fetchItem("https://api.github.com/users/".concat(user))];
                case 1:
                    _a = _d.sent(), response = _a.response, data = _a.data;
                    userFound = true;
                    return [4 /*yield*/, awaitStatus(response, 404, "usuário não encontrado!")];
                case 2:
                    _d.sent();
                    if (response.status !== 200) {
                        userFound = false;
                    }
                    return [4 /*yield*/, fetchItem("https://api.github.com/repos/".concat(user, "/").concat(user, "/readme"))];
                case 3:
                    _b = _d.sent(), mdResponse = _b.response, mdData = _b.data;
                    decodeMDIn64Base = null;
                    readmeFound = true;
                    return [4 /*yield*/, awaitStatus(mdResponse, 404, "Erro ao carregar Readme.md do usuário")];
                case 4:
                    _d.sent();
                    if (mdResponse.status !== 200) {
                        readmeFound = false;
                    }
                    if (mdData.status !== 404) {
                        if (mdData.content) {
                            decodeMDIn64Base = atob(mdData.content);
                        }
                    }
                    return [4 /*yield*/, fetchItem("https://api.github.com/users/".concat(user, "/repos"))];
                case 5:
                    _c = _d.sent(), rResponse = _c.response, rData = _c.data;
                    reposFound = true;
                    return [4 /*yield*/, awaitStatus(rResponse, 404, "Erro ao carregar repositórios do usuário!")];
                case 6:
                    _d.sent();
                    if (rResponse.status !== 200) {
                        reposFound = false;
                    }
                    if (userFound && readmeFound && reposFound) {
                        messageReturn("Sucesso!", "sucess-control");
                        returnResponse(data, rData, decodeMDIn64Base);
                    }
                    else {
                        messageReturn("Erro ao buscar por ".concat(user), "error-control");
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _d.sent();
                    messageReturn("Erro interno da requisição da api!", "error-control");
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function returnResponse(data, rData, decodeMDIn64Base) {
    var userArea = document.querySelector("#user-area");
    if (userArea && userArea instanceof HTMLDivElement) {
        userArea.innerHTML = "\n        <div class=\"user-info\">\n            <div class=\"image-url\">\n                <img src=\"".concat(data.avatar_url, "\" alt=\"Foto de Perfil de ").concat(data.name, "\">\n            </div>\n            <div class=\"user-details\">\n                <div class=\"title\">\n                    <a href=\"").concat(data.html_url, "\" target=\"_blank\">\n                    <h2>").concat(data.name, "</h2>\n                    </a>\n                </div>\n                <span>").concat(data.login, "</span>\n                <p>").concat(data.bio ? data.bio : "Usuário sem Biografia!", "</p>\n                <div class=\"following-and-followers\">\n                    <p>").concat(data.followers, " Followers</p>\n                    <p>").concat(data.following, " Following</p>\n                </div>\n            </div>\n        </div>\n        ");
    }
    var readMeArea = document.querySelector("#read-me-area");
    if (readMeArea && readMeArea instanceof HTMLDivElement) {
        /*
        Ignore o erro que indica que a função "marked" não foi encontrada.
        Ela foi importada através de um CDN e, ao ser processada como arquivo .js,
        o código funcionará normalmente.
        */
        if (!readMeArea.classList.contains("markdown-body")) {
            readMeArea.classList.add("markdown-body");
        }
        if (decodeMDIn64Base !== null) {
            readMeArea.innerHTML = "\n                <div class=\"read-me-user\">".concat(marked(decodeMDIn64Base), "</div>\n            ");
        }
        else {
            readMeArea.innerHTML = "\n                <div class=\"read-me-user\">\n                    <p style=\"text-align:center; margin: 0.50rem;\">Usu\u00E1rio sem ReadMe.dm!<p/>\n                </div>\n            ";
        }
    }
    var repositoriesArea = document.querySelector("#repositories-area");
    if (repositoriesArea && repositoriesArea instanceof HTMLDivElement) {
        repositoriesArea.innerHTML = "";
        if (rData.length !== 0) {
            repositoriesArea.innerHTML += "\n            <p class=\"repos-total\">Total de Reposit\u00F3rios: ".concat(rData.length, "</p>\n            ");
            rData.forEach(function (data) {
                var date = new Date(data.updated_at);
                repositoriesArea.innerHTML += "\n                <a class=\"repo-info-a\" href=\"".concat(data.html_url, "\" target=\"_blank\">\n                    <div class=\"repo-info\">\n                        <div class=\"repo-details\">\n                        <div class=\"title\">\n                            <h2 class=\"repo-title\">").concat(data.name, "</h2>\n                        </div>\n                            <span class=\"stars\"><i class=\"bi bi-star-fill\"></i> ").concat(data.stargazers_count, "</span>\n                        </div>\n                        <p>").concat(data.description ? data.description : "Repositório sem descrição!", "</p>\n                        <div class=\"repo-aditionals\">\n                            <p><i class=\"bi bi-braces\"></i>  ").concat(data.language == null ? "indeterminado" : data.language, "</p>\n                            <p><i class=\"bi bi-alarm\"></i>  ").concat(date.toLocaleDateString("pt-br", { year: 'numeric', month: 'short' }), "</p>\n                        </div>\n                    </div>\n                </a>\n                ");
            });
        }
        else {
            repositoriesArea.innerHTML += "\n            <p class=\"no-repos\">Usu\u00E1rio sem reposit\u00F3rios!</p>\n            ";
        }
    }
}
var searchButton = document.getElementById("search-button");
if (searchButton && searchButton instanceof HTMLInputElement) {
    var searchUser_1 = document.getElementById("user-search");
    if (searchUser_1 && searchUser_1 instanceof HTMLInputElement) {
        searchButton.addEventListener("click", function () {
            var user = searchUser_1.value;
            if (user.length === 0) {
                return messageReturn("É necessario preencher um usuário!", "error-control");
            }
            fetchApi(user);
        });
    }
}
fetchApi("codebygustavo");
