import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName: "Usman Ali",
        folderName: 'New Folder',
        folders: [],
        uf_count: 1,
        isAuth: false
        // folders: [
        //     { id: 1, name: "Folder 1", parent_id: null },
        //     { id: 2, name: "My Family Pics", parent_id: null },
        //     { id: 3, name: "My Company Projects", parent_id: null },
        //     { id: 4, name: "Important Documents", parent_id: null },
        //     { id: 5, name: "rents files", parent_id: null },
        //     { id: 6, name: "Important notes given by clients", parent_id: null },
        //     { id: 7, name: "Folder 7", parent_id: null },
        //   ],
    },
    mutations: {
        addFolder(state, payload) {
            state.folders.push(payload);
        },
        setUfCount(state, payload) {
            state.uf_count = payload.ufCount;
        },
        isAuth(state, payload) {
            state.isAuth = payload;
        }
    },
    actions: {
        addNewFolder(context, payload) {
            context.commit("addFolder", payload);
        },
        setUfCount(context, payload) {
            context.commit("setUfCount", payload);
        },
        isAuth(context, payload) {
            context.commit('isAuth', payload);
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
        ufCount(state) {
            return state.uf_count;
        },
        isAuth(state) {
            return state.isAuth;
        }
    }
})