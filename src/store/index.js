import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //userName: "Usman Ali",
        userName: "",
        users: [],
        folders: [
            { name: "Folder 1", route: "/folder1", createdAt: '2024-08-11', createdBy: 'Default User' },
            { name: "My Family Pics", route: "/folder2", createdAt: '2024-06-12', createdBy: 'Default User'  },
            { name: "My Company Projects", route: "/folder3", createdAt: '2024-09-27', createdBy: 'Default User' },
            { name: "Important Documents", route: "/folder4", createdAt: '2024-01-31', createdBy: 'Default User' },
            { name: "rents files", route: "/folder5", createdAt: '2024-10-06', createdBy: 'Default User' },
            { name: "Important notes given by clients", route: "/folder6", createdAt: '2023-12-20', createdBy: 'Default User' },
            { name: "Folder 7", route: "/folder7", createdAt: '2024-08-19', createdBy: 'Default User' },
        ],
        loginError: null
    },
    mutations: {
        addFolder(state, payload) {
            state.folders.push({ name: payload.folderName, route: `/${payload.folderName}` })
        },
        registerUser(state, payload) {
            state.users.push(payload);
            state.userName = payload.name;
        },
        setLoginError(state, error) {
            state.loginError = error;
        },
        setCurrentUser(state, user) {
            state.userName = user.name;
        },
        logout(state) {
            state.userName = '';
        }
    },
    actions: {
        addNewFolder(context, payload) {
            context.commit("addFolder", payload);
        },
        registerNewUser(context, payload) {
            context.commit("registerUser", payload);
        },
        login({ commit, state }, { email, password }) {
            // Clear any previous login errors
            commit('setLoginError', null);

            // Find user with matching email
            const user = state.users.find(u => u.email === email);

            if (!user) {
                commit('setLoginError', 'User not found');
                return false;
            }

            if (user.password !== password) {
                commit('setLoginError', 'Invalid password');
                return false;
            }

            // Login successful
            commit('setCurrentUser', user);
            return true;
        },
        logout({ commit }) {
            localStorage.removeItem('isAuthenticated');
            commit('logout');
        }
    },
    getters: {
        userName(state) {
            return state.userName;
        },
        folderName(state) {
            return state.folderName;
        },
        folders(state) {
            return state.folders;
        },
        isEmailTaken: (state) => (email) => {
            return state.users.some(user => user.email === email);
        },
        loginError(state) {
            return state.loginError;
        }
    }
})