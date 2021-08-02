import {
    createStore
} from "vuex";
import {
    HTTP
} from "@/main";

export default createStore({
    state: {
        status: "",
        accessToken: localStorage.getItem("accessToken") || "",
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, accessToken, user) {
            state.status = "success";
            state.accessToken = accessToken;
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        }
    },
    actions: {
        doLogin({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                HTTP.post("/salon/auth/login", {
                        phone: user.phone,
                        password: user.password
                    })
                    .then(resp => {
                        let result = resp.data;
                        if (result.status === 1) {
                            const accessToken = resp.data.data.token;
                            const user = resp.data.data;
                            let infoUser = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar,
                                followers: user.followers
                            };
                            localStorage.setItem("accessToken", accessToken);
                            localStorage.setItem("userInfo", JSON.stringify(infoUser));
                            HTTP.defaults.headers.common["Authorization"] = accessToken;
                            commit("auth_success", accessToken, user);
                        } else {
                            commit("auth_error");
                            localStorage.clear();
                        }
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error");
                        localStorage.clear();
                        reject(err);
                    });
            });
        },
        doLogout() {
            return new Promise(resolve => {
                HTTP.get("/salon/main/logout").then(() => {
                    localStorage.clear();
                    resolve();
                });
            });
        }
        // register({ commit }, user) {
        //   return new Promise((resolve, reject) => {
        //     commit("auth_request");
        //     HTTP({
        //       url: "/salon/auth/register",
        //       data: user,
        //       method: "POST"
        //     })
        //       .then(resp => {
        //         const token = resp.data.token;
        //         const user = resp.data.user;
        //         localStorage.setItem("token", token);
        //         HTTP.defaults.headers.common["Authorization"] = token;
        //         commit("auth_success", token, user);
        //         resolve(resp);
        //       })
        //       .catch(err => {
        //         commit("auth_error", err);
        //         localStorage.removeItem("token");
        //         reject(err);
        //       });
        //   });
        // }
    },
    getters: {
        isLoggedIn: state => !!state.accessToken,
        authStatus: state => state.status
    }
});