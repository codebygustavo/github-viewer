interface User {
    name: string;
    avatar_url: string;
    html_url: string;
    login: string;
    bio: string;
    followers: number;
    following: number;
}

interface Repos {
    html_url: string;
    name: string;
    language: string;
    stargazers_count: number;
    description: string;
    updated_at: string;
}

interface FetchItemResponse {
    response: Response;
    data: any;
}

async function fetchItem(url: string): Promise<FetchItemResponse> {
    const response = await fetch(url);
    const data: any = await response.json();

    return { response, data };
}

function awaitStatus(response: any, expectedStatus: number, errorMessage: string) {
    if (response.status === expectedStatus) {
        return messageReturn(errorMessage, "error-control");
    }
}

function messageReturn(message: string, type: "await-control" | "error-control" | "sucess-control") {
    const messageItem: HTMLElement | null = document.getElementById("message-container");

    if (messageItem && messageItem instanceof HTMLDivElement) {
        messageItem.innerHTML = `
            <div class="${type} message-control"><p>${message}</p></div>
        `;
        const messagediv: HTMLElement | null = document.querySelector(".message-control");

        if (messagediv && messagediv instanceof HTMLDivElement) {
            setTimeout(() => {
                messagediv.remove();
            }, 6000);
        }
    }

    return;
}

async function fetchApi(user: string) {
    try {
        messageReturn(`Buscando por ${user}...`, "await-control");

        const { response, data } = await fetchItem(`https://api.github.com/users/${user}`);

        await awaitStatus(response, 404, "usuário não encontrado!");

        const { response: mdResponse, data: mdData } = await fetchItem(`https://api.github.com/repos/${user}/${user}/readme`);

        let decodeMDIn64Base = null;

        await awaitStatus(mdResponse, 404, "Erro ao carregar Readme.md do usuário");

        if (mdData.status !== 404) {
            if (mdData.content) {
                decodeMDIn64Base = atob(mdData.content);
            }
        }

        const { response: rResponse, data: rData } = await fetchItem(`https://api.github.com/users/${user}/repos`);

        await awaitStatus(rResponse, 404, "Erro ao carregar repositórios do usuário!");

        returnResponse(data, rData, decodeMDIn64Base);
    } catch (error: any) {
        messageReturn("Erro interno da requisição da api!", "error-control");
        throw error;
    } finally {
        messageReturn(`Sucesso!`, "sucess-control");
    }
}

function returnResponse(data: User, rData: Repos[], decodeMDIn64Base: string | null) {
    const userArea: HTMLDivElement | null = document.querySelector("#user-area");

    if (userArea && userArea instanceof HTMLDivElement) {
        userArea.innerHTML = `
        <div class="user-info">
            <div class="image-url">
                <img src="${data.avatar_url}" alt="Foto de Perfil de ${data.name}">
            </div>
            <div class="user-details">
                <div class="title">
                    <a href="${data.html_url}" target="_blank">
                    <h2>${data.name}</h2>
                    </a>
                </div>
                <span>${data.login}</span>
                <p>${data.bio ? data.bio : "Usuário sem Biografia!"}</p>
                <div class="following-and-followers">
                    <p>${data.followers} Followers</p>
                    <p>${data.following} Following</p>
                </div>
            </div>
        </div>
        `;
    }

    const readMeArea: HTMLDivElement | null = document.querySelector("#read-me-area");

    if (readMeArea && readMeArea instanceof HTMLDivElement) {
        /* 
        Ignore o erro que indica que a função "marked" não foi encontrada.
        Ela foi importada através de um CDN e, ao ser processada como arquivo .js, 
        o código funcionará normalmente.
        */

        if (decodeMDIn64Base !== null) {
            readMeArea.innerHTML = `
                <div class="read-me-user">${marked(decodeMDIn64Base)}</div>
            `;
        } else {
            readMeArea.innerHTML = `
                <div class="read-me-user">
                    <p style="text-align:center; margin: 0.50rem;">Usuário sem ReadMe.dm!<p/>
                </div>
            `;
        }
    }

    const repositoriesArea: HTMLDivElement | null = document.querySelector("#repositories-area");

    if (repositoriesArea && repositoriesArea instanceof HTMLDivElement) {
        repositoriesArea.innerHTML = "";

        if (rData.length !== 0) {
            repositoriesArea.innerHTML += `
            <p class="repos-total">Total de Repositórios: ${rData.length}</p>
            `;

            rData.forEach((data) => {
                let date = new Date(data.updated_at);

                repositoriesArea.innerHTML += `
                <a class="repo-info-a" href="${data.html_url}" target="_blank">
                    <div class="repo-info">
                        <div class="repo-details">
                        <div class="title">
                            <h2 class="repo-title">${data.name}</h2>
                        </div>
                            <span class="stars"><i class="bi bi-star-fill"></i> ${data.stargazers_count}</span>
                        </div>
                        <p>${data.description ? data.description : "Repositório sem descrição!"}</p>
                        <div class="repo-aditionals">
                            <p><i class="bi bi-braces"></i>  ${data.language == null ? "indeterminado" : data.language}</p>
                            <p><i class="bi bi-alarm"></i>  ${date.toLocaleDateString("pt-br", { year: 'numeric', month: 'short' })}</p>
                        </div>
                    </div>
                </a>
                `;
            });
        } else {
            repositoriesArea.innerHTML += `
            <p class="no-repos">Usuário sem repositórios!</p>
            `;
        }
    }
}

const searchButton: HTMLElement | null = document.getElementById("search-button");

if (searchButton && searchButton instanceof HTMLInputElement) {
    const searchUser: HTMLElement | null = document.getElementById("user-search");

    if (searchUser && searchUser instanceof HTMLInputElement) {
        searchButton.addEventListener("click", () => {
            const user: string = searchUser.value;

            if (user.length === 0) {
                return messageReturn("É necessario preencher um usuário!", "error-control");
            }

            fetchApi(user);
        });
    }
}

fetchApi("codebygustavo");
